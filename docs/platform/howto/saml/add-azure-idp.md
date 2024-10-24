---
title: Add Microsoft Azure Active Directory as an identity provider
sidebar_label: Microsoft Azure Active Directory
---
<!-- vale off -->
import IdPStep1 from "@site/static/includes/idp-step1.md";
import IdPStep3 from "@site/static/includes/idp-step3.md"

<!-- vale on -->

Use [Microsoft Azure Active Directory (AD)](https://azure.microsoft.com/en-us/products/active-directory/) to give your organization users single sign-on (SSO) access to Aiven.

<IdPStep1/>

## Step 2: Configure SAML on Microsoft Azure

### Set up an Azure application

1. Log in to [Microsoft Azure](https://portal.azure.com/).
1. Go to **Enterprise applications**.
1. Click **All applications**.
1. Click **New application**.
1. Click the **Add from the gallery** search bar and use the **Azure AD SAML Toolkit**.
1. Click **Add**.
1. Go back to the **Enterprise applications** list.

    :::note
    The newly created application might not be visible. You can use
    the **All applications** filter to see the new application.
    :::

1. Click the name of the new application.
1. Click **Single sign-on**.
1. Select **SAML** as the single sign-on method.
1. Add the following parameters to the **Basic SAML Configuration**:

   |                 Parameter                  |                                                   Value                                                    |
   |--------------------------------------------|------------------------------------------------------------------------------------------------------------|
   | Identifier (Entity ID)                     | `https://api.aiven.io/v1/sso/saml/account/{account_id}/method/{account_authentication_method_id}/metadata` |
   | Reply URL (Assertion Consumer Service URL) | `https://api.aiven.io/v1/sso/saml/account/{account_id}/method/{account_authentication_method_id}/acs`      |
   | Sign on URL                                | `https://console.aiven.io`                                                                                 |

1. Click **Save**.

### Create a claim and add users

1. In the **User Attributes & Claims**, click **Add a new claim**.
1. Create an attribute with the following:

    |    Parameter     |   Value   |
    | ---------------- | --------- |
    | Name             | email     |
    | Source           | Attribute |
    | Source Attribute | user.mail |

1. Download the **Certificate (Base64)** from the **SAML Signing Certificate** section.
1. Go to **Users and groups** and click **Add user**.
1. Select the users that will use Azure AD to log in to Aiven.
1. Click **Assign**.

## Step 3: Finish the configuration in Aiven

Go back to the Aiven Console to complete setting up the IdP. If you saved your IdP as a
draft, you can open the settings by clicking the name of the IdP.

1. In the **IDP URL** field, enter the **Login URL** from Azure.
1. In the **Entity ID** field, enter the **Azure AD Identifier** from Azure.
<IdPStep3/>

## Troubleshooting

If you get an error message to contact your administrator:

1. Go to the Microsoft Azure AD user profile for the users.
1. In **Contact Info**, check whether the **Email** field is blank.

If it is blank, there are two possible solutions:

-   In **User Principal Name**, if the **Identity** field is an email
    address, try changing the **User Attributes & Claims** to
    `email = user.userprincipalname`.
-   In **Contact Info**, if none of the **Alternate email** fields are
    blank, try changing the **User Attributes & Claims** to
    `email = user.othermail`.
