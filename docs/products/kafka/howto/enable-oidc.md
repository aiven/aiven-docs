---
title: Enable OAuth2/OIDC authentication for Apache Kafka®
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import ConsoleIcon from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages";

Aiven for Apache Kafka® supports OAuth2/OIDC authentication for Kafka clients.
Use OAuth2/OIDC authentication to let clients authenticate with tokens issued by an
identity provider.

:::note
To use the `OAUTHBEARER` mechanism, you must enable `kafka_authentication_methods.sasl`.
Other SASL mechanisms (PLAIN, SCRAM-SHA-256, and SCRAM-SHA-512) are optional and can be
disabled independently. See
[Enable and configure SASL authentication with Aiven for Apache Kafka®](/docs/products/kafka/howto/kafka-sasl-auth).
:::

## Prerequisites

Before you begin, make sure you have:

- An [Aiven for Apache Kafka®](/docs/products/kafka/get-started/create-kafka-service)
  service.
- Access to an OIDC provider, such as Auth0, Okta, Google Identity Platform,
  Azure, or another OIDC-compliant provider.
- Required configuration details from your OIDC provider:
  - **JWKS endpoint URL**: URL to retrieve the JSON Web Key Set (JWKS).
  - **Subject claim name**: Typically `sub`, but this can vary depending on your
    OIDC provider.
  - **Issuer URL or identifier**: Identifies and verifies the JWT issuer.
  - **Audience identifiers**: Validates the JWT's intended recipients. For
    multiple audiences, make a note of all.

Configuration steps vary by identity provider. See your provider's documentation
for JWKS URL, issuer, and audience values.

## Enable OAuth2/OIDC for Apache Kafka®

<Tabs groupId="config-methods">
<TabItem value="console" label="Aiven Console" default>

1. In the [Aiven Console](https://console.aiven.io/), select your
   project and choose your Aiven for Apache Kafka® service.

1. Click <ConsoleLabel name="Service settings"/>.
1. Scroll to **Advanced configuration** and click **Configure**.
1. In the **Advanced configuration** window, click
   <ConsoleIcon name="Add config options"/>.
1. Enable SASL authentication by setting `kafka_authentication_methods.sasl` to
   **Enabled**.
1. Configure the JWKS endpoint by setting
   `kafka.sasl_oauthbearer_jwks_endpoint_url` to your provider's JWKS URL.
1. Optional: Configure other OIDC parameters, such as expected issuer,
   expected audience, and subject claim. See
   [OIDC parameters](#oidc-parameters) for details.
1. Optional: For OAuth/OIDC-only authentication, disable
   `kafka_sasl_mechanisms.plain`, `kafka_sasl_mechanisms.scram_sha_256`, and
   `kafka_sasl_mechanisms.scram_sha_512`.
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

1. Enable OAuth2/OIDC authentication for your service. The following example enables
   OAuth2/OIDC authentication and disables PLAIN and SCRAM mechanisms:

   ```bash
   avn service update <SERVICE_NAME> \
       -c kafka_authentication_methods.sasl=true \
       -c kafka.sasl_oauthbearer_jwks_endpoint_url="https://my-jwks-endpoint.example.com/jwks" \
       -c kafka.sasl_oauthbearer_expected_issuer="https://my-issuer.example.com" \
       -c kafka.sasl_oauthbearer_expected_audience="my-audience" \
       -c kafka_sasl_mechanisms.plain=false \
       -c kafka_sasl_mechanisms.scram_sha_256=false \
       -c kafka_sasl_mechanisms.scram_sha_512=false
   ```

   To keep PLAIN or SCRAM mechanisms enabled, omit the corresponding
   `kafka_sasl_mechanisms` settings. Optional issuer and audience settings can also
   be omitted.

For details about the OIDC parameters, see [OIDC parameters](#oidc-parameters).

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

    :::note
    Starting with Apache Kafka 4.0, the broker checks that the JWKS endpoint used for
    OAuth authentication is explicitly listed in the system
    property `org.apache.kafka.sasl.oauthbearer.allowed.urls`. If it is not, the broker
    fails to start.
    Aiven automatically sets this property based on the value
    of `kafka.sasl_oauthbearer_jwks_endpoint_url`. No additional configuration is needed.
    :::

- `kafka.sasl_oauthbearer_sub_claim_name` (optional)
  - **Description**: Name of the JWT's subject claim for broker
    verification. It is typically set to `sub`.
    Corresponds to the Apache Kafka parameter
    `sasl.oauthbearer.sub.claim.name`.
  - **Value**: Enter `sub` or the specific claim name provided
    by your OIDC provider if different.

    :::note
    The claim must be a string. Claims that contain arrays, such as `groups`, are not
    supported.
    :::

- `kafka.sasl_oauthbearer_expected_issuer` (optional)
  - **Description**: Specifies the JWT's issuer for the broker to
    verify. Corresponds to the Apache Kafka parameter
    `sasl.oauthbearer.expected.issuer`.
  - **Value**: Enter the issuer URL or identifier provided by your
    OIDC provider.
- `kafka.sasl_oauthbearer_expected_audience` (optional)
  - **Description**: Validates the intended JWT audience for the
    broker. Corresponds to the Apache Kafka parameter
    `sasl.oauthbearer.expected.audience`. It is used if your OIDC provider
    specifies an audience.
  - **Value**: Enter the audience identifiers given by your OIDC
    provider. If there are multiple audiences, separate them
    with commas.

For more information on each corresponding Apache Kafka parameter,
see [Apache Kafka documentation](https://kafka.apache.org/documentation/) on
configuration options starting with `sasl.oauthbearer`.

:::warning
Changing OIDC settings, such as enabling, disabling, or modifying settings, can
lead to a rolling restart of Apache Kafka brokers. As a result, the brokers may
temporarily operate with different configurations. To reduce operational impact,
apply these changes during a maintenance window.
:::

<RelatedPages/>

- [Enable OAuth2/OIDC support for Apache Kafka® REST proxy](/docs/products/kafka/karapace/howto/enable-oauth-oidc-kafka-rest-proxy)
- [Enable and configure SASL authentication with Aiven for Apache Kafka](/docs/products/kafka/howto/kafka-sasl-auth)
