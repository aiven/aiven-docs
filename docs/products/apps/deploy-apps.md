---
title: Deploy an app
limited: true
---

import {ConsoleIcon} from "@site/src/components/ConsoleIcons";
import ConsoleLabel from "@site/src/components/ConsoleIcons"

Build and deploy applications using Aiven Applications from source code in a GitHub repository.

You must be an Aiven [organization admin](/docs/platform/concepts/permissions)
to connect your GitHub account. On GitHub, you must be
an [organization owner](https://docs.github.com/en/organizations/managing-peoples-access-to-your-organization-with-roles/roles-in-an-organization#organization-owners).
You can also connect a personal GitHub account.

:::note
When you connect a GitHub account to your Aiven organization, all users in that
organization can select that account in Aiven Apps.
:::

## Deploy an app

1. In the Aiven Console, go to your project and click **Applications**.
1. Click **Deploy app**.
1. Connect your **GitHub account**.
1. Select your **Account**, **Repository** and **Branch**.
1. Click **Next**.
1. Select your manifest file and click **Scan**. Aiven will automatically detect
   what applications and services are needed.
1. To change the configuration of an app, click <ConsoleIcon name="edit"/>.
   To change the configuration of a service integration, click
   <ConsoleLabel name="editappintegrationconfig"/>.
1. To deploy the apps and create the services, click **Deploy**.

## Redeploy an app

1. In the Aiven Console, go to your project and click **Applications**.
1. Open your app.
1. On the **Overview** page, click <ConsoleIcon name="actions"/> > <ConsoleLabel name="redeployapp"/ >.
