---
title: Create service users
---

Service users are users that only exist in the scope of the
corresponding Aiven service. They are unique to this service and not
shared with any other services, and can be granted restricted
permissions compared to the default `avnadmin` user. You can add service
users for all the Aiven services, with the exception of Aiven for Apache
Flink® and Aiven for Grafana®.

:::warning
By default, the maximum amount of users allowed on a service is 50.

To increase the maximum number of users allowed for a service,
[create a support ticket](/docs/platform/howto/support) to request an increase.
:::

## Create a service user

1.  Log in to [Aiven Console](https://console.aiven.io/).
1.  On the **Services** page, select your service.
1.  On the **Overview** page of your service, select **Users** from the
    sidebar.
1.  In the **Users** page, select **Add service user**.
1.  In the **Create a service user** window
    1.  Enter a name for your service user.

        If a password is required, a new random password will be
        generated automatically. This can be modified later.

    1.  Set up all the other configuration options (such as
        authentication, roles, or replication), and select **Add service
        user**.

A popup alert displays the result of the operation informing about the
creation of your new user.

## Related pages

- [Create a service user using the Aiven CLI](/docs/tools/cli/service/user#avn-service-user-create)
