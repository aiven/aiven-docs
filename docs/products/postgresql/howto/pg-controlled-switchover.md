---
title: Controlled maintenance updates in Aiven for PostgreSQL®
sidebar_label: Controlled switchover
limited: true
---

import RelatedPages from "@site/src/components/RelatedPages";
import LimitedBadge from "@site/src/components/Badges/LimitedBadge";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Control when primary node switchover happens during Aiven for PostgreSQL® maintenance.

:::important
This feature is in <LimitedBadge/>.
:::

## Benefits and use cases

Use controlled maintenance updates to reduce impact from primary node promotion:

- Align switchover with low-traffic periods.
- Keep maintenance predictable for application teams.
- Reduce risk during business-critical hours.
- Use multiple short windows each day instead of one broad period.

Typical use cases are the following:

- A global application that needs different low-traffic windows each day.
- A service that allows brief disruption only after batch processing ends.
- A team that starts maintenance manually, then wants promotion in approved
  hours.

## How it works

1. You define one or more daily switchover windows in `user_config.switchover_windows`.
1. Maintenance starts from your regular `maintenance` schedule or from a manual
   start.
1. Aiven waits for your configured switchover window before promoting the new
   primary.

If nodes are not ready in the first available window, switchover waits for the
next configured window. For detailed PostgreSQL failover behavior, see
[Aiven for PostgreSQL upgrade and failover procedures](/docs/products/postgresql/concepts/upgrade-failover).

## Limitations

Controlled switchover applies to the following:

- Maintenance started automatically during the configured maintenance window
- Maintenance started manually with
  [ServiceMaintenanceStart](https://api.aiven.io/doc/#tag/Service/operation/ServiceMaintenanceStart)

Controlled switchover does not apply to the following:

- Plan upgrades
- Region migrations
- Incident handling, such as node failure or network issues

Window limits:

- Define at least one window per day.
- Define at most four windows per day.
- Define at most 28 windows total.
- Set each window length to at least 10 minutes.
- Use UTC times.
- Use `HH:MM:SS` for `start_time` and `end_time`.
- Split a window that crosses midnight into two windows.

## Manage controlled switchover

### Prerequisites

Before you configure controlled maintenance updates, ensure the following:

- Your service is Aiven for PostgreSQL.
- Aiven has enabled this <LimitedBadge/> feature for your project.
- Your service has a configured
  [maintenance window](/docs/platform/concepts/maintenance-window#set-the-maintenance-window).
- You can update service configuration with
  [Aiven API endpoints](https://api.aiven.io/doc/#tag/Service) or
  [Aiven CLI service commands](/docs/tools/cli/service-cli).

### Enable and configure

Follow these window rules:

- Define at least one window per day.
- Define at most four windows per day.
- Define at most 28 windows total.
- Set each window length to at least 10 minutes.
- Use UTC times.
- Use `HH:MM:SS` for `start_time` and `end_time`.
- Split a window that crosses midnight into two windows.

`start_time` and `end_time` are inclusive.

Use one of the following tools to configure `user_config.switchover_windows`:

<Tabs groupId="switchover-config">
<TabItem value="cli" label="CLI" default>

To generate and apply daily windows with Aiven CLI, run:

```bash
WINDOWS_JSON="$(jq -c -n \
  --argjson window '{"start_time": "09:00:00", "end_time": "10:00:00"}' \
  --argjson weekdays '[
    "monday", "tuesday", "wednesday", "thursday",
    "friday", "saturday", "sunday"
  ]' \
  '$weekdays | map($window + {dow: .})'
)"

avn service update -c "switchover_windows=${WINDOWS_JSON}" SERVICE_NAME
```

</TabItem>
<TabItem value="api" label="API">

Call the
[ServiceUpdate endpoint](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
to set `user_config.switchover_windows`:

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
  --header 'Authorization: Bearer BEARER_TOKEN' \
  --header 'content-type: application/json' \
  --data '{
    "user_config": {
      "switchover_windows": [
        {
          "dow": "monday",
          "start_time": "22:00:00",
          "end_time": "22:15:00"
        },
        {
          "dow": "tuesday",
          "start_time": "23:30:00",
          "end_time": "23:59:59"
        },
        {
          "dow": "wednesday",
          "start_time": "00:00:00",
          "end_time": "00:30:00"
        }
      ]
    }
  }'
```

</TabItem>
</Tabs>

This example sets a Monday maintenance window and three switchover windows:

```json
{
  "maintenance": {
    "dow": "monday",
    "time": "08:00:00"
  },
  "user_config": {
    "switchover_windows": [
      {
        "dow": "monday",
        "start_time": "22:00:00",
        "end_time": "22:15:00"
      },
      {
        "dow": "tuesday",
        "start_time": "23:30:00",
        "end_time": "23:59:59"
      },
      {
        "dow": "wednesday",
        "start_time": "00:00:00",
        "end_time": "00:30:00"
      }
      ...
    ]
  }
}
```

If maintenance starts Monday at `08:00:00` UTC and nodes are ready before
`22:00:00`, promotion happens in the Monday window.

If nodes become ready after that window, promotion waits for the Tuesday or
Wednesday window.

If you update windows during ongoing maintenance, Aiven uses the latest
configuration for the next eligible switchover time.

### Operate and monitor

To start maintenance manually, use
[`avn service maintenance-start`](/docs/tools/cli/service-cli#avn-service-maintenance-start).

When controlled windows are configured, manual maintenance still follows those
windows for promotion.

To turn off controlled switchover and allow promotion at any time, set
`switchover_windows` to an empty list:

```json
{
  "user_config": {
    "switchover_windows": []
  }
}
```

This change takes effect soon after the update.
Pending switchovers can proceed without waiting for a window.

Check service state with:

```bash
avn service get SERVICE_NAME --json
```

In the response, inspect `maintenance.controlled_switchover`:

```json
{
  "maintenance": {
    "controlled_switchover": {
      "enabled": true,
      "state": "SCHEDULED",
      "scheduled_start_time": "2026-02-27T10:01:00.000000Z"
    }
  }
}
```

State values:

- `INACTIVE`: No active maintenance, or feature is not configured.
- `PENDING`: Maintenance started, and new nodes are not ready.
- `SCHEDULED`: New nodes are ready, and switchover is scheduled.
- `RUNNING`: Switchover is in progress.
- `COMPLETED`: Switchover finished.

`scheduled_start_time` can be `null` for some states.

## Best practices

- Use windows longer than 10 minutes to absorb timing variation.
- Use at least 15-minute windows to reduce client impact around promotion.
- Keep one predictable window per day before adding more windows.
- Place windows outside business-critical traffic periods.
- Treat midnight windows as two entries, one per day.
- Monitor `state` and `scheduled_start_time` during maintenance events.

<RelatedPages/>

- [Service maintenance, updates and upgrades](/docs/platform/concepts/maintenance-window)
- [Aiven for PostgreSQL upgrade and failover procedures](/docs/products/postgresql/concepts/upgrade-failover)
- [Aiven CLI service commands](/docs/tools/cli/service-cli)
