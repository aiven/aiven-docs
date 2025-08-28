---
title: Get started
limited: true
---

Get started using Aiven Applications by building and deploying a sample application and connecting it to an Aiven for PostgreSQL® service.

The following example is a recipe library

:::note
Aiven Applications is in the
[limited availability](/docs/platform/concepts/service-and-feature-releases#limited-availability-)
stage.
:::

## Prerequisites

- [Sign up for Aiven](https://console.aiven.io/signup) for free.
- Fork the [sample repository](https://github.com/Aiven-Labs/nextjs-netlify).

## Deploy the recipe application

To deploy the application in this example, you first create a ???? service to....

1. In your project, click **Services**.
1. Click **Create service**.
1. Select                                                ??????
1. Enter a name, and select a cloud and plan.
1. Click **Create service**.
1. Click **Applications**.
1. Click **Deploy app**.
1. In the forked repository in GitHub, click **Code**.
1. Select **HTTPS** and and copy the URL.
1. In the Aiven Console, paste the URL into the **Source URL** field.
1. Optional: Enter a name for your application.
1. In the **Port number** field enter 3000.                                   ??????
1. Select a **Cloud** and **Plan**.
1. Click **Next**.
1. Select the ???? service you created to connect it to the application.
1. Click **Next**.
1. On the secrets and variables step click **Deploy**.
1. When the application and connected service status are **Running**, click the
   **Application URI** to see your app.

## Next steps

- [Deploy your own source code](/docs/applications/deploy-git-repo)
  from a public or private Git repository.
- Collaborate by
  [granting users and groups permissions](/docs/platform/howto/manage-permissions)
  to your project.
