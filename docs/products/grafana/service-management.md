---
title: Service management for Aiven for Grafana®
sidebar_label: Service management
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Manage the lifecycle of your Aiven for Grafana® service, including power state,
naming, tags, forks, cloud region, email sending, plugins, and advanced parameters.

## Lifecycle changes and ongoing configuration

Service management for Aiven for Grafana® covers two kinds of changes. Lifecycle
changes affect the service itself: powering it on or off, deleting it, forking it,
renaming it, or moving it to a different cloud or region. Configuration changes affect
how the running service behaves: tags, advanced parameters, SMTP settings for outbound
email, and the plugins available to your dashboards.

Most lifecycle changes trigger a status transition that you can follow from the service
<ConsoleLabel name="overview"/> page. For example, a fork moves through **Rebuilding**
before it reaches **Running**, and a cloud or region migration keeps the service
available while it moves to its new location.

## Before you start

- You can't rename a service directly. Fork it under the new name, then delete the
  original service.
- Forking requires at least one existing backup on the source service. Service
  integrations aren't copied to the fork, and cross-project forking works only within
  the same organization.
- Aiven automatically deletes a service that's been powered off for more than 180 days.
  [Static IP addresses](/docs/platform/concepts/static-ips) keep generating costs after
  a power-off or deletion until you remove them.
- For production services, enable termination protection so the service can't be
  deleted by mistake. Use the `--enable-termination-protection` flag with the
  [`avn service update` or `avn service create`
  commands](/docs/tools/cli/service-cli#avn-cli-service-update).

<RelatedPages/>

- [Power on/off and delete your Aiven for Grafana®
  service](/docs/products/grafana/howto/power-cycle-service)
- [Rename your Aiven for Grafana® service](/docs/products/grafana/howto/rename-service)
- [Tag your Aiven for Grafana® service](/docs/products/grafana/howto/tag-service)
- [Fork your Aiven for Grafana® service](/docs/products/grafana/howto/fork-service)
- [Change the cloud or region for your Aiven for Grafana®
  service](/docs/products/grafana/howto/change-cloud-region)
- [Advanced parameters for Aiven for
  Grafana®](/docs/products/grafana/reference/advanced-params)
- [Send emails from Aiven for Grafana®](/docs/products/grafana/howto/send-emails)
- [Plugins for Aiven for Grafana®](/docs/products/grafana/reference/plugins)
