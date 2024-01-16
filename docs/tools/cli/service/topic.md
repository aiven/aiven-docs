---
title: avn service topic
---

Here you\'ll find the full list of commands for `avn service topic`.

## Manage Aiven for Apache Kafka® topics {#avn_cli_service_topic_create}

### `avn service topic-create`

Creates a new Kafka topic on the specified Aiven for Apache Kafka
service.

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`service_name`</td>
      <td>The name of the service</td>
    </tr>
    <tr>
      <td>`topic`</td>
      <td>The name of the topic</td>
    </tr>
    <tr>
      <td>`--partitions`</td>
      <td>The number of topic partitions</td>
    </tr>
    <tr>
      <td>`--replication`</td>
      <td>The topic replication factor</td>
    </tr>
    <tr>
      <td>`--min-insync-replicas`</td>
      <td>The minimum required nodes In Sync Replicas (ISR) for the topic/partition (default: 1)</td>
    </tr>
    <tr>
      <td>`--retention`</td>
      <td>The retention period in hours (default: unlimited)</td>
    </tr>
    <tr>
      <td>`--retention-bytes`</td>
      <td>The retention limit in bytes (default: unlimited)</td>
    </tr>
    <tr>
      <td>`--cleanup-policy`</td>
      <td>The topic cleanup policy; can be either `delete` or `compact`.</td>
    </tr>
    <tr>
      <td>`--tag KEY[=VALUE]`</td>
      <td>Topic tagging</td>
    </tr>
  </tbody>
</table>


**Example:** Create a new topic named `invoices` in the `demo-kafka`
service with:

-   `3` partitions
-   `2` as replication factor
-   2 hours of retention time
-   `BU=FINANCE` tag

``` 
avn service topic-create demo-kafka invoices  \
  --partitions 3                              \
  --replication 2                             \
  --retention 2                               \
  --tag BU=FINANCE
```

### `avn service topic-delete` {#avn-cli-delete-topic}

Deletes a Kafka topic on the specified Aiven for Apache Kafka service.

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`service_name`</td>
      <td>The name of the service</td>
    </tr>
    <tr>
      <td>`topic`</td>
      <td>The name of the topic</td>
    </tr>
  </tbody>
</table>


**Example:** Delete the topic named `invoices` in the `demo-kafka`
service.

``` 
avn service topic-delete demo-kafka invoices
```

### `avn service topic-get`

Retrieves Kafka topic on the specified Aiven for Apache Kafka service.

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`service_name`</td>
      <td>The name of the service</td>
    </tr>
    <tr>
      <td>`topic`</td>
      <td>The name of the topic</td>
    </tr>
  </tbody>
</table>


**Example:** Retrieve the information about a topic named `invoices` in
the `demo-kafka` service.

``` 
avn service topic-get demo-kafka invoices
```

An example of `avn service topic-get` output:

``` text
PARTITION  ISR  SIZE  EARLIEST_OFFSET  LATEST_OFFSET  GROUPS
=========  ===  ====  ===============  =============  ======
0          2    0     0                0              0
1          2    null  0                0              0
2          2    0     0                0              0

(No consumer groups)
```

### `avn service topic-list`

Lists Kafka topics on the specified Aiven for Apache Kafka service
together with the following information:

-   partitions
-   replication
-   min in-sync replicas
-   retention bytes
-   retention hours
-   cleanup policy
-   tags

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`service_name`</td>
      <td>The name of the service</td>
    </tr>
  </tbody>
</table>


**Example:** Retrieve list of topics available in the `demo-kafka`
service.

``` 
avn service topic-list demo-kafka
```

An example of `avn service topic-get` output:

``` text
TOPIC_NAME  PARTITIONS  REPLICATION  MIN_INSYNC_REPLICAS  RETENTION_BYTES  RETENTION_HOURS  CLEANUP_POLICY  TAGS
==========  ==========  ===========  ===================  ===============  ===============  ==============  ==========
bills       3           2            1                    -1               unlimited        delete
invoices    3           2            1                    -1               168              delete          BU=FINANCE
orders      2           3            1                    -1               unlimited        delete
```

### `avn service topic-update` {#avn-cli-topic-update}

Updates a Kafka topic on the specified Aiven for Apache Kafka service.

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`service_name`</td>
      <td>The name of the service</td>
    </tr>
    <tr>
      <td>`topic`</td>
      <td>The name of the topic</td>
    </tr>
    <tr>
      <td>`--partitions`</td>
      <td>The number of topic partitions</td>
    </tr>
    <tr>
      <td>`--replication`</td>
      <td>The topic replication factor</td>
    </tr>
    <tr>
      <td>`--min-insync-replicas`</td>
      <td>The minimum required nodes In Sync Replicas (ISR) for the topic/partition (default: 1)</td>
    </tr>
    <tr>
      <td>`--retention`</td>
      <td>The retention period in hours (default: unlimited)</td>
    </tr>
    <tr>
      <td>`--retention-bytes`</td>
      <td>The retention limit in bytes (default: unlimited)</td>
    </tr>
    <tr>
      <td>`--cleanup-policy`</td>
      <td>The topic cleanup policy; can be either `delete` or `compact`.</td>
    </tr>
    <tr>
      <td>`--tag KEY[=VALUE]`</td>
      <td>Topic tagging</td>
    </tr>
    <tr>
      <td>`--untag KEY`</td>
      <td>Topic tag to remove</td>
    </tr>
  </tbody>
</table>


**Example:** Update the topic named `invoices` in the `demo-kafka`
service. Set `4` partitions and `3` as replication factor. Furthermore
remove the `BU` tag and add a new `CC=FINANCE_DE` tag.

``` 
avn service topic-update demo-kafka invoices  \
  --partitions 4                              \
  --replication 3                             \
  --tag CC=FINANCE_DE                         \
  --untag BU
```
