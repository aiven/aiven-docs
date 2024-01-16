---
title: avn service connection-pool
---

Here you\'ll find the full list of commands for
`avn service connection-pool`.

## Manage PgBouncer connection pools

### `avn service connection-pool-create`

Creates a new
[PgBouncer connection pool](/docs/products/postgresql/concepts/pg-connection-pooling) for a given PostgreSQL® service.

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
      <td>`--pool-name`</td>
      <td>The name of the connection pool</td>
    </tr>
    <tr>
      <td>`--dbname`</td>
      <td>The name of the database</td>
    </tr>
    <tr>
      <td>`--username`</td>
      <td>The database username to use for the connection pool</td>
    </tr>
    <tr>
      <td>`--pool-size`</td>
      <td>Size of the connection pool in number of connections</td>
    </tr>
    <tr>
      <td>`--pool-mode`</td>
      <td>The [pool mode](/docs/products/postgresql/concepts/pg-connection-pooling#pooling-modes). Possible values are `transaction`, `session` and `statement`</td>
    </tr>
  </tbody>
</table>


**Example:** In the service `demo-pg` Create a new connection pool named
`cp-analytics-it` for the database `it-analytics` with:

-   username `avnadmin`
-   pool-size of `10` connections
-   `transaction` pool-mode

``` 
avn service connection-pool-create demo-pg \
  --pool-name cp-analytics-it             \
  --dbname analytics-it                   \
  --username avnadmin                     \
  --pool-size 10                          \
  --pool-mode transaction
```

### `avn service connection-pool-delete`

Deletes a
[PgBouncer connection pool](/docs/products/postgresql/concepts/pg-connection-pooling) for a given PostgreSQL® service.

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
      <td>`--pool-name`</td>
      <td>The name of the connection pool</td>
    </tr>
  </tbody>
</table>


**Example:** In the service `demo-pg` delete a connection pool named
`cp-analytics-it`.

``` 
avn service connection-pool-delete demo-pg \
  --pool-name cp-analytics-it             
```

### `avn service connection-pool-list`

Lists the
[PgBouncer connection pool](/docs/products/postgresql/concepts/pg-connection-pooling) for a given PostgreSQL® service.

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


**Example:** List the connection pools available in the service
`demo-pg`.

``` 
avn service connection-pool-list demo-pg
```

An example of `avn service connection-pool-list` output:

``` text
POOL_NAME        DATABASE      USERNAME  POOL_MODE    POOL_SIZE
===============  ============  ========  ===========  =========
cp-analytics-it  analytics-it  avnadmin  transaction  10
cp-sales         sales-it      test-usr  session      20
```

### `avn service connection-pool-update`

Updates a
[PgBouncer connection pool](/docs/products/postgresql/concepts/pg-connection-pooling) for a given PostgreSQL® service.

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
      <td>`--pool-name`</td>
      <td>The name of the connection pool</td>
    </tr>
    <tr>
      <td>`--dbname`</td>
      <td>The name of the database</td>
    </tr>
    <tr>
      <td>`--username`</td>
      <td>The database username to use for the connection pool</td>
    </tr>
    <tr>
      <td>`--pool-size`</td>
      <td>Size of the connection pool in number of connections</td>
    </tr>
    <tr>
      <td>`--pool-mode`</td>
      <td>The [pool mode](/docs/products/postgresql/concepts/pg-connection-pooling#pooling-modes). Possible values are `transaction`, `session` and `statement`</td>
    </tr>
  </tbody>
</table>


**Example:** In the service `demo-pg` update the connection pool named
`cp-analytics-it` for the database `it-analytics` with:

-   username `avnadmin`
-   pool-size of `20` connections
-   `session` pool-mode

``` 
avn service connection-pool-update demo-pg \
  --pool-name cp-analytics-it             \
  --dbname analytics-it                   \
  --username avnadmin                     \
  --pool-size 20                          \
  --pool-mode session
```
