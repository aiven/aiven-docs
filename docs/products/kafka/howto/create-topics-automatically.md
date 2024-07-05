---
title: Create Apache Kafka® topics automatically
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import {ConsoleIcon} from "@site/src/components/ConsoleIcons"

Apache Kafka® provides the capability to automatically create topics when a message is produced to a topic that does not exist.

By default, this feature is disabled in Aiven for Apache Kafka as a precaution against
accidental topic creation. When a message is produced to a non-existent topic,
the common error message is:

```bash
KafkaTimeoutError: Failed to update metadata after 60.0 secs.
```

In such cases, you have two options:

1. **Create topics in advance**: This approach involves manually
    [creating the topics](/docs/products/kafka/howto/create-topic) before they are used.
    It is generally recommended for production environments as it provides better
    control over topic settings such as partition count, replication factor, and
    retention time.
1. **Enable automatic topic creation**: While simpler, enabling automatic topic creation
   carries some drawbacks. It introduces the risk of inadvertently creating new topics,
   especially in the case of typos. Additionally, it might result in topics created
   with [default configuration values](set-kafka-parameters) defined at the service level.

:::note
When tiered storage is activated for your Aiven for Apache Kafka service, all new topics
will have tiered storage enabled by default.
[Learn more about tiered storage](/docs/products/kafka/concepts/kafka-tiered-storage).
:::


## Enable automatic topic creation

<Tabs groupId="setup">
<TabItem value="Console" label="Console" default>

To enable automatic topic creation through the Aiven Console, follow
these steps:

<<<<<<< HEAD
1.  In the [Aiven Console](https://console.aiven.io/), select your
    project and choose your Aiven for Apache Kafka® service.
2.  In the service page, select **Service settings** from the sidebar.
3.  On the **Service settings** page, scroll down to the **Advanced
    configuration** section, and click **Configure**.
4.  In the **Advanced configuration** dialog, click **Add configuration
    options**.
5.  Find the `auto_create_topics_enable` parameter and set it to true to
    enable automatic topic creation.
6.  Select **Save configuration**.
=======
1. Log in to the [Aiven Console](https://console.aiven.io/), select your
   project, and choose your Aiven for Apache Kafka® service.
1. Click <ConsoleLabel name="service settings"/> from the sidebar.
1. Scroll down to the **Advanced configuration** section, and click **Configure**.
1. In the **Advanced configuration** dialog, click
   <ConsoleLabel name="addadvancedconfiguration"/>.
1. Find the `auto_create_topics_enable` parameter and set it to true to
   enable automatic topic creation.
1. Click **Save configuration**.
>>>>>>> 80470d1 (fix: editorial and styles)

:::warning
Even when you enable automatic topic creation, the user account that
produces a message to a non-existing topic must have `admin`
permissions. Aiven for Apache Kafka validates the access control list
(ACL) before creating the topic. To change user permissions, go to
the **Users** tab in your service detail page in the [Aiven Console](https://console.aiven.io/).
:::

</TabItem>
<TabItem value="CLI" label="CLI">

To enable the automatic creation of topics on an existing Aiven for Apache Kafka service,
use the [Aiven CLI service update command](/docs/tools/cli/service-cli#avn-cli-service-update):

1. Run the following command, replacing `SERVICE_NAME` with the name of your service:

   ```bash
   avn service update SERVICE_NAME -c kafka.auto_create_topics_enable=true
   ```

   Parameters:

   - `auto_create_topics_enable=true`: Enables automatic topic creation.
   - `SERVICE_NAME`: The name of your Aiven for Apache Kafka service.

</TabItem>
</Tabs>

## Related pages

- [Manage Aiven for Apache Kafka® topics via CLI](/docs/tools/cli/service/topic#avn_cli_service_topic_create)
- [Create an Apache Kafka® topic](/docs/products/kafka/howto/create-topic)
