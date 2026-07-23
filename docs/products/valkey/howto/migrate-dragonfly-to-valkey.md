---
title: Migrate from Aiven for Dragonfly® to Aiven for Valkey™
sidebar_label: From Dragonfly® to Valkey™
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages";

Migrate your data from Aiven for Dragonfly® to Aiven for Valkey™ using a
manual key-by-key migration or a scan-based tool. Use this approach when the
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

## Step 1: Prepare for migration

Before migrating, review your data for keys or data types that may require
transformation.

### Handle module-specific data types

If your Dragonfly service uses module data types (for example, `ReJSON-RL` for
JSON keys), those keys cannot be loaded directly into a Valkey service that does
not have the equivalent module enabled.

Options:

- **Enable the module on Valkey**: In the [Aiven Console](https://console.aiven.io/),
  go to your Valkey service **Service settings** > **Advanced configuration** and
  enable the required module before loading data.
- **Transform the data**: Extract module-type values and re-insert them using native
  Valkey data types (for example, store JSON as a plain string with `SET`).
- **Skip the keys**: If the data is not critical, exclude those keys from migration.

### Filter keys (optional)

To exclude specific keys or key patterns from the migration, use a script to scan
and pipe only the keys you need. See
[Step 2](#step-2-migrate-data-to-aiven-for-valkey) for the scan-based approach.

## Step 2: Migrate data to Aiven for Valkey

Choose one of the following methods based on your use case.

### Method A: Live key-by-key migration using SCAN and DUMP/RESTORE

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

### Method B: Use RedisShake for bulk migration

[RedisShake](https://github.com/tair-opensource/RedisShake) is a vendor-neutral,
actively maintained tool for migrating data between Redis-compatible services.
Use the `scan_reader` mode, which iterates over all keys using SCAN commands.

:::note
Aiven for Dragonfly does not support the replication commands (`SYNC`, `PSYNC`)
required by RedisShake's `sync_reader` mode. Always use `scan_reader` when
migrating from Aiven for Dragonfly.
:::

1. Download the latest RedisShake release for your platform from the
   [RedisShake releases page](https://github.com/tair-opensource/RedisShake/releases)
   and extract it. Alternatively, run it with Docker:

   ```bash
   docker pull ghcr.io/tair-opensource/redisshake:latest
   ```

1. Create a `shake.toml` configuration file that defines the Dragonfly source and
   the Valkey target. Both Aiven services require TLS:

   ```toml
   [scan_reader]
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

   RedisShake scans all keys from Dragonfly and writes them to Valkey. It stops
   automatically when the scan is complete.

:::note
`scan_reader` performs a one-time bulk copy and does not stream ongoing writes.
Stop writes to your Dragonfly service before starting the migration to avoid
missing new data written during the scan.
:::

## Step 3: Verify the migration

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

1. Spot-check a sample of keys to confirm values, types, and time-to-live (TTL) values
   transferred correctly:

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

## Step 4: Cut over to Aiven for Valkey

When the data is verified and your application is tested:

1. Stop writes to the Dragonfly service, or route them to Valkey first.
1. If using Method A (SCAN/DUMP/RESTORE script), run it one final time to capture
   any remaining keys, then stop it.
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
