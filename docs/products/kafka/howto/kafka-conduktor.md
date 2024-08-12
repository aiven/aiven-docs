---
title: Connect to Apache Kafka® with Conduktor
---

[Conduktor](https://www.conduktor.io/) is a friendly user interface for Apache Kafka and it works with Aiven and offers built-in support for setting up the connection.

1.  Visit the **Service overview** page for your Aiven for Apache Kafka®
    service (the [Getting started with Aiven for Apache Kafka®](/docs/products/kafka/get-started) page is a good place for more information about creating
    a new service if you don't have one already).

1.  Download the **Access Key**, **Access Certificate** and **CA Certificate**.

1.  Choose **New Kafka Cluster** on the main pane, and click the
    **Aiven** icon. Add the following fields:

    -   **Host** and **port**, you can copy these from the **Service overview**
        page.
    -   The three files downloaded: access key, access certificate and
        CA certificate.

    ![Screenshot of the cluster configuration screen](/images/content/products/kafka/conduktor-config.png)

    Conduktor will create the keystore and truststore files in the
    folder that you specified, or you can choose an alternative
    location. Click **Create** and the helper will create the
    configuration for Conduktor to connect to your Aiven for Apache
    Kafka service.

1.  Click **Test Kafka Connectivity**.

    :::tip
    If you experience a Java SSL error when testing the connectivity,
    add the service CA certificate to the list of Conduktor's trusted
    certificates.

    -   Download the **CA Certificate** file to your computer.
    -   In the Conduktor application, click the settings dropdown in the
        bottom right hand side and choose **Network**.
    -   On the **Trusted Certificates** tab, select **Import** and
        supply the CA certificate file you downloaded. Save the
        settings.
    :::

Once connected, you can visit the [Conduktor
documentation](https://docs.conduktor.io/) to learn more about using
this tool.
