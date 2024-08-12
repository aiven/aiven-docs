---
title: Manage quotas
---

You can add and manage quotas for your Aiven for Apache Kafka® service using the [Aiven Console](https://console.aiven.io/).
For an overview of quotas, see [Quotas in Aiven for Apache Kafka](/docs/products/kafka/concepts/kafka-quotas).

:::note
To add quotas using APIs, see [Aiven API
documentation](https://api.aiven.io/doc/).
:::

## Add quota

To add quota to your Aiven for Apache Kafka service:

1.  Log in to [Aiven Console](https://console.aiven.io/) and select the
    Aiven for Apache Kafka service to manage.

1.  Select **Quotas** from the left sidebar and select **Add quota**.

1.  Enter the **Client ID** or **User** for which to set the
    quota. **Client ID** represents a unique identifier assigned to a
    Kafka client. **User** refers to the user or user group
    associated with the client.

1.  Choose one of the following quota types and enter the desired value
    for the selected quota type:

    -   **Consumer throttle** (quota limit in bytes per second): Specify
        the maximum data transfer rate allowed for the consumer.
    -   **Producer throttle** (quota limit in bytes per second): Specify
        the maximum data transfer rate allowed for the producer.
    -   **CPU throttle** (quota limit as a percentage): Specify the
        maximum CPU usage allowed for the client.

    :::note
    Aiven also supports **default** quotas, which can be applied to all
    clients and/or users by using the keyword **default** in either the
    client ID or user field.
    :::

1.  Select **Add** to add quota.

Additionally, you can add more quotas by selecting the **Add quota**
option on the right-side.

## Update quota

To update an existing quota:

1.  Select **Quotas** from the left sidebar for your Apache Kafka
    service.
1.  Locate the quota to update.
1.  From the ellipsis menu, select **Update** to open the **Update
    quota** screen.
1.  Modify the quota value as needed.
1.  Select **Save changes** to save the changes and update the quota.

## Delete quota

To remove a quota:

1.  Select **Quotas** from the left sidebar for your Apache Kafka
    service.
1.  Locate the quota to delete.
1.  From the ellipsis menu, select **Delete**.
1.  On the confirmation dialog, select **Delete quota** to delete the
    quota.
