---
title: avn service acl
---

Full list of commands for `avn service acl`.

## Manage Aiven ACL

The `avn service acl` command manages access control lists (ACLs) in Aiven for Apache
Kafka®. ACLs define permissions for accessing topics and controlling user access. They
support wildcard patterns (`*` and `?`) for both topics and usernames. Supported
permissions are `read`, `write`, and `readwrite`.

### `avn service acl-add`

Add an Aiven for Apache Kafka® ACL entry.

| Parameter      | Information                                                             |
| -------------- | ----------------------------------------------------------------------- |
| `service_name` | Name of the service                                               |
| `--permission` | Permission type: possible values are `read`, `write` or `readwrite` |
| `--topic` | Topic name pattern: accepts `*` and `?` as wildcard characters      |
| `--username` | Username pattern: accepts `*` and `?` as wildcard characters        |

**Example:** Add an ACL for usernames ending with `userA` to have `readwrite` access to
topics starting with `topic2020` in service `kafka-doc`.

```bash
avn service acl-add kafka-doc --username *userA --permission readwrite --topic topic2020*
```

### `avn service acl-delete`

Delete an Aiven for Apache Kafka® ACL entry.

| Parameter      | Information                 |
| -------------- | --------------------------- |
| `service_name` | Name of the service     |
| `acl_id` | ID of the ACL to delete |

**Example:** Delete the ACL with ID `acl3604f96c74a` from the Aiven for
Apache Kafka service `kafka-doc`.

```bash
avn service acl-delete kafka-doc acl3604f96c74a
```

### `avn service acl-list`

List Aiven for Apache Kafka® ACL entries.

| Parameter      | Information             |
| -------------- | ----------------------- |
| `service_name` | Name of the service |

**Example:** List ACLs defined for service `kafka-doc`.

```bash
avn service acl-list kafka-doc
```

Example output of `avn service acl-list`:

```text
ID              USERNAME  TOPIC      PERMISSION
==============  ========  =========  ==========
default         *         *          admin
acl3604f96c74a  Jon       orders     readwrite
acl3604fa706cb  Frida     invoices*  write
```

## Related page

For managing Kafka-native ACLs, see [`avn service kafka-acl`](/docs/tools/cli/service/kafka-acl).
