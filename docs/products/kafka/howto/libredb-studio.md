---
title: Use LibreDB Studio with Aiven for Apache Kafka®
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Use [LibreDB Studio](https://libredb.org/) to browse your Aiven for Apache Kafka® service and read its messages.

LibreDB Studio is an open source database client that you host yourself and reach from a
browser. It reads Kafka and writes nothing: It lists topics, partitions, consumer groups
with their lag, brokers, and configurations, and it reads messages. It never produces a
message, commits an offset, joins a consumer group, or creates a topic.

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io/)
- At least one running Aiven for Apache Kafka service
- LibreDB Studio running on your machine or your network

## Run LibreDB Studio

Start LibreDB Studio with Docker:

```bash
docker run -p 3000:3000 -v libredb:/app/data \
  -e STORAGE_PROVIDER=sqlite \
  -e STORAGE_ENCRYPTION_KEY='ENCRYPTION_KEY' \
  ghcr.io/libredb/libredb-studio:latest
```

Replace `ENCRYPTION_KEY` with at least 32 characters, for example the output of `openssl
rand -base64 32`. A shorter value stops the container from starting. That run still counts
as the first one: It prints the generated password and writes it to the volume, and the
run after it prints no password. Keep the quotes. Unquoted, the shell reads a `$` or a
backtick in the value, and the container starts on a different key.

Keep the value itself, somewhere other than the volume. Start the container on a different
value later and every saved password becomes unreadable.

The command runs in the foreground. On the first run it prints the admin email and a
generated password, so read them there before you sign in. A later run reads the password
from `auth-bootstrap.json` on the volume and prints no password, so keep a copy. To set a
new one, start once with `-e ADMIN_PASSWORD=YOUR_PASSWORD -e ADMIN_PASSWORD_RESET=true`,
then drop `ADMIN_PASSWORD_RESET`. Every start applies it again while it is set.

Deleting `auth-bootstrap.json` makes the next run print a new password, and with
`STORAGE_PROVIDER=sqlite` that password does not sign in. The account lives in the server
store, which the first run seeds and later runs leave alone.

Add `-e AUTH_COOKIE_SECURE=false` when the browser reaches LibreDB Studio over plain HTTP
at an address other than `localhost`, `127.0.0.1`, or `::1`. Without the variable the
sign-in request succeeds, the browser drops the session cookie, and the page returns
to the sign-in form with no error. The variable turns off the protection it names. Put
LibreDB Studio behind TLS anywhere but the machine you are sitting at.

## Get the connection details from the Aiven Console

1. Log in to the Aiven Console and go to your organization > project > Aiven for Apache
   Kafka service.
1. On the <ConsoleLabel name="overview"/> page, go to the **Connection information**
   section.
1. Click **Client certificate** as the authentication method.
1. Copy the **Host** and the **Port**.
1. Download the **Access Key**, **Access Certificate**, and **CA Certificate**, which save
   as `service.key`, `service.cert`, and `ca.pem`.

Client certificate and SASL connections use ports of their own, so copy the port after
you choose the method. The host stays the same.

## Connect from LibreDB Studio

LibreDB Studio reads no service URI for Kafka: A Kafka client takes a bootstrap address,
so enter the values rather than pasting a URI.

1. Sign in to LibreDB Studio.
1. Click **Editor** > **New connection**.
1. Click **Apache Kafka**.
1. Enter the host and the port from the Aiven Console.
1. Expand **SSL / TLS** and set **SSL Mode** to **`verify-full`**.
1. Paste the contents of `ca.pem` into **CA Certificate (PEM)**, `service.cert` into
   **Client Certificate (PEM)**, and `service.key` into **Client Private Key (PEM)**.
   LibreDB Studio reads the certificate text, not a path to the file.
1. Leave **SASL mechanism** at **None**. A service that takes SASL instead uses the
   mechanism, the user, and the password, which LibreDB Studio sends over TLS only.
1. Click **Test Connection**, then click **Establish Connection** to save the connection.

**Client Certificate (PEM)** and **Client Private Key (PEM)** appear once **SSL Mode** is
**`verify-ca`** or **`verify-full`**, and both read as optional. Aiven for Apache Kafka
requires them when the authentication method is a client certificate.

A client certificate the broker refuses, or none where the broker requires one, reads as a
lost connection rather than as a TLS failure. Ensure you pasted all three files before
you look elsewhere.

A pasted certificate is a copy. Paste the new one when Aiven renews the certificates, or
the connection starts failing. See
[Renew service SSL certificates](/docs/products/kafka/howto/renew-ssl-certs).

## Read messages

The editor takes one JSON read request rather than SQL:

```json
{ "topic": "TOPIC_NAME", "from": "earliest", "limit": 50 }
```

Replace `TOPIC_NAME` with a topic in your service. Without `from` the read starts at
`latest`, and without `limit` it returns 50 messages across the partitions it reads.

Each row carries the partition, the offset, the timestamp, the key, the value, the
encoding LibreDB Studio read each of those two in, and the headers. A JSON message value
comes back as JSON rather than as text.

`from` also takes an offset within one partition:

```json
{ "topic": "TOPIC_NAME", "partition": 0, "from": { "offset": "120" } }
```

It also takes a timestamp:

```json
{ "topic": "TOPIC_NAME", "from": { "timestamp": "2026-01-01T00:00:00Z" } }
```

The timestamp needs a zone, because the server and the browser would otherwise read it in
zones of their own.

<RelatedPages/>

- [Connect to Aiven for Apache Kafka](/docs/products/kafka/howto/list-code-samples) for
  other tools you can use for connecting to your service
- [LibreDB Studio](https://libredb.org/)
- [LibreDB Studio on GitHub](https://github.com/libredb/libredb-studio)
