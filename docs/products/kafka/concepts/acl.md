---
title: Access Control Lists in Aiven for Apache Kafka®
sidebar_label: Access control lists
---

Access Control Lists (ACLs) in Aiven for Apache Kafka® manage access to topics, consumer groups, clusters, and Schema Registry with permissions.

Aiven supports two ACL models:

- **Aiven ACLs**: Simplified topic-level access control with basic permissions and
  wildcard support.
- **Kafka-native ACLs**: Advanced resource-level access control with fine-grained
  permissions, including `ALLOW` and `DENY` rules.

## Aiven ACL capabilities

Aiven ACLs provide basic permissions and wildcard support, making them suitable
for simpler access control scenarios.

- **Permissions**: Assign `read`, `write`, `readwrite`, or `admin` permissions to
  specific users or multiple users using wildcards at the topic level.
- **Wildcard support**: Enable patterns for usernames and resource names, such as
  `logs-*` for topics or `user?` for usernames.
- **User-specific**: Apply permissions directly to individual users or to multiple users
  by matching patterns. For example, `username: analyst*` applies to all usernames
  starting with `analyst`.

:::note
By default, a user named `avnadmin` is created with `admin` permissions for all
topics. If you are using the Aiven Terraform Provider and want to prevent this behavior,
set `default_acl: false` in your resource configuration.
:::

### ACL Structure

An Aiven ACL entry consists of the following elements:

- **Username**: The Aiven for Apache Kafka service username or a wildcard pattern.
- **Permission**: One of `read`, `write`, `readwrite`, or `admin`.
- **Associated topics**: Specific Kafka topics or wildcard patterns.

Aiven checks ACL entries and grants access if there's a match. If no entry matches,
access is denied. The order of ACL entries does not
influence access evaluation.

:::note
Aiven ACLs automatically provide access to all consumer groups. You do not need to
configure separate ACL entries for consumer group access.
:::

### Examples

- User-specific access:

  ```plaintext
  username: abc
  permission: read
  topic: xyz
  ```

  Grants user `abc` read access to the topic `xyz`.

- Wildcard-based access:

  ```plaintext
  username: analyst*
  permission: read
  topic: xyz
  ```

  Grants all users with usernames starting with `analyst` read access to the topic `xyz`.

- Wildcard in topics:

  ```plaintext
  username: developer*
  permission: read
  topic: test*
  ```

  Grants all users with usernames starting with `developer` read access to topics
  starting with `test`.

## Kafka-native ACL capabilities

Kafka-native ACLs offer precise control with fine-grained permissions and resource-level
management. Use them for complex scenarios requiring rules like `ALLOW` and `DENY`.

- **Fine-grained permissions**: Support both `ALLOW` and `DENY` rules to provide
  precise control over access.
- **Expanded resource-level control**: Manage access to non-topic resources,
  such as consumer groups, clusters, and transactional IDs.
- **Pattern-based matching**: Use `LITERAL` for exact matches or `PREFIXED` for prefixes
  to specify how resource names are matched.

### ACL structure

A Kafka-native ACL entry consists of the following elements:

- **Principal**: The user or service account, such as `User:Alice`.
  - Use wildcards, such as `User:alice*`, to match all usernames that start with `alice`.
  - Only `User:` principals are supported.
- **Host**: The host to allow. Use `*` to allow all hosts.
- **Resource type**: The Apache Kafka resource to control, such as `Topic`,
  `Group`, `Cluster`, or `TransactionalId`.
- **Pattern type**: How the resource value is matched:
  - **LITERAL**: Matches an exact resource name, such as `my-topic`.
  - **PREFIXED**: Matches all resources sharing a specified prefix, such as `logs-*`.
- **Resource**: The specific Apache Kafka resource, based on the selected pattern type.
  :::note
  When the `pattern_type` is `LITERAL`, setting the `resource` to `*` is a special
  case that matches all resources. This behavior follows standard Apache Kafka conventions.
  :::

- **Operation**: The Apache Kafka operation to allow or deny, such as `Read`, `Write`, or
  `Describe`.
- **Permission type**: Specifies whether the action is `ALLOW` or `DENY`.

### Examples

- Granular topic access (prefixed pattern):

  ```plaintext
  Principal: User:Alice
  Resource type: Topic
  Pattern type: PREFIXED
  Resource: logs-
  Operation: Write
  Permission: ALLOW
  ```

  Grants `User:Alice` write access to all topics starting with the prefix `logs-`.

