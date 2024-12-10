---
title: avn service kafka-acl
---

Full list of commands for `avn service kafka-acl`.

## Manage Kafka-native ACLs

The `avn service kafka-acl` command manages **Kafka-native access control lists (ACLs)**
in Aiven for Apache Kafka®. Kafka-native ACLs define advanced, resource-level
permissions for accessing resources such as topics, consumer groups, clusters, and
transactional IDs. They support fine-grained access control with
both `ALLOW` and `DENY` rules, and wildcard patterns (`*` and `?`) for
resources and usernames.

### `avn service kafka-acl-add`

Add a Kafka-native ACL entry.

| Parameter                 | Information                                                                     |
| ------------------------- | ------------------------------------------------------------------------------- |
| `service_name` | Name of the service                                                         |
| `--principal` | Principal for the ACL, in the form `User:<name>` |
| `--topic` | Topic resource for the ACL                             |
| `--group` | Consumer group resource for the ACL                            |
| `--cluster` | Cluster resource for the ACL                                    |
| `--transactional-id` | `TransactionalId` resource for the ACL                     |
| `--operation` | Operation type: possible values are `Describe`, `DescribeConfigs`,<br/>`Alter`, `IdempotentWrite`, `Read`, `Delete`, `Create`, `ClusterAction`,<br/>`All`, `Write`, `AlterConfigs`, `CreateTokens`, `DescribeTokens` |
| `--host` | Host for the ACL, where `*` matches all hosts (default: `*`)            |
| `--resource-pattern-type` | Resource pattern type, either `LITERAL` or `PREFIXED` (default: `LITERAL`)    |
! `--deny` | Create a `DENY` rule (default: `ALLOW`)                                           |

**Example:** Add a Kafka-native ACL for user `userA` to `Read` on topics with names
starting with `topic2020` in service `kafka-doc`.

```bash
avn service kafka-acl-add kafka-doc \
 --principal User:userA \
  --operation Read \
 --topic topic2020 \
  --resource-pattern-type PREFIXED
```

### `avn service kafka-acl-delete`

Delete a Kafka-native ACL entry.

| Parameter      | Information                 |
| -------------- | --------------------------- |
| `service_name` | Name of the service     |
| `acl_id` | ID of the ACL to delete |

**Example:** Delete a Kafka-native ACL with ID `acl3604f96c74a` on service `kafka-doc`.

```bash
avn service kafka-acl-delete kafka-doc acl3604f96c74a
```

### `avn service kafka-acl-list`

List Kafka-native ACL entries.

| Parameter      | Information             |
| -------------- | ----------------------- |
| `service_name` | Name of the service |

**Example:** List Kafka-native ACLs defined for service `kafka-doc`.

```bash
avn service kafka-acl-list kafka-doc
```

Example output of `avn service kafka-acl-list`:

```text
ID              PERMISSION_TYPE  PRINCIPAL   OPERATION  RESOURCE_TYPE  PATTERN_TYPE  RESOURCE_NAME  HOST
==============  ===============  ==========  =========  =============  ============  =============  ====
acl4f9ed69c8aa  ALLOW            User:John   Write      Topic          LITERAL       orders         *
acl4f9ed6e6371  ALLOW            User:Frida  Write      Topic          PREFIXED      invoices       *
```

## Related page

For managing Aiven ACLs, see [`avn service acl`](/docs/tools/cli/service/acl).
