---
title: Create a custom cloud
sidebar_label: Create custom clouds
keywords: [AWS, Amazon Web Services, GCP, Google Cloud Platform, byoc, bring your own cloud, custom cloud]
---

import DocCardList from '@theme/DocCardList';
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Create a [custom cloud](/docs/platform/concepts/byoc) for BYOC in your Aiven organization to better address your specific business needs or project requirements.

:::note

-   Creating and using custom clouds in your Aiven organization requires
    enabling
    [the _bring your own cloud (BYOC)_ feature](/docs/platform/concepts/byoc). Check
    [who is eligible for BYOC](/docs/platform/concepts/byoc#who-is-eligible-for-byoc). To
    use the feature,
    [enable BYOC in your Aiven organization](/docs/platform/howto/byoc/enable-byoc).
-   Enabling
    [the BYOC feature](/docs/platform/concepts/byoc) or creating custom clouds in your
    Aiven environment does not affect the configuration of your existing organizations,
    projects, or services. This only makes the new BYOC capabilities available in your
    environment.

:::

The process of creating a custom cloud in Aiven differs depending on the
cloud provider to integrate with. You can use self-service and create custom clouds on your
own if your cloud provider is AWS or Google Cloud:

<DocCardList />

#### Limitations

-   You need at least the Advanced tier of Aiven support services to be
    eligible for activating BYOC.

    :::tip
    See [Aiven support tiers](https://aiven.io/support-services) and
    [Aiven responsibility matrix](https://aiven.io/responsibility-matrix) for BYOC.
    Contact your account team to learn more or upgrade your support tier.
    :::

-   Only [super admins](/docs/platform/howto/make-super-admin) can create custom clouds.

#### Related pages

-   [About bring your own cloud](/docs/platform/concepts/byoc)
-   [Bring your own cloud networking and security](/docs/platform/howto/byoc/networking-security)
-   [Enable bring your own cloud (BYOC)](/docs/platform/howto/byoc/enable-byoc)
-   [Create a custom cloud in Aiven](/docs/platform/howto/byoc/create-custom-cloud)
-   [Assign a project to your custom cloud](/docs/platform/howto/byoc/assign-project-custom-cloud)
-   [Add customer's contact information for your custom cloud](/docs/platform/howto/byoc/add-customer-info-custom-cloud)
-   [Rename a custom cloud](/docs/platform/howto/byoc/rename-custom-cloud)
-   [Download an infrastructure template and a variables file](/docs/platform/howto/byoc/download-infrastructure-template)
-   [Tag custom cloud resources](/docs/platform/howto/byoc/tag-custom-cloud-resources)
-   [Storing data in custom clouds](/docs/platform/howto/byoc/store-data)
-   [Delete a custom cloud](/docs/platform/howto/byoc/delete-custom-cloud)
