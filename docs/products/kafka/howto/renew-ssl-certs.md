---
title: Renew and acknowledge service user SSL certificates
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages"

Aiven for Apache Kafka® automatically generates a new SSL certificate for service users about three months before the existing certificate's expiration date. This new certificate includes a renewed private key.

Aiven also rotates the project certificate authority (CA) that signs these user
certificates. These are separate processes, and both can happen close together:

| Detail       | Service user certificate renewal                                                  | Project CA rotation                                                                                                                        |
| ------------ | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| What changes | The certificate and private key of one service user                               | The CA certificate that signs certificates in the project                                                                                  |
| When         | About three months before the user certificate expires                            | When the certificate approaches expiration, or for operational or security reasons, even if the expiration date is years away             |
| What you do  | Download and deploy the renewed certificate and key, then acknowledge the renewal | Update clients to trust the CA certificate bundle. Download and deploy the certificates that Aiven renews with the new CA, then acknowledge the renewals. |

## SSL certificate renewal schedule

SSL certificates for Aiven for Apache Kafka® services are valid for 820 days,
approximately two years and three months. This renewal involves regenerating the
SSL certificate and its private key to enhance security. Renewal notifications are
sent to project administrators, operators, and technical contacts. The current
certificate stays valid until expiration to ensure a smooth transition.

During a project CA rotation, Aiven also renews certificates that the previous CA
signed. For details, see
[Renewed certificates after a project CA rotation](#renewed-certificates-after-a-project-ca-rotation).

## Download the new SSL certificates

Once renewed, you can download the new SSL certificate from the [Aiven Console](https://console.aiven.io/),
[Aiven API](https://api.aiven.io/doc/), or [Aiven CLI](/docs/tools/cli).

If your Aiven for Apache Kafka service has a certificate about
to expire, the [Aiven Console](https://console.aiven.io/) will display a notification on
the service page, prompting you to download the new certificate.

To download the new certificate,

1. Access the [Aiven Console](https://console.aiven.io/).
1. Select your Aiven for Apache Kafka service.
1. Click **Access & Control** > **Users** in the sidebar.
1. Select the required user and click **Show access key** and **Show access cert** to
   download the new certificate.

:::note
You can also use the Aiven CLI command [`avn service user-creds-download`](/docs/tools/cli/service/user#avn_service_user_creds_download) to download the renewed SSL certificate and key.
:::

## Acknowledge new SSL certificate usage

Confirm that the new certificate is in use to stop receiving notifications about
certificate expiration.

:::important
Acknowledge a renewal only after all your clients use the new certificate. During a
project CA rotation, acknowledging lets Aiven retire the previous CA, and the previous
certificate then stops working.
:::

To acknowledge the new SSL certificate with the [Aiven Console](https://console.aiven.io/):

-   Select `...` next to the certificate.
-   Select `Acknowledge certificate`.

:::note
You can also use the Aiven CLI command [`avn service user-creds-acknowledge`](/docs/tools/cli/service/user#avn_service_user_creds_acknowledge) to acknowledge the user credentials.
Similarly, the Aiven API provides a way to acknowledge the new SSL certificate
through the [Modify service user credentials endpoint](https://api.aiven.io/doc/#operation/ServiceUserCredentialsModify):

```bash
curl --request PUT \
    --url https://api.aiven.io/v1/project/<project>/service/<service>/user/<username> \
    --header 'Authorization: Bearer <bearer token>' \
    --header 'content-type: application/json' \
    --data '{"operation": "acknowledge-renewal"}'
```
:::

## Renewed certificates after a project CA rotation

When Aiven rotates the project CA certificate, existing service users keep their
certificates, which the previous CA signed. After the new CA becomes active, Aiven
renews these certificates with the new CA. The new CA becomes active after all
services in the project complete the first
**Scheduled maintenance for TLS certificate update**. For the full sequence, see
[How a rotation works](/docs/platform/concepts/tls-ssl-certificates#how-a-rotation-works).

If your service users authenticate with client certificates, Aiven sends a renewal
notification to the project contacts. The notification lists the renewed service
users and the date when the previous certificates stop working. If the service
doesn't use client-certificate authentication, Aiven acknowledges the renewals
automatically and doesn't send a notification.

Before you deploy the renewed certificates, update your clients to trust the CA
certificate bundle. The bundle contains both the current and new CA certificates, so
clients can trust certificates signed by either CA during the rotation. For steps, see
[Download CA certificates](/docs/platform/concepts/tls-ssl-certificates#download-ca-certificates).

To switch your clients to the renewed certificates:

1. [Download the renewed certificate and key](#download-the-new-ssl-certificates) of
   each service user.
1. Deploy them to every client that uses the service user.
1. [Acknowledge the renewal](#acknowledge-new-ssl-certificate-usage).

Aiven retires the previous CA after every service presents a certificate signed by the
new CA and every renewal is acknowledged, or when the previous CA expires. After that,
certificates that the previous CA signed stop working, even before the date in the
notification. If you don't acknowledge a renewal, Aiven acknowledges it about a week
after the date in the notification.

### Reset credentials instead

To switch a service user to the new CA without waiting for the renewal, reset its
credentials after the new CA becomes active:

1. Open your service in the [Aiven Console](https://console.aiven.io/).
1. Click **Access & Control** > **Users** in the sidebar.
1. In the user row, click <ConsoleLabel name="actions" /> > <ConsoleLabel name="reset" />.
1. Click **Show access key** and **Show access cert** to download the new certificate
   and key. Deploy them to your application.

For a client-certificate user, a reset generates a new password, a new certificate,
and a new private key. The new CA signs the certificate. If the user also
authenticates with SASL, update those clients with the new password.

## Turn off certificate expiration notifications for SASL services

When using SASL authentication in Aiven for Kafka services, you might still receive
certificate expiration notifications, even if your service doesn't use certificates for
authorization. Aiven updates certificates across all services to maintain security
standards, which includes services that combine TLS encryption with SASL authentication.

To turn off these notifications:

1. Access the [Aiven Console](https://console.aiven.io/).
1. Select your Aiven for Apache Kafka service.
1. Click **Service settings** from the sidebar.
1. Scroll to **Advanced configurations**, and click **Configure**.
1. Click **Add configuration options**.
1. Search for `kafka_authentication_methods.certificate` and disable it.

<RelatedPages/>

- [TLS/SSL certificates](/docs/platform/concepts/tls-ssl-certificates)
- [Maintenance and updates for your Aiven for Apache Kafka® service](/docs/products/kafka/howto/maintenance-updates)
