---
title: Schema registry ACL definitions
sidebar_label: ACL definitions
description: Learn the username, operation, and resource fields used in Karapace Schema Registry ACLs.
---

import RelatedPages from "@site/src/components/RelatedPages";

A Schema Registry ACL controls who can read or write Schema Registry resources in
[Karapace](/docs/products/kafka/karapace).
These ACLs are separate from
[Apache Kafka Access Control Lists](/docs/products/kafka/concepts/acl), which control
access to topics and other Kafka resources.

## ACL entry fields

Each ACL entry has three parts:

- **Username**: A service user on your Aiven for Apache Kafka® service.
- **Operation**: One of:
  - `schema_registry_read`
  - `schema_registry_write` (always includes `schema_registry_read`)
- **Resource**: One of these formats:
  - `Config:`: Controls access to global compatibility configuration.
    Users with this resource can get or set the default schema compatibility mode.
    Getting the configuration requires `schema_registry_read`.
    Setting it requires `schema_registry_write`.
  - `Subject:subject_name`: Controls access to a subject in Schema Registry.

:::tip
The username and resource `name` values can use wildcards:

- `*` matches any characters
- `?` matches a single character
:::

## How access decisions work

When a user requests a resource, Schema Registry checks whether any ACL entry matches
the user and the resource.
If a matching entry grants the required operation, access is allowed.
Entry order does not affect the decision.

If no ACL entry grants access, Schema Registry returns an HTTP `401 Unauthorized`
status code.

## Endpoint permissions

- Read-only endpoints need `schema_registry_read` for the subject.
  For endpoints that return data for multiple subjects, the response includes only
  subjects the user can read.
- Write endpoints need `schema_registry_write` for the subject.

### Examples

| Username | Operation | Resource | Effect |
| --- | --- | --- | --- |
| `user_1` | `schema_registry_read` | `Config:` | Read global compatibility configuration. |
| `user_1` | `schema_registry_read` | `Subject:s1` | Read data for subject `s1` only. List responses omit other subjects. |
| `user_1` | `schema_registry_write` | `Subject:s1` | Add, update, or delete data for subject `s1`. Includes read access. |
| `user_readonly*` | `schema_registry_read` | `Subject:s*` | Read access for usernames with prefix `user_readonly` to subjects with prefix `s`. |
| `user_write*` | `schema_registry_write` | `Subject:s*` | Write access for usernames with prefix `user_write` to subjects with prefix `s`. Includes read access. |

## Superuser access

The user that manages ACLs is a superuser with write access to everything in Schema
Registry.
In the Aiven Console, that superuser can view and modify all schemas on the
**Schemas** tab of a Kafka service.
The superuser and its ACL entries are not visible in the Console.
Aiven adds them automatically.

:::note
Create and manage ACL entries with the
[Aiven CLI](/docs/tools/cli/service/schema-registry-acl)
or see
[Manage Karapace schema registry authorization](/docs/products/kafka/karapace/howto/manage-schema-registry-authorization).
:::

<RelatedPages/>

- [Karapace schema registry authorization](/docs/products/kafka/karapace/concepts/schema-registry-authorization)
- [Enable Karapace schema registry authorization](/docs/products/kafka/karapace/howto/enable-schema-registry-authorization)
- [Manage Karapace schema registry authorization](/docs/products/kafka/karapace/howto/manage-schema-registry-authorization)
- [avn service schema-registry-acl](/docs/tools/cli/service/schema-registry-acl)
