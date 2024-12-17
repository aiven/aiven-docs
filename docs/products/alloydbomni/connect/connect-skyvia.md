---
title: Connect with Skyvia
early: true
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

Connect to an Aiven for AlloyDB Omni database using the [Skyvia](https://skyvia.com/) cloud data platform.

## Prerequisites

- Aiven for AlloyDB Omni service running
- Active Skyvia account and workspace
- Values of your service's connection parameters identified in the
  [Aiven Console](https://console.aiven.io) >
  the service's <ConsoleLabel name="overview"/> page > **Connection information**

  - Database name
  - Host (server)
  - Port
  - User
  - Password

## Connect to a service

1. Log in to your Skyvia workspace, and click **Create new** > **Connection**.
1. Select **AlloyDB** as a connector.
1. Give the connection a name, for example `MyDatabase`.
1. Set the `MyDatabase` connection parameters using the connection details from the
   [Aiven Console](https://console.aiven.io) > the service's
   <ConsoleLabel name="overview"/> page > **Connection information**.
1. Expand **Advanced Settings** and configure the following:
   - Set **Protocol** to `SSL` and **SSL Mode** to `Require`.
   - For **SSL CA Cert**, paste **CA certificate** from the
     [Aiven Console](https://console.aiven.io/) > the service's
     <ConsoleLabel name="overview"/> page > **Connection information**.
   - Leave **SSL Cert** and **SSL Key** empty.
   - Set **SSL TLS Protocol** to `1.2`.
1. Click **Create Connection**.
