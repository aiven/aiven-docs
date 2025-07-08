---
title: Create service users
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Service users are users that only exist in the scope of the corresponding Aiven service.
They are unique to this service and not shared with any other services,
and can be granted restricted permissions compared to the default `avnadmin`
user.

You can add service users for all the Aiven services except Aiven for Apache Flink®
and Aiven for Grafana®.

:::note
By default, Aiven-managed services allow up to 50 users.
This limit does not apply to the following services:

- Aiven for AlloyDB Omni
- Aiven for Apache Cassandra®
- Aiven for Caching
- Aiven for Dragonfly
- Aiven for MySQL®
- Aiven for PostgreSQL®
- Aiven for Valkey™

To increase the maximum number of users allowed for a service,
[create a support ticket](/docs/platform/howto/support) to request an increase.
:::

## Create a service user

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1.  Log in to [Aiven Console](https://console.aiven.io/).
1.  On the **Services** page, select your service.
1.  From the sidebar, click <ConsoleLabel name="serviceusers"/>.
1.  Click **Add service user** or **Create user**.
1.  Enter a name for your service user.
1.  Set up all the other configuration options. If a password is required,
    a random password is generated automatically. You can modify it later.
1.  Click **Add service user**.

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the service user resource for your Aiven service:

- Aiven for AlloyDB Omni: [`aiven_alloydbomni_user`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/alloydbomni_user)
- Aiven for ClickHouse®: [`aiven_clickhouse_user`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/clickhouse_user)
- Aiven for Apache Kafka®: [`aiven_kafka_user`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/kafka_user)
- Aiven for MySQL®: [`aiven_mysql_user`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/mysql_user)
- Aiven for OpenSearch®: [`aiven_opensearch_user`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/opensearch_user)
- Aiven for PostgreSQL®: [`aiven_pg_user`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/pg_user)
- Aiven for Valkey™: [`aiven_valkey_user`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/valkey_user)

</TabItem>
</Tabs>

<RelatedPages/>

- [Create a service user using the Aiven CLI](/docs/tools/cli/service/user#avn-service-user-create)
