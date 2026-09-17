---
title: TLS/SSL certificates
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages"

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
- **Aiven for MySQL®** requires the Aiven project CA certificate to connect when using
  `VERIFY_CA` or `VERIFY_IDENTITY` as the SSL mode. `VERIFY_CA` requires the client to
  verify that the server certificate is signed by the Aiven CA, while `VERIFY_IDENTITY`
  also validates the hostname. For more information, see the [MySQL
  documentation](https://dev.mysql.com/doc/refman/8.4/en/using-encrypted-connections.html).
- **Aiven for Apache Kafka®** supports different authentication methods:
  - **Client certificate**. The client authenticates with a client certificate and key.
    This method requires the Aiven project CA certificate, the client certificate, and
    the client key.
  - **SASL over SSL**. The client authenticates with a service username and password.
    Communication is encrypted with the project CA certificate by default. You can
    enable the `letsencrypt_sasl` setting to use a public CA instead of the project CA.
    For details, see [Enable and configure SASL authentication](/docs/products/kafka/howto/kafka-sasl-auth).
- **Aiven for Valkey™** uses a browser-recognized (Let's Encrypt) certificate by
  default, so no CA certificate download is required. Services created before this
  certificate mode was enabled still use the Aiven project CA certificate. If the
  <ConsoleLabel name="overview"/> page for your service offers a CA certificate to
  download, your service uses the project CA. There's no self-service option to use
  the project CA certificate for a service that uses a browser-recognized certificate.
  To request this, [open a support ticket](/docs/platform/howto/support). For details,
  see [Manage SSL connectivity in Aiven for Valkey™](/docs/products/valkey/howto/manage-ssl-connectivity).

You can download the project CA certificates from the <ConsoleLabel name="overview"/>
page of your service. For steps, see [Download the project CA certificates](/docs/platform/concepts/tls-ssl-certificates#download-ca-certificates).

:::note
Some older services use the Aiven project CA certificate. To switch to a
browser-recognized certificate, [open a support ticket](/docs/platform/howto/support).
:::

## Certificate rotation

To keep certificates secure, Aiven periodically rotates the project CA certificate,
even though its listed expiration date can be many years away. Project CA
certificates are valid for 10 years, and Aiven automatically starts rotating a
certificate about 6 months before it expires. All services in a project share the
same CA, so a rotation happens at the project level, but each service picks up the
new certificate during its own maintenance window. Because of this, services in
the same project can start trusting the new certificate at different times.

During a rotation, your service trusts both the current and the new CA certificate.
This overlap is sometimes called a certificate bundle. If your client verifies the
server certificate against a specific CA, for example using PostgreSQL's
`verify-ca` or `verify-full` modes, or MySQL's `VERIFY_CA` or `VERIFY_IDENTITY`
modes, update your client to trust the new certificate in the bundle before the
rotation completes. Otherwise, your client can't verify the server certificate and
the connection fails.

Aiven sends an email notification to your project and service contacts before a
certificate rotation. Confirm that your
[project and service contacts](/docs/platform/howto/technical-emails) are up to date
so that you receive these notifications.

## Download CA certificates

If your service needs a CA certificate, download one:

1. Open your service's <ConsoleLabel name="overview"/> page.
1. In the **Connection information** section, find **CA Certificate** and
   click <ConsoleLabel name="download"/>.

You can also use the `avn service user-creds-download` [CLI](/docs/tools/cli/service/user#avn_service_user_creds_download):

```bash
avn service user-creds-download --username <username> <service-name>
```

<RelatedPages/>

- [Manage project and service notifications](/docs/platform/howto/technical-emails)
- [Service maintenance, updates and upgrades](/docs/platform/concepts/maintenance-window)
- [Manage SSL connectivity in Aiven for Valkey™](/docs/products/valkey/howto/manage-ssl-connectivity)
- [Support](/docs/platform/howto/support)
