---
title: Connect with NodeJS
---

import CodeBlock from '@theme/CodeBlock';
import MyComponentSource1 from '!!raw-loader!/code/products/valkey/connect.js';

Connect to the Aiven for Valkey™ service using NodeJS with the `ioredis` library.

## Variables

Replace placeholders in the code sample with values from your service overview page:

 | Variable    | Description                                                  |
 | ----------- | ------------------------------------------------------------ |
 | `SERVICE_URI`| URI for the Aiven for Valkey service connection |

## Prerequisites

Install the `ioredis` library using the following command:

```shell
npm install --save ioredis
```

## Set up and run

1. Create a file named `index.js` and insert the code below,
   substituting the placeholder with your Aiven for Valkey URI:

   <CodeBlock language='javascript'>{MyComponentSource1}</CodeBlock>

   This code creates a key named `key` with the value `hello world` without an expiration.
   It then retrieves this key from the Valkey service and outputs its value.

1. Run the script using the following command:

   ```bash
   node index.js
   ```

   A successful connection displays:

   ```plaintext
   The value of key is: hello world
   ```
