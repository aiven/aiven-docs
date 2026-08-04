---
title: Connection limits per plan for Aiven for PostgreSQL®
sidebar_label: Connection limits per plan
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Find the default `max_connections` value for each Aiven for PostgreSQL® plan, and learn
how to change it for your service.

By default, Aiven for PostgreSQL® instances limit the number of allowed connections to
make sure that the database is able to serve them all.

## `max_connections` defaults

Default values of the `max_connections` setting vary according to the service plan:

|                 Plan                  | Max connections |
| ------------------------------------- | --------------- |
| Developer                             | 15              |
| Free                                  | 20              |
| Hobbyist                              | 25              |
| Startup/Business/Premium-4            | 100             |
| Startup/Business/Premium-8            | 200             |
| Startup/Business/Premium-16           | 400             |
| Startup/Business/Premium-32           | 800             |
| Startup/Business/Premium-64 and above | 1000            |

:::note
Aiven can utilize any number of the connections for managing the service.
:::

Aiven for PostgreSQL doesn't apply a fixed per-GiB connection formula (for example, 100
connections per GiB of RAM). The plan-based defaults in the preceding table are the only
default values, and there's no separate `max_connection_limit` setting.
`max_connections` is the only parameter that controls the total number of connections
for your service.

:::tip
During a connection-exhaustion incident, use an AI assistant connected to
[Aiven MCP](/docs/tools/mcp-server) to check current connection usage against
the configured limit. For example:

> Show the current connection count on `my-pg-service`, grouped by role and
> state, and compare the total with `max_connections`.
:::

## Increase or decrease `max_connections`

To increase or decrease the number of allowed connections for your service, set the
[`max_connections`](/docs/products/postgresql/reference/advanced-params#pg_max_connections)
parameter, which accepts a value from 25 to 60000. This is self-service, so you don't
need to contact Aiven support or your account team to change it. The value depends on
your service's available resources, so to raise `max_connections` beyond what your
current plan can support,
[upgrade to a plan with more RAM](/docs/products/postgresql/howto/change-service-plan).

:::note
Changing `max_connections` causes a service restart. If your service has a read
replica, increase the replica's value first. After that change is applied, increase the
primary service's value.
:::

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. Log in to [Aiven Console](https://console.aiven.io/), and go to your organization >
   project > Aiven for PostgreSQL service.
1. On the **Overview** page of your service, select
   <ConsoleLabel name="service settings"/> from the sidebar.
1. On the <ConsoleLabel name="service settings"/> page, go to the **Advanced
   configuration** section, and select **Configure**.
1. Select **Add configuration options**, add the `max_connections` parameter, set the
   value, and select **Save configuration**.

</TabItem>
<TabItem value="cli" label="CLI">

Run the [service update](/docs/tools/cli/service-cli#avn-cli-service-update) command:

```bash
avn service update SERVICE_NAME -c pg.max_connections=VALUE
```

</TabItem>
<TabItem value="terraform" label="Terraform">

Set `max_connections` in the `pg_user_config.pg` block of the
[`aiven_pg`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/pg)
resource:

```hcl
resource "aiven_pg" "example" {
  # ...
  pg_user_config {
    pg {
      max_connections = 1000
    }
  }
}
```

</TabItem>
<TabItem value="api" label="API">

Call the
[ServiceUpdate endpoint](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate):

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
  -H 'Authorization: Bearer BEARER_TOKEN' \
  -H 'content-type: application/json' \
  --data '{
      "user_config": {
          "pg": {
              "max_connections": 1000
          }
      }
  }'
```

</TabItem>
</Tabs>

## Use connection pooling

When several clients or client threads are connecting to the database,
Aiven recommends using
[connection pooling](/docs/products/postgresql/concepts/pg-connection-pooling) to limit
the number of actual backend connections.
Connection pooling is available in all Aiven for PostgreSQL Startup,
Business, and Premium plans, and can be
[configured in the console](/docs/products/postgresql/howto/manage-pool).

<RelatedPages />

- [Advanced parameters for Aiven for PostgreSQL](/docs/products/postgresql/reference/advanced-params)
- [Aiven for PostgreSQL connection pooling](/docs/products/postgresql/concepts/pg-connection-pooling)
- [Manage a connection pool](/docs/products/postgresql/howto/manage-pool)
- [Change the service plan](/docs/products/postgresql/howto/change-service-plan)
