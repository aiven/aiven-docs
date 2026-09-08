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

## Prerequisites

Before you begin, make sure you have:

- An [Aiven for Apache Kafka®](/docs/products/kafka) service with
  [Schema Registry enabled](/docs/products/kafka/karapace/howto/enable-karapace)
- Karapace version 6.2.1 or later
- Access to an OIDC-compliant identity provider
- The following OIDC provider settings configured for your Aiven for Apache
  Kafka service:
  - `kafka.sasl_oauthbearer_jwks_endpoint_url`
  - `kafka.sasl_oauthbearer_expected_issuer`
  - `kafka.sasl_oauthbearer_expected_audience`

Schema Registry uses the same OIDC provider settings as Apache Kafka.

The Aiven Console does not require the expected issuer or audience settings
when you configure Kafka OIDC, but Schema Registry requires both for
authentication.

For more information about configuring these settings, see
[Enable OAuth 2.0/OIDC authentication for Apache Kafka®](/docs/products/kafka/howto/enable-oidc).

:::note
If your service runs a Karapace version earlier than 6.2.1, apply the
available maintenance update first.

For more information, see
[Set the Karapace version](/docs/products/kafka/karapace/howto/set-karapace-version).
:::

## Enable OIDC authentication

Karapace Schema Registry validates the JWT in the `Authorization` header
against the OIDC provider settings configured for the service.

This differs from the
[Karapace REST proxy](/docs/products/kafka/karapace/howto/enable-oauth-oidc-kafka-rest-proxy),
where Apache Kafka validates the bearer token.

Enabling OIDC authentication does not disable basic authentication. Clients
can authenticate with either a bearer token or basic authentication.

:::note
Keep basic authentication enabled while you migrate clients to JWT
authentication. After all clients use JWT authentication, you can disable
basic authentication.
:::

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

When OIDC authentication is enabled and role-based authorization is disabled,
any client with a valid token can access Schema Registry.

To restrict access based on roles, enable
`schema_registry_config.sasl_oauthbearer_authorization_enabled`.

:::note
Enabling role-based authorization also enables OIDC authentication if it is
not already enabled.
:::

<Tabs groupId="method">
<TabItem value="console" label="Console" default>

1. In the Aiven Console, select your project and choose your Aiven for Apache
   Kafka service.
1. Click <ConsoleLabel name="service settings"/>.
1. Click **Advanced configuration** > **Configure**.
1. Click <ConsoleLabel name="Add config options"/>.
1. Add `schema_registry_config.sasl_oauthbearer_authorization_enabled`.
1. Set the option to **Enabled**.
1. Optional: Add
   `schema_registry_config.sasl_oauthbearer_roles_claim_path` if your JWT
   includes roles somewhere other than `resource_access.karapace.roles`.
1. Click **Save configuration**.

</TabItem>
<TabItem value="cli" label="CLI">

Run the following command:

```bash
avn service update SERVICE_NAME \
  -c schema_registry_config.sasl_oauthbearer_authorization_enabled=true
```

Replace `SERVICE_NAME` with the name of your Aiven for Apache Kafka service.

To use a different roles claim path, add
`schema_registry_config.sasl_oauthbearer_roles_claim_path`. For example:

```bash
avn service update SERVICE_NAME \
  -c schema_registry_config.sasl_oauthbearer_authorization_enabled=true \
  -c schema_registry_config.sasl_oauthbearer_roles_claim_path=realm_access.roles
```

</TabItem>
</Tabs>

When you enable authorization, Karapace uses the default roles claim path and
HTTP method role mapping unless you customize them.

By default:

- Karapace reads roles from `resource_access.karapace.roles`.
- `GET` requests are allowed for `karapace.schema:read` and
  `karapace.subject:read`.
- `POST`, `PUT`, and `DELETE` requests are blocked.

### How role-based authorization works

Karapace extracts roles from the JWT using the configured claim path and
checks them against the roles allowed for the requested HTTP method.

Karapace does not create or assign roles. You create and assign roles in your
identity provider.

Role names are strings that you define. For example, you can use names such as
`karapace.schema:read`. They are not built-in Karapace roles.

In Karapace, you configure which roles can use each HTTP method.

For each request, Karapace does the following:

1. Validates the JWT signature, expiration, issuer, and audience.
1. If authorization is enabled, reads the roles from the configured claim
   path. The default path is `resource_access.karapace.roles`.
