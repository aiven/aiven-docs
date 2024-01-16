---
title: Set up SAML with FusionAuth
---

This article explains how to set up SAML with
[FusionAuth](https://fusionauth.io/) for an organization in Aiven. For
more information on SAML and instructions for other identity providers,
see the
[Set up SAML authentication](/docs/platform/howto/saml/saml-authentication) article.

## Prerequisite steps in Aiven Console

1.  In the organization, click **Admin**.
2.  Select **Identity providers**.
3.  Click **Add identity provider**.
4.  Enter a name and select SAML. You can also select the groups that
    users will be added to when they sign up or log in through this
    authentication method.
5.  Click **Add method**.

You are shown two parameters needed to set up the SAML authentication in
FusionAuth:

-   Metadata URL
-   ACS URL

## Configure SAML on FusionAuth

The setup on FusionAuth has three parts:

-   create an API key
-   generate a custom RSA certificate
-   create an application

First you need to create an API Key in your FusionAuth instance:

1.  In FusionAuth, go to **Settings** \> **API Keys**.

2.  Click the **Add** icon.

3.  Enter a description for the key (for example, \"Certificate
    generator\").

4.  In the **Endpoints** list, find `/api/key/import`.

5.  Toggle on **POST**.

6.  Click the **Save** icon.

    ![Creating API Key.](/images/platform/howto/saml/fusionauth/create-api-key.png)

7.  On the **API Keys** page, find your new key and click on the value
    in the **Key** column.

8.  Copy the whole key. You\'ll use this for the script.

    ![Grabbing API Key.](/images/platform/howto/saml/fusionauth/grab-api-key.png)

9.  Clone [the FusionAuth example scripts GitHub
    repository](https://github.com/FusionAuth/fusionauth-example-scripts).

    ``` shell
    git clone git@github.com:FusionAuth/fusionauth-example-scripts.git
    cd fusionauth-example-scripts/v3-certificate
    ```

10. Run the `generate-certificate` script.

    ``` shell
    ./generate-certificate
    ```

11. Give the key a meaningful name (for example, \"Aiven key\").

12. Copy the generated certificate that the script creates. You now have
    a certificate in the **Key Master** in your FusionAuth instance.

Next, create an application in your FusionAuth instance:

1.  In **Applications**, click the **Add** icon.

2.  Enter a name for the application (for example, \"Aiven\").

3.  On the **SAML** tab, and toggle on the **Enabled** switch.

4.  Paste the **Metadata URL** and **ACS URL** you copied from the Aiven
    Console to the **Issuer** and **Authorized redirect URLs** fields in
    your FusionAuth application, respectively.

      Aiven          FusionAuth
      -------------- --------------------------
      Metadata URL   Issuer
      ACS URL        Authorized redirect URLs

5.  In the **Authentication response** section, change the **Signing
    key** to the API key you created.

6.  Click the **Save** icon to save your application.

7.  On the **Applications** page, click the magnifying glass.

8.  In the **SAML v2 Integration details** section, copy the **Entity
    Id** and **Login URL**.

## Finish the configuration in Aiven

Go back to the **Authentication** page in [Aiven
Console](https://console.aiven.io/) to enable the SAML authentication
method:

1.  Select the name of the FusionAuth method that you created.
2.  In the SAML configuration section, click **Edit**.
3.  Toggle on **IdP login**.
4.  Add the configuration settings from FusionAuth:
    -   Set the `SAML IDP Url` to the `Login URL` from FusionAuth.
    -   Set the `SAML Entity ID` to the `Entity Id` from FusionAuth.
    -   Paste the certificate from the `Generating certificate` in
        FusionAuth into the `SAML Certificate`\` field.
5.  Click **Edit method** to save your changes.
6.  Toggle on **Enable authentication method** at the top of the page.
7.  In the **Signup and link accounts URLs** section, copy the
    appropriate link and send it to your users to switch them to the new
    IdP:
    -   **Signup URL**: For users that don\'t have an Aiven user account
        and need to create a new Aiven user linked to this IdP.
    -   **Account link URL**: For users that already have an Aiven user
        account to link their existing Aiven user with the configured
        IdP.

:::note
If you set up a SAML authentication method before and are now switching
to a new IdP, existing users need to log in with the new account link
URL to finish the setup.
:::

## Troubleshooting

If you have issues, you can use the [SAML Tracer browser
extension](https://addons.mozilla.org/firefox/addon/saml-tracer/) to
check the process step by step.
