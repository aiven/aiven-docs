---
title: Add OneLogin as an identity provider
sidebar_label: OneLogin
---
<!-- vale off -->
import IdPStep1 from "@site/static/includes/idp-step1.md";
import IdPStep3 from "@site/static/includes/idp-step3.md"

<!-- vale on -->

Use [OneLogin](https://www.onelogin.com/) to give your organization users single sign-on (SSO) access to Aiven.

<IdPStep1/>

## Step 2: Configure SAML on OneLogin

1.  Log in to the [OneLogin Admin console](https://app.onelogin.com/login).

1.  Click **Applications** > **Add App**.

1.  Search for and select **SAML Custom Connector (Advanced)**.

1.  Change the **Display Name** to **Aiven**.

1.  Add any other visual configurations you want and click **Save**.

1.  In the **Configuration** section of the menu, set the following
    parameters:

    |     Parameter      |                                                   Value                                                    |
    | ------------------ | ---------------------------------------------------------------------------------------------------------- |
    | ACS URL Validation | `[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)`                                 |
    | ACS URL            | **ACS URL** from Aiven Console                                                                             |
    | Login URL          | https://console.aiven.io                                                                                   |
    | SAML Initiator     | <ul><li>Service Provider</li> <li>To let your users sign in through OneLogin, enter **OneLogin**</li></ul> |
    | SAML nameID format | Email                                                                                                      |

1.  Click **Save**.

1.  In the **SSO** section, set **SAML Signature Algorithm** to **SHA-256**.

1.  Copy the certificate content, **Issuer URL**, and
    **SAML 2.0 Endpoint (HTTP)**. You'll use these for the SAML
    configuration in Aiven Console.

1. Click **Save**

1. Assign users to this application.

## Step 3: Finish the configuration in Aiven

Go back to the Aiven Console to complete setting up the IdP. If you saved your IdP as a
draft, you can open the settings by clicking the name of the IdP.

1. In the **IDP URL** field, enter the **SAML 2.0 Endpoint (HTTP)** from OneLogin.
1. In the **Entity ID** field, enter the **Issuer URL** from OneLogin.
<IdPStep3/>

## Troubleshooting

If you get errors, you can try reapplying entitlement mappings:

1.  Go to the app in OneLogin and click **Settings**.
1.  Click **More Actions** > **Reapply entitlement Mappings**.
