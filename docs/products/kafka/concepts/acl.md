---
title: Access Control Lists in Aiven for Apache Kafka®
---

Access Control Lists (ACLs) in Aiven for Apache Kafka® provide a mechanism to manage access to Apache Kafka resources such as topics, consumer groups, clusters, transactional IDs, and the Schema Registry.

Aiven supports two ACL models:

- **Aiven ACLs**: Simplified topic-level access control with basic permissions and
  wildcard support.
- **Kafka-native ACLs**: Advanced resource-level access control with fine-grained
  permissions, including `ALLOW` and `DENY` rules.

## Aiven ACL capabilities

Aiven ACLs provide a simpler way to manage access to Apache Kafka topics and Schema
Registry resources. It is ideal for use cases requiring basic permissions and wildcard
support.

- **Permissions**: Allow `read`, `write`, `readwrite`, or `admin` permissions to be
  assigned to specific users or groups at the topic level.
- **Wildcard support**: Simplifies access control by allowing patterns for usernames
  and resource names, such as `logs-*` for topics or `user?` for usernames.
- **User-specific or group-level permissions**: Provides precise access control by
  applying permissions to specific users or groups. For instance, `username: analyst*`
  applies to all usernames starting with "analyst."

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

Aiven evaluates access requests based on ACL entries and grants access if a match is
found. If no entry matches, access is denied. The order of ACL entries does not
influence access evaluation.

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

Kafka-native ACLs provide granular, resource-level permissions for precise access
control. They enable the management of Apache Kafka topics and additional resources
like clusters, consumer groups, and transactional IDs. It is ideal for
advanced scenarios requiring fine-tuned access management.

- **Fine-grained permissions**: Supports both `ALLOW` and `DENY` rules to provide
  precise control over access.
- **Expanded resource-level control**: Extends permissions to non-topic resources,
  such as consumer groups, clusters, and transactional IDs.
- **Pattern-based matching**: Offers `LITERAL` and `PREFIXED` matching for resource
  names. For example, `logs-*` applies permissions to all topics sharing the prefix
  `logs-`.

### ACL structure

A Kafka-native ACL entry consists of the following elements:

- **Principal**: Specifies the user or service account, such as `User:Alice`.
- **Host**: Defines the allowed host. Use `*` to allow all hosts.
- **Resource type**: Indicates the Kafka resource to control, such as `Topic`, `Group`,
  `Cluster`, or `TransactionalId`.
- **Pattern type**: Specifies how the resource value is matched:
  - **LITERAL**: Matches an exact resource name, such as `my-topic`.
  - **PREFIXED**: Matches all resources sharing a specified prefix, such as `logs-*`.
- **Resource**: Refers to the specific Kafka resource. Depending on the selected pattern type:
  - **Literal pattern type**: Enter the exact name of the resource. For example,
    `my-topic`.
  - **Prefixed pattern type**: Enter the prefix for the resource. For example, `logs-`.
- **Operation**: The Kafka operation to allow or deny, such as `Read`, `Write`, or `Describe`.
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

- If `ALLOW` is applied to the topic pattern `test-*` and `DENY` is applied to the topic
  pattern `test-sensitive-*`, the `DENY` rule ensures that the topic
  `test-sensitive-logs` remains inaccessible, even though it matches the broader
  pattern `test-*`.
- If `ALLOW` is applied to all consumer groups (`Group:*`) and `DENY` is applied to
  consumer groups with the prefix `Group:sensitive-*`, operations on consumer groups
  with the prefix `sensitive-*` will be denied.

### Supported resources and operations

Kafka-native ACLs support the following resources and their corresponding operations:
--<!-- vale off -->

| Resource type   | Description                             | Supported operations          |
|----------------------|---------------------------------------------|------------------------------------|
| Cluster          | Represents the Apache Kafka cluster itself. | `Alter`, `Describe`, `AlterConfigs`, `Create` |
| DelegationToken  | Represents delegation tokens for authentication. | `Describe`, `Alter`               |
| Group            | Represents Kafka consumer groups.           | `Read`, `Describe`, `Delete`       |
| Topic            | Represents Kafka topics.                    | `Read`, `Write`, `Describe`, `Delete` |
| TransactionalId**  | Used for exactly-once semantics.            | `Write`, `Describe`               |
| User             | Represents users for authentication.        | `Describe`                        |

## ACL permission mapping

The following table summarizes the permissions supported by both Aiven ACLs and
Kafka-native ACLs, along with corresponding Kafka actions and Java APIs:

|  Resource type    |  Action                |  Java API link                                                                                                            |  Admin  |  Consume and produce  |  Produce  |  Consume  |  Aiven ACLs  |  Kafka-native ACLs  |
|----------------------|--------------------------|-----------------------------------------------------------------------------------------------------------------------------|-----------|--------------------------|-------------|-------------|----------------|-----------------------|
|  Cluster           | `CreateTopics`          | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#createTopics(java.util.Collection))     | ✓         |                          |             |             | ✓              | ✓                    |
|                      | `DescribeCluster`       | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#describeCluster())                     | ✓         |                          |             |             |                | ✓                    |
|  Consumer groups   | `Delete`                | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#deleteConsumerGroups(java.util.Collection)) | ✓         | ✓                        |             | ✓           | ✓              | ✓                    |
|                      | `Describe`              | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#describeConsumerGroups(java.util.Collection)) | ✓         | ✓                        |             | ✓           | ✓              | ✓                    |
|                      | `ListConsumerGroups`    | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#listConsumerGroups(org.apache.kafka.clients.admin.ListConsumerGroupsOptions)) | ✓         | ✓                        |             | ✓           | ✓              | ✓                    |
|  Topics            | `Read`                  | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/consumer/KafkaConsumer.html#poll(java.time.Duration))    | ✓         | ✓                        |             | ✓           | ✓              | ✓                    |
|                      | `Write`                 | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/producer/KafkaProducer.html#send(org.apache.kafka.clients.producer.ProducerRecord,org.apache.kafka.clients.producer.Callback)) | ✓         | ✓                        | ✓           |             | ✓              | ✓                    |
|                      | `Describe`              | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#listTransactions())                    | ✓         | ✓                        | ✓           | ✓           | ✓              | ✓                    |
|                      | `DescribeConfigs`       | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#describeConfigs(java.util.Map))         | ✓         |                          |             |             |                | ✓                    |
|                      | `AlterConfigs`          | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#alterConfigs(java.util.Map))           | ✓         |                          |             |             |                | ✓                    |
|                      | `Delete`                | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#deleteTopics(java.util.Collection))     | ✓         |                          |             |             | ✓              | ✓                    |
|  TransactionalId   | `DescribeTransactions`  | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#describeTransactions(java.util.Collection)) | ✓         |                          | ✓           |             |                | ✓                    |
|                      | `BeginTransaction`      | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/producer/KafkaProducer.html#beginTransaction())         | ✓         |                          | ✓           |             |                | ✓                    |

:::warning
Users with `Admin` permissions can create topics with any name because the
`CreateTopics` permission is applied at the cluster level.

Other permissions, such as `Alter` and `Delete`, apply only to topics that match
the specified pattern in the ACL entry.
:::

:::note
By default, a Kafka service can have up to 50 users. Contact Aiven support if you need
to increase this limit.
:::

## Related pages

- [Apache Kafka documentation](https://kafka.apache.org/documentation/#operations_resources_and_protocols):
  Learn about Kafka operations, resources, and protocols.
- [Manage users and access control lists](/docs/products/kafka/howto/manage-acls):
  Configure users and ACLs in Aiven for Apache Kafka.
