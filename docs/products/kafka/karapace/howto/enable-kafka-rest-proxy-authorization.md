---
title: Enable Apache Kafka® REST proxy authorization
sidebar_label: Enable authorization
description: Enable REST proxy authorization so Karapace enforces Apache Kafka ACLs on REST API requests.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import ConsoleIcon from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages";

REST proxy authorization applies
[Apache Kafka Access Control Lists (ACLs)](/docs/products/kafka/concepts/acl)
to requests made through the Karapace REST proxy.

When authorization is enabled, Karapace forwards HTTP basic authentication credentials
to Apache Kafka®. Apache Kafka authenticates the user and authorizes operations based
on the ACLs defined for the service.

When authorization is disabled, the REST proxy bypasses Apache Kafka ACLs, so REST API
calls are not restricted by those rules.

REST proxy authorization is disabled by default.

## Prerequisites

- An [Aiven for Apache Kafka®](/docs/products/kafka/get-started/create-kafka-service)
  service
- [REST proxy enabled](/docs/products/kafka/karapace/howto/enable-karapace) on the
  service (`kafka_rest`)

## Enable REST proxy authorization

:::warning
Enabling REST proxy authorization can disrupt access if Kafka ACLs are not configured
to allow the operations your clients need. Configure
[Access Control Lists](/docs/products/kafka/concepts/acl) before you enable
authorization.
:::

<Tabs groupId="enable-rest-proxy-auth">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io/), select your project and choose
   your Aiven for Apache Kafka® service.
1. Click <ConsoleLabel name="service settings"/>.
1. In **Advanced configuration**, click **Configure**.
1. Click <ConsoleIcon name="Add config options"/>.
1. Find `kafka_rest_authorization` and set it to **Enabled**.
1. Click **Save configuration**.

</TabItem>
<TabItem value="cli" label="CLI">

Enable REST proxy authorization with the [Aiven CLI](/docs/tools/cli):

```bash
avn service update -c kafka_rest_authorization=true SERVICE_NAME
```

To disable it:

```bash
avn service update -c kafka_rest_authorization=false SERVICE_NAME
```

Replace `SERVICE_NAME` with the name of your Aiven for Apache Kafka® service.

</TabItem>
</Tabs>

<RelatedPages/>

- [Enable schema registry and REST proxy](/docs/products/kafka/karapace/howto/enable-karapace)
- [Access Control Lists in Aiven for Apache Kafka®](/docs/products/kafka/concepts/acl)
- [Enable OAuth2/OIDC support for Apache Kafka® REST proxy](/docs/products/kafka/karapace/howto/enable-oauth-oidc-kafka-rest-proxy)
- [Apache Kafka® REST API](/docs/products/kafka/concepts/kafka-rest-api)
