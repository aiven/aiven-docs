---
title: Deploy source code from Git repositories
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

Build and deploy applications using Aiven Applications from source code [in a Git repository](/docs/products/applications) such as GitHub, Bitbucket, or GitLab.

:::note
Aiven Applications is in the
[limited availability](/docs/platform/concepts/beta_services#limited-availability-) stage.
:::

When you connect your Git repository account, commits to the selected branch of your
repository are automatically deployed. You can view the latest deployments on the
application's overview. Public repositories are not automatically deployed, but you
can manually [redeploy them](#redeploy-an-application).

## Prerequisites

- A [Dockerfile](/docs/products/applications/build-from-dockerfile)
  in the root directory of the branch.

## Deploy an application

1. In your project, click **Applications**.
1. Click **Deploy app**.
1. Add your repository as a source by either connecting your Git repository account or
   entering a URL.
   - **Connect your account**: Select **Connect repository account** and choose a
     Git provider. Authorize the connection and select the repository and branch
     to deploy.
   - **Enter a URL**: Select **Public repository URL** and enter the URL for
     a public repository. Select the branch to deploy.
1. Enter a name for your application.
1. (Optional) Add [ports](/docs/products/applications/ports) to expose.
1. Select a **Region** to deploy your application in.
1. Click **Next**.
1. (Optional) Connect existing Aiven services or create new services to connect
   to your application.
1. Click **Next**.
1. (Optional) Add secrets to securely store sensitive information and environment variables
   to pass configuration data to your application. You can edit these later in the settings.
1. Click **Next**.
1. To deploy your application, click **Deploy app**.

## Remove an application

1. In your project, click **Applications**.
1. Select your application.
1. Click <ConsoleLabel name="actions"/> > **Remove app**.
