---
title: Manage Aiven Identity for an Aiven Runtime Application
sidebar_label: Manage Aiven Identity
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RequirementsPanel from "@site/src/components/RequirementsPanel";

You can disable or remove Aiven Identity from your Aiven Runtime application at any time.

Applications that don't have an authentication method are publicly accessible,
meaning anyone who knows the application URL can access them.




<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`role:project:admin`', '`role:project:manager`', '`project:services:write`', '`service:configuration:write`'],
    },
  ]}
/>

1. In the Aiven Console, go to your Runtime application and
   click <ConsoleLabel name="runtimeidp"/>.
1. Click **Aiven Identity**.
1. Select **OpenID Connect (OIDC)** and click **Next**.
1. Click **Add**.
