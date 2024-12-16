---
title: Migrate a public service to a Virtual Private Cloud (VPC)
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

When operating your Aiven service over the public Internet, you might consider enhancing security or connectivity by transitioning to a Virtual Private Cloud (VPC, also known as VNet).
This move allows you to
restrict access and establish a more controlled environment between your
VPC and Aiven.

Aiven simplifies the migration process, allowing for seamless one-click
transitions between different regions and cloud providers, including the
migration from the public Internet to a VPC. However, migrating your
service can disrupt connectivity due to the service URI's change in
resolution from public IP addresses to IP addresses within a VPC.

To maintain uninterrupted access throughout this transition, Aiven
provides a
[public access](/docs/platform/howto/public-access-in-vpc) advanced configuration
This ensures that your service
remains accessible over both the public Internet and within the VPC
during migration.

To ensure uninterrupted access to your service during the migration
phase, conduct a few simple tests to verify connectivity.

## Migrate a public service to a VPN

1.  **VPC creation and peering**:
    [Create a VPC](/docs/platform/howto/manage-vpc-peering) and establish peering.
1.  **Network peering validation**: Test the network peering with a
    non-critical service.
1.  **Enable public access**: Activate public access for all services to
    be migrated.
1.  **Application configuration update**: Modify your application to use
    public access hostnames.
1.  **Service migration**: Start the migration of the service into the
    VPC.
1.  **Peering connections validation**: Confirm the functionality of
    peering connections with private hostnames and ports.
1.  **Switch to private access hostnames**: Change application
    configuration to use private access hostnames.
1.  **Disable public access**: Turn off public access for all services.

:::note
Steps 3, 4, 6, 7, 8 are optional but highly recommended. Following these
steps ensures that networking configuration and firewall rules are set
up correctly.
:::

## Initial setup

Before you begin, make sure you have created your VPC and that peering
is active. Automating this process with the Aiven Terraform Provider is an option. For
guidance, refer to
[setting up VPC peering](/docs/platform/howto/manage-vpc-peering#platform_howto_setup_vpc_peering) on the Aiven Platform.

To illustrate the process, we will use the `google-us-east1` VPC as a
reference. Ensure both your VPC and its peering connection are in an
`Active` state.

## Testing the connection

To confirm network peering, test the connection with a non-critical
service within your VPC. This involves creating a small service in an
existing VPC to check the network connectivity.

Deploy your service into a VPC. Then, from a host within your VPC,
ensure you can resolve the DNS hostname and connect to the service port.
The following commands are typically used on Ubuntu 20.04 LTS and should
be applicable for most Linux distributions:

-   `nslookup {host}`
-   `nc -vz {host} {port}`

## Enable public access

Enable the `public_access.{service type}` configuration for all services
you are migrating. This setting is found in the **Advanced
Configuration** section of the [Aiven
Console](https://console.aiven.io/) on your service's **Overview**
page. For example, for Aiven for Apache Kafka®, the configuration would
be `public_access.kafka`. This action creates a new hostname and port,
which remain publicly accessible even after the service is moved into
the VPC.

See the new hostname and port under **Connection Information**
by selecting the **Public Access Route**. Make sure you can connect to
each new host/port combination.

## Configure and redeploy application

It's recommended to configure your applications to use the public
access route during the migration. This ensures continued access to the
services as they transition to a private network. In dual access mode,
test all connections and ports before switching over to the private
hostname(s) and IP addresses.

## Migrate an Aiven service to your VPC

You can migrate your Aiven services into a VPC using the [Aiven
Console](https://console.aiven.io/) .

1.  Log in to the [Aiven Console](https://console.aiven.io/) select your
    project and select the service.
1.  On the service page, select **Service settings** from the sidebar.
1.  In the **Cloud and network** section, click
    <ConsoleLabel name="actions"/> > **Change cloud or region**.
1.  In the **Migrate service to another cloud** window, select the
    **VPC** tab and choose the appropriate region for your project's
    dedicated VPC. The `Public Internet` tag is displayed.
1.  Start the migration process.
1.  Once the migration is complete, ensure the
    `Project VPC` tag appears on the service's page. This tag indicates the migration
    was successful.

In [Aiven Console](https://console.aiven.io/), use the **Cloud and VPC** >
**Migrate cloud** section on the service's **Overview** page to
migrate your Aiven services into a VPC. Note the `Public Internet` tag.

Ensure that you select the region from the `VPC` tab. This is a
dedicated VPC for your project.

Ensure that you see the `Project VPC` tag after migration. You can
monitor the migration status on the service's page in [Aiven
Console](https://console.aiven.io/).

## Testing the service connections

Post-migration, use the `nslookup` command to see private IP addresses.
Ensure you can connect to the private hostnames and ports, verifying
that firewall rules and routing are functioning correctly.

## Configure and redeploy your applications

After the migration, reconfigure your applications to use the private
hostname.

## Cleanup by disabling public access

To finalize the migration, disable the `public_access.{service type}`
configuration for all your services. This option is located in the
**Advanced configuration** section of the Aiven Console on your
service's **Overview** page. Disabling it removes the `public-`
prefixed hostname and port.

## Conclusion

You can migrate services from public to VPC
with minimal downtime, ensuring safe and tested connections throughout
the process. Always equip your client applications with failure and
retry logic to adapt to changes in servers and IP addresses. While this
is typically straightforward for clustered services like Apache Kafka®
and OpenSearch®, additional configurations might be necessary for
services like PostgreSQL® and Caching.
