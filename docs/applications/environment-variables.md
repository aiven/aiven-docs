---
title: Environment variables
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

Environment variables let you configure your application at runtime instead of embedding settings and sensitive information into your code. You can use them to pass information like API keys and database connection details to the application.

:::note
Aiven Applications is in the
[limited availability](/docs/platform/concepts/service-and-feature-releases#limited-availability-)
stage.
:::

Usually variables set in the application in Aiven are used in the deployment
instead of any variables stored in .env files in your repository.
When you connect Aiven services to your application, environment variables for
each service are automatically added to the application.

Use secrets to securely store sensitive data like access tokens and API keys. Secrets
are encrypted and by default are hidden in the Console.

## Add environment variables

1. In your project, click **Applications**.
1. Select your application.
1. In the **Environment variables** section, click **Edit**.
1. Select **Secrets** or **Variables**.
1. Click **Add secret** or **Add variable**.
1. Enter the key and value.
1. Click **Save**.

## Edit environment variables

1. In your project, click **Applications**.
1. Select your application.
1. In the **Environment variables** section, click **Edit**.
1. Select **Secrets** or **Variables**.
1. Edit or delete the secrets or variables.
1. Click **Save**.
