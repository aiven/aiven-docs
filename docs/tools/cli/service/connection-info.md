---
title: avn service connection-info
---

Full list of commands for `avn service connection-info`.

## Retrieve connection information {#avn_cli_service_connection_info_kcat}

### `avn service connection-info kafkacat`

Retrieves the `kcat` command necessary to connect to an Aiven for Apache
Kafka® service and produce/consume messages to topics, check out more in
the
[dedicated article](/docs/products/kafka/howto/kcat).

| Parameter                       | Information                                                                                                   |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `service_name`                  | The name of the service                                                                                       |
| `--route`                       | The type of route to use to connect to the service. Possible values are `dynamic`, `privatelink` and `public` |
| `--privatelink-connection-id`   | The ID of the privatelink to use                                                                              |
| `--kafka-authentication-method` | The Aiven for Apache Kafka® authentication method. Possible values are `certificate` and `sasl`               |
| `--username`                    | The username used to connect if using `sasl` authentication method                                            |
| `--ca`                          | The path to the CA certificate file                                                                           |
| `--client-cert`                 | The path to the client certificate file                                                                       |
| `--client-key`                  | The path to the client key file                                                                               |
| `--write`                       | Save the certificate and key files if not existing                                                            |
| `--overwrite`                   | Save (or overwrite if already existing) the certificate and key files                                         |

**Example:** Retrieve the `kcat` command to connect to an Aiven for
Apache Kafka service named `demo-kafka` with SSL authentication
(`certificate`), download the certificates necessary for the connection:

```
avn service connection-info kafkacat demo-kafka --write
```

An example of `service connection-info kafkacat` output:

```text
kafkacat -b demo-kafka-dev-advocates.aivencloud.com:13041 -X security.protocol=SSL -X ssl.ca.location=ca.pem -X ssl.key.location=service.key -X ssl.certificate.location=service.crt
```

:::warning
The command output uses the old `kafkacat` naming. To be able to execute
`kcat` commands, replace `kafkacat` with `kcat`.
:::

### `avn service connection-info pg string`

Retrieves the connection parameters for a certain Aiven for PostgreSQL®
service.

| Parameter                     | Information                                                                                                    |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `service_name`                | The name of the service                                                                                        |
| `--route`                     | The type of route to use to connect to the service. Possible values are `dynamic`, `privatelink` and `public`. |
| `--usage`                     | The database connection usage. Possible values are `primary` and `replica`                                     |
| `--privatelink-connection-id` | The ID of the privatelink to use                                                                               |
| `--username`                  | The username used to connect if using `sasl` authentication method                                             |
| `--dbname`                    | The database name to use to connect                                                                            |
| `--sslmode`                   | The `sslmode` to use. Possible values are `require`, `verify-ca`, `verify-full`, `disable`, `allow`, `prefer`. |

**Example:** Retrieve the connection parameters for an Aiven for
PostgreSQL® service named `demo-pg`:

```
avn service connection-info pg string demo-pg
```

An example of `avn service connection-info pg string` output:

```text
host='demo-pg-dev-project.aivencloud.com' port='13039' user=avnadmin dbname='defaultdb'
```

### `avn service connection-info pg uri`

Retrieves the connection URI for an Aiven for PostgreSQL® service.

| Parameter                     | Information                                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `service_name`                | The name of the service                                                                                       |
| `--route`                     | The type of route to use to connect to the service. Possible values are `dynamic`, `privatelink` and `public` |
| `--usage`                     | The database connection usage. Possible values are `primary` and `replica`                                    |
| `--privatelink-connection-id` | The ID of the privatelink to use                                                                              |
| `--username`                  | The username used to connect if using `sasl` authentication method                                            |
| `--dbname`                    | The database name to use to connect                                                                           |
| `--sslmode`                   | The `sslmode` to use. Possible values are `require`, `verify-ca`, `verify-full`, `disable`, `allow`, `prefer` |

**Example:** Retrieve the connection URI for an Aiven for PostgreSQL®
service named `demo-pg`:

```
avn service connection-info pg uri demo-pg
```

An example of `avn service connection-info pg uri` output:

```text
postgres://avnadmin:XXXXXXXXXX@demo-pg-dev-project.aivencloud.com:13039/defaultdb?sslmode=require
```

### `avn service connection-info psql`

Retrieves the `psql` command needed to connect to an Aiven for
PostgreSQL® service.

| Parameter                     | Information                                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `service_name`                | The name of the service                                                                                       |
| `--route`                     | The type of route to use to connect to the service. Possible values are `dynamic`, `privatelink` and `public` |
| `--usage`                     | The database connection usage. Possible values are `primary` and `replica`                                    |
| `--privatelink-connection-id` | The Id of the privatelink to use                                                                              |
| `--username`                  | The username used to connect if using `sasl` authentication method                                            |
| `--dbname`                    | The database name to use to connect                                                                           |
| `--sslmode`                   | The `sslmode` to use. Possible values are `require`, `verify-ca`, `verify-full`, `disable`, `allow`, `prefer` |

**Example:** Retrieve the `psql` command needed to connect to an Aiven
for PostgreSQL® service named `demo-pg`:

```
avn service connection-info psql demo-pg
```

An example of `avn service connection-info psql` output:

```text
psql postgres://avnadmin:XXXXXXXXXXXX@demo-pg-dev-advocates.aivencloud.com:13039/defaultdb?sslmode=require
```

### `avn service connection-info redis uri`

Retrieves the connection URI needed to connect to an Aiven for Redis®\*
service.

| Parameter                     | Information                                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `service_name`                | The name of the service                                                                                       |
| `--route`                     | The type of route to use to connect to the service. Possible values are `dynamic`, `privatelink` and `public` |
| `--usage`                     | The database connection usage. Possible values are `primary` and `replica`                                    |
| `--privatelink-connection-id` | The ID of the privatelink to use                                                                              |
| `--username`                  | The username used to connect if using `sasl` authentication method                                            |
| `--db`                        | The database name to use to connect                                                                           |

**Example:** Retrieve the connection URI needed to connect to an Aiven
for Redis® service named `demo-redis`:

```
avn service connection-info redis uri demo-redis
```

An example of `avn service connection-info redis uri` output:

```text
rediss://default:XXXXXXXXXX@demo-redis-dev-project.aivencloud.com:13040
```
