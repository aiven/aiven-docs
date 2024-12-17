---
title: Google Cloud Logging
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

You can send your service logs to Google Cloud Logging to store, search, analyze, monitor, and alert on log data from your Aiven services.

## Prerequisites

- You have a Google Project ID and Log ID. More information about
  Google Cloud projects is available in the [Google Cloud
  documentation](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
- You have Google Cloud service account credentials in JSON format created within the
  same Google Cloud project where logs will be sent. See Google Cloud's documentation for
  [instructions on how to create and get service account credentials](https://developers.google.com/workspace/guides/create-credentials).
- The service account has permission to create log entries. See the
  Google Cloud documentation for information on
  [access control with IAM](https://cloud.google.com/logging/docs/access-control).

## Set up Cloud Logging integration in Aiven Console

### Step 1. Create the integration endpoint

1. Go to <ConsoleLabel name="integration endpoints"/>.
1. Select **Google Cloud Logging**.
1. Click **Add new endpoint**.
1. Enter a name.
1. Enter the **GCP Project ID** and **Log ID** from Google Cloud.
1. Enter the **Google Service Account Credentials** in JSON format.
1. Click **Create**.

:::warning
Cross-project service account credentials do not work with
**Google Service Account Credentials** for this integration. Ensure that the
service account is created within the same Google Cloud project where logs are sent.
:::

### Step 2. Add the integration endpoint to your service

1. Go to the service to add the logs integration to.
1. On the sidebar, click <ConsoleLabel name="integrations"/>.
1. Select **Google Cloud Logging**.
1. Choose the endpoint that you created.
1. Click **Enable**.

## Set up Cloud Logging integration using the CLI

### Step 1. Create the integration endpoint

```
avn service integration-endpoint-create --project your-project-name         \
    -d "Google Cloud Logging" -t external_google_cloud_logging              \
    -c project_id=your-gcp-project-id                                       \
    -c log_id=my-aiven-service-logs                                         \
    -c service_account_credentials='{"type": "service_account"...}
```

### Step 2. Add the integration endpoint to your service

1. Get the endpoint identifier:

   ```shell
   avn service integration-endpoint-list --project your-project-name
   ```

1. Use the `endpoint_id` to attach the service to the endpoint:

   ```shell
   avn service integration-create --project your-project-name  \
   -t external_google_cloud_logging -s your-service            \
   -D <ENDPOINT_ID>
   ```
