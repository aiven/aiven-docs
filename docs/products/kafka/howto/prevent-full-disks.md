---
title: Prevent full disks
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

To ensure the smooth functioning of your **Aiven for Apache Kafka®**
services, preventing disk space from running low is important. The Aiven
platform actively monitors the available disk space, and if the usage
exceeds 90%, you will be notified.

If any node in the service surpasses the critical threshold of disk
usage (more than 97%), the access control list (ACL) used to authorize
API requests by Apache Kafka clients will be updated on all nodes. This
update will prevent operations that could further increase disk usage,
including:

-   The `Write` and `IdempotentWrite` operations that clients use to
    produce new messages.
-   The `CreateTopics` operation that creates one or more topics, each
    carrying some overhead on disk.

When the disk space is insufficient, and the ACL blocks write
operations, you will encounter an error. For example, if you are using
the Python client for Apache Kafka, you may receive the following error
message:

```
TopicAuthorizationFailedError: [Error 29] TopicAuthorizationFailedError: your-topic
```

## Upgrade to a larger service plan

1.  In the [Aiven Console](https://console.aiven.io/), select your
    project and then choose your Aiven for Apache Kafka® service.
2.  In the service page, select **Service settings** from the sidebar.
3.  On the **Service settings** page, scroll to **Service plan** and
    click <ConsoleLabel name="actions"/> > **Change plan**.
4.  In the **Change service plan** dialog, select your new service plan
    and select **Change**.

This will deploy new nodes with increased disk space. Once the data is
migrated from the old nodes to the new ones, disk usage will return to
an acceptable level, and write operations will be allowed again.

You can also use the CLI command
[`avn service update`](/docs/tools/cli/service-cli#avn-cli-service-update) to upgrade your
service plan.

## Add additional storage space

Follow the steps from our article on
[how to add additional storage to your services](/docs/platform/howto/add-storage-space).

## Delete one or more topics

1.  In the [Aiven Console](https://console.aiven.io/), select your
    project and then choose your Aiven for Apache Kafka® service.
2.  Select **Topics** from the sidebar.
3.  Select the topic to remove, and in the **Topic info**
    screen, select **Remove** and **Delete** to delete the topic.

Deleting a topic frees up the disk space it previously used. The log
cleaner process may take a few minutes to remove the associated data
files from the disk. Once completed, the access control list (ACL) is
updated to allow write operations.

You can also use the CLI command
[avn cli delete-topic](/docs/tools/cli/service/topic) or make a call to [API
endpoint](https://api.aiven.io/doc/#operation/ServiceKafkaTopicDelete)
from any native Apache Kafka client to delete topics.

:::note
You must use an admin-level user account for the connection.
:::

## Decrease retention time/size

Another way to make more space available without deleting an entire
topic is to reduce the retention time or size for one or more topics. If
you know how old the oldest messages are in a topic, you can lower the
retention time for the topic to make more space available. Follow the
instructions
[to change retention period](/docs/products/kafka/howto/change-retention-period).
