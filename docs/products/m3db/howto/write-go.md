---
title: Write data to M3DB with Go
---

import CodeBlock from '@theme/CodeBlock';
import MyComponentSource1 from '!!raw-loader!/code/products/m3db/write.go';

This example writes some data to an M3DB service from Go, making use of
the Prometheus write features.

## Variables

These are the placeholders you will need to replace in the code sample:

 | Variable         | Description                                               |
 | ---------------- | --------------------------------------------------------- |
 | `PROM_WRITE_URL` | URL for Prometheus writes, from the service overview page |

## Prerequisites

For this example you will need:

1.  The Prometheus client for Go:

    ```
    go get -u github.com/m3db/prometheus_remote_client_golang/promremote
    ```

## Code

Add the following to `main.go` and replace the `PROM_WRITE_URL`
placeholder:

<CodeBlock language='go'>{MyComponentSource1}</CodeBlock>

Since M3DB also supports Prometheus-style writes, this code sets up a
Prometheus client and then constructs the expected data format to send
to M3DB.

To run the code:

    go run main.go

If the script outputs `Status code: 200` then there is data in your
M3DB. See
[Visualize M3DB data with Grafana](/docs/products/m3db/howto/grafana).
