---
title: Variables and secrets
limited: true
---


import ConsoleLabel from "@site/src/components/ConsoleIcons"

Environment variables and secrets let you configure your application at runtime instead of embedding settings and sensitive information into your code. You can use them to pass information like API keys and database connection details to the application. This keeps sensitive data safe and makes it easy to adjust how your app behaves in different setups.

:::note
Aiven Applications is in the
[limited availability](/docs/platform/concepts/beta_services#limited-availability-) stage.
:::

Usually variables set in the application in Aiven are used in the deployment
instead of any variables stored in .env files in your repository.

## Variables

Use variables to pass information like database connection details and
environment settings for your applications.

When you connect an Aiven service to your application, environment variables for each
service are automatically added to the application.

### Add variables

1. In your project, click **Applications**.
1. Select your application.
1. In the **Variables and secrets** section:
   1. If your application doesn't have secrets or variables, click **Add variables**.
   1. If your application has secrets or variables,
      click <ConsoleLabel name="Actions"/> > **Edit variables**.
1. Enter the key and value for the variable.
1. Click **Save**.

### Edit variables

1. In your project, click **Applications**.
1. Select your application.
1. In the **Variables and secrets** section,
   click <ConsoleLabel name="Actions"/> > **Edit variables**.
1. Enter the key and value for the variable.
1. Click **Save**.

## Secrets

Use secrets to securely store sensitive data like access tokens and API keys. Secrets
are encrypted.

### Add secrets

1. In your project, click **Applications**.
1. Select your application.
1. In the **Variables and secrets** section:
   1. If your application doesn't have secrets or variables, click **Add secrets**.
   1. If your application has secrets or variables,
      click <ConsoleLabel name="Actions"/> > **Edit secrets**.
1. Enter the key and value for the secret.
1. Click **Save**.

### Edit secrets

1. In your project, click **Applications**.
1. Select your application.
1. In the **Variables and secrets** section,
   click <ConsoleLabel name="Actions"/> > **Edit secrets**.
1. Enter the key and value for the secret.
1. Click **Save**.
