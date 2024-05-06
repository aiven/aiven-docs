---
title: Connect with Python
---

import CodeBlock from '@theme/CodeBlock';
import MyComponentSource1 from '!!raw-loader!/code/products/redis/connect.py';

Learn how to connect to an Aiven for Caching service using Python and the `redis-py` library.

## Variables

Replace the following placeholders in the code sample with actual values
from your service overview page:

| Variable    | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| `CACHING_URI` | URI for the Aiven for Caching service connection |

## Prerequisites

To install the `redis-py`library, run the following command:

```shell
pip install redis
```

## Code

Create a file named `main.py` and insert the code below,
substituting the placeholder with your Aiven for Caching URI:

<CodeBlock language='python'>{MyComponentSource1}</CodeBlock>

This code creates a key named `key` with the value `hello world` without an expiration.
It then retrieves this key from the caching service and outputs its value.

Execute the script with:

```
python main.py
```

:::note
Note that on some systems you will need to use `python3` to get Python3
rather than the previous Python2
:::


You will see the following output after successful execution:

```
The value of key is: hello world
```
