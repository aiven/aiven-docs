---
title: Renew and acknowledge service user SSL certificates
---

In every Aiven for Apache Kafka® service, when the existing service user
SSL certificate is close to expiration (approximately 3 months before
the expiration date), a new certificate is automatically generated,
including the renewal of the private key.

## SSL certificate renewal schedule

SSL certificates for Aiven for Apache Kafka® services remain valid for
820 days (approximately 2 years and 3 months). To ensure uninterrupted
service and enhance security, these certificates are renewed every 2
years as a proactive measure.

Each renewal process involves regenerating both the SSL certificate and
its private key, reinforcing security and preserving integrity.
Notifications about certificate renewals are sent to project admins,
operators, and technical contacts associated with the service.

The existing certificate stays operational until its expiration date,
allowing for a seamless transition to the new certificate.

## Download the new SSL certificates

The renewed SSL certificate is immediately available for download in the
[Aiven Console](https://console.aiven.io/),
[API](https://api.aiven.io/doc/), and
[Aiven CLI](/docs/tools/cli) after the
notification.

When accessing the [Aiven Console](https://console.aiven.io/) service
page for the Aiven for Apache Kafka service with expiring certificates,
you will be notified with the following message:

![Apache Kafka service user SSL certificate expiring message](/images/products/kafka/ssl-cert-renewal.png)

To download the new certificate,

1.  Access the [Aiven Console](https://console.aiven.io/)
2.  Select the Aiven for Apache Kafka service for which you want to
    download the new certificate.
3.  Click on the **Users** from the sidebar.
4.  Select the required user and click **Show access key** and **Show
    access cert** to download the new certificate.

![Apache Kafka service user SSL certificate and access key download](/images/products/kafka/new-ssl-cert-download.png)

:::note
You can download the renewed SSL certificate and key using the
[dedicated Aiven CLI command](/docs/tools/cli/service/user#avn_service_user_creds_download) `avn service user-creds-download`
:::

## Acknowledge new SSL certificate usage

To stop receiving notifications about certificate expiration, you must
confirm that the new certificate is in use.

To acknowledge the new SSL certificate with the [Aiven
Console](https://console.aiven.io/):

-   Select `...` next to the certificate.
-   Select `Acknowledge certificate`.

:::note
You can acknowledge the renewed SSL certificate using the
[dedicated Aiven CLI command](/docs/tools/cli/service/user#avn_service_user_creds_acknowledge) `avn service user-creds-acknowledge`

The same can be achieved with the Aiven API, using the \"Modify service
user credentials\"
[endpoint](https://api.aiven.io/doc/#operation/ServiceUserCredentialsModify):

``` 
curl --request PUT \
    --url https://api.aiven.io/v1/project/<project>/service/<service>/user/<username> \
    --header 'Authorization: Bearer <bearer token>' \
    --header 'content-type: application/json' \
    --data '{"operation": "acknowledge-renewal"}'
```
:::
