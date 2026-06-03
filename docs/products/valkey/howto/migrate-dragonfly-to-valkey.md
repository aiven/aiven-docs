---
title: Migrate from Aiven for Dragonfly® to Aiven for Valkey™
sidebar_label: From Dragonfly® to Valkey™
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages";

Migrate your data from Aiven for Dragonfly® to Aiven for Valkey™ using a
manual extract, transform, and load process. Use this approach when the
built-in console migration wizard is not available for your source service type.

:::note
The Aiven Console migration wizard supports migration **into** Dragonfly from
Valkey or Caching, but not from Dragonfly to Valkey.
:::

## Prerequisites

Before starting:

- A running [Aiven for Valkey](/docs/products/valkey/get-started) target service.
- A running Aiven for Dragonfly source service.
- [`valkey-cli`](https://valkey.io/topics/cli/) installed locally.
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

Use `valkey-cli` to create a full RDB snapshot of your Dragonfly service.

1. Retrieve the connection details for your Dragonfly service from the
   [Aiven Console](https://console.aiven.io/) **Overview** page:
   - **Host**
   - **Port**
   - **Password** (default user)

1. Download a fresh RDB snapshot using the `--rdb` flag:

   ```bash
   valkey-cli -h <dragonfly-host> -p <dragonfly-port> \
     --tls --no-auth-warning \
     -a <dragonfly-password> \
     --rdb dragonfly-dump.rdb
   ```

   The `--rdb` flag connects as a replica and streams a current point-in-time
   snapshot directly to a `dragonfly-dump.rdb` file in your current directory. You
   don't need to trigger a save first—Aiven for Dragonfly doesn't support the
   `BGSAVE` or `SAVE` commands.

:::note
Aiven for Dragonfly services are SSL-secured by default. Always include
`--tls` in your `valkey-cli` commands.
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

Use `valkey-cli` with the `--pipe` flag and the `rdb` command to stream keys from
the dump directly into Valkey.

1. Convert the RDB dump to Redis protocol format:

   ```bash
   rdb --command protocol dragonfly-dump.rdb > dump.resp
   ```

1. Pipe the data into Aiven for Valkey:

   ```bash
   valkey-cli -h <valkey-host> -p <valkey-port> \
     --tls --no-auth-warning \
     -a <valkey-password> \
     --pipe < dump.resp
   ```

   The output reports the number of commands written, errors, and time elapsed.

### Method B: Live key-by-key migration using SCAN and DUMP/RESTORE

Use this approach to migrate a subset of keys or to keep both services in sync
during a gradual cutover.

Run the migration in batches so that each key isn't a separate network round
trip. Issuing `PTTL`, `DUMP`, and `RESTORE` one key at a time is slow for large
datasets. Instead, use a client that pipelines commands, such as the Python
[`valkey`](https://pypi.org/project/valkey/) library, which batches reads from the
source and writes to the target:

```python
import valkey

BATCH_SIZE = 500

src = valkey.Valkey(
    host="<dragonfly-host>", port=<dragonfly-port>,
    password="<dragonfly-password>", ssl=True,
)
dst = valkey.Valkey(
    host="<valkey-host>", port=<valkey-port>,
    password="<valkey-password>", ssl=True,
)

cursor = 0
while True:
    cursor, keys = src.scan(cursor=cursor, count=BATCH_SIZE)

    if keys:
        # Pipeline the PTTL and DUMP reads from the source.
        read = src.pipeline(transaction=False)
        for key in keys:
            read.pttl(key)
            read.dump(key)
        results = read.execute()

        # Pipeline the RESTORE writes to the target.
        write = dst.pipeline(transaction=False)
        for i, key in enumerate(keys):
            ttl, payload = results[2 * i], results[2 * i + 1]
            if payload is None:
                continue
            write.restore(key, ttl if ttl and ttl > 0 else 0, payload, replace=True)
        write.execute()

    if cursor == 0:
        break
```

Install the client with `pip install valkey` before running the script. Increase
`BATCH_SIZE` to trade memory for throughput.

:::note
`DUMP` and `RESTORE` use a serialization format that is Redis-version-specific.
If the Dragonfly and Valkey versions differ significantly, some keys may fail to
restore. Test with a small key set first.
:::

### Method C: Use RedisShake for live replication

[RedisShake](https://github.com/tair-opensource/RedisShake) is a vendor-neutral,
actively maintained tool for migrating and synchronizing data between
Redis-compatible services. It performs an initial bulk sync, followed by a stream
of ongoing writes until you stop it.

1. Download the latest RedisShake release for your platform from the
   [RedisShake releases page](https://github.com/tair-opensource/RedisShake/releases)
   and extract it. Alternatively, run it with Docker:

   ```bash
   docker pull ghcr.io/tair-opensource/redisshake:latest
   ```

1. Create a `shake.toml` configuration file that defines the Dragonfly source and
   the Valkey target. Both Aiven services require TLS:

   ```toml
   [sync_reader]
   address = "<dragonfly-host>:<dragonfly-port>"
   password = "<dragonfly-password>"
   tls = true

   [redis_writer]
   address = "<valkey-host>:<valkey-port>"
   password = "<valkey-password>"
   tls = true
   ```

1. Start the migration:

   ```bash
   ./redis-shake shake.toml
   ```

   RedisShake first performs an initial bulk sync, then continues streaming new
   writes to Valkey until you stop it.

1. Stop RedisShake once replication is caught up and you are ready to cut over.

:::note
RedisShake does not support resumable (checkpoint) transfers: if it restarts, it
performs a full resynchronization. Use it for a one-time migration rather than long-running
continuous synchronization. Changes to cluster topology during migration are not
supported.
:::

## Step 4: Verify the migration

After loading data into Valkey, verify that the migration is complete:

1. Compare the key count on both services:

   ```bash
   # On Dragonfly
   valkey-cli -h <dragonfly-host> -p <dragonfly-port> \
     --tls --no-auth-warning -a <dragonfly-password> \
     DBSIZE

   # On Valkey
   valkey-cli -h <valkey-host> -p <valkey-port> \
     --tls --no-auth-warning -a <valkey-password> \
     DBSIZE
   ```

1. Spot-check a sample of keys to confirm values, types, and time-to-live (TTL) values transferred
   correctly:

   ```bash
   valkey-cli -h <valkey-host> -p <valkey-port> \
     --tls --no-auth-warning -a <valkey-password> \
     TYPE <key-name>

   valkey-cli -h <valkey-host> -p <valkey-port> \
     --tls --no-auth-warning -a <valkey-password> \
     TTL <key-name>
   ```

1. Run your application's integration tests against the Valkey service before
   switching production traffic.

## Step 5: Cut over to Aiven for Valkey

When the data is verified and your application is tested:

1. Stop writes to the Dragonfly service, or route them to Valkey first.
1. If using live replication (Method B script or RedisShake), let replication
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
