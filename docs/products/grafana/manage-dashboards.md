---
title: Manage dashboards in Aiven for Grafana®
sidebar_label: Manage dashboards
---

import RelatedPages from "@site/src/components/RelatedPages";

Preview dashboards and manage metric expressions in your Aiven for Grafana® service.

## What dashboard management covers

[Dashboard previews](/docs/products/grafana/howto/dashboard-previews) and [metric
expression replacement](/docs/products/grafana/howto/replace-expression-string) both
work directly against the Grafana instance for your service, rather than through the
Aiven Console or the Aiven API.

Every change you make to a dashboard, including a bulk string replacement, creates a
new version that Grafana keeps in the dashboard's history.

## Before you start

- The two features authenticate differently: dashboard previews use your regular Aiven
  Console and Grafana login, while the metric expression replacement tool needs a
  separate Grafana API key with Editor or Admin permissions.
- The number of dashboard versions Grafana keeps for your service is configurable as an
  [advanced parameter](/docs/products/grafana/reference/advanced-params), so you can
  control how far back you're able to revert a change.

<RelatedPages/>

- [Dashboard preview for Aiven for Grafana®](/docs/products/grafana/howto/dashboard-previews)
- [Replace strings in Grafana® dashboard metric
  expressions](/docs/products/grafana/howto/replace-expression-string)
