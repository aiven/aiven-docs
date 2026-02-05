---
title: Connect from IPv6 client
sidebar_label: Connect from IPv6 client
early: true
---

Aiven for Apache Kafka® supports dual-stack IPv4/IPv6, allowing for more flexible and
reliable client connections.

## How to enable it

:::warning
Before enabling it on a production cluster, please mind the scope and limitations
described further below.
:::

To enable dual-stack IPv4/IPv6 for your Aiven for Apache Kafka® service, you just need to
set the user configuration `enable_ipv6` to `true` using the Aiven API.

You can also achieve the same using Aiven Console, as follow:

1. Log in to [Aiven Console](https://console.aiven.io) and click your service from the
   **Services** page.

1. On the **Overview** page of your service, click **Service settings** from the sidebar.

1. On the **Service settings** page, in the **Cloud and network** section, click **More
   network configurations**.

1. In the **Network configuration** window, click **Add configuration options**. In the
   search field, enter "ipv6". From the displayed parameter names, select the parameter
   name for your service type and set its value to "enabled".

1. Click **Save configuration**.

## How it works

### On the server

In addition to the existing DNS records of type `A` that map the Aiven for Apache Kafka®
service host name to IPv6 addresses, new DNS records of type `AAAA` are created that map
to IPv6 addresses. The server listens to IPv6 addresses on the same ports as for IPv4.

### On the client

Provided that they are able to resolve them, clients can use both IPv4 and IPv6 addresses
in an interchangeable or selective way, depending on their configuration.

Configuring Kafka clients to explicitly prefer IPv6 addresses can be achieved as follow:
- Using Java-based client with JVM parameter `-Djava.net.preferIPv4Addresses=true`.
- Using `kcat` or any other client based on librdkafka with `broker.address.family=v6`.

Note that while the JVM parameter also affects HTTP client connection to schema registry,
the librdkafka parameter does not.

## Scope

This feature is in early availability. Before using it in any production context, it is
strongly recommended to verify in a lower environment wether a use-case is supported.
Moreover, using it can (positively or negatively) affect the service resources and how
it performs.

### Supported

The following types of connections are supported:
- Authentication methods
  - SSL certificate
  - SASL using project CA
  - SASL using public CA
- Routes
  - Dynamic
  - Public
  - Private (except for VPC peering and PrivateLink)

### Limitations

The following known limitations exist:
- It is not possible to completely disable IPv4
- VPC peering routes rely on IPv4 only
- PrivateLink routes rely on IPv4 only
- Static IP addresses rely on IPv4 only

#### VPC Peering

Existing clients might resolve IPv6 addresses but not be able to connect to them after
dual-stack IPv4/IPv6 gets enabled.

Configuring Kafka clients to explicitly prefer IPv4 addresses can be achieved as follow:
- Using Java-based client with JVM parameter `-Djava.net.preferIPv4Addresses=true`.
- Using `kcat` or any other client based on librdkafka with `broker.address.family=v4`.

Note that while the JVM parameter also affects HTTP client connection to schema registry,
the librdkafka parameter does not. A possible workaround is to switch the Schema registry
connection URL over to the service Public endpoint in the client configuration.
