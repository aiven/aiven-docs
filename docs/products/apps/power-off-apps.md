---
title: Power off Aiven Runtime applications
sidebar_label: Power off applications
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

You can power an Aiven Runtime application on or off at any time.

Powering off applications doesn't affect the connected services. You can
[power off services](/docs/platform/concepts/service-power-cycle) individually.

Applications that are powered off for more than 180 days are automatically deleted.

## Power off an application

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Open your application.
1. Click <ConsoleLabel name="actions"/> > **Power off app**.

## Power on an application

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Open your application.
1. Click <ConsoleLabel name="actions"/> > **Power on app**.

When the application finishes rebuilding, its status is **Running**.
This process can take a few moments.
