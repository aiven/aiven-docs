---
title: Configure GCP for a Google Cloud Storage sink connector
---

You can sink data from Apache Kafka® to Google Cloud Storage via the dedicated Aiven connector.
To do so, in the [GCP console](https://console.cloud.google.com/):

1.  Create a [Google Cloud Storage (GCS) bucket](https://console.cloud.google.com/storage/)
    where the data is going to be stored.
1.  Create a [Google service account and generate a JSON service
    key](https://cloud.google.com/docs/authentication/client-libraries).
1.  Grant the service account access to the GCS bucket.

## Create the Google Cloud Storage (GCS) bucket {#gcs-sink-connector-google-bucket}

You can create the GCS bucket using the [dedicated Google cloud console
page](https://console.cloud.google.com/storage/). When creating the
bucket, specify bucket name and location, the other settings can be left
as default.

## Create a Google service account and generate a JSON service key {#gcs-sink-connector-google-account}

Follow the
[instructions](https://cloud.google.com/docs/authentication/client-libraries)
to:

-   Create a Google service account.
-   Create a JSON service key.

The JSON service key will be used in the connector configuration

## Grant the service account access to the GCS bucket

Navigate in the GCS bucket detail page, in the **Permissions** tab and
grant access to the newly created service account to the bucket. The
following object permissions must be enabled in the bucket:

-   `storage.objects.create`
-   `storage.objects.delete` (needed for overwriting, for
    example on re-processing)

The connector should be granted these permissions via a custom role or
the standard role **Storage Legacy Bucket Writer**. You also need to
ensure the bucket doesn't have a retention policy that prohibits
overwriting.
