---
title: Create an Aiven for Apache Kafka® service
sidebar_label: Create a Kafka service
keywords:
  [
    create kafka service,
    kafka free tier,
    kafka developer tier,
    kafka professional tier,
    kafka byoc,
  ]
---

import RelatedPages from "@site/src/components/RelatedPages";

Choose the procedure for your service tier and deployment model.

If you have not chosen a service tier, see
[Aiven for Apache Kafka® service tiers](/docs/products/kafka/get-started/service-tiers).

## Aiven Cloud

The following table maps each service tier to a create procedure.

| Service tier | Create with | Procedure |
| ------------ | ----------- | --------- |
| Free | Aiven Console | [Create a Free tier service](/docs/products/kafka/free-tier/create-free-tier-kafka-service) |
| Developer | Aiven Console or Skills | [Create a Developer tier service](/docs/products/kafka/dev-tier/create-dev-tier-kafka-service) |
| Professional | Aiven Console, CLI, Terraform, or Skills | [Create a Professional tier service](/docs/products/kafka/get-started/create-kafka-service) |

## Bring Your Own Cloud

To create a Professional tier service in your own cloud account, see
[Create an Apache Kafka® service with BYOC](/docs/products/kafka/get-started/create-kafka-service-byoc).

Before you create the service, [create a custom cloud](/docs/platform/howto/byoc/create-cloud/create-custom-cloud)
to connect your cloud account to Aiven.
For more information about this deployment model, see
[Bring your own cloud](/docs/platform/concepts/byoc).

## Next steps

When the service status is **Running**:

- [Stream sample data from the Aiven Console](/docs/products/kafka/howto/generate-sample-data)
- [Connect to Aiven for Apache Kafka®](/docs/products/kafka/howto/list-code-samples)

<RelatedPages />

- [Get started with Aiven for Apache Kafka®](/docs/products/kafka/get-started/get-started-kafka)
- [Aiven for Apache Kafka® service tiers](/docs/products/kafka/get-started/service-tiers)
- [Pricing for Aiven for Apache Kafka®](/docs/products/kafka/concepts/kafka-pricing)
