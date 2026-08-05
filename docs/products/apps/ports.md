---
title: Manage ports for Aiven Runtime
sidebar_label: Manage ports
limited: true
---

import {ConsoleIcon} from "@site/src/components/ConsoleIcons";
import ConsoleLabel from "@site/src/components/ConsoleIcons"

To make your application available on public networks, you can configure it to listen on ports for HTTP/S traffic.
Public ports allow traffic between your application and clients on the internet such as browsers.
You cannot use the following TCP destination ports for outbound
connections from your application:

- 23
- 25
- 119
- 135
- 137
- 138
- 139
- 179
- 445
- 465
- 631

The domain name for your application is in the **Connection information**
section for the application.

## Add ports to an application

To expose ports for an existing application:

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Open your application.
1. In the **Connection information** section, click **Edit ports**.
1. Click **Add port**.
1. Enter port number and name.
1. Click **Save**.

## Change or remove exposed ports

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Open your application.
1. In the **Connection information** section, click **Edit ports**.
1. Edit the ports. To delete a port, click <ConsoleIcon name="delete"/>.
1. Click **Save**.
