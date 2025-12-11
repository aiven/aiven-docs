---
title: End of life for major versions of Aiven services and tools
sidebar_label: Service & tool lifecycle
---

End of life (EOL) is the date after which Aiven services and tools are no longer supported or maintained.

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

-   [Multi-versioned services](/docs/platform/reference/eol-for-major-versions#aiven-multi-versioned-services-eol):
    You can choose the version for your service.
-   [Single-versioned services](/docs/platform/reference/eol-for-major-versions#aiven-single-versioned-services-eol):
    Only one default version is available at a time.

## EOL policy for major versions

Aiven EOL policy applies only to services where you select the major version (for example,
PostgreSQL® or Apache Kafka®). Services that run a single version managed by Aiven are not
included. This policy covers both running and powered-off services on the affected version.

## EOL notifications

When Aiven sets the EOL date for a service major version:

-   You receive an email notification along with instructions on
    the next steps.
-   The [Aiven Console](https://console.aiven.io/) shows an EOL alert
    for affected services.
-   You receive email reminders monthly.
-   In the month of the EOL date, you receive weekly reminders.

## EOL best practices

Upgrade to the supported version before the EOL date. This gives you
time to test compatibility, resolve any issues, and plan the upgrade on
your schedule.

After the EOL date:

-   If the service is powered on, it's automatically upgraded to the
    latest version.

    :::note
    If it's not possible to upgrade a powered on service to the next
    version, the service is powered off and ultimately deleted.
    :::

-   If the service is powered off, it's deleted.

Aiven offers [database forking](/docs/platform/concepts/service-forking) as an efficient
tool to test the version upgrade before upgrading their production services.

## Aiven multi-versioned services EOL

### Aiven for Elasticsearch®

Aiven for Elasticsearch major versions will reach EOL on the same date
as the upstream open source project's EOL. [Aiven for
OpenSearch®](/docs/products/opensearch) is
Aiven's service offering for Elasticsearch.

| Version | Aiven EOL  | Upstream EOL       |
| ------- | ---------- | ------------------ |
| 2.x     | 2020-10-30 | 2018-02-28         |
| 5.x     | 2020-10-30 | 2019-03-11         |
| 6.x     | 2020-11-20 | 2020-11-20         |
| 7.x     | 2022-03-23 | 2022-05-11 (v7.10) |

### Aiven for OpenSearch®

Aiven for OpenSearch® is the open source continuation of the original
Elasticsearch service. The EOL for Aiven for OpenSearch® is generally
dependent on the upstream project.

| Version | Aiven EOL       | Service creation supported until | Service creation supported from |
| ------- | --------------- | -------------------------------- | ------------------------------- |
| 1.3.x   | To be announced | To be announced                  | 2022-05-19                      |
| 2.17.1  | To be announced | To be announced                  | 2024-10-15                      |
| 2.19.3  | To be announced | To be announced                  | 2025-09-15                      |

### Aiven for PostgreSQL®

Aiven for PostgreSQL® major versions will reach EOL on the same date as
the upstream open source project's EOL.

| Version | Aiven EOL  | Service creation supported until | Service creation supported from |
| ------- | ---------- | -------------------------------- | ------------------------------- |
| 9.5     | 2021-04-15 | 2021-01-26                       | 2015-12-22                      |
| 9.6     | 2021-11-11 | 2021-05-11                       | 2016-09-29                      |
| 10      | 2022-11-10 | 2022-05-10                       | 2017-01-14                      |
| 11      | 2023-11-09 | 2023-05-09                       | 2017-03-06                      |
| 12      | 2024-11-14 | 2024-05-14                       | 2019-11-18                      |
| 13      | 2025-11-13 | 2025-05-13                       | 2021-02-15                      |
| 14      | 2026-11-12 | 2026-05-12                       | 2021-11-11                      |
| 15      | 2027-11-11 | 2027-05-12                       | 2022-12-12                      |
| 16      | 2028-11-09 | 2028-05-09                       | 2024-01-09                      |
| 17      | 2029-11-08 | 2029-05-08                       | 2024-12-09                      |
| 18      | 2030-11-07 | 2030-05-07                       | 2025-09-25                      |

### Aiven for Apache Kafka® {#aiven-for-kafka}

Starting with v2.5, Aiven for Kafka® versions will reach EOL one year
after they are made available on the Aiven platform.

| Version | Aiven EOL  | Service creation supported until | Service creation supported from |
| ------- | ---------- | -------------------------------- | ------------------------------- |
| 3.0     | 2022-11-22 | 2022-07-04                       | 2021-11-22                      |
| 3.1     | 2023-02-14 | 2022-10-26                       | 2022-02-14                      |
| 3.2     | 2023-06-27 | 2023-03-28                       | 2022-06-21                      |
| 3.3     | 2023-12-12 | 2023-09-12                       | 2022-12-23                      |
| 3.4     | 2024-05-13 | 2024-02-13                       | 2023-05-09                      |
| 3.5     | 2024-07-31 | 2024-03-30                       | 2023-07-31                      |
| 3.6     | 2024-10-18 | 2024-09-01                       | 2023-10-18                      |
| 3.7     | 2025-04-17 | 2025-01-17                       | 2024-04-17                      |
| 3.8     | 2026-09-03 | 2026-06-03                       | 2024-09-06                      |
| 3.9     | 2027-09-30 | 2027-06-30                       | 2025-03-20                      |
| 4.0     | 2026-09-18 | 2026-06-18                       | 2025-09-18                      |
| 4.1.    | 2026-12-10 | 2026-09-10                       | 2025-12-10                      |

:::note
Starting with Apache Kafka 3.9, Aiven for Apache Kafka uses KRaft (Kafka Raft)
to manage metadata and controllers, replacing ZooKeeper. Migration to Apache Kafka 3.9
from earlier versions is not yet supported. For details and current limitations, see:

- [KRaft in Apache Kafka®](/docs/products/kafka/concepts/kraft-mode)
- [Transitioning to KRaft](/docs/products/kafka/concepts/upgrade-procedure#transitioning-to-kraft)

To support this transition, Aiven has extended support for Apache Kafka 3.8 by one year.
:::

### Aiven for Apache Cassandra® {#h_0f2929c770}

| Version | Aiven EOL  | Service creation supported until | Service creation supported from |
| ------- | ---------- | -------------------------------- | ------------------------------- |
| 3       | 2022-07-27 | 2022-04-27                       | 2018-11-08                      |
| 4.0     | 2026-01-07 | 2025-12-03                       | 2021-12-09                      |
| 4.1     | 2026-01-07 | 2025-12-03                       | 2024-01-18                      |

### Aiven for Apache Flink® {#aiven-for-flink}

| Version | Aiven EOL  | Service creation supported until | Service creation supported from |
|---------|------------|----------------------------------| ------------------------------- |
| 1.16    | 2024-11-21 | 2024-08-21                       | 2023-01-01                      |
| 1.19    | N/A        | N/A                              | 2024-05-21                      |

## Aiven single-versioned services EOL

### Aiven for AlloyDB Omni

| Version | Aiven EOL  | Service creation supported until | Service creation supported from |
|---------|------------|----------------------------------| ------------------------------- |
| 15.x    | 2025-12-05 | 2025-09-05                       | 2024-10-02                      |

### Aiven for ClickHouse®

| Version | Aiven EOL       |
| ------- | --------------- |
| 24.8    | To be announced |

### Aiven for Dragonfly®

| Version | Aiven EOL       |
| ------- | --------------- |
| 1.21.4  | To be announced |

### Aiven for Grafana®

| Version | Aiven EOL       |
| ------- | --------------- |
| 11.6.5  | To be announced |

### Aiven for MySQL®

| Version | Aiven EOL       |
| ------- | --------------- |
| 8.0.35  | To be announced |

### Aiven for Valkey™

| Version | Aiven EOL       |
| ------- | --------------- |
| 8.1.4   | To be announced |

## Aiven tools EOL

Aiven offers multiple tools for interacting with the Aiven Platform and
services. These include the Aiven CLI, the Aiven Provider for Terraform,
and the Aiven Operator for Kubernetes®.

Breaking changes in the Aiven API can result in new major versions of
the Aiven tools. While backwards compatibility is typically maintained,
certain changes require us to deprecate older versions of the tools.

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
