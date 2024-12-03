---
title: Manage access control lists in Aiven for Apache Kafka®
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"

Access control lists (ACLs) in Aiven for Apache Kafka® define permissions for topics, schemas, consumer groups, and transactional IDs.
ACLs control which authenticated users or applications (principals) can perform specific
operations on these resources.

## Types of ACLs

Aiven for Apache Kafka® supports two types of ACLs:

- **Aiven ACLs**: These provide topic-level permissions and support wildcard patterns.
- **Kafka-native ACLs**: These offer advanced, resource-level permissions with `ALLOW`
  and `DENY` rules for operations on multiple resource types, including topics, groups,
  and clusters.

:::note
ACL restrictions currently do not apply to Kafka REST. Rules are applied based on the
username and topic names, but there are no restrictions on consumer group names.

Support for extending these restrictions to Kafka REST is under development.
:::

## Add a Kafka-native ACL entry

<Tabs groupId="acl-methods">
<TabItem value="console" label="Aiven Console" default>

1. Log in to [Aiven Console](https://console.aiven.io/) and select your
   service.
1. Click <ConsoleLabel name="acl" />
1. Click **Add entry**.
1. On the **Add access control entry** screen:
   1. Select **Kafka-native ACLs** as the ACL type.
   1. Fill in the following fields:
      1. **Permission type**: Select `ALLOW` or `DENY`.
      1. **Principal**:Enter the principal in the format `User:<username>`.
      1. **Operation**: Select the operation, such as `Read` or `Write`.
      1. **Resource type**: Select the Apache Kafka resource to manage.
      1. **Pattern type**: Select `LITERAL` for exact matches or `PREFIXED` for
         pattern-based matches.
      1. **Resource**: Enter the resource name or a prefix for pattern-based matching.
      1. **Host**: Enter the allowed host, or use `*` for all.
   1. Click **Submit**.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

To add an Kafka-native ACL entry with the Aiven CLI, run:

```bash
avn service kafka-acl-add <service_name> \
  --principal <principal> \
  --operation <operation_type> \
  --resource-type <resource_type> \
  --pattern-type <literal_or_prefixed> \
  --resource <resource_name> \
  --permission <allow_or_deny> \
  --host <host_or_wildcard>
```

Parameters:

- `service_name`: Enter the name of your Aiven for Apache Kafka service.
- `--principal`: Provide the principal in the format `User:<username>`.
- `--operation`: Specify the Apache Kafka operation, such as `Read`, `Write`, `Describe`,
  or `Delete`.
- `--resource-type`: Specify the resource type to manage, such as `Topic`, `Group`,
  `Cluster`, or `TransactionalId`.
- `--pattern-type`: Specify the pattern type for resource matching. Use `LITERAL` for
  exact matches or `PREFIXED` for pattern-based matching.
- `--resource`: Specify the resource name or prefix for pattern-based matching.
- `--permission`: Specify `ALLOW` or `DENY`. Use `--deny` to explicitly create a
  `DENY` rule. The default is `ALLOW`.
- `--host`: Specify the allowed host, or use `*` to apply to all hosts.


</TabItem>
<TabItem value="api" label=" Aiven API">

To add a Kafka-native ACL entry, use the following API request:

```bash
curl --request POST \
  --url https://api.aiven.io/v1/project/<project_name>/service/<service_name>/acl-native \
  --header 'Authorization: Bearer <api_token>' \
  --header 'Content-Type: application/json' \
  --data '{
    "permission": "<allow_or_deny>",
    "principal": "<principal>",
    "operation": "<operation_type>",
    "resource_type": "<resource_type>",
    "pattern_type": "<literal_or_prefixed>",
    "resource": "<resource_name>",
    "host": "<host_or_wildcard>"
  }'
```

Parameter:

- `project_name`: Enter the name of your Aiven project.
- `service_name`: Enter the name of your Aiven for Apache Kafka service.
- `permission`: Specify `ALLOW` or `DENY`.
- `principal`: Provide the principal in the format `User:<username>`.
- `operation`: Specify the Apache Kafka operation, such as `Read`, `Write`, `Describe`,
  or `Delete`.
- `resource_type`: Specify the type of resource to manage, such as `Topic`, `Group`,
  `Cluster`, or `TransactionalId`.
- `pattern_type`: Specify the pattern type for resource matching. Use `LITERAL` for
  exact matches or `PREFIXED` for pattern-based matching.
- `resource`: Specify the resource name or prefix for pattern-based matching.
- `host`: Specify the allowed host, or use `*` to apply to all hosts.

</TabItem>
<TabItem value="terraform" label="Terraform">

To add a Kafka-native ACL entry using Terraform, define the following resource in your Terraform configuration:

```terraform
resource "aiven_kafka_native_acl" "example" {
  project         = "my_project"
  service_name    = "kafka-service"
  resource_name   = "example-topic"
  resource_type   = "Topic"
  pattern_type    = "LITERAL"
  principal       = "User:example-user"
  host            = "*"
  operation       = "Read"
  permission_type = "ALLOW"
}
```

Required attributes:

- `project`: Enter the name of your Aiven project.
- `service_name`: Enter the name of your Aiven for Apache Kafka service.
- `resource_name`: Specify the resource name or prefix for pattern-based matching.
- `resource_type`: Specify the type of resource to manage, such as
  `Topic`, `Group`, `Cluster`, or `TransactionalId`.
- `pattern_type`: Specify the pattern type for resource matching. Use `LITERAL` for
  exact matches or `PREFIXED` for pattern-based matching.
- `principal`: Enter the principal in the format `User:<username>`.
- `operation`: Specify the Kafka operation, such as `Read`, `Write`, or `Create`.
- `permission_type`: Specify the type of permission. Use `ALLOW` or `DENY`.
- `host`: Specify the allowed host, or use `*` to apply to all hosts.

</TabItem>
</Tabs>

## Add an Aiven ACL entry

<Tabs groupId="acl-methods">
<TabItem value="console" label="Aiven Console" default>

1. Log in to [Aiven Console](https://console.aiven.io/) and select your
   service.
1. Click <ConsoleLabel name="acl" />.
1. Click **Add entry**.
1. On the **Add access control entry** screen:
   1. Select **Aiven ACLs** as the ACL type.
   1. Fill in the following fields:
      1. **Resource type**: Select `Topic` or `Schema`.
      1. **Permission type**: Select `admin`, `read`, `write`, or `readwrite`.
      1. **Username**: Enter the username or pattern to apply the ACL to. Supports
         wildcards `*` and `?`.
      1. **Resource**: Enter the name of the topic or schema, or use `*` to apply to all.
   1. Click **Submit**.

:::tip
After defining custom ACLs, delete the default `avnadmin` ACL entry by clicking
<ConsoleLabel name="deleteacl" /> under **Actions**.
:::

</TabItem>
<TabItem value="cli" label="Aiven CLI">

To add an Aiven ACL entry with the Aiven CLI, run:

```bash
avn service acl-add <service_name> \
  --username <username_pattern> \
  --permission <permission_type> \
  --topic <topic_pattern>
```

Parameters:

- `<service_name>`: Specify the name of your Aiven for Apache Kafka service.
- `--username`: Specify the username or pattern to apply. Supports wildcards `*` and `?`.
- `--permission`: Specify the permission type. Valid values are `read`, `write`, or
  `readwrite`.
- `--topic`: Specify the topic name or pattern to apply. Supports wildcards `*` and `?`.  .


</TabItem>
<TabItem value="api" label="Aiven API">

To add an Aiven ACL entry, use the following API request:

```bash
curl --request POST \
  --url https://api.aiven.io/v1/project/<project_name>/service/<service_name>/acl \
  --header 'Authorization: Bearer <api_token>' \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "<username_pattern>",
    "resource_type": "<resource_type>",
    "resource": "<resource_pattern>",
    "permission": "<permission_type>"
  }'

```

Parameters:

- `project_name`: Specify the name of your Aiven project.
- `service_name`: Specify the name of your Aiven for Apache Kafka service.
- `username`: Specify the username or pattern to apply the ACL to. Supports wildcards
  `*` and `?`.
- `resource_type`: Specify the resource type to apply the ACL to. Use `topic` or `schema`.
- `resource`: Specify the name of the topic or schema, or use `*` to apply to all.
  Supports wildcards `*` and `?`.
- `permission`: Specify the permission type. Valid values are `read`, `write`,
  `readwrite`, or `admin`.

</TabItem>
<TabItem value="terraform" label="Terraform">

To add an Aiven ACL entry using Terraform, define the following resource in your Terraform configuration:

```terraform
resource "aiven_kafka_acl" "example_acl" {
  project      = "<project_name>"
  service_name = "<service_name>"
  topic        = "<topic_name>"
  permission   = "<permission_type>"
  username     = "<username_pattern>"
}
```

Required attributes:

- `project`: Enter the name of your Aiven project.
- `service_name`: Enter the name of your Aiven for Apache Kafka service.
- `topic`: Specify the name of the topic or pattern to apply the ACL to. Supports
  wildcards `*` and `?`.
- `permission`: Specify the permission type. Valid values are `read`, `write`, or
  `readwrite`.
- `username`: Specify the username or pattern to apply the ACL to. Supports wildcards `*`
  and `?`.

:::tip
When using the [Aiven Terraform Provider](/docs/tools/terraform), set the
`default_acl` key to `false` in your resource configuration to prevent the creation of
an admin user with wildcard permissions.
:::

</TabItem>

</Tabs>

## View ACL entries

<Tabs groupId="acl-view-methods">
<TabItem value="console" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/) and select your
   Aiven for Apache Kafka service.
1. Click <ConsoleLabel name="acl" />
1. Click the **Kafka-native ACLs** tab to view Kafka-native ACL entries or the
   **Aiven ACLs** tab to view Aiven ACL entries.
1. Use filters to narrow the list by resource type, operation, or permission type.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

To view ACL entries using the Aiven CLI:

- **Kafka-native ACLs**:

  ```bash
  avn service kafka-acl-list <service_name>
  ```

- **Aiven ACLs**:

  ```bash
  avn service acl-list <service_name>
  ```

Parameters:

- `service_name`: Enter the name of your Aiven for Apache Kafka service.

</TabItem>
<TabItem value="api" label="Aiven API">

To view ACL entries, use the following API request:

- **Kafka-native ACLs:**

  ```bash
  curl -X GET \
  https://api.aiven.io/v1/project/<project_name>/service/<service_name>/kafka/acl \
  -H 'Authorization: Bearer <api_token>'
  ```

- **Aiven ACLs:**

  ```bash
  curl -X GET \
    https://api.aiven.io/v1/project/<project_name>/service/<service_name>/acl \
    -H 'Authorization: Bearer <api_token>'
  ```

Parameters:

- `project`: Enter the name of your Aiven project.
- `service_name`: Enter the name of your Aiven for Apache Kafka service.

</TabItem>
<TabItem value="terraform" label="Terraform">

To view ACL entries with Terraform:

- **Kafka-native ACLs**:

  ```hcl
     data "aiven_kafka_native_acl" "native_acl" {
       project      = "<project_name>"
       service_name = "<service_name>"
  }
  ```

- **Aiven ACLs**:

  ```hcl
    data "aiven_kafka_acl" "aiven_acl" {
       project      = "<project_name>"
       service_name = "<service_name>"
  }
  ```

Parameters

- `project`: Enter the name of your Aiven project.
- `service_name`: Enter the name of your Aiven for Apache Kafka service.

</TabItem>
</Tabs>

## Delete ACL entries

<Tabs groupId="acl-delete-methods">

<TabItem value="console" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/) and select your
   Aiven for Kafka service.
