---
title: Aiven for ClickHouse® limits and limitations
sidebar_label: Limits and limitations
---

import ClickHouseTotalStorageLimitation from '@site/static/includes/clickhouse-storage-limitation.md';
import RelatedPages from "@site/src/components/RelatedPages";

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
          <li>Point-in-time recovery is not supported. A database can be
            [restored to one of the daily backup states](/docs/products/clickhouse/howto/restore-backup)
            only.</li>
          <li>When creating a database fork,
            you can only [create a fork](/docs/products/clickhouse/howto/restore-backup)
            that matches the state of one of the backups.</li>
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
        <ul>
          <li>You can integrate your Aiven for ClickHouse service with PostgreSQL®
          and Apache Kafka® only.</li>
          <li>[Integrations of Aiven for ClickHouse and Apache Kafka](/docs/products/clickhouse/howto/integrate-kafka)
          support the maximum of 400 virtual connector tables.</li>
        </ul>
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
      <td>Creating or deleting a database using SQL</td>
      <td>
        <ul>
          <li>Only the `avnadmin` user can create databases in SQL.</li>
          <li>You can create a database in SQL with the `Replicated` database engine only.</li>
          <li>By default, only the `aiven` user can delete a database. The `aiven` user
              can grant the permission to delete a database to another user.</li>
        </ul>
      </td>
      <td>
        To work around this limitation, use [Aiven's API](https://api.aiven.io/doc/)
        or the [Aiven Console](https://console.aiven.io/).
      </td>
    </tr>
    <tr>
      <td>Maximum number of databases per service</td>
      <td>
          Your Aiven for ClickHouse service can support up to 400 databases simultaneously.
      </td>
      <td>
        Instead of creating multiple databases of the same structure for isolation purposes,
        it's recommended to create one database where you add an extra column to filter by
        it. Consider including this column into the primary key or partitioning by it. You
        can also limit scope of data on which SQL queries can be run by using the
        `additional_table_filters` query setting.
      </td>
    </tr>
  </tbody>
</table>

## Limits

Service limits are determined by a plan that this service uses. For the number of VMs,
CPU per VM, RAM per VM, storage details per plan, see
[Plans & pricing](https://aiven.io/pricing?product=clickhouse).

| Aiven for ClickHouse           | Hobbyist                   | Startup                      | Business                     | Premium                      |
| ------------------------------ | -------------------------- | ---------------------------- | ---------------------------- | ---------------------------- |
| Maximum concurrent queries     | 25 queries per 4 GB of RAM | 100 queries per 16 GB of RAM | 100 queries per 16 GB of RAM | 100 queries per 16 GB of RAM |
| Maximum concurrent connections | 1000 connections per node  | 4000 connections per node    | 4000 connections per node    | 4000 connections per node    |

<ClickHouseTotalStorageLimitation />

:::tip
If you need a custom plan with capacity beyond the listed limits,
[contact us](https://aiven.io/contact?department=1306714).
:::

<RelatedPages/>

-   [Quotas for specific tiers of Business and Premium plans](https://aiven.io/pricing?tab=plan-pricing&product=clickhouse)
-   [Plans comparison](https://aiven.io/pricing?tab=plan-comparison&product=clickhouse)
