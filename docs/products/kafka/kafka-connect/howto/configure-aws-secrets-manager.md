---
title: Configure AWS Secrets Manager
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Configure and use AWS Secrets Manager as a secret provider in Apache Kafka® Connect services on Aiven for Apache Kafka®.

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io/).
- Aiven for Apache Kafka service with Apache Kafka Connect set up and running. For setup
  instructions, see [Aiven for Apache Kafka with Kafka Connect documentation](https://aiven.io/docs/products/kafka/kafka-connect/get-started).
- [Aiven CLI](/docs/tools/cli)
- [AWS Secrets Manager access key and secret key](https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access.html)

## Configure secret providers

Set up AWS Secrets Manager in your Aiven for Apache Kafka Connect service to securely
manage and access sensitive information.

<Tabs groupId="config-methods">
<TabItem value="api" label="API" default>

Add the AWS Secrets Manager configuration to the `user_config`:

```sh
curl --request PUT \
  --url https://api.aiven.io/v1/project/{project_name}/service/{service_name} \
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
  `{project_name}` and `{service_name}` with your actual project and service names.
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

Add AWS Secrets Manager using the Aiven CLI:

```bash
avn service update kafka-connect \
-c secret_providers='[
    {
        "aws": {
            "access_key": "<replace_with_your_access_key>",
            "auth_method": "credentials",
            "region": "your-aws-region",
            "secret_key": "<replace_with_your_secret_key>"
        },
        "name": "aws"
    }
]'
```

Parameters:

- `auth_method`: Authentication method used by AWS Secrets Manager. In this case,
  it is `credentials`.
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

Reference secrets in the JDBC sink connector configuration using the following
API request:

```sh
curl -X POST https://api.aiven.io/v1/project/<project_name>/service/<service_name>/connectors \
  -H "Authorization: Bearer <your_auth_token>" \
  -H "Content-Type: application/json" \
  -d '{
        "name": "your-sink-connector-name",
        "connector.class": "io.aiven.connect.jdbc.JdbcSinkConnector",
        "connection.url": "jdbc:postgresql://host:port/dbname?user=${aws:path/to/secret:username}&password=${aws:path/to/secret:password}&ssl=require",
        "topics": "your-topic",
        "auto.create": "true"
      }'
```

Parameters:

- `name`: Name of the connector.
- `connector.class`: Specifies the connector class to use, in this case,
  `io.aiven.connect.jdbc.JdbcSinkConnector`.
- `connection.url`: JDBC connection URL, with placeholders for the username and password
  retrieved from AWS Secrets Manager.
- `topics`: Apache Kafka topic where the data can be sent.
- `auto.create`: If `true`, the connector automatically creates the table in the
  target database if it does not exist.

</TabItem>
<TabItem value="cli" label="CLI">

Reference secrets in the JDBC sink connector configuration using the following
CLI command:

```sh
avn service user-config set kafka-connect -c name=your-sink-connector-name \
-c connector.class=io.aiven.connect.jdbc.JdbcSinkConnector \
-c connection.url="jdbc:postgresql://host:port/dbname?user=${aws:path/to/secret:username}&password=${aws:path/to/secret:password}&ssl=require" \
-c topics=your-topic \
-c auto.create=true
```

Parameters:

- `name`: Name of the connector.
- `connector.class`: Specifies the connector class to use, in this case,
  `io.aiven.connect.jdbc.JdbcSinkConnector`.
- `connection.url`: JDBC connection URL, with placeholders for the username and password
  retrieved from AWS Secrets Manager.
- `topics`: Apache Kafka topic where the data can be sent.
- `auto.create`: If `true`, the connector automatically creates the table in the
  target database if it does not exist.

</TabItem>
</Tabs>

### JDBC source connector

<Tabs groupId="reference-secrets-source">
<TabItem value="api" label="API" default>

Reference secrets in the JDBC source connector configuration using the following
API request:

```sh
curl -X POST https://api.aiven.io/v1/project/<project_name>/service/<service_name>/connectors \
  -H "Authorization: Bearer <your_auth_token>" \
  -H "Content-Type: application/json" \
  -d '{
        "name": "your-source-connector-name",
        "connector.class": "io.aiven.connect.jdbc.JdbcSourceConnector",
        "connection.url": "jdbc:postgresql://your-postgresql-host:your-port/defaultdb?ssl=require",
        "connection.user": "${aws:path/to/secret:username}",
        "connection.password": "${aws:path/to/secret:password}",
        "incrementing.column.name": "id",
        "mode": "incrementing",
        "table.whitelist": "your-table",
        "topic.prefix": "your-prefix_",
        "auto.create": "true"
      }'

```

Parameters:

- `name`: Name of the connector.
- `connector.class`: Specifies the connector class to use, in this case,
  `io.aiven.connect.jdbc.JdbcSinkConnector`.
- `connection.url`: JDBC connection URL, with placeholders for the username and
  password retrieved from AWS Secrets Manager.
- `connection.user`: Database username retrieved from AWS Secrets Manager
- `connection.password`: Database password retrieved from AWS Secrets Manager.
- `incrementing.column.name`: Column used for incrementing mode.
- `mode`: Mode of operation, in this case, `incrementing`.
- `table.whitelist`: Tables to include.
- `topic.prefix`: Prefix to use for Apache Kafka topics.
- `auto.create`: If `true`, the connector automatically creates the table in
  the target database if it does not exist.

</TabItem>
<TabItem value="cli" label="CLI">

Reference secrets in the JDBC source connector configuration using the following
CLI command:

```sh
avn service user-config set kafka-connect -c name=your-source-connector-name \
-c connector.class=io.aiven.connect.jdbc.JdbcSourceConnector \
-c connection.url="jdbc:postgresql://your-postgresql-host:your-port/defaultdb?ssl=require" \
-c connection.user="${aws:path/to/secret:username}" \
-c connection.password="${aws:path/to/secret:password}" \
-c incrementing.column.name=id \
-c mode=incrementing \
-c table.whitelist=your-table \
-c topic.prefix=your-prefix_ \
-c auto.create=true

```

Parameters:

- `name`: Name of the connector.
- `connector.class`: Specifies the connector class to use, in this case,
  `io.aiven.connect.jdbc.JdbcSinkConnector`.
- `connection.url`: JDBC connection URL, with placeholders for the username and
  password retrieved from AWS Secrets Manager.
- `connection.user`: Database username retrieved from AWS Secrets Manager
- `connection.password`: Database password retrieved from AWS Secrets Manager.
- `incrementing.column.name`: Column used for incrementing mode.
- `mode`: Mode of operation, in this case, `incrementing`.
- `table.whitelist`: Tables to include.
- `topic.prefix`: Prefix to use for Apache Kafka topics.
- `auto.create`: If `true`, the connector automatically creates the table in
  the target database if it does not exist.

</TabItem>
</Tabs>
