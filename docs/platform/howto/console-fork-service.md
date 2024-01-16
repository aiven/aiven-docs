---
title: Fork your service
---

Fork your Aiven service in order to make a copy of the service. You can
use it to create a development copy of your production environment, set
up a snapshot to analyze an issue or test an upgrade, or create an
instance in a different cloud/geographical location/under a different
plan.

Learn more
[about service forking](/docs/platform/concepts/service-forking).

## Fork a service using the Console

1.  Log in to [Aiven Console](https://console.aiven.io/).
1.  Go to your **Services**, and select the service you want to fork.
1.  On the **Overview** page of your service, scroll down to **Fork
    Database** \> **New database fork**.
1.  In the **New Database Fork** window, select the new service region
    and plan.
1.  Select **Create fork**.

You have copied your Aiven service. You can now apply any integrations you may
need for the copy.

## Fork a service using the Aiven client

1.  Prepare the command to create a new service, this will contain the
    new copy of your data store.
1.  Add the `service_to_fork_from` parameter to specify the service to
    use as the source. Change service type accordingly with `-t`, run
    the following command to see available options:

    ```bash
    avn service types
    ```

For example, if you want to create a fork of your `forker` PostgreSQL®
service, and name it `forked`, the command would be something like:

```bash
avn service create forked --project PROJECT_NAME --cloud CLOUD_NAME -t pg --plan business-4 -c service_to_fork_from=forker
```

You have now copied your Aiven service. You can now apply any integrations you
need for the copy.
