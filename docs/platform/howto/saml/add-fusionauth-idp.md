---
title: Add FusionAuth as an identity provider
---

Use [FusionAuth](https://fusionauth.io/) to give your organization users
single sign-on (SSO) access to Aiven.

## Prerequisite steps in Aiven Console

Add FusionAuth as an
[identity provider](/docs/platform/howto/saml/add-identity-providers#add-idp-aiven-console) in the Console.

## Configure SAML on FusionAuth {#configure-saml-fusionauth}

The setup on FusionAuth has three parts:

-   create an API key
-   generate a custom RSA certificate
-   create an application

Create an API Key in your FusionAuth instance:

1. In FusionAuth, go to **Settings** \> **API Keys**.
1. Click the **Add** icon.
1. Enter a description for the key. Example: `Certificate generator`.
1. In the **Endpoints** list, find `/api/key/import`.
1. Toggle on **POST**.
1. Click the **Save** icon.

    ![Creating API Key.](/images/platform/howto/saml/fusionauth/create-api-key.png)

1. On the **API Keys** page, find your new key and click on the value
    in the **Key** column.

1. Copy the whole key. You'll use this for the script.

    ![Grabbing API Key.](/images/platform/howto/saml/fusionauth/grab-api-key.png)

1. Clone [the FusionAuth example scripts GitHub
    repository](https://github.com/FusionAuth/fusionauth-example-scripts).

    ```shell
    git clone git@github.com:FusionAuth/fusionauth-example-scripts.git
    cd fusionauth-example-scripts/v3-certificate
    ```

1. Run the `generate-certificate` script.

    ```shell
    ./generate-certificate
    ```

1. Give the key a meaningful name (for example, "Aiven key").

1. Copy the generated certificate that the script creates. You now have
    a certificate in the **Key Master** in your FusionAuth instance.

Create an application in your FusionAuth instance:

1. In **Applications**, click the **Add** icon.
1. Enter a name for the application (for example, "Aiven").
1. On the **SAML** tab, and toggle on the **Enabled** switch.
1. Paste the **Metadata URL** and **ACS URL** you copied from the Aiven
   Console to the **Issuer** and **Authorized redirect URLs** fields in
   your FusionAuth application, respectively.

   | Aiven        | FusionAuth               |
   | ------------ | ------------------------ |
   | Metadata URL | Issuer                   |
   | ACS URL      | Authorized redirect URLs |

1. In the **Authentication response** section, change the **Signing
    key** to the API key you created.
1. Click the **Save** icon to save your application.
1. On the **Applications** page, click the magnifying glass.
1. In the **SAML v2 Integration details** section, copy the **Entity
    Id** and **Login URL**.

## Finish the configuration in Aiven

Go back to the Aiven Console to
[configure the IdP](/docs/platform/howto/saml/add-identity-providers#configure-idp-aiven-console) and complete the setup.