1. Looks up the roles allowed for the requested HTTP method in
   `schema_registry_config.sasl_oauthbearer_method_roles`.
1. Allows the request if at least one role in the JWT matches an allowed
   role.

Karapace matches exact role strings and does not use a role hierarchy. A role
grants access only when the same string appears in both the JWT and
`schema_registry_config.sasl_oauthbearer_method_roles`.

If your identity provider includes roles at a different path, such as
`realm_access.roles`, set
`schema_registry_config.sasl_oauthbearer_roles_claim_path` to that path.

### Default HTTP method roles

If you do not set `schema_registry_config.sasl_oauthbearer_method_roles`,
Karapace uses this default mapping:

| Action | HTTP method | Default roles |
| --- | --- | --- |
| Read schemas | `GET` | `karapace.schema:read`, `karapace.subject:read` |
| Register or update schemas | `POST`, `PUT` | None |
| Delete schemas | `DELETE` | None |

An empty array (`[]`) means no role can use that method, even with a valid
token.

A client whose token includes `karapace.schema:read` can send `GET` requests.
`POST`, `PUT`, and `DELETE` requests remain blocked until you
[customize roles for HTTP methods](#customize-roles-for-http-methods).

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

### Example JWT

The identity provider issues a token that includes the roles assigned to the
user or client. For example:

```json
{
  "sub": "alex",
  "resource_access": {
    "karapace": {
      "roles": [
        "karapace.schema:read",
        "karapace.schema:write"
      ]
    }
  }
}
```

This example omits the issuer, audience, and expiration claims.
Karapace validates these claims before it reads roles.

The default claim path, `resource_access.karapace.roles`, matches this example.

### Configure roles in your identity provider

How you configure roles varies by identity provider.

In your identity provider, do the following:

1. Create the roles and assign them to users or clients.
1. Configure the provider to include those roles in the claim that Karapace
   reads.
1. Confirm that issued tokens include the roles in that claim.

Use the same role strings that you plan to list in
`schema_registry_config.sasl_oauthbearer_method_roles`.

### Customize roles for HTTP methods

Set `schema_registry_config.sasl_oauthbearer_method_roles` to a JSON string
that maps each HTTP method to the roles that can use it.

Karapace does not infer permissions from role names. To allow a client to use
an HTTP method, list the role under that method.

The following mapping uses a common role convention:

| Role | HTTP methods |
| --- | --- |
| `karapace.schema:read` | `GET` |
| `karapace.schema:write` | `GET`, `POST`, `PUT`, `DELETE` |

Each key in the JSON object is an HTTP method. Each value is a list of roles
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

When you set this option, include `GET`, `POST`, `PUT`, and `DELETE`. To block
a method, set its value to `[]`.

<Tabs groupId="method">
<TabItem value="console" label="Console" default>

1. In the Aiven Console, select your project and choose your Aiven for Apache
   Kafka service.
1. Click <ConsoleLabel name="service settings"/>.
1. Click **Advanced configuration** > **Configure**.
1. Click <ConsoleLabel name="Add config options"/>.
1. Add `schema_registry_config.sasl_oauthbearer_method_roles`.
1. Enter the JSON object as a single string.
1. Click **Save configuration**.

</TabItem>
<TabItem value="cli" label="CLI">

Run the following command:

```bash
avn service update SERVICE_NAME \
  -c 'schema_registry_config.sasl_oauthbearer_method_roles={"GET":["karapace.schema:read","karapace.schema:write"],"POST":["karapace.schema:write"],"PUT":["karapace.schema:write"],"DELETE":["karapace.schema:write"]}'
```

Replace `SERVICE_NAME` with the name of your Aiven for Apache Kafka service.

</TabItem>
</Tabs>

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

- `ACCESS_TOKEN`: A valid JWT from your identity provider.
- `SCHEMA_REGISTRY_URL`: The Schema Registry URL from **Connection information**.

This example sends a `GET` request.

- If only OIDC authentication is enabled, any client with a valid token can
  send the request.
- If role-based authorization is also enabled, the token must include a role
  allowed for `GET`. With the default mapping, the allowed roles are
  `karapace.schema:read` and `karapace.subject:read`.

Before sending `POST`, `PUT`, or `DELETE` requests, configure an allowed role
for the corresponding method. The default mapping blocks these methods.

## Disable OIDC authentication and authorization

To disable OIDC authentication and role-based authorization, set both options
to **Disabled**.

Disabling OIDC authentication does not disable basic authentication.

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
