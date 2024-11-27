---
title: Virtual private clouds (VPCs) in Aiven
sidebar_label: VPCs overview
---

Virtual private clouds (VPCs) supported on the Aiven Platform provide enhanced security,
flexibility, and network control, allowing efficient traffic, resource, and access management.

A VPC is a logically isolated section of a cloud provider's network, which makes it a
private network within a public cloud. It's a secure customizable network environment that
you define and control to deploy and manage resources.

### VPC characteristics

- Isolation: Each VPC operates independently from other VPCs, ensuring secure separation.
<<<<<<< HEAD
- Customizable IP Range: You can define your own IP address range (CIDR block).
- Subnets: Divide the VPC into smaller sub-networks (subnets) for organizing resources
  based on availability zones or functional groups.
- Network Control: Configure route tables, network gateways, and security settings.
- Internet Connectivity: Control whether the VPC connects to the internet via Internet
  Gateways or remains isolated.
- Security: Strong control over network traffic and isolation.
=======
- Security: Control over network traffic and isolation.
- Internet connectivity: Control whether the VPC connects to the internet via internet
  gateways or remains isolated.
- Network control: Configure route tables, network gateways, and security settings.
- Customizable IP range: You can define your own IP address range (CIDR block).
- Subnets: Divide the VPC into smaller sub-networks (subnets) for organizing resources
  based on availability zones or functional groups.
>>>>>>> 80afa7a0 (vpc description draft)
- Flexibility: Custom network architecture tailored to your application's needs.
- Scalability: Expand or modify the network as demand grows.

### VPC components

<<<<<<< HEAD
- Subnets: Smaller networks within the VPC. They can be public or private.
- Route Tables: Define how network traffic is directed within the VPC.
- Internet Gateway (IGW): Allows public traffic to access the internet.
- NAT Gateway (Network Address Translation): Enables outbound internet access for private
  subnets.
- Security Groups: Firewall rules to control inbound and outbound traffic for resources.
- Network Access Control Lists (NACLs): Additional layer of security at the subnet level.
- Peering Connections: Connect VPCs together for intercommunication.

### VPC use cases

- Hosting Applications: Deploying scalable web and database applications.
- Hybrid Cloud Architecture: Connecting on-premises networks to the cloud securely.
- Data Isolation: Keeping sensitive data within a private network.
- Multi-tier Architecture: Separating application layers (web, app, database) within
- distinct subnets.
=======
- Subnets: Represent smaller public or private networks within the VPC.
- Peering connections: Connect VPCs for intercommunication.
- NAT (Network Address Translation) gateway: Allows outbound internet access for private
  subnets.
- Internet gateway (IGW): Enables public traffic to access the internet.
- Security groups: Represent firewall rules controling inbound and outbound traffic for
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
>>>>>>> 80afa7a0 (vpc description draft)

## VPC types

The Aiven Platform allows creating and using two types of VPCs, which differ in scope:
[project-wide VPCs](/docs/platform/concepts/vpcs#project-vpcs) and
[organization-wide VPCs](/docs/platform/concepts/vpcs#organization-vpcs).

### Project VPCs

### Organization VPCs

## Related pages

- [Virtual private cloud (VPC) peering in Aiven](/doc/platform/concepts/vpc-peering)

## Learn more

There are the following cloud-provider-specific articles you might want to read to have a
full picture:

- AWS: [How Amazon VPC works](https://docs.aws.amazon.com/vpc/latest/userguide/how-it-works.html])
- Google Cloud: [VPC networks](https://cloud.google.com/vpc/docs/vpc)
- Azure: [What is Azure Virtual Network?](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview)
- UpCloud:
  - [How to configure SDN Private networks](https://upcloud.com/docs/guides/configure-sdn-private-networks/)
  - [How to configure SDN Private networks using the UpCloud API](https://upcloud.com/docs/guides/configure-sdn-private-networks-upcloud-api/)
