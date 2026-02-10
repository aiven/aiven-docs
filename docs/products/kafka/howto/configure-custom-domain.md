---
title: Configure a custom domain for Kafka REST, Schema Registry, and Kafka Connect
sidebar_label: Configure custom domain
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Configure a custom domain to replace the default Aiven service hostname for Kafka REST API, Schema Registry, and Kafka Connect endpoints.

## About custom domains

Custom domains let you use your own domain name, such as `kafka.example.com`, instead of
the default Aiven service hostname for REST-based Kafka components.

Supported services include Kafka REST API, Schema Registry, and Kafka Connect.

Custom domains are not supported for Kafka broker endpoints that use the native Kafka
protocol.

## Prerequisites

- A running Aiven for Apache Kafka service
- Permission to manage DNS records for your domain
- Access to the Aiven CLI or Aiven API

## Configure a custom domain

### Step 1: Create a DNS CNAME record

Create a CNAME record for your custom domain in your DNS provider. The record must point
your custom domain to the Kafka service hostname.

Use one of the following targets:

- `subdomain.mydomain.com` → `project_name-service_name.aivencloud.com`
- `subdomain.mydomain.com` → `public-project_name-service_name.aivencloud.com`

Choose the target based on whether the service is accessed through private or public
networking.

### Step 2: Configure the custom domain

Set the custom domain in the Kafka service configuration.

<Tabs groupId="config-methods">
<TabItem value="cli" label="CLI" default>

Configure the custom domain for the service using the Aiven CLI:

```bash
avn service update <service-name> \
  --user-config '{"custom_domain": "subdomain.mydomain.com"}'
```

Parameters:

- `<service-name>`: Name of your Aiven for Apache Kafka service.
- `custom_domain`: Custom domain to use for Kafka REST API, Schema Registry, and
  Kafka Connect endpoints.

</TabItem>
<TabItem value="api" label="API">

Use the
[ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
API to configure the custom domain for the service:

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/YOUR_PROJECT_NAME/service/YOUR_SERVICE_NAME \
  --header 'Authorization: Bearer YOUR_BEARER_TOKEN' \
  --header 'content-type: application/json' \
  --data '{
    "user_config": {
      "custom_domain": "subdomain.mydomain.com"
    }
  }'
```

Parameters:

- `YOUR_PROJECT_NAME`: Name of your project.
- `YOUR_SERVICE_NAME`: Name of your service.
- `YOUR_BEARER_TOKEN`: API token for authentication.
- `custom_domain`: Custom domain to use for Kafka REST API, Schema Registry, and Kafka
  Connect endpoints.

</TabItem>
</Tabs>

### Step 3: Wait for certificate provisioning

After you configure the custom domain, Aiven automatically requests a TLS certificate
from Let’s Encrypt.

Certificate provisioning typically completes within a few minutes. No additional action
is required.

### Step 4: Update client configuration

Update client applications to use the custom domain and the existing service port.

```text
https://subdomain.mydomain.com:<port>
```

Use the same port that was previously used with the default Aiven endpoint.
