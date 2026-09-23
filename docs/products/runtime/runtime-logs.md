---
title: Aiven Runtime logs
sidebar_label: Runtime logs
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import {ConsoleIcon} from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Runtime produces build and runtime logs for your applications to help you monitor them and troubleshoot issues throughout their lifecycle.

## Build logs

Build-time logs capture the build process from source code checkout
through application packaging. Use build logs to understand what happens
before your application starts serving traffic.

You can use these logs to diagnose build failures. Information available
in the logs can include:

- Source repository authentication or checkout failures
- Detected language, framework, and toolchain versions
- Dependency installation or version-resolution errors
- Build command output and exit codes
- Compiler, bundler, or test errors
- Packaging or container image creation failures
- Build duration and commit revision

To access build logs:

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Open your application.
1. Click <ConsoleLabel name="buildlogs"/>.

</TabItem>
<TabItem value="api" label="API">

Use the `POST /v1/project/PROJECT_NAME/service/SERVICE_NAME/logs` endpoint:

```bash
curl -X POST "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME/logs" \
  -H "Authorization: Bearer $AIVEN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "log_type": "application-build"
  }'
```

The endpoint supports pagination, severity filtering, limits,
and ascending or descending sort order.

</TabItem>
</Tabs>

## Runtime logs

Runtime logs capture output from your application when it is launched
and while it is running.
Use these to monitor your application's behavior, such as:

- Startup and configuration errors
- Successful startup and port binding
- Exceptions and stack traces
- Request handling and application events
- Database or external service connection failures
- Crashes, restarts, and shutdown events
- Resource-related termination signals


To access runtime logs:

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Open your application.
1. Click <ConsoleLabel name="runtimelogs"/>.

</TabItem>
<TabItem value="cli" label="CLI">

Use the [`avn service logs`](https://github.com/aiven/aiven-client) command to retrieve logs:

```bash
avn service logs SERVICE_NAME
```

</TabItem>
<TabItem value="api" label="API">

Use the `POST /v1/project/PROJECT_NAME/service/SERVICE_NAME/logs` endpoint:

```bash
curl -X POST "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME/logs" \
  -H "Authorization: Bearer $AIVEN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "log_type": "application-run"
  }'
```

The endpoint supports pagination, severity filtering, limits,
and ascending or descending sort order.

</TabItem>
</Tabs>

## Log retention

Both log types are available for 24 hours.
To retain logs beyond this window, set up a log integration.

## Log integrations

Continuously export logs to centralized systems for searching, dashboards, and alerting.

Runtime exposes both log sources:

- `application.service` for runtime logs
- `build.service` for build logs

You can integrate with:

- [Aiven for OpenSearch](/docs/products/opensearch/howto/opensearch-log-integration)
- [Apache Kafka®](/docs/products/kafka/howto/integrate-service-logs-into-kafka-topic)
- [AWS CloudWatch Logs](/docs/integrations/cloudwatch/cloudwatch-logs-console)
- [Google Cloud Logging](/docs/integrations/cloudlogging)
- [External Elasticsearch or OpenSearch](/docs/integrations/send-logs-to-elasticsearch)
- [Remote syslog](/docs/integrations/rsyslog)
