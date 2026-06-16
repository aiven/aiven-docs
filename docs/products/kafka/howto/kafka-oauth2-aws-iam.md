---
title: Set up Kafka OAuth 2.0/OIDC authentication with AWS IAM using Outbound Identity Federation
sidebar_label: OAuth 2.0/OIDC with AWS IAM
---

import RelatedPages from "@site/src/components/RelatedPages";

Use AWS IAM Outbound Identity Federation to authenticate Kafka clients with OAuth 2.0/OIDC.
This lets AWS IAM principals connect to Aiven for Apache Kafka® without managing
separate credentials by using short-lived JWTs issued by AWS STS.

## Prerequisites

Before you begin, make sure you have:

- An [Aiven for Apache Kafka](/docs/products/kafka/get-started/create-kafka-service)
  service with
  [SASL authentication](/docs/products/kafka/howto/kafka-sasl-auth#enable-sasl-authentication)
  enabled.
- The [Aiven CLI](/docs/tools/cli) installed.
- The [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
  installed.

Define the audience value, typically as your Kafka service hostname. Replace `SERVICE_NAME` with your value:

```bash
AUDIENCE=$(avn service get SERVICE_NAME --json | jq .user_config.kafka.sasl_oauthbearer_expected_audience)
```

## Step 1: Enable Outbound Identity Federation in AWS

Enable Outbound Identity Federation for your AWS account:

```bash
aws iam enable-outbound-web-identity-federation
```

## Step 2: Verify IAM permissions

Your AWS user must be attached an IAM policy that allows
the `sts:GetWebIdentityToken` action with a condition matching the audience.

The following example policy grants the minimum required permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": "sts:GetWebIdentityToken",
    "Resource": "*",
    "Condition": {
      "ForAllValues:StringEquals": {
        "sts:IdentityTokenAudience": "${AUDIENCE}"
      },
      "NumericLessThanEquals": {
        "sts:DurationSeconds": 3600
      }
    }
  }]
}
```

## Step 3: Retrieve the issuer URL

Get the issuer URL from your AWS account configuration:

```bash
ISSUER_URL=$(aws iam get-outbound-web-identity-federation-info | jq -r .IssuerIdentifier)
```

The issuer URL is in the form `https://<uuid>.tokens.sts.global.api.aws`.

## Step 4: Update your Aiven for Apache Kafka service

Configure your Kafka service with the OIDC settings from the previous step.
Replace `PROJECT_NAME` and `SERVICE_NAME` with your values:

```bash
avn service update --project PROJECT_NAME SERVICE_NAME \
  -c kafka.sasl_oauthbearer_jwks_endpoint_url="${ISSUER_URL}/.well-known/jwks.json" \
  -c kafka.sasl_oauthbearer_expected_issuer="${ISSUER_URL}" \
  -c kafka.sasl_oauthbearer_expected_audience="${AUDIENCE}" \
  -c kafka.sasl_oauthbearer_sub_claim_name="sub"
```

:::note
This command triggers a rolling restart of your Apache Kafka brokers. Apply it
during a maintenance window to minimize impact.
:::

