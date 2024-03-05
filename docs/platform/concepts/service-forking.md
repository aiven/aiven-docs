---
title: Fork a service
---

import Services from "@site/static/images/icons/cog.svg";
import ActionsIcon from "@site/static/images/icons/more.svg";

[Fork your Aiven service](/docs/platform/concepts/service-forking) to make a copy of the service, for example to create a snapshot to analyze an issue.

Other typical use cases include creating a development copy of your production
environment, upgrade testing, or creating an instance in a different
cloud/geographical location/under a different plan.

When you fork a service, the following items are copied into the new
service:

- Configurations
- Databases
- Service users
- Connection pools

Forks are independent and do not increase the load on the original service. The data is
restored from the latest backup stored separately from the service.

:::important
The service integrations are not copied over to the forked version, and
need to be re-established for each new copy.
:::

You can fork the following Aiven services:

-   PostgreSQL®
-   MySQL
-   Redis®\*
-   Apache Cassandra® (Limitation: you cannot fork to a lower amount of
    nodes)
-   Elasticsearch
-   OpenSearch®

    :::important
    When you fork an Aiven for OpenSearch® service, any Single Sign-On
    (SSO) methods configured at the service level, such as SAML, must be
    explicitly reconfigured for the forked service. SSO configurations
    are linked to specific URLs and endpoints, which change during
    forking. Failing to reconfigure SSO methods for the forked service
    can lead to authentication problems and potentially disrupt user
    access.
    :::

-   M3DB
-   Grafana®

When forking a service with Point in Time Recovery (PITR), you can
choose to fork from the latest transaction or select a specific point in
the past to fork from.
Fork your Aiven service to make a copy of the service.

## Fork a service using the Console

1. Log in to [Aiven Console](https://console.aiven.io/).
1. In your project, click <Services className="icon"/> **Services** and click the service to fork.
1. On the **Overview** page of your service, click **New database fork**.
1. In the **New Database Fork** window, set the details for the new service.
1. Click **Create fork**.

Apply any integrations required by the fork.

## Fork a service using the Aiven client

1.  Prepare the command to create a new service, this will contain the
    new copy of your data store.
1.  Add the `service_to_fork_from` parameter to specify the service to
    use as the source. Change service type accordingly with `-t`, run
    the following command to see available options:

    ```bash
    avn service types
    ```

For example, to create a fork of your `forker` PostgreSQL®
service, and name it `forked`, the command would be something like:

```bash
avn service create forked --project PROJECT_NAME --cloud CLOUD_NAME -t pg --plan business-4 -c service_to_fork_from=forker
```

Apply any integrations required by the fork.

## Rename a service

A service cannot be renamed after creation. Instead:

1. Stop service writes on the service to rename.
1. Fork the service under a different name.
1. Point clients to the new service.
1. Delete the original service when you are ready.

## Related pages

- [Fork a service](/docs/platform/concepts/service-forking)
- [Create a service](/docs/platform/howto/create_new_service)

import ElasticSearch from "@site/static/includes/trademark-elasticsearch.md"

<ElasticSearch/>
