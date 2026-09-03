---
title: Enable OAuth 2.0/OIDC authentication for Aiven for Apache Kafka® Schema Registry
sidebar_label: Enable OAuth 2.0/OIDC
description: Authenticate Karapace Schema Registry requests with OAuth 2.0/OIDC bearer tokens and optionally enforce role-based authorization.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Use OAuth 2.0/OpenID Connect (OIDC) to authenticate requests to Karapace Schema Registry with JSON Web Tokens (JWTs) issued by your identity provider.

You can also enable role-based authorization to control which Schema Registry
operations clients can perform.

## OAuth 2.0/OIDC token handling

Karapace Schema Registry validates JWTs sent with the Bearer authentication
scheme.
It checks tokens against the OIDC provider settings for the Aiven for Apache
Kafka service.

This differs from the
[Karapace REST proxy](/docs/products/kafka/karapace/howto/enable-oauth-oidc-kafka-rest-proxy),
where Apache Kafka validates the bearer token.
Schema Registry also validates the token.

When OIDC authentication is enabled, clients use bearer tokens instead of
basic authentication to access Schema Registry.

## Authorization enforcement

By default, any client with a valid token can access Schema Registry.
To restrict access, enable role-based authorization.

Karapace extracts roles from a configured JSON path in the JWT.
It checks those roles against the roles allowed for the requested HTTP method.

Enable OIDC authentication before you enable role-based authorization.

## Prerequisites

Before you begin, make sure you have:

- An [Aiven for Apache Kafka®](/docs/products/kafka) service with
  [Schema Registry enabled](/docs/products/kafka/karapace/howto/enable-karapace)
- Karapace version 6.2.1 or later
- Access to an OIDC-compliant identity provider
- OIDC provider settings configured for your Aiven for Apache Kafka service,
  including `kafka.sasl_oauthbearer_jwks_endpoint_url`,
  `kafka.sasl_oauthbearer_expected_issuer`, and
  `kafka.sasl_oauthbearer_expected_audience`

Schema Registry uses the same OIDC provider settings as Apache Kafka.
Those settings include the JWKS endpoint, the expected issuer, and the
expected audience.

The Aiven Console does not require the issuer and audience, but Schema Registry
needs them to validate tokens.

For more information about configuring these settings, see
[Enable OAuth 2.0/OIDC authentication for Apache Kafka®](/docs/products/kafka/howto/enable-oidc).

:::note
If your service runs a Karapace version earlier than 6.2.1, apply the
available maintenance update first.
For more information, see
[Set the Karapace version](/docs/products/kafka/karapace/howto/set-karapace-version).
:::

## Enable OIDC authentication

<Tabs groupId="method">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io/), select your project and
   choose your Aiven for Apache Kafka service.
1. Click <ConsoleLabel name="service settings"/>.
1. Click **Advanced configuration** > **Configure**.
1. Click <ConsoleLabel name="Add config options"/>.
1. Add `schema_registry_config.sasl_oauthbearer_authentication_enabled`.
1. Set the option to **Enabled**.
1. Click **Save configuration**.

</TabItem>
<TabItem value="cli" label="CLI">

Run the following command:

```bash
avn service update SERVICE_NAME \
  -c schema_registry_config.sasl_oauthbearer_authentication_enabled=true
```

Replace `SERVICE_NAME` with the name of your Aiven for Apache Kafka service.

</TabItem>
</Tabs>

## Enable role-based authorization

Enable role-based authorization to restrict Schema Registry operations based
on roles in the JWT.

Before you enable authorization, make sure
`schema_registry_config.sasl_oauthbearer_authentication_enabled` is enabled.

You can optionally customize how Karapace reads and applies roles:

- `schema_registry_config.sasl_oauthbearer_roles_claim_path`: JSON path used
  to extract roles from the JWT. The default is
  `resource_access.karapace.roles`. Set this option if your identity provider
  stores roles at a different path.
- `schema_registry_config.sasl_oauthbearer_method_roles`: Maps HTTP methods
  to the roles allowed to use them. Set this option to customize access for
  `GET`, `POST`, `PUT`, and `DELETE` requests.

Role names use the `karapace.` prefix, for example
`karapace.schema:read`.

### Default HTTP method roles

If you do not set `schema_registry_config.sasl_oauthbearer_method_roles`,
Karapace allows only read access.

| Action | HTTP method | Default roles |
| --- | --- | --- |
| Read schemas | `GET` | `karapace.schema:read`, `karapace.subject:read` |
| Register or update schemas | `POST`, `PUT` | None |
| Delete schemas | `DELETE` | None |

An empty array (`[]`) means no role can use that method.

Karapace uses the following default mapping:

```json
{
  "GET": [
    "karapace.schema:read",
    "karapace.subject:read"
  ],
  "POST": [],
  "PUT": [],
  "DELETE": []
}
```

To allow write access, set
`schema_registry_config.sasl_oauthbearer_method_roles`.

### Configure authorization

<Tabs groupId="method">
<TabItem value="console" label="Console" default>

1. In the Aiven Console, select your project and choose your Aiven for Apache
   Kafka service.
