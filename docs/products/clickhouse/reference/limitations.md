---
title: Aiven for ClickHouse® limits and limitations
---

This article covers quotas for the Aiven for ClickHouse® service and
restrictions on its use. This information helps you make right choices
when working with Aiven for ClickHouse, for example, on your
infrastructure design, tools, modes of interactions, potential
integrations, or handling concurrent workloads.

## Limitations

From the information about restrictions on using Aiven for ClickHouse,
you can easily draw conclusions on how get your service to operate
closer to its full potential. Use *Recommended approach* as guidelines
on how to work around specific restrictions.

+-----------------+-----------------------------------+-----------------+
| Name            | Description                       | Recommended     |
|                 |                                   | approach        |
+=================+===================================+=================+
| Backups - one   | | Since Aiven for ClickHouse      | \-              |
| snapshot a day  |   service takes a single snapshot |                 |
|                 |   a day only,                     |                 |
|                 | |                                 |                 |
|                 | | - When powering off the         |                 |
|                 |   service, all data after the     |                 |
|                 |   last backup is lost.            |                 |
|                 | | - Point-in-time recovery is not |                 |
|                 |   supported. A database can be    |                 |
|                 |   restored to one of the daily    |                 |
|                 |   backups states only.            |                 |
|                 | | - When creating a database      |                 |
|                 |   fork, you can only create a     |                 |
|                 |   fork that matches the state of  |                 |
|                 |   one of the backups.             |                 |
|                 | | - Any data inserted before the  |                 |
|                 |   next snapshot is lost if all    |                 |
|                 |   nodes in a given shard          |                 |
|                 |   malfunction and need to be      |                 |
|                 |   replaced.                       |                 |
|                 | |                                 |                 |
|                 | | This limitation doesn\'t apply  |                 |
|                 |   to patches, migrations, or      |                 |
|                 |   scaling, which are handled      |                 |
|                 |   safely and automatically.       |                 |
+-----------------+-----------------------------------+-----------------+
| Service         | You can integrate your Aiven for  | \-              |
| integrations    | ClickHouse service with           |                 |
|                 | PostgreSQL® and Kafka® only.      |                 |
+-----------------+-----------------------------------+-----------------+
| Table engines   | -   Log engine is not supported   | -   For storing |
| availability    |     in Aiven for ClickHouse.      |     data, use   |
|                 | -   Some special table engines    |     the [Buffer |
|                 |     and the Log engine are not    |     en          |
|                 |     supported in Aiven for        | gine](https://c |
|                 |     ClickHouse.                   | lickhouse.com/d |
|                 | -   Some engines are remapped to  | ocs/en/engines/ |
|                 |     their `Replicated`            | table-engines/s |
|                 |     alternatives, for example,    | pecial/buffer/) |
|                 |     `MergeTree` **\>**            |     instead of  |
|                 |     `ReplicatedMergeTree`.        |     the Log     |
|                 |                                   |     engine.     |
|                 |                                   | -   Use the     |
|                 |                                   |     available   |
|                 |                                   |     table       |
|                 |                                   |     engines     |
|                 |                                   |     listed in   |
+-----------------+-----------------------------------+-----------------+
| Cloud           | Available on AWS, GCP, and Azure  | Use the         |
| availability    | only                              | available cloud |
|                 |                                   | providers.      |
+-----------------+-----------------------------------+-----------------+
| Kafka Schema    | Aiven for ClickHouse doesn\'t     | \-              |
| Registry        | support Kafka Schema Registry,    |                 |
|                 | which allows to build stream      |                 |
|                 | processing pipelines with         |                 |
|                 | schemas.                          |                 |
+-----------------+-----------------------------------+-----------------+
| Querying all    | If you have a sharded plan, you   | Use a           |
| shards at once  | must use a distributed table on   | distributed     |
|                 | top of your MergeTree table to    | table with      |
|                 | query all the shards at the same  | sharded plans.  |
|                 | time, and you should use it for   | Check           |
+-----------------+-----------------------------------+-----------------+
| ON CLUSTER      | Aiven for ClickHouse doesn\'t     | Run queries     |
| queries         | support ON CLUSTER queries        | without         |
|                 | because it actually runs each     | `ON CLUSTER`.   |
|                 | data definition query on all the  |                 |
|                 | servers of the cluster without    |                 |
|                 | using `ON CLUSTER`.   |                 |
+-----------------+-----------------------------------+-----------------+
| Creating a      | You cannot create a database      | Use the         |
| database using  | directly using SQL, for example,  | Aiven\'s public |
| SQL             | if you\'d like to add a           | API.            |
|                 | non-default database.             |                 |
+-----------------+-----------------------------------+-----------------+
| Scaling down    | You only can scale up the number  | \-              |
| the number of   | of nodes in a cluster.            |                 |
| nodes           |                                   |                 |
+-----------------+-----------------------------------+-----------------+

## Limits

Service limits are determined by a plan that this service uses.

  --------------------------------------------------------------------------
  Plan       VMs        CPU per VM      RAM per VM      Total storage
  ---------- ---------- --------------- --------------- --------------------
  Hobbyist   1          1 (2 for AWS    4 GB            180 GB
                        only)

  Startup    1          2               16 GB           1150 GB

  Business   3          2 - 8           16 - 64 GB      1150 - 4600 GB

  Premium    6 - 30     2 - 8           16 - 64 GB      2300 - 46000 GB
  --------------------------------------------------------------------------

:::tip
If you need a custom plan with capacity beyond the listed limits,
[contact us](https://aiven.io/contact?department=1306714).
:::

:::note See also
-   [Quotas for specific tiers of Business and Premium
    plans](https://aiven.io/pricing?tab=plan-pricing&product=clickhouse)
-   [Plans
    comparison](https://aiven.io/pricing?tab=plan-comparison&product=clickhouse)
:::
