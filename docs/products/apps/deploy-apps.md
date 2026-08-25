---
title: Deploy an application
limited: true
---

import {ConsoleIcon} from "@site/src/components/ConsoleIcons";
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Build and deploy applications using Aiven Runtime from source code in a GitHub repository.

You must be an Aiven [organization admin](/docs/platform/concepts/permissions)
to connect your GitHub account. On GitHub, you must be
an [organization owner](https://docs.github.com/en/organizations/managing-peoples-access-to-your-organization-with-roles/roles-in-an-organization#organization-owners).
You can also connect a personal GitHub account.

:::note
When you connect a GitHub account to your Aiven organization, all users in that
organization can select that account in Aiven Runtime.
:::

## Deploy an application

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Click **Deploy application**.
1. Connect your **GitHub account**.
1. Select your **Account**, **Repository**, and **Branch**.
1. Click **Next**.
1. Select your manifest file and click **Scan**. Aiven Runtime automatically detects
   what applications and services are needed.
1. To change the configuration of an application, click <ConsoleIcon name="edit"/>.
   To change the configuration of a service integration, click
   <ConsoleLabel name="editappintegrationconfig"/>.
1. To deploy the application and create the services, click **Deploy**.

## Redeploy an application

When you redeploy an application, Aiven deploys the latest commit from
the selected branch.

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Open your application.
1. On the **Overview** page, click <ConsoleLabel name="actions"/> > <ConsoleLabel name="redeployapp"/>.
