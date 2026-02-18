---
title: Track service restore progress using the API
sidebar_label: Restore progress
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You can track restore progress for individual nodes during service node replacement by using the Aiven API.
For example, use this to monitor the restore progress of a forked service or
when applying maintenance.

The service object exposes restore progress under `node_states[].progress_updates`:

- `service.node_states[]` contains per-node state entries.
- When a node is restoring or catching up, its `state` is typically `syncing_data`.
- When the state is `syncing_data`, the node may include `progress_updates` with one or
  more phase objects.
- Other node states don't include restore progress data.

:::note
`progress_updates` may be missing or empty even when a node is in `syncing_data`. This
can happen when a restore completes quickly or when the service does not emit detailed
progress counters.
:::

## API endpoints

Restore progress fields are part of the standard service response payload.

- Get a single service (recommended for polling): `GET /project/{project}/service/{service_name}`
- List services in a project: `GET /project/{project}/service`


<Tabs>
<TabItem value="req" label="Request" default>

```bash
curl -H "Authorization: aivenv1 TOKEN" https://api.aiven.io/v1/project/{project}/service/{service_name}
```

Replace `TOKEN` with your API token.

</TabItem>
<TabItem value="response" label="Response">

```json
{
  "service": {
	...
    "node_states": [
      {
        "node_name": "...",
        "state": "syncing_data",
        "progress_updates": [
          {
            "phase": "basebackup",
            "completed": false,
            "current": 3410567,
            "min": 0,
            "max": 7569280,
            "unit": "bytes_uncompressed"
          }
        ]
      }
    ],
	...
  }
}
```

</TabItem>
</Tabs>

## Node states

Common values for `node_states[].state` include:

- `setting_up_vm`: The virtual machine is being created or initialized.
- `syncing_data`: The node is restoring data or catching up.
- `running`: The node is operating normally.
- `leaving`: The node is leaving the cluster.
- `unknown`: A transient or error state.

## `progress_updates` data model

`progress_updates` is a list of phase objects. When present, phases appear in the
following order:

1. `prepare`
1. `basebackup`
1. `stream`
1. `finalize`

Each phase object includes the following fields:

```json
{
  "completed": false,
  "current": 3410567,
  "max": 7569280,
  "min": 0,
  "phase": "basebackup",
  "unit": "bytes_uncompressed"
}
```

### Field semantics

- `phase` (string, required): The restore phase. Possible values: `prepare`,
  `basebackup`, `stream`, and `finalize`.
- `completed` (boolean, required): Whether the phase is complete.
- `current` (number or null, optional): The current progress value. This field may be
  missing or null.
- `min` (number or null, optional): The starting value for the phase. This field may be
  missing or null.
- `max` (number or null, optional): The expected total value for the phase. This value
  may be missing, null, or change while the restore is in progress.
- `unit` (string or null, optional): The unit for `current`, `min`, and `max`. New
  unit values may be introduced.

:::note Important considerations

- Treat `unit` as an opaque identifier. Unknown values can appear.
- `max` may change while a restore is in progress.
- Not all phases report numeric counters. Some services only indicate phase completion.
:::

## Why `max` values can change

The `current`, `min`, and `max` values are best-effort progress indicators. They can be
based on estimates or on system state that changes over time. Treat `max` as the latest
known expected total, not as a fixed guarantee.

Common reasons `max` can change include:

- The restore process discovers additional work after it starts, such as files, segments,
  or objects that become visible only after metadata is read.
- New data is added on the backend while the node is catching up, which moves the
  completion point forward. This is common during incremental catch-up phases.
- Progress is calculated from system state, such as replication lag, rather than from a
  fixed work queue. As the system state changes, the value is recalculated.
- The service switches restore strategies during the operation, for example from
  snapshot restore to replication catch-up, which changes what the counters represent.

As a result:

- Phase percentage can decrease even when the restore operates normally.
- Remaining-time estimates based on `max` are unreliable.
- Sudden changes in `max` are expected unless the node remains in `syncing_data` longer
  than expected.

## Restore phase meanings

Phase names are standardized, but the underlying work and the meaning of the counters
are service-specific.

- `prepare`: Prepares the node for restore.
- `basebackup`: Restores the full backup.
- `stream`: Applies incremental changes, such as replication or log replay.
- `finalize`: Completes final steps before serving traffic.

Not all restores include every phase.

## Progress units

Known unit values include:

- `binlogs`: MySQL binlog-based progress.
- `bytes_compressed`: Compressed backup data.
- `bytes_uncompressed`: Uncompressed backup data.
- `wal_lsn`: PostgreSQL® write-ahead log sequence number.

Additional unit values may be introduced as new functionality is added.

## Compute phase progress percentages

You cannot reliably compute overall restore progress. You can compute a phase-specific
progress percentage when `min`, `max`, and `current` are present and `max != min`.

```text
pct = round(((current - min) / (max - min)) * 100, 1)
```

When handling progress values:

- If any of `min`, `max`, or `current` is null or missing, display `n/a`.
- If `max == min`, treat the percentage as undefined.
- Expect the percentage to decrease when `max` changes.
- Clamp displayed values to the range `[0, 100]`.

## Polling guidance

Progress updates are best-effort and refresh every 10 seconds while a node is in
`syncing_data`. Poll the service state every 10 to 30 seconds. More frequent polling
does not provide additional detail.

For each `node_states[]` entry:

- If `state` is not `syncing_data`, no restore progress is available.
- If `state` is `syncing_data`:
  - If `progress_updates` is missing or empty, the node is restoring without detailed
    progress data.
  - Otherwise, the current phase is the last phase where `completed` is `false`.

Stop polling when all nodes reach the `running` state or when a stall is detected.

### Stall detection

The API does not provide per-phase timestamps. To detect stalls, use a time-based
threshold, such as a node remaining in `syncing_data` longer than expected.

Do not rely on counters or `max` values to estimate remaining time.

## Service-specific behavior

Not all services emit detailed progress updates. When available, counters follow
these patterns:

- **PostgreSQL**
  - `basebackup`: byte-based counters, commonly `bytes_uncompressed`
  - `stream`: WAL catch-up, often reported as `wal_lsn`
- **MySQL**
  - `basebackup`: byte-based counters, commonly `bytes_compressed`
  - `stream`: binlog catch-up, reported as `binlogs`

Unit values can vary based on the restore mechanism, service version, and implementation.
Some phases may not include numeric counters.

Aiven may introduce new unit values over time. API clients must tolerate missing phases,
missing counters, changing `max` values, and unknown units.
