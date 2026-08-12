---
title: Aiven service and tool version lifecycle
sidebar_label: Version lifecycle
---

import EolTableMysql from "@site/static/includes/eol-table-mysql.md";
import EolTableOpensearch from "@site/static/includes/eol-table-opensearch.md";
import EolTablePostgresql from "@site/static/includes/eol-table-postgresql.md";
import EolTableKafka from "@site/static/includes/eol-table-kafka.md";
import EolTableClickhouse from "@site/static/includes/eol-table-clickhouse.md";
import EolTableFlink from "@site/static/includes/eol-table-flink.md";
import EolTableValkey from "@site/static/includes/eol-table-valkey.md";
import EolTableDragonfly from "@site/static/includes/eol-table-dragonfly.md";
import EolTableGrafana from "@site/static/includes/eol-table-grafana.md";

Learn about version lifecycle policies, end of life (EOL) schedules, upgrade procedures, and best practices for Aiven services and tools, including both multi-versioned services and single-versioned services.

:::note
EOL is the date after which Aiven services and tools are no longer supported
or maintained.
:::

## Aiven version support and upstream EOL

Aiven aims to follow the EOL schedule set by the original authors and
maintainers of the open source software (the upstream projects). Once
the upstream project retires a specific version, they do not receive
security updates and critical bug fixes anymore by the maintainers.

Outdated services don't offer the level of protection you
need, so Aiven follows the upstream project's EOL schedule to ensure
that Aiven services are always running on supported versions.

## Service version numbering

