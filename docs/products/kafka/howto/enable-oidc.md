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
  - **Issuer URL or identifier:** Required. The expected issuer of the JWT. Your OIDC
    provider usually publishes this value.
  - **Audience identifiers:** Required. The expected audience of the JWT. For multiple
    audiences, note each value.
  - **Subject claim name:** Optional. Typically `sub`, but this can vary depending on
    your OIDC provider.

Configuration steps vary by identity provider. See your provider's documentation
for JWKS URL, issuer, and audience values.

:::note[Note]
OAuth 2.0/OIDC authentication works independently of Aiven service users. If you
use **Aiven ACLs** instead of Kafka-native ACLs to control access, create
a [matching Aiven service user](/docs/products/kafka/howto/add-manage-service-users)
with the same identifier as the OIDC principal. This identifier can be the
identity provider's service principal ID. Aiven enforces the ACL only when this
matching service user exists. Kafka-native ACLs do not have this requirement.
For more information, see
[Manage access control lists](/docs/products/kafka/howto/manage-acls).
:::

## Configure OAuth 2.0/OIDC settings

Set `kafka.sasl_oauthbearer_jwks_endpoint_url` to enable `OAUTHBEARER`. You must also
set `kafka.sasl_oauthbearer_expected_issuer` and
`kafka.sasl_oauthbearer_expected_audience`. Without them, the broker accepts any
validly signed token from the JWKS endpoint, whatever its issuer or audience.

:::important[Important]
If your service already uses OAuth 2.0/OIDC authentication without an expected issuer
or audience, you must set both values the next time you change any of its user
configuration, including settings unrelated to OIDC. Otherwise, the update fails. If
your identity provider can't supply one of the values, see the
[unverified options](#oidc-parameters).
:::

To use only OAuth 2.0/OIDC authentication, enable SASL authentication, set
`kafka.sasl_oauthbearer_jwks_endpoint_url`, the expected issuer and audience, and
[disable PLAIN, SCRAM-SHA-256, and SCRAM-SHA-512](/docs/products/kafka/howto/kafka-sasl-auth#configure-sasl-mechanisms).

:::note[Note]
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

1. Set the required `kafka.sasl_oauthbearer_expected_issuer` and
   `kafka.sasl_oauthbearer_expected_audience` to the values from your OIDC provider.
1. Optional: Set `kafka.sasl_oauthbearer_sub_claim_name`. See
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

1. Enable SASL authentication and configure the JWKS endpoint, expected issuer, and
   expected audience in a single command:

   ```bash
   avn service update SERVICE_NAME \
       -c kafka_authentication_methods.sasl=true \
       -c kafka.sasl_oauthbearer_jwks_endpoint_url="https://my-jwks-endpoint.example.com/jwks" \
       -c kafka.sasl_oauthbearer_expected_issuer="https://my-issuer.example.com" \
       -c kafka.sasl_oauthbearer_expected_audience="my-audience"
   ```

   This enables the `OAUTHBEARER` mechanism. `PLAIN`, `SCRAM-SHA-256`, and
   `SCRAM-SHA-512` remain enabled by default.

1. Optional: Add the following flags to the same command:

   - To set the subject claim name, add
     `-c kafka.sasl_oauthbearer_sub_claim_name="sub"`.
   - To use only OAuth 2.0/OIDC authentication, add
     `-c kafka_sasl_mechanisms.plain=false`,
     `-c kafka_sasl_mechanisms.scram_sha_256=false`, and
     `-c kafka_sasl_mechanisms.scram_sha_512=false`.

   Do not run these flags as a separate command.

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
  - **Required**, unless `kafka.sasl_oauthbearer_allow_unverified_issuer` is set to
    `true`
  - **Description**: JWT issuer that the broker verifies. Corresponds to the
    Apache Kafka parameter `sasl.oauthbearer.expected.issuer`.
  - **Value**: Enter the issuer URL or identifier provided by your
    OIDC provider.
- `kafka.sasl_oauthbearer_expected_audience`
  - **Required**, unless `kafka.sasl_oauthbearer_allow_unverified_audience` is set to
    `true`
  - **Description**: JWT audience that the broker verifies. Corresponds to the
    Apache Kafka parameter `sasl.oauthbearer.expected.audience`.
  - **Value**: Enter the audience identifiers given by your OIDC
    provider. If there are multiple audiences, separate them
    with commas.
- `kafka.sasl_oauthbearer_allow_unverified_issuer`
  - **Optional**
  - **Description**: Allows OAuth 2.0/OIDC authentication without setting
    `kafka.sasl_oauthbearer_expected_issuer`. Use this setting only if your identity
    provider can't supply an issuer. Until Apache Kafka 4.4, the brokers then accept
    any validly signed token from the JWKS endpoint, whatever its issuer. This
    exposes the brokers to
    [CVE-2026-110952](https://www.cve.org/CVERecord?id=CVE-2026-110952).
  - **Value**: Set to `true` to skip issuer verification.
- `kafka.sasl_oauthbearer_allow_unverified_audience`
  - **Optional**
  - **Description**: Allows OAuth 2.0/OIDC authentication without setting
    `kafka.sasl_oauthbearer_expected_audience`. Use this setting only if your identity
    provider can't supply an audience. Until Apache Kafka 4.4, the brokers then accept
    any validly signed token from the JWKS endpoint, whatever its audience. This
    exposes the brokers to
    [CVE-2026-110952](https://www.cve.org/CVERecord?id=CVE-2026-110952).
  - **Value**: Set to `true` to skip audience verification.

:::warning[Warning]
In Apache Kafka 3.1.0 to 4.3.x, a broker that uses a JWKS endpoint checks the token
signature but not the issuer or audience, unless you set the expected values. The
broker accepts any validly signed token from that JWKS endpoint, whatever its issuer
or audience. Apache Kafka 4.4.0 fixes this. It refuses to start a broker that uses a
JWKS endpoint unless you set both values or explicitly allow unverified ones.

To protect your brokers, set both `kafka.sasl_oauthbearer_expected_issuer` and
`kafka.sasl_oauthbearer_expected_audience`. Until Apache Kafka 4.4, setting
`kafka.sasl_oauthbearer_allow_unverified_issuer` or
`kafka.sasl_oauthbearer_allow_unverified_audience` to `true` keeps the brokers exposed
to [CVE-2026-110952](https://www.cve.org/CVERecord?id=CVE-2026-110952).
:::

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
- [Enable OAuth 2.0/OIDC authentication for Aiven for Apache Kafka® Schema Registry](/docs/products/kafka/karapace/howto/enable-oauth-oidc-schema-registry)
- [Enable and configure SASL authentication](/docs/products/kafka/howto/kafka-sasl-auth)
- [OAuth 2.0/OIDC with AWS IAM](/docs/products/kafka/howto/kafka-oauth2-aws-iam)
