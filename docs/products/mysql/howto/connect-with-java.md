---
title: Connect to Aiven for MySQL® with Java
---

import CodeBlock from '@theme/CodeBlock';
import MyComponentSource1 from '!!raw-loader!/code/products/mysql/connect.java';

This example connects your Java application to an Aiven for MySQL® service.

## Variables

Replace the following placeholders in the code sample:

  |     Variable     |                                                                          Description                                                                           |
  |------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
  | `MYSQL_HOST`     | Host name for the connection, from [Aiven Console](https://console.aiven.io/) > the **Overview** page of your service > the **Connection information** section |
  | `MYSQL_PORT`     | Port number to use, from [Aiven Console](https://console.aiven.io/) > the **Overview** page of your service > the **Connection information** section           |
  | `MYSQL_PASSWORD` | Password for `avnadmin` user                                                                                                                                   |
  | `MYSQL_DATABASE` | Database to connect                                                                                                                                            |

## Prerequisites

-   JDK 1.8+
-   MySQL JDBC Driver, which you can install:
    -   Manually from [MySQL Community Downloads](https://dev.mysql.com/downloads/connector/j/)
    -   Using maven:

        ```bash
        mvn org.apache.maven.plugins:maven-dependency-plugin:2.8:get -Dartifact=mysql:mysql-connector-java:8.0.28:jar -Ddest=mysql-driver-8.0.28.jar
        ```

## Code

Add the following to `MySqlExample.java`:

<CodeBlock language='java'>{MyComponentSource1}</CodeBlock>

This code creates a MySQL client and connects to the database. It
fetches version of MySQL and prints it the output.

Run the code after replacement of the placeholders with values for your
project:

```
javac MySqlExample.java && java -cp "mysql-driver-8.0.28.jar;." MySqlExample -host MYSQL_HOST -port MYSQL_PORT -database MYSQL_DATABASE -username avnadmin -password MYSQL_PASSWORD
```

If the script runs successfully, the output will be the values that were
inserted into the table:

```text
Version: 8.0.26
```

Now that your application is connected, you are all set to use Java with
Aiven for MySQL.
