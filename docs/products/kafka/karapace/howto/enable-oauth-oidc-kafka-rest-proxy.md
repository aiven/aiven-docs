---
title: Enable OAuth2/OIDC support for Apache Kafka® REST proxy
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"
import ConsoleIcon from "@site/src/components/non-swizzled/ConsoleIcons"

Secure your Apache Kafka® resources by integrating OAuth 2.0/OpenID Connect (OIDC) with the Karapace REST proxy and enabling REST proxy authorization.
This setup ensures that only authorized individuals can manage Apache Kafka resources
through both token-based authentication and access control rules.

## OAuth2/OIDC token handling

Karapace processes the JSON Web Token (JWT) obtained from the
Authorization HTTP header, specifically when employing the Bearer
authentication scheme. This allows OAuth2/OIDC credentials to be
supplied directly to the REST proxy, which uses the provided token to
authorize requests to Apache Kafka. When a Bearer token is presented,
Kafka clients configured by Karapace use the SASL OAUTHBEARER mechanism
to send the JWT for validation.

## Authorization enforcement

In the underlying Aiven for Apache Kafka® service, the default mechanism
for authorization, uses the `sub` claim from the JWT as the username.
This username is then verified against the configured Access Control
Lists (ACLs) to authorize user operations on Apache Kafka resources.

While the `sub` claim is the default identifier, this setting is
configurable. You can specify a different JWT claim for authentication
by adjusting the `kafka.sasl_oauthbearer_sub_claim_name` parameter. For
more information on configuring this, see
[Enable OAuth2/OIDC via Aiven Console](/docs/products/kafka/howto/enable-oidc).

To authenticate and authorize a user in Aiven for Apache Kafka, you need a service user
and an ACL entry that describes the permissions. The JWT claim value used for
authentication should explicitly match the service user in the system. This service
user needs to be associated with an ACL entry that outlines their permissions, ensuring
that the identity of the user making the request aligns with both the service user
and the ACL entry.

## Managing token expiry

With OAuth2/OIDC enabled, Karapace manages Apache Kafka client connections for
security and performance. It automatically cleans up idle clients and
those with tokens nearing expiration, typically on a 5-minute cycle.
This cleanup prevents unauthorized access with expired tokens and clears
idle connections.

:::note
Before your token expires, remove any linked consumers and producers to
avoid security issues and service interruptions. After removal, refresh
your OAuth2 JWT tokens and reconnect with the new tokens.
:::

## Configure OAuth2/OIDC authentication

To establish OAuth2/OIDC authentication for the Karapace REST proxy,
complete the following prerequisites and configuration steps:

### Prerequisites

-   [Aiven for Apache Kafka®](/docs/products/kafka/get-started) service running with
    [OAuth2/OIDC enabled](/docs/products/kafka/howto/enable-oidc).
-   [Karapace schema registry and REST APIs enabled](/docs/products/kafka/karapace/howto/enable-karapace).
-   Ensure access to an OIDC-compliant provider, such as Auth0, Okta,
    Google Identity Platform, or Azure.

### Configuration steps

<Tabs groupId="config-methods">
<TabItem value="console" label="Aiven Console" default>

1. In the [Aiven Console](https://console.aiven.io/), select your
   project and choose your Aiven for Apache Kafka® service.
1. Click <ConsoleLabel name="Service settings"/>.
1. Go to **Advanced configuration** and click **Configure**.
1. In the **Advanced configuration** window, click
   <ConsoleIcon name="Add config options"/>.
1. Find the `kafka_rest_authorization` parameter and set it to `Enabled`.
1. Click **Save configurations**.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

To enable REST proxy authorization, use the following command in the
[Aiven CLI](/docs/tools/cli), replacing `SERVICE_NAME` with your actual service name:

```bash
avn service update -c kafka_rest_authorization=true SERVICE_NAME
```

Disable REST proxy authorization, use:

```bash
avn service update -c kafka_rest_authorization=false SERVICE_NAME
```

</TabItem>
</Tabs>

:::warning
Enabling Apache Kafka REST proxy authorization can disrupt access for
users if the Kafka access control rules have not been configured
properly. For more information, see
[Enable Apache Kafka® REST proxy authorization](/docs/products/kafka/karapace/howto/enable-kafka-rest-proxy-authorization).
:::

## Related pages

- [Enable OAUTH2/OIDC authentication for Aiven for Apache Kafka](/docs/products/kafka/howto/enable-oidc)
