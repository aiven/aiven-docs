---
title: Connect with NodeJS
---

import CodeBlock from '@theme/CodeBlock';
import MyComponentSource1 from '!!raw-loader!/code/products/redis/connect.js';

Learn how to connect to an Aiven for Caching service using NodeJS with the `ioredis` library.

## Variables

Replace the following placeholders in the code sample with actual values
from your service overview page:

 | Variable    | Description                                                  |
 | ----------- | ------------------------------------------------------------ |
 | `SERVICE_URI`| URI for the Aiven for Caching service connection |

## Prerequisites

To install the `ioredis` library, run the following command:

```shell
npm install --save ioredis
```

## Code

Create a file named `index.js` and insert the code below,
substituting the placeholder with your Aiven for Caching URI:

<CodeBlock language='javascript'>{MyComponentSource1}</CodeBlock>

This code creates a key named `key` with the value `hello world` without an expiration.
It then retrieves this key from the caching service and outputs its value.

Execute the script with:

```bash
node index.js
```

Successful execution results in the following output:

```plaintext
The value of key is: hello world
```
