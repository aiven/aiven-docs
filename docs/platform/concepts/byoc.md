---
title: Bring your own cloud (BYOC)
sidebar_label: Bring your own cloud
keywords: [AWS, Amazon Web Services, GCP, Google Cloud Platform, private deployment, public deployment, byoc, bring your own cloud, custom cloud]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import byocAwsPrivate from "@site/static/images/content/figma/byoc-aws-private.png";
import byocAwsPublic from "@site/static/images/content/figma/byoc-aws-public.png";
import byocGcpPrivate from "@site/static/images/content/figma/byoc-gcp-private.png";
import byocGcpPublic from "@site/static/images/content/figma/byoc-gcp-public.png";

_Bring your own cloud_ (BYOC) allows you to use your own cloud infrastructure instead of relying on the Aiven-managed infrastructure.

Aiven services are usually deployed on Aiven-managed infrastructure, using
Aiven-managed security protocols, and backed by Aiven-managed storage and
backups. This provides a straightforward and safe approach to deploying Aiven
services. However, you might need a different configuration if your business,
project, or organization has specific requirements. With BYOC, your Aiven
organization gets connected with your cloud provider account by creating _custom
clouds_ in your Aiven organization.

A custom cloud is a secure environment within your cloud provider account to run
Aiven-managed data services. By enabling BYOC, creating custom clouds, and
setting up Aiven services within the custom clouds, you can manage your
infrastructure on the Aiven platform while keeping your data in your own cloud.

## Why use BYOC

Consider using BYOC and custom clouds if you have specific business
needs or project requirements, such as:

-   **Compliance**: Aiven offers managed environments for several
    standard compliance regulations, such as HIPAA, PCI DSS, and GDPR.
    However, if you have strict regulatory requirements or special
    compliance requirements, BYOC may be the best option for you.
-   **Network auditing**: If you require the visibility of all traffic
    within any VPC you operate in or need frequent auditing
    capabilities, BYOC is potentially a good fit. BYOC gives you the
    ability to audit network metadata but not the actual contents.
-   **Fine-grained network control**: BYOC only requires specific
    network access for Aiven (for example, service management or
    troubleshooting) to deploy and manage open source data services,
    otherwise allowing you to customize your network to meet any
    internal requirements or requirements of your customers.
-   **Cost optimization**: Depending on your cloud provider, with BYOC
    you can use cost savings plans, committed use discounts, or other
    strategies to save on compute and storage infrastructure costs
    related to Aiven services.

## Who is eligible for BYOC {#eligible-for-byoc}

The BYOC setup is a bespoke service offered on a case-by-case basis, and
not all cloud providers support it yet. You're eligible for BYOC if:

-   You use Amazon Web Services (AWS), Google Cloud Platform (GCP), Microsoft Azure
    (excluding Azure Germany), or Oracle Cloud Infrastructure (OCI).
