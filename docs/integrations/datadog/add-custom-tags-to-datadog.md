---
title: Add custom tags Datadog integration
---

When using the Datadog integration in the [Aiven Console](https://console.aiven.io/), Aiven automatically includes a set of standard tags in all data sent to Datadog.

These tags consist of: `aiven-cloud:<cloud_name>`,
`aiven-service-type:<service_type>`, `aiven-service:<service_name>` and
`aiven-project:<project_name>`.

In addition to the standard tags, you have the flexibility to include
your own custom tags, which will then be appended to the data sent to
Datadog.

You have the option to configure these tags at both the endpoint
configuration level and on a per-service integration level.

## Configure tags for the Datadog endpoint {#h_0e3d855c3f}

When configuring tags at the service integration level, it's important
to note that these tags apply exclusively to the specific integration or
connection being configured. Any tags configured at the endpoint level
will be included in addition to these tags.

To add tags to the endpoint:

1.  Log in to [Aiven Console](https://console.aiven.io/), and select
    **Integration endpoints**.
2.  Select **Datadog** from the list of available integration endpoints.
3.  Select the **Edit endpoint** icon next to the endpoint name to
    which should get tagged.
4.  Enter the desired tags in the provided field. You can add multiple
    tags by selecting the **Add** icon and optionally include
    descriptions for each tag.
5.  Select **Save changes**.

## Configure tags for a service {#h_e11242c546}

When configuring tags at the service integration level, the tags are
exclusively applied to that specific integration (connection).
Additionally, any tags configured at the endpoint level will be appended
to these tags.

To add tags to the service integration:

1.  Log in to [Aiven Console](https://console.aiven.io/), and select
    your service.
2.  On the **Overview** page of your service, go to the **Service
    integrations** section and select **Manage integrations**.
3.  Next to the Datadog integration listed at the top on the
    Integrations screen, select **Edit** from the drop-down menu
    (ellipsis).
4.  Enter the desired tags in the provided field. You can add multiple
    tags by selecting the **Add** icon and optionally include
    descriptions for each tag.
5.  Select **Save configuration** to apply the changes.
