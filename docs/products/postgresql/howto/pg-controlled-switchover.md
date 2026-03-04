---
title: Controlled maintenance updates
sidebar_label: Controlled switchover
---

The controlled switchover feature allows the user to have more control over the process of applying maintenance updates, specifically the failover/switchover of the primary Postgres instance.

The current workflow allows the user to configure one maintenance window per week, by specifying the maintenance field (day of week in dow, and start time in time) when creating a service. It also allows the user to manually start a maintenance update using the API call ServiceMaintenanceStart (PUT /v1/project/{project}/service/{service_name}/maintenance/start).

The new feature will be specified under user_config.switchover_windows which allows the user to specify multiple (up to 28) windows for the failover/switchover of the primary node.

This switchover window configuration will be respected for manually-started or automatically-started maintenance updates.
It will not apply for other user-initiated operations, such as plan upgrades or region migrations, or exceptional circumstances (e.g. node failures, network degradation, or manual intervention in incidents).
API Documentation
Enabling the switchover windows
In the API calls for ServiceCreate, ServiceUpdate, and read operations like ServiceGet, the new switchover_windows field will be available in the user_config object.
Early Availability: After Aiven support/engineering enables the feature for the project, you will be able to use this new field. Without enabling it for your project, we will return a 4XX validation error saying the field is not supported.
For example, to create a service with the feature enabled:

{
  "maintenance": {"dow": "monday", "time": "08:00:00"},
  "user_config": {
    "switchover_windows": [
      {"dow": "monday", "start_time": "22:00:00", "end_time": "22:10:00"},
      {"dow": "tuesday", "start_time": "23:30:00", "end_time": "23:59:59"},
      {"dow": "wednesday", "start_time": "00:00:00", "end_time": "00:30:00"},
      ...
    ]
  }
}

In the example above, if the automated maintenance is started during the maintenance window (i.e. on Monday, between 08:00 in the morning and 12:00 (noon) in UTC), then either:
The new primary node is ready before 10:00 PM (22:00 UTC); in which case, the old primary node is decommissioned and the new primary node is promoted between the 22:00 and 22:10 on that day.
The replication takes a long time, and the new primary node is only ready on Tuesday morning (e.g. at 10 AM the next day); in which case, the old primary node stays online until 23:30 on Tuesday, and only then is it decommissioned for the new primary node to be promoted.
Implementation notes
Note that it’s required for the switchover window to be at least 10 minutes long for several reasons:
Normal load conditions mean that there may be delays (<1 minute typically) for the control plane to signal the nodes to start promotion.
There are some additional steps needed to action the promotion once it’s triggered, even when all the new and old replicas have near-zero replication lag.
We need to account for a grace period for graceful termination of the old primary, which means connection interruptions are possible up to 15 minutes after the promotion signal is sent. Typically, that number is lower, but network conditions and/or client setup and/or DNS propagation delays can impact that number in practice.

Also note that the switchover windows that cross over the day boundary (i.e. around midnight UTC) need to be split into two separate windows (as above). The start_time and end_time are treated as inclusive bounds (i.e. two windows 20:30:00-20:59:59 + 21:00:00-21:30:00 on the same day is effectively equivalent to one window 20:30:00-21:30:00, and the same applies to windows at the day boundary).

The example above is just for illustrative purposes. In reality, there are some restrictions to the allowed configurations:
We require at least one switchover window per day.
This allows us to avoid situations where we need to keep an extra node replicated and in-sync for several days to a week.
We allow at most 4 switchover windows per day.
This allows the user enough flexibility and control over the process without making it hard to reason about.
A minimum of 10 minutes is enforced for each switchover window. The recommendation is to have it higher than that, as explained above.
Disabling the switchover windows
To disable it (i.e. to allow the switchover/failover to happen at any time), it’s enough to set the user_config.switchover_windows value to an empty list ([]).
Implementation notes
Note that disabling the switchover windows would take effect almost immediately, so any pending/scheduled switchovers will be actionable as soon as the user disables the feature.
Inspecting the state of the switchover
To monitor the progress of the maintenance and the state of the controlled switchover, a new field will be available in the response of the ServiceGet (GET /v1/project/{project}/service/{service_name}) endpoint.
For example, when running avn service get --json $SERVICE_NAME, you can expect a response similar to:

{
  "backups": [...],
  ...
  "maintenance": {
    "dow": "saturday",
    "enabled": true,
    "time": "09:28:08",
    "updates": [],
    "controlled_switchover": {
      "enabled": true,
      "state": "PENDING",
      "scheduled_start_time": "2026-02-27T10:01:00.000000Z",
    }
  },
  "node_count": 2,
  "node_states": [...],
  "user_config": {
    ...
    "switchover_windows": [
       {
         "dow": "monday",
         "end_time": "10:22:00",
         "start_time": "10:01:00"
       },
       ...
    ],
    ...
  },
  ...
}

The enabled flag is true if the user has configured the user_config.switchover_windows option.

The state field is one of:
INACTIVE: when there is no ongoing maintenance, or the feature is not configured, or a past maintenance/switchover is already completed.
PENDING: when a maintenance has started, and the new nodes are not ready for a switchover yet. In such cases, the node_states field can provide more detailed information about the progress of the individual nodes.
SCHEDULED: all new nodes are ready and we scheduled a switchover for a specific timestamp in the configured switchover windows. The scheduled_start_time will contain that UTC timestamp in ISO format.
RUNNING: all new nodes are ready, and the switchover is being triggered, or is ongoing already. In this case, the scheduled_start_time may already be in the past, and it indicates when the switchover was originally scheduled to start.
COMPLETED: only new nodes are ready and the switchover that was scheduled is done.
Note that we may extend the list of allowed state values at a later stage, if we need to provide more granular details around the progress of the maintenance and/or the switchover. Do not treat this as an exhaustive list when implementing the API client.

The scheduled_start_time can be null or contain an ISO-formatted timestamp, depending on the state (as documented above).
