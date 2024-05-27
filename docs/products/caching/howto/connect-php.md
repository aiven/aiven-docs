---
title: Connect with PHP
---

import CodeBlock from '@theme/CodeBlock';
import MyComponentSource1 from '!!raw-loader!/code/products/redis/connect.php';

Learn how to connect to an Aiven for Caching service using PHP and the `predis` library, complete with code examples and setup instructions.

## Variables

Replace the following placeholders in the code sample with actual values
from your service overview page:


 | Variable    | Description                                                  |
 | ----------- | ------------------------------------------------------------ |
 | `SERVICE_URI` | URI for the Aiven for Caching service connection |

## Prerequisites

To install the `predis` library, run the following command:

```shell
composer require predis/predis
```

## Code

Create a file named `index.php` and insert the code below,
substituting the placeholder with your Aiven for Caching URI:

<CodeBlock language='php'>{MyComponentSource1}</CodeBlock>

This code creates a key named `key` with the value `hello world` without an expiration.
It then retrieves this key from the caching service and outputs its value.

Execute the script with:

```bash
php index.php
```

Successful execution results in the following output:

```plaintext
The value of key is: hello world
```
