---
title: Configure a custom domain for Kafka REST API, Schema Registry, and Kafka Connect
sidebar_label: Configure custom domain
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Configure a custom domain to replace the default Aiven service hostname for Kafka REST API, Schema Registry, and Kafka Connect.

## About custom domains

Custom domains let you use your own domain name, such as `kafka.example.com`, instead of
the default Aiven service hostname for REST-based Kafka components.

Supported services include Kafka REST API, Schema Registry, and Kafka Connect.

Custom domains are not supported for Kafka broker endpoints that use the native Kafka
protocol.

## Prerequisites

- A running Aiven for Apache Kafka® service
- Permission to manage DNS records for your domain
- Access to the Aiven CLI or Aiven API

## Configure a custom domain

### Step 1: Create a DNS CNAME record

Create a `CNAME` record for your custom domain in your DNS provider.
Point the record to the Aiven hostname that matches custom domain certificate
provisioning.

Use the following target:

- `SUBDOMAIN.example.com` → `public-PROJECT_NAME-SERVICE_NAME.aivencloud.com`:
  Use this target for public access.
  Use this target for VPC or other private-network access when you configure
  `custom_domain`.
  Aiven creates the certificate for the `public-*` hostname and for your custom
  domain.

If your service uses a VPC or another private network path, clients can still use the
custom domain. The `CNAME` target remains `public-PROJECT_NAME-SERVICE_NAME.aivencloud.com`.
### Step 2: Configure the custom domain

Set the custom domain in the Kafka service configuration.

<Tabs groupId="config-methods">
<TabItem value="cli" label="CLI" default>

Configure the custom domain using Aiven CLI:

```bash
avn service update SERVICE_NAME \
  --user-config '{"custom_domain": "SUBDOMAIN.example.com"}'
```

Parameters:

- `SERVICE_NAME`: Name of your Aiven for Apache Kafka service.
- `custom_domain`: Custom domain for Kafka REST API, Schema Registry, and
  Kafka Connect.

</TabItem>
<TabItem value="api" label="API">

Use the
[ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
API to configure the custom domain for the service:

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
  --header 'Authorization: Bearer API_TOKEN' \
  --header 'content-type: application/json' \
  --data '{
    "user_config": {
      "custom_domain": "SUBDOMAIN.example.com"
    }
  }'
```

Parameters:

- `PROJECT_NAME`: Name of your project.
- `SERVICE_NAME`: Name of your service.
- `API_TOKEN`: API token for authentication.
- `custom_domain`: Custom domain for Kafka REST API, Schema Registry, and Kafka
  Connect.

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
https://SUBDOMAIN.example.com:PORT
```

Use the same port as the default Aiven endpoint.
