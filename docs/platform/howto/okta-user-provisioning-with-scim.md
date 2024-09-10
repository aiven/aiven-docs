---
title: Configure user provisioning for Okta
sidebar_label: Okta user provisioning
---

You can automate user provisioning with Okta through System for Cross-domain Identity Management (SCIM). This means you can manage your users and their profiles in one place, Okta, and push those changes to the Aiven platform.

Aiven's integration with Okta supports these features:

- **Push new users**: Users created in Okta are automatically created as managed users
  in Aiven.
- **Push profile updates**: User profile updates in Okta are pushed to Aiven. Profiles
  for these users cannot be changed in Aiven.
- **Push user deactivation**: Users that are deactivated or removed in Okta are
  deactivated in Aiven. You can manually delete users in Aiven after they are deactivated.
- **Push groups**: Groups created or updated in Okta are created and updated in Aiven.
- **Sync passwords**: Automatically synchronizes users' Aiven passwords with their
  Okta passwords.

## Prerequisites

- [Add a verified domain to your organization](/docs/platform/howto/manage-domains)
- [Add Okta as an identity provider](/docs/platform/howto/saml/add-okta-idp)

## Configure user provisioning for Okta

1. In Okta, click **Applications** and go to the Aiven application.
1. Click **Provisioning**.
1. Click **Settings** > **Integration** > **Configure API Integration**.
1. Select **Enable API Integration**.
1. In the **API Token field**, paste the **Access token** from the Aiven Console.
1. Click **Test API Credentials** to confirm the connection is working
   and save the configuration.
   :::important
   Don't enable **Import Groups**. Aiven groups that aren't managed by SCIM cannot
   be imported to Okta.
   :::
1. Click **Sign On**.
1. In the **Credentials Details** section, select **Email** as the
   **Application username format**.
1. Click **Save**.

## Troubleshooting

If you have problems setting up the Okta SCIM integration,
contact the [support team](mailto:support@aiven.io).
