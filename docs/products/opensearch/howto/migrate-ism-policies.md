---
title: Reapply ISM policies after snapshot restore
sidebar_label: Reapply ISM policies
limited: true
---

Reapply Index State Management (ISM) policies to Aiven for OpenSearch® using a script.

After restoring your snapshot, ISM policies that manage index rollover, retention, and
deletion must be reapplied to your indices. These policies are stored in the
`.opendistro-ism-config` index, but the assignments between indices and policies must
be manually reapplied using a script.

## What is restored

The `.opendistro-ism-config` index stores ISM policy configurations and is restored with
the snapshot, but policy assignments to specific indices are stored in the cluster
metadata and must be manually reapplied..

## Prerequisites

- A machine with network access to Aiven for OpenSearch services
- Python 3.11 or higher installed
- Ensure all data indices and the `.opendistro-ism-config` index are restored from the
  snapshot
- The snapshot was restored with `include_global_state: true`

:::warning

- **Snapshot must include global state**
  Ensure the snapshot was restored with `include_global_state: true`. If it was
  restored without global state, the ISM policy assignments will not be available in the
  cluster metadata, and the script will fail to reapply the policies.

- **Script can only be run once**
  OpenSearch clears the cluster metadata with ISM policy assignments after the policies
  are applied. This means the script can only be run once. To run the script again,
  restore the snapshot.

:::

## Check for active ISM policies

Before executing the reapply script, confirm that no indices are currently managed by
ISM policies. Run the following command to check:

```bash
curl -X GET --insecure -s "${AIVEN_SERVICE_URI}/_plugins/_ism/explain?pretty"
```

If the result shows `"total_managed_indices": 0`, no policies are applied, and you can
proceed. Otherwise, remove the existing policies if necessary.

## Reapply ISM policies

To reapply ISM policies to indices in Aiven for OpenSearch:

1. Download the re-apply script from the
   [Aiven examples GitHub repository](https://github.com/aiven/aiven-examples/blob/main/solutions/reapply-ism-policies/avn-re-apply-ism-policies.py).

1. Create a JSON configuration file with the connection details for your Aiven for
   OpenSearch service. The following is an example configuration file:

   ```json
   {
       "host": "target-ip-or-fqdn",
       "port": target-port-number,
       "user": "the user",
       "password": "the password"
   }
   ```

   Use the default `aivenadmin` user for this task.

1. Once your configuration file is ready, run the script.

   ```bash
   python avn-re-apply-ism-policies.py --config path-to-config-file
   ```

   The script connects to the Aiven for OpenSearch service, retrieves metadata
   from the cluster state, and reapplies ISM policies to the corresponding indices.

## Monitor ISM job progress

Once ISM policies are reapplied, index lifecycle management tasks like rollovers,
retention, and deletion resume automatically. To monitor ISM job progress and ensure
policies are enforced correctly, run the following command and replace `SERVICE_URL`
with your Aiven for OpenSearch service's URL:

```bash
curl -X GET --insecure "$SERVICE_URL/_plugins/_ism/explain?pretty&size=100"=100"
```

Alternatively, you can verify the status of individual indices:

```bash
curl -X GET --insecure "$SERVICE_URL/_plugins/_ism/explain/<index_name>?pretty"
```

## Related pages

- [Migrate data to Aiven for OpenSearch® using snapshots](/docs/products/opensearch/howto/migrate-snapshot-data-opensearch)
- [Migrate Opendistro security configuration to Aiven for OpenSearch](/docs/products/opensearch/howto/migrate-opendistro-security-config-aiven)
