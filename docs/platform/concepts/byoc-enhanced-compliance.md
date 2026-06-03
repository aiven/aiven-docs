---
title: Enhanced compliance BYOC clouds
sidebar_label: Enhanced compliance
keywords: [AWS, Amazon Web Services, byoc, bring your own cloud, custom cloud, compliance, PCI DSS, HIPAA, enhanced compliance]
---

import RelatedPages from "@site/src/components/RelatedPages";

Enhanced compliance clouds are
[bring your own cloud (BYOC)](/docs/platform/concepts/byoc) custom clouds that you create
in your own AWS account to run Aiven services under specific compliance requirements.

Previously, Aiven set up compliance-oriented BYOC clouds manually. You can now create them
yourself by selecting a **compliance deployment model** when you
[create an AWS custom cloud](/docs/platform/howto/byoc/create-cloud/create-aws-custom-cloud).

:::note
Enhanced compliance BYOC clouds are different from
[Aiven-managed enhanced compliance environments (ECE)](/docs/platform/concepts/enhanced-compliance-env),
which run on Aiven-managed infrastructure. Enhanced compliance BYOC clouds run in your own
AWS account through BYOC.
:::

## Compliance deployment models

When you create an AWS custom cloud, you choose a deployment model. In addition to the
`standard` and `standard_public` models, two compliance models are available:

- `pci_dss`: For workloads that must comply with the Payment Card Industry Data Security
  Standard (PCI DSS).
- `hipaa`: For workloads that must comply with the Health Insurance Portability and
  Accountability Act (HIPAA).

Both models currently apply largely the same controls. They remain separate so that you can
record which standard applies and so that their requirements can evolve independently.

## How enhanced compliance clouds differ

An enhanced compliance cloud builds on the private (`standard`) BYOC deployment model. It
uses a private workload network and a separate network with a bastion host, and adds the
following controls:

- **No public service access**: Services are not reachable from the public internet. You
  access them over [VPC peering](/docs/platform/howto/vpc-peering-aws) or
  [AWS PrivateLink](/docs/platform/howto/byoc/aws-privatelink-byoc). Indirect access paths,
  such as public query APIs, are also blocked.
- **Bastion-proxied egress**: The workload network has no assumed outbound access to the
  public internet. The bastion host proxies outbound traffic to the Aiven management plane
  and package repositories. Aiven creates no NAT gateways by default. If your compliance
  requirements allow it, you can permit limited egress to specific address ranges, but it
  is never required.
- **Customer-owned object storage**: Aiven stores service
  [backups](/docs/platform/concepts/byoc#byoc-service-backups) and
  [cold data](/docs/platform/howto/byoc/store-data) in object storage in your own AWS
  account. Aiven-owned buckets are not used, so your data stays in your account.
- **No forking or cross-cloud migration**: You cannot fork or migrate a service running in
  an enhanced compliance cloud to another cloud. This keeps your data in your AWS account
  and prevents a migrated service from depending on backup storage left behind in its
  original cloud.

## Requirements and limitations

- Self-service compliance deployment models are available for **Amazon Web Services (AWS)**
  only.
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
