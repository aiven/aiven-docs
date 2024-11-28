---
title: Virtual private cloud (VPC) peering in Aiven
sidebar_label: VPC peering
---

VPC peering supported on the Aiven Platform improves network connectivity and security. It simplifies architecture, helps reduce network latency, and enhances resource sharing while maintaining isolation and control.

[VPC]((/doc/platform/concepts/vpcs)) peering is a networking connection between two VPCs.
It allows private and direct communication between the VPCs with no traffic routing over
the public internet.

### VPC peering characteristics

- Private communication: Private IP addresses used by VPCs to communicate
- High performance: Low latency thanks traffic remaining on the cloud provider's network
- Security: Reduced exposure to public networks without using internet gateways, VPNs, or
  NAT
- Scalability: Connections supported across different accounts and regions, depending on a
  cloud provider

### VPC peering use cases

- Multi-tier applications: Secure connnection between VPCs hosting different application
  layers, such as web or database
- Resource sharing: Secure sharing between VPCs hosting different resources,
  for example, datasets or APIs
- Data isolation: Access control by using separate VPCs for different projects or teams in
  an organization

## How it works

Aiven allows you to set up project VPC peerings with the following cloud providers:

- [Google Cloud](/docs/platform/howto/vpc-peering-gcp)
- [Amazon Web Services](/docs/platform/howto/vpc-peering-aws)
- [Microsoft Azure](/docs/platform/howto/vnet-peering-azure)
- [UpCloud](/docs/platform/howto/vpc-peering-upcloud)

## Learn more

There are the following cloud-provider-specific articles you might want to read to have a
full picture:

- AWS: [VPC peering process, lifecycle, and limitations](https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-basics.html)
- Google Cloud: [VPC Network Peering](https://cloud.google.com/vpc/docs/vpc-peering)
- Azure: [Virtual network peering](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview)
- UpCloud: [How to configure network peering](https://upcloud.com/docs/guides/configure-network-peering/)
