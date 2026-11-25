---
title: Connection limits in Aiven for MySQL®
sidebar_label: Connection limits
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Check how many simultaneous connections your Aiven for MySQL® service allows, lower the service-wide limit to reserve memory, and cap the connections each database user can open.

Aiven for MySQL has two connection limits:

- **`max_connections`:** The maximum number of simultaneous connections for all users of
  the service combined.
- **`max_user_connections`:** The maximum number of simultaneous connections for each
  database user. By default, there's no per-user limit.

## Default service-wide limit

By default, `max_connections` is set to the limit of your service plan, which depends on
how much RAM your service has.

:::note
Independent of the size, an `extra_connection` with a value of `1` is
added for the system process.
:::

### Under 4 GiB

For services with less than 4 GiB of RAM, the number of allowed connections is per
GiB:

$$
{max\_connections} =  75 \times RAM + extra\_connection
$$

:::note[Example]
With 2 GiB of RAM, the maximum number of connections is
${max\_connections} = 75 \times 2 + 1$
:::

### 4 GiB or more

For services with 4 GiB or more of RAM, the number of allowed connections is
per GiB:

$$
{max\_connections} = 100 \times RAM + extra\_connection
$$

:::note[Example]
With 7 GiB of RAM, the maximum number of connections is
${max\_connections} = 100 \times 7 + 1 $
:::

To check the current limits of your service, run the following query:

```sql
SELECT @@max_connections, @@max_user_connections;
```

## Set connection limits

Set the connection limits with the following advanced parameters:

| Parameter                    | Allowed values                                 | Default       |
| ---------------------------- | ---------------------------------------------- | ------------- |
| `mysql.max_connections`      | From `30` up to the limit of your plan         | Plan limit    |
| `mysql.max_user_connections` | `0`, or at least `10` below `max_connections`  | `0`, no limit |

Consider the following when you set the limits:

- **Service-wide limit:** Lower `mysql.max_connections` to reserve memory for other work.
  You can't set a value higher than the limit of your plan. To allow more connections,
  [upgrade to a plan with more RAM](/docs/products/mysql/howto/change-service-plan).
- **Plan upgrades:** After you upgrade the plan, a `mysql.max_connections` value you set
  explicitly stays the same. To use the higher limit of the new plan, increase the value
  yourself.
- **Per-user limit:** `mysql.max_user_connections` applies to each database user
  separately. The headroom of 10 connections keeps monitoring and your own admin sessions
  available when an application uses up its own limit. Aiven's replication and management
  connections aren't affected by this limit.

To set the connection limits:

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. Access your Aiven for MySQL service in the [Aiven Console](https://console.aiven.io/).
1. In the sidebar, click <ConsoleLabel name="service settings"/>.
1. Scroll to the **Advanced configuration** section and click **Configure**.
1. In the **Advanced configuration** window, click **Add configuration option**.
1. Use the search bar to find `mysql.max_connections` or `mysql.max_user_connections`,
   and set the value.
1. Click **Save configuration**.

</TabItem>
<TabItem value="cli" label="CLI">

Run the [avn service update](/docs/tools/cli/service-cli#avn-cli-service-update) command:

```bash
avn service update SERVICE_NAME \
  -c mysql.max_connections=MAX_CONNECTIONS \
  -c mysql.max_user_connections=MAX_USER_CONNECTIONS
```

Replace the following placeholders:

- `SERVICE_NAME`: the name of your service
- `MAX_CONNECTIONS`: the service-wide limit
- `MAX_USER_CONNECTIONS`: the per-user limit, or `0` for no limit

</TabItem>
<TabItem value="api" label="API">

Use the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
API to set the parameters in the `user_config.mysql` object:

```bash
curl -X PUT \
  https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
  -H "Authorization: Bearer BEARER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
        "user_config": {
          "mysql": {
            "max_connections": 200,
            "max_user_connections": 50
          }
        }
      }'
```

</TabItem>
<TabItem value="terraform" label="Terraform">

Set the `max_connections` and `max_user_connections` attributes in the
`mysql_user_config.mysql` block of your
[`aiven_mysql` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/mysql):

```hcl
resource "aiven_mysql" "example_mysql" {
  project      = var.aiven_project_name
  cloud_name   = "google-europe-west1"
  plan         = "business-4"
  service_name = "example-mysql"

  mysql_user_config {
    mysql {
      max_connections      = 200
      max_user_connections = 50
    }
  }
}
```

</TabItem>
</Tabs>

If you get an error that your service requires a maintenance update, apply the
[available maintenance updates](/docs/products/mysql/howto/maintenance-updates) and try
again.

## Fix a per-user connection limit error

If a client reports an error such as
`User 'exampleuser' has exceeded the 'max_user_connections' resource`, that user has
reached the per-user limit, not the service-wide `max_connections` limit. Raising
`mysql.max_connections` doesn't change the per-user limit.

To fix it, do one of the following:

- Increase `mysql.max_user_connections`, or set it to `0` to remove the per-user limit.
- Reduce the number of concurrent connections the user opens, for example, with a
  connection pool in your application.
- [Distribute connections across multiple database users](/docs/products/mysql/howto/manage-service-users).

<RelatedPages />

- [Advanced parameters for Aiven for MySQL](/docs/products/mysql/reference/advanced-params)
- [MySQL tuning for concurrency](/docs/products/mysql/concepts/mysql-tuning-and-concurrency)
- [Prepare your Aiven for MySQL service for high load](/docs/products/mysql/howto/prepare-for-high-load)
- [Change the service plan](/docs/products/mysql/howto/change-service-plan)
