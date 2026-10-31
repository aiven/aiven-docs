---
title: Connect to Aiven for OpenSearch® with LibreDB Studio
sidebar_label: LibreDB Studio
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Use [LibreDB Studio](https://libredb.org/) to query your Aiven for OpenSearch® service with SQL.

LibreDB Studio is an open source database client that you host yourself and reach from a
browser. It reads OpenSearch through the SQL plugin the distribution ships, so each index
answers `SELECT`.

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io/)
- At least one running Aiven for OpenSearch service
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

1. Log in to the Aiven Console and go to your organization > project > Aiven for
   OpenSearch service.
1. On the <ConsoleLabel name="overview"/> page, go to the **Connection information**
   section and stay on the **OpenSearch** tab.
1. Copy the **Host**, **Port**, **User**, and **Password**. The user is `avnadmin` on a
   new service.

## Connect from LibreDB Studio

LibreDB Studio reads no service URI for OpenSearch. It addresses the service by host and
port, so enter the values rather than pasting the URI. Pasting an `https://` address into
**Paste URL** selects ClickHouse®, which takes that scheme.

1. Sign in to LibreDB Studio.
1. Click **Editor** > **New connection**.
1. Click **OpenSearch**.
1. Enter the host, port, user, and password from the Aiven Console.
1. Expand **SSL / TLS** and set **SSL Mode** to **`verify-system`**. Aiven for OpenSearch
   presents a certificate your system already trusts, so there is nothing to paste.
1. Click **Test Connection**, then click **Establish Connection** to save the connection.

Aiven for OpenSearch serves HTTPS on the same port it serves everything else, so the
port you copied is the one to use, rather than the default **`9200`**. **SSL Mode** starts
at **`disable`**, and the service refuses an unencrypted request.

## Query the service

The editor sends SQL to the OpenSearch SQL plugin, which Aiven for OpenSearch includes.
Each index reads as a table, and `SHOW TABLES LIKE %` lists the indices your user reaches:

```sql
SELECT FIELD_NAME, COUNT(*) AS total
FROM INDEX_NAME
GROUP BY FIELD_NAME
ORDER BY total DESC
```

Replace the following:

- `INDEX_NAME`: an index in your service
- `FIELD_NAME`: a field in that index

`SELECT`, `WHERE`, `GROUP BY`, `ORDER BY`, and `LIMIT` run against an index. Statements
the plugin does not implement, such as `INSERT` and `UPDATE`, answer
`SQLFeatureNotSupportedException`. That error comes from the plugin, not from LibreDB
Studio.

<RelatedPages/>

- [Connect to your service](/docs/products/opensearch/howto/list-connect-to-service) for
  other tools you can use for connecting to your service
- [OpenSearch plugins](/docs/products/opensearch/reference/plugins)
- [LibreDB Studio](https://libredb.org/)
- [LibreDB Studio on GitHub](https://github.com/libredb/libredb-studio)
