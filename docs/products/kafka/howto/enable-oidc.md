---
title: Enable OAuth 2.0/OIDC authentication for Apache Kafka®
sidebar_label: Enable OAuth 2.0/OIDC authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import ConsoleIcon from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages";

Aiven for Apache Kafka® supports OAuth 2.0/OIDC authentication for Kafka clients.
Use OAuth 2.0/OIDC authentication to let clients authenticate with tokens issued by an
identity provider or by an identity broker that supports Outbound Identity Federation.
For AWS IAM, see
[OAuth 2.0/OIDC with AWS IAM](/docs/products/kafka/howto/kafka-oauth2-aws-iam).

## Prerequisites

Before you begin, make sure you have:

- An [Aiven for Apache Kafka](/docs/products/kafka/get-started/create-kafka-service)
  service.
- [SASL authentication](/docs/products/kafka/howto/kafka-sasl-auth#enable-sasl-authentication)
  enabled on the service. OAuth 2.0/OIDC uses the `OAUTHBEARER` SASL mechanism.
- Access to an OIDC provider, such as Auth0, Okta, Google Identity Platform,
  Azure, or another OIDC-compliant provider.
- Configuration details from your OIDC provider:
  - **JWKS endpoint URL:** Required. HTTPS URL to retrieve the JSON Web Key Set, or
    JWKS.
  - **Issuer URL or identifier:** Required by most OIDC providers. Identifies and
    verifies the JWT issuer.
  - **Audience identifiers:** Required by most OIDC providers. Validates the JWT's
    intended recipients. For multiple audiences, note each value.
  - **Subject claim name:** Optional. Typically `sub`, but this can vary depending on
    your OIDC provider.

Configuration steps vary by identity provider. See your provider's documentation
for JWKS URL, issuer, and audience values.

## Configure OAuth 2.0/OIDC settings

Set `kafka.sasl_oauthbearer_jwks_endpoint_url` to enable `OAUTHBEARER`.

To use only OAuth 2.0/OIDC authentication, enable SASL authentication, set
`kafka.sasl_oauthbearer_jwks_endpoint_url`, and
[disable PLAIN, SCRAM-SHA-256, and SCRAM-SHA-512](/docs/products/kafka/howto/kafka-sasl-auth#configure-sasl-mechanisms).

:::note
When SASL authentication is enabled, at least one SASL mechanism must be available.
`OAUTHBEARER` satisfies this requirement when
`kafka.sasl_oauthbearer_jwks_endpoint_url` is set.
:::

Configure OAuth 2.0/OIDC authentication using one of the following methods.

<Tabs groupId="config-methods">
<TabItem value="console" label="Aiven Console" default>

1. In the [Aiven Console](https://console.aiven.io/), select your
   project and choose your Aiven for Apache Kafka service.

1. Click <ConsoleLabel name="Service settings"/>.
1. Scroll to **Advanced configuration** and click **Configure**.
1. In the **Advanced configuration** window, click
   <ConsoleIcon name="Add config options"/>.
1. Enable SASL authentication by setting `kafka_authentication_methods.sasl` to
   **Enabled**.
1. Configure the JWKS endpoint by setting
   `kafka.sasl_oauthbearer_jwks_endpoint_url` to your provider's JWKS URL.

   This enables the `OAUTHBEARER` mechanism. `PLAIN`, `SCRAM-SHA-256`, and
   `SCRAM-SHA-512` remain enabled by default.

1. Optional: Configure other OIDC parameters, such as expected issuer,
   expected audience, and subject claim. See
   [OIDC parameters](#oidc-parameters) for details.
1. Optional: To use only OAuth 2.0/OIDC authentication, set
   `kafka_sasl_mechanisms.plain`, `kafka_sasl_mechanisms.scram_sha_256`, and
   `kafka_sasl_mechanisms.scram_sha_512` to **Disabled**.
1. Click **Save configurations**.

</TabItem>
<TabItem value="cli" label="CLI">

To configure OAuth 2.0/OIDC authentication for your Aiven for Apache Kafka service
using the [Aiven CLI](/docs/tools/cli):

Each `avn service update` that changes OIDC or SASL settings triggers a rolling
restart of Apache Kafka brokers. Combine the `-c` flags you need in a single command
when applying multiple changes.

1. Get the name of your Aiven for Apache Kafka service:

   ```bash
   avn service list
   ```

   Note the `SERVICE_NAME` corresponding to your Aiven for Apache Kafka service.

1. Enable SASL authentication and configure the JWKS endpoint:

   Run a single `avn service update` command. Include the required flags below, and add
   any optional flags to the same command.

   **Required:**

   ```bash
   avn service update SERVICE_NAME \
       -c kafka_authentication_methods.sasl=true \
       -c kafka.sasl_oauthbearer_jwks_endpoint_url="https://my-jwks-endpoint.example.com/jwks"
   ```

   This enables the `OAUTHBEARER` mechanism. `PLAIN`, `SCRAM-SHA-256`, and
   `SCRAM-SHA-512` remain enabled by default.

   **Optional:** Add issuer, audience, and subject claim verification. To use only
   OAuth 2.0/OIDC authentication, set `kafka_sasl_mechanisms.plain`,
   `kafka_sasl_mechanisms.scram_sha_256`, and `kafka_sasl_mechanisms.scram_sha_512` to
   `false`. Example with issuer, audience, subject claim verification, and OAuth-only
   SASL configuration:

   ```bash
   avn service update SERVICE_NAME \
       -c kafka_authentication_methods.sasl=true \
       -c kafka.sasl_oauthbearer_jwks_endpoint_url="https://my-jwks-endpoint.example.com/jwks" \
       -c kafka.sasl_oauthbearer_expected_issuer="https://my-issuer.example.com" \
       -c kafka.sasl_oauthbearer_expected_audience="my-audience" \
       -c kafka.sasl_oauthbearer_sub_claim_name="sub" \
       -c kafka_sasl_mechanisms.plain=false \
       -c kafka_sasl_mechanisms.scram_sha_256=false \
       -c kafka_sasl_mechanisms.scram_sha_512=false
   ```

   Omit optional flags you do not need. Do not run the required and optional examples
   as separate commands.

   Replace the following:

   - `SERVICE_NAME`: name of your Aiven for Apache Kafka service.

For details about the OIDC parameters, see [OIDC parameters](#oidc-parameters).

</TabItem>
</Tabs>

## OIDC parameters {#oidc-parameters}

Configure the following OIDC parameters:

- `kafka.sasl_oauthbearer_jwks_endpoint_url`
  - **Description**: Endpoint for retrieving the JSON Web Key Set, or JWKS, which
    enables OIDC authentication. Corresponds to
    the Apache Kafka parameter
    `sasl.oauthbearer.jwks.endpoint.url`.
  - **Value**: Enter the HTTPS JWKS endpoint URL provided by your OIDC provider.

    :::note
    Starting with Apache Kafka 4.0, the broker verifies that the JWKS endpoint URL for
    OAuth authentication matches an entry in the system property
    `org.apache.kafka.sasl.oauthbearer.allowed.urls`. Aiven sets this property from
    the value of `kafka.sasl_oauthbearer_jwks_endpoint_url`. You do not need additional
    configuration.
    :::

- `kafka.sasl_oauthbearer_sub_claim_name`
  - **Optional**
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

- `kafka.sasl_oauthbearer_expected_issuer`
  - **Optional**
  - **Description**: Specifies the JWT's issuer for the broker to
    verify. Corresponds to the Apache Kafka parameter
    `sasl.oauthbearer.expected.issuer`.
  - **Value**: Enter the issuer URL or identifier provided by your
    OIDC provider.
- `kafka.sasl_oauthbearer_expected_audience`
  - **Optional**
  - **Description**: Validates the intended JWT audience for the
    broker. Corresponds to the Apache Kafka parameter
    `sasl.oauthbearer.expected.audience`. Use this parameter when your OIDC provider
    specifies an audience.
  - **Value**: Enter the audience identifiers given by your OIDC
    provider. If there are multiple audiences, separate them
    with commas.

For more information about each corresponding Apache Kafka parameter,
see [Apache Kafka documentation](https://kafka.apache.org/documentation/) on
configuration options starting with `sasl.oauthbearer`.

:::warning
Changing OIDC settings triggers a rolling restart of Apache Kafka brokers. As a
result, the brokers temporarily operate with different configurations. To reduce
operational impact, apply these changes during a maintenance window.
:::

<RelatedPages/>

- [Enable OAuth 2.0/OIDC support for Apache Kafka REST proxy](/docs/products/kafka/karapace/howto/enable-oauth-oidc-kafka-rest-proxy)
- [Enable and configure SASL authentication](/docs/products/kafka/howto/kafka-sasl-auth)
- [OAuth 2.0/OIDC with AWS IAM](/docs/products/kafka/howto/kafka-oauth2-aws-iam)
