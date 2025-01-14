You only need to take this step if any of your VMs has been created
before setting up the network peering. In this case, refresh
the Dynamic Host Configuration Protocol (DHCP) lease for a relevant
network interface to get new routes.

:::warning
A peering connection between an Aiven VPC and VMs created before the
peering setup won't work unless you refresh the DHCP lease for a
relevant network interface.
:::

To refresh the DHCP lease for a network interface, run the following
commands:

1.  To clear the existing DHCP lease

    ```bash
    dhclient -r NETWORK_INTERFACE_NAME
    ```

1.  To request a renewal of the DHCP lease

    ```bash
    dhclient NETWORK_INTERFACE_NAME
    ```
