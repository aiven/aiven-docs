---
title: Connect with Java
early: true
---

import CodeBlock from '@theme/CodeBlock';
import MyComponentSource1 from '!!raw-loader!/code/products/postgresql/connect.java';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

Connect to an Aiven for AlloyDB Omni database from Java, using JDBC Driver.

## Prerequisites

- Aiven for AlloyDB Omni service running

- If you have an Apache Maven version >= 2+, run:

   ```bash
   mvn org.apache.maven.plugins:maven-dependency-plugin:2.8:get -Dartifact=org.postgresql:postgresql:42.3.2:jar -Ddest=postgresql-42.3.2.jar
   ```

- [Binary JAR file of the JDBC driver downloaded](https://jdbc.postgresql.org/download/)

## Connect to a service

1. Create a file named `AlloyDBOmniExample.java` with the following content:

   <CodeBlock language='java'>{MyComponentSource1}</CodeBlock>

   This code opens a connection to the database, runs a query checking the database version,
   and prints the response.

1. Run the code using the following command, replacing the placeholders for connection
   parameters with the values available on the
   <ConsoleLabel name="overview"/> page of your service in the Aiven Console:

   ```bash
   javac AlloyDBOmniExample.java && java -cp postgresql-42.2.24.jar:. AlloyDBOmniExample -host HOST -port PORT -database DATABASE -username avnadmin -password PASSWORD
   ```

   The connection parameters to be replaced in the command:

   | Variable   | Description                                                 |
   | ---------- | ----------------------------------------------------------- |
   | `HOST`     | Hostname for Aiven for AlloyDB Omni service connection      |
   | `PORT`     | Port for Aiven for AlloyDB Omni service connection          |
   | `DATABASE` | Database name for Aiven for AlloyDB Omni service connection |
   | `PASSWORD` | `avnadmin` password                                         |

Expect output like:

```text
Version: PostgreSQL 15.5 on x86_64-pc-linux-gnu, compiled by [...]
```
