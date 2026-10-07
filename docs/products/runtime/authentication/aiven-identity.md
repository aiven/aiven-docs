---
title: Use Aiven Identity for an Aiven Runtime application
sidebar_label: Aiven Identity
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RequirementsPanel from "@site/src/components/RequirementsPanel";

Aiven Identity is an integrated identity management system on Aiven Platform that you can use to restrict access to your Aiven Runtime applications.

When you enable Aiven Identity on an application, only organization users with the
`project:services:read` and `project:services:write`
[permissions](/docs/platform/concepts/permissions) can access the app.

<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`role:project:admin`', '`role:project:manager`', '`project:services:write`', '`service:configuration:write`'],
    },
  ]}
/>

## Add Aiven Identity to an application

1. In the Aiven Console, go to your Runtime application and
   click <ConsoleLabel name="runtimeidp"/>.
1. Click **Add authentication method**.
1. Select **Aiven Identity** and click **Next**.
1. Click **Add**.

## Disable Aiven Identity on an application

You can disable Aiven Identity on your Aiven Runtime application at any time
and enable it again later.

Applications that don't have an authentication method are publicly accessible,
meaning anyone who knows the application URL can access them.

1. In the Aiven Console, go to your Runtime application and
   click <ConsoleLabel name="runtimeidp"/>.
1. Click <ConsoleLabel name="actions"/> > **Disable**.
1. Select **Aiven Identity** and click **Next**.
1. Click **Disable**.

## Remove Aiven Identity from an application

You can remove Aiven Identity from your Aiven Runtime application at any time.
To use Aiven Identity again later, you can add it back to the application.

Applications that don't have an authentication method are publicly accessible,
meaning anyone who knows the application URL can access them.

1. In the Aiven Console, go to your Runtime application and
   click <ConsoleLabel name="runtimeidp"/>.
1. Click <ConsoleLabel name="actions"/> > **Remove**.
1. Select **Aiven Identity** and click **Next**.
1. Click **Remove**.