-   You have a commitment deal with Aiven.
-   You have the [Advanced or Premium support tier](/docs/platform/howto/support).

    :::note
    See [Aiven support tiers](https://aiven.io/support-services) and
    [Aiven responsibility matrix](https://aiven.io/responsibility-matrix) for BYOC. Contact
    your account team to learn more or upgrade your support tier.
    :::

## When to use the regular Aiven deployment

BYOC deployments are not automated, and they add additional complexity
to communicating to the Aiven control plane, service management, key
management, and security.

In most cases, you can meet your regulatory and business requirements by
utilizing a regular Aiven deployment or
[Enhanced Compliance Environment](/docs/platform/concepts/enhanced-compliance-env).

:::tip
If you would like to understand BYOC better or are unsure which
deployment model is the best fit for you, contact your account team.
:::

## BYOC pricing and billing

Unlike Aiven's standard all-inclusive pricing, the BYOC setup has
custom pricing depending on the nature of your requirements. If you
enter this arrangement, you are responsible for all cloud infrastructure
and network traffic charges.

You receive two separate monthly invoices, one from Aiven for their
managed services and another from the cloud service provider for the
cloud infrastructure costs. This enables you to use any cloud commit you
may have and potentially leverage enterprise discounts in certain cases.

:::note
For a cost estimate and analysis, contact your account team.
:::

## BYOC architecture {#byoc-deployment}

<Tabs groupId="group1">
<TabItem value="1" label="AWS private" default>

<img src={byocAwsPrivate} class="centered" alt="BYOC AWS private architecture" width="100%" />

In the AWS private deployment model, a Virtual Private Cloud (**BYOC VPC**) for your Aiven
services is created within a particular cloud region in your remote cloud account.
Aiven accesses this VPC from a static IP address and routes
traffic through a proxy for additional security. To accomplish this, Aiven
utilizes a bastion host (**Bastion node**) physically separated from the Aiven services
you deploy. The service VMs reside in a privately addressed subnet (**Private subnet**)
and are accessed by the Aiven management plane via the bastion. They are not
accessible through the Internet.

:::note
Although the bastion host and the service nodes reside in the VPC under
your management (**BYOC VPC**), they are not accessible (for example, via SSH) to anyone
outside Aiven.

The bastion and workload nodes require outbound access to the Internet
to work properly (supporting HA signaling to the Aiven management node and RPM download
from Aiven repositories).
:::

</TabItem>
<TabItem value="2" label="AWS public">

<img src={byocAwsPublic} class="centered" alt="BYOC AWS public architecture" width="100%" />

In the AWS public deployment model, a Virtual Private Cloud (**BYOC VPC**) for your Aiven
services is created within a particular cloud region in your remote cloud account.
Aiven accesses this VPC through an Internet gateway. Service VMs reside in a publicly
addressed subnet (**Public subnet**), and Aiven services can be accessed
through the public Internet: the Aiven control plane connects to the nodes
using the public address, and the Aiven management plane can access the service VMs
directly.
</TabItem>
<TabItem value="3" label="GCP private">

<img src={byocGcpPrivate} class="centered" alt="BYOC GCP private architecture" width="100%" />

In the GCP private deployment model, a Virtual Private Cloud (**BYOC VPC**) for your Aiven
services is created within a particular cloud region in your remote cloud account.
Within the **BYOC VPC**, there are:

- **Public subnet** for the bastion node
- **Private subnet** for the workload nodes (your Aiven services)

Aiven accesses the **BYOC VPC** from a static IP address and routes
traffic through a proxy for additional security. To accomplish this, Aiven
utilizes a bastion host (**Bastion note**) physically separated from the Aiven services
you deploy. The service VMs reside in a privately addressed subnet (**Private subnet**)
and are accessed by the Aiven management plane via the bastion. They are not
accessible through the Internet.

:::note
Although the bastion host and the service nodes reside in the VPC under
your management (**BYOC VPC**), they are not accessible (for example, via SSH) to anyone
outside Aiven.

The bastion and workload nodes require outbound access to the Internet
to work properly (supporting HA signaling to the Aiven management node and RPM download
from Aiven repositories).
:::

</TabItem>
<TabItem value="4" label="GCP public">

<img src={byocGcpPublic} class="centered" alt="BYOC GCP public architecture" width="100%" />

In the GCP public deployment model, a Virtual Private Cloud (**Workload VPC**) for your
Aiven services is created within a particular cloud region in your remote cloud account.
Aiven accesses this VPC through an Internet gateway. Service VMs reside in a publicly
addressed subnet (**Public subnet**), and Aiven services can be accessed
through the public Internet: the Aiven control plane connects to the nodes
using the public address, and the Aiven management plane can access the service VMs
directly.
</TabItem>
</Tabs>

Firewall rules are enforced on the subnet level.
You can integrate your services using standard VPC peering techniques.
All Aiven communication is encrypted.

## BYOC and backups

Depending on the service used, Aiven takes regular backups to enable
forking, point in time recovery (PITR), and disaster recovery. These
backups by default do not reside in your cloud. If there is a
requirement to have all backups in your own cloud account, it's still possible.
To accomplish this, Aiven needs read-write permissions to access the object storage on
your cloud account.

:::important
All backups are encrypted using Aiven-managed keys, and you are
responsible for managing object storage configurations.
:::

## Dev tools for BYOC

With BYOC, you can use any standard Aiven method (for example,
`avn` [CLI client](/docs/tools/cli) or [Aiven Terraform Provider](/docs/tools/terraform))
to manage your services and generally have the same user experience as with the regular
Aiven deployment model.

## Related pages

-   [Enable the BYOC feature](/docs/platform/howto/byoc/enable-byoc)
-   [Create a custom cloud in Aiven](/docs/platform/howto/byoc/create-custom-cloud)
-   [Assign a project to your custom cloud](/docs/platform/howto/byoc/assign-project-custom-cloud)
-   [Add customer's contact information for your custom cloud](/docs/platform/howto/byoc/add-customer-info-custom-cloud)
-   [Tag custom cloud resources](/docs/platform/howto/byoc/tag-custom-cloud-resources)
-   [Rename your custom cloud](/docs/platform/howto/byoc/rename-custom-cloud)
