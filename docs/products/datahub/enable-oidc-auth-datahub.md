---
title: Enable OIDC authentication for Aiven for DataHub
sidebar_label: Enable OIDC authentication
limited: true
---

import RelatedPages from "@site/src/components/RelatedPages";

Use OpenID Connect (OIDC) to configure single sign-on (SSO) to your DataHub service with your identity provider.

You can use any OIDC compliant provider such as Auth0, Okta, Google Identity, or Azure AD. When OIDC is enabled, all users are redirected to SSO login by default.

## Prerequisites

- **An application created in your identity provider**: Follow the
  [DataHub OIDC prerequisites guide](https://docs.datahub.com/docs/authentication/guides/sso/initialize-oidc) to create and register a Google Identity, Okta Identity, or
  Azure AD application.
  - To get the domain of your DataHub service for the redirect URIs, open the Aiven App
    that ends in `-frontend` and copy the **Application URL**.
- **The client ID, client secret, and discovery URI for your OIDC provider**: The
  [DataHub OIDC prerequisites guide](https://docs.datahub.com/docs/authentication/guides/sso/initialize-oidc)
  has instructions for getting these values from Azure AD, Google Identity, and Okta.
- **Your DataHub service URL**: To get the URL, in the **Connection information**
  copy the **Application URL**.

## Enable OIDC authentication

1. In your DataHub service, go to the **Dependent services** section.
1. Open the Aiven App that ends in `-frontend`.
1. In the **Environment variables** section, click **Edit**.
1. On the **Secrets** tab, add a secret.
   For the **Key** enter `AUTH_OIDC_CLIENT_SECRET` and for the **Value**
   enter your client secret.
1. On the **Variables** tab, add the following variables:

   | Key | Value |
   |-----|-------|
   | `AUTH_OIDC_ENABLED` | `true` |
   | `AUTH_OIDC_CLIENT_ID` | Your client ID. |
   | `AUTH_OIDC_DISCOVERY_URI` | Your discovery URI. |
   | `AUTH_OIDC_BASE_URL` | Your DataHub service URL. |

After adding the secrets, wait for the frontend container to redeploy before using the application.

To log in using username and password instead, add `/login` to the end of the DataHub application URL.

<RelatedPages/>
- [DataHub guide on configuring OIDC Authentication](https://docs.datahub.com/docs/authentication/guides/sso/configure-oidc-react)
