---
title: avn service quota
---

Full list of commands for `avn service quota`.

## Manage Kafka service quotas

The `avn service quota` command manages quotas for Aiven for Apache Kafka® services.
Quotas limit network throughput and CPU usage for producers and consumers. This prevents
individual clients from overloading the cluster. You can scope quotas to a specific user,
a client ID, or both.

For an overview of how quotas work, see
[Quotas in Aiven for Apache Kafka®](/docs/products/kafka/concepts/kafka-quotas).

### `avn service quota create`

Create a quota for an Aiven for Apache Kafka service.

At least one of `--client-id` or `--user` is required to identify the quota subject.
At least one quota parameter (`--consumer-byte-rate`, `--producer-byte-rate`, or
`--request-percentage`) is also required.

| Parameter               | Information                                                                                              |
| ----------------------- | -------------------------------------------------------------------------------------------------------- |
| `service_name`          | Name of the service                                                                                      |
| `--client-id`           | Client ID to scope the quota to                                                                          |
| `--user`                | Username to scope the quota to                                                                           |
| `--consumer-byte-rate`  | Maximum bytes per second that consumer clients with this quota can read from the cluster (0—1073741824) |
| `--producer-byte-rate`  | Maximum bytes per second that producer clients with this quota can write to the cluster (0—1073741824)  |
| `--request-percentage`  | Maximum percentage of CPU time for request handler I/O and network threads per broker (0—100)            |

:::note
To apply a quota to all users or all client IDs, use the keyword `default` as the
value for `--user` or `--client-id`.
:::

**Example:** Set a 1 MiB/s producer and consumer throttle for user `alice` on service
`kafka-doc`.

```bash
avn service quota create kafka-doc \
  --user alice \
  --consumer-byte-rate 1048576 \
  --producer-byte-rate 1048576
```

**Example:** Set a 25% CPU throttle for client ID `analytics-consumer` on service
`kafka-doc`.

```bash
avn service quota create kafka-doc \
  --client-id analytics-consumer \
  --request-percentage 25
```

**Example:** Set a default quota for all users on service `kafka-doc`.

```bash
avn service quota create kafka-doc \
  --user default \
  --consumer-byte-rate 5242880
```

### `avn service quota list`

List all quotas defined for an Aiven for Apache Kafka service.

| Parameter      | Information         |
| -------------- | ------------------- |
| `service_name` | Name of the service |

**Example:** List all quotas for service `kafka-doc`.

```bash
avn service quota list kafka-doc
```

Example output:

```text
CLIENT-ID             USER   CONSUMER_BYTE_RATE  PRODUCER_BYTE_RATE  REQUEST_PERCENTAGE
====================  =====  ==================  ==================  ==================
analytics-consumer           1048576             1048576             25
                      alice  524288              524288
```

### `avn service quota describe`

Describe a specific quota on an Aiven for Apache Kafka service.

At least one of `--client-id` or `--user` is required.

| Parameter      | Information                              |
| -------------- | ---------------------------------------- |
| `service_name` | Name of the service                      |
| `--client-id`  | Client ID of the quota to describe       |
| `--user`       | Username of the quota to describe        |

**Example:** Describe the quota for user `alice` on service `kafka-doc`.

```bash
avn service quota describe kafka-doc --user alice
```

**Example:** Describe the quota scoped to both a user and a client ID.

```bash
avn service quota describe kafka-doc \
  --user alice \
  --client-id analytics-consumer
```

### `avn service quota delete`

Delete a quota from an Aiven for Apache Kafka service.

At least one of `--client-id` or `--user` is required.

| Parameter      | Information                           |
| -------------- | ------------------------------------- |
| `service_name` | Name of the service                   |
| `--client-id`  | Client ID of the quota to delete      |
| `--user`       | Username of the quota to delete       |

**Example:** Delete the quota for user `alice` on service `kafka-doc`.

```bash
avn service quota delete kafka-doc --user alice
```

## Related pages

- [Quotas in Aiven for Apache Kafka®](/docs/products/kafka/concepts/kafka-quotas)
- [Manage quotas](/docs/products/kafka/howto/manage-quotas)
