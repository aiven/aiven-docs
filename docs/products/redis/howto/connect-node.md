---
title: Connect with NodeJS
---

import CodeBlock from '@theme/CodeBlock';
import MyComponentSource1 from '!!raw-loader!/code/products/redis/connect.js';

This example connects to Redis®\* service from NodeJS, making use of the
`ioredis` library.

## Variables

These are the placeholders you will need to replace in the code sample:

 | Variable    | Description                                                  |
 | ----------- | ------------------------------------------------------------ |
 | `REDIS_URI` | URL for the Redis connection, from the service overview page |

## Prerequisites

Install the `ioredis` library:

```
npm install --save ioredis
```

## Code

Create a new file named `index.js`, add the following content and
replace the placeholder with the Redis URI:

<CodeBlock language='javascript'>{MyComponentSource1}</CodeBlock>

This code creates a key named `key` with the value `hello world` and no
expiration time. Then, it gets the key back from Redis and prints its
value.

Run the code:

```
node index.js
```

If the script runs successfully, the outputs should be:

```
The value of key is: hello world
```
