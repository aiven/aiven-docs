---
title: Create an SQL application
---

Build data processing pipelines in Aiven for Apache Flink® by creating SQL applications using Apache Flink SQL. Set up source and sink tables, define processing logic, and manage your deployments.

## Prerequisite

Before creating applications, configure the
[data service integration](/docs/products/flink/howto/create-integration) for seamless integration and data management within your
Flink applications.

## Create and deploy an SQL application

Create an SQL application in Aiven for Apache Flink® using the [Aiven
Console](https://console.aiven.io/):

1. In the [Aiven Console](https://console.aiven.io/), select the Aiven
   for Apache Flink service where to create and deploy a Flink
   application.

1. From the left sidebar, click **Applications** and click
   **Create application**.

1. In the **Create application** dialog, enter the name of your
   application and select **SQL** as the application type.

1. Click **Create application**.

1. Click **Create first version** to create the first version of the
   application.

1. Click **Add your first source table** to add a source table.

   :::note
   As this is your first application, no other applications are
   available to import source tables.
   :::

1. On the **Add new source table** screen:

   - Use the **Integrated service** drop-down to select the service.
   - In the **Table SQL** section, enter the SQL statement to create
     the source table.
   - Optionally, click **Run** to test how data is being retrieved
     from the data source. This may vary in time based on the data
     volume and connection speed.
   - Click **Add table**.

1. Click **Next** to proceed to adding a sink table and click **Add
   your first sink table**.

   :::note
   As this is your first application, no other applications are
   available to import sink tables.
   :::

1. On the **Add new sink table** screen:

   - Use the **Integrated service** drop-down to select the service.
   - In the **Table SQL** section, enter the SQL statement to create
     the sink table.
   - Click **Add table**.

1. Click **Next** to enter the **SQL statement** that transforms the
   data from the source stream. Optionally, click **Run** to see how
   the data is extracted from the source.

1. Click **Save and deploy later** to save the application. You can
   view and access the application you created on the application
   overview page.

   ![Application landing page with a view of the source table, SQL statement, and sink table](/images/content/products/flink/application_landingpage_view.png)

1. To deploy the application, click **Create deployment**. In the
   **Create new deployment** dialog:

   - Select the application version to deploy. The default version
     for the first deployment is **Version: 1**.
   - Select a
     [savepoint](/docs/products/flink/concepts/savepoints) if you wish to deploy from a specific state. No savepoints are available for the first
     application deployment.
   - Toggle **Restart on failure** to automatically restart Flink
     jobs upon failure. See [Restart strategy in SQL and JAR applications](/docs/products/flink/howto/restart-strategy-jar-applications)
     for details.
   - Specify the number of [parallel
     instances](https://nightlies.apache.org/flink/flink-docs-master/docs/dev/datastream/execution/parallel/)
     you require for the task.

1. Click **Deploy without a savepoint** to begin the deployment
   process.

1. While deploying, the application status shows **Initializing**. Once
   deployed, the status changes to **Running**.

## Create SQL applications using Aiven CLI

For information on creating and managing Aiven for Apache Flink
application using [Aiven CLI](/docs/tools/cli), see
[Manage Aiven for Apache Flink® applications](/docs/tools/cli/service/flink) document.
