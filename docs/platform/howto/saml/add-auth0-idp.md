---
title: Add Auth0 as an identity provider
---

Use [Auth0](https://auth0.com/) to give your organization users single
sign-on (SSO) access to Aiven.

## Prerequisite steps in Aiven Console

Add Auth0 as an
[identity provider](/docs/platform/howto/saml/add-identity-providers#add-idp-aiven-console) in the Console.

## Configure SAML on Auth0 {#configure-saml-auth0}

1.  Log in to [your Auth0 account](https://manage.auth0.com).
2.  Select **Applications**.
3.  Click **Create Application**.
4.  Enter an application name.
5.  Choose **Regular Web Applications** and click **Create**.
6.  After your application is created, go to the **Addons** tab.
7.  Enable the **SAML 2 WEB APP** option.
8.  Click on the **SAML 2 WEB APP** option. The **Settings** tab opens.
9.  Set the `Application Callback URL` to the `ACS URL` from the Aiven
    Console.
10. In the **Settings** section for the Application Callback URL, remove
    the existing configuration and add the following field mapping
    configuration:

    ```json
    {
      "email": "email",
      "first_name": "first_name",
      "identity": "email",
      "last_name": "last_name",
      "mapUnknownClaimsAsIs": true
    }
    ```

11. Click **Enable** and **Save**.
12. On the **Usage** tab, make a note of the
    `Identity Provider Login URL`, `Issuer URN`, and
    `Identity Provider Certificate`. These are needed for the SAML
    configuration in Aiven Console.

## Finish the configuration in Aiven

Go back to the Aiven Console to
[configure the IdP](/docs/platform/howto/saml/add-identity-providers#configure-idp-aiven-console) and complete the setup.

## Troubleshooting

If you have issues, you can use the [SAML Tracer browser
extension](https://addons.mozilla.org/firefox/addon/saml-tracer/) to
check the process step by step.
