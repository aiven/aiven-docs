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
changes affect the service itself: [powering it on or off, or deleting
it](/docs/products/grafana/howto/power-cycle-service), [forking
it](/docs/products/grafana/howto/fork-service), [renaming
it](/docs/products/grafana/howto/rename-service), or [moving it to a different cloud or
region](/docs/products/grafana/howto/change-cloud-region). Configuration changes affect
how the running service behaves: [tags](/docs/products/grafana/howto/tag-service),
[advanced parameters](/docs/products/grafana/reference/advanced-params), [SMTP settings
for outbound email](/docs/products/grafana/howto/send-emails), and the
[plugins](/docs/products/grafana/reference/plugins) available to your dashboards.

Most lifecycle changes trigger a status transition that you can follow from the
service's <ConsoleLabel name="overview"/> page, so look there to confirm a change has
finished before you rely on the service again.

## Before you start

- Backups underpin more than one lifecycle action: forking needs an existing backup on
  the source service, and powering off a service that has no backups permanently loses
  its data once the service is removed.
- Forking and renaming both produce a new service, so integrations, SSO configuration,
  and client connections tied to the original service need to be reattached manually
  afterward.
- For production services, enable termination protection so the service can't be
  deleted by mistake. Use the `--enable-termination-protection` flag with the
  [`avn service update` or `avn service create`
  commands](/docs/tools/cli/service-cli#avn-cli-service-update).

<RelatedPages/>

- [Power on/off and delete your Aiven for Grafana®
  service](/docs/products/grafana/howto/power-cycle-service)
- [Rename your Aiven for Grafana® service](/docs/products/grafana/howto/rename-service)
- [Fork your Aiven for Grafana® service](/docs/products/grafana/howto/fork-service)
