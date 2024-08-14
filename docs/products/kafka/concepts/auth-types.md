---
title: Authentication types
---

Use modern encryption protocols to protect data in transit with Apache Kafka®. Aiven for Apache Kafka® provides multiple options to secure your data.

## Transport Layer Security

**Transport Layer Security (TLS)**, also known as Secure Sockets Layer (SSL),
is a standard for securing Internet traffic. This method relies on a certificate
provided by a Certificate Authority (for example,
[letsencrypt.org](https://letsencrypt.org)). With this certificate and the right
technical setup, you can use your domain to encrypt traffic to your service.

By default, Aiven enables TLS encryption for all **Aiven for Apache Kafka** services
and helps with the application, renewal, and configuration of certificates.

You can use TLS in two ways:

- **TLS encryption** : Your Apache Kafka client validates the
  certificate for your Apache Kafka broker.
- **TLS authentication** : Your Apache Kafka client validates the
  certificate for your Apache Kafka broker and your broker validates
  the certificate for your client.

## Simple Authentication and Security Layer

**Simple Authentication and Security Layer (SASL)** allows alternative login
methods for your service.

Aiven for Apache Kafka supports the following SASL mechanisms:

- **PLAIN**: Uses a combination of username and password to log in over a TLS
  connection, ensuring encrypted traffic. For security reasons, Aiven does not support
  SASL/PLAIN without TLS, as this would allow anyone to read your credentials when sent.
- **SCRAM-SHA-256**: Uses the Salted Challenge Response Authentication Mechanism (SCRAM)
  with SHA-256 hashing to identify clients without sending plain-text passwords. It does
  not reveal the password to servers that do not already have it.
- **SCRAM-SHA-512**: Similar to SCRAM-SHA-256 but uses SHA-512 hashing for added
  security. SCRAM works by creating a random `salt`, which is used to create an
  `identity` that holds:

  -   The `salt`
  -   The number of iterations to use (4096 by default)
  -   `StoredKey` (the hash of the client's key)
  -   `ServerKey`  (a key used by the server)

  By default, this identity is stored in Apache ZooKeeper™.

- **OAUTHBEARER**: Uses OAuth 2.0 tokens for authentication. This mechanism is enabled if
  the `sasl_oauthbearer_jwks_endpoint_url` is specified in the configuration. By default,
  it is disabled.

## Related pages

- [Enable SASL authentication](/docs/products/kafka/howto/kafka-sasl-auth)
- [Enable OIDC authentication for Aiven for Apache Kafka](/docs/products/kafka/howto/enable-oidc)


------------------------------------------------------------------------

*Apache ZooKeeper is a trademark of the Apache Software Foundation in
the United States and/or other countries*
