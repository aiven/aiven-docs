---
title: Apply ISM policies to Aiven for OpenSearch after restoring a snapshot
sidebar_label: Apply ISM policies
limite: true
---

Apply Index State Management (ISM) policies to Aiven for OpenSearch® with a script.
After restoring your snapshot, ISM policies that manage tasks like index rollover,
retention, and deletion need to be applied to your indices again. These policies are
stored in the `.opendistro-ism-config` index, but the assignments between indices and
policies must be applied again using a script.

## What is restored

The `.opendistro-ism-config` index stores ISM policy configurations, and these are
restored with the snapshot. Policy assignments to specific indices are stored in the
cluster metadata and must be reapplied manually.

## Prerequisites

- A machine with network access to Aiven for OpenSearch services
- Python 3.11 or higher installed
- All data indices and the `.opendistro-ism-config` index are restored from the snapshot
- The snapshot was restored with `include_global_state: true`

:::warning

- **Snapshot must include global state**
  Ensure that the snapshot was restored with `include_global_state: true`. If this flag
  was not used during the snapshot restore, the ISM policy assignments will not be
  available in the cluster metadata, and the script will fail to re-apply the policies.

- **Script can only be run once**
  OpenSearch clears the cluster metadata with ISM policy assignments after the policies
  are applied. This means the script can only be run once. To run the script again,
  restore the snapshot.
:::

## Check for active ISM policies

Before running the re-apply script, verify that no indices are currently managed by ISM
policies. You can do this by running the following command:

```bash
curl -X GET --insecure -s "${AIVEN_SERVICE_URI}/_plugins/_ism/explain?pretty"
```

If the result shows `"total_managed_indices": 0`, no policies are applied, and you can
proceed. Otherwise, remove the existing policies if necessary.

## Re-apply ISM policies

To re-apply the ISM policies to the indices in Aiven for OpenSearch:

1. Download the re-apply script from the
   [Aiven examples GitHub repository](https://github.com/aiven/aiven-examples/blob/main/solutions/reapply-ism-policies/avn-re-apply-ism-policies.py).

1. Create a JSON configuration file with the connection details for the Aiven for
   OpenSearch service. An example configuration file is shown below:

   ```json
   {
       "host": "target-ip-or-fqdn",
       "port": target-port-number,
       "user": "the user",
       "password": "the password"
   }
   ```

   It is recommended to use the default `aivenadmin` user for this task.

1. Run the script using the prepared configuration file:

   ```bash
   python avn-re-apply-ism-policies.py --config path-to-config-file
   ```

   The script connects to the Aiven for OpenSearch service, retrieves the metadata
   from the cluster state, and re-applies ISM policies to the corresponding indices.

## Monitor ISM job progress

After re-applying ISM policies, index lifecycle management tasks such as rollovers,
retention, and deletion will resume automatically. You can monitor the progress of
ISM jobs to ensure that policies are being enforced correctly:

```bash
curl -X GET --insecure "${AIVEN_SERVICE_URI}/_plugins/_ism/explain?pretty&size=100"
```

Alternatively, you can check the status of individual indices:

```bash
curl -X GET --insecure "${AIVEN_SERVICE_URI}/_plugins/_ism/explain/<index_name>?pretty"
```
