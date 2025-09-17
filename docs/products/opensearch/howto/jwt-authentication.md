---
title: Enable JSON Web Token authentication on Aiven for OpenSearch®
sidebar_label: JWT authentication
---

import RelatedPages from "@site/src/components/RelatedPages";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Prerequisites

-   Aiven for OpenSearch® version 2.4 or later. Upgrade if needed.
-   OpenSearch Security management
    [enabled](/docs/products/opensearch/howto/enable-opensearch-security)
    on your service

## Enable JWT authentication

<Tabs groupId="group1">
<TabItem value="gui" label="Console" default>

1.  In the [Aiven Console](https://console.aiven.io/), access your Aiven
    for OpenSearch service where to enable OpenID Connect.
1.  Click **Users** on the sidebar.
1.  In the **SSO authentication** section, use the **Add method**
    drop-down and click **OpenID**.
1.  On **Configure OpenID Connect authentication** screen,
    -   **Redirect URL**: This URL is auto-populated. It is the URL that
        users will be redirected to after they have successfully
        authenticated through the IdP.
    -   **IdP URL**: Enter the URL of your OpenID Connect Identity
        Provider. This is the URL that Aiven will use to redirect users
        to your IdP for authentication.
    -   **Client ID**: Enter the ID you obtained during your IdP
        registration. This ID is used to authenticate your Aiven
        application with your IdP.
    -   **Client Secret**: Enter the secret associated with the Client
        ID. This secret is used to encrypt communications between your
        Aiven application and your IdP.
    -   **Scope**: The scope of the claims. This is the set of
        permissions that you are requesting from your IdP. For example,
        you can request the `openid`, `profile`, and `email` scopes to
        get the user's identity, profile information, and email
        address.
    -   **Roles key**: The key in the returned JSON that stores the
        user's roles. This key is used by Aiven to determine the
        user's permissions.
    -   **Subject key**: This refers to the specific key within the
        returned JSON that holds the user's name or identifying
        subject. Aiven uses this key to recognize and authenticate the
        user. By default, this key is labeled as `Subject`.
1.  Optional: **Enable advanced configuration** to fine-tune
    the authentication process. Aiven for OpenSearch provides the
    following advanced configuration options:
    -   **Token handling**: Choose your preferred method for handling
        the authentication token.
        -   **HTTP Header**: The authentication token is passed in an
            HTTP header.
            -   **Header name**: Enter the specific name of the HTTP
                header that will contain the authentication token. The
                default header name is Authorization.
        -   **URL parameter**: The authentication token is passed as a
            URL parameter. You can specify the parameter name.
            -   **Parameter name**: Enter the specific URL parameter
                that will carry the authentication token.
    -   **Refresh limit count**: Maximum number of unrecognized JWT key
        IDs allowed within 10 seconds. Enter the value for the Refresh
        Limit Count parameter. The default value is 10.
    -   **Refresh limit window (ms)**: This is the interval, measured in
        milliseconds, during which the system will verify unrecognized
        JWT key IDs. Enter the value for the Refresh Limit Window
        parameter. The default value is 10,000 (10 seconds).
1.  Click **Enable** to complete the setup and activate the
    configuration.

</TabItem>
<TabItem value="cli" label="CLI">

</TabItem>
<TabItem value="api" label="API">

</TabItem>
</Tabs>

<RelatedPages/>
