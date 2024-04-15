---
title: Apache Kafka® REST proxy authorization
---

The Apache Kafka® REST proxy authorization, when
[enabled](/docs/products/kafka/karapace/howto/enable-karapace) on your Aiven for Apache Kafka® service, allows the
delegation of user authentication and authorization to Apache Kafka.
Karapace will forward the HTTP basic authentication credentials to
Apache Kafka, and Apache Kafka then performs the authentication and
authorization based on the
[ACLs](/docs/products/kafka/concepts/acl).

Apache Kafka® REST proxy authorization is **disabled** by default on all
Aiven for Apache Kafka® services.

## Related pages

-   [Enable OAuth2/OIDC support for Apache Kafka® REST proxy](/docs/products/kafka/karapace/howto/enable-oauth-oidc-kafka-rest-proxy)
-   [Enable Apache Kafka® REST proxy authorization](/docs/products/kafka/karapace/howto/enable-kafka-rest-proxy-authorization)