1. Click <ConsoleLabel name="acl" />
1. Click the **Kafka-native ACLs** tab to view Kafka-native ACL entries or the
   **Aiven ACLs** tab to view Aiven ACL entries.
1. Locate the ACL entry to delete.
1. Click <ConsoleLabel name="deleteacl" /> under the **Actions** column to remove
  the entry.
1. Click **Delete**.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

To delete an ACL entry, use one of the following commands based on the ACL type:

- **Kafka-native ACLs**:

  ```bash
  avn service kafka-acl-delete <service_name> <acl_id>
  ```

- **Aiven ACLs**:

  ```bash
  avn service acl-delete --service <service_name> --id <acl_id>
  ```

Parameters

- `<service_name>`: Enter the name of the Aiven for Apache Kafka service.
- `<acl_id>`: Enter the ID of the ACL entry to delete. To retrieve ACL ID:

  - For Kafka-native ACLs:

    ```bash
    avn kafka acl list --service <service_name>
    ```

  - For Aiven ACLs:

    ```bash
    avn service acl-list --service <service_name>
    ```

</TabItem>
<TabItem value="api" label="API">

To delete ACL entries, use the following API request:

- **Kafka-native ACLs:**

  ```bash
  curl -X DELETE \
  https://api.aiven.io/v1/project/<project_name>/service/<service_name>/kafka/acl/<acl_id> \
  -H 'Authorization: Bearer <api_token>'
  ```

- **Aiven ACLs:**

  ```bash
  curl -X DELETE \
  https://api.aiven.io/v1/project/<project_name>/service/<service_name>/acl/<acl_id> \
  -H 'Authorization: Bearer <api_token>'

  ```

Parameters:

- `project_name`: Enter the name of the project.
- `service_name`: Enter the name of the Aiven for Apache Kafka service.
- `acl_id`: Enter the ID of the ACL entry to delete.

</TabItem>
<TabItem value="terraform" label="Terraform">

To delete ACL entries with Terraform:

- For **Kafka-native ACLs**, remove the relevant `aiven_kafka_native_acl` resource from
  your Terraform configuration or use `terraform destroy`.
- For **Aiven ACLs**, remove the relevant `aiven_kafka_acl` resource from your Terraform
  configuration or use `terraform destroy`.

</TabItem>
</Tabs>

## Related pages

- [Access Control Lists in Aiven for Apache Kafka®](/docs/products/kafka/concepts/acl)
- [Manage service users in Aiven for Apache Kafka®](/docs/products/kafka/howto/add-manage-service-users)
- [Apache Kafka documentation](https://kafka.apache.org/documentation/#operations_resources_and_protocols)
