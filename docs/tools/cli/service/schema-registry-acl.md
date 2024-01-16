---
title: avn service schema-registry-acl
---

Here you\'ll find the full list of commands for
`avn service schema-registry-acl`.

## Manage Karapace schema registry access control lists for Apache Kafka®

Using the following commands you can manage
[Karapace schema registry authorization](/docs/products/kafka/karapace/concepts/schema-registry-authorization) for your Aiven for Apache Kafka® service via the `avn`
commands.

### `avn service schema-registry-acl-add`

You can add a Karapace schema registry ACL entry by using the command:

```
avn service schema-registry-acl-add
```

Where:

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
     <tr><td><code>service_name</code></td><td>The name of the service</td></tr>
     <tr><td><code>--permission</code></td><td>The permission type:  -   <code>schema_registry_read</code> -   <code>schema_registry_write</code></td></tr>
     <tr><td><code>--resource</code></td><td>The resource format can be <code>Config:</code> or <code>Subject:</code>. For more information, see <a href="/docs/products/kafka/karapace/concepts/acl-definition">ACLs definition</a>.</td></tr>
     <tr><td><code>--username</code></td><td>The name of a service user</td></tr>
  </tbody>
</table>

**Example**

The following example shows you how to add an ACL entry to grant a user
(`user_1`) read options (`schema_registry_read`) to subject `s1`.
Replace the placeholders `PROJECT_NAME` and `APACHE_KAFKA_SERVICE_NAME`
with the name of the project and the Aiven for Apache Kafka® service.

```
avn service schema-registry-acl-add kafka-doc \
  --username 'user_1'                        \
  --permission schema_registry_read          \
  --resource 'Subject:s1'
```

:::note
You cannot edit a Karapace schema registry ACL entry. You need to create
a new entry and delete the older entry.
:::

### `avn service schema-registry-acl-delete`

You can delete a Karapace schema registry ACL entry using the command:

```
avn service schema-registry-acl-delete
```

Where:

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`service_name`</td>
      <td>The name of the service</td>
    </tr>
    <tr>
      <td>`acl_id`</td>
      <td>The ID of the Karapace schema registry ACL to delete</td>
    </tr>
  </tbody>
</table>


**Example:**

The following example deletes the Karapace schema registry ACL with ID
`acl3604f96c74a` on the Aiven for Apache Kafka® instance named
`kafka-doc`.

```
avn service schema-registry-acl-delete kafka-doc acl3604f96c74a
```

### `avn service schema-registry-acl-list`

You can view a list of all Karapace schema registry ACL entries defined
using the command:

```
avn service schema-registry-acl-list
```

Where:

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`service_name`</td>
      <td>The name of the service</td>
    </tr>
  </tbody>
</table>


**Example:**

The following example lists the ACLs defined for an Aiven for Apache
Kafka® service named `kafka-doc`.

```
avn service schema-registry-acl-list kafka-doc
```

The command output is:

``` text
ID                        USERNAME  RESOURCE         PERMISSION
========================  ========  ===============  =====================
default-sr-admin-config   avnadmin  Config:          schema_registry_write
default-sr-admin-subject  avnadmin  Subject:*        schema_registry_write
acl12345678901            userAB*   Subject:s123*    schema_registry_write
```
