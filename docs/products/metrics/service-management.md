---
title: Service management for Aiven for Metrics
sidebar_label: Service management
---

import RelatedPages from "@site/src/components/RelatedPages";

Manage the lifecycle of your Aiven for Metrics service, including power state, tags,
and cloud region.

## What each lifecycle action actually affects

Aiven for Metrics stores your historical metrics in object storage rather than on the
service's local disks. [Powering the service
off](/docs/products/metrics/howto/power-cycle-service) doesn't put that data at risk the
way it can for services that rely on local storage for persistence. [Changing the cloud
or region](/docs/products/metrics/howto/change-cloud-region) migrates the service in the
background without downtime. [Tagging the
service](/docs/products/metrics/howto/tag-service) is the only one of the three that
doesn't affect the running service at all: It only adds metadata for organizing
services and tracking ownership and cost.

Before deleting a service, consider enabling termination protection using the
`--enable-termination-protection` flag with [the `avn service update`
command](/docs/tools/cli/service-cli#avn-cli-service-update), so the service can't be
removed by accident.

<RelatedPages/>

- [Power on/off and delete your Aiven for Metrics
  service](/docs/products/metrics/howto/power-cycle-service)
- [Tag your Aiven for Metrics service](/docs/products/metrics/howto/tag-service)
- [Change the cloud or region for your Aiven for Metrics
  service](/docs/products/metrics/howto/change-cloud-region)
