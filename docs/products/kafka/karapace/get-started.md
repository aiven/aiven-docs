---
title: Get started with Karapace
sidebar_label: Get started
keywords: [quick start]
---

To use Karapace, enable **Karapace schema registry** and **REST APIs** on your Aiven for Apache Kafka® service.
For instructions, see
[Enable Karapace schema registry and REST APIs](/docs/products/kafka/karapace/howto/enable-karapace).

## Next steps

- Use [schema references for Avro and Protobuf](/docs/products/kafka/karapace/concepts/schema-references)
  to reuse shared schemas across subjects.
- Read about [Karapace schema registry authorization](/docs/products/kafka/karapace/concepts/schema-registry-authorization)
  and [schema registry ACL definitions](/docs/products/kafka/karapace/concepts/acl-definition).
- Enable [Karapace schema registry authorization](/docs/products/kafka/karapace/howto/enable-schema-registry-authorization).
  Manage access in [Manage schema registry authorization](/docs/products/kafka/karapace/howto/manage-schema-registry-authorization).
- Enable [OAuth2/OIDC for the Apache Kafka® REST proxy](/docs/products/kafka/karapace/howto/enable-oauth-oidc-kafka-rest-proxy)
  and [Apache Kafka® REST proxy authorization](/docs/products/kafka/karapace/howto/enable-kafka-rest-proxy-authorization).

## More resources

- To manage Kafka schema registry ACL resources with Terraform, refer to
  [Manage resources via Terraform](/docs/products/kafka/karapace/howto/manage-schema-registry-authorization).
- To set up Karapace with Aiven for Apache Kafka® using Terraform, refer to the
  [Aiven provider for Terraform](https://registry.terraform.io/providers/aiven/aiven/latest/docs)
  and the [`aiven_kafka` resource documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/kafka).
