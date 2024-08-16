---
title: Create a JAR application
limited: true
---

Aiven for Apache Flink® enables you to upload and deploy [custom code as a JAR file](/docs/products/flink/concepts/custom-jars), enhancing your Apache Flink applications with advanced data processing capabilities.

## Prerequisite

- Custom JARs for Aiven for Apache Flink is a **limited availability** feature.
  To try this feature, request access by contacting the [sales team](mailto:sales@aiven.io).
- Create an Aiven for Apache Flink service and click **Upload and deploy custom JARs**
  to enable custom JARs during service creation.

:::note
Enabling Custom JARs for existing services is currently not possible. If you did not
enable this feature during service creation, you must create a service with
Custom JARs enabled.
:::

## Create and deploy a JAR application

1.  Access the [Aiven Console](https://console.aiven.io/) and select the
    Aiven for Apache Flink service to deploy a JAR
    application to.
1.  From the left sidebar, click **Applications** and click
    **Create application**.
1.  In the **Create application** dialog, enter a name for your JAR
    application, and select **JAR** as the application type from the
    drop-down.
1.  Click **Create application** to proceed.
1.  Click **Upload first version** to upload the first version of the
    application.

    :::note[Custom JAR file size limit]
    Custom JAR files have a maximum size of 100 MB.
    For more information, contact the sales or support team.
    :::

1.  In the **Upload new version** dialog:
    1. Click **Choose file** to select your custom JAR file.
    1. Select the **Terms of Service** checkbox to indicate your
       agreement.
    1. Click **Upload version** to upload your JAR file.
1.  After the upload, you are redirected to the application'soverview
    page.
1.  To deploy the application, click **Create deployment**. In the
    **Create new deployment** dialog:
    1. Select the application version to deploy.
    1. Select a
       [savepoint](/docs/products/flink/concepts/savepoints) if you wish to deploy from
       a specific state. No
       savepoints are available for the first application deployment.
    1. Toggle **Restart on failure** to automatically restart Flink
       jobs upon failure. See [Restart strategy in SQL and JAR applications](/docs/products/flink/howto/restart-strategy-jar-applications)
       for details.
    1. In the **Program args** field, provide command-line arguments
       consisting of variables and configurations relevant to your
       application'slogic upon submission. Each argument is limited
       to 64 characters, with a total limit of 32 separate items.
    1. Specify the number of [parallel
       instances](https://nightlies.apache.org/flink/flink-docs-master/docs/dev/datastream/execution/parallel/)
       you require for the task.
1.  Click **Deploy without a savepoint** to begin the deployment
    process.
1.  While deploying, the application status shows **Initializing**. Once
    deployed, the status changes to **Running**.

## Related pages

-   [Manage Aiven for Apache Flink® applications](/docs/products/flink/howto/manage-flink-applications)
