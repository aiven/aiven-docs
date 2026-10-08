---
title: Add Google Cloud as an identity provider to an Aiven Runtime application
sidebar_label: Add Google Cloud
---

import Permissions from "@site/static/includes/oidc-idp-apps-permissions.md";
import OpenAuthentication from "@site/static/includes/oidc-idp-apps-aiven-open.md";
import AddAuthentication from "@site/static/includes/oidc-idp-apps-aiven-add.md";
import SelectOidc from "@site/static/includes/oidc-idp-apps-aiven-select.md";
import EnterName from "@site/static/includes/oidc-idp-apps-aiven-name.md";
import EnterCredentials from "@site/static/includes/oidc-idp-apps-aiven-credentials.md";
import CopyRedirect from "@site/static/includes/oidc-idp-apps-aiven-redirect.md";
import SaveAuthentication from "@site/static/includes/oidc-idp-apps-aiven-save.md";

Let users access an Aiven Runtime application through the Google Cloud identity provider (IdP).

<Permissions/>

## Step 1: Add Google Cloud to a Runtime application

1. <OpenAuthentication/>
1. <AddAuthentication/>
1. <SelectOidc/>
1. <CopyRedirect/>

## Step 2: Create the client ID in Google Cloud

Open the Google Auth Platform in a new tab:

1. [Configure a consent screen](https://developers.google.com/workspace/guides/configure-oauth-consent).
   - To give access only to users in your Google Workspace domain,
     set the audience to **Internal**.
   - Add the `openid`, `profile`, and `email` scopes.
1. [Create an OAuth 2.0 client ID](https://support.google.com/cloud/answer/15549257).
   - Select **Web application** as the **Application type**.
   - In **Authorized redirect URIs**, add the redirect URI from the Aiven Console.
1. After creating the client, copy the **Client ID** and **Client secret**.

## Step 3: Complete the setup in Aiven

Return to the Aiven Console tab:

1. <EnterName/>
1. <EnterCredentials/>
1. <SaveAuthentication/>
