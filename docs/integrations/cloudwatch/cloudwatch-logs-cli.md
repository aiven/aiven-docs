---
title: Send logs to AWS CloudWatch from Aiven client
---

Send logs from your Aiven service to the AWS CloudWatch using the [Aiven client](/docs/tools/cli).

## Prerequisites

This is what you'll need to send your logs from the AWS CloudWatch
using the [Aiven client](/docs/tools/cli).

-   Aiven client installed.
-   An Aiven account with a service running.
-   An AWS account, and which region it is in.
-   An AWS Access Key and Secret Key. Generate the credentials by
    visiting **IAM dashboard** then click **Users**, open the
    **Security credentials** tab, and choose **Create access key**.
    Click **Download** and keep the file.

:::important
Your AWS credentials should have appropriate access rights. According to
the official AWS documentation, the access rights required for the
credentials are:

-   `logs:DescribeLogStreams` which lists the log streams for the
    specified log group endpoint.
-   `logs:CreateLogGroup` which creates a log group with the specified
    name endpoint.
-   `logs:CreateLogStream` which creates a log stream for the
    specified log group.
-   `logs:PutLogEvents` which uploads a batch of log events to the
    specified log stream.
:::

Find more information about [CloudWatch
API](https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_Operations).

## Configure the integration

1.  Open the Aiven client, and log in:

    ```bash
    avn user login <you@example.com> --token
    ```

    See also [avn user access-token](/docs/tools/cli/user/user-access-token).

1.  Collect the following information for the creation of the endpoint
    between your Aiven account and AWS CloudWatch. These are the
    placeholders you will need to replace in the code sample:

    | Variable                | Description                                                                                                                          |
    | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
    | `PROJECT`               | Aiven project where your endpoint will be saved to.                                                                                  |
    | `LOG_GROUP_NAME`        | Used to group your log streams on AWS CloudWatch. It is an optional field. If the value is not provided, it'll be generated for you. |
    | `AWS_REGION`            | The AWS region of your account.                                                                                                      |
    | `AWS_ACCESS_KEY_ID`     | Your AWS access key ID.                                                                                                              |
    | `AWS_SECRET_ACCESS_KEY` | Your AWS secret access key.                                                                                                          |
    | `ENDPOINT_NAME`         | Reference name for this log integration when linking it to other Aiven services.                                                     |

1.  Create the endpoint between your Aiven account and AWS CloudWatch.

    ```bash
    avn service integration-endpoint-create --project PROJECT \
       -d ENDPOINT_NAME -t external_aws_cloudwatch_logs \
       -c log_group_name=LOG_GROUP_NAME \
       -c access_key=AWS_ACCESS_KEY\
       -c secret_key=AWS_SECRET_ACCESS_KEY \
       -c region=AWS_REGION
    ```

1.  Collect the `ENDPOINT_ID` value. You should be able to see
    information about your endpoint by running:

    ```bash
    avn service integration-endpoint-list --project PROJECT
    ```

    ```bash title="Output example"
    ENDPOINT_ID                           ENDPOINT_NAME        ENDPOINT_TYPE
    ====================================  ===================  ===============================
    50020216-61dc-60ca-b72b-000d3cd726cb  ENDPOINT_NAME        external_aws_cloudwatch_logs
    ```

The output will provide you with the `ENDPOINT_ID` to identify your
endpoint, your customized endpoint name and the endpoint type.

## Send logs from an Aiven service to AWS CloudWatch

1.  Collect the following information for sending the service logs of an
    Aiven service to your CloudWatch:

    |       Variable       |                                   Description                                    |
    |----------------------|----------------------------------------------------------------------------------|
    | `PROJECT`            | The Aiven project where your endpoint is saved.                                  |
    | `ENDPOINT_ID`        | Reference name for this log integration when linking it to other Aiven services. |
    | `AIVEN_SERVICE_NAME` | The Aiven service name that you want send the logs from.                         |

1.  Send logs from the Aiven service to AWS CloudWatch by running:

    ```bash
    avn service integration-create --project PROJECT\
       -t external_aws_cloudwatch_logs -s AIVEN_SERVICE_NAME \
       -D ENDPOINT_ID
    ```
