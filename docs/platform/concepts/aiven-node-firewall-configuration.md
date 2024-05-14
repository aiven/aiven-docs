---
title: Firewall configuration for service nodes
---

Aiven nodes are built using Linux. Firewall configuration is managed using native Linux kernel-level iptables rules that limit connectivity to nodes.

The iptables configuration is generated dynamically at runtime depending on
service type, deployment parameters, and user preferences. Rules are updated
when required, for example, when deploying multi-node clusters of services.

Intra-node connections are limited to point-to-point connections to specific IP
addresses. All traffic to ports that are not required for the service to
function is rejected instead of dropped to avoid timeouts. Service ports that
you can connect to depend on the service type and deployment type. The
configuration can also affect the ports that are available:

-   Is the service in a public network,
    [dedicated VPC](/docs/platform/howto/manage-vpc-peering), virtual cloud account, or a
    [Bring Your Own Cloud (BYOC)](/docs/platform/concepts/byoc) setup?
-   Have you configured IP ranges in `user_config.ip_filter`?
-   Have you
    [enabled public Internet access for services in a VPC](/docs/platform/howto/public-access-in-vpc)?

## Commonly opened ports

Aiven services commonly assign the following ports for services when
deployed without any special configuration:

<table>
  <thead>
    <tr>
      <th>Port</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>22</td>
      <td>Aiven management plane traffic over SSH</td>
    </tr>
    <tr>
      <td>80 (proxy, not open on nodes)</td>
      <td>Redirect HTTP web traffic to HTTPS</td>
    </tr>
    <tr>
      <td>443</td>
      <td>
      Web user interface traffic
        <ul>
          <li>Kafka® Connect</li>
          <li>Flink®</li>
          <li>Grafana®</li>
          <li>OpenSearch® Dashboards</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>30287</td>
      <td>Aiven platform management port</td>
    </tr>
    <tr>
      <td>500, 4500 (UDP)</td>
      <td>IPsec (IKE, IPsec NAT-T)</td>
    </tr>
  </tbody>
</table>

## Service ports

Aiven service ports are assigned randomly as offsets of a base port
number. The base port number is set per project. That means that a
PostgreSQL® service and a MySQL® service in the same project will have
closely resembling or even overlapping port numbers. These ports are in
the 10000 to 30000 range. If a base port number is not defined, the
service is assigned a random port number. This is defined during runtime
when the service is started.

## Cloud management

Local access to the metadata address is allowed via 169.254.169.254/32.
This includes ports 123 and 52 for services like NTP and local DNS.
Azure health checks, DHCP, and DNS are allowed from IP 168.63.129.16/32
using ports 67 and 53. This is an Azure-specific management address.

## Enhanced compliance environments

In [Enhanced Compliance Environments
(ECE)](https://docs.aiven.io/docs/platform/concepts/enhanced-compliance-env),
there is additional filtering at VPC level and a SOCKS5 proxy. ECE
environments have more variable configurations because we provide more
flexibility for configuring these to meet your requirements. Typically,
ECE nodes are accessible only over VPC connections and are not exposed
to the internet. This results in layered firewalls with cloud-provider
SDN firewalls and individual node-specific iptables rules.

## BYOC environments

With the BYOC deployment model, you deploy Aiven services under your own
cloud accounts. This gives you greater control over deployment
configuration, but the VM-level firewall configurations are set at
deployment time according to Aiven base configurations. You can apply
additional firewalls using your cloud service provider's configuration
options.
