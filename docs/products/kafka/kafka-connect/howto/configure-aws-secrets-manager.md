---
title: Configure AWS Secrets Manager
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Configure and use AWS Secrets Manager as a secret provider in Aiven for Apache Kafka® Connect services.

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io/).
- Aiven for Apache Kafka service with Apache Kafka Connect set up and running. For setup
  instructions, see [Aiven for Apache Kafka with Kafka Connect documentation](/docs/products/kafka/kafka-connect/get-started).
- [Aiven CLI](/docs/tools/cli).
- [AWS Secrets Manager access key and secret key](https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access.html).

## Configure secret providers

Set up AWS Secrets Manager in your Aiven for Apache Kafka Connect service to manage and
access sensitive information.

<Tabs groupId="config-methods">
<TabItem value="api" label="API" default>

Use the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
API to update your service configuration. Add the AWS Secrets Manager configuration
to the `user_config` using the following API request:

```sh
curl --request PUT \
  --url https://api.aiven.io/v1/project/{PROJECT_NAME}/service/{SERVICE_NAME} \
  --header 'Authorization: Bearer YOUR_BEARER_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
    "user_config": {
      "secret_providers": [
        {
          "name": "aws",
          "aws": {
            "auth_method": "credentials",
            "region": "your-aws-region",
            "access_key": "your-aws-access-key",
            "secret_key": "your-aws-secret-key"
          }
        }
      ]
    }
  }'
```

Parameters:

- `url`: API endpoint for updating the service configuration. Replace
  `PROJECT_NAME` and `SERVICE_NAME` with your actual project and service names.
- `Authorization`: Header for authentication. Replace `YOUR_BEARER_TOKEN` with your
  actual [Aiven API token](/docs/platform/howto/create_authentication_token).
- `Content-Type`: Specifies that the request body is in JSON format.
- `auth_method`: Authentication method used by AWS Secrets Manager. In this case,
  it is `credentials`.
- `region`: AWS region where your secrets are stored.
- `access_key`: Your AWS access key.
- `secret_key`: Your AWS secret key.

</TabItem>
<TabItem value="cli" label="CLI">

Add AWS Secrets Manager using the [Aiven CLI](/docs/tools/cli):

```bash
avn service update SERVICE_NAME \
  -c secret_providers='[
    {
      "name": "aws",
      "aws": {
        "auth_method": "credentials",
        "region": "your-aws-region",
        "access_key": "your-aws-access-key",
        "secret_key": "your-aws-secret-key"
      }
    }
  ]'

```

Parameters:

- `PROJECT_NAME`: Name of your Aiven project.
- `SERVICE_NAME`: Name of your Aiven Kafka service.
- `name`: Name of the secret provider. In this case, `aws`.
- `auth_method`: Authentication method used by AWS Secrets Manager. In this case, it is credentials.
- `region`: AWS region where your secrets are stored.
- `access_key`: Your AWS access key.
- `secret_key`: Your AWS secret key.

</TabItem>
</Tabs>

## Reference secrets in connector configurations

After configuring the secret providers, you can reference secrets in your
connector configurations.

### JDBC sink connector

<Tabs groupId="reference-secrets-sink">
<TabItem value="api" label="API" default>

Configure a JDBC sink connector using the API with secrets referenced from
AWS Secrets Manager.

```sh
curl --request POST \
  --url https://api.aiven.io/v1/project/{PROJECT_NAME}/service/{SERVICE_NAME}/connectors \
  --header 'Authorization: Bearer YOUR_BEARER_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "YOUR_CONNECTOR_NAME",
    "connector.class": "io.aiven.connect.jdbc.JdbcSinkConnector",
    "connection.url": "jdbc:{DATABASE_TYPE}://{HOST}:{PORT}/{DATABASE_NAME}?user=${aws:PATH/TO/SECRET:USERNAME}&password=${aws:PATH/TO/SECRET:PASSWORD}&ssl=require",
    "topics": "YOUR_TOPIC",
    "auto.create": true
  }'

```

Parameters:

- `PROJECT_NAME`: Name of your Aiven project.
- `SERVICE_NAME`: Name of your Aiven Kafka service.
- `name`: Name of the connector.
- `connector.class`: Specifies the connector class to use, in this case,
  `io.aiven.connect.jdbc.JdbcSinkConnector`.
- `connection.url`: JDBC connection URL with placeholders for `DATABASE_TYPE`, `HOST`,
  `PORT`, `DATABASE_NAME`, and the username and password retrieved from AWS Secrets
  Manager.
- `topics`: Apache Kafka topic where the data can be sent.
- `auto.create`: If `true`, the connector automatically creates the table in the
  target database if it does not exist.

</TabItem>
<TabItem value="cli" label="CLI">

Configure a JDBC sink connector using the Aiven CLI with secrets referenced
from AWS Secrets Manager.

