---
title: Send metrics to Amazon CloudWatch
---

Aiven enables you to send your service metrics to your [Amazon (AWS) CloudWatch](https://aws.amazon.com/cloudwatch/).

## Prerequisites

-   An AWS account, and which region it is in.
-   An Aiven account with a service running.
-   An AWS Access Key and Secret Key.

:::tip
To generate your AWS credentials, visit your AWS console under the **IAM
dashboard** then click in **Users**, open the **Security credentials**
tab, and choose **Create access key**. Click on **Download** and keep the file.
:::

## Configure the integration

Your first step is to create the endpoint to be used between the Aiven
service and the AWS CloudWatch. This setup only needs to be done once.

1. Click **Integration endpoints** in the web console, then choose
    **AWS CloudWatch Metrics** and **Add a new endpoint** or **Create
    new**.

    ![Screenshot of Aiven Integrations](/images/integrations/aiven-integrations.png)

1. Configure the settings for the new endpoint:
    -   **Endpoint name** is how you will refer to the AWS CloudWatch
        metrics integration when linking it to an Aiven service.
    -   **CloudWatch Namespace** where your metrics can be organized in
        different spaces.
    -   Your AWS credentials: **Access Key** and **Secret Key**.
    -   Your AWS account **Region**.
1. To save this endpoint, click in **Create**.

## Send metrics from an Aiven service to AWS CloudWatch

For each of the services whose metrics should be sent to your AWS CloudWatch:

1. From the **Overview** page of your service, select **Integrations**
   and choose the **Amazon CloudWatch Metrics** option.

   ![Screenshot of system integrations including AWS CloudWatch Metrics](/images/integrations/cloudwatch-overview-integrations.png)

1. Choose the endpoint by the **Endpoint name** you created earlier
   from the dropdown and choose **Continue**.

1. Customize which metrics you want to send to the CloudWatch. To do
   this, toggle a metric group or individual metric field.

   ![Screenshot of CloudWatch Metrics Aiven list](/images/integrations/cloudwatch-metrics-list.png)

1. Go to your AWS account and check the **CloudWatch** service. You can
   go to the **Metrics** section to see your Aiven service metrics
   data. It may take a few minutes until the data arrives.

## Related pages

Learn more about [Amazon CloudWatch and Aiven](/docs/integrations/cloudwatch).
