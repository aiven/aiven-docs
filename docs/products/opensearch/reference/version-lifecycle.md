---
title: Aiven for OpenSearch® version lifecycle
sidebar_label: Version lifecycle
---

import EolPolicyMultiVersioned from "@site/static/includes/eol-policy-multi-versioned.md";
import RelatedPages from "@site/src/components/RelatedPages";

Learn how Aiven manages Aiven for OpenSearch® version support, long-term support (LTS) versions, end of life (EOL) dates, and what happens to your service after a version reaches EOL.

## Version numbering

Aiven for OpenSearch identifies major versions in `major.minor` format, for example `2.19`
or `3.6`. Some major versions are designated long-term support (LTS) releases, marked as
such in the
[Aiven for OpenSearch EOL dates](/docs/platform/reference/eol-for-major-versions#aiven-for-opensearch)
table. The exact version your service is running is visible in the
[Aiven Console](https://console.aiven.io/).

<EolPolicyMultiVersioned exception={<>

:::note[Exception]
Aiven for OpenSearch® powered-off services are not deleted after their version EOL.
They're upgraded and start running the new version when powered on.
:::

</>}/>

## Version EOL dates

For EOL dates and service creation windows for Aiven for OpenSearch versions, see the
[Aiven for OpenSearch EOL dates](/docs/platform/reference/eol-for-major-versions#aiven-for-opensearch)
in the Aiven service and tool version lifecycle reference.

<RelatedPages/>

- [Aiven service and tool version lifecycle](/docs/platform/reference/eol-for-major-versions)
- [Upgrade Aiven for OpenSearch®](/docs/products/opensearch/howto/os-version-upgrade)
- [Service forking](/docs/platform/concepts/service-forking)
- [Maintenance window](/docs/platform/concepts/maintenance-window)
