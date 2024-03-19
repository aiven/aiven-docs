---
title: Set Apache ZooKeeper™ configuration
---

Apache ZooKeeper™ is a crucial component used by Apache Kafka® and Aiven
management software to facilitate efficient cluster operations. By
default, access to ZooKeeper is restricted to ensure cluster stability.
However, it is possible to modify the ZooKeeper configuration properties
as needed.

In order to change ZooKeeper configuration properties follow these
steps:

1.  In the [Aiven Console](https://console.aiven.io/), select your
    project and then choose your Aiven for Apache Kafka® service.
2.  In the service page, select **Service settings** from the sidebar.
3.  On the **Service settings** page, scroll down to the **Advanced
    configuration** section, and click **Configure**.
4.  In the **Advanced configuration** dialog, click **Add configuration
    option** to add new configurations or modify the values of existing
    configurations.
5.  Click **Save configuration**.

The service configuration will be then updated.

:::note
Latest versions of Apache Kafka allow ZooKeeper-less mode, however, you
can continue using the advanced configuration settings as before.
:::

:::note
Apache ZooKeeper is a trademark of the Apache Software Foundation in
the United States and/or other countries
:::
