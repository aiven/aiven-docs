---
title: Configure audit logging for Aiven for Apache Kafka®
sidebar_label: Configure audit logging
early: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import ConsoleIcon from "@site/src/components/ConsoleIcons";

Turn audit logging on for your Aiven for Apache Kafka® service, change what it records,
and control how many log entries it produces.

For what audit logging captures and its limitations, see
[Audit logging for Aiven for Apache Kafka®](/docs/products/kafka/concepts/audit-logging).

:::important
Turning audit logging on or changing its settings restarts the Kafka brokers in your
service one at a time. Make these changes during a maintenance window or a period of
low traffic.
:::

## Prerequisites

To configure audit logging, you need one of the following
[project roles or permissions](/docs/platform/concepts/permissions#project-roles-and-permissions):

- `admin`: Full access to services in the project.
- `operator`: Full service management access.
- `project:services:write`: Broad services write access.
- `service:configuration:write`: Least-privilege access for changing service
  configuration.

The `developer` and `read_only` roles cannot configure audit logging.

## Configuration options

You configure audit logging with the `kafka.audit_log` settings. How you refer to each
setting depends on the method:

- In the **Aiven Console** and **Aiven CLI**, use the full name, such as
  `kafka.audit_log.record_type`.
- In the **Aiven API** and **Terraform**, set each option as a field inside the
  `audit_log` object.

The following options are available. When audit logging is enabled, unset options use
their default values.

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>record_type</code></td>
      <td>string</td>
      <td><code>user_operations</code></td>
      <td>
        The type of activity to record. Use <code>user_operations</code> for detailed
        operation logs, or <code>user_activity</code> to record only that a Kafka user
        was active.
      </td>
    </tr>
    <tr>
      <td><code>aggregation_period_sec</code></td>
      <td>integer</td>
      <td><code>300</code></td>
      <td>
        How long, in seconds, to group entries before writing them to the log. A
        higher value produces fewer, larger entries. Accepts a value from 1 to 1800.
      </td>
    </tr>
    <tr>
      <td><code>include_denials</code></td>
      <td>boolean</td>
      <td><code>false</code></td>
      <td>
        Whether to include denied authorization attempts in audit log entries.
      </td>
    </tr>
    <tr>
      <td><code>group_by</code></td>
      <td>string</td>
      <td><code>user_and_ip</code></td>
      <td>
        How to group entries: by Kafka user only (<code>user</code>), or by Kafka user
        and IP address (<code>user_and_ip</code>). Applies only when
        <code>record_type</code> is <code>user_operations</code>.
      </td>
    </tr>
  </tbody>
</table>

## Enable audit logging

Audit logging turns on when the `kafka.audit_log` settings are present. To enable it
with default settings, add at least one option, such as `record_type`. The other
options then use their defaults.

<Tabs groupId="enable-methods">
<TabItem value="console" label="Aiven Console" default>

1. In the [Aiven Console](https://console.aiven.io/), open your Aiven for Apache Kafka
   service.
1. Click <ConsoleLabel name="service settings"/>.
1. In the **Advanced configuration** section, click **Configure**.
1. Click <ConsoleIcon name="Add config options"/> and enter `audit` to find the audit
   logging options.
1. Add each option you want, then set its value. For example, add
   `kafka.audit_log.record_type` and select `user_operations`.
1. Click **Save configuration**.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Set the options with the [`avn service update`](/docs/tools/cli/service-cli) command
and the `-c` flag:

```bash
avn service update SERVICE_NAME \
  --project PROJECT_NAME \
  -c kafka.audit_log.record_type=user_operations \
  -c kafka.audit_log.aggregation_period_sec=300 \
  -c kafka.audit_log.include_denials=false \
  -c kafka.audit_log.group_by=user_and_ip
```

Replace `SERVICE_NAME` and `PROJECT_NAME` with your service and project names.

</TabItem>
<TabItem value="api" label="Aiven API">

Send a `PUT` request to the
[service update](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
endpoint:

```bash
curl -s -X PUT \
  --url "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME" \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "user_config": {
      "kafka": {
        "audit_log": {
          "record_type": "user_operations",
          "aggregation_period_sec": 300,
          "include_denials": false,
          "group_by": "user_and_ip"
        }
      }
    }
  }'
```

</TabItem>
<TabItem value="terraform" label="Terraform">

Add an `audit_log` block to the `kafka_user_config` block of your `aiven_kafka`
resource:

```hcl
resource "aiven_kafka" "example_kafka" {
  project      = var.project_name
  cloud_name   = "google-europe-west1"
  plan         = "business-4"
  service_name = "example-kafka"

  kafka_user_config {
    kafka {
      audit_log {
        record_type            = "user_operations"
        aggregation_period_sec = 300
        include_denials        = false
        group_by               = "user_and_ip"
      }
    }
  }
}
```

</TabItem>
</Tabs>

## Change audit logging settings

To change what audit logging records, set new values for the `kafka.audit_log` options
with any of the preceding methods. Services that already use audit logging keep their
current settings until you change them.

## View audit logs

Audit entries appear in the service logs with the `AUDIT:` prefix. To view them, use
one of the following methods:

- In the [Aiven Console](https://console.aiven.io/), open your service and click
  <ConsoleLabel name="logs"/>.
- With the Aiven CLI, run:

  ```bash
  avn service logs SERVICE_NAME \
    --project PROJECT_NAME
  ```

- Send the service logs to another system through a
  [log integration](/docs/products/kafka/howto/integrate-service-logs-into-kafka-topic).

## Manage audit log volume

Audit logging can produce many log entries. To manage the volume:

- Set `group_by` to `user` instead of `user_and_ip` to combine a Kafka user's activity
  across IP addresses.
- Increase `aggregation_period_sec` to group entries over a longer time window.
- Keep `include_denials` set to `false` unless you need denied attempts in audit log
  entries.
- Use `user_activity` instead of `user_operations` when you only need to know which
  Kafka users were active.

## Related pages

- [Audit logging for Aiven for Apache Kafka®](/docs/products/kafka/concepts/audit-logging)
- [Advanced parameters for Aiven for Apache Kafka®](/docs/products/kafka/reference/advanced-params)
- [Integrate service logs into an Apache Kafka® topic](/docs/products/kafka/howto/integrate-service-logs-into-kafka-topic)
- [Monitor and alert logs for denied ACL](/docs/products/kafka/howto/monitor-logs-acl-failure)
