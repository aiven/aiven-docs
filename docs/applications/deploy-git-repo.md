---
title: Deploy source code from Git repositories
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

Build and deploy applications using Aiven Applications from source code in a Git repository such as GitHub, Bitbucket, or GitLab.

:::note
Aiven Applications is in the
[limited availability](/docs/platform/concepts/service-and-feature-releases#limited-availability-)
stage.
:::

When you connect your Git repository account, commits to the selected branch of your
repository are automatically deployed. You can view the latest deployments on the
application's overview. Public repositories are not automatically deployed, but you
can manually [redeploy them](#redeploy-an-application).

## Prerequisites

- A [Dockerfile](/docs/applications/build-from-dockerfile)
  in the root directory of the branch.

## Deploy an application

1. In your project, click **Applications**.
1. Click **Deploy app**.
1. To add your repository as the source, enter the URL in HTTPS or SSH format.
   - To use SSH, you have to add a deployment key.
1. Enter the name of the branch to deploy.
1. Optional: Change the pre-filled name for your application.
1. Add [ports](/docs/applications/ports) to expose.
1. Select a **Cloud** to deploy your application in.
1. Select a **Plan**.
1. Click **Next**.
1. Optional: To connect an existing Aiven service to your application,
   in **Existing service** select your service.

     :::note
     You can connect Aiven Applications to Aiven for PostgreSQL® and Aiven for Valkey™
     services.
     :::

1. Optional: To create a service and connect it:
   1. Click **Create service** and select a service. The service creation opens in a new
      tab.
   1. Select a cloud and plan, and click **Create service**.
   1. Go back to the tab with the **Connect services** page, and in **Existing service**
      select the service you created.

     :::important
     Wait for service to be running before deploying ???
     :::

1. Click **Next**.
1. Optional: Add secrets to securely store sensitive information
   and environment variables to pass configuration data to your
   application. You can edit these later in the settings.
1. Click **Next**.
1. To deploy your application, click **Deploy app**.

## Redeploy an application

You can build the latest commit to the selected branch by redeploying your application.

1. In your application, click <ConsoleLabel name="actions"/> > **Redeploy app**.
1. To confirm, click **Redeploy app**.

## Remove an application

1. In your project, click **Applications**.
1. Select your application.
1. Click <ConsoleLabel name="actions"/> > **Remove app**.          ???? Delete app?