```bash
avn service connector create SERVICE_NAME '{
  "name": "jdbc-sink-connector",
  "connector.class": "io.aiven.connect.jdbc.JdbcSinkConnector",
  "connection.url": "jdbc:{DATABASE_TYPE}://{HOST}:{PORT}/{DATABASE_NAME}?user=${aws:PATH/TO/SECRET:USERNAME}&password=${aws:PATH/TO/SECRET:PASSWORD}&ssl=require",
  "topics": "your-topic",
  "auto.create": true
}'
```

Parameters:

- `SERVICE_NAME`: Name of your Aiven for Apache Kafka service.
- `name`: Name of the connector.
- `connector.class`: Specifies the connector class to use, in this case,
  `io.aiven.connect.jdbc.JdbcSinkConnector`.
- `connection.url`: JDBC connection URL with placeholders for `DATABASE_TYPE`, `HOST`,
  `PORT`, `DATABASE_NAME`, and the username and password retrieved from AWS Secrets
  Manager.
- `topics`: Apache Kafka topic where the data can be sent.
- `auto.create`: If `true`, the connector automatically creates the table in the
  target database if it does not exist.

</TabItem>
</Tabs>

### JDBC source connector

<Tabs groupId="reference-secrets-source">
<TabItem value="api" label="API" default>

Configure a JDBC source connector using the API with secrets referenced from
AWS Secrets Manager.

```sh
curl -X POST https://api.aiven.io/v1/project/{PROJECT_NAME}/service/{SERVICE_NAME}/connectors \
  -H "Authorization: Bearer YOUR_BEARER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
        "name": "your-source-connector-name",
        "connector.class": "io.aiven.connect.jdbc.JdbcSourceConnector",
        "connection.url": "jdbc:{DATABASE_TYPE}://{HOST}:{PORT}/{DATABASE_NAME}?ssl=require",
        "connection.user": "${aws:PATH/TO/SECRET:USERNAME}",
        "connection.password": "${aws:PATH/TO/SECRET:PASSWORD}",
        "incrementing.column.name": "id",
        "mode": "incrementing",
        "table.whitelist": "your-table",
        "topic.prefix": "your-prefix_",
        "auto.create": "true"
      }'
```

Parameters:

- `PROJECT_NAME`: Name of your Aiven project.
- `SERVICE_NAME`: Name of your Aiven for Apache Kafka service.
- `name`: Name of the connector.
- `connector.class`: Specifies the connector class to use, in this case,
  `io.aiven.connect.jdbc.JdbcSinkConnector`.
- `connection.url`: JDBC connection URL with placeholders for `DATABASE_TYPE`, `HOST`,
  `PORT`, `DATABASE_NAME`, and the username and password retrieved from AWS Secrets
  Manager.
- `connection.user`: Database username retrieved from AWS Secrets Manager
- `connection.password`: Database password retrieved from AWS Secrets Manager.
- `incrementing.column.name`: Column used for incrementing mode.
- `mode`: Mode of operation, in this case, `incrementing`.
- `table.whitelist`: Tables to include.
- `topic.prefix`: Prefix for Apache Kafka topics.
- `auto.create`: If `true`, the connector automatically creates the table in
  the target database if it does not exist.

</TabItem>
<TabItem value="cli" label="CLI">

Configure a JDBC source connector using the Aiven CLI with secrets referenced from
AWS Secrets Manager.

```bash
avn service connector create SERVICE_NAME '{
  "name": "jdbc-source-connector",
  "connector.class": "io.aiven.connect.jdbc.JdbcSourceConnector",
  "connection.url": "jdbc:{DATABASE_TYPE}://{HOST}:{PORT}/{DATABASE_NAME}?ssl=require",
  "connection.user": "${aws:PATH/TO/SECRET:USERNAME}",
  "connection.password": "${aws:PATH/TO/SECRET:PASSWORD}",
  "incrementing.column.name": "id",
  "mode": "incrementing",
  "table.whitelist": "your-table",
  "topic.prefix": "your-prefix_",
  "auto.create": true
}'
```

Parameters:

- `SERVICE_NAME`: Name of your Aiven for Apache Kafka service.
- `name`: Name of the connector.
- `connector.class`: Specifies the connector class to use, in this case,
  `io.aiven.connect.jdbc.JdbcSinkConnector`.
- `connection.url`:JDBC connection URL with placeholders for `DATABASE_TYPE`, `HOST`,
  `PORT`, `DATABASE_NAME`, and the username and password retrieved from AWS Secrets
  Manager.
- `connection.user`: Database username retrieved from AWS Secrets Manager
- `connection.password`: Database password retrieved from AWS Secrets Manager.
- `incrementing.column.name`: Column used for incrementing mode.
- `mode`: Mode of operation, in this case, `incrementing`.
- `table.whitelist`: Tables to include.
- `topic.prefix`: Prefix for Apache Kafka topics.
- `auto.create`: If `true`, the connector automatically creates the table in
  the target database if it does not exist.

</TabItem>
</Tabs>
