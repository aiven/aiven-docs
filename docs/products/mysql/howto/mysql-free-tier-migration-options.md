---
title: "Aiven for MySQL® free tier: migration options"
sidebar_label: Free tier migration options
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Migrate your data from your free Aiven for MySQL® service before the free tier is retired, by upgrading to a paid plan, switching to Aiven for PostgreSQL®, or exporting your data.

:::warning
**Retirement date**: December 21, 2026

On December 21, 2026, remaining free Aiven for MySQL services will be powered off, and
their data and backups will be deleted. Move your data before this date.
:::

Aiven for MySQL remains fully available across all paid plans, and only the free tier
is being discontinued.

## What happens to your free service

The following table lists the stages of the free tier retirement.

| Stage | What happens |
| ----- | ------------ |
| Announcement | You cannot create new free Aiven for MySQL services. Existing free services keep running. |
| Until December 21, 2026 | Your free service runs as before. Upgrade it, migrate your data, or export it. |
| December 21, 2026 | Aiven powers off all remaining free services and deletes their data and backups. |

Self-serve data retrieval will not be available after services are terminated on the
retirement date.

## Choose a migration path

Pick the path that matches what you need:

- **Keep using MySQL on Aiven**: upgrade your free service to the Developer plan. Your
  data stays in place and you keep the same connection details.
- **Keep using a free database on Aiven**: create an Aiven for PostgreSQL free service
  and migrate your data to it. This changes your database engine.
- **Take your data with you**: export your data to a file before the retirement date.

## Upgrade to the Aiven for MySQL Developer plan

Upgrading keeps your data, your service name, and your connection details. The
Developer plan is a paid plan that adds disk storage and
[Basic tier support](/docs/platform/howto/support). For plan contents and limitations,
see [Service pricing](/docs/platform/concepts/service-pricing).

To upgrade your free service:

1. Add a payment method to the project's billing group.
1. In the [Aiven Console](https://console.aiven.io/), go to your service page.
1. On the <ConsoleLabel name="overview"/> page, find **Service plan usage** and click
   **Upgrade plan**.

The upgrade happens immediately. Basic tier support can take up to 3 hours to become
available.

## Move to the Aiven for PostgreSQL free tier

Aiven for PostgreSQL has a free tier with comparable resources. Moving to it means
changing your database engine, so review the differences before you start. For the
migration steps, see
[Migrate from Aiven for MySQL® to Aiven for PostgreSQL®](/docs/products/mysql/howto/migrate-to-postgresql).

For the free PostgreSQL plan contents and limitations, see
[Aiven for PostgreSQL® free tier](/docs/products/postgresql/concepts/pg-free-tier).

## Export your data

To keep a copy of your data outside Aiven, export it to a file with `mysqldump` or
`mydumper`. For the commands and connection details, see
[Backup and restore Aiven for MySQL® with mysqldump or mydumper](/docs/products/mysql/howto/migrate-database-mysqldump).

Verify your export before the retirement date, as you will not be able to recover your
data after this deadline.

<RelatedPages/>

- [Migrate from Aiven for MySQL® to Aiven for PostgreSQL®](/docs/products/mysql/howto/migrate-to-postgresql)
- [Backup and restore Aiven for MySQL® with mysqldump or mydumper](/docs/products/mysql/howto/migrate-database-mysqldump)
- [Service pricing](/docs/platform/concepts/service-pricing)
