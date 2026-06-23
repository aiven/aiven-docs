---
title: Aiven for ClickHouse® version support policy
sidebar_label: Version support policy
---

import RelatedPages from "@site/src/components/RelatedPages";

Aiven for ClickHouse® follows the upstream ClickHouse long-term support, or LTS, release model.
This helps you use stable, supported versions and plan upgrades before versions
reach end of life.

Aiven for ClickHouse versions move through defined lifecycle stages, from
availability to end of life. Each stage determines whether you can create new
services, receive security updates, or need to plan an upgrade.

## Upstream LTS releases

Upstream ClickHouse typically releases two LTS versions each year, one in March
and one in August. The March release uses the `.3` prefix, and the August
release uses the `.8` prefix.

Upstream LTS versions receive security updates for 12 months.

## Lifecycle stages

Each Aiven for ClickHouse LTS version moves through the following stages:

- **Limited Availability (LA):** The version is available for selected early
  testing. LA versions are not publicly announced.
- **Early Availability (EA):** The version is stable and available to all customers.
  Some settings, features, and UI elements might still change.
- **General Availability (GA):** The version is stable and fully available.
- **End of Availability (EOA):** You can no longer create new services with the
  version. Aiven doesn't guarantee security updates after EOA. EOA starts 3
  months before End of Life.
- **End of Life (EOL):** Aiven removes the version from support and
  automatically upgrades existing services to the next supported version.

## Support policy

Aiven supports two active generally available LTS versions at a time.

New LTS versions become available on Aiven:

- As EA approximately three months after the upstream release.
- As GA approximately four months after the upstream release.

Aiven announces new EA and GA versions in the
[Aiven changelog](https://aiven.io/changelog?services=ClickHouse%2CClickHouse%25C2%25AE).

When a new version becomes available, new service creation stops for the oldest
supported version, and that version enters EOA. EOL follows 3 months later. After
EOL, Aiven automatically upgrades services running that version to the next
supported version.

## Security updates

Aiven provides security updates for LTS versions until their EOA date. After EOA,
Aiven doesn't guarantee security updates.

Aiven delivers security updates as maintenance updates that you can apply during
the [maintenance window](/docs/platform/concepts/maintenance-window). If you
don't apply a patch for a critical vulnerability within 14 days, Aiven applies
it automatically.

## Version lifecycle dates

For End of Availability, End of Life, and new service creation dates for
supported Aiven for ClickHouse versions, see the
[Aiven for ClickHouse EOL dates](/docs/platform/reference/eol-for-major-versions#aiven-for-clickhouse)
in the Aiven service and tool version lifecycle reference.

<RelatedPages/>

- [Aiven for ClickHouse EOL dates](/docs/platform/reference/eol-for-major-versions#aiven-for-clickhouse)
- [Service and feature releases](/docs/platform/concepts/service-and-feature-releases)
- [Maintenance window](/docs/platform/concepts/maintenance-window)
- [Fork an Aiven service](/docs/platform/concepts/service-forking)
