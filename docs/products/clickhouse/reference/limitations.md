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
you can easily draw conclusions on how to get your service to operate
closer to its full potential. Use *Recommended approach* as guidelines
on how to work around specific restrictions.

<table>
  <colgroup>
    <col />
    <col />
    <col />
  </colgroup>
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
      <td></td>
    </tr>
    <tr>
      <td>Service integrations</td>
      <td>
        <p>
          You can integrate your Aiven for ClickHouse service with PostgreSQL®
          and Kafka® only.
        </p>
      </td>
      <td><p>-</p></td>
    </tr>
    <tr>
      <td><p>Table engines availability</p></td>
      <td>
        <ul>
          <li><p>Log engine is not supported in Aiven for ClickHouse.</p></li>
          <li>
            <p>
              Some special table engines and the Log engine are not supported in
              Aiven for ClickHouse.
            </p>
          </li>
          <li>
            <p>
              Some engines are remapped to their
              <code>Replicated</code> alternatives, for example,
              <code>MergeTree</code> <strong>&gt;</strong>
              <code>ReplicatedMergeTree</code>.
            </p>
          </li>
        </ul>
      </td>
      <td>
        <ul>
          <li>
            <p>
              For storing data, use the
              <a href="https://clickhouse.com/docs/en/engines/table-engines/special/buffer/">Buffer engine</a>
              instead of the Log engine.
            </p>
          </li>
          <li>
            <p>
              Use the available table engines listed in
              <a href="/docs/products/clickhouse/reference/supported-table-engines"><span>Supported table engines in Aiven for ClickHouse</span></a>.
            </p>
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><p>Cloud availability</p></td>
      <td><p>Available on AWS, GCP, and Azure only</p></td>
      <td><p>Use the available cloud providers.</p></td>
    </tr>
    <tr>
      <td><p>Kafka Schema Registry</p></td>
      <td>
        <p>
          Aiven for ClickHouse doesn't support Kafka Schema Registry, which
          allows to build stream processing pipelines with schemas.
        </p>
      </td>
      <td><p>-</p></td>
    </tr>
    <tr>
      <td><p>Querying all shards at once</p></td>
      <td>
        <p>
          If you have a sharded plan, you must use a distributed table on top of
          your MergeTree table to query all the shards at the same time, and you
          should use it for inserts too.
        </p>
      </td>
      <td>
        <p>
          Use a distributed table with sharded plans. Check
          <a href="/docs/roducts/clickhouse/howto/use-shards-with-distributed-table"><span>Query data across shards</span></a>
          for the instructions.
        </p>
      </td>
    </tr>
    <tr>
      <td><p>ON CLUSTER queries</p></td>
      <td>
        <p>
          Aiven for ClickHouse doesn't support ON CLUSTER queries because it
          actually runs each data definition query on all the servers of the
          cluster without using <cite>ON CLUSTER</cite>.
        </p>
      </td>
      <td>
        <p>
          Run queries without <code><span>ON</span> <span>CLUSTER</span></code >.
        </p>
      </td>
    </tr>
    <tr>
      <td><p>Creating a database using SQL</p></td>
      <td>
        <p>
          You cannot create a database directly using SQL, for example, if you'd
          like to add a non-default database.
        </p>
      </td>
      <td><p>Use the Aiven's public API.</p></td>
    </tr>
    <tr>
      <td><p>Scaling down the number of nodes</p></td>
      <td><p>You only can scale up the number of nodes in a cluster.</p></td>
      <td><p>-</p></td>
    </tr>
  </tbody>
</table>

## Limits

Service limits are determined by a plan that this service uses.

| Plan     | VMs    | CPU per VM         | RAM per VM | Total storage   |
| -------- | ------ | ------------------ | ---------- | --------------- |
| Hobbyist | 1      | 1 (2 for AWS only) | 4 GB       | 180 GB          |
| Startup  | 1      | 2                  | 16 GB      | 1150 GB         |
| Business | 3      | 2 - 8              | 16 - 64 GB | 1150 - 4600 GB  |
| Premium  | 6 - 30 | 2 - 8              | 16 - 64 GB | 2300 - 46000 GB |

:::tip
If you need a custom plan with capacity beyond the listed limits,
[contact us](https://aiven.io/contact?department=1306714).
:::

:::note[See also]
-   [Quotas for specific tiers of Business and Premium plans](https://aiven.io/pricing?tab=plan-pricing&product=clickhouse)
-   [Plans comparison](https://aiven.io/pricing?tab=plan-comparison&product=clickhouse)
:::
