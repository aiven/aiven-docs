---
title: Connect with Java
---

import CodeBlock from '@theme/CodeBlock';
import MyComponentSource1 from '!!raw-loader!/code/products/redis/connect.java';

Learn how to establish a connection to your Aiven for Caching service using Java and the `jedis` library.

## Variables

Replace the following placeholders in the code sample with actual values
from your service overview page:

 | Variable    | Description                                                  |
 | ----------- | ------------------------------------------------------------ |
 | `SERVICE_URI`| URI for the Aiven for Caching connection, from the service overview page |

## Prerequisites

With `maven` installed, use the following commands to download `jedis` and its
dependencies into the `lib` folder:

```shell
mvn org.apache.maven.plugins:maven-dependency-plugin:2.8:get -Dartifact=redis.clients:jedis:4.1.1:jar -Ddest=lib/jedis-4.1.1.jar \
&& mvn org.apache.maven.plugins:maven-dependency-plugin:2.8:get -Dartifact=org.apache.commons:commons-pool2:2.11.1:jar -Ddest=lib/commons-pool2-2.11.1.jar \
&& mvn org.apache.maven.plugins:maven-dependency-plugin:2.8:get -Dartifact=org.slf4j:slf4j-api:1.7.35:jar -Ddest=lib/slf4j-api-1.7.35.jar \
&& mvn org.apache.maven.plugins:maven-dependency-plugin:2.8:get -Dartifact=com.google.code.gson:gson:2.8.9:jar -Ddest=lib/gson-2.8.9.jar
```

If `maven` is not installed, download the dependencies from the
[Maven Central Repository](https://search.maven.org) and place them in the `lib`
folder manually.

## Code

Create a file named `CachingExample.java` and insert the code below,
substituting the placeholder with your Aiven for Caching URI:

<CodeBlock language='java'>{MyComponentSource1}</CodeBlock>

This code connects to Aiven for Caching, sets a `key` named key with the value
`hello world` (without expiration), then retrieves and prints the value of this key.

Replace the placeholder with the **SERVICE_URI**, compile and run the
code:

```bash
javac -cp lib/*:. CachingExample.java && java -cp lib/*:. CachingExample SERVICE_URI
```

Successful execution results in the following output:

```plaintext
The value of key is: hello world
```
