---
title: Ports
limited: true
---


import {ConsoleIcon} from "@site/src/components/ConsoleIcons"

To make your application available on public networks, configure which ports to expose it on. Public ports allow traffic between your application and clients on the internet such as browsers.

:::note
Aiven Applications is in the
[limited availability](/docs/platform/concepts/service-and-feature-releases#limited-availability-)
stage.
:::

You can configure your application to listen on any port for HTTP/S traffic. The default
port for web services is 8080. Other common ports for web services are 80, 443,
3000, and 8000.

Aiven binds each port to its own DNS name and exposes your HTTP ports publicly on ports
80 and 443. Port 80 traffic is redirected to HTTPS port 443. The domain name for your
application is in the **Connection information** section for the application.

You have to add ports to your application for it be accessible, even if you use the
the `EXPOSE` command in your Dockerfile.

## Add ports to an application

To expose ports for an existing application:

1. In your project, click **Applications**.
1. Select your application.
1. In the **Connection information** section, click **Edit ports**.
1. Click <ConsoleIcon name="add"/> **Add port**.
1. Enter a name and port number, and select a protocol.
1. Click **Save**.

## Change or remove exposed ports

1. In your project, click **Applications**.
1. Select your application.
1. In the **Connection information** section, click **Edit ports**.
1. Edit the ports. To delete a port, click <ConsoleIcon name="delete"/>.
1. Click **Save**.
