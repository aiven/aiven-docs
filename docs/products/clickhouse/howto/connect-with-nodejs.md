---
title: Connect to the Aiven for ClickHouse® service with Node.js
---

Learn how to connect to your Aiven for ClickHouse® service with Node.js
using the official Node.js client for connecting to ClickHouse and the
HTTPS port.

## Prerequisites

-   [Node.js](https://nodejs.org/en/download/) in your environment
-   [Node.js client for connecting to
    ClickHouse](https://clickhouse.com/docs/en/integrations/language-clients/javascript#environment-requirements-nodejs)

:::tip
You can install the Node.js client for connecting to ClickHouse using

```shell
npm i @clickhouse/client
```
:::

## Identify connection information

To run the code for connecting to your service, first identify values of
the following variables:

| Variable              | Description                                                                                                                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CLICKHOUSE_HOST`     | `https://HOST:HTTPS_PORT`, where `Host` and `Port` for the ClickHouse connection are available in the Aiven console: Service **Overview** \> **Connection information** \> **ClickHouse HTTPS & JDBC** |
| `CLICKHOUSE_USER`     | `User` for the ClickHouse connection available in the Aiven console: Service **Overview** \> **Connection information** \> **ClickHouse HTTPS & JDBC**                                                 |
| `CLICKHOUSE_PASSWORD` | `Password` for the ClickHouse connection available in the Aiven console: Service **Overview** \> **Connection information** \> **ClickHouse HTTPS & JDBC**                                             |

## Connect to the service

Replace the placeholders in the code with meaningful information on your
service connection and run the code.

```javascript
import { createClient } from '@clickhouse/client'
const client = createClient({
    host: "CLICKHOUSE_HOST",
    username: "CLICKHOUSE_USER",
    password: "CLICKHOUSE_PASSWORD",
    database: "default",
})
const response = await client.query({
    query : "SELECT 1",
    format: "JSONEachRow",
    wait_end_of_query: 1,
})
const data = await response.json()
console.log(data)
```

:::note[Expected result]
Now you have your service connection set up and you can proceed to
[uploading data into your database](/docs/products/clickhouse/howto/load-dataset).
:::

:::note[See also]
For information on how to connect to the Aiven for Clickhouse service
with the ClickHouse client, see
[Connect with the ClickHouse client](/docs/products/clickhouse/howto/connect-with-clickhouse-cli).
:::
