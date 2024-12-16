---
title: Integrate Aiven for Apache Flink® with Google BigQuery
---

import {ConsoleIcon} from "@site/src/components/non-swizzled/ConsoleIcons"

Connect Aiven for Apache Flink® with Google BigQuery as a sink using the [Aiven client](/docs/tools/cli) or the [Aiven Console](https://console.aiven.io/).

Aiven for Apache Flink® is a fully managed service that provides distributed stateful
stream processing capabilities. Google BigQuery is a cost-effective cloud-based data
warehouse that can handle large amounts of data without servers. By connecting Aiven for
Apache Flink® with Google BigQuery, you can stream data from Aiven for Apache Flink® to
Google BigQuery, where it can be stored and analyzed. Aiven for Apache Flink® uses
[BigQuery Connector for Apache Flink](https://github.com/aiven/bigquery-connector-for-apache-flink)
as a connector to connect to Google BigQuery.

## Prerequisites

-   Aiven for Apache Flink service
-   Google Cloud Platform (GCP) account
-   Necessary permissions to create resources and manage integrations in
    GCP
-   **Google Project ID**: You have a Google Project ID. For more
    information, see [Google Cloud
    documentation](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
-   **Google Cloud Service Account Credentials**: You have Google Cloud
    service account credentials in JSON format to authenticate with the
    Google Cloud Platform. For instructions on how to create and get
    service account credentials, see [Google Cloud's
    documentation](https://developers.google.com/workspace/guides/create-credentials).
-   **Service account permissions**: Your service account is granted the
    necessary permissions to create log entries. For information on
    access control with IAM, see [Google Cloud's access control
    documentation](https://cloud.google.com/logging/docs/access-control).

## Configure integration using Aiven CLI

### Step 1: Create or use an Aiven for Apache Flink service

You can use an existing Aiven for Apache Flink service. To get a list of
all your existing Flink services, use:

```bash
avn service list --project <project_name> --service-type flink
```

Alternatively, to create an Aiven for Apache Flink service, you can use:

```bash
avn service create -t flink -p <project-name> --cloud <cloud-name> <flink-service-name>
```

where:

-   `-t flink`: The type of service to create, which is Aiven for Apache
    Flink.
-   `-p <project-name>`: The name of the Aiven project where the service
    should be created.
-   `cloud <cloud-name>`: The name of the cloud provider on which the
    service should be created.
-   `<flink-service-name>`: The name of the new Aiven for Apache Flink
    service to be created. This name must be unique within the specified
    project.

### Step 2: Configure GCP for a Google BigQuery sink connector

To be able to sink data from Aiven for Apache Flink to Google BigQuery,
go the GCP console to configure GCP for a Google BigQuery sink connector:

-   Create a [Google service account and generate a JSON service
    key](https://cloud.google.com/docs/authentication/client-libraries).
-   Verify that BigQuery API is enabled.
-   Create a BigQuery dataset or define an existing one where the
    data is going to be stored.
-   Grant [dataset access to the service
    account](https://cloud.google.com/bigquery/docs/control-access-to-resources-iam).

### Step 3: Create an external Google BigQuery endpoint

To integrate Google BigQuery with Aiven for Apache Flink, create an external BigQuery
endpoint. You can use the
[avn service integration-endpoint-create](/docs/tools/cli/service/integration#avn_service_integration_endpoint_create)
command with the required parameters. This command will
create a integration endpoint that can be used to connect to a
BigQuery service.

```bash
avn service integration-endpoint-create \
--project <project_name> \
--endpoint-name <endpoint_name> \
--endpoint-type external_bigquery \
--user-config-json '{
    "project_id": "<gcp_project_id>",
    "service_account_credentials": {
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "client_email": "<service_account_email>",
        "client_id": "<client_id>",
        "client_x509_cert_url": "<client_x509_cert_url>",
        "private_key": "<private_key_content>",
        "private_key_id": "<private_key_id>",
        "project_id": "<service_account_project_id>",
        "token_uri": "https://oauth2.googleapis.com/token",
        "type": "service_account"
    }
}'
```

where:

-   `--project`: Specify the name of the project where to
    create the integration endpoint.
-   `--endpoint-name`: Set the name of the integration endpoint you are
    creating. Replace `your_endpoint_name` with your desired endpoint
    name.
-   `--endpoint-type`: Specify the type of integration endpoint. For
    example, if it's an external BigQuery service, enter
    `external_bigquery`.
-   `--user-config-json`: This parameter allows you to provide a JSON
    object with custom configurations for the integration endpoint. The
    JSON object should include the following fields:
    -   `project_id`: Your actual Google Cloud Platform project ID.
    -   `service_account_credentials`: An object that holds the
        necessary credentials for authenticating and accessing the
        external Google BigQuery service. This object should include the
        following fields:
        -   `auth_provider_x509_cert_url`: The URL where the
            authentication provider'sx509 certificate can be fetched.
        -   `auth_ur`: The URI used for authenticating requests.
        -   `client_email`: The email address associated with the
            service account.
        -   `client_id`: The client ID associated with the service
            account.
        -   `client_x509_cert_url`: The URL to fetch the public x509
            certificate for the service account.
        -   `private_key`: The private key content associated with the
            service account.
        -   `private_key_id`: The ID of the private key associated with
            the service account.
        -   `project_id`: The project ID associated with the service
            account.
        -   `token_uri`: The URI used to obtain an access token.
        -   `type`: The type of service account, which is typically set
            to \"service_account\".

**Aiven CLI Example: Creating an external BigQuery integration
endpoint**

```bash
avn service integration-endpoint-create --project aiven-test --endpoint-name my-bigquery-endpoint
--endpoint-type external_bigquery
--user-config-json '{
"project_id": "my-bigquery-project",
"service_account_credentials": {
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "client_email": "bigquery-test@project.iam.gserviceaccount.com",
    "client_id": "284765298137902130451",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/bigquery-test%40project.iam.gserviceaccount.com",
    "private_key": "ADD_PRIVATE_KEY_PATH",
    "private_key_id": "ADD_PRIVE_KEY_ID_PATH",
    "project_id": "my-bigquery-project",
    "token_uri": "https://oauth2.googleapis.com/token",
    "type": "service_account"
    }
}'
```

### Step 4: Create an integration for Google BigQuery

Now, create an integration between your Aiven for Apache Flink service
and your BigQuery endpoint:

```bash
avn service integration-create
    --source-endpoint-id <source-endpoint-id>
    --dest-service <flink-service-name>
    -t flink_external_bigquery
```

For example,

```bash
avn service integration-create
    --source-endpoint-id eb870a84-b91c-4fd7-bbbc-3ede5fafb9a2
    --dest-service flink-1
    -t flink_external_bigquery
```

where:

-   `--source-endpoint-id`: The ID of the integration endpoint you want
    to use as the source. In this case, it is the ID of the external
    Google BigQuery integration endpoint. In this example, the ID is
    `eb870a84-b91c-4fd7-bbbc-3ede5fafb9a2`.
-   `--dest-service`: The name of the Aiven for Apache Flink service to integrate with the
    external BigQuery endpoint. In this
    example, the service name is `flink-1`.
-   `-t`: The type of integration to create. In this case, the
    `flink_external_bigquery` integration type is used to integrate
    Aiven for Apache Flink with an external BigQuery endpoint.

### Step 5: Verify integration with service

After creating the integration between Aiven for Apache Flink and and
Google BigQuery, the next step is to verify that the integration has
been created successfully and create Aiven for Apache Flink applications
that use the integration.

To verify that the integration has been created successfully, run:

```bash
avn service integration-list --project <project-name> <flink-service-name>
```

For example:

```bash
avn service integration-list --project systest-project flink-1
```

where:

-   `--project`: The name of the Aiven project that contains the Aiven
    service to list integrations for. In this example, the
    project name is `systest-project`.
-   `flink-1`: The name of the Aiven service to list
    integrations for. In this example, the service name is `flink-1`,
    which is an Aiven for Apache Flink service.

To create Aiven for Apache Flink applications, obtain the
`integration_id` of the Aiven for Apache Flink service from the integration list.

### Step 6: Create Aiven for Apache Flink applications

With the `integration ID` obtained from the previous step, you can now
create an application that uses the integration. For information on how
to create Aiven for Apache Flink applications, see
[avn service flink create-application](/docs/tools/cli/service/flink#avn%20service%20flink%20create-application).

Following is an example of a Google BigQuery SINK table:

```sql
CREATE TABLE `table1` (
    `name` STRING
)
WITH
(
    'connector' = 'bigquery',
    'Service-account' = '',
    'project-id'= '',
    'dataset' = 'bqdataset',
    'table' = 'bqtable',
    'table-create-if-not-exists' = 'true',
)
```

If the integration is successfully created, the service credentials and
project id will be automatically populated in the Sink (if you have left
them back as shown in the example above).

## Configure integration using Aiven Console

If you're using Google BigQuery for your data storage and analysis, you
can seamlessly integrate it as a sink for Aiven for Apache Flink
streams. To achieve this via the [Aiven
Console](https://console.aiven.io/):

1.  Log in to [Aiven Console](https://console.aiven.io/) and choose your
    project.
1.  From the **Services** page, you can either
    [create an Aiven for Apache Flink](/docs/platform/howto/create_new_service) service or
    select an existing service.
1.  Next, configure Google BigQuery service integration endpoint:
    -   Go to the **Projects** page where all the services are
        listed.
    -   From the left sidebar, select **Integration endpoints**.
    -   Select **Google Cloud BigQuery** from the list, and select
        **Add new endpoint** or **Create new**.
    -   Enter the following details to set up the integration:
        -   **Endpoint name**: Enter a name for the integration
            endpoint. For example, `Aiven_BigQuery_Integration`.

        -   **GCP Project ID**: The identifier associated with your
            Google Cloud Project where BigQuery is set up. For example,
            `my-gcp-project-12345`.

        -   **Google Service Account Credentials**: The JSON formatted
            credentials obtained from your Google Cloud Console for
            service account authentication. For example:

            ```json
            {
                "type": "service_account",
                "project_id": "my-gcp-project-12345",
                "private_key_id": "abcd1234",
                ...
            }
            ```

        -   Select **Create**.
1.  Select **Services** and access the Aiven for Apache Flink service
    where you plan to integrate the Google BigQuery endpoint.
1.  If you're integrating with Aiven for Apache Flink for the first
    time, select **Create data pipeline** on the **Overview** page.
    Alternatively, you can add a new integration in the **Data Flow**
    section by using <ConsoleIcon name="plus"/>.
1.  On the **Data Service integrations** page, select **Create
    external integration endpoint**.
1.  Select the checkbox next to BigQuery, and choose the BigQuery
    endpoint from the list to integrate.
1.  Select **Integrate**.

You
can now start creating
[Aiven for Apache Flink applications](/docs/products/flink/howto/create-flink-applications)
that use Google BigQuery as a sink.
