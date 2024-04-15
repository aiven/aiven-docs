---
title: Add Microsoft Azure Active Directory as an identity provider
---

Use [Microsoft Azure Active Directory (AD)](https://azure.microsoft.com/en-us/products/active-directory/) to give your organization users single sign-on (SSO) access to Aiven.

## Prerequisite steps in Aiven Console

Add Azure as an
[identity provider](/docs/platform/howto/saml/add-identity-providers#add-idp-aiven-console) in the Console.

## Configure SAML on Microsoft Azure {#configure-saml-azure}

### Set up an Azure application

1. Log in to [Microsoft Azure](https://portal.azure.com/).
1. Got to **Enterprise applications**.
1. Select **All applications**.
1. Click **New application**.
1. Select the **Add from the gallery** search bar and use the **Azure
   AD SAML Toolkit**.
1. Click **Add**.
1. Go back to the **Enterprise applications** list.

    :::note
    The newly created application might not be visible yet. You can use
    the **All applications** filter to see the new application.
    :::

1. Click the name of the new application. The configuration opens.
1. Select **Single sign-on** configuration.
1. Select **SAML** as the single sign-on method.
1. Add the following parameters to the **Basic SAML Configuration**:

    | Parameter                                    | Value                                                                                                      |
    | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
    | `Identifier (Entity ID)`                     | `https://api.aiven.io/v1/sso/saml/account/{account_id}/method/{account_authentication_method_id}/metadata` |
    | `Reply URL (Assertion Consumer Service URL)` | `https://api.aiven.io/v1/sso/saml/account/{account_id}/method/{account_authentication_method_id}/acs`      |
    | `Sign on URL`                                | `https://console.aiven.io`                                                                                 |

1. Click **Save**.

### Create a claim and add users

1. In the **User Attributes & Claims**, click **Add a new claim**.
1. Create an attribute with the following data:

    | Parameter          | Value       |
    | ------------------ | ----------- |
    | `Name`             | `email`     |
    | `Source`           | `Attribute` |
    | `Source Attribute` | `user.mail` |

1. Download the **Certificate (Base64)** from the **SAML Signing
   Certificate** section.
1. Go to **Users and groups** and click **Add user**.
1. Select the users that you want to use Azure AD to log in to Aiven.
1. Click **Assign**.

## Finish the configuration in Aiven

Go back to the Aiven Console to
[configure the IdP](/docs/platform/howto/saml/add-identity-providers#configure-idp-aiven-console) and complete the setup.

## Troubleshooting

If you get an error message suggesting you contact your administrator,
try these steps:

1. Go to the Microsoft Azure AD user profile for the users.
1. In **Contact Info**, check whether the **Email** field is blank.

If it is blank, there are two possible solutions:

-   In **User Principal Name**, if the **Identity** field is an email
    address, try changing the **User Attributes & Claims** to
    `email = user.userprincipalname`.
-   In **Contact Info**, if none of the **Alternate email** fields are
    blank, try changing the **User Attributes & Claims** to
    `email = user.othermail`.

If you still have login issues, you can use the [SAML Tracer browser
extension](https://addons.mozilla.org/firefox/addon/saml-tracer/) to
check the process step by step. If this doesn't work, get in touch with
our support team at [support@aiven.io](mailto:support@aiven.io).
