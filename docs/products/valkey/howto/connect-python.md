---
title: Connect with Python
---

import CodeBlock from '@theme/CodeBlock';
import MyComponentSource1 from '!!raw-loader!/code/products/valkey/connect.py';

Connect to the Aiven for Valkey™ service using Python with the `valkey-py` library. `valkey-py` is a Python interface specifically designed for the Valkey key-value store.

## Variables

Replace placeholders in the code sample with values from your service overview page:

| Variable    | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| `SERVICE_URI` | URI for the Aiven for Valkey service connection |

## Prerequisites

Install the `valkey-py` library with optional performance enhancements from `hiredis`
by running the following commands:

```shell
pip install valkey
pip install "valkey[hiredis]"
```

## Set up and run

1. Create a file named `main.py` and insert the code below, substituting the
   placeholder with your Aiven for Valkey URI:

   <CodeBlock language='python'>{MyComponentSource1}</CodeBlock>

   This code creates a key named `key` with the value `hello world` without an expiration.
   It then retrieves this key from the Valkey service and outputs its value.

1. Run the script using the following command:

   ```bash
   python main.py
   ```

   :::note
   Use `python3` instead of `python` on systems where it defaults to Python 2.
   :::

   Successful execution results in the following output:

   ```plaintext
   The value of key is: hello world
   ```

## Related Pages

- For additional information about `valkey-py`, see
  the [valkey-py GitHub Repository](https://github.com/valkey-io/valkey-py).