For details on each parameter, see [OIDC parameters](/docs/products/kafka/howto/enable-oidc#oidc-parameters).

## Step 5: Configure Kafka ACLs for your IAM principal

The JWT issued by AWS STS contains the IAM principal ARN as the `sub` claim.
Aiven for Apache Kafka uses this value directly as the Kafka principal, so your
ACLs must reference the full ARN prefixed with `User:`.

Use the Aiven CLI to add the required ACLs. Replace `PROJECT_NAME`, `SERVICE_NAME`,
and the ARN with your values:

```bash
# Allow describe (required for both producers and consumers)
avn service kafka-acl-add --project PROJECT_NAME SERVICE_NAME \
  --permission allow \
  --principal "User:arn:aws:iam::123456789012:user/my-iam-user" \
  --operation Describe \
  --resource-type topic \
  --pattern-type literal \
  --resource-name my-topic

# Allow produce
avn service kafka-acl-add --project PROJECT_NAME SERVICE_NAME \
  --permission allow \
  --principal "User:arn:aws:iam::123456789012:user/my-iam-user" \
  --operation Write \
  --resource-type topic \
  --pattern-type literal \
  --resource-name my-topic

# Allow consume (topic)
avn service kafka-acl-add --project PROJECT_NAME SERVICE_NAME \
  --permission allow \
  --principal "User:arn:aws:iam::123456789012:user/my-iam-user" \
  --operation Read \
  --resource-type topic \
  --pattern-type literal \
  --resource-name my-topic

# Allow consume (consumer group)
avn service kafka-acl-add --project PROJECT_NAME SERVICE_NAME \
  --permission allow \
  --principal "User:arn:aws:iam::123456789012:user/my-iam-user" \
  --operation Read \
  --resource-type group \
  --pattern-type literal \
  --resource-name my-consumer-group
```

To verify the ACLs are in place:

```bash
avn service kafka-acl-list --project PROJECT_NAME SERVICE_NAME
```

Expected output:

```text
ID              PERMISSION_TYPE  PRINCIPAL                                              OPERATION  RESOURCE_TYPE  PATTERN_TYPE  RESOURCE_NAME      HOST
==============  ===============  =====================================================  =========  =============  ============  =================  ====
acl5baf3a5cada  ALLOW            User:arn:aws:iam::123456789012:user/my-iam-user        Describe   Topic          LITERAL       my-topic           *
acl5baf3a77c15  ALLOW            User:arn:aws:iam::123456789012:user/my-iam-user        Write      Topic          LITERAL       my-topic           *
acl5baf3a60d8f  ALLOW            User:arn:aws:iam::123456789012:user/my-iam-user        Read       Topic          LITERAL       my-topic           *
acl5baf3ab8316  ALLOW            User:arn:aws:iam::123456789012:user/my-iam-user        Read       Group          LITERAL       my-consumer-group  *
```

## Step 6: Configure your Kafka client

Your client must request a JWT from AWS STS at runtime and use it to authenticate
with the Kafka service via `OAUTHBEARER`.

<details>
<summary>Python example</summary>

Install the required libraries:

```bash
pip install confluent-kafka boto3 PyJWT
```

Download the CA certificate for your service from the Aiven Console, then use the
following code:

```python
from confluent_kafka import Producer, Consumer
import boto3
import jwt

# Aiven Kafka config
KAFKA_BOOTSTRAP = "<your-service-hostname>:<port>"
CA_CERT_PATH = "ca.pem"  # Download from the Aiven Console
AUDIENCE = "<your-kafka-service-hostname>"  # Must match the server-side audience setting


def fetch_token_from_aws_sts(config):
    """
    Fetches a short-lived JWT from AWS STS.

    Equivalent to:
        aws sts get-web-identity-token \
            --audience "<AUDIENCE>" \
            --signing-algorithm RS256 \
            --duration-seconds 3600
    """
    sts_client = boto3.client("sts")
    response = sts_client.get_web_identity_token(
        Audience=[AUDIENCE],
        DurationSeconds=3600,
        SigningAlgorithm="RS256",
    )
    token = response["WebIdentityToken"]
    expiry = response["Expiration"].timestamp()
    return token, expiry


# Verify token fetch before connecting (fail fast)
token, expiry = fetch_token_from_aws_sts(None)
decoded = jwt.decode(token, options={"verify_signature": False})
print(decoded)

# Client config
kafka_config = {
    "bootstrap.servers": KAFKA_BOOTSTRAP,
    "security.protocol": "SASL_SSL",
    "sasl.mechanism": "OAUTHBEARER",
    "oauth_cb": fetch_token_from_aws_sts,
    "ssl.ca.location": CA_CERT_PATH,
}

# Producer example
delivery_errors = []


def delivery_callback(err, msg):
    if err:
        delivery_errors.append(err)
    else:
        print(
            f"Message produced to {msg.topic()} [{msg.partition()}] at offset {msg.offset()}"
        )


producer = Producer(kafka_config)
producer.produce("my-topic", key="key", value="hello from OIDC", callback=delivery_callback)
if delivery_errors:
    raise RuntimeError(f"Message delivery failed: {delivery_errors[0]}")
producer.flush()

# Consumer example
consumer_config = {
    **kafka_config,
    "group.id": "my-consumer-group",
    "auto.offset.reset": "earliest",
}
consumer = Consumer(consumer_config)
consumer.subscribe(["my-topic"])
try:
    while True:
        msg = consumer.poll(timeout=5.0)
        if msg is None:
            print("No message received.")
            break
        if msg.error():
            print(f"Consumer error: {msg.error()}")
            continue
        print(f"Received: {msg.value().decode('utf-8')}")
finally:
    consumer.close()
```

</details>

<details>
<summary>Java example</summary>

Implement a custom `AuthenticateCallbackHandler` that calls
`GetWebIdentityToken` and refreshes the token before it expires.
Pass the handler class to your Kafka client configuration:

```properties
bootstrap.servers=<your-service-hostname>:<port>
security.protocol=SASL_SSL
sasl.mechanism=OAUTHBEARER
sasl.jaas.config=org.apache.kafka.common.security.oauthbearer.OAuthBearerLoginModule required;
sasl.login.callback.handler.class=<your-handler-that-calls-GetWebIdentityToken-and-refreshes-the-token-before-it-expires>
```

Your handler should:

1. Call the AWS SDK `StsClient.getWebIdentityToken()` with the configured audience and
   a signing algorithm.
2. Return the token and its expiration time.
3. Proactively refresh the token before it expires to avoid authentication failures.

</details>

## Step 7 (optional): Disable other authentication mechanisms

To use only OAuth 2.0/OIDC authentication, you can now disable all other
SASL authentication mechanisms. Replace `SERVICE_NAME` with your value:

```bash
avn service update SERVICE_NAME \
  -c "kafka_sasl_mechanisms.plain=false" \
  -c "kafka_sasl_mechanisms.scram_sha_256=false" \
  -c "kafka_sasl_mechanisms.scram_sha_512=false"
```

<RelatedPages/>

- [Enable OAuth 2.0/OIDC authentication for Apache Kafka®](/docs/products/kafka/howto/enable-oidc)
- [Enable and configure SASL authentication](/docs/products/kafka/howto/kafka-sasl-auth)
