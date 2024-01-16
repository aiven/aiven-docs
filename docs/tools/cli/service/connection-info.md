---
title: avn service connection-info
---

Here you\'ll find the full list of commands for
`avn service connection-info`.

## Retrieve connection information {#avn_cli_service_connection_info_kcat}

### `avn service connection-info kafkacat`

Retrieves the `kcat` command necessary to connect to an Aiven for Apache
Kafka® service and produce/consume messages to topics, check out more in
the
[dedicated article](/docs/products/kafka/howto/kcat).

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
      <td>`--route`</td>
      <td>The type of route to use to connect to the service. Possible values are `dynamic`, `privatelink` and `public`</td>
    </tr>
    <tr>
      <td>`--privatelink-connection-id`</td>
      <td>The ID of the privatelink to use</td>
    </tr>
    <tr>
      <td>`--kafka-authentication-method`</td>
      <td>The Aiven for Apache Kafka® authentication method. Possible values are `certificate` and `sasl`</td>
    </tr>
    <tr>
      <td>`--username`</td>
      <td>The username used to connect if using `sasl` authentication method</td>
    </tr>
    <tr>
      <td>`--ca`</td>
      <td>The path to the CA certificate file</td>
    </tr>
    <tr>
      <td>`--client-cert`</td>
      <td>The path to the client certificate file</td>
    </tr>
    <tr>
      <td>`--client-key`</td>
      <td>The path to the client key file</td>
    </tr>
    <tr>
      <td>`--write`</td>
      <td>Save the certificate and key files if not existing</td>
    </tr>
    <tr>
      <td>`--overwrite`</td>
      <td>Save (or overwrite if already existing) the certificate and key files</td>
    </tr>
  </tbody>
</table>


**Example:** Retrieve the `kcat` command to connect to an Aiven for
Apache Kafka service named `demo-kafka` with SSL authentication
(`certificate`), download the certificates necessary for the connection:

``` 
avn service connection-info kafkacat demo-kafka --write
```

An example of `service connection-info kafkacat` output:

``` text
kafkacat -b demo-kafka-dev-advocates.aivencloud.com:13041 -X security.protocol=SSL -X ssl.ca.location=ca.pem -X ssl.key.location=service.key -X ssl.certificate.location=service.crt
```

:::warning
The command output uses the old `kafkacat` naming. To be able to execute
`kcat` commands, replace `kafkacat` with `kcat`.
:::

### `avn service connection-info pg string`

Retrieves the connection parameters for a certain Aiven for PostgreSQL®
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
      <td>`--route`</td>
      <td>The type of route to use to connect to the service. Possible values are `dynamic`, `privatelink` and `public`</td>
    </tr>
    <tr>
      <td>`--usage`</td>
      <td>The database connection usage. Possible values are `primary` and `replica`</td>
    </tr>
    <tr>
      <td>`--privatelink-connection-id`</td>
      <td>The ID of the privatelink to use</td>
    </tr>
    <tr>
      <td>`--username`</td>
      <td>The username used to connect if using `sasl` authentication method</td>
    </tr>
    <tr>
      <td>`--dbname`</td>
      <td>The database name to use to connect</td>
    </tr>
    <tr>
      <td>`--sslmode`</td>
      <td>The `sslmode` to use. Possible values are `require`, `verify-ca`, `verify-full`, `disable`, `allow`, `prefer`</td>
    </tr>
  </tbody>
</table>


**Example:** Retrieve the connection parameters for an Aiven for
PostgreSQL® service named `demo-pg`:

``` 
avn service connection-info pg string demo-pg
```

An example of `avn service connection-info pg string` output:

``` text
host='demo-pg-dev-project.aivencloud.com' port='13039' user=avnadmin dbname='defaultdb'
```

### `avn service connection-info pg uri`

Retrieves the connection URI for an Aiven for PostgreSQL® service.

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
      <td>`--route`</td>
      <td>The type of route to use to connect to the service. Possible values are `dynamic`, `privatelink` and `public`</td>
    </tr>
    <tr>
      <td>`--usage`</td>
      <td>The database connection usage. Possible values are `primary` and `replica`</td>
    </tr>
    <tr>
      <td>`--privatelink-connection-id`</td>
      <td>The ID of the privatelink to use</td>
    </tr>
    <tr>
      <td>`--username`</td>
      <td>The username used to connect if using `sasl` authentication method</td>
    </tr>
    <tr>
      <td>`--dbname`</td>
      <td>The database name to use to connect</td>
    </tr>
    <tr>
      <td>`--sslmode`</td>
      <td>The `sslmode` to use. Possible values are `require`, `verify-ca`, `verify-full`, `disable`, `allow`, `prefer`</td>
    </tr>
  </tbody>
</table>


**Example:** Retrieve the connection URI for an Aiven for PostgreSQL®
service named `demo-pg`:

``` 
avn service connection-info pg uri demo-pg
```

An example of `avn service connection-info pg uri` output:

``` text
postgres://avnadmin:XXXXXXXXXX@demo-pg-dev-project.aivencloud.com:13039/defaultdb?sslmode=require
```

### `avn service connection-info psql`

Retrieves the `psql` command needed to connect to an Aiven for
PostgreSQL® service.

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
      <td>`--route`</td>
      <td>The type of route to use to connect to the service. Possible values are `dynamic`, `privatelink` and `public`</td>
    </tr>
    <tr>
      <td>`--usage`</td>
      <td>The database connection usage. Possible values are `primary` and `replica`</td>
    </tr>
    <tr>
      <td>`--privatelink-connection-id`</td>
      <td>The Id of the privatelink to use</td>
    </tr>
    <tr>
      <td>`--username`</td>
      <td>The username used to connect if using `sasl` authentication method</td>
    </tr>
    <tr>
      <td>`--dbname`</td>
      <td>The database name to use to connect</td>
    </tr>
    <tr>
      <td>`--sslmode`</td>
      <td>The `sslmode` to use. Possible values are `require`, `verify-ca`, `verify-full`, `disable`, `allow`, `prefer`</td>
    </tr>
  </tbody>
</table>


**Example:** Retrieve the `psql` command needed to connect to an Aiven
for PostgreSQL® service named `demo-pg`:

``` 
avn service connection-info psql demo-pg
```

An example of `avn service connection-info psql` output:

``` text
psql postgres://avnadmin:XXXXXXXXXXXX@demo-pg-dev-advocates.aivencloud.com:13039/defaultdb?sslmode=require
```

### `avn service connection-info redis uri`

Retrieves the connection URI needed to connect to an Aiven for Redis®\*
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
      <td>`--route`</td>
      <td>The type of route to use to connect to the service. Possible values are `dynamic`, `privatelink` and `public`</td>
    </tr>
    <tr>
      <td>`--usage`</td>
      <td>The database connection usage. Possible values are `primary` and `replica`</td>
    </tr>
    <tr>
      <td>`--privatelink-connection-id`</td>
      <td>The ID of the privatelink to use</td>
    </tr>
    <tr>
      <td>`--username`</td>
      <td>The username used to connect if using `sasl` authentication method</td>
    </tr>
    <tr>
      <td>`--db`</td>
      <td>The database name to use to connect</td>
    </tr>
  </tbody>
</table>


**Example:** Retrieve the connection URI needed to connect to an Aiven
for Redis® service named `demo-redis`:

``` 
avn service connection-info redis uri demo-redis
```

An example of `avn service connection-info redis uri` output:

``` text
rediss://default:XXXXXXXXXX@demo-redis-dev-project.aivencloud.com:13040
```
