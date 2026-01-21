---
title: Enable JSON Web Token authentication on Aiven for OpenSearch®
sidebar_label: JWT authentication
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Configure JSON Web Token (JWT) authentication to enable secure, stateless authentication for Aiven for OpenSearch®.

## How it works

JWT authentication allows you to access Aiven for OpenSearch using tokens issued by
your existing identity provider, eliminating the need to manage separate OpenSearch
credentials or store session state on the server.

When you make a request to your Aiven for OpenSearch service:

1. **Token is validated**: Aiven for OpenSearch validates the JWT token using the signing
   key you configure.
1. **User is identified**: Aiven for OpenSearch extracts the username from the token's
   subject claim.
1. **Role is assigned**: If configured, user roles are extracted from the token or
   managed separately in Aiven for OpenSearch.
1. **Access is granted**: Valid tokens provide seamless access to your Aiven for OpenSearch
   service.

JWT authentication in Aiven for OpenSearch uses the known-signing-keys validation method,
where Aiven for OpenSearch uses a trusted public key to verify a digital signature from
your identity provider, ensuring that data is coming from a known and authentic source.
JWT authentication in Aiven for OpenSearch is configured through Aiven's user configuration
API rather than directly through the OpenSearch Security API.

Supported `user_config` options are as follows:

| Option                                | Data type | More information                                                                                                                          |
|---------------------------------------|-----------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `jwt.enabled`                         | Boolean   | Enables or disables JWT authentication. Set to `true` to activate JWT authentication.                                                     |
| `jwt.signing_key`                     | String    | Base64-encoded signing key used to verify JWT tokens. Can be PEM-formatted RSA/ECDSA public key or HMAC secret key.                       |
| `jwt.jwt_header`                      | String    | HTTP header name containing the JWT token. Default is `Authorization`.                                                                    |
| `jwt.jwt_url_parameter`               | String    | URL parameter name for passing JWT token as a query parameter. Optional alternative to header-based authentication.                       |
| `jwt.subject_key`                     | String    | JWT claim key that contains the username/subject. Default is `sub`.                                                                       |
| `jwt.roles_key`                       | String    | JWT claim key that contains user roles. If not specified, roles must be managed separately in OpenSearch.                                 |
| `jwt.required_audience`               | String    | Required audience (`aud`) claim value that must be present in JWT tokens. Optional but recommended for security.                          |
| `jwt.required_issuer`                 | String    | Required issuer (`iss`) claim value that must be present in JWT tokens. Optional but recommended for security.                            |
| `jwt.jwt_clock_skew_tolerance_seconds`| Integer   | Clock skew tolerance in seconds for JWT token validation. Accounts for time differences between systems. Default is typically 30 seconds. |

## Prerequisites

-   Aiven for OpenSearch® version 2.4 or later
-   OpenSearch Dashboards version 2.19 or later
-   OpenSearch Security management
    [enabled](/docs/products/opensearch/howto/enable-opensearch-security)
    on your service
- Base64-encoded signing key (PEM-formatted RSA/ECDSA public key or HMAC secret key)
- Tool for enabling and configuring the JWT authentication:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven API](/docs/tools/api)

## Enable JWT authentication

<Tabs groupId="group1">
<TabItem value="gui" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io/), access your Aiven
    for OpenSearch service where to enable the JWT authentication.
1. Click <ConsoleLabel name="serviceusers"/> in the sidebar.
1. In the **SSO authentication** section, click **Add method** > **JWT**.
1. In the **Configure JWT authentication** window, set up the following:
   - **Signing algorithm**: Choose `RSA/ECDSA` or `HMAC`.
   - **Signing key**: Enter your public key to verify your JWT signature when using
     RSA/ECDSA.
   - **HTTP header name**: Provide it if your JWT is transmitted as an HTTP header.
   - **URL parameter name**: Provide it if your JWT is transmitted as a URL parameter.
   - **JWT claim key for subject**: Enter the JWT payload key that contains the user's
     subject identifier to override the `sub` default.
   - **JWT claim key for roles**: Enter the JWT payload key that contains the user's
     roles to have them extracted from the JWT for authorization.
   - **Required JWT audience**: Provide a value for the `aud` claim in the JWT to restrict
     its audience.
   - **Required JWT issuer**: Provide a value for the `iss` claim in the JWT to restrict
     its issuer.
   - **JWT Clock Skew Tolerance (seconds)**: Specify the maximum time difference between
     the JWT's issuer's clock and the OpenSearch server's clock.
1.  Click **Enable** to complete the setup and activate the
    configuration.

</TabItem>
<TabItem value="cli" label="CLI">

Run [avn service update](/docs/tools/cli/service-cli#avn-cli-service-update):

```bash {2-4}
avn service update SERVICE_NAME \
  -c jwt.enabled=true \
  -c jwt.signing_key='SIGNING_KEY' \
  -c jwt.jwt_url_parameter=JWT_URL_PARAMETER
```

Replace the following placeholders with your data:

- `SERVICE_NAME` with the name of your Aiven for OpenSearch service, for example, `os2-jwt`
- `SIGNING_KEY` with your base64-encoded signing key (PEM-formatted RSA/ECDSA public key or
  HMAC secret key)
- `JWT_URL_PARAMETER` with the URL parameter name for JWT token, for example, `token`

</TabItem>
<TabItem value="api" label="API">

Call the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
endpoint:

```bash {7-11}
curl 'https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME' \
  -X 'PUT' \
  -H 'authorization: aivenv1 BEARER_TOKEN' \
  -H 'content-type: application/json' \
  --data-raw '{
    "user_config": {
      "jwt": {
        "enabled": true,
        "signing_key": "SIGNING_KEY",
        "jwt_clock_skew_tolerance_seconds": 45,
        "jwt_url_parameter": "JWT_URL_PARAMETER"
      }
    }
  }'
```

Replace the following placeholders with meaningful data:

- `PROJECT_NAME` with your project name, for example, `my-project`
- `SERVICE_NAME` with your Aiven for OpenSearch service name, for example, `os2-jwt`
- `BEARER_TOKEN` with your Aiven API authentication token
- `SIGNING_KE`Y with your base64-encoded signing key (PEM-formatted RSA/ECDSA public key or
  HMAC secret key)
- `JWT_URL_PARAMETER` with the URL parameter name for JWT token, for example, `token`

</TabItem>
</Tabs>

<RelatedPages/>

[Upstream OpenSearch JWT authentication documentation](https://docs.opensearch.org/latest/security/authentication-backends/jwt/)
