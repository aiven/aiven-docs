---
title: Aiven for ClickHouse® limits and limitations
sidebar_label: Limits and limitations
---

import ClickHouseTotalStorageLimitation from '@site/static/includes/clickhouse-storage-limitation.md';

By respecting the Aiven for ClickHouse® restrictions and quotas, you can improve the security and productivity of your service workloads.

## Limitations

From the information about restrictions on using Aiven for ClickHouse,
you can draw conclusions on how to get your service to operate
closer to its full potential. Use **Recommended approach** as guidelines
on how to work around specific restrictions.
a
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Recommended approach</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Backups - one snapshot a day</td>
      <td>
        Since Aiven for ClickHouse service takes a single snapshot a day only:
        <ul>
          <li>When powering off the service, all data after the last backup is lost.</li>
          <li>Point-in-time recovery is not supported. A database can be restored to
            one of the daily backups states only.</li>
          <li>When creating a database fork,
            you can only create a fork that matches the state of one of the backups.</li>
          <li>Any data inserted before the next snapshot is lost if all nodes in a
            given shard malfunction and need to be replaced. This limitation doesn't
            apply to patches, migrations, or scaling, which are handled safely and
            automatically.</li>
        </ul>
      </td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Service integrations</td>
      <td>
          You can integrate your Aiven for ClickHouse service with PostgreSQL®
          and Kafka® only.
      </td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Table engines support</td>
      <td>
        <ul>
          <li>
              Some special table engines are not supported in
              Aiven for ClickHouse.
          </li>
          <li>
              Some engines are remapped to their
              <code>Replicated</code> alternatives, for example,
              <code>MergeTree</code> <strong>&gt;</strong>
              <code>ReplicatedMergeTree</code>.
          </li>
        </ul>
      </td>
      <td>
          Use the available table engines listed in
          <a href="/docs/products/clickhouse/reference/supported-table-engines"><span>Supported table engines in Aiven for ClickHouse</span></a>.
      </td>
    </tr>
    <tr>
      <td>Log table engine support</td>
      <td>
        Log engine is not supported in Aiven for ClickHouse.
      </td>
      <td>
          For storing data, use the
          <a href="https://clickhouse.com/docs/en/engines/table-engines/special/buffer/">Buffer engine</a>
          instead of the Log engine.
      </td>
    </tr>
    <tr>
      <td>Kafka table engine support</td>
      <td>
          The Kafka table engine is supported via
          <a href="/docs/products/clickhouse/howto/integrate-kafka">integration</a> only,
          not by creating a table in SQL.
      </td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Kafka Schema Registry</td>
      <td>
          Kafka Schema Registry is supported with Aiven for Apache Kafka® and not with an
          external Kafka endpoint.
      </td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Cloud availability</td>
      <td>Available on AWS, GCP, and Azure only</td>
      <td>Use the available cloud providers.</td>
    </tr>
    <tr>
      <td>Querying all shards at once</td>
      <td>
          If you have a sharded plan, you must use a distributed table on top of
          your MergeTree table to query all the shards at the same time, and you
          should use it for inserts too.
      </td>
      <td>
          Use a distributed table with sharded plans. See
          <a href="/docs/products/clickhouse/howto/use-shards-with-distributed-table">Query data across shards</a>.
      </td>
    </tr>
    <tr>
      <td>ON CLUSTER queries</td>
      <td>
          Aiven for ClickHouse doesn't support ON CLUSTER queries because it
          actually runs each data definition query on all the servers of the
          cluster without using <code>ON CLUSTER</code>.
      </td>
      <td>
          Run queries without <code>ON CLUSTER</code >.
      </td>
    </tr>
    <tr>
      <td>Creating a database using SQL</td>
      <td>
          You cannot create a database directly using SQL, for example, if you'd
          like to add a non-default database.
      </td>
      <td>Use the Aiven's public API.</td>
    </tr>
    <tr>
      <td>Scaling down the number of nodes</td>
      <td>You only can scale up the number of nodes in a cluster.</td>
      <td>N/A</td>
    </tr>
  </tbody>
</table>

## Limits

Service limits are determined by a plan that this service uses.

| Aiven for ClickHouse           | Hobbyist                   | Startup                      | Business                     | Premium                      |
| ------------------------------ | -------------------------- | ---------------------------- | ---------------------------- | ---------------------------- |
| VMs                            | 1                          | 1                            | 3                            | 6 - 30                       |
| CPU per VM                     | 1 (2 for AWS only)         | 2                            | 2 - 8                        | 2 - 8                        |
| RAM per VM                     | 4 GB                       | 16 GB                        | 16 - 64 GB                   | 16 - 64 GB                   |
| Total storage                  | 180 GB                     | 1150 GB                      | 1150 - 4600 GB               | 2300 - 46000 GB              |
| Maximum concurrent queries     | 25 queries per 4 GB of RAM | 100 queries per 16 GB of RAM | 100 queries per 16 GB of RAM | 100 queries per 16 GB of RAM |
| Maximum concurrent connections | 1000 connections per node  | 4000 connections per node    | 4000 connections per node    | 4000 connections per node    |

<ClickHouseTotalStorageLimitation />

:::tip
If you need a custom plan with capacity beyond the listed limits,
[contact us](https://aiven.io/contact?department=1306714).
:::

## Related pages

-   [Quotas for specific tiers of Business and Premium plans](https://aiven.io/pricing?tab=plan-pricing&product=clickhouse)
-   [Plans comparison](https://aiven.io/pricing?tab=plan-comparison&product=clickhouse)
