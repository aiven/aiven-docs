---
title: Fork a service
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

Fork an Aiven service to create a complete and independent copy of it from its latest backup.

For services with Point in Time Recovery (PITR), you can choose to fork from the latest
transaction or from a specific point in time. Forked services are independent
and don't share resources with or increase the load on the original service.
Common use cases for forking include:

- Creating a snapshot to analyze an issue.
- Creating a development copy of your production environment.
- Testing upgrades before applying them to production services.
- Creating an instance in a different cloud provider, region, or with a different plan.
- [Renaming a service](/docs/platform/concepts/rename-services).

You can fork the following Aiven services:

-   Apache Cassandra®
-   Caching
-   ClickHouse®
-   Grafana®
-   M3DB
-   MySQL
-   OpenSearch®
-   PostgreSQL®

When you fork a service, the service configurations, databases, service users,
and connection pools are copied to the new service.

## Limitations

- You can only fork services that have at least one
  [backup](/docs/platform/concepts/service_backups).
- Service integrations are not copied over to the forked versions.
- You cannot [fork Aiven for ClickHouse®](/docs/products/clickhouse/howto/restore-backup)
  or Aiven for Apache Cassandra® services to a lower amount of nodes.
- Single sign-on (SSO) methods are not copied over to forked Aiven for OpenSearch® services
  because they are linked to specific URLs and endpoints, which change during
  forking. If you don't configure the SSO methods for the forked service, this can
  disrupt user access.

## Fork a service

<Tabs groupId="group1">
<TabItem value="Console" label="Console" default>
1. Log in to [Aiven Console](https://console.aiven.io/).
1. In your project, click <ConsoleLabel name="services"/> and click the service to fork.
1. Click <ConsoleLabel name="Backups"/> and click **Fork & restore**.
1. Configure the new service and click **Create fork**.

</TabItem>
<TabItem value="CLI" label="CLI">

Use the
[create service command](https://aiven.io/docs/tools/cli/service-cli#avn-cli-service-create)
with the `service_to_fork_from` parameter to specify the service to use as the source.

The following example creates a fork of a PostgreSQL® service named `source-pg`
and names it `pg-fork`.

```bash
avn service create pg-fork \
  --plan business-4 \
  --project example-project \
  --service-type pg \
  --cloud google-europe-west1 \
  --service-to-fork-from source-pg
```

To specify the backup to fork from, add the `--recovery-target-time` parameter
and set it to a time between the first and latest available backups. The following
example creates a fork by specifying the backup:

```bash
avn service create pg-fork \
  --plan business-4 \
  --project example-project \
  --service-type pg \
  --cloud google-europe-west1 \
  --service-to-fork-from source-pg \
  --recovery-target-time "2025-07-01T15:16:22+00:00"
```

</TabItem>
<TabItem value="API" label="API">

Use the
[`ServiceCreate` endpoint](https://api.aiven.io/doc/#tag/Service/operation/ServiceCreate)
and set the `service_to_fork_from` parameter in the `user_config` property
to the source service.

The following example creates a fork of a PostgreSQL service from the latest backup
of the service `source-pg-service`:

```bash
curl --location 'https://console.aiven.io/v1/project/example-project/service' \
     --header 'Content-Type: application/json' \
     --header 'Authorization: token' \
     --data '{
        "cloud":"google-europe-central2",
        "plan":"business-4",
        "service_name":"pg-fork",
        "service_type":"pg",
        "user_config":{
          "service_to_fork_from":"source-pg-service",
        }
     }'
```

To specify the backup to fork from, set the `recovery_target_time`
to a time between the first and latest available backups.

The following example forks a PostgreSQL service from a backup
taken at a specific point in time:

```bash
curl --location 'https://console.aiven.io/v1/project/example-project/service' \
     --header 'Content-Type: application/json' \
     --header 'Authorization: token' \
     --data '{
        "cloud":"google-europe-central2",
        "plan":"business-4",
        "service_name":"pg-fork",
        "service_type":"pg",
        "user_config":{
          "service_to_fork_from":"source-pg-service",
          "recovery_target_time": "2024-06-01T12:00:00+00:00",
        }
     }'
```

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the `service_to_fork_from` attribute in the user config of your service resource.
The following example creates a fork of a PostgreSQL service. The source service is
in the Google Cloud `europe-west1` region and the fork is in the AWS `eu-central-1` region.

<TerraformSample filename='postgres/postgres_fork/service.tf' />

To specify the backup to fork from, set the `recovery_target_time` attribute
to a time between the first and latest available backups.

More information on the service resources and their configuration options
are available in the
[Terraform documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs).

</TabItem>
</Tabs>

<RelatedPages/>

- [Create a service](/docs/platform/howto/create_new_service)
