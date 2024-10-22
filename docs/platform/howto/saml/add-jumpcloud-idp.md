---
title: Add JumpCloud as an identity provider
sidebar_label: JumpCloud
---
<!-- vale off -->
import IdPStep1 from "@site/static/includes/idp-step1.md";
import IdPStep3 from "@site/static/includes/idp-step3.md"

<!-- vale on -->

Use [JumpCloud](https://jumpcloud.com/) to give your organization users single sign-on (SSO) access to Aiven.

<IdPStep1/>

## Step 2: Configure SAML on JumpCloud

1. In the [JumpCloud admin console](https://console.jumpcloud.com/login),
   go to **SSO**.
1. Click **Custom SAML App**.
1. Set the **IdP Entity ID**.
1. Set the **Audience URI (SP Entity ID)** to the **Metadata URL** from the
   Aiven Console.
1. Set the **ACS URL** to the one from the Aiven Console.
1. Set the **Default RelayState** to **https://console.aiven.io**.
1. Add an entry in **Attribute statements** with a **Service Provider Attribute Name**
   of **email** and **JumpCloud Attribute Name** of **email**.
1. Set the **Login URL** to the **ACS URL** from the Aiven Console.
1. In **User Groups**, assign the application to your user groups.
1. Click **Activate**.
1. Download the certificate.

## Step 3: Finish the configuration in Aiven

Go back to the Aiven Console to complete setting up the IdP. If you saved your IdP as a
draft, you can open the settings by clicking the name of the IdP.

1. In the **IDP URL** field, enter **IDP URL** from JumpCloud.
1. In the **Entity ID** field, enter the **IdP Entity ID** from JumpCloud.
<IdPStep3/>
