---
title: avn service acl
---

Here you\'ll find the full list of commands for `avn service acl`.

## Manage Apache Kafka® access control lists

Commands for managing Aiven for Apache Kafka® access control lists via
`avn` commands.

### `avn service acl-add`

Adds an Aiven for Apache Kafka® ACL entry.

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
      <td>`--permission`</td>
      <td>The permission type: possible values are `read`, `write` or `readwrite`</td>
    </tr>
    <tr>
      <td>`--topic`</td>
      <td>The topic name pattern: accepts `*` and `?` as wildcard characters</td>
    </tr>
    <tr>
      <td>`--username`</td>
      <td>The username pattern: accepts `*` and `?` as wildcard characters</td>
    </tr>
  </tbody>
</table>


**Example:** Add an ACLs for users with username ending with `userA` to
`readwrite` on topics having name starting with `topic2020` in the
service `kafka-doc`.

``` 
avn service acl-add kafka-doc --username *userA --permission readwrite --topic topic2020*
```

### `avn service acl-delete`

Deletes an Aiven for Apache Kafka® ACL entry.

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
      <td>The id of the ACL to delete</td>
    </tr>
  </tbody>
</table>


**Example:** Delete the ACLs with id `acl3604f96c74a` on the Aiven for
Apache Kafka instance named `kafka-doc`.

``` 
avn service acl-delete kafka-doc acl3604f96c74a
```

### `avn service acl-list`

Lists Aiven for Apache Kafka® ACL entries.

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


**Example:** List the ACLs defined for a service named `kafka-doc`.

``` 
avn service acl-list kafka-doc
```

An example of `account service acl-list` output:

``` text
ID              USERNAME  TOPIC      PERMISSION
==============  ========  =========  ==========
default         *         *          admin
acl3604f96c74a  Jon       orders     readwrite
acl3604fa706cb  Frida     invoices*  write
```
