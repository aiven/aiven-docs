---
title: Send logs to Datadog
---

Use the Aiven Rsyslog integration to send the logs from your Aiven services to Datadog.

Before you begin, ensure you know:

- The region of your Datadog account.
- Your Datadog API key. Generate an API key for your Datadog account
  in the **Organization settings**, and click **API Keys** > **New Key**. Make sure to
  copy this key.
- An Aiven account with a project set up. You'll need the name of the
  project.

## Configure the integration

Start by configuring the link between Aiven and Datadog for logs. This
setup only needs to be done once.

1.  Log in to the [Aiven Console](https://console.aiven.io/), and select
    **Integration endpoints** from the left sidebar in the project page.
1.  Select **Syslog** from the list in the **Integration endpoints**
    screen, and select **Add new endpoint**.
1.  Configure the settings for the new endpoint:
    -   **Endpoint name** is how you will refer to this logs integration
        when linking it to other Aiven services
    -   **Server** and **Port** (leave TLS enabled):
        -   For region USA use `intake.logs.datadoghq.com` and `10516`
        -   For region EU use `tcp-intake.logs.datadoghq.eu` and `443`
    -   **Format** set to `custom`.
1.  Configure the **Log Template** field. You will need to replace the
    following values:

    | Variable             | Description                        |
    | -------------------- | ---------------------------------- |
    | `DATADOG_API_KEY`    | From your Datadog account settings |
    | `AIVEN_PROJECT_NAME` | Found in the web console           |

This is the format to use, replacing the variables listed. Don't edit
the values surrounded by `%` signs, such as `%msg%` as these are used in
constructing the log line:

```text
DATADOG_API_KEY <%pri%>1 %timestamp:::date-rfc3339% %HOSTNAME%.AIVEN_PROJECT_NAME %app-name% - - - %msg%
```

An example of the correct format, using an example API key and
`my_project` as the project name:

`01234567890123456789abcdefabcdef <%pri%>1 %timestamp:::date-rfc3339% %HOSTNAME%.my_project %app-name% - - - %msg%`

:::note
Metrics and logs are correlated in Datadog by hostname. The metrics
integration is currently configured to append the project name to the
hostname to disambiguate between services that have the same
name in different projects. Adding the project name to the hostname in
the syslog integration to Datadog assures that they can be correlated
again in the Datadog dashboard. Not doing so will not result in missing
logs, but the logs that appear in Datadog will miss tags that come from
this correlation with the metrics. See the [Datadog
documentation](https://docs.datadoghq.com/integrations/rsyslog).
:::

1.  Select **Create** to save the endpoint.

## Send logs from an Aiven service to Datadog

To send logs to Datadog:

1.  On the **Overview** page of your service, select **Integrations**
    from the sidebar, and select the **Rsyslog** option.

    ![Screenshot of system integrations including rsyslog](/images/integrations/rsyslog-service-integration.png)

1.  Pick the log integration you created earlier from the dropdown and
    choose **Enable**.

1.  Visit Datadog and look under \"Logs\" to see the data flowing within
    a few minutes.

## Related pages

- [Datadog and Aiven](/docs/integrations/datadog)
