---
title: Send logs to Datadog
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Use the Aiven Rsyslog integration to send logs from your Aiven services to your external Datadog account.

## Prerequisites

- A Datadog [API key](https://docs.datadoghq.com/account_management/api-app-keys/)
- A running Aiven service

## Add a Syslog integration endpoint

You can use this integration endpoint for multiple services.

1.  In the project, click <ConsoleLabel name="integration endpoints"/>.
1.  Select **Syslog** > **Create new** or **Add new endpoint**.
1.  Enter an **Endpoint name**.
1.  Configure the **Server**:
      - For the US region enter `intake.logs.datadoghq.com`.
      - For the EU region use `tcp-intake.logs.datadoghq.eu`.
1.  Configure the **Port**:
      - For the US region enter `10516`.
      - For the EU region enter `443`.
1.  Enable **TLS**.
1.  Set the **Format** to `custom`.
1.  To configure the **Log Template**, enter:
    ```text
    DATADOG_API_KEY <%pri%>1 %timestamp:::date-rfc3339% %HOSTNAME%.AIVEN_PROJECT_NAME %app-name% - - - %msg%
    ```
    Where:
    - `DATADOG_API_KEY` is your Datadog API key.
    - `AIVEN_PROJECT_NAME` is the name of the project your service is in.

      :::note
      Datadog correlates metrics and logs by hostname. The integration
      appends the project name to the hostname to disambiguate between services
      with the same name in different projects. However, without the project name
      no log data is lost.
      :::

    Don't edit the values surrounded by `%`, such as `%msg%`, as these are used in
    constructing the log line.

    For example:
    ```text
    01234567890123456789abcdefabcdef <%pri%>1 %timestamp:::date-rfc3339% %HOSTNAME%.example-project %app-name% - - - %msg%
    ```

1.  Click **Create**.

## Send logs from an Aiven service to Datadog

1.  In the service, click **Integrations**.
1.  In the **Endpoint integrations** select **Rsyslog**.
1.  Select the integration endpoint you created and click **Enable**.

## Related pages

- Learn more about [Datadog and Aiven](/docs/integrations/datadog).
- [Monitor PgBouncer with Datadog](/docs/products/postgresql/howto/monitor-pgbouncer-with-datadog).
- Enable
  [database monitoring with Datadog](/docs/products/postgresql/howto/monitor-database-with-datadog).
