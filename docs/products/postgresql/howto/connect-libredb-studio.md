---
title: Connect to Aiven for PostgreSQL® with LibreDB Studio
sidebar_label: LibreDB Studio
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Use [LibreDB Studio](https://libredb.org/) to connect to your Aiven for PostgreSQL® service.

LibreDB Studio is an open source SQL client that you host yourself and reach from a
browser, so a team connects through one URL.

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io/)
- At least one running Aiven for PostgreSQL service
- LibreDB Studio running on your machine or your network, for example with Docker:

  ```bash
  docker run -p 3000:3000 -v libredb:/app/data \
    -e STORAGE_PROVIDER=sqlite \
    -e STORAGE_ENCRYPTION_KEY=ENCRYPTION_KEY \
    ghcr.io/libredb/libredb-studio:0.17.0
  ```

  Replace `ENCRYPTION_KEY` with at least 32 characters, for example the output of
  `openssl rand -base64 32`, and keep the value somewhere other than the volume. A
  shorter value stops the container from starting, and a value you change later makes
  every saved password unreadable. Without the variable, LibreDB Studio derives the key
  that protects saved passwords from a secret it writes into the same volume, so one
  snapshot of the volume carries both.

  `STORAGE_PROVIDER=sqlite` keeps saved connections on the server, so they survive a new
  browser or a different machine, and the volume keeps them when you replace the
  container.

  The command runs in the foreground and prints the admin email and a generated password
  on the first run, so read them there before you sign in. A later run reads the password
  from `auth-bootstrap.json` on the volume and does not print it again. Delete that file
  and restart to generate a new one.

  If the browser reaches LibreDB Studio over plain HTTP at an address other than
  `localhost`, `127.0.0.1`, or `::1`, for example at `http://192.168.1.10:3000` on a
  network, add `-e AUTH_COOKIE_SECURE=false`. Without it the sign-in request succeeds,
  the browser drops the session cookie, and the page returns to the sign-in form with no
  error.

## Get the service URI from the Aiven Console

1. Log in to the Aiven Console and go to your organization > project > Aiven for
   PostgreSQL service.
1. On the <ConsoleLabel name="overview"/> page, go to the **Connection information**
   section.
1. Copy the **Service URI**. It carries the host, port, user, password, database name,
   and `sslmode=require`.

## Connect to the service URI from LibreDB Studio

1. Open LibreDB Studio, sign in, and create a connection.
1. Click **Paste URL**, paste the service URI, and click **Parse**. LibreDB Studio
   fills in the host, port, user, password, and database name, and sets **SSL Mode**
   to **`require`** because the URI carries `sslmode=require`.
1. Click **Test Connection**, then click **Establish Connection** to save the
   connection.

The object browser lists your tables, and the query editor and `EXPLAIN` plans run
against the service.

## Connection limits on smaller plans

Each saved connection keeps a pool of up to 10 server connections while it is active, so
a few saved connections take a noticeable share of a small plan. See
[Connection limits](/docs/products/postgresql/reference/pg-connection-limits) for what
your plan allows, and read **Connections** on the <ConsoleLabel name="overview"/> page if
other clients connect at the same time.

<RelatedPages/>

- [Connect to Aiven for PostgreSQL](/docs/products/postgresql/howto/list-code-samples) for
more tools you can use for connecting to your service
- [LibreDB Studio](https://libredb.org/)
- [LibreDB Studio on GitHub](https://github.com/libredb/libredb-studio)
