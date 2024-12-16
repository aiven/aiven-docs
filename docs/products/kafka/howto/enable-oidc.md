---
title: Enable OAUTH2/OIDC authentication for Apache Kafka®
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"
import ConsoleIcon from "@site/src/components/non-swizzled/ConsoleIcons"

Aiven for Apache Kafka® enables secure client authentication using OIDC/OAuth2, allowing clients to verify users through an authorization server.

By activating this, you can use
token-based authentication and integrate with identity providers.
Setting the JSON Web Key Set (JWKS) JWKS endpoint via the Aiven console
activates the OIDC mechanism for Kafka, which triggers a rolling restart
of the Kafka brokers. This restart does not cause service downtime.

:::note
To use the `OAUTHBEARER` mechanism, you must enable `kafka_authentication_methods.sasl`.
Additionally, at least one of the SASL mechanisms (PLAIN, SCRAM-SHA-256, or SCRAM-SHA-512)
must be enabled. See
[Enable and configure SASL authentication with Aiven for Apache Kafka®](/docs/products/kafka/howto/kafka-sasl-auth).
:::

## Prerequisites

Aiven for Apache Kafka integrates with a wide range of OpenID Connect
identity providers (IdPs). However, the exact configuration steps can
differ based on your chosen IdP. Refer to your Identity Provider's
official documentation for specific configuration guidelines.

Before proceeding with the setup, ensure you have:

- [Aiven for Apache Kafka®](/docs/products/kafka/get-started) service running.
- **Access to an OIDC provider**: Options include Auth0, Okta, Google
  Identity Platform, Azure, or any other OIDC compliant provider.
- Required configuration details from your OIDC provider:
  - **JWKS Endpoint URL**: URL to retrieve the JSON Web Key Set
    (JWKS).
  - **Subject Claim Name**: Typically `sub`, but this can vary depending
    on your OIDC provider.
  - **Issuer URL or Identifier**: Identifies and verifies the JWT
    issuer.
  - **Audience identifiers**: Validates the JWT's intended
    recipients. For multiple audiences, make a note of all.

## Enable OAuth2/OIDC for Apache Kafka®

<Tabs groupId="config-methods">
<TabItem value="console" label="Aiven Console" default>

1. In the [Aiven Console](https://console.aiven.io/), select your
   project and choose your Aiven for Apache Kafka® service.

1. Click <ConsoleLabel name="Service settings"/>.
1. Scroll to **Advanced configuration** and click **Configure**.
1. In the **Advanced configuration** window, click
   <ConsoleIcon name="Add config options"/>.
1. Set the OIDC parameters as detailed in the [OIDC Parameters](#oidc-parameters) section.
1. Click **Save configurations**.

</TabItem>
<TabItem value="cli" label="CLI">

To enable OAuth2/OIDC authentication for your Aiven for Apache Kafka
service using [Aiven CLI](/docs/tools/cli):

1. Get the name of your Aiven for Apache Kafka service:

   ```bash
   avn service list
   ```

   Note the `SERVICE_NAME` corresponding to your Aiven for Apache Kafka service.

1. Enable OAuth2/OIDC authentication for your service:

   ```bash
   avn service update <SERVICE_NAME> \
       -c kafka.sasl_oauthbearer_expected_audience="my-audience, another-audience" \
       -c kafka.sasl_oauthbearer_expected_issuer="https://my-issuer.example.com" \
       -c kafka.sasl_oauthbearer_jwks_endpoint_url="https://my-jwks-endpoint.example.com/jwks" \
       -c kafka.sasl_oauthbearer_sub_claim_name="custom-sub"
   ```

For detailed explanations on the OIDC parameters, see the
[OIDC Parameters](#oidc-parameters) section.

</TabItem>
</Tabs>

## OIDC parameters {#oidc-parameters}

Set the following OIDC parameters:

- `kafka.sasl_oauthbearer_jwks_endpoint_url`
  - **Description**: Endpoint for retrieving the JSON Web Key Set
    (JWKS), which enables OIDC authentication. Corresponds to
    the Apache Kafka parameter
    `sasl.oauthbearer.jwks.endpoint.url`.
  - **Value**: Enter the JWKS endpoint URL provided by your OIDC
    provider.
- Optional: `kafka.sasl_oauthbearer_sub_claim_name`
  - **Description**: Name of the JWT's subject claim for broker
    verification. It is typically set to `sub`.
    Corresponds to the Apache Kafka parameter
    `sasl.oauthbearer.sub.claim.name`.
  - **Value**: Enter `sub` or the specific claim name provided
    by your OIDC provider if different.
- Optional: `kafka.sasl_oauthbearer_expected_issuer`
  - **Description**: Specifies the JWT's issuer for the broker to
    verify. Corresponds to the Apache Kafka parameter
    `sasl.oauthbearer.expected.issuer`.
  - **Value**: Enter the issuer URL or identifier provided by your
    OIDC provider.
- Optional: `kafka.sasl_oauthbearer_expected_audience`
  - **Description**: Validates the intended JWT audience for the
    broker. Corresponds to the Apache Kafka parameter
    `sasl.oauthbearer.expected.audience`. It is used if your OIDC provider
    specifies an audience.
  - **Value**: Input the audience identifiers given by your OIDC
    provider. If there are multiple audiences, separate them
    with commas.

For more information on each corresponding Apache Kafka parameter,
see [Apache Kafka documentation](https://kafka.apache.org/documentation/) on
configuration options starting with `sasl.oauthbearer`.

:::warning
Adjusting OIDC configurations, such as enabling, disabling, or
modifying settings, can lead to a rolling restart of Apache Kafka brokers.
As a result, the brokers may temporarily operate with different configurations. To
minimize any operational disruptions, plan to implement these changes during a
maintenance window or at a time that ensures a minimal impact on your operations.
:::

## Related pages

- [Enable OAuth2/OIDC support for Apache Kafka® REST proxy](/docs/products/kafka/karapace/howto/enable-oauth-oidc-kafka-rest-proxy)
- [Enable and configure SASL authentication with Aiven for Apache Kafka](/docs/products/kafka/howto/kafka-sasl-auth)
