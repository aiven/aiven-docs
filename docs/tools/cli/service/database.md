---
title: avn service database
---

Here you\'ll find the full list of commands for `avn service database`.

## Manage databases

### `avn service database-create`

Creates a database within an Aiven for PostgreSQL®, Aiven for MySQL or
Aiven for InfluxDB® service.

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
      <td>`--dbname`</td>
      <td>The name of the database</td>
    </tr>
  </tbody>
</table>


**Example:** Create a new database named `analytics-it` within the
service named `pg-demo`.

``` 
avn service database-create pg-demo --dbname analytics-it
```

### `avn service database-delete`

Removes a specific database within an Aiven for PostgreSQL®, Aiven for
MySQL or Aiven for InfluxDB® service.

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
      <td>`--dbname`</td>
      <td>The name of the database</td>
    </tr>
  </tbody>
</table>


**Example:** Delete the database named `analytics-it` within the service
named `pg-demo`

``` 
avn service database-delete pg-demo --dbname analytics-it  
```

### `avn service database-list`

Lists the service databases available in an Aiven for PostgreSQL®, Aiven
for MySQL or Aiven for InfluxDB® service.

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


**Example:** List the service databases within the service named
`pg-demo`

``` 
avn service database-list pg-demo
```
