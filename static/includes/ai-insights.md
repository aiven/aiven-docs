import ConsoleLabel from "@site/src/components/ConsoleIcons"

Use **Aiven AI Database Optimizer** to receive optimization suggestions to your databases and queries.

Aiven's artificial intelligence considers various aspects to suggest optimizations, for example query
structure, table size, existing indexes and their cardinality, column types and
sizes, and the connections between the tables and columns in the query.

The database optimizer gathers information on schema structure, database statistics, and
other signals to detect potential performance problems and offer optimization
recommendations, without requiring credentials or access to the actual data in
the database. To address the possibility of slow query logs containing sensitive data,
Aiven offers data masking, replacing sensitive parameters within
queries with question marks (`?`). Data masking is enabled by default.

To optimize a query automatically:

1. In the [Aiven Console](https://console.aiven.io/login), open your
   {props.service} service.
1. In the <ConsoleLabel name="observe"/> section, click **AI insights**.
1. For the query of your choice, click **Optimize**.
1. In the **Query optimization report** window, see the optimization suggestion and apply
   the suggestion by running the provided SQL queries.

   - To display potential alternative optimization recommendations, click **Advanced options**.
   - To display the diff view, click **Query diff**.
   - To display explanations about the optimization, click **Optimization details**.

:::note
The quality of the optimization suggestions is proportional to the amount of
data collected about the performance of your database.
:::

For one-time query optimizations when you do not run an Aiven for PostgreSQL® service,
use the [standalone SQL query optimizer](https://aiven.io/tools/sql-query-optimizer).
