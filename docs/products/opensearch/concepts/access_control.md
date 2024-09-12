---
title: Access control in Aiven for OpenSearch®
sidebar_label: Access control
---

Access control is a crucial security measure that allows you to control who can access your data and resources. By setting up access control rules, you can restrict access to sensitive data and prevent unauthorized changes or deletions.

Aiven for OpenSearch® provides the following ways to manage user
accounts and access control in OpenSearch®.

## Method 1: Enable access control on the Aiven Console

When you enable
[Access control](/docs/products/opensearch/howto/control_access_to_content) in the Aiven Console for your Aiven for OpenSearch® service,
you can create service users and set their permissions. The Aiven
Console has an easy-to-use interface that helps you manage who can
access your data. Aiven for OpenSearch supports index-level access
control lists (ACLs) to control permissions and API-level rules to
restrict access to specific data sets.

With access control enabled, you can customize the access control lists
for each user by setting up individual \"pattern/permission\" rules. The
\"pattern\" parameter specifies the indices to which the permission
applies and uses glob-style matching, where \* matches any number of
characters (including none) and ? matches any single character.

:::note
ACLs apply only to indices and do not control access to other OpenSearch APIs,
including OpenSearch Dashboards.
:::

## Method 2: Enable OpenSearch® Security management

Another way to manage user accounts, access control, roles, and
permissions for your Aiven for OpenSearch® service is by
[enabling OpenSearch® Security management](/docs/products/opensearch/howto/enable-opensearch-security). This method lets you use the OpenSearch Dashboard and
OpenSearch API to manage all aspects of your service's security.

You can use advanced features such as fine-grained access control with
OpenSearch Security. This allows you to specify the exact actions that
each user can take within your OpenSearch service. OpenSearch Security
also supports SAML integrations, which provide single sign-on (SSO)
authentication and authorization for your OpenSearch Service.

For more information, see
[OpenSearch Security for Aiven for OpenSearch®](/docs/products/opensearch/concepts/os-security).

:::note
ACLs apply only to indices and do not control access to other OpenSearch APIs,
including OpenSearch Dashboards.
:::

## Patterns and permissions

Access control in OpenSearch uses patterns and permissions to manage access to indices.
Patterns are glob-style strings that specify the indices to which permissions apply,
and permissions determine the level of access granted to users for these indices.

### Patterns

Patterns use the following syntax:

-   `*`: Matches any number of characters (including none)
-   `?`: Matches any single character

### Permissions

The available permissions in Aiven for OpenSearch® are:


-   `deny`: Explicitly denies access
-   `admin`: Allows unlimited access to the index
-   `readwrite`: Grants full access to documents
-   `read`: Allows only searching and retrieving documents
-   `write`: Allows updating, adding, and deleting documents

### API access

Permissions determine which index APIs users can access, controlling actions
like reading, writing, updating, and deleting documents.

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
   but does not allow deletion. Indices can only be deleted when a matching
   `admin` permission rule exists.

:::

## Example

Consider the following set of rules:

-   `logs_*/read`
-   `events_*/write`
-   `logs_2018*/deny`
-   `logs_201901*/read`
-   `logs_2019*/admin`

This set of rules allows the user to:

-   Add documents to `events_2018` (second rule)
-   Retrieve and search documents from `logs_20171230` (first rule)
-   Gain full access to `logs_20190201` (fifth rule)
-   Gain full access to `logs_20190115` (fifth rule, as the `admin`
    permission gets higher priority than the `read` permission in the
    fourth rule)

This same set of rules denies the service user from:

-   Gain any access to `messages_2019` (no matching rules)
-   Read or search documents from `events_2018` (the second rule only
    grants `write` permission)
-   Write to or use the API `for logs_20171230` (the first rule only
    grants `read` permission)

:::note
These rules apply only to index access and do not affect OpenSearch Dashboards or other
OpenSearch APIs.
:::

## Access control for aliases

Aliases are virtual indices that reference one or more physical indices, simplifying
data management and search. In OpenSearch, you can define access control rules
for aliases to ensure proper security and control over data access.

When managing aliases in OpenSearch, note that:

- Aliases are not automatically expanded in access control, so the ACL must explicitly
  include a rule that matches the alias pattern.
- Only access control rules that match the alias pattern will be applied. Rules matching
  the physical indices that the alias references will not be used.

## Access to top-level APIs

Top-level API access control depends on whether the security plugin is enabled.
If the security plugin is
[enabled](/docs/products/opensearch/howto/enable-opensearch-security),
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
When the security plugin is enabled, `_ *` patterns for top-level API access control
are ignored. Access is managed by the security plugin settings. You do not
need to configure these patterns manually.
:::

## Access control and OpenSearch Dashboards

Enabling ACLs does not restrict access to OpenSearch Dashboards.
However, all requests made by OpenSearch Dashboards are checked against
the current user's ACLs.

:::note
Service users with read-only access to certain indices might encounter `HTTP 500`
internal server errors when viewing dashboards, as these dashboards use
the `_msearch` API. To prevent this, add an ACL rule that
grants `admin` access to `_msearch` for the affected service user.
:::

## Next steps

Learn how to
[enable and manage access control](/docs/products/opensearch/howto/control_access_to_content)
for your Aiven for OpenSearch® service.
