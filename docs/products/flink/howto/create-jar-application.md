---
title: Create a JAR application
limited: true
---

Aiven for Apache Flink® enables you to upload and deploy
[custom code as a JAR file](/docs/products/flink/concepts/custom-jars), enhancing your
Flink applications with advanced data
processing capabilities.

## Prerequisite

- Custom JARs for Aiven for Apache Flink is a **limited availability** feature.
  To try this feature, request it by contacting
  our [Sales team](mailto:sales@aiven.io).
- Once activated on your Aiven account:
  - To enable custom JARs for a new Aiven for Apache Flink service,
  toggle the feature during service creation.
  - For an existing service, in
[AivenConsole](https://console.aiven.io/) , select your project and then
choose your Aiven for Apache Flink® service.
    - Click **Service settings** on the left sidebar.
    - Scroll to the **Advanced configuration** section, and click
        **Configure**.
    - In the **Advanced configuration** screen, click **Add
        configuration options**, and using the search box, find and set
        `custom_code` configuration to **Enabled** position.

## Create and deploy application

1.  Access the [Aiven Console](https://console.aiven.io/) and select the
    Aiven for Apache Flink service where you want to deploy a JAR
    application.
1.  From the left sidebar, click **Applications** and then click
    **Create application**.
1.  In the **Create application** dialog, enter a name for your JAR
    application, and select **JAR** as the application type from the
    drop-down.
1.  Click **Create application** to proceed.
1.  Click **Upload first version** to upload the first version of the
    application.
1.  In the **Upload new version** dialog:
    -   Click **Choose file** to select your custom JAR file.
    -   Select the **Terms of Service** checkbox to indicate your
        agreement.
    -   Click **Upload version** to upload your JAR file.
1.  After the upload, you are redirected to the application'soverview
    page.
1.  To deploy the application, click **Create deployment**. In the
    **Create new deployment** dialog:
    -   Select the application version to deploy.
    -   Select a
        [savepoint](/docs/products/flink/concepts/savepoints) if you wish to deploy from
        a specific state. No
        savepoints are available for the first application deployment.
    -   Toggle **Restart on failure** to automatically restart Flink
        jobs upon failure.
    -   In the **Program args** field, provide command-line arguments
        consisting of variables and configurations relevant to your
        application'slogic upon submission. Each argument is limited
        to 64 characters, with a total limit of 32 separate items.
    -   Specify the number of [parallel
        instances](https://nightlies.apache.org/flink/flink-docs-master/docs/dev/datastream/execution/parallel/)
        you require for the task.
1.  Click **Deploy without a savepoint** to begin the deployment
    process.
1. While deploying, the application status shows **Initializing**. Once
    deployed, the status changes to **Running**.

## Related pages

-   [Manage Aiven for Apache Flink® applications](/docs/products/flink/howto/manage-flink-applications)
