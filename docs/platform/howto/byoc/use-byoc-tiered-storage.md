---
title: Use tiered storage in custom clouds
sidebar_label: Use tiered storage
keywords: [bring your own cloud, byoc, custom cloud]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

Store data in your custom cloud using tiered storage, a data allocation mechanism for improved efficiency and cost optimization.

To use tiered storage in bring your own cloud (BYOC) environments, both custom clouds and
services operating within those clouds need to have tiered storage activated.

Each custom cloud you create has tiered storage enabled by default. For existing custom
clouds created in the past with no tiered storage support, you can
[activate tiered storage](docs/platform/howto/byoc/use-byoc-tiered-storage#activate-tiered-storage)
in the [Aiven Console](https://console.aiven.io/).

## Prerequisites

- At least one [custom cloud](/docs/platform/howto/byoc/create-custom-cloud)
- At least one [Aiven-manged service](/docs/platform/howto/create_new_service) hosted in
  the custom cloud

## Limitation

- BYOC supports
[tiered storage for Aiven for Apache Kafka®](/docs/products/kafka/howto/kafka-tiered-storage-get-started)
only.
- You cannot deactivate tiered storage on your custom cloud once it's activated.

## Activate tiered storage on a service

[Enable tiered storage for Aiven for Apache Kafka®](/docs/products/kafka/howto/enable-kafka-tiered-storage).

## Activate tiered storage on a custom cloud

1. Log in to the [Aiven Console](https://console.aiven.io/), and go to your organization.
1. Click **Admin** in the top navigation, and click <ConsoleLabel name="bringyourowncloud"/>
   in the sidebar.
1. Select a custom cloud where to activate tiered storage, and go to the **Tiered storage**
   tab.
1. Click **Activate tiered storage**, use the toggle for enabling tiered storage, and click
   **Next**.

   Now, the updated infrastructure Terraform template and variables file are generated with
   the new tiered storage configuration.

1. Copy or download the template and re-deploy it in your remote cloud account using the
   variables provided in the variables file.

## Related pages

-   [About bring your own cloud (BYOC)](/docs/platform/concepts/byoc)
-   [Enable bring your own cloud (BYOC)](/docs/platform/howto/byoc/enable-byoc)
-   [Create a custom cloud in Aiven](/docs/platform/howto/byoc/create-custom-cloud)
-   [Assign a project to your custom cloud](/docs/platform/howto/byoc/assign-project-custom-cloud)
-   [Add customer's contact information for your custom cloud](/docs/platform/howto/byoc/add-customer-info-custom-cloud)
-   [Rename your custom cloud](/docs/platform/howto/byoc/rename-custom-cloud)
-   [Tag custom cloud resources](/docs/platform/howto/byoc/tag-custom-cloud-resources)
