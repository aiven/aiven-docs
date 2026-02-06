---
title: Connect from IPv6 client
sidebar_label: Connect from IPv6 client
early: true
---

Aiven for Apache Kafka® supports dual-stack IPv4/IPv6, allowing for more flexible and
reliable client connections.

## How to enable it

To enable dual-stack IPv4/IPv6 for your Aiven for Apache Kafka® service, you just need to
set the user configuration `enable_ipv6` to `true` using the Aiven API.

You can achieve the same using Aiven Console, as follow:

1. Log in to [Aiven Console](https://console.aiven.io) and click your
   service from the **Services** page.

1. On the **Overview** page of your service, click **Service
   settings** from the sidebar.

1. On the **Service settings** page, in the **Cloud and
   network** section, click **More network configurations**.

1. In the **Network configuration** window, click **Add configuration
   options**. In the search field, enter "ipv6". From the
   displayed parameter names, select the parameter name for your service
   type and set its value to "enabled".

1. Click **Save configuration**.

## How it works

### On the server

In addition to the existing DNS records of type `A` that map the Aiven for Apache Kafka®
service host name to IPv6 addresses, new DNS records of type `AAAA` are created that map
to IPv6 addresses.
Aiven for Apache Kafka® listens to IPv6 addresses on the same ports as for IPv4. This is
possible thanks to the [KIP-797: Accept duplicate listener on port for IPv4/IPv6](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=195726330)
originally contributed by Aiven.

### On the client

Depending on their configuration, Kafka clients resolve IPv4 or IPv6 addresses or both.
In case they resolved both, they can also prefer the one or the other, for example:
- Using Kafka native tooling with `KAFKA_OPTS="-Djava.net.preferIPv6Addresses=true"`.
- Using `kcat` with `-X broker.address.family=v6` parameter.

## Scope

This feature is in early availability. Before using it in any production context, it is
strongly recommended to verify in a lower environment wether your use-case is supported.
Moreover, please note that using it can affect the resource usage and the performance of
your service.

### Supported

The following types of connections are supported:
- Authentication methods
  - SSL certificate
  - SASL using project CA
  - SASL using public CA
- Routes
  - Dynamic
  - Public
  - Private

### Limitations

The following known limitations exist:
- It is not possible to completely disable IPv4
- VPC peering routes rely on IPv4 only
- PrivateLink routes rely on IPv4 only
- Static IP addresses rely on IPv4 only
