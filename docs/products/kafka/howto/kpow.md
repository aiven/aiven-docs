---
title: Use Kpow with Aiven for Apache Kafka®
---

[Kpow by Factor House](https://factorhouse.io/products/kpow) is an enterprise solution for Kafka management and monitoring.

Kpow supports **Aiven for Apache Kafka®**. Use Kpow to monitor, manage, and explore your
managed Kafka brokers, Karapace Schema Registry, and Standalone Kafka Connect services.

## Cluster authentication

Aiven supports multiple authentication methods. Configure Kpow to connect using the
method that matches your cluster security settings.

:::info
Aiven secures connections over TLS. Download the CA Certificate, `ca.pem`,
from the Aiven Console and provide it to Kpow as your SSL Truststore.
Kpow supports raw PEM files, so no `keytool` conversion to Java Keystores, `.jks`, is required.
:::

### SASL/SCRAM

Aiven supports SASL/SCRAM authentication. Find your username, password, and the specific
 Suggest revising to: `Aiven supports SASL/SCRAM authentication. In the Aiven Console, find your username, password, and SASL port on the **Connection information** page.

Set the following connection variables:

```properties
SECURITY_PROTOCOL=SASL_SSL
SASL_MECHANISM=SCRAM-SHA-256
SASL_JAAS_CONFIG=org.apache.kafka.common.security.scram.ScramLoginModule required username="<SASL_USERNAME>" password="<SASL_PASSWORD>";
SSL_TRUSTSTORE_LOCATION=/path/to/ca.pem
SSL_TRUSTSTORE_TYPE=PEM
```

### Mutual TLS

Aiven utilizes mTLS for cluster authentication. Historically, connecting a Java-based Kafka
client required using `keytool` to convert your downloaded certificates into a Java
Aiven uses mTLS for cluster authentication. Java-based Kafka clients often require using `keytool` to convert downloaded certificates into Java keystore format.

Kpow eliminates this hurdle by providing support for raw PEM files. Do not convert your
certificates to JKS. Use the files exactly as they are downloaded from the Aiven
Kpow supports raw PEM files directly, so you do not need to convert certificates to JKS. Use the files as downloaded from the Aiven Console: `ca.pem`, `service.cert`, and `service.key`.

First, combine your access key and certificate into a single keystore file:

```bash
cat service.key service.cert > keystore.pem
```

Then, configure Kpow with the following properties:

```properties
SECURITY_PROTOCOL=SSL
SSL_TRUSTSTORE_LOCATION=/path/to/ca.pem
SSL_TRUSTSTORE_TYPE=PEM
SSL_KEYSTORE_LOCATION=/path/to/keystore.pem
SSL_KEYSTORE_TYPE=PEM
```

### OAuth/OIDC

Aiven supports [OpenID Connect](/docs/products/kafka/howto/enable-oidc) for identity
federation. If your cluster is configured for OIDC, connect Kpow using standard Kafka
Aiven supports [OpenID Connect](/docs/products/kafka/howto/enable-oidc) for identity federation. If your cluster uses OIDC, configure Kpow with standard Kafka OAuth properties:

```properties
SECURITY_PROTOCOL=SASL_SSL
SASL_MECHANISM=OAUTHBEARER
SASL_LOGIN_CALLBACK_HANDLER_CLASS=org.apache.kafka.common.security.oauthbearer.secured.OAuthBearerLoginCallbackHandler
SASL_OAUTHBEARER_TOKEN_ENDPOINT_URL=<YOUR_OIDC_TOKEN_ENDPOINT>
SASL_JAAS_CONFIG=org.apache.kafka.common.security.oauthbearer.OAuthBearerLoginModule required clientId="<CLIENT_ID>" clientSecret="<CLIENT_SECRET>";
SSL_TRUSTSTORE_LOCATION=/path/to/ca.pem
SSL_TRUSTSTORE_TYPE=PEM
```

## Access control

Aiven uses **Apache Kafka ACLs** for data-plane authorization.

After connecting Kpow using your chosen authentication method, configure the connecting
user with the appropriate [Aiven ACLs](/docs/products/kafka/concepts/acl) to access
After connecting Kpow, configure the connecting user with the appropriate [Aiven ACLs](/docs/products/kafka/concepts/acl) to access topics and consumer groups.

Kpow provides support for managing these ACLs. See the [ACL management documentation](https://docs.factorhouse.io/kpow/management/acls) for
details.

## Ecosystem integration

If you have provisioned related managed services in Aiven, integrate them into Kpow.

### Aiven Schema Registry

Aiven provides a managed Schema Registry, Karapace, that integrates with Kpow. It relies
Aiven provides Karapace Schema Registry, which integrates with Kpow. It uses Basic Authentication (`USER_INFO`).

Configure Kpow with the following properties:

```properties
SCHEMA_REGISTRY_NAME=Aiven Schema Registry
SCHEMA_REGISTRY_URL=<SCHEMA_REGISTRY_URL>
SCHEMA_REGISTRY_AUTH=USER_INFO
SCHEMA_REGISTRY_USER=<SCHEMA_USERNAME>
SCHEMA_REGISTRY_PASSWORD=<SCHEMA_PASSWORD>
```

### Aiven Kafka Connect

Aiven offers two types of Kafka Connect deployments: **Integrated** and **Standalone**.
Because Kpow requires the standard Kafka Connect REST API to monitor and manage
connectors, it only supports the **Standalone** Aiven Connect service. Aiven's
integrated offering does not expose this public REST URL.

:::warning Service integration required
Creating a Standalone Connect service in Aiven is not enough. Link the Connect service to
your Kafka service in the Aiven Console. Click **Manage Integrations**. If you skip this
step, Aiven returns a 503 Service Unavailable error, and Kpow fails to start.
:::

Configure your Standalone Connect cluster with the following properties:

```properties
CONNECT_NAME=Aiven Connect
CONNECT_REST_URL=<CONNECT_REST_URL>
CONNECT_AUTH=BASIC
CONNECT_BASIC_AUTH_USER=<CONNECT_USERNAME>
CONNECT_BASIC_AUTH_PASS=<CONNECT_PASSWORD>
```

## Aiven considerations and limitations

### Retention policy fix

If you use an Aiven Free plan, or a paid plan with strict admin-configured retention
limits, Kpow crashes on startup with a `PolicyViolationException`. This happens because
Kpow attempts to auto-create its internal audit log topic, `__oprtr_audit_log`, with
infinite retention, `retention.ms` set to `-1`, which Aiven rejects to prevent runaway
disk usage.

To fix this, manually pre-create the `__oprtr_audit_log` topic in your Aiven Console
before launching Kpow. Set the Cleanup Policy to `delete` and the `retention_ms` to a
finite number allowed by your plan limit, for example `259200000` for 3 days. Kpow
detects the existing topic, bypasses auto-creation, and starts successfully.

## Quickstart

This command starts a Kpow container configured to connect to Aiven using SASL/SCRAM,
alongside the Schema Registry and Standalone Connect integrations.

Because Kpow supports PEM files, map the downloaded `ca.pem` file directly into the Docker
container.

:::info License requirements
To run Kpow, provide your license details via the `LICENSE_` environment variables shown
in the command below. Obtain these values from your welcome email or the Factor House
license portal. If you do not have a license, [request a free 30-day trial][1].
:::

[1]: https://account.factorhouse.io/cta_action/provision_license_type?code=KPOW_TRIAL

```bash
docker run -p 3000:3000 \
  -v $(pwd)/ca.pem:/etc/kpow/ca.pem \
  --env BOOTSTRAP="<AIVEN_BOOTSTRAP_URL>:17060" \
  --env SECURITY_PROTOCOL="SASL_SSL" \
  --env SASL_MECHANISM="SCRAM-SHA-256" \
  --env SASL_JAAS_CONFIG='org.apache.kafka.common.security.scram.ScramLoginModule required username="<SASL_USERNAME>" password="<SASL_PASSWORD>";' \
  --env SSL_TRUSTSTORE_LOCATION="/etc/kpow/ca.pem" \
  --env SSL_TRUSTSTORE_TYPE="PEM" \
  --env SSL_ENDPOINT_IDENTIFICATION_ALGORITHM="" \
  --env SCHEMA_REGISTRY_NAME="Aiven Schema Registry" \
  --env SCHEMA_REGISTRY_URL="<SCHEMA_REGISTRY_URL>" \
  --env SCHEMA_REGISTRY_AUTH="USER_INFO" \
  --env SCHEMA_REGISTRY_USER="<SCHEMA_USERNAME>" \
  --env SCHEMA_REGISTRY_PASSWORD="<SCHEMA_PASSWORD>" \
  --env CONNECT_NAME="Aiven Connect" \
  --env CONNECT_REST_URL="<CONNECT_REST_URL>" \
  --env CONNECT_AUTH="BASIC" \
  --env CONNECT_BASIC_AUTH_USER="<CONNECT_USERNAME>" \
  --env CONNECT_BASIC_AUTH_PASS="<CONNECT_PASSWORD>" \
  --env LICENSE_ID="<LICENSE_ID>" \
  --env LICENSE_CODE="<LICENSE_CODE>" \
  --env LICENSEE="<LICENSEE>" \
  --env LICENSE_EXPIRY="<LICENSE_EXPIRY>" \
  --env LICENSE_SIGNATURE="<LICENSE_SIGNATURE>" \
  factorhouse/kpow:latest
```

:::info
These steps do not configure Kpow authorization. To restrict user actions in Kpow, see
[Simple Access Control][2] on the Factor House site.
:::

[2]: https://factorhouse.io/community

After the container starts, open `http://localhost:3000` to access the Kpow UI.

![Kpow - Aiven](/images/content/products/kafka/kpow.png)

:::tip Kpow Community
To explore Kafka locally or for non-commercial use, [grab a free Community license][3]
and use the `factorhouse/kpow-ce` Docker image.
:::

[3]: https://factorhouse.io/community
