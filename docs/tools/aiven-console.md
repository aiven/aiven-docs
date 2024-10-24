---
title: Aiven Console overview
sidebar_label: Aiven Console
---

In the [Aiven Console](https://console.aiven.io) you can create and manage Aiven services, update your user profile, manage settings across organizations and projects, set up billing groups, view invoices, and more.


## User profile

To view your personal information, authentication settings, and
organizations you belong to, click the label **User information** profile icon
in the top right. The user profile is also the place where you can
enable
[feature previews](/docs/platform/howto/feature-preview) to test upcoming features and get referral links.

### Name and email

You can
[update your name and other personal details](/docs/platform/howto/edit-user-profile) in your user profile.

:::note
You cannot edit your email address. Instead, you can
[migrate your Aiven resources to another email address](/docs/platform/howto/change-your-email-address) within specific projects.
:::

### User authentication

On the **Authentication methods** tab of the **User profile**, you can
manage your password and authentication settings, including:

-   [Adding authentication methods](/docs/platform/howto/add-authentication-method)
-   [Managing two-factor authentication](/docs/platform/howto/user-2fa)

### Tokens

On the **Tokens** page, you can generate or revoke
[personal tokens](/docs/platform/concepts/authentication-tokens).

## Organization and organizational unit settings {#orgs-units-settings}

The
[organization or organizational unit](/docs/platform/concepts/orgs-units-projects)
that you are currently working with is displayed at the top
of the page. You can switch to another organization or organizational
unit by clicking the name to open the drop-down menu.

If you don't have an organization, click **Create organization** to
[create your first organization](/docs/tools/aiven-console/howto/create-orgs-and-units).

:::note
We strongly recommend creating an organization. It makes managing your
projects much easier and comes with many additional features, such as
groups, billing groups, and SAML authentication.
:::

Organization and organizational unit settings are available on the
**Admin** page where you can:
-   [Manage your groups](/docs/platform/howto/manage-groups)
-   Create new projects under an organization or organizational unit
-   Configure
    [authentication policies for an organization](/docs/platform/howto/set-authentication-policies)
-   View logs of activity such as the adding or removing of users,
    changing authentication methods, and more
-   Rename or delete an organization or organizational unit

## Projects and services

To navigate between different projects or view all projects click the
**Projects** drop-down menu. This menu shows only the projects within
the organization or organizational unit that you are currently working
in. Selecting a project opens the **Services** page with a list of all
services in that project. You can view the status of the services
and
[create new services](/docs/platform/howto/create_new_service).

On the **Services** page you can also access the
[integration endpoints](/docs/platform/concepts/service-integration), VPCs, project logs,
project permissions, and project settings.

## Billing groups

Billing groups let you use billing details across multiple projects and
generate a consolidated invoice. Click **Billing** to see and
[manage your billing groups](/docs/platform/howto/use-billing-groups) and
[payment cards](/docs/platform/howto/manage-payment-card).
