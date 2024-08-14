---
title: Prevent running out of disk space
---

Learn how Aiven prevents running out of disk space from happening and how you can make more space available on your disk when needed. Running out of disk space makes the service start malfunctioning and prevents backups from being properly created.

## Switch to the read-only mode

Aiven automatically detects when your service is running out of free
space and prevents further writes to it. This process is done by setting
the MySQL `@@GLOBAL.read_only` flag to `1`. The threshold for moving to
this state is when your disk usage is at 97% or higher.

Once your service is made `read-only`, the service reports errors when
you attempt to insert, update, or delete data:

```
ERROR 1290 (HY000): The MySQL server is running with the --read-only option so it cannot execute this statement
```

## Free up disk space

### Optimize problem tables

InnoDB does not reclaim unused disk space by default and this can cause
a disk to become full.

Read the help article [MySQL disk
usage](/docs/products/mysql/howto/reclaim-disk-space)
for more information.

### Upgrade to a larger plan

This can be done from within [Aiven Console](https://console.aiven.io/)
or with the [Aiven CLI](/docs/tools/cli)
client. New nodes with more disk capacity are launched, and your
existing data is synced to those new nodes. Once the migration is
completed, the disk usage drops below the critical level and the
read-only state is canceled, allowing writes to be made once more.

### Delete data

As your service is set in `read-only` mode, attempting to free disk
space by deleting data can't be done directly. To disable the
`read-only` state,  use our API to temporarily remove the
restriction.

You can use our API and send a POST request to:

```text
https://api.aiven.io/v1/project/<PROJECT>/service/<SERVICE_NAME>/enable-writes
```

The output of a successful operation is:

```json
{
  "message": "Writes temporarily enabled",
  "until": "2022-04-22T13:42:05.385432Z"
}
```

This way you can free up space within the next 15 minutes.

## Related pages

See [reclaim disk space](/docs/products/mysql/howto/reclaim-disk-space) if you are having issues with a full disk.
