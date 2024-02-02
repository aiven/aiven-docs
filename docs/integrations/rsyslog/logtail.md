---
title: Send Aiven logs to Logtail
---

[Logtail](https://betterstack.com/logs) is a logging service. You can use the Aiven [Remote syslog integration](/docs/integrations/rsyslog) to send your
logs to Logtail.

1.  Set up an Rsyslog source on Logtail. Choose **Connect source**, give
    your source a **Name**, and select \"Rsyslog\" as the **Platform**.
2.  Copy the **Source token** of your new source to configure
    the Aiven side of the integration.
3.  Create the service integration on Aiven. Choose **Integration
    endpoints** in the web console, click **Syslog** and choose **Add
    new endpoint**.
4.  Configure the new endpoint:
    -   Set an **Endpoint name** for this integration

    -   **Server**: `in.logtail.com`

    -   **Port**: `6514`

    -   **Format**: `custom`

    -   Now replace `YOUR_LOGTAIL_SOURCE_TOKEN` in the log template
        below with the token you copied in step 2, and paste into the
        **Log template** field:

        ```text
        <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% %procid% %msgid% [logtail@11993 source_token="YOUR_LOGTAIL_SOURCE_TOKEN"] %msg%
        ```
5.  Add your new logs integration to any of your Aiven services (more
    information
    [in the Rsyslog article](/docs/integrations/rsyslog#add_rsyslog_integration))
6.  Check the **Live tail** page on Logtail to see the logs coming in.

## Create the Logtail service integration endpoint with Aiven client

To use the CLI, use the following command to
create the service integration endpoint. Replace the placeholder with
your token:

```bash
avn service integration-endpoint-create --project your-project \
-d logtail -t rsyslog \
-c server=in.logtail.com -c port=6514 \
-c tls=true -c format=custom \
-c logline='<%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% %procid% %msgid% [logtail@11993 source_token="TOKEN-FROM-LOGTAIL"] %msg%'
```

This replaces steps 3 and 4 above.