- Granular topic access (literal pattern):

  ```plaintext
  Principal: User:Alice
  Resource type: Topic
  Pattern type: LITERAL
  Resource: my-topic
  Operation: Write
  Permission: ALLOW
  ```

  Grants `User:Alice` write access to the specific topic `my-topic`.

- Restricting sensitive resources (prefixed pattern):

  ```plaintext
  Principal: User:Alice
  Resource type: Topic
  Pattern type: PREFIXED
  Resource: logs-sensitive-
  Operation: Write
  Permission: DENY
  ```

  Denies `User:Alice` write access to all topics starting with the prefix `logs-sensitive-`.

- Restricting sensitive resources (literal pattern):

  ```plaintext
  Principal: User:Alice
  Resource type: Topic
  Pattern type: LITERAL
  Resource: logs-sensitive-topic
  Operation: Write
  Permission: DENY
  ```

  Denies `User:Alice` write access to the specific topic `logs-sensitive-topic`.

### Precedence of rules

When multiple ACLs match for the same Apache Kafka resource, such as a topic or
consumer group, `DENY` rules take precedence over `ALLOW` rules.

**Examples**:

- An `ALLOW` rule grants access to resources matching a general pattern, such as:
  - Topics starting with `test-*`.
  - All consumer groups.
- A `DENY` rule restricts access to resources matching a specific pattern, such as:
  - Topics starting with `test-sensitive-*`.
  - Consumer groups with `sensitive` in their names.

## ACL permission mapping

The following table summarizes the permissions supported by Aiven ACLs, along with
corresponding Apache Kafka actions and Java APIs.

| Action           | Java API Link                                                                                                                                                       | Admin | Consume and Produce | Produce | Consume |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|--------------------------|-------------|-------------|
| **Cluster**          |                                                                                                                                                                        |           |                          |             |             |
| → `CreateTopics`     | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#createTopics(java.util.Collection))                                               | ✓         |                          |             |             |
| **Consumer Groups**  |                                                                                                                                                                        |           |                          |             |             |
| → `Delete`           | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#deleteConsumerGroups(java.util.Collection))                                       | ✓         | ✓                        |             | ✓           |
| → `Describe`         | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#describeConsumerGroups(java.util.Collection))                                     | ✓         | ✓                        |             | ✓           |
| → `ListConsumerGroups`| [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#listConsumerGroups(org.apache.kafka.clients.admin.ListConsumerGroupsOptions))   | ✓         | ✓                        |             | ✓           |
| **Topics**           |                                                                                                                                                                        |           |                          |             |             |
| → `Read`             | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/consumer/KafkaConsumer.html#poll(java.time.Duration))                                              | ✓         | ✓                        |             | ✓           |
| → `Write`            | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/producer/KafkaProducer.html#send(org.apache.kafka.clients.producer.ProducerRecord,org.apache.kafka.clients.producer.Callback)) | ✓         | ✓                        | ✓           |             |
| → `Describe`         | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#listTransactions())                                                              | ✓         | ✓                        | ✓           | ✓           |
| → `DescribeConfigs`  | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#describeConfigs(java.util.Map))                                                   | ✓         |                          |             |             |
| → `AlterConfigs`     | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#alterConfigs(java.util.Map))                                                     | ✓         |                          |             |             |
| → `Delete`           | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#deleteTopics(java.util.Collection))                                               | ✓         |                          |             |             |
| **Transactions**     |                                                                                                                                                                        |           |                          |             |             |
| → `Describe`         | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#describeTransactions(java.util.Collection))                                       | ✓         |                          | ✓           |             |
| → `BeginTransaction` | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/producer/KafkaProducer.html#beginTransaction())                                                   | ✓         |                          | ✓           |             |


:::warning
Users with `Admin` permissions can create topics with any name because the
`CreateTopics` permission is applied at the cluster level.

Other permissions, such as `Alter` and `Delete`, apply only to topics that match
the specified pattern in the ACL entry.
:::

:::note
By default, an Aiven for Apache Kafka service can have up to 50 users.
Contact [Aiven support](mailto:support@aiven.io) to request an increase to this limit.

:::

## Related pages

- [Manage access control lists](/docs/products/kafka/howto/manage-acls)
- [Apache Kafka official documentation](https://kafka.apache.org/documentation/#operations_resources_and_protocols)
