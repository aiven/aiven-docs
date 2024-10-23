---
title: Reapply ISM policies after snapshot restore
sidebar_label: Reapply ISM policies
limited: true
---

Reapply Index State Management (ISM) policies to Aiven for OpenSearch® using a script.

After restoring your snapshot, ISM policies that manage index rollover, retention, and
deletion must be reapplied to your indices. These policies are stored in the
`.opendistro-ism-config` index, but the assignments between indices and policies must
be reapplied using a script.

## What is restored

The `.opendistro-ism-config` index stores ISM policy configurations and is restored with
the snapshot, but policy assignments to specific indices are stored in the cluster
metadata and must be reapplied.

## Prerequisites

- A machine with network access to Aiven for OpenSearch services
- Python 3.11 or higher installed
- Ensure all data indices and the `.opendistro-ism-config` index are restored from the
  snapshot
- Take the snapshot with `restore_global_state: true`. By default, this
  setting is `false`, and you must enable it to restore ISM policy assignments.

:::warning

- **Snapshot must include global state**:
  Ensure the snapshot is **created** with `restore_global_state: true`. If the snapshot
  was created without the global state, the ISM policy assignments will not be available
  in the cluster metadata, and the script will fail to reapply the policies.

- **Script can only be run once**:
  After ISM policies are applied, OpenSearch clears the cluster metadata that holds
  ISM policy assignments. This means you can only run the script once.

:::

## Validate index sync before reapplying ISM policies

Before reapplying ISM policies, ensure the indices are synchronized between the
source and target services. Check document counts to confirm they match.

For more details, see the
[verify the migration](/docs/products/opensearch/howto/migrate-snapshot-data-opensearch#verify-the-migration)
section in [Migrate data to Aiven for OpenSearch® using snapshots](/docs/products/opensearch/howto/migrate-snapshot-data-opensearch#verify-the-migration).

## Reapply ISM policies

The script retrieves the ISM policy assignments stored in the cluster state and
reapplies them to the corresponding indices.

:::warning
**Potential ISM policy restore error**
Restoring certain ISM policies may cause an error, such as when a rollover index
(for example, `x-001` to `x-002`) already exists from a previous snapshot reload. This
error can prevent secondary ISM policies, like deleting index `x-001`, from being
applied. Ensure indices from previous rollovers or other similar situations are
handled correctly before reapplying ISM policies.
:::


To reapply ISM policies to indices in Aiven for OpenSearch:

1. Download the script from the
   [Aiven examples GitHub repository](https://github.com/aiven/aiven-examples/blob/main/solutions/reapply-ism-policies/avn-re-apply-ism-policies.py).

1. Create a JSON configuration file with the connection details for your Aiven for
   OpenSearch service. Use `avnadmin` as the `user` and replace `host`, `port`, and
   `password` with your service information:

   ```json
   {
       "host": "target-ip-or-fqdn",
       "port": target-port-number,
       "user": "avnadmin",
       "password": "the password"
   }
   ```

1. Once your configuration file is ready, run the script.

   ```bash
   python avn-re-apply-ism-policies.py --config path-to-config-file
   ```

## Re-running the ISM script

You can rerun the ISM script if needed. Use the --force option to bypass the check
that prevents it from running more than once.

:::note
Run the ISM script only after completing all data migration.
:::

## Monitor ISM task progress

Once ISM policies are reapplied, index lifecycle management tasks like rollovers,
retention, and deletion resume automatically. To monitor ISM task progress and ensure
policies are enforced correctly, run the following command and replace `SERVICE_URL`
with your Aiven for OpenSearch service's URL:

```bash
curl -X GET --insecure "$SERVICE_URL/_plugins/_ism/explain?pretty&size=100"
```

Alternatively, you can verify the status of individual indices:

```bash
curl -X GET --insecure "$SERVICE_URL/_plugins/_ism/explain/<index_name>?pretty"
```

## Related pages

- [Migrate data to Aiven for OpenSearch® using snapshots](/docs/products/opensearch/howto/migrate-snapshot-data-opensearch)
- [Migrate Opendistro security configuration to Aiven for OpenSearch](/docs/products/opensearch/howto/migrate-opendistro-security-config-aiven)