1. Click <ConsoleLabel name="service settings"/>.
1. Click **Advanced configuration** > **Configure**.
1. Make sure
   `schema_registry_config.sasl_oauthbearer_authentication_enabled` is set to
   **Enabled**.
1. Click <ConsoleLabel name="Add config options"/>.
1. Add `schema_registry_config.sasl_oauthbearer_authorization_enabled` and
   set it to **Enabled**.
1. Optional: Add
   `schema_registry_config.sasl_oauthbearer_roles_claim_path` if your JWT
   stores roles somewhere other than `resource_access.karapace.roles`.
1. Optional: Add
   `schema_registry_config.sasl_oauthbearer_method_roles` to customize which
   roles can use each HTTP method.
1. Click **Save configuration**.

</TabItem>
<TabItem value="cli" label="CLI">

To enable role-based authorization using the default roles claim path and
default HTTP method roles, run:

```bash
avn service update SERVICE_NAME \
  -c schema_registry_config.sasl_oauthbearer_authorization_enabled=true
```

Replace `SERVICE_NAME` with the name of your Aiven for Apache Kafka service.

To customize the HTTP method roles, include
`schema_registry_config.sasl_oauthbearer_method_roles`. For example:

```bash
avn service update SERVICE_NAME \
  -c schema_registry_config.sasl_oauthbearer_authorization_enabled=true \
  -c 'schema_registry_config.sasl_oauthbearer_method_roles={"GET":["karapace.schema:read","karapace.schema:write"],"POST":["karapace.schema:write"],"PUT":["karapace.schema:write"],"DELETE":["karapace.schema:write"]}'
```

</TabItem>
</Tabs>

### Configure roles for HTTP methods

Set `schema_registry_config.sasl_oauthbearer_method_roles` to JSON that maps
each HTTP method to the roles that can use it.

Clients with `karapace.schema:read` can read schemas.
Clients with `karapace.schema:write` can read and write schemas.

| Role | Allowed actions |
| --- | --- |
| `karapace.schema:read` | Read schemas (`GET`) |
| `karapace.schema:write` | Read and write schemas (`GET`, `POST`, `PUT`, `DELETE`) |

Each key in the JSON is an HTTP method. Each value is the list of roles
allowed for that method:

```json
{
  "GET": [
    "karapace.schema:read",
    "karapace.schema:write"
  ],
  "POST": [
    "karapace.schema:write"
  ],
  "PUT": [
    "karapace.schema:write"
  ],
  "DELETE": [
    "karapace.schema:write"
  ]
}
```

When you set this option, include `GET`, `POST`, `PUT`, and `DELETE`.
To block a method, set its value to `[]`.

## Send a request to Schema Registry

Send the JWT in the `Authorization` header of each Schema Registry request.
You can use `curl` or any HTTP client that supports bearer tokens.

On the service <ConsoleLabel name="overview"/> page, open
**Connection information** and copy the Schema Registry URL.

The following example lists subjects:

```bash
curl \
  --header "Authorization: Bearer ACCESS_TOKEN" \
  "SCHEMA_REGISTRY_URL/subjects"
```

Replace the following:

- `ACCESS_TOKEN`: a valid JWT from your identity provider
- `SCHEMA_REGISTRY_URL`: the Schema Registry URL from **Connection information**

This example uses `GET`, so it works with the default read roles.
If authorization is on, a `POST`, `PUT`, or `DELETE` request needs a write role.

## Disable OAuth 2.0/OIDC authentication

To return to basic authentication and authorization for Schema Registry, turn
off OIDC authorization and authentication.

<Tabs groupId="method">
<TabItem value="console" label="Console" default>

1. In the Aiven Console, select your project and choose your Aiven for Apache
   Kafka service.
1. Click <ConsoleLabel name="service settings"/>.
1. Click **Advanced configuration** > **Configure**.
1. Set `schema_registry_config.sasl_oauthbearer_authorization_enabled` to
   **Disabled**.
1. Set `schema_registry_config.sasl_oauthbearer_authentication_enabled` to
   **Disabled**.
1. Click **Save configuration**.

</TabItem>
<TabItem value="cli" label="CLI">

Run the following command:

```bash
avn service update SERVICE_NAME \
  -c schema_registry_config.sasl_oauthbearer_authorization_enabled=false \
  -c schema_registry_config.sasl_oauthbearer_authentication_enabled=false
```

Replace `SERVICE_NAME` with the name of your Aiven for Apache Kafka service.

</TabItem>
</Tabs>

<RelatedPages/>

- [Enable OAuth 2.0/OIDC authentication for Apache Kafka®](/docs/products/kafka/howto/enable-oidc)
- [Enable OAuth 2.0/OIDC support for Apache Kafka® REST proxy](/docs/products/kafka/karapace/howto/enable-oauth-oidc-kafka-rest-proxy)
- [Karapace schema registry authorization](/docs/products/kafka/karapace/concepts/schema-registry-authorization)
- [Manage Karapace schema registry authorization](/docs/products/kafka/karapace/howto/manage-schema-registry-authorization)
- [Enable schema registry and REST proxy](/docs/products/kafka/karapace/howto/enable-karapace)
- [Set the Karapace version](/docs/products/kafka/karapace/howto/set-karapace-version)
