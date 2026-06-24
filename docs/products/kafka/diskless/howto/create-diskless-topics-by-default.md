---
title: Create diskless topics by default using regular expressions
sidebar_label: Create diskless topics by default
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import ConsoleIcon from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Configure an Aiven for Apache Kafka® service to create topics as diskless topics by
default when their names match configured regular expressions, without changing client
applications.

Add one or more regular expressions to the service configuration to match the topic names
to create as diskless topics. When a client creates a topic, the service compares the
topic name against the configured regular expressions. If the name matches any of them,
the service creates the topic as a diskless topic.

## When to use regular expressions

Use regular expressions to create new topics as diskless by default based on their names,
without requiring every client or workflow to set `diskless.enable=true`. This is useful
when:

- Some clients reject unknown topic configurations before the request reaches the broker.
- Kafka Connect frameworks, especially CDC connectors, can create
  and alter topics dynamically and might not allow you to add diskless settings to the
  workflow.
- MirrorMaker 2 replicates source topics with their existing configurations.

Regular expressions let these clients and tools create diskless topics based on the topic
name alone.

## Behavior and limitations

For each new topic, the service applies the configured regular expressions as follows:

- If the topic name matches any configured regular expression, the service creates the
  topic as diskless.
- If no configured regular expression matches the topic name, the service creates the
  topic as a classic topic.
- The regular expression must match the full topic name.
- The service excludes internal Kafka topics, such as topics that start with `__`.
- The service excludes compacted topics. If a topic is created with
  `cleanup.policy=compact` or `cleanup.policy=compact,delete`, the service creates it as a
  classic topic even if its name matches a regular expression.
- Existing topics do not change.

For non-compacted topics, use names that do not match any configured regular expression to
create classic topics. If a topic name matches a regular expression and the create-topic
request explicitly sets `diskless.enable=false`, the request fails with an HTTP 409
Conflict error.

Topic type is set when the topic is created and cannot be changed later.

## Before you begin

Before you begin, ensure you have:

- An Aiven for Apache Kafka service with diskless topics enabled.
- `account:kafka_diskless_allowed` enabled by Aiven.
- The `services:write` OAuth scope to update the service configuration.

## Set default diskless topic regular expressions

Set `auto_diskless_topic_regexes` in the `kafka_diskless` section of the Kafka service
configuration. Add each topic-name regular expression as a separate value.

Before you add regular expressions, review these requirements:

- You can add up to 32 regular expressions.
- Each regular expression can contain up to 128 characters.
- Regular expressions use Java
  [`java.util.regex.Pattern`](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html)
  syntax.
- Supported characters are alphanumeric characters and
  `^ $ - _ . * + ? \ [ ] | { } ( )`.
- Unsupported characters, such as `#` or whitespace, are rejected.
- Regex features that require unsupported characters, such as lookaheads, are not
  supported.

Test each regular expression before you apply it. Use specific regular expressions where
possible. Avoid broad regular expressions such as `.*` unless most new non-internal,
non-compacted topics must be diskless.

<Tabs groupId="set-method">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io/), click your Aiven for Apache Kafka
   service.
1. Click <ConsoleLabel name="Service settings"/>.
1. Scroll to **Advanced configuration** and click **Configure**.
1. Click <ConsoleIcon name="Add config options"/>.
1. Find `kafka_diskless.auto_diskless_topic_regexes` and add each regular expression as a
   value.
1. Click **Save configuration**.

</TabItem>
<TabItem value="api" label="API">

Use the Aiven API to update the service configuration.

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
  --header "Authorization: Bearer TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "user_config": {
      "kafka_diskless": {
        "auto_diskless_topic_regexes": ["events\\..*", "cdc\\..*"]
      }
    }
  }'
```

Replace:

- `PROJECT_NAME` with the name of your Aiven project.
- `SERVICE_NAME` with the name of your Aiven for Apache Kafka service.
- `TOKEN` with your Aiven authentication token.
- `["events\\..*", "cdc\\..*"]` with the JSON-escaped regular expressions for topic names
  to create as diskless topics.

</TabItem>
<TabItem value="cli" label="CLI">

Use the [Aiven CLI](/docs/tools/cli) to set the regular expressions with the `-c`
option. Pass the value as a JSON array.

```bash
avn service update SERVICE_NAME \
  --project PROJECT_NAME \
  -c kafka_diskless.auto_diskless_topic_regexes='["events\\..*", "cdc\\..*"]'
