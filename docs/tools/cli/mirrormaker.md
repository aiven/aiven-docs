---
title: avn mirrormaker
---

Full list of commands for `avn mirrormaker`.

## Create and manage Aiven for Apache Kafka® MirrorMaker 2 replication flows

Commands for managing Aiven for Apache Kafka® MirrorMaker 2 replication
flows.

### `avn mirrormaker replication-flow create`

Creates a new Aiven for Apache Kafka® MirrorMaker 2 replication flow.

:::warning
Before creating a replication flow, an
[integration](/docs/tools/cli/service/integration#avn_service_integration_create) needs to be created between the Aiven for Apache Kafka
MirrorMaker 2 service and each of the source and the target services.

for example, An integration with alias `kafka-target-alias` between an Aiven for
Apache Kafka service named `kafka-target` and an Aiven for Apache Kafka
MirrorMaker 2 named `kafka-mm` can be created with:

```
avn service integration-create \
  -s kafka-target              \
  -d kafka-mm                  \
  -t kafka_mirrormaker         \
  -c cluster_alias=kafka-target-alias
```

At most **one** replication flow can be build between any two Aiven for
Apache Kafka services.
:::

| Parameter                 | Information                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------ |
| `service_name`            | The Aiven for Apache Kafka MirrorMaker 2 service where to create the replication flow                  |
| `--source-cluster`        | The Aiven for Apache Kafka service to be used as source for replication                                |
| `--target-cluster`        | The Aiven for Apache Kafka service to be used as target for replication                                |
| `replication_flow_config` | JSON string or path (preceded by `@`) to a JSON configuration file for the replication flow definition |

**Example:** In the service `kafka-mm` create a new replication flow
from an Aiven for Apache Kafka service with integration alias
`kafka-source-alias` to a service named `kafka-target-alias` with the
following settings:

-   include all topics with name starting with `my-src-topic` (topic
    name patterns can be defined using [Java
    patterns](https://docs.oracle.com/javase/7/docs/api/java/util/regex/Pattern.html))
-   exclude all topics with name ending with `not-include`
-   `DefaultReplicationPolicy` as replication policy class
-   enable MirrorMaker 2 heartbeats
-   enable synching of consumer groups offset every `60` seconds

```
avn mirrormaker replication-flow create kafka-mm \
  --source-cluster kafka-source-alias \
  --target-cluster kafka-target-alias \
  '
    {
        "emit_heartbeats_enabled": true,
        "enabled": true,
        "replication_policy_class": "org.apache.kafka.connect.mirror.DefaultReplicationPolicy",
        "source_cluster": "kafka-source-alias",
        "sync_group_offsets_enabled": true,
        "sync_group_offsets_interval_seconds": 60,
        "target_cluster": "kafka-target-alias",
        "topics": [
            "my-src-topic.*"
        ],
        "topics.blacklist": [
            ".*not-include"
        ]
    }
  '
```

### `avn mirrormaker replication-flow delete`

Deletes an existing Aiven for Apache Kafka® MirrorMaker 2 replication
flow.

| Parameter          | Information                                                                           |
| ------------------ | ------------------------------------------------------------------------------------- |
| `service_name`     | The Aiven for Apache Kafka MirrorMaker 2 service where to delete the replication flow |
| `--source-cluster` | The Aiven for Apache Kafka service to be used as source for replication               |
| `--target-cluster` | The Aiven for Apache Kafka service to be used as target for replication               |

**Example:** In the service `kafka-mm` delete the replication flow from
an Aiven for Apache Kafka service with integration alias
`kafka-source-alias` to the service named `kafka-target-alias`.

```
avn mirrormaker replication-flow delete kafka-mm \
  --source-cluster kafka-source-alias \
  --target-cluster kafka-target-alias
```

### `avn mirrormaker replication-flow get`

Retrieves the configuration details of an existing Aiven for Apache
Kafka® MirrorMaker 2 replication flow.

| Parameter          | Information                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------ |
| `service_name`     | The Aiven for Apache Kafka MirrorMaker 2 service where to get the replication flow details |
| `--source-cluster` | The Aiven for Apache Kafka service to be used as source for replication                    |
| `--target-cluster` | The Aiven for Apache Kafka service to be used as target for replication                    |

**Example:** In the service `kafka-mm` retrieve the details of the
replication flow from an Aiven for Apache Kafka service with integration
alias `kafka-source-alias` to the service named `kafka-target-alias`.

```
avn mirrormaker replication-flow get kafka-mm \
  --source-cluster kafka-source-alias \
  --target-cluster kafka-target-alias
```

An example of the `avn mirrormaker replication-flow get` command output:

``` json
{
    "emit_heartbeats_enabled": true,
    "enabled": true,
    "replication_policy_class": "org.apache.kafka.connect.mirror.DefaultReplicationPolicy",
    "source_cluster": "kafka-source-alias",
    "sync_group_offsets_enabled": true,
    "sync_group_offsets_interval_seconds": 60,
    "target_cluster": "kafka-target-alias",
    "topics": [
        "my-src-topic.*"
    ],
    "topics.blacklist": [
        ".*not-include"
    ]
}
```

### `avn mirrormaker replication-flow list`

Lists the configuration details for all replication flows defined in an
existing Aiven for Apache Kafka® MirrorMaker 2 service.

| Parameter      | Information                                                                         |
| -------------- | ----------------------------------------------------------------------------------- |
| `service_name` | The Aiven for Apache Kafka MirrorMaker 2 service where to list the replication flow |

**Example:** List the configuration details for all replication flows
defined in an existing Aiven for Apache Kafka MirrorMaker 2 named
`kafka-mm`.

```
avn mirrormaker replication-flow list kafka-mm
```

An example of the `avn mirrormaker replication-flow list` command
output:

``` json
[
      {
          "emit_heartbeats_enabled": true,
          "enabled": true,
          "replication_policy_class": "org.apache.kafka.connect.mirror.DefaultReplicationPolicy",
          "source_cluster": "kafka-source-alias",
          "sync_group_offsets_enabled": true,
          "sync_group_offsets_interval_seconds": 60,
          "target_cluster": "kafka-target-alias",
          "topics": [
              "my-src-topic.*"
          ],
          "topics.blacklist": [
              ".*not-include"
          ]
      }
 ]
```

### `avn mirrormaker replication-flow update`

Updates an existing Aiven for Apache Kafka® MirrorMaker 2 replication
flow.

| Parameter                 | Information                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------ |
| `service_name`            | The Aiven for Apache Kafka MirrorMaker 2 service where to update the replication flow                  |
| `--source-cluster`        | The Aiven for Apache Kafka service to be used as source for replication                                |
| `--target-cluster`        | The Aiven for Apache Kafka service to be used as target for replication                                |
| `replication_flow_config` | JSON string or path (preceded by `@`) to a JSON configuration file for the replication flow definition |

**Example:** In the service `kafka-mm` update the replication flow from
an Aiven for Apache Kafka service with integration alias
`kafka-source-alias` to a service named `kafka-target-alias` with the
settings contained in a file named `replication-flow.json`.

```
avn mirrormaker replication-flow update kafka-mm \
  --source-cluster kafka-source-alias \
  --target-cluster kafka-target-alias \
  @replication-flow.json
```
