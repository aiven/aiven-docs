---
title: Access control lists and permission mapping
---

Aiven for Apache Kafka® uses **access control lists** (ACL) and user
definitions to establish individual rights to produce, consume or manage
topics. To manage users and ACL entries, you can access the
corresponding options in the left-side navigation menu on the service
page within the [Aiven Console](https://console.aiven.io/). For detailed
instructions, see
[Manage users and access control lists](/docs/products/kafka/howto/manage-acls).

## ACL structure

The ACL consists of **ACL entries**. An ACL entry is defined as the
combination of:

-   the username
-   the permission given to the user
-   the associated topic(s)

The username portion of the ACL entry can be an Apache Kafka® service
user name, or a string containing wildcards which could match multiple
users. Similarly, the topic portion can be a single Apache Kafka® topic
name or can use a wildcard pattern. The permission is one of `read`,
`write`, `readwrite` and `admin`.

The wildcards supported are:

-   `?` matching a single character (equivalent to regular expression
    `.`)
-   `*` matching zero or more characters (equivalent to regular
    expression `(.*)`)

The wildcards can be combined for more complex pattern matching:

-   `?*` matches a single character, and then zero or more other
    characters (equivalent to regular expression `(.+)`)

Aiven for Apache Kafka® evaluates each topic access against the ACL
entries. If it finds a matching ACL entry, access is granted. If no
entry matches, access is denied. Thus the order of the ACL entries is
irrelevant.

Examples:

-   username: `abc`, permission: `read`, topic: `xyz`. User `abc` has
    read access to topic `xyz`.
-   username: `analyst*`, permission: `read`, topic: `xyz`. All Aiven
    users with username starting `analyst` have read access to topic
    `xyz`.
-   username: `developer*`, permission: `read`, topic: `test*`. All
    Aiven users with username starting `developer` have read access to
    topics starting with `test`.

:::warning
By default, Aiven adds an `avnadmin` service user to every new service
and adds `admin` permission for all topics to that user. When you create
your own ACLs to restrict access, you probably want to remove this ACL
entry.
:::

:::note
When using the Aiven Terraform Provider, you can add the `default_acl`
key to your `resource` and set it to `false` if you do not want to
create the admin user with wildcard permissions.
:::

## ACL permission mapping

You can define four types of permission for a particular topic or topic
pattern. Note each permission is called differently in the Console when
creating them (for example, Consume) and in the ACL entries list:

-   Admin / `admin`
-   Consume and Produce / `readwrite`
-   Consume / `read`
-   Produce / `write`

The type of the permission dictates the actions the client is be able to
perform. The following table contains a summary of the allowed action
and a link to the Java APIs:

| Action               | Link                                                                                                                                                                                               | Admin | Consume and Produce | Produce | Consume |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | ------------------- | ------- | ------- |
| **Cluster**          |                                                                                                                                                                                                    |       |                     |         |         |
| → `CreateTopics`     | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#createTopics(java.util.Collection))                                                                           | ✓     |                     |         |         |
| **Consumer Groups**  |                                                                                                                                                                                                    |       |                     |         |         |
| → `Delete`           | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#deleteConsumerGroups(java.util.Collection))                                                                   | ✓     | ✓                   |         | ✓       |
| → `Describe`         | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#describeConsumerGroups(java.util.Collection))                                                                 | ✓     | ✓                   |         | ✓       |
| → `Read`             | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#listConsumerGroups(org.apache.kafka.clients.admin.ListConsumerGroupsOptions))                                 | ✓     | ✓                   |         | ✓       |
| **Topics**           |                                                                                                                                                                                                    |       |                     |         |         |
| → `Read`             | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/consumer/KafkaConsumer.html#poll(java.time.Duration))                                                                          | ✓     | ✓                   |         | ✓       |
| → `Write`            | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/producer/KafkaProducer.html#send(org.apache.kafka.clients.producer.ProducerRecord,org.apache.kafka.clients.producer.Callback)) | ✓     | ✓                   | ✓       |         |
| → `Describe`         | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#listTransactions())                                                                                           | ✓     | ✓                   | ✓       | ✓       |
| → `Describe_Configs` | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#describeTopics(java.util.Collection))                                                                         | ✓     | ✓                   | ✓       | ✓       |
| → `Alter`            | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#alterConfigs(java.util.Map))                                                                                  | ✓     |                     |         |         |
| → `AlterConfigs`     | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#alterConfigs(java.util.Map))                                                                                  | ✓     |                     |         |         |
| → `Delete`           | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#deleteTopics(java.util.Collection))                                                                           | ✓     |                     |         |         |
| **Transactions**     |                                                                                                                                                                                                    |       |                     |         |         |
| → `Describe`         | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/admin/Admin.html#describeTransactions(java.util.Collection))                                                                   | ✓     | ✓                   | ✓       |         |
| → `Write`            | [docs](https://kafka.apache.org/30/javadoc/org/apache/kafka/clients/producer/KafkaProducer.html#beginTransaction())                                                                                | ✓     | ✓                   | ✓       |         |

:::warning
A user with the `Admin` permissions can create topics with any name, as
the `CreateTopics` permissions is applied at the cluster level.

All other permissions related to a topic (`Alter`, `Delete`) **only**
apply to the topics matching the pattern that you specify.
:::

The above mappings are subject to change and this article will be
updated when that happens.

:::note
By default, the number of users per service is limited to 50 in Kafka.
Contact Aiven support if you need more users.
:::
