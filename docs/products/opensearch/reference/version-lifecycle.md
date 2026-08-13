---
title: Aiven for OpenSearch® version lifecycle
sidebar_label: Version lifecycle
---

import EolPolicyMultiVersioned from "@site/static/includes/eol-policy-multi-versioned.md";
import RelatedPages from "@site/src/components/RelatedPages";

Learn how Aiven manages Aiven for OpenSearch® version support, end of life (EOL) dates, and what happens to your service after a version reaches EOL.

<EolPolicyMultiVersioned poweredOffOutcome={<>it's upgraded and starts running the new version when powered on.</>}/>

## Version EOL dates

Aiven for OpenSearch® is the open source continuation of the original Elasticsearch
service. The EOL for Aiven for OpenSearch® is generally dependent on the upstream
project. Some major versions are designated long-term support (LTS) releases, marked
as such in the following table.

| Version    | Aiven EOL    | After EOL                                | Service creation supported until | Service creation supported from |
| ---------- | ------------ | ---------------------------------------- | -------------------------------- | ------------------------------- |
| 1.3.x      | 2026-07-26   | Automatic upgrade to 2.19                | 2026-07-26                       | 2022-05-19                      |
| 2.17.x     | 2026-07-26   | Automatic upgrade to 2.19                | 2026-07-26                       | 2024-10-15                      |
| 2.19.x LTS | Date not set | Automatic upgrade to a supported version | Date not set                     | 2025-09-15                      |
| 3.3.x      | 2027-02-01   | Automatic upgrade to a supported version | 2027-02-01                       | 2026-01-20                      |
| 3.6.x LTS  | Date not set | Automatic upgrade to a supported version | Date not set                     | 2026-06-23                      |

<RelatedPages/>

- [Upgrade Aiven for OpenSearch®](/docs/products/opensearch/howto/os-version-upgrade)
- [Service forking](/docs/platform/concepts/service-forking)
- [Maintenance window](/docs/platform/concepts/maintenance-window)
