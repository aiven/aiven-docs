---
title: Create a PostgreSQL® CDC or JDBC connector-based Apache Flink®
---

Learn how to create a table in your Apache Flink® application to interact with an external PostgreSQL® database.

You can choose between two methods:

- **Change Data Capture (CDC)**: Process real-time changes from the PostgreSQL tables
  using Debezium.
- **JDBC**: Execute SQL queries directly on the PostgreSQL database.

## Prerequisites

- An active Aiven for Apache Flink service.
- An external PostgreSQL database with access details.
- [Integration](/docs/products/flink/howto/ext-pg-flink-integration) between
  Aiven for Apache Flink and external PostgreSQL.

## Configure external PostgreSQL connector

Follow these steps to configure an external PostgreSQL connector in your Aiven for Apache Flink
application table, using either CDC or JDBC:

1. Go to the **Aiven for Apache Flink** service page and
   click **Application** in the sidebar.
1. Click **Create new application**, enter a name your application, and
   click **Create application**.

   :::note
    If modifying an existing application, create a new version for source or s
    ink table changes.
   :::

1. Click **Create first version** to create the first version of your application.
1. Click **Add your first source table** to begin setting up your data source.
1. In the **Add new source table** screen, select the *external PostgreSQL* as the
   integrated service.
1. In the **Table SQL**, enter the SQL statement for your chosen connector:

   - For a **CDC connector**:

     ```sql
      CREATE TABLE external_pg_cdc_source (
        id INT PRIMARY KEY,
        data VARCHAR
      ) WITH (
        'connector' = 'cdc-postgres',
        'hostname' = '<external-db-host>',
        'port' = '5432',
        'database-name' = '<your_database>',
        'schema-name' = 'public',
        'table-name' = '<your_table>',
        'username' = '<db_user>',
        'password' = '<db_password>',
        'decoding.plugin.name' = 'your_decoding_plugin'
        'slot.name' = '<your_slot_name>'
      );
     ```

     Parameters:

     - `connector`: The connector type to be used, which is  `cdc-postgres`.
     - `hostname`: The hostname or address of the PostgreSQL database
       server.
     - `username`: The username to authenticate with the PostgreSQL
       database.
     - `password`: The password for the provided username.
     - `schema-name`: The name of the schema where the source table is
       located, which is set to `public` in the example.
     - `table-name`: The name of the source table to be captured by the
       CDC connector, which is set to `test-1` in the example.
     - `port`: The port number of the PostgreSQL database server.
     - `database-name`: The name of the database where the source table
       resides, which is set to `defaultdb` in the example.
     - `decoding.plugin.name`: The decoding plugin to be used by the
       CDC connector, which is set to `pgoutput` in the example.
     - `slot.name`: The identifier for the replication slot, used to track and
       stream database changes for CDC operations.

   - For a **JDBC connector**:

     ```sql
      CREATE TABLE external_pg_jdbc_sink (
         id INT PRIMARY KEY,
         data VARCHAR
      ) WITH (
         'connector' = 'JDBC',
         'url' = 'jdbc:postgresql://<external-db-host>:5432/<your_database>',
         'table-name' = '<your_table>',
         'username' = '<db_user>',
         'password' = '<db_password>'
      );
     ```

     Parameters:

     - `connector`: The connector type to be used, which is `JDBC`.
     - `url`: The external PostgreSQL connection URL should include the hostname, port,
       and database name. Replace with your specific details.
     - `table-name`: Specify the name of the table to interact with
        within the chosen database.
     - `username`: The username for your PostgreSQL database
     - `password`: Enter the password associated with the provided username.

1. Click **Next** to configure the sink table.
1. Click **Add your first sink table** and specify the destination for your processed
   data. For example, Aiven for Apache Kafka service.
1. In the **Table SQL** section, enter the SQL creation statement for the sink table based
   on where to send the data.
1. After configuring both source and sink tables, click **Create deployment** to deploy
   your application. Choose the desired version to deploy (default: Version 1) and select
   **Deploy without a savepoint** (as there are no savepoints available for the first
   application).
