---
title: Manage dashboards in Aiven for Grafana®
sidebar_label: Manage dashboards
---

import RelatedPages from "@site/src/components/RelatedPages";

Preview dashboards and manage metric expressions in your Aiven for Grafana® service.

## What dashboard management covers

Dashboard previews and metric expression replacement both work directly against the
Grafana instance for your service rather than through the Aiven Console or Aiven API.
Log in to Grafana at the service URI shown in the Aiven Console to use either feature.

Every change you make to a dashboard, including a bulk string replacement, creates a new
dashboard version. Grafana keeps a configurable number of past versions per dashboard, so
you can revert a change from the dashboard's version history if something goes wrong.

## Before you start

- Dashboard previews are a beta feature, disabled by default. They're not available on
  Hobbyist and Startup-1 plans, and you must disable them before downgrading to one of
  those plans.
- The metric expression replacement tool authenticates with a Grafana API key that has
  the Editor or Admin role, not with your Aiven credentials.
- The number of dashboard versions Grafana keeps for your service is configurable as an
  [advanced parameter](/docs/products/grafana/reference/advanced-params), so you can
  control how far back you're able to revert.

<RelatedPages/>

- [Dashboard preview for Aiven for Grafana®](/docs/products/grafana/howto/dashboard-previews)
- [Replace strings in Grafana® dashboard metric
  expressions](/docs/products/grafana/howto/replace-expression-string)
