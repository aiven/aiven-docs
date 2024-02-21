---
title: Manage Apache Kafka® parameters
---

Every Aiven for Apache Kafka® service comes with a set of configuration
properties that define values like partition count, replication factor,
retention time, whether an automatic topic creation is enabled or not
and others.

:::tip
Check a short [video
tutorial](https://www.youtube.com/watch?v=pXQZWI0ddLg&t=25s) for an
end-to-end example of how to manage Aiven for Apache Kafka® parameters.
:::

You can read and edit these configuration properties in the Advanced
configuration section of the Overview page in [Aiven web
console](https://console.aiven.io/) or using the
[Aiven CLI service update command](/docs/tools/cli/service-cli#avn-cli-service-update).

:::warning
Most of the Apache Kafka settings cause the service to restart when
changed. Aiven for Apache Kafka restarts nodes one at a time to ensure
minimal disruption to service availability. However, it can take few
minutes from the change before the new settings are in use.
:::

## Retrieve the current service parameters with Aiven CLI

To retrieve the existing Aiven for Apache Kafka configuration use the
following command:

```
avn service get SERVICE_NAME --json
```

The output is the JSON representation of the service configuration.

## Retrieve the customizable parameters with Aiven CLI

Not all Aiven for Apache Kafka parameters are customizable, to retrieve
the list of those parameters you can change use the following command:

```
avn service types -v
```

The output is a set of customizable parameters for all the services,
browse to the `kafka` section to check the ones available for Aiven for
Apache Kafka.

## Update a service parameter with the Aiven CLI

To modify a service parameter use the
[Aiven CLI service update command](/docs/tools/cli/service-cli#avn-cli-service-update). for example, to modify the `message.max.bytes` parameter use the
following command:

```
avn service update SERVICE_NAME -c "kafka.message_max_bytes=newmaximumbytelimit"
```

:::note
For some changes, like the `message.max.bytes`, client settings need to
be amended as well. Otherwise, you may encounter issues with processing
Kafka messages.
:::
