---
title: Manage users and access control in Aiven for OpenSearch®
---
import ConsoleLabel from "@site/src/components/ConsoleIcons"

Effective access control and permissions management are crucial for
Aiven for OpenSearch service users. In Aiven for OpenSearch, you can
manage users and permissions by creating Access Control Lists (ACLs)
through the Aiven Console.

By using the **Users** tab in the [Aiven
Console](https://console.aiven.io) for your Aiven for OpenSearch
service, you can manage access control and permissions for your service
users. You can create new users, modify their details, and assign index
patterns and permissions for each user.

Alternatively, you can enable
[OpenSearch Security management](/docs/products/opensearch/howto/enable-opensearch-security) for your Aiven for OpenSearch service and manage users and
permissions via the OpenSearch Security dashboard.

:::note
ACLs apply only to indices and do not control access to other OpenSearch APIs,
including OpenSearch Dashboards.
:::

## Create a user without access control

To create a service new user without any access control in Aiven
Console:

1.  In the [Aiven Console](https://console.aiven.io), open the Aiven for OpenSearch
    service to add a user.
1.  Click **Users** from the left sidebar.
1.  Click **Create users**, enter a username, and click **Save**.

By default, newly created users are granted **full access rights**.
However, to limit their access, you can enable access control and
specify an Access Control List (ACL) for them, defining the relevant
permissions and patterns.

## Enable access control

To enable access control for the Aiven for OpenSearch service through
the [Aiven Console](https://console.aiven.io), go to the **Users**
tab and toggle the **Access Control** switch to enable it.

## Create a user with access control

To create a service new user with access control:

1.  In your Aiven for OpenSearch service, click **Users** from the left
    sidebar.
1.  Click **Create user**.
1.  In the **Create service user** screen, enter a **username**.
1.  Specify an **Index pattern** and set the desired **permissions**.
1.  To add multiple rules to the user,click **Add another rule**.
1.  Click **Save**.

:::note
The password for service users is automatically generated and can be
reset if necessary.
:::

After creating a new service user, log in to the
[OpenSearch Dashboard](/docs/products/opensearch/dashboards) with the assigned
credentials. This grants access to the dashboard, where they can perform actions
based on their permissions.

## Manage users

Aiven for OpenSearch provides several additional operations you can perform on
service users.

To access these operations:

1. In your Aiven for OpenSearch service, click **Users** from the left sidebar.
1. Click <ConsoleLabel name="actions"/> in the respective user row and
   choose the desired operation:

   - Click <ConsoleLabel name="show password"/> to view the password.
   - Click <ConsoleLabel name="reset password"/> to reset the password.
   - Click <ConsoleLabel name="reset password"/> to reset the password.
   - Click <ConsoleLabel name="delete user"/> to delete the user.

:::warning
Deleting a service user terminates all existing database sessions, and the user
loses access immediately.
:::

## Disable access control

Disabling access control for your Aiven for OpenSearch service grants admin access to
all users and overrides any previously defined user
permissions. Carefully consider the outcomes of disabling access control
before proceeding.

To disable access control:

1.  In the **Users** tab, toggle the **Access Control** switch off.
1.  Click **Disable** to confirm.
