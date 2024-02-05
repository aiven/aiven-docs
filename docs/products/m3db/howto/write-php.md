---
title: Write data to M3DB with PHP
---

import CodeBlock from '@theme/CodeBlock';
import MyComponentSource1 from '!!raw-loader!/code/products/m3db/write.php';

This example writes some data to an M3DB service from PHP, making use of
the InfluxDB® library.

## Variables

These are the placeholders you will need to replace in the code sample:

 | Variable        | Description                                             |
 | --------------- | ------------------------------------------------------- |
 | `SERVICE_HOST`  | Service hostname, found on the service overview page    |
 | `SERVICE_PORT`  | Service port number, found on the service overview page |
 | `AVNADMIN_PASS` | Password for the default `avnadmin` user                |

## Prerequisites

For this example you will need:

1.  The PHP InfluxDB library. You can install this with `composer`:

    ```
    composer require influxdata/influxdb-client-php
    ```

:::note
M3DB supports InfluxDB® (v1) protocol so we can use the existing library
for this database too.
:::

## Code

Add the following to `index.php` and replace the placeholders with
values for your project:

<CodeBlock language='php'>{MyComponentSource1}</CodeBlock>

This code creates an InfluxDBClient and connects to the
InfluxDB-literate endpoint on the M3DB. Then the code constructs the
expected data format, and writes it to the client.

To run the code:

```
php -f index.php
```

If the script outputs `bool(true)` then there is data in your M3DB. See
[Visualize M3DB data with Grafana](/docs/products/m3db/howto/grafana).
