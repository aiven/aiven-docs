---
title: Log integration with Loggly
---

Aiven supports integrating logs with a number of external monitoring
systems that support rsyslog protocol, including
[Loggly](https://www.loggly.com/).

To integrate your service with Loggly, a new endpoint needs to be added
into the project that contains the service to integrate. This
can be done using through Aiven console or command line using
[Aiven CLI](/docs/tools/cli).

## Prerequisites

Before creating the integration, you will need to generate a Loggly
**customer token**. From the Loggly dashboard:

-   Go to **Source Setup** tab
-   Select **Customer Token** tab underneath it.
-   Generate a new custom token (or use a previously generated one) and
    copy its value.

## Define the Loggly integration endpoint

To create a Loggly integration using the [Aiven
Console](https://console.aiven.io):

-   Select the Project where the integration needs to be defined
-   Select **Integration endpoints**
-   Go to **Syslog** configuration
-   Define a new endpoint with the following parameters
    -   **Endpoint name** - the name for the endpoint (for example
        `Loggly`)
    -   **Server** - the Loggly hostname `logs-01.loggly.com`
    -   **Port** - the Loggly port `514`
    -   **TLS** - disabled (see below how to enable TLS with avn client)
    -   **Format** - `rfc5424`
    -   **Structured Data** - `TOKEN@NNNNN TAG="your-tag"` replacing
        -   `TOKEN` needs to be replaced with your Loggly **customer
            token** retrieved in the prerequisite stage
        -   `NNNNN` is Loggly Private Enterprise Number (PEN) which is
            `41058` (check [Loggly
            documentation](https://documentation.solarwinds.com/en/success_center/loggly/content/admin/streaming-syslog-without-using-files.htm)
            for up to date information)
        -   `your-tag` with any arbitrary tag value wrapped in double
            quotes

:::tip
You can automate the creation of a Loggly integration endpoint using the
[Aiven CLI dedicated command](/docs/tools/cli/service/integration#avn_service_integration_endpoint_create).
:::

## Enable the Loggly integration

To enable the Loggly integration for a particular Aiven service:

-   Open the service details in the [Aiven
    Console](https://console.aiven.io)
-   Browse to the **Service Integrations** option
-   Click **Manage Integrations** which will bring up a list of
    available integrations for your service
-   Select **Rsyslog** from the provided list
-   Click **Use integration**
-   Select the Loggly endpoint that you created in previous step
-   Click **Enable** to enable service integration.

After enabling this service integration, it will be shown as active in
the [Aiven Console](https://console.aiven.io), and the logs will be now
integrated with Loggly.

:::note
It may take a few moments to setup the new log, and you can track the
status on the **Overview** page of your service > the **Service
integrations** section.
:::

Your logs should now be visible on Loggly **Search** tab. Enter the tag
name your previously specified, for example `tag:your-tag`, and it will
populate the dashboard with the log events from the Aiven service.

:::tip
You can automate the creation of the Loggly integration using the
[Aiven CLI dedicated command](/docs/tools/cli/service/integration#avn_service_integration_create).
:::
