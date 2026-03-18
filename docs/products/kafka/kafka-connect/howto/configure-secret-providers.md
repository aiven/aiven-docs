---
title: Aiven for Apache Kafka® Connect secret providers
---

Configure and use secret providers in Apache Kafka Connect services on Aiven for Apache Kafka.
Securely reference secrets stored in external secret managers within your connector configurations, ensuring that sensitive information is not stored in plain text.

## What are secret providers?

Secret providers are tools that manage sensitive information, such as passwords
and API keys, in a secure manner. Instead of directly including these secrets in your
configuration files, secret providers allow you to store them securely in external
secret managers like AWS Secrets Manager and HashiCorp Vault, or in encrypted
service configuration with the ENV secret provider.
Aiven for Apache Kafka Connect dynamically retrieves these secrets when needed, enhancing
the security of your setup.

## Supported secret managers

- [AWS Secrets Manager](/docs/products/kafka/kafka-connect/howto/configure-aws-secrets-manager)
  - **Auth method**: `credentials`
  - **Required parameters**: `access key`, `secret key`
- [HashiCorp Vault](/docs/products/kafka/kafka-connect/howto/configure-hashicorp-vault)
  - **Auth method**: `token`
  - **Required parameters**: `token`, `address`
- [ENV secret provider](/docs/products/kafka/kafka-connect/howto/configure-env-secret-provider)
  - **Auth method**: not applicable
  - **Required parameters**: `name`, `env.secrets`
