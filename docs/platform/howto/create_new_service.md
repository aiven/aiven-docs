---
title: Create a service
---

import CreateServiceDBLegacy from "@site/static/includes/create-service-console-db-legacy.md";
import RelatedPages from "@site/src/components/RelatedPages";

Create [Aiven services](/docs/products/services) to store your data, or stream it in real time.

## Create a database service

To create a [database service](/docs/products/services#databases) in Aiven Console:

<CreateServiceDBLegacy/>

## Create a Kafka service

Create an Apache Kafka service on Aiven by choosing a **cluster type**.

- **Inkless Kafka** uses throughput-based sizing and supports classic topics and, when
  enabled, diskless topics on Aiven cloud and Bring Your Own Cloud (BYOC).
- **Classic Kafka** uses fixed plans with local broker storage, with optional tiered
  storage when supported by the selected plan and cloud.

To compare cluster types and start service creation, see
[Create an Apache Kafka service on Aiven](/docs/products/kafka/get-started/create-kafka-service).

<RelatedPages/>

- Use the [Aiven Provider for Terraform](/docs/tools/terraform) to manage your services
- [Create a service using the Aiven CLI](/docs/tools/cli/service-cli#avn-cli-service-create)
- [Create service users](/docs/platform/howto/create_new_service_user)
