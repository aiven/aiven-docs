---
title: Connect to Aiven for MySQL® with LibreDB Studio
sidebar_label: LibreDB Studio
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Use [LibreDB Studio](https://libredb.org/) to connect to your Aiven for MySQL® service.

LibreDB Studio is an open source SQL client that you host yourself and reach from a
browser.

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io/)
- At least one running Aiven for MySQL service
- LibreDB Studio running on your machine or your network

## Run LibreDB Studio

Start LibreDB Studio with Docker:

```bash
docker run -p 3000:3000 -v libredb:/app/data \
  -e STORAGE_PROVIDER=sqlite \
  -e STORAGE_ENCRYPTION_KEY='ENCRYPTION_KEY' \
  ghcr.io/libredb/libredb-studio:0.17.0
```

Replace `ENCRYPTION_KEY` with at least 32 characters, for example the output of
`openssl rand -base64 32`. A shorter value stops the container from starting. Keep the
quotes. Unquoted, the shell reads a `$` or a backtick in the value, and the container
starts on a different key.

Keep the value itself, somewhere other than the volume. Start the container on a
different value later and every saved password becomes unreadable. The connection then
fails with an access-denied error from the service, and the container log carries
`Stored connection secrets could not be decrypted`. Without the variable, LibreDB Studio
derives the key from a secret it writes into the same volume, so one snapshot of the
volume carries both.

`STORAGE_PROVIDER=sqlite` keeps saved connections on the server, so they survive a new
browser or a different machine. The volume keeps them when you replace the container.

The command runs in the foreground. On the first run it prints the admin email and a
generated password, so read them there before you sign in. A later run reads the password
from `auth-bootstrap.json` on the volume and does not print it again, so keep a copy.
Deleting that file generates a new password, and without `STORAGE_ENCRYPTION_KEY` it also
discards the key that protects saved passwords.

Add `-e AUTH_COOKIE_SECURE=false` when the browser reaches LibreDB Studio over plain HTTP
at an address other than `localhost`, `127.0.0.1`, or `::1`. A network address such as
`http://192.168.1.10:3000` is one. Without the variable the sign-in request succeeds, the
browser drops the session cookie, and the page returns to the sign-in form with no error.

The variable turns off the protection it names. On plain HTTP the session cookie and the
service password cross the network in the clear. Put LibreDB Studio behind TLS anywhere
but the machine you are sitting at.

## Get the service URI from the Aiven Console

1. Log in to the Aiven Console and go to your organization > project > Aiven for MySQL
   service.
1. On the <ConsoleLabel name="overview"/> page, go to the **Connection information**
   section.
1. Copy the **Service URI**. It carries the host, port, user, password, database name, and
   `ssl-mode=REQUIRED`.

## Connect to the service URI from LibreDB Studio

1. Open LibreDB Studio, sign in, click **Editor**, then **New connection**.
1. Click **Paste URL**, paste the service URI, and click **Parse**. LibreDB Studio
   switches to **MySQL**, names the connection after the database, and fills in the host,
   port, user, password, and database name. It sets **SSL Mode** to **`require`**, because
   the URI carries `ssl-mode=REQUIRED`.
1. Click **Test Connection**, then click **Establish Connection** to save the
   connection.

The object browser lists your tables, views, stored procedures, functions, triggers, and
events. The SQL editor runs statements and `EXPLAIN` plans against the service.

Aiven gives each service its own port. Take the port from the Aiven Console rather than
the **`3306`** that choosing **MySQL** fills in.

A new connection starts with **SSL Mode** at **`disable`**, and a hand-typed one stays
there. Aiven for MySQL does not enforce TLS, so nothing refuses that connection. Set the
mode to **`require`** or higher yourself. See
[Cloud security](/docs/platform/concepts/cloud-security). The dialog keeps the last mode
it held, so read the mode again if you add a second connection after pasting a URI.

Each saved connection keeps a pool of up to 10 server connections while it is active. A
few saved connections take a noticeable share of a small plan. See
[MySQL max_connections](/docs/products/mysql/concepts/max-number-of-connections)
for what your plan allows, and read **Connections** on the
<ConsoleLabel name="overview"/> page if other clients connect at the same time.

## Verify the server certificate

**`require`** encrypts the connection but accepts any certificate, and pasting one does
not change that. To verify the certificate against the CA of your project:

1. On the <ConsoleLabel name="overview"/> page, go to the **Connection information**
   section and download **CA Certificate** as `ca.pem`.
1. In the connection, expand **SSL / TLS** and set **SSL Mode** to **`verify-ca`**.
1. Open `ca.pem` in a text editor and paste its contents into **CA Certificate (PEM)**.
   LibreDB Studio reads the certificate text, not a path to `ca.pem`.
1. Click **Test Connection**.

With nothing pasted, the connection fails with `Failed to connect to MySQL: self-signed
certificate in certificate chain`. Aiven signs with a CA of its own for each project.

**`verify-full`** and **`verify-system`** accept the same pasted certificate and are no
stronger against an Aiven service. On a MySQL connection LibreDB Studio verifies the
hostname in none of the three, so they prove the CA of your project signed the
certificate, not which host answered. MySQL's own `VERIFY_IDENTITY` does verify it, as
described in [TLS/SSL certificates](/docs/platform/concepts/tls-ssl-certificates).

A pasted certificate is a copy. Paste the new one when Aiven rotates the project CA, or
the connection starts failing.

<RelatedPages/>

- [Connect to Aiven for MySQL](/docs/products/mysql/howto/list-code-samples) for more
  tools you can use for connecting to your service
- [LibreDB Studio](https://libredb.org/)
- [LibreDB Studio on GitHub](https://github.com/libredb/libredb-studio)
