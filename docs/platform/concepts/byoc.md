---
title: Bring your own cloud (BYOC)
sidebar_label: Bring your own cloud
keywords: [AWS, Amazon Web Services, GCP, Google Cloud Platform, private deployment, public deployment, byoc, bring your own cloud, custom cloud, backup]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import byocAwsPrivate from "@site/static/images/content/figma/byoc-aws-private.png";
import byocAwsPublic from "@site/static/images/content/figma/byoc-aws-public.png";
import byocGcpPrivate from "@site/static/images/content/figma/byoc-gcp-private.png";
import byocGcpPublic from "@site/static/images/content/figma/byoc-gcp-public.png";
import byocHowItWorks from "@site/static/images/content/figma/byoc-how-it-works.png";

Bring your own cloud (BYOC) allows you to use your own cloud infrastructure instead of relying on the Aiven-managed infrastructure.

Aiven services are usually deployed on Aiven-managed infrastructure, using
Aiven-managed security protocols, and backed by Aiven-managed storage and
backups. This provides a straightforward and safe approach to deploying Aiven
services. However, you might need a different configuration if your business,
project, or organization has specific requirements. With BYOC, your Aiven
organization gets connected with your cloud provider account by creating custom
clouds in your Aiven organization.

## How it works

A custom cloud is a secure environment within your cloud provider account to run
Aiven-managed data services. By enabling BYOC, creating custom clouds, and
setting up Aiven services within the custom clouds, you can manage your
infrastructure on the Aiven platform while keeping your data in your own cloud.

<img src={byocHowItWorks} className="centered" alt="How BYOC works" width="100%" />

1. [Enable BYOC](/docs/platform/howto/byoc/enable-byoc) in your Aiven organization by
   setting up a call with the Aiven sales team to share your use case and its requirements.
1. [Create a custom cloud](/docs/platform/howto/byoc/create-cloud/create-custom-cloud) in the Aiven
   Console or CLI by providing cloud setup details essential to generate your custom cloud
   infrastructure template.
