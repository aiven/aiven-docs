---
title: Manage secrets and environment variables for Aiven Apps
sidebar_label: Manage secrets and variables
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

Environment variables and secrets let you configure your application at runtime instead of embedding settings and sensitive information into your code. You can use them to pass information like API keys and database connection details to the application. This keeps sensitive data safe and makes it easy to adjust how your app behaves in different setups.

When you edit secrets and environment variables, Aiven
redeploys your app with the new configuration. It deploys the same commit
from your git branch that was deployed previously. To deploy the latest commit,
you can manually [redeploy your app](/docs/products/apps/deploy-apps#redeploy-an-app).

1. In your project, click <ConsoleLabel name="applications"/>.
1. Open your application.
1. On the **Overview** page, go to **Environment variables**.
1. Click **Edit**.
1. To add a secret, on the **Secrets** tab, click **Add secret**.
   To add an environment variable, on the **Variables** tab, click **Add variable**.
1. Click **Save**.
