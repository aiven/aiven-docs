---
title: Use your private DNS with Aiven services
sidebar_label: Private DNS
---

import RelatedPages from "@site/src/components/RelatedPages";

Resolve hostnames from your own private DNS zones in Aiven services that run in a VPC peered with your network.

Aiven service nodes resolve DNS through the cloud provider's resolver, which
answers queries for public names and for the cloud provider's own private zones.
Private DNS extends this to the zones you maintain in your own network, so
services such as Aiven for Apache Kafka® Connect can reach targets that are
published only under a private hostname.

## How it works

When private DNS is enabled for a service, each node runs a local DNS forwarder
that routes queries by zone:

| Query | Resolver |
| ----- | -------- |
| Names in your approved zones, and in `avn.internal` | Your DNS servers |
| All other names | Cloud provider resolver |

This split keeps Aiven platform hostnames on the cloud provider resolver, so
platform connectivity stays independent of your DNS servers. It also means names
in your approved zones resolve to the addresses your servers return, rather than
to whatever public DNS returns for the same name.

## Prerequisites

- A [project VPC](/docs/platform/howto/manage-project-vpc) or
  [organization VPC](/docs/platform/howto/manage-organization-vpc) peered with
  your own network
- DNS servers that the Aiven service nodes can reach, usually in the peered
  network over the peering connection
- UDP and TCP port 53 open to the Aiven VPC CIDR on those servers

## Settings

| Setting   | Description                                      |
| --------- | ------------------------------------------------ |
| `enabled` | Whether new nodes use your DNS servers           |
| `servers` | Up to four IPv4 addresses of your DNS servers    |
| `zones`   | Approved zones resolved through your DNS servers |

Turning `enabled` off keeps the servers and zones stored, so you can turn them
back on without supplying the details again. The `avn.internal` zone always
resolves through your DNS servers and does not need to be listed in `zones`.

## Enable private DNS

To enable private DNS for a service,
[contact Aiven support](/docs/platform/howto/support#create-a-support-ticket)
with the following details:

- The project and service name
- The IPv4 addresses of your DNS servers, up to four
- The zones to resolve through those servers

Nodes take the setting when they are created, so a running service keeps
resolving through the cloud provider resolver until its nodes are replaced. After
Aiven has configured your DNS servers, request a node replacement for the service
to roll the setting out to the running nodes. You can do this at any point after
the configuration is in place.

## Set up a resolver in your network

Set up a resolver that the Aiven service nodes can reach, and use its addresses as
the `servers` value. The examples below put the resolver in the peered network,
where the nodes reach it over the peering connection.

### AWS

Create a [Route 53 Resolver inbound
endpoint](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-forwarding-inbound-queries.html)
in your VPC. The endpoint takes addresses from subnets in that VPC, which are
reachable from the peered Aiven VPC. Allow UDP and TCP port 53 from the Aiven
VPC CIDR in the endpoint's security group.

### Azure

Deploy an [Azure DNS Private Resolver inbound
endpoint](https://learn.microsoft.com/en-us/azure/dns/dns-private-resolver-overview)
or a DNS forwarder virtual machine in your virtual network. Either takes an
address from a subnet in that network, which is reachable from the peered Aiven
virtual network. The resolver answers from your Azure Private DNS zones.

### Google Cloud

Run a DNS forwarder virtual machine in your peered VPC and point `servers` at
its address. The Aiven VPC belongs to an Aiven Google Cloud project, so a
forwarder in your own VPC gives Aiven nodes access to your Cloud DNS private
zones.

<RelatedPages/>

- [Manage project VPCs](/docs/platform/howto/manage-project-vpc)
- [Manage organization VPCs](/docs/platform/howto/manage-organization-vpc)
- [Handle resolution errors of private IP addresses](/docs/platform/howto/private-ip-resolution)
- [Manage services in a VPC](/docs/platform/howto/vpc-service-management)
