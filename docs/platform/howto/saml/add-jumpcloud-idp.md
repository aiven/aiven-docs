---
title: Add JumpCloud as an identity provider
---

Use [JumpCloud](https://jumpcloud.com/) to give your organization users
single sign-on (SSO) access to Aiven.

## Prerequisite steps in Aiven Console

Add JumpCloud as an
[identity provider](/docs/platform/howto/saml/add-identity-providers#add-idp-aiven-console) in the Console.

## Configure SAML on JumpCloud {#configure-saml-jumpcloud}

1.  In the [JumpCloud admin
    console](https://console.jumpcloud.com/login), go to **SSO**.
2.  Select **Custom SAML App**.
3.  Set the **IdP Entity ID**.
4.  Set the `Audience URI (SP Entity ID)` to the `Metadata URL` from the
    Aiven Console.
5.  Set the `ACS URL` to the one from the Aiven Console.
6.  Set the `Default RelayState` to the homepage of the Aiven Console,
    [https://console.aiven.io](https://console.aiven.io).
7.  Add an entry in **Attribute statements** with
    `Service Provider Attribute Name` of `email` and
    `JumpCloud Attribute Name` of `email`.
8.  Set the `Login URL` to the `ACS URL` from the Aiven Console.
9.  In **User Groups**, assign the application to your user groups.
10. Click **Activate**.
11. Download the certificate.

## Finish the configuration in Aiven

Go back to the Aiven Console to
[configure the IdP](/docs/platform/howto/saml/add-identity-providers#configure-idp-aiven-console) and complete the setup.
