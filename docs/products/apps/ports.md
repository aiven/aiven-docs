---
title: Manage ports for Aiven Apps
sidebar_label: Manage ports
limited: true
---

import {ConsoleIcon} from "@site/src/components/ConsoleIcons";

To make your app available on public networks, you can configure it to listen on ports for HTTP/S traffic.
Public ports allow traffic between your app and clients on the internet such as browsers.
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

The domain name for your app is in the **Connection information**
section for the app.

## Add ports to an app

To expose ports for an existing app:

1. In your project, click **Applications**.
1. Open your app.
1. In the **Connection information** section, click **Edit ports**.
1. Click **Add port**.
1. Enter a name and port number, and select a protocol.
1. Click **Save**.

## Change or remove exposed ports

1. In your project, click **Applications**.
1. Open your app.
1. In the **Connection information** section, click **Edit ports**.
1. Edit the ports. To delete a port, click <ConsoleIcon name="delete"/>.
1. Click **Save**.
