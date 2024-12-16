---
title: Create service users
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Service users are users that only exist in the scope of the corresponding Aiven service.
They are unique to this service and not shared with any other services,
and can be granted restricted permissions compared to the default `avnadmin`
user.

You can add service users for all the Aiven services except Aiven for Apache Flink®
and Aiven for Grafana®.

:::note
By default, the maximum amount of users allowed on a service is 50.

To increase the maximum number of users allowed for a service,
[create a support ticket](/docs/platform/howto/support) to request an increase.
:::

## Create a service user

1.  Log in to [Aiven Console](https://console.aiven.io/).
1.  On the **Services** page, select your service.
1.  From the sidebar, click <ConsoleLabel name="serviceusers"/>.
1.  Click **Add service user** or **Create user**.
1.  Enter a name for your service user.
1.  Set up all the other configuration options. If a password is required,
    a random password is generated automatically. You can modify it later.
1.  Click **Add service user**.
<!-- vale off -->
## Related pages

- [Create a service user using the Aiven CLI](/docs/tools/cli/service/user#avn-service-user-create)