```

Replace:

- `SERVICE_NAME` with the name of your Aiven for Apache Kafka service.
- `PROJECT_NAME` with the name of your Aiven project.
- `["events\\..*", "cdc\\..*"]` with the JSON-escaped regular expressions for topic names
  to create as diskless topics.

If the CLI rejects the array value, use the API.

</TabItem>
</Tabs>

If you manage topics with an infrastructure-as-code tool, make sure your topic naming
conventions and regular expressions stay aligned. The topic type can be determined by the
configured regular expressions instead of the topic creation request.

To confirm whether the Aiven Terraform provider supports the
`auto_diskless_topic_regexes` attribute, see the provider changelog.

After you save the configuration, Aiven applies the regular expressions to new topic
creation requests. Existing topics keep their current type.

Changing the regular expressions triggers a brief restart of the topic API layer, during
which topic creation requests might fail. Kafka brokers remain online.

## Regular expression examples

| Goal                                                       | Regular expression |
| ---------------------------------------------------------- | ------------------ |
| Create topics with the `events.` prefix as diskless topics | `events\..*`       |
| Create topics with the `cdc.` prefix as diskless topics    | `cdc\..*`          |
| Create topics ending in `.diskless` as diskless topics     | `.*\.diskless`     |
| Create topics that contain `.events.` as diskless topics   | `.*\.events\..*`   |

Matching uses full-match semantics, so leading `^` and trailing `$` anchors are optional.
Use `.*` to match variable text before or after a fixed value. For example, `events`
matches only the topic name `events`. To match `events.orders`, use `events\..*`.

## Verify the topic type

After you create a topic that matches one of the regular expressions, verify that it was
created as a diskless topic.

<Tabs groupId="verify-method">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io/), click your Aiven for Apache Kafka
   service.
1. Click <ConsoleLabel name="Topics"/>.
1. Check the **Topic type** column.

Topics that match a configured regular expression show **Diskless**.

</TabItem>
<TabItem value="api" label="API">

```bash
BASE_URL="https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME"

curl --request GET \
  --url "$BASE_URL/topic/TOPIC_NAME" \
  --header "Authorization: Bearer TOKEN"
```

In the output, verify that `diskless_enable` is set to `true`.

</TabItem>
<TabItem value="cli" label="CLI">

```bash
avn service topic-get SERVICE_NAME TOPIC_NAME \
  --project PROJECT_NAME
```

In the output, verify that `diskless_enable` is set to `true`.

```json
{
  "topic_name": "events.orders",
  "diskless_enable": true,
  "state": "ACTIVE"
}
```

</TabItem>
</Tabs>

## Remove default diskless topic regular expressions

To stop creating matching topics as diskless topics by default, set
`auto_diskless_topic_regexes` to an empty array.

<Tabs groupId="remove-method">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io/), click your Aiven for Apache Kafka
   service.
1. Click <ConsoleLabel name="Service settings"/>.
1. Scroll to **Advanced configuration** and click **Configure**.
1. Find `kafka_diskless.auto_diskless_topic_regexes` and remove all values.
1. Click **Save configuration**.

</TabItem>
<TabItem value="api" label="API">

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
  --header "Authorization: Bearer TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "user_config": {
      "kafka_diskless": {
        "auto_diskless_topic_regexes": []
      }
    }
  }'
```

</TabItem>
<TabItem value="cli" label="CLI">

```bash
avn service update SERVICE_NAME \
  --project PROJECT_NAME \
  -c kafka_diskless.auto_diskless_topic_regexes='[]'
```

</TabItem>
</Tabs>

This change affects only new topics. Existing topics are not changed.

This does not turn off diskless topics for the service. It only removes the automatic
topic name matching behavior.

<RelatedPages/>

- [Diskless topics for Apache Kafka®](/docs/products/kafka/diskless/concepts/diskless-topic-overview)
- [Create Apache Kafka® topics](/docs/products/kafka/howto/create-topic)
- [Compare diskless and classic topics](/docs/products/kafka/diskless/concepts/topics-vs-classic)
- [Limitations of diskless topics](/docs/products/kafka/diskless/concepts/limitations)
