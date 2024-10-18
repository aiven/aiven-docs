---
title: Add FusionAuth as an identity provider
sidebar_label: FusionAuth
---
<!-- vale off -->
import IdPStep1 from "@site/static/includes/idp-step1.md";
import IdPStep3 from "@site/static/includes/idp-step3.md"

<!-- vale on -->

Use [FusionAuth](https://fusionauth.io/) to give your organization users single sign-on (SSO) access to Aiven.

<IdPStep1/>

## Step 2: Configure SAML on FusionAuth

The setup on FusionAuth has three parts:

- Create an API key
- Generate a custom RSA certificate
- Create an application

### Create an API key

1. In FusionAuth, go to **Settings** > **API Keys**.
1. Click the **Add** icon.
1. Enter a description for the key.
1. In the **Endpoints** list, find **/api/key/import**.
1. Toggle on **POST**.
1. Click the **Save** icon.

    ![Creating an API key.](/images/content/platform/howto/saml/fusionauth/create-api-key.png)

1. On the **API Keys** page, find your key and click the value in the **Key** column.

1. Copy the whole key. You'll use this for the script.

    ![Copying the API key value.](/images/content/platform/howto/saml/fusionauth/grab-api-key.png)

1. To clone the [FusionAuth example scripts GitHub
    repository](https://github.com/FusionAuth/fusionauth-example-scripts), run:

    ```shell
    git clone git@github.com:FusionAuth/fusionauth-example-scripts.git
    cd fusionauth-example-scripts/v3-certificate
    ```

1. Run the `generate-certificate` script.

    ```shell
    ./generate-certificate
    ```

1. Name the key.

1. Copy the generated certificate created by the script.

You now have a certificate in the **Key Master** in your FusionAuth instance.

### Create an application

1. In **Applications**, click the **Add** icon.
1. Enter a name for the application.
1. On the **SAML** tab, toggle on **Enabled**.
1. In the **Issuer** field, enter the **Metadata URL** from the Aiven Console.
1. In the **Authorized redirect URLs** field, enter the **ACS URL** from the Aiven Console.
1. In the **Authentication response** section, change the **Signing key** to the
   API key you created.
1. Click the **Save** icon.
1. On the **Applications** page, click the magnifying glass.
1. In the **SAML v2 Integration details** section,
   copy the **Entity Id** and **Login URL**.

## Step 3: Finish the configuration in Aiven

Go back to the Aiven Console to complete setting up the IdP. If you saved your IdP as a
draft, you can open the settings by clicking the name of the IdP.

1. In the **IDP URL** field, enter the **Login URL** from FusionAuth.
1. In the **Entity ID** field, enter the **Entity ID** from FusionAuth.
<IdPStep3/>
