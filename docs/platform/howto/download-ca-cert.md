---
title: Download CA certificates
---

If your service needs a CA certificate, download it through the [Aiven
Console](https://console.aiven.io) by accessing the **Overview** page
for the specific service. In the **Connection information** section,
find **CA Certificate**, and select the download icon in the same line.

Or, you can use the `avn`
[command-line tool](/docs/tools/cli) with
the following command:

``` 
avn service user-creds-download --username <username> <service-name>
```

Read more:
[TLS/SSL certificates](/docs/platform/concepts/tls-ssl-certificates)
