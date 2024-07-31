---
title: Get partition details of an Apache Kafka® topic
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Learn how to get partition details of an Apache Kafka® topic.

<Tabs groupId="group1">
<TabItem value="Console" label="Console" default>

1.  Log in to [Aiven Console](https://console.aiven.io/) and select your
    Aiven for Apache Kafka service.
1.  Select **Topics** from the left sidebar.
1.  Select a specific topic in the **Topics** screen or click the
    ellipsis (More options).
1.  On the **Topics info** screen, select **Partitions** to view
    detailed information about the partitions.

</TabItem>
<TabItem value="API" label="API">

Retrieve topic details with an API call using [the endpoint to get Kafka
topic info](https://api.aiven.io/doc/#operation/ServiceKafkaTopicGet).

Learn more about API usage in the [Aiven API overview](/docs/tools/api).

</TabItem>

<TabItem value="CLI" label="CLI">

Retrieve topic details by using Aiven CLI commands. Find the full list
of commands for `avn service topic` in
[the CLI reference](/docs/tools/cli/service/topic).

For example, this bash script, with a help of `jq` utility, lists topics
and their details for a specified Apache Kafka service:

```bash
#!/bin/bash
proj=${1:-YOUR-AIVEN-PROJECT-NAME}
serv="${2:-YOUR-KAFKA-SERVICE-NAME}"
cloud=$(avn service get --project $proj $serv --json | jq -r '.cloud_name')
topics=$(avn service topic-list --project $proj $serv --json | jq -r '.[] | .topic_name')

echo "Cloud: $cloud Service: $serv"
for topic in $topics
do
   echo "Topic: $topic"
   avn service topic-get --project $proj $serv $topic
done
```

</TabItem>
</Tabs>
