---
title: Upgrade the MirrorMaker 2 version
sidebar_label: Upgrade version
keywords: [mirrormaker2, upgrade, version, kafka]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Upgrade your Aiven for Apache Kafka® MirrorMaker 2 service to a later supported version without recreating it.
You can go directly to any later supported version, for example from 3.9 to 4.3.

Your service stays on its current version until you upgrade it or Aiven upgrades it under
its [version lifecycle policy](#version-lifecycle).

## Prerequisites

- An Aiven for Apache Kafka® MirrorMaker 2 service
- A later supported version that is [compatible](#version-compatibility) with your
  source and target Apache Kafka clusters
- Optional: A non-production MirrorMaker 2 service to test the upgrade on before you
  upgrade a production service

:::warning[Warning]
You can't downgrade to an earlier version after you upgrade. To use an earlier version,
create a new MirrorMaker 2 service and configure its replication flows.
:::

## Check the current version

<Tabs groupId="check-method">
<TabItem value="console" label="Aiven Console" default>

1. In the [Aiven Console](https://console.aiven.io/), open your project.
1. Select your Aiven for Apache Kafka® MirrorMaker 2 service.
1. Click <ConsoleLabel name="overview"/>.
1. In the **Maintenance** section, check the **Version**.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Run:

```bash
avn service get SERVICE_NAME --project PROJECT_NAME --json \
  | jq -r '.user_config.kafka_mirrormaker_version'
```

Replace the following:

- `SERVICE_NAME`: The name of your MirrorMaker 2 service.
- `PROJECT_NAME`: The name of your Aiven project.

</TabItem>
</Tabs>

## Upgrade the version

<Tabs groupId="check-method">
<TabItem value="console" label="Aiven Console" default>

1. In the [Aiven Console](https://console.aiven.io/), open your project.
1. Select your Aiven for Apache Kafka® MirrorMaker 2 service.
1. Click <ConsoleLabel name="overview"/>.
1. In the **Maintenance** section, click <ConsoleLabel name="actions"/> > **Upgrade version**.
1. Select the version to upgrade to. The list shows the versions available to you.
1. Confirm the upgrade.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

To list the available versions and their end-of-life dates, run
[`avn service versions`](/docs/tools/cli/service-cli#avn-service-versions).

To upgrade the service to a later supported version, run the
[`avn service update`](/docs/tools/cli/service-cli#avn-cli-service-update) command:

```bash
avn service update SERVICE_NAME --project PROJECT_NAME \
  -c kafka_mirrormaker_version=TARGET_VERSION
```

Replace the following:

- `SERVICE_NAME`: The name of your MirrorMaker 2 service.
- `PROJECT_NAME`: The name of your Aiven project.
- `TARGET_VERSION`: A later supported version.

The `kafka_mirrormaker_version` parameter specifies the version to use.

</TabItem>
<TabItem value="api" label="Aiven API">

Send a `PUT` request to the service update endpoint:

```bash
curl --request PUT \
  --url "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME" \
  --header "Authorization: aivenv1 API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "user_config": {
      "kafka_mirrormaker_version": "TARGET_VERSION"
    }
  }'
```

Replace the following:

- `PROJECT_NAME`: The name of your Aiven project.
- `SERVICE_NAME`: The name of your MirrorMaker 2 service.
- `API_TOKEN`: Your Aiven API token.
- `TARGET_VERSION`: A later supported version.

</TabItem>
</Tabs>

## What happens during an upgrade

When you upgrade the MirrorMaker 2 version, Aiven replaces the service nodes with nodes
running the selected version, one node at a time. The upgrade starts when you confirm it
and doesn't wait for your maintenance window.

During the upgrade, the following happens:

- Only the replication tasks running on the node that Aiven is replacing pause. The rest
  of the service continues to replicate.
- Replication resumes automatically from the last committed offsets.
- Your existing replication flows and their configuration are preserved, so you don't
  need to recreate them.
- Some messages can be replicated again after a node is replaced, so consumers can see
  duplicates.

You don't need to take any action after the upgrade. To confirm that it succeeded, see
[Verify the upgrade](#verify-the-upgrade).

:::note
Replication pauses on the tasks of each node that Aiven replaces. If a pause lasts longer
than the retention period of a source topic, messages that retention deletes during the
pause aren't replicated to the target cluster. Set the retention period of your source
topics to cover the pause.
:::

## Verify the upgrade

After upgrading:

1. Ensure that the MirrorMaker 2 service status is **Running**.
1. Click <ConsoleLabel name="overview"/>.
1. In the **Maintenance** section, verify the **Version**.
1. Ensure that your replication flows are running.
1. Monitor replication metrics. For more information, see
   [Monitor replication execution](/docs/products/kafka/kafka-mirrormaker/howto/monitor-replication-execution).

## Version compatibility

The MirrorMaker 2 version doesn't need to match the Apache Kafka versions of your source
and target clusters. The service type of your Aiven for Apache Kafka service, such as
Classic or Standard, and the use of diskless topics don't limit the MirrorMaker 2
versions you can use.

Before upgrading, verify that the versions are compatible. For more information, see the
[Apache Kafka compatibility documentation](https://kafka.apache.org/43/getting-started/compatibility/).

## Version lifecycle

MirrorMaker 2 versions have the same end-of-availability and end-of-life dates as the
matching Apache Kafka versions. For example, MirrorMaker 2 3.9 reaches end of life on the
same date as Apache Kafka 3.9.

Aiven notifies you before your service version reaches end of life. If you don't upgrade
before the end-of-life date, Aiven automatically upgrades eligible services according to
its version lifecycle policy.

For current lifecycle dates and more information about automatic upgrades, see
[Aiven service and tool version lifecycle](/docs/platform/reference/eol-for-major-versions).
<RelatedPages/>

- [Aiven for Apache Kafka® MirrorMaker 2](/docs/products/kafka/kafka-mirrormaker)
- [Get started with Apache Kafka® MirrorMaker 2](/docs/products/kafka/kafka-mirrormaker/get-started)
