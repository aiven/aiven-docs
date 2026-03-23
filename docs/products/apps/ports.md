---
title: Manage ports for Aiven Apps
sidebar_label: Manage ports
limited: true
---

import {ConsoleIcon} from "@site/src/components/ConsoleIcons";

To make your app available on public networks, configure which ports to expose it on.
Public ports allow traffic between your app and clients on the internet such as browsers.

You can configure your app to listen on any port for HTTP/S traffic.
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
