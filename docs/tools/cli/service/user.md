---
title: avn service user
---

Full list of commands for `avn service user`.

## Manage Aiven users and credentials

### `avn service user-create`

Creates a new user for the selected service.

| Parameter                | Information                                                                |
| ------------------------ | -------------------------------------------------------------------------- |
| `service_name`           | The name of the service                                                    |
| `--username`             | The new username to be created                                             |
| `--m3-group`             | The name of the group the user belongs to (for Aiven for M3 services only) |
| `--redis-acl-keys`       | The ACL rules for keys (Aiven for Caching services only)                  |
| `--redis-acl-commands`   | The ACL rules for commands (Aiven for Caching services only)              |
| `--redis-acl-categories` | The ACL rules for categories (Aiven for Caching services only)            |
| `--redis-acl-channels`   | The ACL rules for channels (Aiven for Caching services only)              |

**Example:** Create new user named `janedoe` for a service named
`pg-demo`.

```
avn service user-create pg-demo --username janedoe
```

### `avn service user-creds-acknowledge` {#avn_service_user_creds_acknowledge}

Acknowledges the usage of the
[renewed SSL certificate](/docs/products/kafka/howto/renew-ssl-certs) for a specific service user.

| Parameter      | Information                                         |
| -------------- | --------------------------------------------------- |
| `service_name` | The name of the service                             |
| `--username`   | The username for which to download the certificates |

**Example:** Acknowledge the usage of the new SSL certificate for the
user `janedoe` belonging to a service named `kafka-demo`.

```
avn service user-creds-acknowledge kafka-demo --username janedoe
```

### `avn service user-creds-download` {#avn_service_user_creds_download}

Downloads the SSL certificate, key and CA certificate for the selected
service.

| Parameter      | Information                                            |
| -------------- | ------------------------------------------------------ |
| `service_name` | The name of the service                                |
| `--username`   | The username for which to download the certificates    |
| `-d`           | The target directory where certificates will be stored |

**Example:** Download the SSL certificate, key and CA certificate in a
folder named `/tmp/certs` for the user `janedoe` belonging to a service
named `kafka-demo`.

```
avn service user-creds-download kafka-demo --username janedoe -d /tmp/certs
```

### `avn service user-delete`

Delete a service in a given Aiven service.

| Parameter      | Information             |
| -------------- | ----------------------- |
| `service_name` | The name of the service |
| `--username`   | The username to delete  |

**Example:** Delete the user `janedoe` defined in a service named
`kafka-demo`.

```
avn service user-delete kafka-demo --username janedoe
```

### `avn service user-get`

Retrieves the details for a single user in a given Aiven service.

| Parameter      | Information                                    |
| -------------- | ---------------------------------------------- |
| `service_name` | The name of the service                        |
| `--username`   | The username for which to retrieve the details |

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

| Parameter      | Information                                                     |
| -------------- | --------------------------------------------------------------- |
| `service_name` | The name of the service                                         |
| `--username`   | The username for which to download the certificates             |
| `-d`           | The target directory where certificates will be stored          |
| `--password`   | The Java keystore and truststore password (default: `changeit`) |

**Example:** Download the SSL certificate, key and CA certificate in a
folder named `/tmp/certs` for the user `janedoe` belonging to a service
named `kafka-demo`. Secure the Java keystore and truststore
with the password `safePassword123`.

```
avn service user-kafka-java-creds kafka-demo --username janedoe -d /tmp/certs --password safePassword123
```

### `avn service user-list`

Lists the users defined for the selected service, and the related type
(`primary` or `normal`).

| Parameter      | Information             |
| -------------- | ----------------------- |
| `service_name` | The name of the service |

**Example:** List the users defined for a service named `pg-doc`.

```
avn service user-list pg-doc
```

An example of `account service user-list` output:

```text
USERNAME   TYPE
=========  =======
analytics  normal
avnadmin   primary
```

### `avn service user-password-reset`

Resets or changes the service user password.

| Parameter        | Information                             |
| ---------------- | --------------------------------------- |
| `service_name`   | The name of the service                 |
| `--username`     | The username to change the password for |
| `--new-password` | The new password for the user           |

**Example:** Change the password for the `avnadmin` user of the service
named `pg-doc` to `VerySecurePwd123`.

```
avn service user-password-reset pg-doc --username avnadmin --new-password VerySecurePwd123
```

### `avn service user-set-access-control`

Set Caching service user access control
