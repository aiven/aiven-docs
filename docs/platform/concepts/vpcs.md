---
title: Virtual private clouds (VPCs) in Aiven
displayed_sidebar: platformSidebar
sidebar_label: VPCs overview
---

import LimitedBadge from "@site/src/components/Badges/LimitedBadge";
import RelatedPages from "@site/src/components/RelatedPages";

Virtual private clouds (VPCs) supported on the Aiven Platform provide enhanced security, flexibility, and network control, allowing efficient traffic, resource, and access management.

A VPC is a logically isolated section of a cloud provider's network, which makes it a
private network within a public cloud. It's a secure customizable network environment that
you define and control to deploy and manage resources.

### VPC characteristics

- Isolation: Each VPC operates independently from other VPCs, ensuring secure separation.
- Security: Control over network traffic and isolation.
- Internet connectivity: Control whether the VPC connects to the internet via internet
  gateways or remains isolated.
- Network control: Configure route tables, network gateways, and security settings.
- Customizable IP range: You can define your own IP address range (CIDR block).
- Subnets: Divide the VPC into smaller sub-networks (subnets) for organizing resources
  based on availability zones or functional groups.
- Flexibility: Custom network architecture tailored to your application's needs.
- Scalability: Expand or modify the network as demand grows.

### VPC components

- Subnets: Represent smaller public or private networks within the VPC.
- [Peering connection](/docs/platform/howto/list-vpc-peering): Connect VPCs for
  intercommunication.
- NAT (Network Address Translation) gateway: Allows outbound internet access for private
  subnets.
- Internet gateway (IGW): Enables public traffic to access the internet.
- Security groups: Represent firewall rules controlling inbound and outbound traffic for
  resources.
- Route tables: Specify how traffic is directed within the VPC.
- Network Access Control Lists (NACLs): Constitute an extra layer of security at the subnet
  level

### VPC use cases

- Data isolation: Keeping sensitive data within a private network
- Hosting applications: Deploying scalable web and database applications
- Multi-tier architecture: Separating application layers (web, app, database) within
  distinct subnets
- Hybrid cloud architecture: Connecting on-premises networks to the cloud securely

## VPC types

The Aiven Platform allows creating and using two types of VPCs, which differ in scope:
project-wide VPCs and organization-wide VPCs.

### Project VPCs

A project VPC is a VPC that spans a single Aiven project within your Aiven organization.
A project-wide VPC allows all resources in that project to interconnect and share a common
VPC network, simplifying network management and promoting consistency across your Aiven
project's services.

Learn how to
[create and manage projects VPCs in Aiven](/docs/platform/howto/manage-project-vpc).

### Organization VPCs <LimitedBadge/>

An organization VPC is a VPC that spans multiple Aiven projects within your Aiven
organization. An organization-wide VPC allows different projects to share a centralized
network infrastructure while maintaining isolation and control.

Learn how to
[create and manage organization VPCs in Aiven](/docs/platform/howto/manage-organization-vpc).

<RelatedPages/>

For information on VPCs supported by particular cloud providers, see the following:

- AWS: [How Amazon VPC works](https://docs.aws.amazon.com/vpc/latest/userguide/how-it-works.html)
- Google Cloud: [VPC networks](https://cloud.google.com/vpc/docs/vpc)
- Azure: [What is Azure Virtual Network?](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview)
- UpCloud:
  - [How to configure SDN Private networks](https://upcloud.com/docs/guides/configure-sdn-private-networks/)
  - [How to configure SDN Private networks using the UpCloud API](https://upcloud.com/docs/guides/configure-sdn-private-networks-upcloud-api/)
