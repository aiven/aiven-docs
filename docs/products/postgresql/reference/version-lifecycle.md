---
title: Aiven for PostgreSQL® version lifecycle
sidebar_label: Version lifecycle
---

import EolPolicyMultiVersioned from "@site/static/includes/eol-policy-multi-versioned.md";
import RelatedPages from "@site/src/components/RelatedPages";

Learn how Aiven manages Aiven for PostgreSQL® version support, end of life (EOL) dates, and what happens to your service after a version reaches EOL.

## Version numbering

Aiven for PostgreSQL identifies major versions with a single number, for example `16` or
`17`. Aiven for PostgreSQL major versions reach EOL on the same date as the upstream
PostgreSQL project's EOL. The exact version your service is running is visible in the
[Aiven Console](https://console.aiven.io/).

<EolPolicyMultiVersioned/>

## Version EOL dates

For EOL dates and service creation windows for Aiven for PostgreSQL versions, see the
[Aiven for PostgreSQL EOL dates](/docs/platform/reference/eol-for-major-versions#aiven-for-postgresql)
in the Aiven service and tool version lifecycle reference.

<RelatedPages/>

- [Aiven service and tool version lifecycle](/docs/platform/reference/eol-for-major-versions)
- [Perform a PostgreSQL® major version upgrade](/docs/products/postgresql/howto/upgrade)
- [Service forking](/docs/platform/concepts/service-forking)
- [Maintenance window](/docs/platform/concepts/maintenance-window)
