---
title: Rotate Aiven for DataHub secrets
sidebar_label: Rotate secrets
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

Rotate your Aiven for DataHub authentication and token secrets to maintain security and prevent unauthorized access.

When you rotate authentication secrets, all logged-in users are signed out
and all DataHub resource services restart simultaneously.
Inter-service calls may briefly return `401 Unauthorized` errors during the restart window.

When you rotate token secrets, every previously issued API access token
stops working permanently. This includes personal access tokens and service tokens.
Every DataHub application service restarts simultaneously.
Browser sessions are not affected, so logged-in users stay logged in.

## Rotate secrets

1. In your DataHub service, click <ConsoleLabel name="servicesettings"/>.
1. In the **Secret rotations** section, click **Rotate**
   for the authentication secrets or token secrets.
1. Click **Rotate now**.
