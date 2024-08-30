---
title: Connect with Java
---

import CodeBlock from '@theme/CodeBlock';
import MyComponentSource1 from '!!raw-loader!/code/products/valkey/connect.java';

Establish a connection to your Aiven for Valkey™ service using Java and the `jedis` library.

## Variables

Replace placeholders in the code sample with values from your service overview page:

| Variable    | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| `SERVICE_URI`|URI for the Aiven for Valkey service connection |

## Prerequisites

1. [Install Maven](https://maven.apache.org/install.html).
1. Alternatively, if you choose not to install Maven, manually download the
   dependencies from the [Maven Central Repository](https://search.maven.org) and place
   them in the `lib` folder.
1. If you have Maven installed, run the following commands in the `lib` folder to
   download `jedis` and its dependencies:

   ```shell
   mvn org.apache.maven.plugins:maven-dependency-plugin:2.8:get -Dartifact=redis.clients:jedis:4.1.1:jar -Ddest=lib/jedis-4.1.1.jar \
   && mvn org.apache.maven.plugins:maven-dependency-plugin:2.8:get -Dartifact=org.apache.commons:commons-pool2:2.11.1:jar -Ddest=lib/commons-pool2-2.11.1.jar \
   && mvn org.apache.maven.plugins:maven-dependency-plugin:2.8:get -Dartifact=org.slf4j:slf4j-api:1.7.35:jar -Ddest=lib/slf4j-api-1.7.35.jar \
   && mvn org.apache.maven.plugins:maven-dependency-plugin:2.8:get -Dartifact=com.google.code.gson:gson:2.8.9:jar -Ddest=lib/gson-2.8.9.jar
   ```

## Set up and run

1. Create a file named `ValkeyExample.java` and insert the code below, substituting
   the placeholder with your Aiven for Valkey URI:

   <CodeBlock language='java'>{MyComponentSource1}</CodeBlock>

   This code connects to Aiven for Valkey, sets a `key` named key with the value
   `hello world` (without expiration), then retrieves and prints the value of this key.

1. To compile and run the script, replace **SERVICE_URI** with your actual service URI:

   ```bash
   javac -cp "lib/*:." ValkeyExample.java && java -cp "lib/*:." ValkeyExample SERVICE_URI
   ```

   A successful connection displays:

   ```plaintext
    The value of key is: hello world
   ```
