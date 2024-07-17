---
title: Configure GCP for a Google BigQuery sink connector
---

To be able to sink data from Apache Kafka® to Google BigQuery via the dedicated Aiven connector, open the [GCP console](https://console.cloud.google.com/) and:

-   Create a [Google service account and generate a JSON service
    key](https://cloud.google.com/docs/authentication/client-libraries)
-   Verify that BigQuery API is enabled
-   Create a [BigQuery
    dataset](https://cloud.google.com/bigquery/docs/datasets) or define
    an existing one where the data is going to be stored
-   Grant [dataset access to the service
    account](https://cloud.google.com/bigquery/docs/dataset-access-controls)

## Create a Google service account and generate a JSON service key {#gcp-bigquery-sink-connector-google-account}

Follow the
[instructions](https://cloud.google.com/docs/authentication/client-libraries)
to:

-   create a Google service account
-   create a JSON service key

The JSON service key will be used in the connector configuration.

## Verify that BigQuery API is enabled

The BigQuery sink connector uses the API to push the data. To enable
them:

-   Go to the [GCP API & Services
    dashboard](https://console.cloud.google.com/apis) and click the
    **BigQuery API**.
-   Verify the BigQuery API is already enabled or follow the
    provided steps to enable it.

## Create the Google BigQuery dataset {#gcp-bigquery-sink-connector-bigquery-dataset}

You can either send the Apache Kafka data to an existing Google BigQuery
dataset or create one using [the GCP
console](https://console.cloud.google.com/bigquery) by following the
[instructions in the dedicated
page](https://cloud.google.com/bigquery/docs/datasets).

:::tip
When creating the dataset, specify data location in a region close to
where your Aiven for Apache Kafka is running, to minimize latency.
:::

## Grant dataset access to the service account {#gcp-bigquery-sink-connector-bigquery-dataset-grant}

The newly created service account needs to have access to the dataset in
order to write data to it. Follow the [dedicated
instructions](https://cloud.google.com/bigquery/docs/dataset-access-controls)
to check and modify the dataset permissions. The **BigQuery Data
Editor** is sufficient for the connector to work.
