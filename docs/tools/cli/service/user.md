---
title: avn service user
---

Here you\'ll find the full list of commands for `avn service user`.

## Manage Aiven users and credentials

### `avn service user-create`

Creates a new user for the selected service.

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
      <td>`--username`</td>
      <td>The new username to be created</td>
    </tr>
    <tr>
      <td>`--m3-group`</td>
      <td>The name of the group the user belongs to (for Aiven for M3 services only)</td>
    </tr>
    <tr>
      <td>`--redis-acl-keys`</td>
      <td>The ACL rules for keys (Aiven for Redis®\* services only)</td>
    </tr>
    <tr>
      <td>`--redis-acl-commands`</td>
      <td>The ACL rules for commands (Aiven for Redis®\* services only)</td>
    </tr>
    <tr>
      <td>`--redis-acl-categories`</td>
      <td>The ACL rules for categories (Aiven for Redis®\* services only)</td>
    </tr>
    <tr>
      <td>`--redis-acl-channels`</td>
      <td>The ACL rules for channels (Aiven for Redis®\* services only)</td>
    </tr>
  </tbody>
</table>


**Example:** Create a new user named `janedoe` for a service named
`pg-demo`.

``` 
avn service user-create pg-demo --username janedoe
```

### `avn service user-creds-acknowledge` {#avn_service_user_creds_acknowledge}

Acknowledges the usage of the
[renewed SSL certificate](/docs/products/kafka/howto/renew-ssl-certs) for a specific service user.

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
      <td>`--username`</td>
      <td>The username for which to download the certificates</td>
    </tr>
  </tbody>
</table>


**Example:** Acknowledge the usage of the new SSL certificate for the
user `janedoe` belonging to a service named `kafka-demo`.

``` 
avn service user-creds-acknowledge kafka-demo --username janedoe
```

### `avn service user-creds-download` {#avn_service_user_creds_download}

Downloads the SSL certificate, key and CA certificate for the selected
service.

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
      <td>`--username`</td>
      <td>The username for which to download the certificates</td>
    </tr>
    <tr>
      <td>`-d`</td>
      <td>The target directory where certificates will be stored</td>
    </tr>
  </tbody>
</table>


**Example:** Download the SSL certificate, key and CA certificate in a
folder named `/tmp/certs` for the user `janedoe` belonging to a service
named `kafka-demo`.

``` 
avn service user-creds-download kafka-demo --username janedoe -d /tmp/certs
```

### `avn service user-delete`

Delete a service in a given Aiven service.

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
      <td>`--username`</td>
      <td>The username to delete</td>
    </tr>
  </tbody>
</table>


**Example:** Delete the user `janedoe` defined in a service named
`kafka-demo`.

``` 
avn service user-delete kafka-demo --username janedoe
```

### `avn service user-get`

Retrieves the details for a single user in a given Aiven service.

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
      <td>`--username`</td>
      <td>The username for which to retrieve the details</td>
    </tr>
  </tbody>
</table>


**Example:** Retrieve the details for the user `janedoe` defined for a
service named `kafka-demo`.

``` 
avn service user-get kafka-demo --username janedoe
```

:::tip
Use the `--json` parameter to retrieve all the service specific
information for a specific user.
:::

### `avn service user-kafka-java-creds` {#avn_service_user_kafka_java_creds}

Download user certificate/key/CA certificate and create a Java
keystore/truststore/properties from them

Downloads the SSL certificate, key and CA certificate and creates a Java
keystore and truststore for the selected service.

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
      <td>`--username`</td>
      <td>The username for which to download the certificates</td>
    </tr>
    <tr>
      <td>`-d`</td>
      <td>The target directory where certificates will be stored</td>
    </tr>
    <tr>
      <td>`--password`</td>
      <td>The Java keystore and truststore password (default: `changeit`)</td>
    </tr>
  </tbody>
</table>


**Example:** Download the SSL certificate, key and CA certificate in a
folder named `/tmp/certs` for the user `janedoe` belonging to a service
named `kafka-demo`. Furthermore, secure the Java keystore and truststore
with the password `safePassword123`.

``` 
avn service user-kafka-java-creds kafka-demo --username janedoe -d /tmp/certs --password safePassword123
```

### `avn service user-list`

Lists the users defined for the selected service, and the related type
(`primary` or `normal`).

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


**Example:** List the users defined for a service named `pg-doc`.

``` 
avn service user-list pg-doc
```

An example of `account service user-list` output:

``` text
USERNAME   TYPE
=========  =======
analytics  normal
avnadmin   primary
```

### `avn service user-password-reset`

Resets or changes the service user password.

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
      <td>`--username`</td>
      <td>The username to change the password for</td>
    </tr>
    <tr>
      <td>`--new-password`</td>
      <td>The new password for the user</td>
    </tr>
  </tbody>
</table>


**Example:** Change the password for the `avnadmin` user of the service
named `pg-doc` to `VerySecurePwd123`.

``` 
avn service user-password-reset pg-doc --username avnadmin --new-password VerySecurePwd123
```

### `avn service user-set-access-control`

Set Redis®\* service user access control
