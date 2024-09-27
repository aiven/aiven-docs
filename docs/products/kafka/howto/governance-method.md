---
title: Governance method for Aiven for Apache Kafka®
sidebar_label: Governance method
---
import ConsoleLabel from "@site/src/components/ConsoleIcons"

You can manage governance for Aiven for Apache Kafka® service using either the Aiven Console or the Terraform Provider.

Depending on your workflow, choose between:

- **Aiven Console**: Manage governance tasks visually through the Aiven Console. View
  and claim ownership of resources in the Topic Catalog.

- **Terraform Provider**: Automate governance with the Terraform Provider. It integrates
  with GitOps workflows and allows governance management across multiple projects.

When using Terraform, all governance actions must be performed through Terraform. The
Aiven Console will only display requests and cannot perform operations like
approving or declining them.

## Select the governance method

1. On the **Administration** page, click <ConsoleLabel name="governance"/>.
1. In the **Governance method** section, click **Change**.
1. In the **Select governance method** dialog, choose either **Aiven Console** or
   **Terraform**.

:::warning
Switching from the Aiven Console to the Terraform method results in losing any pending
requests.
:::

1. Click **Save**.
