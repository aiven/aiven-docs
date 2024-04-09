---
title: Enable Apache Kafka® REST proxy authorization
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Apache Kafka® REST proxy authorization enables you to use the RESTful interface to connect to Apache Kafka clusters, produce and consume messages, and perform administrative activities via the Aiven CLI.  It secures Apache Kafka resources by ensuring only authorized operations are permitted through the REST interface.

When you enable Apache Kafka REST proxy authorization, Karapace sends
the HTTP basic authentication credentials to Apache Kafka®. The
authentication and authorization are then performed by Apache Kafka,
depending on the ACL defined in Apache Kafka. To configure the ACLs for
authorization, see
[Apache Kafka Access Control Lists (ACLs)](/docs/products/kafka/concepts/acl).

When Apache Kafka REST proxy authorization is disabled, the REST Proxy
bypasses the Apache Kafka ACLs, so any operation via REST API call is
performed without any restrictions.

## Configure Apache Kafka REST Proxy Authorization


<Tabs groupId="sync">
<TabItem value="Console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io/), select your project and
   choose your Aiven for Apache Kafka® service.
1. Click **Service settings** from the sidebar.
1. Scroll down to the **Advanced configuration** section, and click **Configure**.
1. In the **Advanced configuration** dialog, click **Add configuration options**.
1. Locate the `kafka_rest_authorization` parameter and set it to `True` to enable.


</TabItem>
<TabItem value="CLI" label="CLI">

To **enable** REST proxy authorization, use the following command in the Aiven CLI,
replacing `SERVICE_NAME` with your actual service name:

```bash
avn service update -c kafka_rest=true SERVICE_NAME
```

To disable REST proxy authorization, use:

```bash
avn service update -c kafka_rest=false SERVICE_NAME
```
</TabItem>
</Tabs>
