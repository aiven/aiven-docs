---
title: Connect to Aiven for PostgreSQL® with LibreDB Studio
sidebar_label: LibreDB Studio
---

import RelatedPages from "@site/src/components/RelatedPages";

Use [LibreDB Studio](https://libredb.org/) to connect to your Aiven for PostgreSQL®
service from a browser. LibreDB Studio is an open source SQL client that you host
yourself, so a team connects through one URL instead of installing a client on every
machine.

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io/)
- At least one running Aiven for PostgreSQL service
- LibreDB Studio running on your machine or your network, for example with Docker:

  ```bash
  docker run -p 3000:3000 -v libredb:/app/data \
    -e STORAGE_PROVIDER=sqlite ghcr.io/libredb/libredb-studio:0.15.0
  ```

  `STORAGE_PROVIDER=sqlite` keeps saved connections on the server instead of in the
  browser, and the volume keeps them when the container is replaced. On the first run,
  the admin password is printed to the container log, so read it with `docker logs`
  before you sign in.

## Get the service URI from Aiven Console

1. Log in to [Aiven Console](https://console.aiven.io/) and go to your
   organization > project > Aiven for PostgreSQL service.
1. On the service **Overview** page, go to the **Connection information** section.
1. Copy the **Service URI**. It carries the host, port, user, password, database name,
   and `sslmode=require`.

## Connect to the service URI from LibreDB Studio

1. Open LibreDB Studio, sign in, and create a connection.
1. Select **Paste URL**, paste the service URI, and select **Parse**. The host, port,
   user, password, and database name are filled in, and SSL is set to `REQUIRE` because
   the URI carries `sslmode=require`.
1. Select **Test Connection** to verify the settings, and **Establish Connection** to
   save the connection.

Your tables are listed in the object browser, and the query editor and `EXPLAIN` plans
run against the service.

## Connection limits on smaller plans

LibreDB Studio keeps a connection pool open while a connection is active, so it uses
several of the connections your plan allows. Plans with a low connection limit, such as
the free plan with a limit of 20, leave less room for other clients. Check **Connections**
on the service **Overview** page if several tools connect at the same time.

<RelatedPages/>

- [Connect to Aiven for PostgreSQL](/docs/products/postgresql/howto/list-code-samples) for
more tools you can use for connecting to your service
- [LibreDB Studio](https://libredb.org/)
- [LibreDB Studio on GitHub](https://github.com/libredb/libredb-studio)
