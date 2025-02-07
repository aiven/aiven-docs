---
title: Manage users and access control in Aiven for OpenSearch®
sidebar_label: Manage users and access control
---
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Manage users and permissions in Aiven for OpenSearch by creating Access Control Lists (ACLs) in the Aiven Console.


Use the **Users** tab in the [Aiven Console](https://console.aiven.io) to manage access
control and permissions for your Aiven for OpenSearch service. You can create users,
modify their details, and assign index patterns and permissions.

Alternatively, enable
[OpenSearch Security management](/docs/products/opensearch/howto/enable-opensearch-security)
to manage users and permissions via the OpenSearch Security dashboard.

:::note
ACLs apply only to indices and do not control access to other OpenSearch APIs,
including OpenSearch Dashboards.
:::

## Create a user without access control

To create a service user without access control in Aiven for OpenSearch:

1. Open your Aiven for OpenSearch service in the [Aiven Console](https://console.aiven.io).
1. Click <ConsoleLabel name="serviceusers"/> in the sidebar.
1. Click **Create users**.
1. Enter a username, and click **Save**.

By default, newly created users are granted **full access rights**.
To limit their access, you can enable access control
and specify an Access Control List (ACL) that defines the relevant permissions
and patterns.

## Enable access control

To enable access control for the Aiven for OpenSearch service:

1. Open your Aiven for OpenSearch service in the [Aiven Console](https://console.aiven.io).
1. Click <ConsoleLabel name="serviceusers"/> in the sidebar.
1. Toggle the **Access Control** switch to **Enabled**

## Create a user with access control

To create a service user with access control in Aiven for OpenSearch:

1. Open your Aiven for OpenSearch service in the [Aiven Console](https://console.aiven.io).
1. Click <ConsoleLabel name="serviceusers"/> in the sidebar.
1. Click **Create user**.
1. In the **Create service user** screen, enter a **username**.
1. Specify an **Index pattern** and set the desired **permissions**.
1. To add multiple rules to the user, click **Add another rule**.
1. Click **Save**.

:::note
The password for service users is automatically generated and can be
reset if necessary.
:::

After creating a new service user, log in to the
[OpenSearch Dashboard](/docs/products/opensearch/dashboards) using the assigned
credentials to access and perform actions according to the user’s permissions.

## Manage users

Aiven for OpenSearch provides several additional operations you can perform on
service users.

To access these operations:

1. Open your Aiven for OpenSearch service in the [Aiven Console](https://console.aiven.io).
1. Click <ConsoleLabel name="serviceusers"/> in the sidebar.
1. Click <ConsoleLabel name="actions"/> in the respective user row and
   choose the desired operation:

   - Click <ConsoleLabel name="show password"/> to view the password.
   - Click <ConsoleLabel name="reset password"/> to reset the password.
   - Click <ConsoleLabel name="editaclrules"/> to edit ACL rules.
   - Click <ConsoleLabel name="delete user"/> to delete the user.

:::warning
Deleting a service user immediately terminates all existing database sessions,
and the user loses access.
:::

## Disable access control

Disabling access control for your Aiven for OpenSearch service grants admin access to
all users and overrides any previously defined user
permissions. Carefully consider the outcomes of disabling access control
before proceeding.

To disable access control:

1. Open your Aiven for OpenSearch service in the [Aiven Console](https://console.aiven.io).
1. Click <ConsoleLabel name="serviceusers"/> in the sidebar.
1. Toggle the **Access Control** switch to **Disable**.
1. Click **Disable** to confirm.
