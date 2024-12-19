---
title: Bring your own cloud networking and security
sidebar_label: Networking & security
---

Aiven combines a multi-cloud strategy with a cloud-agnostic approach to make the [bring your own cloud (BYOC)](/docs/platform/concepts/byoc) experience not only versatile and cost-efficient but also secure.

## Bastion proxy networking

The [bastion](https://en.wikipedia.org/wiki/Bastion_host) proxy service acts as a trusted
relay between the Aiven Management plane and your BYOC environment. A typical BYOC
implementation results in workloads that are not directly accessible from external networks.
The bastion proxy is located in a virtual private cloud (VPC) and facilitates the
communication between Aiven Management and monitoring systems and your private workloads.
The bastion proxy service is also responsible for facilitating a communication channel that
allows the Aiven Management plane to launch services within your private cloud.

### Traffic to the bastion

Aiven Management plane traffic to your BYOC environment originates from a set of redundant
gateways with fixed IPs. Therefore, the bastion subnet needs to whitelist four static IPs
on relevant ports.

| Source                 | Destination    | Description                                                                                                                                   |
| ---------------------- | ---------------| --------------------------------------------------------------------------------------------------------------------------------------------- |
| Aiven Management plane | Bastion subnet | Aiven uses SSH from the Aiven Management plane to the bastion service node for troubleshooting, setup, or configuration tasks on the bastion. |
| Aiven Management plane | Bastion subnet | Proxy service is used to tunnel the traffic from the Aiven Management plane to workload nodes.                                                |
| Aiven Management plane | Bastion subnet | Aiven Management plane accesses the bastion service node to retrieve status information and perform routine operations.                       |

### Traffic from the bastion

| Source         | Destination      | Description                                                                                                                             |
| -------------- | -----------------| --------------------------------------------------------------------------------------------------------------------------------------- |
| Bastion subnet | Aiven Management | Communication channel with the Aiven Management plane used to collect metrics and logs from the bastion and workload nodes              |
| Bastion subnet | Aiven Management | Required for the bastion and workload nodes to make calls to the Aiven Management plane                                                 |
| Bastion subnet | AWS CloudFront   | Used for downloading RPM packages for bastion nodes setup                                                                               |
| Bastion subnet | Workload subnet  | Aiven uses SSH from the bastion subnet to the workload subnet for troubleshooting, setup, or configuration tasks on the workload nodes. |
| Bastion subnet | Workload subnet  | Aiven Management plane accesses the workload nodes via the bastion node to retrieve status information and perform routine operations.  |
| Bastion subnet | DNS & NTP        | Destination dependant on cloud provider                                                                                                 |

:::note
Aiven Management and CloudFront IP ranges occasionally change and are considered dynamic
for firewall policies. To accommodate traffic to these destinations, an egress of
`0.0.0.0/0` is generally required.
:::

## Workload nodes networking

Management traffic to and from workload nodes is sent through the bastion proxy and
encrypted. Aiven Management and API calls are always encrypted. SSH access is permitted if
Aiven support staff require direct access to the bastion or workload nodes. SSH
connections from support staff are logged, monitored, and require validation by Aiven's
security operations team. SSH connections originate from Aiven Management plane's static
IP addresses.

### Traffic to the workload

On top of SSH and Aiven Management Plane connectivity, there are also ingress and egress
rules from the Customer Networks that need to be defined to allow customer applications to
connect to Aiven services. This depends on the cloud provider being used, and the
customer's network architecture.

| Source                   | Destination     | Description                                                                                                                             |
| ------------------------ | ----------------| --------------------------------------------------------------------------------------------------------------------------------------- |
| Bastion subnet           | Workload subnet | Aiven uses SSH from the bastion subnet to the workload subnet for troubleshooting, setup, or configuration tasks on the workload nodes. |
| Bastion subnet           | Workload subnet | Aiven Management plane accesses the workload nodes via the bastion node to retrieve status information and perform routine operations.  |
| Your remote applications | Workload subnet | Varies depending on services being used.                                                                                                |

### Traffic from the workload

The workload subnet nodes communicate with each other. The nature of these communications
varies depending on the services, features, and plugins being used.

| Source          | Destination              | Description                                                                                                                |
| --------------- | -------------------------| -------------------------------------------------------------------------------------------------------------------------- |
| Workload subnet | Aiven Management         | Communication channel with the Aiven Management plane used to collect metrics and logs from the bastion and workload nodes |
| Workload subnet | Aiven Management         | Required for the bastion and workload nodes to make calls to the Aiven Management plane                                    |
| Workload subnet | AWS CloudFront           | Used for downloading RPM packages for workload nodes setup                                                                 |
| Workload subnet | Workload subnet          | Intra-subnet communication between Aiven nodes. Ports are dynamic and dependent on services, features, and plugins used.   |
| Workload subnet | Your remote applications | Varies depending on services being used.                                                                                   |
| Workload subnet | DNS & NTP                | Destination dependant on cloud provider                                                                                    |

:::note
Aiven Management and CloudFront IP ranges occasionally change and are considered dynamic
for firewall policies. To accommodate traffic to these destinations, an egress of
`0.0.0.0/0` is generally required.
:::

## Security and compliance

### System security

The bastion and workload nodes leverage hardened images customized to only include
components required for the operation of Aiven services.

All nodes use full-disk encryption specific to the customer and service, and are rotated
during maintenance events. Encryption keys are stored securely in an Aiven proprietary KMS,
and only specific and approved operators have access to this system. All access is logged
and monitored.

If required for troubleshooting or incident investigation, SSH connections to the nodes
can only be performed by specific and approved operators, and can only originate from
specific Aiven gateway IPs. All access is logged and monitored, and Aiven's security team
follows up on access to ensure approval and validity.
Aiven base system images are routinely updated and patched. During maintenance events,
service nodes, including the bastion service, are replaced with updated images.

### Independent audits

The BYOC deployment model is subject to external audits and falls within scope of Aiven's
routine obligations.

For more information on Aiven security and compliance, see
[Aiven Security](https://aiven.io/security-compliance).

## Related pages

-   [About bring your own cloud](/docs/platform/concepts/byoc)
-   [Enable bring your own cloud (BYOC)](/docs/platform/howto/byoc/enable-byoc)
-   [Create a custom cloud in Aiven](/docs/platform/howto/byoc/create-cloud/create-custom-cloud)
