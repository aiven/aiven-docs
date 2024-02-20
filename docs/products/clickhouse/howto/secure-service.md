---
title: Secure a managed ClickHouse® service
---

You can secure your Aiven for ClickHouse® service in a few different
ways. This article guides you on how to protect your service by
restricting network access, using Virtual Private Cloud (VPC), and
enabling service termination protection.

## Restrict network access to your service

One of the most fundamental ways to keep your service secure is managing
its network access properly. By default the service is publicly
available but you can restrict the access by following the instruction
in
[Restrict network access to your service](/docs/platform/howto/restrict-access).

## Use Virtual Private Cloud (VPC)

With VPC, no public internet-based access is provided to the service and
it can only be connected to from the customer's peered VPC using a
private network address. Read more on using VPC in
[Networking with VPC peering](/docs/platform/concepts/cloud-security#networking-with-vpc-peering) and check out how to create a VPC in
[Configure VPC peering](/docs/platform/howto/manage-vpc-peering#platform_howto_setup_vpc_peering).

## Protect a service from termination

Aiven services can be protected against accidental deletion or powering
off by enabling the Termination Protection feature.

:::note
Termination Protection has no effect on service migrations or upgrades.
:::

### Enable the termination protection

1.  Log in to [Aiven Console](https://console.aiven.io/), and select
    your ClickHouse® service from the **Services** view.
2.  On the **Overview** page of your service, select **Service
    settings** from the sidebar.
3.  On the **Service settings** page, navigate to the **Service status**
    section, and select **Enable termination protection** from the
    **Actions** (**...**) menu.

Termination Protection is enabled for your service: It cannot be
terminated or powered down from the Aiven web console, via the Aiven
REST API, or by using the Aiven command-line client.

### Terminate a protected service

Before terminating or powering off a protected service, you need to
disable Termination Protection for this service.

:::note
Running out of free Aiven sign-up credits causes the service to be
powered down unless a credit card has been entered for the project.
:::
