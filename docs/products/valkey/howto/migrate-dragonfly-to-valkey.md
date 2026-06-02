---
title: Migrate from Aiven for Dragonfly® to Aiven for Valkey™
sidebar_label: From Dragonfly® to Aiven for Valkey™
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages";

Migrate your data from Aiven for Dragonfly® to Aiven for Valkey™ using a
manual extract, transform, and load process. Use this approach when the
built-in console migration wizard is not available for your source service type.

:::note
The Aiven Console migration wizard supports migration **into** Dragonfly from
Valkey or Caching, but not from Dragonfly to Valkey. This guide covers that
migration path.
:::

## Prerequisites

Before starting:

- A running [Aiven for Valkey](/docs/products/valkey/get-started) target service.
- A running Aiven for Dragonfly source service.
- [`redis-cli`](https://redis.io/docs/ui/cli/) installed locally (version 7.x or later).
- Connection details for both services—available on the **Overview** page of each
  service in the [Aiven Console](https://console.aiven.io/).
- Enough disk space locally to store the RDB dump file from your Dragonfly service.

:::tip
To get connection details quickly from the CLI, run:

```bash
avn service get <service-name> --project <project-name> -v
```

:::

## Compatibility considerations

Dragonfly and Valkey are both Redis®-compatible, but differences exist in
supported commands and data type behavior. Before migrating:

- Review the
  [Dragonfly command compatibility list](https://www.dragonflydb.io/docs/command-reference/compatibility)
  and identify any commands or features your application uses that differ in Valkey.
- Valkey does not support all Dragonfly-specific extensions. If your data uses
  `JSON`, `Search`, or `TimeSeries` modules, verify that the target Valkey service
  has equivalent modules enabled or plan a data transformation step.
- Test your application against Valkey in a staging environment before cutting over
  production traffic.

## Step 1: Extract data from Aiven for Dragonfly

Use `redis-cli` to create a full RDB snapshot of your Dragonfly service.

1. Retrieve the connection details for your Dragonfly service from the
   [Aiven Console](https://console.aiven.io/) **Overview** page:
   - **Host**
   - **Port**
   - **Password** (default user)

1. Trigger a background save to ensure the snapshot is current:

   ```bash
   redis-cli -h <dragonfly-host> -p <dragonfly-port> \
     --tls --no-auth-warning \
     -a <dragonfly-password> \
     BGSAVE
   ```

   Wait for the save to complete:

   ```bash
   redis-cli -h <dragonfly-host> -p <dragonfly-port> \
     --tls --no-auth-warning \
     -a <dragonfly-password> \
     LASTSAVE
   ```

   Run `LASTSAVE` again after a few seconds and compare the Unix timestamps. When
   the value increments, the background save is complete.

1. Download the RDB snapshot using the `--rdb` flag:

   ```bash
   redis-cli -h <dragonfly-host> -p <dragonfly-port> \
     --tls --no-auth-warning \
     -a <dragonfly-password> \
     --rdb dragonfly-dump.rdb
   ```

   This produces a `dragonfly-dump.rdb` file in your current directory.

:::note
Aiven for Dragonfly services are SSL-secured by default. Always include
`--tls` in your `redis-cli` commands.
:::

## Step 2: Inspect and transform data

Before loading data into Valkey, inspect the dump for keys or data types that
may require transformation.

### Inspect the RDB file

Use [`rdb-tools`](https://github.com/sripathikrishnan/redis-rdb-tools) or
[`rdbtools`](https://pypi.org/project/rdbtools/) to inspect the dump:

```bash
pip install rdbtools python-lzf
rdb --command json dragonfly-dump.rdb > dump.json
```

Review `dump.json` to identify:

- Keys using unsupported data types or module-specific types
- Expired keys (they are included in the dump but will be skipped if already
  past their TTL)
- Large keys that may cause timeouts during restore

### Handle module-specific data types

If your Dragonfly service uses module data types (for example, `ReJSON-RL` for
JSON keys), those keys cannot be loaded directly into a Valkey service that does
not have the equivalent module enabled.

Options:

- **Enable the module on Valkey**: In the [Aiven Console](https://console.aiven.io/),
  go to your Valkey service **Service settings** > **Advanced configuration** and
  enable the required module before loading data.
- **Transform the data**: Extract module-type values from the JSON dump and
  re-insert them using native Valkey data types (for example, store JSON as a
  plain string with `SET`).
- **Skip the keys**: If the data is not critical, exclude those keys from migration.

### Filter keys (optional)

To exclude specific keys or key patterns from the migration, use a script to scan
and pipe only the keys you need. See [Step 3](#step-3-load-data-into-aiven-for-valkey)
for the scan-based approach.

## Step 3: Load data into Aiven for Valkey

Choose one of the following methods based on your use case.

### Method A: Restore from RDB file (recommended for full migrations)

Use `redis-cli` with the `--pipe` flag and the `rdb` command to stream keys from
the dump directly into Valkey.

1. Convert the RDB dump to Redis protocol format:

   ```bash
   rdb --command protocol dragonfly-dump.rdb > dump.resp
   ```

1. Pipe the data into Aiven for Valkey:

   ```bash
   redis-cli -h <valkey-host> -p <valkey-port> \
     --tls --no-auth-warning \
     -a <valkey-password> \
     --pipe < dump.resp
   ```

   The output reports the number of commands written, errors, and time elapsed.

### Method B: Live key-by-key migration using SCAN and DUMP/RESTORE

Use this approach to migrate a subset of keys or to keep both services in sync
during a gradual cutover.

Run the following script to iterate over all keys and copy them to Valkey:

```bash
#!/bin/bash

SRC_HOST="<dragonfly-host>"
SRC_PORT="<dragonfly-port>"
SRC_PASS="<dragonfly-password>"

DST_HOST="<valkey-host>"
DST_PORT="<valkey-port>"
DST_PASS="<valkey-password>"

CURSOR=0

while true; do
  # Scan a batch of keys
  RESULT=$(redis-cli -h "$SRC_HOST" -p "$SRC_PORT" \
    --tls --no-auth-warning -a "$SRC_PASS" \
    SCAN "$CURSOR" COUNT 100)

  CURSOR=$(echo "$RESULT" | head -1)
  KEYS=$(echo "$RESULT" | tail -n +2)

  for KEY in $KEYS; do
    TTL=$(redis-cli -h "$SRC_HOST" -p "$SRC_PORT" \
      --tls --no-auth-warning -a "$SRC_PASS" \
      PTTL "$KEY")

    DUMP=$(redis-cli -h "$SRC_HOST" -p "$SRC_PORT" \
      --tls --no-auth-warning -a "$SRC_PASS" \
      DUMP "$KEY")

    if [ "$TTL" -le 0 ]; then
      TTL=0
    fi

    redis-cli -h "$DST_HOST" -p "$DST_PORT" \
      --tls --no-auth-warning -a "$DST_PASS" \
      RESTORE "$KEY" "$TTL" "$DUMP" REPLACE
  done

  if [ "$CURSOR" -eq 0 ]; then
    break
  fi
done
```

:::note
`DUMP` and `RESTORE` use a serialization format that is Redis-version-specific.
If the Dragonfly and Valkey versions differ significantly, some keys may fail to
restore. Test with a small key set first.
:::

### Method C: Use RIOT for live replication

[RIOT (Redis Input/Output Tools)](https://developer.redis.com/riot/) supports
live replication between Redis-compatible services and handles reconnection and
error recovery.

1. Install RIOT:

   ```bash
   brew install redis-developer/tap/riot
   # or download from https://github.com/redis-developer/riot/releases
   ```

1. Start live replication from Dragonfly to Valkey:

   ```bash
   riot \
     --source-host <dragonfly-host> \
     --source-port <dragonfly-port> \
     --source-password <dragonfly-password> \
     --source-tls \
     --target-host <valkey-host> \
     --target-port <valkey-port> \
     --target-password <valkey-password> \
     --target-tls \
     replicate \
     --mode live
   ```

   RIOT first performs an initial bulk sync, then switches to live replication
   mode to capture ongoing writes.

1. Stop RIOT once replication is caught up and you are ready to cut over.

## Step 4: Verify the migration

After loading data into Valkey, verify that the migration is complete:

1. Compare the key count on both services:

   ```bash
   # On Dragonfly
   redis-cli -h <dragonfly-host> -p <dragonfly-port> \
     --tls --no-auth-warning -a <dragonfly-password> \
     DBSIZE

   # On Valkey
   redis-cli -h <valkey-host> -p <valkey-port> \
     --tls --no-auth-warning -a <valkey-password> \
     DBSIZE
   ```

1. Spot-check a sample of keys to confirm values, types, and time-to-live (TTL) values transferred
   correctly:

   ```bash
   redis-cli -h <valkey-host> -p <valkey-port> \
     --tls --no-auth-warning -a <valkey-password> \
     TYPE <key-name>

   redis-cli -h <valkey-host> -p <valkey-port> \
     --tls --no-auth-warning -a <valkey-password> \
     TTL <key-name>
   ```

1. Run your application's integration tests against the Valkey service before
   switching production traffic.

## Step 5: Cut over to Aiven for Valkey

When the data is verified and your application is tested:

1. Stop writes to the Dragonfly service, or route them to Valkey first.
1. If using live replication (Method B script or RIOT), let replication
   catch up, then stop it.
1. Update your application connection strings to point to the Aiven for Valkey
   service.
1. Monitor your application for errors after cutover.

:::tip
Keep the Aiven for Dragonfly service running for a short period after cutover
as a fallback. Power off or delete it once you are confident the migration
is stable.
:::

<RelatedPages/>

- [Get started with Aiven for Valkey™](/docs/products/valkey/get-started)
- [Migrate from Redis®* to Aiven for Valkey™ via console](/docs/products/valkey/howto/migrate-redis-aiven-via-console)
- [Migrate Valkey™ databases to Aiven for Valkey™](/docs/products/valkey/howto/migrate-caching-valkey-to-aiven-for-valkey)
- [Aiven for Dragonfly® overview](/docs/products/dragonfly)
