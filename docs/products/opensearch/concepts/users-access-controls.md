---
title: Understanding access control in Aiven for OpenSearch®
---

Implement access control and permissions to secure data in Aiven for OpenSearch®. Understand how access control works and the various permissions used to manage access effectively.

:::note
ACLs apply only to indices and do not control access to other OpenSearch APIs,
including OpenSearch Dashboards.
:::

## Patterns and permissions

Access control for OpenSearch uses patterns and permissions to manage access to indices.
Patterns are glob-style strings that specify the indices to which the permission applies,
and permissions define the level of access granted to the user for the matching indices.

### Patterns

Patterns use the following syntax:

-   `*`: Matches any number of characters (including none)
-   `?`: Matches any single character

### Permissions

The available permissions in Aiven for OpenSearch®, ordered by importance, are:

-   `deny`: Explicitly denies access
-   `admin`: Allows unlimited access to the index
-   `readwrite`: Grants full access to documents
-   `read`: Allows only searching and retrieving documents
-   `write`: Allows updating, adding, and deleting documents

### API access

The permission determines which index APIs the user can access, controlling
specific actions such as reading, writing, updating, and deleting documents
within those indices:

-   `deny`: No access
-   `admin`: No restrictions
-   `readwrite`: Allows access to `_search`, `_mget`, `_bulk`,
    `_mapping`, `_update_by_query`, and `_delete_by_query` APIs
-   `read`: Allows access to `_search` and `_mget` APIs
-   `write`: Allows access to `_bulk`, `_mapping`, `_update_by_query`,
    and `_delete_by_query` APIs

:::note

 - When no rules match, access is implicitly denied.
 - The `write` permission allows creating indices that match the rule's index pattern
   but does not allow deleting them. Indices can only be deleted when a matching
   `admin` permission rule exists.

:::

## Example

As an example, consider the following set of rules:

-   `logs_*/read`
-   `events_*/write`
-   `logs_2018*/deny`
-   `logs_201901*/read`
-   `logs_2019*/admin`

This set of rules would allow the service user to:

-   Add documents to `events_2018` (second rule)
-   Retrieve and search documents from `logs_20171230` (first rule)
-   Gain full access to `logs_20190201` (fifth rule)
-   Gain full access to `logs_20190115` (fifth rule, as the `admin`
    permission gets higher priority than the `read` permission in the
    fourth rule)

This same set of rules would deny the service user from:

-   Gain any access to `messages_2019` (no matching rules)
-   Read or search documents from `events_2018` (the second rule only
    grants `write` permission)
-   Write to or use the API `for logs_20171230` (the first rule only
    grants `read` permission)

:::note
These rules apply only to index access and not to OpenSearch Dashboards or other
OpenSearch APIs.
:::

## Access control for aliases

Aliases are virtual indices that can reference one or more physical indices,
simplifying data management and search.
Access control and aliases are key concepts in OpenSearch. Aliases are
virtual indices that can reference one or more physical indices,
simplifying the management and search of data. You can define access control rules
for aliases to ensure proper security and control over data access.

When working with aliases in OpenSearch, remember how access control rules apply:

-   Aliases are not automatically expanded in access control. Therefore,
    the ACL must explicitly include a rule that matches the alias
    pattern.
-   Only access control rules that match the alias pattern will be applied.
    Rules that match the physical indices the alias expands to will not be used.

## Access to top-level APIs

The access control for top-level APIs depends on whether the security plugin is
enabled. If the security plugin is
[enabled](docs/products/opensearch/howto/enable-opensearch-security),
ACLs are not used to control top-level APIs.
Instead, the security plugin handles access control.

### Service controlled APIs

The following top-level APIs are controlled by the OpenSearch service
and not by the ACLs defined by you:

- `_cluster`
- `_cat`
- `_tasks`
- `_scripts`
- `_snapshot`
- `_nodes`

[Enabling OpenSearch Security management](/docs/products/opensearch/howto/enable-opensearch-security)
provides control over the
top-level APIs: `_mget`, `_msearch`, and `_bulk`.

:::note
**Deprecated _ * patterns**
With the security plugin enabled, `_ *` patterns for controlling top-level API
access are ignored. Access is managed by the security plugin settings. You do not
need to configure these patterns manually.
:::

## Access control and OpenSearch Dashboards

Enabling ACLs does not restrict access to OpenSearch Dashboards.
However, all requests made by OpenSearch Dashboards are checked against
the current user's ACLs.

:::note
You might encounter `HTTP 500` internal server errors when you try to
view dashboards as a service user with read-only access to certain
indices, as these dashboards call the `_msearch` API. To prevent this,
add a new ACL rule that grants `admin` access to `_msearch` for that
service user.
:::

## Next steps

Learn how to
[enable and manage access control](/docs/products/opensearch/howto/control_access_to_content)
for your Aiven for OpenSearch® service.
