---
title: Remote syslog integration
sidebar_label: Rsyslog
---

In addition to using Aiven for OpenSearch® to store the logs from your Aiven services, you can also integrate with an external monitoring system that supports the rsyslog protocol.

## Creating rsyslog integration

### Add rsyslog integration endpoint
<!-- vale off -->
Add the remote syslog you want to send
the log to into the project that contains the service you want to
integrate.
<!-- vale on -->
This can be configured from the **Integration endpoints** page in the
Aiven Console.

!["Create new Syslog endpoint" dialog](/images/content/integrations/remote-syslog-endpoint.png)

Another option is to use the [Aiven
Client](https://github.com/aiven/aiven-client) .

```bash
avn service integration-endpoint-create --project your-project \
    -d example-syslog -t rsyslog \
    -c server=logs.example.com -c port=514 \
    -c format=rfc5424 -c tls=true
```

When defining the remote syslog server the following parameters can be
applied using the `-c` switch.

Required:

-   `server` - DNS name or IPv4 address of the server
-   `port` - port to connect to
-   `format` - message format used by the server, this can be either
    `rfc3164` (the old BSD style message format), `rfc5424` (current
    syslog message format) or `custom`
-   `tls` - use TLS (as the messages are not filtered and may contain
    sensitive information, it is highly recommended to set this to true
    if the remote server supports it)

Conditional (required if `format` == `custom`):

-   `logline` - syslog log line template for a custom format, supporting
    limited rsyslog style templating (using `%tag%` ). Supported tags
    are: `HOSTNAME`, `app-name`, `msg`, `msgid`, `pri`, `procid`,
    `structured-data`, `timestamp` and `timestamp:::date-rfc3339`.

Optional:

-   `sd` - content of the structured data block of `rfc5424` message
-   `ca` - (PEM format) Certificate Authority to use for verifying the
    servers certificate (typically not needed unless the server's
    certificate is issued by an internal CA or it uses a self-signed
    certificate)
-   `key` - (PEM format) client key if the server requires client
    authentication
-   `cert` - (PEM format) client cert to use
-   `max_message_size` - Rsyslog maximum message size; default value: 8192

### Add rsyslog integration to service {#add_rsyslog_integration}

This can be configured in the [Aiven Console](https://console.aiven.io/)
by navigating to the **Overview** page of the target service > the
**Service integrations** section and selecting **Manage integrations**.

You should be able to select your previously configured Rsyslog service
integration by selecting **Enable** in the modal window.

Alternately, with the Aiven Client, first you need the id of the
endpoint previously created.

```bash
avn service integration-endpoint-list --project your-project

ENDPOINT_ID                           ENDPOINT_NAME   ENDPOINT_TYPE
====================================  ==============  =============
618fb764-5832-4636-ba26-0d9857222cfd  example-syslog  rsyslog
```

Then you can link the service to the endpoint.

```bash
avn service integration-create --project your-project \
    -t rsyslog -s your-service \
    -D 618fb764-5832-4636-ba26-0d9857222cfd
```

## Example configurations

Rsyslog is a standard integration so you can use it with any external
system. We have collected some examples of how to integrate with popular
third party platforms to get you started.

:::note
All integrations can be configured using the Aiven Console or the Aiven
CLI though the examples are easier to copy and paste in the CLI form.
:::

### Coralogix {#rsyslog_coralogix}

For a [Coralogix](https://coralogix.com/) integration, use a
custom `logline` format with your key and company ID.

The Syslog Endpoint to use for `server` depends on your account:

-   If it ends with `.com`, use `syslogserver.coralogix.com`.
-   If it ends with `.us`, use `syslogserver.coralogix.us`.
-   If it ends with `.in`, use `syslogserver.app.coralogix.in`.

See the Coralogix [Rsyslog](https://coralogix.com/docs/) documentation
for more information.

```bash
avn service integration-endpoint-create --project your-project \
    -d coralogix -t rsyslog \
    -c server=syslogserver.coralogix.us -c port=5142 \
    -c tls=false -c format=custom \
    -c logline="{\"fields\": {\"private_key\":\"YOUR_CORALOGIX_KEY\",\"company_id\":\"YOUR_COMPANY_ID\",\"app_name\":\"%app-name%\",\"subsystem_name\":\"programname\"},\"message\": {\"message\":\"%msg%\",\"program_name\":\"%programname%\",\"pri_text\":\"%pri%\",\"hostname\":\"%HOSTNAME%\"}}"
```

:::note
`tls` needs to be set to `false`.
:::

### Loggly® {#rsyslog_loggly}

For [Loggly](https://www.loggly.com/) integration, use a
custom `logline` format with your token.

```bash
avn service integration-endpoint-create --project your-project \
    -d loggly -t rsyslog \
    -c server=logs-01.loggly.com -c port=6514 \
    -c tls=true -c format=custom \
    -c logline='<%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% %procid% %msgid% TOKEN tag="RsyslogTLS"] %msg%'
```

### Mezmo (LogDNA) {#rsyslog_mezmo}

For [Mezmo](https://www.mezmo.com/) syslog integration, use a
custom `logline` format with your key.

```bash
avn service integration-endpoint-create --project your-project \
   -d logdna -t rsyslog \
   -c server=syslog-a.logdna.com -c port=6514 \
   -c tls=true -c format=custom \
   -c logline='<%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% %procid% %msgid% [logdna@48950 key="YOUR_KEY_GOES_HERE"] %msg%'
```

### New Relic {#rsyslog_new_relic}

For [New Relic](https://newrelic.com/) Syslog integration,
use a custom `logline` format with your license key. This is so you can
prepend your [New Relic License
Key](https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/#license-key)
and ensure the format matches the [built-in Grok
pattern](https://docs.newrelic.com/docs/logs/ui-data/built-log-parsing-rules/#syslog-rfc5424).

The value to use for `server` depends on the account location:

-   `newrelic.syslog.eu.nr-data.net` for an EU region account (the US
    endpoint will not work for an EU account)
-   `newrelic.syslog.nr-data.net` for other regions

For more information, see [Use TCP endpoint to forward logs to New
Relic](https://docs.newrelic.com/docs/logs/log-api/use-tcp-endpoint-forward-logs-new-relic/)

```bash
avn service integration-endpoint-create --project your-project \
    -d newrelic -t rsyslog \
    -c server=newrelic.syslog.nr-data.net -c port=6514 \
    -c tls=true -c format=custom \
    -c logline='YOUR_LICENSE_KEY <%pri%>%protocol-version% %timestamp:::date-rfc3339% %hostname% %app-name% %procid% %msgid% %structured-data% %msg%'
```

### Papertrail {#rsyslog_papertrail}

As [Papertrail](https://www.papertrail.com/) identifies the client based
on the server and port you only need to copy the appropriate values from
the "Log Destinations" page and use those as the values for `server`
and `port` respectively. You **do not need** the ca-bundle as the
Papertrail servers use certificates signed by a known CA. You also need
to set the format to `rfc3164`.

```bash
avn service integration-endpoint-create --project your-project \
    -d papertrail -t rsyslog \
    -c server=logsN.papertrailapp.com -c port=XXXXX \
    -c tls=true -c format=rfc3164
```

### Sumo Logic® {#rsyslog_sumo_logic}

For [Sumo Logic](https://www.sumologic.com/), use a custom
`logline` format with your collector token, use the server and port of
the collector, and replace `YOUR_DEPLOYMENT` with one of `au`, `ca`,
`de`, `eu`, `fed`, `in`, `jp`, `us1` or `us2`. See [Cloud Syslog
Source](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/Cloud-Syslog-Source)
for more information.

```bash
avn service integration-endpoint-create --project your-project \
    -d sumologic -t rsyslog \
    -c server=syslog.collection.YOUR_DEPLOYMENT.sumologic.com -c port=6514 \
    -c tls=true -c format=custom \
    -c logline='<%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% %procid% %msgid% YOUR_TOKEN %msg%'
```

_The Loggly trademark is the exclusive property of SolarWinds Worldwide,
LLC or its affiliates, is registered with the U.S. Patent and Trademark
Office, and may be registered or pending registration in other
countries. All other SolarWinds trademarks, service marks, and logos may
be common law marks or are registered or pending registration._
