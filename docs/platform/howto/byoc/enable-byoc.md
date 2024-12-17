---
title: Enable bring your own cloud (BYOC)
sidebar_label: Enable BYOC
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

Enabling [the bring your own cloud (BYOC) feature](/docs/platform/concepts/byoc) allows you to [create custom clouds](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven organization.

:::note
Enabling [the BYOC feature](/docs/platform/concepts/byoc) or creating custom
clouds in your Aiven environment does not affect the configuration of your
existing Aiven organizations, projects, or services. It only allows you to run Aiven
services in your cloud provider account.
:::

To be able to create custom clouds on the Aiven platform, first you need
to enable the BYOC feature. The [Aiven Console](https://console.aiven.io/)
offers a quick and easy way to set up a short call with the Aiven sales
team to identify your use cases and confirm the requirements. In the
call, we make sure BYOC can address them, and we check your environment
eligibility for the feature.

:::important
Before enabling BYOC, check
[who is eligible for BYOC](/docs/platform/concepts/byoc#eligible-for-byoc) and review
[feature limitations](/docs/platform/howto/byoc/enable-byoc#byoc-enable-limitations) and
[prerequisites](/docs/platform/howto/byoc/enable-byoc#byoc-enable-prerequisites).
:::

## Limitations {#byoc-enable-limitations}

-   You need at least the Advanced tier of
    [Aiven support services](https://aiven.io/support-services) to be eligible for
    activating BYOC.
-   Only [organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
    can request enabling BYOC.

## Prerequisites {#byoc-enable-prerequisites}

-   [Organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
    role for your Aiven organization
-   Access to the [Aiven Console](https://console.aiven.io/)
-   Active account with your cloud provider

## Enable BYOC

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your organization.
1.  Click **Admin** in the top navigation, and click <ConsoleLabel name="bringyourowncloud"/>
    in the sidebar.
1.  In the **Bring your own cloud** view, click **Contact us**.
1.  In the **Contact us** window, enter your email address and country.
    Select the cloud provider, add any other information
    you think might be relevant, and click **Confirm**.

    The scheduling assistant shows up so that you can schedule a short
    call with the Aiven sales team to proceed on your BYOC enablement
    request.
1.  Using the scheduling assistant, select a date and time when to talk to our sales team
    to share your requirements and make sure BYOC suits your needs. Confirm the selected
    time, make sure you add the call to your calendar, and close the the scheduling
    assistant.
1.  Join the scheduled call with our sales team to follow up with us
    on enabling BYOC in your environment.

    If the call reveals BYOC addresses your needs and your environment
    is eligible for BYOC, the feature will be enabled for your Aiven
    organization.

## Next steps

With BYOC activated in your Aiven organization, you can
[create and use custom clouds](/docs/platform/howto/byoc/create-custom-cloud).

## Related pages

-   [About bring your own cloud (BYOC)](/docs/platform/concepts/byoc)
-   [Create a custom cloud](/docs/platform/howto/byoc/create-custom-cloud)
-   [Assign a project to your custom cloud](/docs/platform/howto/byoc/assign-project-custom-cloud)
-   [Add customer's contact information for your custom cloud](/docs/platform/howto/byoc/add-customer-info-custom-cloud)
-   [Tag custom cloud resources](/docs/platform/howto/byoc/tag-custom-cloud-resources)
-   [Rename your custom cloud](/docs/platform/howto/byoc/rename-custom-cloud)
