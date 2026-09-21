---
title: Manage ports for Aiven Runtime
sidebar_label: Manage ports
---

import {ConsoleIcon} from "@site/src/components/ConsoleIcons";
import ConsoleLabel from "@site/src/components/ConsoleIcons"

To make your application available on public networks, you can configure ports where the container listens for HTTP traffic.
Public ports allow traffic between your application and clients on the internet
such as browsers. The public endpoint is always HTTPS on port 443. Aiven terminates
TLS and forwards traffic to your configured container port as HTTP.

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

Ports configured in Aiven Runtime use the HTTP protocol only. gRPC, HTTP/2, and
TCP are not supported.

The domain name for your application is in the
**Connection information** section for the application.

Contact Aiven support if your use case requires a different protocol.

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
