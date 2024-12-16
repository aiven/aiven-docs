---
title: TLS/SSL certificates
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

All traffic to Aiven services is always protected by TLS. It ensures that third parties can't eavesdrop or modify the data while in transit between Aiven services and the clients accessing them.

Every Aiven project has its own private Certificate Authority (CA) which
is used to sign certificates that are used internally by the Aiven
services to communicate between different cluster nodes and to Aiven
management systems.

Some service types uses the Aiven project's CA for
external connections. To access these services, download the
CA certificate and configure it on your browser or client.

For other services a browser-recognized CA is used, which is normally
already marked as trusted in browsers and operating systems, so
downloading the CA certificate is not normally required.

:::note
All the services in a project share the same Certificate Authority (CA).
:::

## Certificate requirements

Most of our services use a browser-recognized CA certificate, but there
are exceptions:

- **Aiven for PostgreSQL®** requires the Aiven project CA certificate
  to connect when using `verify-ca` or
  `verify-full` as `sslmode`. The first mode requires the
  client to verify that the server certificate is actually emitted by
  the Aiven CA, while the second provides maximum security by
  performing HTTPS-like validation on the hostname as well. The
  default `sslmode=require` ensures TLS is used when connecting to
  the database, but does not verify the server certificate. For more
  information, see the [PostgreSQL
  documentation](https://www.postgresql.org/docs/current/ssl-tcp.html)
- **Aiven for Apache Kafka®** requires the Aiven project CA
  certificate, and also the client key and certificate.

For these services you can
[Download CA certificates](/docs/platform/concepts/tls-ssl-certificates#download-ca-certificates)
from **Overview** page of your service.

:::note
Older/existing services may be using the Aiven project's CA, you can
request switching to a browser-recognized certificate by opening support
ticket and letting us know.
:::

## Download CA certificates

If your service needs a CA certificate, download one:

1. Open your service's <ConsoleLabel name="overview"/> page.
1. In the **Connection information** section, find **CA Certificate** and
   click <ConsoleLabel name="download"/>.

You can also use the `avn service user-creds-download` [CLI](/docs/tools/cli/service/user#avn_service_user_creds_download):

```bash
avn service user-creds-download --username <username> <service-name>
```
