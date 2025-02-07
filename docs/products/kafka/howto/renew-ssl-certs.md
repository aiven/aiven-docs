---
title: Renew and acknowledge service user SSL certificates
---
Aiven for Apache Kafka® automatically generates a new SSL certificate for service users about three months before the existing certificate's expiration date. This new certificate includes a renewed private key.

## SSL certificate renewal schedule

SSL certificates for Aiven for Apache Kafka® services are valid for 820 days,
approximately two years, and three months. This renewal involves regenerating the
SSL certificate and its private key to enhance security. Renewal notifications are
sent to project administrators, operators, and technical contacts. The current
certificate stays valid until expiration to ensure a smooth transition.

## Download the new SSL certificates

Once renewed, you can download the new SSL certificate from the [Aiven Console](https://console.aiven.io/),
[Aiven API](https://api.aiven.io/doc/), or [Aiven CLI](/docs/tools/cli).

If your Aiven for Apache Kafka service has a certificate about
to expire, the [Aiven Console](https://console.aiven.io/) will display a notification on
the service page, prompting you to download the new certificate.

To download the new certificate,

1. Access the [Aiven Console](https://console.aiven.io/).
1. Select your Aiven for Apache Kafka service.
1. Click **Users** in the sidebar.
1. Select the required user and click **Show access key** and **Show access cert** to
   download the new certificate.

:::note
You can also use the Aiven CLI command [`avn service user-creds-download`](/docs/tools/cli/service/user#avn_service_user_creds_download) to download the renewed SSL certificate and key.
:::

## Acknowledge new SSL certificate usage

Confirm that the new certificate is in use to stop receiving notifications about
certificate expiration.

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
