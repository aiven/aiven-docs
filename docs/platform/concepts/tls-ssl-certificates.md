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

Some service types use the Aiven project's CA for
external connections. To access these services, download the
CA certificate and configure it on your browser or client.

For other services a browser-recognized CA is used, which is normally
already marked as trusted in browsers and operating systems, so
downloading the CA certificate is not normally required.

:::note
All the services in a project share the same Certificate Authority (CA).
:::

## Certificate requirements

Most Aiven services use a browser-recognized CA certificate, but there
are exceptions:

- **Aiven for PostgreSQL®** requires the Aiven project CA certificate
  to connect when using `verify-ca` or
  `verify-full` as `sslmode`. The first mode requires the
  client to verify that the server certificate is actually issued by
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

  If your clients trust the project CA certificate,
  [certificate rotation](#certificate-rotation) affects them.
- **Aiven for Valkey™** uses a browser-recognized (Let's Encrypt) certificate by
  default, so no CA certificate download is required. Services created before this
  certificate mode was enabled still use the Aiven project CA certificate. If the
  <ConsoleLabel name="overview"/> page for your service offers a CA certificate to
  download, your service uses the project CA. There's no self-service option to use
  the project CA certificate for a service that uses a browser-recognized certificate.
  To request this, [open a support ticket](/docs/platform/howto/support). For details,
  see [Manage SSL connectivity in Aiven for Valkey™](/docs/products/valkey/howto/manage-ssl-connectivity).
  If your service uses the project CA certificate, it also goes through periodic
  [certificate rotation](#certificate-rotation) like other services that use this CA.

You can download the project CA certificates from the <ConsoleLabel name="overview"/>
page of your service. For steps, see [Download CA certificates](#download-ca-certificates).

:::note
Some older services use the Aiven project CA certificate. To switch to a
browser-recognized certificate, [open a support ticket](/docs/platform/howto/support).
:::

## Certificate rotation

Aiven periodically rotates the project CA certificate, even if its expiration date is
years away. A rotation can happen when the certificate approaches expiration or for
other operational or security reasons.

### Check if a rotation affects your clients

A rotation affects you if your client verifies the server certificate against the
project CA certificate. This applies to:

- PostgreSQL clients that use `sslmode=verify-ca` or `verify-full`
- MySQL clients that use `VERIFY_CA` or `VERIFY_IDENTITY`
- Apache Kafka clients that trust the project CA certificate
- Clients of an older Aiven for Valkey service that still uses the project CA
  certificate

If your client is affected, download the certificate bundle and configure your client
to trust it before the second maintenance update. Otherwise, the client can't
verify the server certificate and the connection fails.

### How a rotation works

All services in a project share the same CA, so a rotation applies to the whole
project. Each service switches to the new CA certificate through two maintenance
updates. Both updates are named **Scheduled maintenance for TLS certificate update**.
They use the same [maintenance process](/docs/platform/concepts/maintenance-window)
as other updates and run during the maintenance window of each service.

1. **Aiven notifies you.** Aiven notifies your project and service contacts that an
   updated CA certificate bundle is available. The bundle contains both the current
   and new CA certificates.

1. **You update your clients.** Download the certificate bundle and configure your
   clients to trust it. Complete this step before the second maintenance update. For
   steps, see [Download CA certificates](#download-ca-certificates).

1. **Each service applies the first maintenance update.** After this update, the
   service accepts certificates signed by the new CA in addition to the current CA.
   The service still presents a certificate signed by the current CA, so your
   connections continue to work.

1. **The new CA becomes active.** This happens after all services in the project
   complete the first maintenance update. From this point, Aiven signs the
   certificates of new service users and credential resets with the new CA. If you
   use Kafka client-certificate authentication, reset the credentials of those
   service users after this step. For steps, see
   [Reset credentials after a project CA rotation](/docs/products/kafka/howto/renew-ssl-certs#reset-credentials-after-a-project-ca-rotation).

1. **Each service applies the second maintenance update.** Aiven schedules this
   update after the new CA becomes active. After this update, the service presents
   a certificate signed by the new CA. Clients that don't trust the new CA can no
   longer connect.

Services in the same project have separate maintenance windows, so they can be at
different steps at the same time.

To receive these notifications, make sure your
[project and service contacts](/docs/platform/howto/technical-emails) are up to date.

## Download CA certificates

During a certificate rotation, the CA certificate that you download contains both the
current and new CA certificates. Use it to update your clients.

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
- [Maintenance and updates for Aiven for Apache Kafka®](/docs/products/kafka/howto/maintenance-updates)
- [Renew and acknowledge service user SSL certificates](/docs/products/kafka/howto/renew-ssl-certs)
