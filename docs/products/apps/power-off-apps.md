---
title: Power off Aiven Runtime
sidebar_label: Power off apps
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

You can power an Aiven Runtime application on or off at any time.

Powering off apps doesn't affect the connected services. You can
[power off services](/docs/platform/concepts/service-power-cycle) individually.

Apps that are powered off for more than 180 days are automatically deleted.

## Power off an app

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Open your app.
1. Click <ConsoleLabel name="actions"/> > **Power off app**.

## Power on an app

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Open your app.
1. Click <ConsoleLabel name="actions"/> > **Power on app**.

When the app finishes rebuilding, its status is **Running**.
This process may take a few moments.
