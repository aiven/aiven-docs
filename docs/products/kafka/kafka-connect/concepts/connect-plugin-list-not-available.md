---
title: Troubleshoot connector list unavailable in Apache Kafka® Connect
---

When you try to view connectors in Aiven for Apache Kafka® Connect, you might see the message `connector list not currently available`.
This means the Kafka Connect service failed to return the list of installed connectors.

:::note
[Aiven Terraform Provider](/docs/tools/terraform) also displays the `connector list not currently available` message, for example when running `terraform plan`, because it uses the same backend API as the Aiven Console.
:::

## Common causes and solutions

<details open>
<summary>Kafka Connect service is starting</summary>

If you recently created the service, wait 2 to 5 minutes for all nodes to become fully
operational. The connector list loads automatically after initialization.
</details>

<details open>
<summary>Kafka Connect was recently enabled</summary>

After you enable Kafka Connect on an existing Kafka service, the service takes
30 to 60 seconds to initialize. Refresh the page after that.
</details>

<details open>
<summary>Connector creation or update in progress</summary>

During connector creation or updates, the list might be unavailable for 10 to 30 seconds.
It refreshes automatically after the operation completes.
</details>

<details open>
<summary>Kafka Connect service is low on memory</summary>

If the service is running out of memory, the connector list might continue to be
unavailable. Upgrade to a larger service plan to resolve the issue.

</details>

<details open>
<summary>One of the Kafka Connect nodes is unavailable</summary>

The connector list is retrieved from a randomly selected node. If a node is unavailable,
the request might fail intermittently. The node usually recovers automatically. If the
issue persists, contact [Aiven support](/docs/platform/howto/support).
</details>
