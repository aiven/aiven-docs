---
title: Connect to Aiven for Apache Kafka® with NodeJS
---

These examples show how to connect to an Aiven for Apache Kafka® service
using the [node-rdkafka](https://github.com/blizzard/node-rdkafka)
library.

## Prerequisites

1.  Install [node-rdkafka](https://github.com/blizzard/node-rdkafka).
    Make sure that you have OpenSSL set up on your machine.
2.  Go to the *Overview* page of your Aiven for Apache Kafka service and
    choose how to authenticate.
    -   To connect with SSL authentication, in the *Connection
        information* section:
        1.  If **Authentication Method** is shown, choose **Client
            Certificate**
        2.  Next to *Access Key*, click **Download** and save the
            `service.key` file.
        3.  Next to *Access Certificate*, click **Download** and save
            the `service.cert` file.
        4.  Next to *CA Certificate*, click **Download** and save the
            `ca.pem` file.
    -   To connect using SASL authentication:
        1.  See [Use SASL Authentication with Apache
            Kafka®](/docs/products/kafka/howto/kafka-sasl-auth)
            to enable SASL.
        2.  In the **Connection Information** section
            1.  Select **SASL** as the **Authentication Method**
            2.  Next to **CA Certificate**, click **Download** and save
                the `ca.pem` file
            3.  Note the *Password* required for the SASL, we'll need
                it for authentication

:::note
The *CA Certificate* `ca.pem` file has the same content regardless of
the authentication method.
:::

:::warning
In the below examples, we just pass the name of the certificate files,
but in actual use, the full path should be used.
:::

## Variables

 | Variable         | Description                                                       |
 | ---------------- | ----------------------------------------------------------------- |
 | `HOST`           | Host name for the connection                                      |
 | `USER_NAME`      | Name of the user for the connection                               |
 | `SSL_PORT`       | Port number to use for SSL                                        |
 | `SASL_PORT`      | Port number to use for SASL                                       |
 | `SASL_PASSWORD`  | Password required to connect using SASL                           |
 | `SASL_MECHANISM` | Supported SASL mechanisms are PLAIN, SCRAM-SHA-256, SCRAM-SHA-512 |
 | `CONSUMER_GROUP` | Consumer group to read the data                                   |

Replace the variables above in the code examples below.

## Connect a producer

Add the `producer.produce()` command with the details of the message to
produce.

:::tip
The consumer example expects the messages to be in a topic named
`demo-topic`,
:::

### With SSL authentication

```js
const Kafka = require('node-rdkafka');
console.log(Kafka.features); // this should print 'ssl', among other things

const producer = new Kafka.Producer({
    'metadata.broker.list': HOST:SSL_PORT,
    'security.protocol': 'ssl',
    'ssl.key.location': 'service.key',
    'ssl.certificate.location': 'service.cert',
    'ssl.ca.location': 'ca.pem',
    'dr_cb': true
});

producer.connect();

producer.on('ready', () => {
    // produce the messages and disconnect
});
```

### With SASL authentication

If you prefer to authenticate with SASL, the setup looks slightly
different.

```js
const Kafka = require('node-rdkafka');
console.log(Kafka.features); // this should print 'sasl_ssl', among other things

const producer = new Kafka.Producer({
    'metadata.broker.list': HOST:SASL_PORT,
    'security.protocol': 'sasl_ssl',
    'sasl.mechanism': SASL_MECHANISM,
    'sasl.username': USER_NAME,
    'sasl.password': SASL_PASSWORD,
    'ssl.ca.location': 'ca.pem',
    'dr_cb': true
});

producer.connect();

producer.on('ready', () => {
  // produce the messages and disconnect
});
```

## Connect a consumer

The consumer will consume new messages sent to the topics listed. To see
your consumer in action, run the producer as well, and try using
`console.log` to inspect the message that is received.

### With SSL authentication

```js
const Kafka = require('node-rdkafka');

const stream = new Kafka.createReadStream({
    'metadata.broker.list': HOST:SSL_PORT,
    'group.id': CONSUMER_GROUP,
    'security.protocol': 'ssl',
    'ssl.key.location': 'service.key',
    'ssl.certificate.location': 'service.cert',
    'ssl.ca.location': 'ca.pem'
}, {}, {'topics': ['demo-topic']});

stream.on('data', (message) => {
    // process message
});
```

### With SASL authentication

If you prefer to authenticate with SASL, the setup looks slightly
different.

```js
const Kafka = require('node-rdkafka');

const stream = new Kafka.createReadStream({
    'metadata.broker.list': HOST:SASL_PORT,
    'group.id': CONSUMER_GROUP,
    'security.protocol': 'sasl_ssl',
    'sasl.mechanism': SASL_MECHANISM,
    'sasl.username': USER_NAME,
    'sasl.password': SASL_PASSWORD,
    'ssl.ca.location': 'ca.pem'
}, {}, {'topics': ['demo-topic']});

stream.on('data', (message) => {
    // process message
});
```
