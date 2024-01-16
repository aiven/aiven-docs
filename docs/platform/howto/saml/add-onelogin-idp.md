---
title: Add OneLogin as an identity provider
---

Use [OneLogin](https://www.onelogin.com/) to give your organization
users single sign-on (SSO) access to Aiven.

## Prerequisite steps in Aiven Console

Add OneLogin as an
[identity provider](/docs/platform/howto/saml/add-identity-providers#add-idp-aiven-console)
in the Console.

## Configure SAML on OneLogin {#configure-saml-onelogin}

1.  Log in to the [OneLogin Admin
    console](https://app.onelogin.com/login).

1.  Select **Applications** and click **Add App**.

1.  Search for **SAML Custom Connector (Advanced)** and select it.

1.  Change the **Display Name** to `Aiven`.

1.  Add any other visual configurations you want and click **Save**.

1.  In the **Configuration** section of the menu, set the following
    parameters:

    | Parameter            | Value                                                                          |
    | -------------------- | ------------------------------------------------------------------------------ |
    | `ACS URL Validation` | `[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)`     |
    | `ACS URL`            | `ACS URL` from Aiven Console                                                   |
    | `Login URL`          | `https://console.aiven.io`                                                     |
    | `SAML Initiator`     | `Service Provider` (or `OneLogin` if your users will sign in through OneLogin) |
    | `SAML nameID format` | `Email`                                                                        |

1.  Click **Save**.

1.  In the **SSO** section of the menu, set **SAML Signature Algorithm**
    to `SHA-256`.

1.  Copy the certificate content, `Issuer URL` and
    `SAML 2.0 Endpoint (HTTP)`. These are needed for the SAML
    configuration in Aiven Console.

1. Click **Save**

1. Assign users to this application.

## Finish the configuration in Aiven

Go back to the Aiven Console to
[configure the IdP](/docs/platform/howto/saml/add-identity-providers#configure-idp-aiven-console) and complete the setup.

## Troubleshooting

If you are getting errors, try this:

1.  Go to the app in OneLogin and click **Settings**.
1.  Under **More Actions**, select **Reapply entitlement Mappings**.

If you continue to have issues, you can use the [SAML Tracer browser
extension](https://addons.mozilla.org/firefox/addon/saml-tracer/) to
check the process step by step.
