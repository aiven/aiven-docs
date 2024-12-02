---
title: avn service kafka-acl
---

Full list of commands for `avn service kafka-acl`.

## Manage Kafka-native access control lists (ACLs)

Commands for managing Kafka-native ACLs using `avn` commands.

### `avn service kafka-acl-add`

Adds a Kafka-native ACL entry.

| Parameter                 | Information                                                                     |
| ------------------------- | ------------------------------------------------------------------------------- |
| `service_name`            | The name of the service                                                         |
| `--principal`             | The principal for the ACLs, must be in the form User:name                       |
| `--topic`                 | Topic resource type to which ACL should be added                                |
| `--group`                 | Group resource type to which ACL should be added                                |
| `--cluster`               | The ACL is applied to the clusger resource                                      |
| `--transactional-id`      | TransactionalId resource type to which ACL should be added                      |
| `--operation`             | The operation type: possible values are `Describe`,`DescribeConfigs`,<br/>`Alter`,`IdempotentWrite`,`Read`,`Delete`,`Create`,`ClusterAction`,<br/>`All`,`Write`,`AlterConfigs`,`CreateTokens`,`DescribeTokens`                     |
| `--host`                  | The host for the ACLs, a value of '*' matches all hosts (default: *)            |
| `--resource-pattern-type` | The type of the resource pattern, can be LITERAL or PREFIXED (default: LITERAL) |
! `--deny`                  | Create a DENY rule (default is ALLOW)                                           |

**Example:** Add an ACLs for user `userA` to `Read` on topics having name starting
with `topic2020` in the service `kafka-doc`.

```
avn service kafka-acl-add kafka-doc --principal User:userA --operation Read --topic topic2020 --resource-pattern-type PREFIXED
```

### `avn service kafka-acl-delete`

Deletes a Kafka-native ACL entry.

| Parameter      | Information                 |
| -------------- | --------------------------- |
| `service_name` | The name of the service     |
| `acl_id`       | The id of the ACL to delete |

**Example:** Delete the native ACL with id `acl3604f96c74a` on service named `kafka-doc`.

```
avn service kafka-acl-delete kafka-doc acl3604f96c74a
```

### `avn service kafka-acl-list`

Lists Kafka-native ACL entries.

| Parameter      | Information             |
| -------------- | ----------------------- |
| `service_name` | The name of the service |

**Example:** List the ACLs defined for a service named `kafka-doc`.

```
avn service kafka-acl-list kafka-doc
```

An example of `avn service kafka-acl-list` output:

```text
ID              PERMISSION_TYPE  PRINCIPAL   OPERATION  RESOURCE_TYPE  PATTERN_TYPE  RESOURCE_NAME  HOST
==============  ===============  ==========  =========  =============  ============  =============  ====
acl4f9ed69c8aa  ALLOW            User:John   Write      Topic          LITERAL       orders         *
acl4f9ed6e6371  ALLOW            User:Frida  Write      Topic          PREFIXED      invoices       *
```
