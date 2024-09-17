---
title: Connect with PHP
---

import CodeBlock from '@theme/CodeBlock';
import MyComponentSource1 from '!!raw-loader!/code/products/valkey/connect.php';

Connect to the Aiven for Valkey™ database using PHP, making use of the `predis` library.

## Variables

Replace placeholders in the code sample with values from your service overview page:


 | Variable    | Description                                                  |
 | ----------- | ------------------------------------------------------------ |
 | `SERVICE_URI` | URI for the Aiven for Valkey service connection |

## Prerequisites

Install the `predis` library using the following command:

```shell
composer require predis/predis
```

## Set up and run

1. Create a file named `index.php` and insert the code below,
   substituting the placeholder with your Aiven for Valkey URI:

   <CodeBlock language='php'>{MyComponentSource1}</CodeBlock>

   This code creates a key named `key` with the value `hello world` without an expiration.
   It then retrieves this key from the Valkey service and outputs its value.

1. Run the script using the following command:

   ```bash
   php index.php
   ```

   A successful connection displays:

   ```plaintext
   The value of key is: hello world
   ```
