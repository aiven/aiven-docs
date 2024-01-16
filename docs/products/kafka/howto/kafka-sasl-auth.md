---
title: Use SASL authentication with Aiven for Apache Kafka®
---

Aiven offers a selection of
[authentication methods for Apache Kafka®](../concepts/auth-types), including
[SASL](https://en.wikipedia.org/wiki/Simple_Authentication_and_Security_Layer)
(Simple Authentication and Security Layer).

1.  In the [Aiven Console](https://console.aiven.io/), select your
    project and then choose your Aiven for Apache Kafka® service.
2.  In the service page, select **Service settings** from the sidebar.
3.  On the **Service settings** page, scroll down to the **Advanced
    configuration** section.
4.  Click **Configure**.
5.  In the **Advanced configuration** dialog, set the
    `kafka_authentication_methods.sasl` toggle to the enabled position.
6.  Click **Save configuration**.

The **Connection information** at the top of the **Overview** page will
now offer the ability to connect via SASL or via Client Certificate.

![Choose between SASL and certificate connection details](/images/products/kafka/sasl-connect.png)

:::note
Although these connections use a different port, the host, CA, and user
credentials remain consistent.
:::
