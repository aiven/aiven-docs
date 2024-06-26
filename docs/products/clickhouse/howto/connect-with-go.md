---
title: Connect to the Aiven for ClickHouse® service with Go
---

To connect to your Aiven for ClickHouse® service with Go, you can use
the native protocol or the HTTPS protocol in specific cases. This
article provides you with instructions for both scenarios.

## Prerequisites

[Go 1.17 or later](https://go.dev/dl/)

## Install the ClickHouse Go module

To install the ClickHouse Go module, run the following command:

```go
go get github.com/ClickHouse/clickhouse-go/v2
```

:::note
If the version of Go is lower than 1.18.4 (visible via `go version`),
install an older version of `clickhouse-go`. For this
purpose, use command
`go get github.com/ClickHouse/clickhouse-go/v2@v2.2`.
:::

## Connect with the native protocol

### Identify connection information

To run the code for connecting to your service, first identify values of
the following variables:

 <table>
  <tr>
    <th>Variable</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>Host</code></td>
    <td><strong>Host</strong> for the ClickHouse connection available in the Aiven console: Service <strong>Overview</strong> &gt; <strong>Connection information</strong> &gt; <strong>ClickHouse native</strong></td>
  </tr>
  <tr>
    <td><code>Port</code></td>
    <td><strong>Port</strong> for the ClickHouse connection available in the Aiven console: Service <strong>Overview</strong> &gt; <strong>Connection information</strong> &gt; <strong>ClickHouse native</strong></td>
  </tr>
  <tr>
    <td><code>Database</code></td>
    <td><strong>Database Name</strong> in your the ClickHouse service available in the Aiven console: Service <strong>Overview</strong> &gt; <strong>Connection information</strong> &gt; <strong>ClickHouse native</strong></td>
  </tr>
  <tr>
    <td><code>Username</code></td>
    <td><strong>User</strong> for the ClickHouse connection available in the Aiven console: Service <strong>Overview</strong> &gt; <strong>Connection information</strong> &gt; <strong>ClickHouse native</strong></td>
  </tr>
  <tr>
    <td><code>Password</code></td>
    <td><strong>Password</strong> for the ClickHouse connection available in the Aiven console: Service <strong>Overview</strong> &gt; <strong>Connection information</strong> &gt; <strong>ClickHouse native</strong></td>
  </tr>
</table>


### Connect to the service

Replace the placeholders in the code with meaningful information on your
service connection and run the code.

```go
package main
import "fmt"
import "log"
import "crypto/tls"
import "github.com/ClickHouse/clickhouse-go/v2"
func main() {
    host := "HOST"
    native_port := NATIVE_PORT
    database := "DATABASE_NAME"
    username := "USERNAME"
    password := "PASSWORD"
    tls_config := &tls.Config{}
    conn, err := clickhouse.Open(&clickhouse.Options{
        Addr: []string{fmt.Sprintf("%s:%d", host, native_port)},
        Auth: clickhouse.Auth{
            Database: database,
            Username: username,
            Password: password,
        },
        TLS: tls_config,
    })
    if err != nil {
        log.Fatal(err)
    }
    v, err := conn.ServerVersion()
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(v)
}
```

## Connect with HTTPS

:::important
The HTTPS connection is supported for the database/SQL API only. By
default, connections are established over the native protocol. The HTTPS
connection needs to be enabled either by modifying the DSN to include
the HTTPS protocol or by specifying the protocol in the connection
options.
:::

### Identify connection information

To run the code for connecting to your service, first identify values of
the following variables:

<table>
  <tr>
    <th>Variable</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>Host</code></td>
    <td>
      <strong>Host</strong> for the ClickHouse connection available in the Aiven console: Service <strong>Overview</strong> &gt; <strong>Connection information</strong> &gt; <strong>ClickHouse HTTPS &amp; JDBC</strong>
    </td>
  </tr>
  <tr>
    <td><code>HttpPort</code></td>
    <td><p><strong>Port</strong> for the ClickHouse connection available in the Aiven console: Service <strong>Overview</strong> &gt; <strong>Connection information</strong> &gt; <strong>ClickHouse HTTPS &amp; JDBC</strong></p></td>
  </tr>
  <tr>
    <td><code>Database</code></td>
    <td><strong>Database Name</strong> in your the ClickHouse service available in the Aiven console: Service <strong>Overview</strong> &gt; <strong>Connection information</strong> &gt; <strong>ClickHouse HTTPS &amp; JDBC</strong></td>
  </tr>
  <tr>
    <td><code>Username</code></td>
    <td><strong>User</strong> for the ClickHouse connection available in the Aiven console: Service <strong>Overview</strong> &gt; <strong>Connection information</strong> &gt; <strong>ClickHouse HTTPS &amp; JDBC</strong></td>
  </tr>
  <tr>
    <td><code>Password</code></td>
    <td><strong>Password</strong> for the ClickHouse connection available in the Aiven console: Service <strong>Overview</strong> &gt; <strong>Connection information</strong> &gt; <strong>ClickHouse HTTPS &amp; JDBC</strong></td>
  </tr>
</table>



### Connect to the service

Replace the placeholders in the code with meaningful information on your
service connection and run the code.

```go
package main
import "database/sql"
import "fmt"
import "log"
import _ "github.com/ClickHouse/clickhouse-go/v2"
func main() {
        host := "HOST"
        https_port := HTTPS_PORT
        username := "USERNAME"
        password := "PASSWORD"
        conn, err := sql.Open(
                "clickhouse",
                fmt.Sprintf(
                        "https://%s:%d?username=%s&password=%s&secure", host, https_port, username, password))
        if err != nil {
                log.Fatal(err)
        }
        rows, err := conn.Query("SELECT version()")
        if err != nil {
                log.Fatal(err)
        }
        defer rows.Close()
        for rows.Next() {
                var version string
                if err := rows.Scan(&version); err != nil {
                        log.Fatal(err)
                }
                fmt.Println(version)
        }
}
```

You have your service connection established and
configured. You can proceed to
[uploading data into your database](load-dataset).

## Related pages

-   For instructions on how to configure connection settings, see
    [Connection
    Details](https://clickhouse.com/docs/en/integrations/go#connection-details).
-   For information on how to connect to the Aiven for ClickHouse
    service with the ClickHouse client, see
    [Connect with the ClickHouse client](/docs/products/clickhouse/howto/connect-with-clickhouse-cli).