Aiven services inherit the upstream project's software versioning
scheme. Depending on the service, a major version can be either a single
digit (for example, PostgreSQL® 14) or in the format `major.minor` (for
example, Kafka® 3.2). The exact version of the service is visible in the
[Aiven Console](https://console.aiven.io/) when the service is running.

## Multi-versioned vs single-versioned services

There are two types of Aiven services with respect to versions:

-   [Multi-versioned services](/docs/platform/reference/eol-for-major-versions#aiven-multi-versioned-services-eol)

    - Multiple service versions supported at a time
    - Service versions managed by the users: You select a version for your service from
      the available supported versions.

-   [Single-versioned services](/docs/platform/reference/eol-for-major-versions#aiven-single-versioned-services-eol)

    - Only one default service version available at a time
    - Service versions managed by Aiven

## Service version EOL policy

The Aiven service version EOL policy applies only to
[multi-versioned services](/docs/platform/reference/eol-for-major-versions#aiven-multi-versioned-services-eol),
where you select a version.
[Single-versioned services](/docs/platform/reference/eol-for-major-versions#aiven-single-versioned-services-eol),
which run a single version managed by Aiven, are not included. This policy covers both
running and powered-off services on affected versions.

## EOL notifications

When Aiven sets the EOL date for a service major version:

-   You receive an email notification along with instructions on
    the next steps.
-   The [Aiven Console](https://console.aiven.io/) shows an EOL alert
    for affected services.
-   You receive email reminders monthly.
-   In the month of the EOL date, you receive weekly reminders.

## EOL best practices

- Use [service forking](/docs/platform/concepts/service-forking) to test the version
  upgrade before upgrading your production services.
- Upgrade to the supported version before the EOL date. This gives you time to test
  compatibility, resolve any issues, and plan the upgrade on your schedule.

After the EOL date:

-   If the service is powered on, it's automatically upgraded to the
    latest version when possible, or to another supported version.

    :::note
    If it's not possible to upgrade a powered-on service to a supported
    version, the service is powered off and ultimately deleted.
    :::

-   If the service is powered off, it's deleted.

    :::note[Exception]
    Aiven for OpenSearch® powered-off services are not deleted after their version EOL.
    They are upgraded and start running the new version when powered on.
    :::

## Aiven multi-versioned services EOL

### Aiven for MySQL®

<EolTableMysql/>

### Aiven for OpenSearch®

<EolTableOpensearch/>

### Aiven for PostgreSQL®

<EolTablePostgresql/>

### Aiven for Apache Kafka® {#aiven-for-kafka}

<EolTableKafka/>

### Aiven for ClickHouse®

<EolTableClickhouse/>

For details, see the
[Aiven for ClickHouse version support policy](/docs/products/clickhouse/reference/version-support-policy).

### Aiven for Apache Flink® {#aiven-for-flink}

<EolTableFlink/>

### Aiven for Valkey™

<EolTableValkey/>

## Aiven single-versioned services EOL

### Aiven for Dragonfly®

<EolTableDragonfly/>

### Aiven for Grafana®

<EolTableGrafana/>

## Aiven API lifecycle

The Aiven API endpoints follow a lifecycle that includes the following stages:

- **Experimental**: New API endpoints that are still in development and might
  change without notice. These endpoints are intended for testing and feedback purposes.
- **Stable**: API endpoints that are fully supported and maintained.
- **Deprecated**: API endpoints that Aiven plans to remove in the future.
- **Sunset**: API endpoints that are no longer available.

### API endpoint deprecation

As the Aiven Platform evolves, some API endpoints become
outdated or replaced by newer versions.

Aiven announces API endpoint deprecations on the
[Aiven product updates page](https://aiven.io/changelog).
If a replacement endpoint or sunset date is available, this information
is included in the deprecation notice and in the API documentation.

To allow clients to detect these changes automatically, the API returns specific headers
with the deprecation status and sunset date, for example:

```
HTTP/1.1 200 OK
Content-Type: application/json
Deprecation: @1777248000
Sunset: Wed, 01 Jul 2026 00:00:00 GMT
Link: <https://aiven.io/changelog>; rel="sunset"
```

Where:
 - `Deprecation`: the UTC timestamp when deprecation took effect in
   RFC 9745 @UNIX-TIMESTAMP format.
 - `Sunset`: Optional. Date and time the endpoint will be removed.
 - `Link`: URL for the [product update](https://aiven.io/changelog) for this
    deprecation.

Aiven works to reduce the disruptions caused by deprecations.
The time between the deprecation and sunset statuses varies based on the endpoint's
usage and the migration complexity. During the deprecation period,
the endpoint remains fully functional for existing customers,
giving you time to migrate to the newer version. Deprecated endpoints may
not be available to new customers.

### API endpoint sunset

After the deprecation period, the endpoint transitions to sunset status.
The route remains registered for a period after sunset so clients receive
a `410 Gone` response instead of `404 Not Found`. The following
is an example of the structured error body:

```
{
  "errors": [{
    "error_code": "retired_api_endpoint",
    "message": "This API endpoint was deprecated on Tue, 09 Jul 2024 00:00:00 GMT and is no longer available. Use https://api.aiven.io/v1/organization/{organization_id}/user-groups instead."
  }]
}
```

Full route removal happens
only after an extended post-sunset period, but
customers should migrate before the published sunset date.

## Aiven tools EOL

Aiven offers multiple tools for interacting with the Aiven Platform and
services. These include the Aiven CLI, the Aiven Provider for Terraform,
and the Aiven Operator for Kubernetes®.

Breaking changes in the Aiven API can result in new major versions of
the Aiven tools. While backwards compatibility is typically maintained,
certain changes require Aiven to deprecate older versions of the tools.

### Aiven CLI

| Version | Aiven EOL       |
| ------- | --------------- |
| 1.x     | 2023-12-11      |
| 2.x     | 2023-12-11      |
| 3.x     | 2023-12-11      |
| 4.x     | To be announced |

### Aiven Provider for Terraform

Older versions will continue to work, but there will be no new features
or bug fixes after the EOL date.

| Version | Aiven EOL       |
| ------- | --------------- |
| 1.x     | 2023-12-31      |
| 2.x     | 2023-12-31      |
| 3.x     | 2023-12-31      |
| 4.x     | To be announced |

### Aiven Operator for Kubernetes®

| Version | Aiven EOL       |
| ------- | --------------- |
| 0.x     | To be announced |
