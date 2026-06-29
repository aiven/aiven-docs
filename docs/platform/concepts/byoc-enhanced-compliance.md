---
title: Enhanced compliance BYOC clouds
sidebar_label: Enhanced compliance
keywords: [AWS, Amazon Web Services, byoc, bring your own cloud, custom cloud, compliance, PCI DSS, HIPAA, enhanced compliance]
---

import RelatedPages from "@site/src/components/RelatedPages";

Enhanced compliance clouds are
[bring your own cloud (BYOC)](/docs/platform/concepts/byoc) custom clouds that you create
in your own AWS account to run Aiven services under specific compliance requirements.

:::important
To enable this feature, contact your account team. After the
**compliance deployment models** are enabled for your organization, you select a
compliance deployment model when you
[create an AWS custom cloud](/docs/platform/howto/byoc/create-cloud/create-aws-custom-cloud).
:::

:::note
Enhanced compliance BYOC clouds are different from
[Aiven-managed enhanced compliance environments (ECE)](/docs/platform/concepts/enhanced-compliance-env),
which run on Aiven-managed infrastructure. Enhanced compliance BYOC clouds run in your own
AWS account through BYOC.
:::

## Compliance deployment models

When you create an AWS custom cloud, you choose a deployment model. In addition to the
private (`standard`) and public (`standard_public`) models, two compliance models are
available:

- `hipaa`: For healthcare workloads that handle protected health information (PHI) under the
  Health Insurance Portability and Accountability Act (HIPAA).
- `pci_dss`: For payment workloads that require cardholder data environment (CDE) isolation
  under the Payment Card Industry Data Security Standard (PCI DSS).

Both models apply the same controls. They remain separate so that you can record which
standard applies and so that their requirements can evolve independently.

## How enhanced compliance clouds differ

An enhanced compliance cloud builds on the private (`standard`) BYOC deployment model. It
runs in a dedicated VPC with no shared infrastructure and adds the following controls:

- **No public service access**: Workload nodes have no public IPs, and services are not
  reachable from the public internet. You access them over
  [VPC peering](/docs/platform/howto/vpc-peering-aws) or
  [AWS PrivateLink](/docs/platform/howto/byoc/aws-privatelink-byoc). Indirect access paths,
  such as public query APIs, are also blocked.
- **Bastion-proxied egress**: Workload subnets have no internet egress. The bastion host
  proxies outbound traffic to the Aiven management plane and package repositories. Aiven
  creates no NAT gateways by default. If your compliance requirements allow it, you can
  permit limited egress to specific address ranges, but it is never required.
- **Customer-owned object storage**: Amazon S3 access is restricted to buckets in your own
  AWS account through a VPC gateway endpoint. Aiven stores service
  [backups](/docs/platform/concepts/byoc#byoc-service-backups) and
  [cold data](/docs/platform/howto/byoc/store-data) there, so your data stays in your
  account and Aiven-owned buckets are not used.
- **Resource tagging for governance**: Aiven tags all resources with their compliance model
  (`pci_dss` or `hipaa`) for governance and audit traceability.
- **No forking or cross-cloud migration**: You cannot fork or migrate a service running in
  an enhanced compliance cloud to another cloud. This keeps your data in your AWS account
  and prevents a migrated service from depending on backup storage left behind in its
  original cloud.

## Requirements and limitations

- Compliance deployment models must be enabled for your organization before you can use
  them. Contact your account team to enable them.
- Compliance deployment models are available for **Amazon Web Services (AWS)** only.
- Object storage in your AWS account is required. Aiven uses it for service backups and
  cold data, and you cannot turn it off for these models.
- Plan your network connectivity before you create the cloud, because services are reachable
  only over VPC peering or AWS PrivateLink.
- Meet the [BYOC eligibility requirements](/docs/platform/concepts/byoc#who-is-eligible-for-byoc):
  a commitment deal with Aiven and the
  [Advanced or Premium support tier](/docs/platform/howto/support).

:::tip
If you are unsure which deployment model fits your compliance needs, contact your account
team.
:::

<RelatedPages/>

- [About bring your own cloud](/docs/platform/concepts/byoc)
- [Create an AWS-integrated custom cloud](/docs/platform/howto/byoc/create-cloud/create-aws-custom-cloud)
- [Bring your own cloud networking and security](/docs/platform/howto/byoc/networking-security)
- [Use AWS PrivateLink with BYOC](/docs/platform/howto/byoc/aws-privatelink-byoc)
- [Store data in your BYOC object storage](/docs/platform/howto/byoc/store-data)
- [Aiven-managed enhanced compliance environments (ECE)](/docs/platform/concepts/enhanced-compliance-env)
