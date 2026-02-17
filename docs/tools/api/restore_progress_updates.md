---
title: Follow progress of services restore
sidebar_label: Restore progress updates
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

It is possible to track per-node restore progress during a service's node(s) replacement,
using Aiven APIs. This is useful, for example, to monitor the progress of a restore of a forked
service, or when a maintenance get applied.

Restore progress is exposed on the service object under `node_states[].progress_updates`:

- `service.node_states[]` contains per-node state entries.
- When a node is restoring/catching up, its `state` is typically `syncing_data`.
- In `syncing_data`, the node MAY include `progress_updates` with one or more phase objects.
- In other node states there is no restore progress data.

Note, `progress_updates` may be missing or empty even while a node is `syncing_data`
(for example, restores that complete quickly or service types that do not emit detailed progress counters).

## API endpoints

The restore progress fields are part of the normal service response payload.

- Get a single service (recommended for polling): `GET /project/{project}/service/{service_name}`
- List services in a project: `GET /project/{project}/service`


<Tabs>
<TabItem value="req" label="Request" default>

```bash
curl -H "Authorization: aivenv1 TOKEN" https://api.aiven.io/v1/project/{project}/service/{service_name}
```

Where `TOKEN` is your token.

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

`node_states[].state` values commonly include:

- `setting_up_vm`: VM is being created/initialized
- `syncing_data`: restoring full or incremental backups
- `running`: running in normal mode
- `leaving`: leaving the cluster
- `unknown`: transient or error state

## `progress_updates` data model

`progress_updates` is a list of phase objects. When present, phases are listed in this order:

1. `prepare`
2. `basebackup`
3. `stream`
4. `finalize`

Each list item has the following fields:

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

Field semantics:

- `phase` (string, required): one of `prepare`, `basebackup`, `stream`, `finalize`
- `completed` (boolean, required): whether this phase is completed
- `current` (number or null, optional): current progress value (may be missing or null)
- `min` (number or null, optional): minimum/starting value for this phase (may be missing or null)
- `max` (number or null, optional): expected maximum value for this phase (may be missing, null, or change over time)
- `unit` (string or null, optional): unit for `current/min/max` (new units may be introduced)

Important constraints:

- Treat `unit` as an opaque identifier; unknown values can appear.
- `max` may change while a restore is in progress (details below).
- Not all phases have meaningful numeric counters (some services only provide a boolean completion signal for a phase).

## Why `max` (and related counters) may not be stable

`current/min/max` are best-effort counters that can be based on estimates or on a moving target. In those cases `max`
should be treated as "latest known expected total", not as a fixed promise.

Common reasons `max` can change:

- The restore job discovers more work after it starts (for example, additional files/segments/objects become known only
  after reading metadata).
- The backend adds new data while the node is catching up, so the "finish line" moves forward (common for incremental
  catch-up phases).
- The progress is derived from system state (for example, replication lag) rather than from a fixed work queue; the value
  can be recalculated as the system evolves.
- The service switches restore strategy mid-flight (for example, a snapshot restore vs replication catch-up), changing what
  the counters represent.

Implications:

- Phase percentage can go backwards even if the restore is healthy.
- Remaining-time estimates based on `max` are unreliable.
- Treat sudden changes in `max` as normal unless the node stays in `syncing_data` beyond your time threshold.

## Phase meanings

The phase names are standardized, but the exact work and the exact meaning of the counters is service-specific.

- `prepare`: getting ready to restore (preconditions before data transfer)
- `basebackup`: downloading/restoring the full backup (base snapshot)
- `stream`: applying incremental data (for example, WAL/binlogs/replication catch-up)
- `finalize`: final steps before the service is ready to start serving traffic

You may not see all phases for all restores.

## Progress units

Known units include:

- `binlogs`: MySQL binlog number / count-based progress
- `bytes_compressed`: processing compressed backup data
- `bytes_uncompressed`: processing uncompressed backup data
- `wal_lsn`: PostgreSQL log sequence number

Other (unlisted) unit values may be returned when new functionality is introduced.

## Computing a phase percentage

Overall restore progress is not generally computable. You can compute a phase-specific progress percentage when
`min`, `max`, and `current` are present and `max != min`:

```text
pct = round(((current - min) / (max - min)) * 100, 1)
```

Recommended handling:

- If any of `min`, `max`, `current` is null/missing, display "n/a".
- If `max == min`, treat the percentage as undefined.
- Expect the percentage to move backwards when `max` moves.
- If you display a percentage, clamp to `[0, 100]` for presentation.

## Practical polling guidance

- Progress data is best-effort and updates at about 10-second granularity while the node is `syncing_data`.
- Poll the service state periodically (for example, 10-30 seconds). Polling faster than ~10 seconds typically does not
  provide more detail.
- For each `node_states[]` entry:
  - If `state != "syncing_data"`: no restore progress is expected.
  - If `state == "syncing_data"`:
    - If `progress_updates` is missing/empty: service is syncing data, but no detailed progress available.
    - Otherwise, the last phase in the list that has `completed == false` is the current phase.
- Stop polling when all nodes reach `state == "running", or stall is detected (see below).

Stall detection:

- The APIs does not expose per-phase timestamps. If you need stall detection, use a time-based threshold such as
  "node has been in `syncing_data` for longer than X".
- Avoid relying on phase counters to infer remaining time; counters and `max` may not be stable.

## Service-specific notes (typical patterns)

Not all services emit detailed `progress_updates`. When they do, the counters often follow these patterns:

- PostgreSQL:
  - `basebackup`: typically byte counters (commonly `bytes_uncompressed`)
  - `stream`: typically WAL catch-up; may be reported as `wal_lsn` (LSN is a moving target while writes continue)
- MySQL:
  - `basebackup`: typically byte counters (commonly `bytes_compressed`)
  - `stream`: typically binlog catch-up (`binlogs`)

Why the units are described as "typically/commonly":

- Units depend on the restore mechanism in use (full restore vs incremental catch-up vs replication).
- Units may differ between service versions and implementations.
- Some phases may be reported without numeric counters (unit is null, or the fields are missing).
- Aiven may introduce new units over time; clients must treat unit values as extensible.

API clients should tolerate missing phases, missing counters, changing `max`, and unknown units.
