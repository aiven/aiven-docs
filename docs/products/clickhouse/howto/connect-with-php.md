---
title: Connect to the Aiven for ClickHouse® service with PHP
---

Learn how to connect to your Aiven for ClickHouse® service with PHP using the PHP ClickHouse client and the HTTPS port.

## Prerequisites

-   [PHP 7.4 or later](https://www.php.net/downloads)
-   `smi2/phpclickhouse` library
-   [Composer](https://getcomposer.org/)

:::tip
You can install `smi2/phpclickhouse` with the following command:

```php
composer require smi2/phpclickhouse
```

or

```php
php composer.phar require smi2/phpclickhouse
```
:::

## Identify connection information

To run the code for connecting to your service, first identify values of
the following variables:

|  Variable  |                                                                        Description                                                                        |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `https`    | Required to be set to `true`                                                                                                                              |
| `host`     | `Host` for the ClickHouse connection available in the Aiven console: Service **Overview** > **Connection information** > **ClickHouse HTTPS & JDBC**      |
| `port`     | `Port` for the ClickHouse connection available in the Aiven console: Service **Overview** > **Connection information** > **ClickHouse HTTPS & JDBC**      |
| `username` | `User` for the ClickHouse connection available in the Aiven console: Service **Overview** > **Connection information** > **ClickHouse HTTPS & JDBC**      |
| `password` | `Password` for the ClickHouse connection available in the Aiven console: Service **Overview** > **Connection information** > **ClickHouse HTTPS & JDBC**  |
| `database` | `Database Name` in the ClickHouse service available in the Aiven console: Service **Overview** > **Connection information** > **ClickHouse HTTPS & JDBC** |

## Connect to the service

Replace the placeholders in the code with meaningful information on your
service connection and run the code.

```php
<?php
    require_once 'vendor/autoload.php';
    $db = new ClickHouseDB\Client([
        'https' => true,
        'host' => 'HOSTNAME',
        'port' => 'HTTPS_PORT',
        'username' => 'USERNAME',
        'password' => 'PASSWORD'
    ]);
    $db->database('DATABASE');
    $response = $db->select('SELECT 1');
    print_r($response->rows());
```

Now you have your service connection set up and you can proceed to
[uploading data into your database](load-dataset).

## Related pages

- [Connect with the ClickHouse client](/docs/products/clickhouse/howto/connect-with-clickhouse-cli).
