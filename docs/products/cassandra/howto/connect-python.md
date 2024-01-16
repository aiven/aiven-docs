---
title: Connect with Python
---

import CodeBlock from '@theme/CodeBlock';
import MyComponentSource1 from '!!raw-loader!/code/products/cassandra/connect.py';

This example connects to an Aiven for Apache Cassandra® service from
Python as the `avnadmin` user by making use of the `cassandra-driver`
library.

## Pre-requisites

Install the `cassandra-driver` library:

```
pip install cassandra-driver
```

## Variables

These are the placeholders you will need to replace in the code sample:

| Variable       | Description                                                                    |
| -------------- | ------------------------------------------------------------------------------ |
| `HOST`         | Host name of your Cassandra service.                                           |
| `PORT`         | Port number used for connecting to your Cassandra service                      |
| `USER`         | Username used for connecting to your Cassandra service. Defaults to `avnadmin` |
| `PASSWORD`     | Password of the `avnadmin` user                                                |
| `SSL-CERTFILE` | Path to the `CA Certificate` file of your Cassandra service                    |

:::tip
The Aiven for Cassandra CA certificate can be downloaded from [Aiven
Console](https://console.aiven.io/), on the service detail page or with
the [dedicated Aiven CLI command](/docs/tools/cli/project#avn_project_ca_get).
:::

## Connect to the database

The following example establishes a SSL connection with your database
cluster; replace the placeholders for `HOST`, `PORT`, `USER`,
`PASSWORD`, `SSL-CERTFILE`:

<CodeBlock language='python'>{MyComponentSource1}</CodeBlock>
