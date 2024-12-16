---
title: Prevent full disks
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Ensure your Aiven for Apache Kafka® services run smoothly by preventing low disk space. The Aiven platform actively monitors disk usage, triggering notifications when it exceeds 90%.

If any node in the service surpasses the critical threshold of disk
usage (more than 95%), the access control list (ACL) used to authorize
API requests by Apache Kafka clients is updated on all nodes. This
update prevents operations that can further increase disk usage,
including:

- The `Write` and `IdempotentWrite` operations are used by clients to produce
  new messages.
- The `CreateTopics` operation creates new topics, each of which carries some
  overhead on disk.

When the disk space is insufficient and the ACL blocks write operations, you encounter
an error. For example, when using the Python client for Apache Kafka, you might
receive the following error message:

```plaintext
TopicAuthorizationFailedError: [Error 29] TopicAuthorizationFailedError: your-topic
```

## Upgrade to a larger service plan

<Tabs groupId="upgrade-plan">
<TabItem value="console" label="Console" default>

To resolve disk space issues, you can upgrade to a larger service plan:

1. In the [Aiven Console](https://console.aiven.io/), select your
   project and choose your Aiven for Apache Kafka® service.
1. On the sidebar, Click <ConsoleLabel name="service settings"/>.
1. In to **Service plan** section, click <ConsoleLabel name="actions"/> >
   **Manage additional storage**.
1. In the **Upgrade service storage** screen, click **Change plan**
   choose the new service plan and tier or use the slider to adjust disk storage.

This deploys new nodes with increased disk space. After data migration from the old nodes
to the new ones, disk usage returns to an acceptable level, and write operations are
allowed again.

</TabItem>
<TabItem value="cli" label="CLI">

To upgrade your service plan using the [Aiven CLI](/docs/tools/cli):

```bash
avn service update --project <PROJECT_NAME> --service_name <SERVICE_NAME> --plan <NEW_PLAN_NAME> --disk-space-gib <DISK_SPACE_GIB>
```

Parameters:

- `<PROJECT_NAME>`: The name of the project.
- `<SERVICE_NAME>`: The name of the Aiven for Apache service to update.
- `--plan <NEW_PLAN_NAME>`: The Aiven subscription plan name. Refer to
  [`avn_service_plan`](/docs/tools/cli/service-cli#avn-service-plan) for available plans.
- `--disk-space-gib <DISK_SPACE_GIB>`: The total amount of disk space for data storage
  (in GiB).

</TabItem>
</Tabs>

## Add additional storage space

For instructions on adding storage space, see [Scale disk storage](/docs/platform/howto/add-storage-space).

## Delete one or more topics

<Tabs groupId="delete-topics">
<TabItem value="console" label="Console" default>

Free up disk space by deleting topics:

1. In the [Aiven Console](https://console.aiven.io/), select your
   project and choose your Aiven for Apache Kafka® service.
1. On the sidebar, click <ConsoleLabel name="topics" />.
1. To delete an existing topic, click the topic to remove.

   - In the **Topic info** screen, click **Delete** and confirm the deletion.
   - Alternatively, in the topic row, click the <ConsoleLabel name="actions"/> > <ConsoleLabel name="Delete topic"/>.

</TabItem>
<TabItem value="cli" label="CLI">

To delete topics using the [Aiven CLI](/docs/tools/cli):

```bash
avn service topic-delete --service_name SERVICE_NAME --topic TOPIC_NAME
```

Parameters:

- `SERVICE_NAME`: The name of your Aiven for Apache Kafka service.
- `TOPIC_NAME`: The name of the topic to delete.

</TabItem>
<TabItem value="api" label="API">

To delete topics using the Aiven API:

```sh
curl -X DELETE \
  "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME/topic/TOPIC_NAME" \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

Parameters:

- `PROJECT_NAME`: The name of your project.
- `SERVICE_NAME`: The name of your Aiven you for Apache Kafka service.
- `TOPIC_NAME`: The name of the topic to delete.
- `API_TOKEN`: Your [Aiven token](/docs/platform/concepts/authentication-tokens).

</TabItem>
</Tabs>

Deleting topics frees up the disk space they used. The log cleaner process can take a
few minutes to remove the associated data files from the disk. Once complete, the
access control list (ACL) updates to allow write operations.
<!-- vale off -->
:::note
[Admin](/docs/platform/concepts/permissions) access is required to
perform this action.
:::

## Decrease retention time/size

To free up space without deleting a topic, consider reducing the retention time or size
for one or more topics. If you know the age of the oldest messages in a topic, you can
lower the retention time to make more space available. For more details,
see [how to change the retention period](/docs/products/kafka/howto/change-retention-period).
