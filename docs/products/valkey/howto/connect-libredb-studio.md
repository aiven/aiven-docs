---
title: Connect to Aiven for Valkey™ with LibreDB Studio
sidebar_label: LibreDB Studio
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Use [LibreDB Studio](https://libredb.org/) to connect to your Aiven for Valkey™ service through its Redis®* entry.

LibreDB Studio is an open source database client that you host yourself and reach from a
browser. It has no Valkey entry: Aiven for Valkey serves the Valkey protocol, which
answers the commands the Redis driver sends.

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io/)
- At least one running Aiven for Valkey service
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

## Get the service URI from the Aiven Console

1. Log in to the Aiven Console and go to your organization > project > Aiven for Valkey
   service.
1. On the <ConsoleLabel name="overview"/> page, go to the **Connection information**
   section.
1. Copy the **Service URI**. It carries the host, port, user, and password.

The Console writes the URI with the `valkeys://` prefix. LibreDB Studio reads the Redis
URI forms, so change that prefix to `rediss://` before you paste. Both name the same TLS
transport, and the rest of the URI stays as it is.

## Connect to the service URI from LibreDB Studio

1. Sign in to LibreDB Studio.
1. Click **Editor** > **New connection**.
1. Click **Paste URL**, paste the service URI, and click **Parse**. LibreDB Studio selects
   **Redis** from the `rediss://` prefix and fills in the host, port, user, and password.
1. Click **Test Connection**, then click **Establish Connection** to save the connection.

The `rediss://` prefix also sets **SSL Mode** to **`require`**, which encrypts the
connection and accepts any certificate. To verify the certificate, expand **SSL / TLS**
and set **SSL Mode** to **`verify-system`**. Aiven for Valkey presents a certificate your
system already trusts, so there is nothing to paste.

Where the <ConsoleLabel name="overview"/> page offers a **CA Certificate** to download,
the service uses the CA of your project instead. Expand **SSL / TLS**, set **SSL Mode** to
**`verify-ca`**, and paste the contents of that file into **CA Certificate (PEM)**.

Aiven gives each service its own port. Take the port from the Aiven Console rather than
the default **`6379`**.

The user in the service URI is `default`, and LibreDB Studio sends it as the Valkey ACL
user. A service user you create in the Aiven Console connects the same way. It runs only
the commands and keys its ACL allows, and the rest come back as `NOPERM`.

## Run commands

The editor runs one command per run. Enter a single command, or highlight the line you
want and run the selection:

```text
PING
```

A second command below the first is refused, and nothing is sent. `PING`, `DBSIZE`, and
`INFO server` each return on an Aiven for Valkey service.

To find keys, run `SCAN 0 MATCH *`. It answers one cursor step rather than the whole
keyspace: it returns a cursor and a batch, and you pass that cursor to the next `SCAN`.
`GET` then reads a string key, and a key of another type answers `WRONGTYPE`.

`INFO server` comes back as rows of section, key, and value rather than as the raw text
block, so the editor's grid reads it like any other result. It reports `server_name` as
`valkey`, with a `valkey_version` of its own. It also reports the `redis_version` the
service answers for compatibility.

<RelatedPages/>

- [Connect to Aiven for Valkey](/docs/products/valkey/howto/connect-valkey-cli) for other
  tools you can use for connecting to your service
- [LibreDB Studio](https://libredb.org/)
- [LibreDB Studio on GitHub](https://github.com/libredb/libredb-studio)
