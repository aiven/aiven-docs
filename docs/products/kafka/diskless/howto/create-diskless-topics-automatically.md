---
title: Create diskless topics automatically using regular expressions
sidebar_label: Create diskless topics automatically
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

<!-- markdownlint-disable-next-line MD013 -->
Configure your Aiven for Apache Kafka® service to automatically create new topics as diskless topics when their names match configured regular expressions.
This lets clients and connectors use diskless topics without setting `diskless.enable=true`
in each create-topic request.

When a client creates a topic, the service compares the topic name against the configured
regular expressions. If the name matches any expression, the service creates the topic as
diskless.

## When to use regular expressions

Use regular expressions to automatically create new topics as diskless topics based on
their names, without requiring every client or workflow to set `diskless.enable=true`.
This is useful when:

- Clients do not support setting `diskless.enable=true` in the topic configuration,
  or you cannot change the client code to include it.
- Kafka Connect frameworks, especially CDC connectors, create and alter topics dynamically
  and might not let you add diskless settings to the workflow.
- Some clients reject unknown topic configurations before the request reaches the broker.
- MirrorMaker 2 replicates source topics with their existing configurations.

With this configuration, the service creates diskless topics based only on topic names.

## Behavior and limitations

The service applies configured regular expressions only when it creates a new topic.
Existing topics do not change.

### Topic matching

For each new topic, the service checks the create-topic request and topic name in this
order:

- If the request sets `diskless.enable=true`, the service creates the topic as a diskless
  topic.
- If the topic name matches any configured regular expression, the service creates the
  topic as a diskless topic.
- Otherwise, the service creates the topic as a classic topic.

### Excluded topics

The service does not apply regular expressions to:

- Internal Kafka topics, such as topics that start with `__`.
- Compacted topics. If a topic is created with `cleanup.policy=compact` or
  `cleanup.policy=compact,delete`, the service creates it as a classic topic even if its
  name matches a regular expression.

### Classic topic conflicts

If a non-compacted topic name matches a configured regular expression, the service creates
it as a diskless topic. If you set `diskless.enable=false` for the same topic, the request
fails with a conflict error.

To create a classic topic, use a topic name that does not match any configured regular
expression.

In the Aiven Console, the same conflict occurs if the topic name matches a configured
regular expression.

### Other limitations

- Invalid regular expressions are ignored and do not match any topics. Other valid regular
  expressions continue to be evaluated.
- The regular expressions have no effect when `kafka_diskless.enabled` is `false`.
- Topic type is set when the topic is created and cannot be changed later.
- Do not set a replication factor. If you must set it when creating diskless topics,
  use `1` or `-1`.

## Prerequisites

To configure default diskless topic regular expressions, you need:

- An Aiven for Apache Kafka® service with diskless topics enabled.
- A project role or permission that lets you update service configuration. For details,
  see [Project roles and permissions](/docs/platform/concepts/permissions#project-roles-and-permissions).

::::note
For existing services, automatic diskless topic creation by regular expression is available
after scheduled maintenance updates complete.
::::

## Configure default diskless topic regular expressions

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
- Regex features such as look-ahead assertions are not supported.

Test each regular expression before you apply it. Use specific regular expressions where
possible. Avoid broad regular expressions such as `.*` unless most new non-internal,
non-compacted topics must be diskless.

:::note
The `auto_diskless_topic_regexes` option is not available in the Aiven Console for services
with diskless topics enabled. Set it using the API or CLI.
:::

<Tabs groupId="set-method">
<TabItem value="api" label="API" default>

Use the Aiven API to update the service configuration.

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
  --header "Authorization: Bearer TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "user_config": {
      "kafka_diskless": {
        "enabled": true,
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
option. Pass the value as a JSON array. Set `kafka_diskless.enabled=true` to keep diskless
topics enabled when you update the configuration.

```bash
avn service update SERVICE_NAME \
  --project PROJECT_NAME \
  -c kafka_diskless.enabled=true \
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

Changing the list of regular expressions might briefly interrupt topic creation requests.
Kafka brokers remain online.

If you manage services or topics with infrastructure as code, ensure your topic naming
conventions and regular expressions stay aligned. If you use the Aiven Terraform Provider,
verify that your provider version supports `auto_diskless_topic_regexes` before adding
this setting to your configuration.

After you save the configuration, Aiven applies the regular expressions to new topic
creation requests. Existing topics keep their current type.

## Regular expression examples

| Goal                                                       | Regular expression |
| ---------------------------------------------------------- | ------------------ |
| Create topics with the `events.` prefix as diskless topics | `events\..*`       |
| Create topics with the `cdc.` prefix as diskless topics    | `cdc\..*`          |
| Create topics ending in `.diskless` as diskless topics     | `.*\.diskless`     |
| Create topics that contain `.events.` as diskless topics   | `.*\.events\..*`   |

Regular expression matching uses full-match semantics, so leading `^` and trailing `$`
anchors are optional. Use `.*` to match variable text before or after a fixed value. For
example, `events` matches only the topic name `events`. To match `events.orders`, use
`events\..*`.

## Verify the topic type

After you create a topic that matches one of the regular expressions, verify that it was
created as a diskless topic.

<Tabs groupId="verify-method">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io/), click your Aiven for Apache Kafka
   service.
1. Click <ConsoleLabel name="manage stream" /> > **Topics**.
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
`auto_diskless_topic_regexes` to an empty array or `null`.

:::note
The `auto_diskless_topic_regexes` option is not available in the Aiven Console for services
with diskless topics enabled. Update it using the API or CLI.
:::

<Tabs groupId="remove-method">
<TabItem value="api" label="API" default>

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
  --header "Authorization: Bearer TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "user_config": {
      "kafka_diskless": {
        "enabled": true,
        "auto_diskless_topic_regexes": []
      }
    }
  }'
```

To clear the value, set `auto_diskless_topic_regexes` to `null`.

</TabItem>
<TabItem value="cli" label="CLI">

Set `kafka_diskless.enabled=true` to keep diskless topics enabled when you update the
configuration.

```bash
avn service update SERVICE_NAME \
  --project PROJECT_NAME \
  -c kafka_diskless.enabled=true \
  -c kafka_diskless.auto_diskless_topic_regexes='[]'
```

To clear the value, set `auto_diskless_topic_regexes` to `null`:

```bash
avn service update SERVICE_NAME \
  --project PROJECT_NAME \
  -c kafka_diskless.enabled=true \
  -c kafka_diskless.auto_diskless_topic_regexes=null
```

</TabItem>
</Tabs>

Removing the regular expressions applies only to new topics. It does not change existing
topics.
The change does not disable diskless topics for the service. It only removes automatic topic
name matching.

<RelatedPages/>

- [Diskless topics for Apache Kafka®](/docs/products/kafka/diskless/concepts/diskless-topic-overview)
- [Create Apache Kafka® topics](/docs/products/kafka/howto/create-topic)
- [Compare diskless and classic topics](/docs/products/kafka/diskless/concepts/topics-vs-classic)
- [Limitations of diskless topics](/docs/products/kafka/diskless/concepts/limitations)