1. **Integrate your cloud account with Aiven** by applying the infrastructure template for
   [AWS](/docs/platform/howto/byoc/create-cloud/create-aws-custom-cloud#deploy-the-template)
   or
   [Google Cloud](/docs/platform/howto/byoc/create-cloud/create-google-custom-cloud#deploy-the-template).
1. [Deploy services](/docs/platform/howto/byoc/manage-byoc-service) by creating new
   Aiven-managed services in the custom cloud or migrating existing Aiven-managed services
   to the custom cloud.
1. **View Aiven-managed assets in your cloud account**: You can preview Aiven-managed
   services and infrastructure in your cloud account.

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

## Who is eligible for BYOC

The BYOC setup is a bespoke service offered on a case-by-case basis, and
not all cloud providers support it yet. You're eligible for BYOC if:

-   You use Amazon Web Services (AWS) or Google Cloud.
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

## BYOC architecture

<Tabs groupId="group1">
<TabItem value="1" label="AWS private" default>

<img src={byocAwsPrivate} className="centered" alt="BYOC AWS private architecture" width="100%" />

In the AWS private deployment model, a Virtual Private Cloud (**BYOC VPC**) for your Aiven
services is created within a particular cloud region in your remote cloud account.
Aiven accesses this VPC from a static IP address and routes
traffic through a proxy for additional security. To accomplish this, Aiven
utilizes a bastion host (**Bastion node**) logically separated from the Aiven services
you deploy. The service VMs reside in a privately addressed subnet (**Private subnet**)
and are accessed by the Aiven management plane via the bastion. They are not
accessible through the internet.

:::note
Although the bastion host and the service nodes reside in the VPC under
your management (**BYOC VPC**), they are not accessible (for example, via SSH) to anyone
outside Aiven.

The bastion and workload nodes require outbound access to the internet
to work properly (supporting HA signaling to the Aiven management node and RPM download
from Aiven repositories).
:::

</TabItem>
<TabItem value="2" label="AWS public">

<img src={byocAwsPublic} className="centered" alt="BYOC AWS public architecture" width="100%" />

In the AWS public deployment model, a Virtual Private Cloud (**BYOC VPC**) for your Aiven
services is created within a particular cloud region in your remote cloud account.
Aiven accesses this VPC through an internet gateway. Service VMs reside in a publicly
addressed subnet (**Public subnet**), and Aiven services can be accessed
through the public internet: the Aiven control plane connects to the nodes
using the public address, and the Aiven management plane can access the service VMs
directly. To restrict access to your service, you can use the
[IP filter](/docs/platform/howto/restrict-access).
</TabItem>
<TabItem value="3" label="Google Cloud private">

<img src={byocGcpPrivate} className="centered" alt="BYOC Google Cloud private architecture" width="100%" />

In the Google Cloud private deployment model, a Virtual Private Cloud (**BYOC VPC**) for
your Aiven services is created within a particular cloud region in your remote cloud account.
Within the **BYOC VPC**, there are:

- **Public subnet** for the bastion node
- **Private subnet** for the workload nodes (your Aiven services)

Aiven accesses the **BYOC VPC** from a static IP address and routes
traffic through a proxy for additional security. To accomplish this, Aiven
utilizes a bastion host (**Bastion note**) logically separated from the Aiven services
you deploy. The service VMs reside in a privately addressed subnet (**Private subnet**)
and are accessed by the Aiven management plane via the bastion. They are not
accessible through the internet.

:::note
Although the bastion host and the service nodes reside in the VPC under
your management (**BYOC VPC**), they are not accessible (for example, via SSH) to anyone
outside Aiven.

The bastion and workload nodes require outbound access to the internet
to work properly (supporting HA signaling to the Aiven management node and RPM download
from Aiven repositories).
:::

</TabItem>
<TabItem value="4" label="Google Cloud public">

<img src={byocGcpPublic} className="centered" alt="BYOC Google Cloud public architecture" width="100%" />

In the Google Cloud public deployment model, a Virtual Private Cloud (**Workload VPC**)
for your Aiven services is created within a particular cloud region in your remote cloud
account. Aiven accesses this VPC through an internet gateway. Service VMs reside in a
publicly addressed subnet (**Public subnet**), and Aiven services can be accessed
through the public internet: the Aiven control plane connects to the nodes
using the public address, and the Aiven management plane can access the service VMs
directly. To restrict access to your service, you can use the
[IP filter](/docs/platform/howto/restrict-access).
</TabItem>
</Tabs>

Firewall rules are enforced on the subnet level.
You can integrate your services using standard VPC peering techniques.
All Aiven communication is encrypted.

## BYOC service backups

Depending on the BYOC service, Aiven takes
[regular service backups](/docs/platform/concepts/service_backups) to enable forking, point
in time recovery (PITR), and disaster recovery.
These backups by default do not reside in your cloud. If there is a
requirement to have all backups in your own cloud account, it's still possible.
To accomplish this, Aiven needs read-write permissions to access the object storage on
your cloud account.

:::important

- All backups are encrypted using Aiven-managed keys.
- You are responsible for managing object storage configuration.

:::

## Dev tools for BYOC

With BYOC, you can use any standard Aiven method (for example,
`avn` [CLI client](/docs/tools/cli) or [Aiven Terraform Provider](/docs/tools/terraform))
to manage your services and generally have the same user experience as with the regular
Aiven deployment model.

## Related pages

-   [Bring your own cloud networking and security](/docs/platform/howto/byoc/networking-security)
-   [Enable bring your own cloud (BYOC)](/docs/platform/howto/byoc/enable-byoc)
-   [Create a custom cloud in Aiven](/docs/platform/howto/byoc/create-cloud/create-custom-cloud)
-   [Manage services hosted in custom clouds](/docs/platform/howto/byoc/manage-byoc-service)
