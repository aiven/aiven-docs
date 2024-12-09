---
title: Enhanced compliance environments (ECE)
---

Aiven collects, manages, and operates on sensitive data that is protected by privacy and compliance rules and regulations. Aiven meets the needs of its customers by providing specialized enhanced compliance environments (ECE) that comply with many of the most common compliance requirements.
The vendors that assist with this collection, management, and operation are subject to the same rules and regulations.

An enhanced compliance environment runs on Aiven managed
infrastructure with the additional compliance requirement that no ECE
VPC is shared and the managed environment is logically separated from
the standard Aiven deployment environment. This decreases the blast
radius of the environment to prevent inadvertent data sharing.

<!-- vale off -->
Users of an ECE **must** encrypt all data before reaching
an Aiven service. As part of the increased compliance of the
environment, enhanced logging is enabled for - `stderr`, `stout`, and
`stdin`.
<!-- vale on -->

## Eligibility

Enhanced compliance environments, although similar to standard
environments, involve added setup and maintenance complexity. The
following are requirements to utilize an ECE:

-   You use Amazon Web Services (AWS), Google Cloud, or Microsoft Azure (excluding
    Azure Germany).
-   You have a commitment deal with Aiven.
-   You have the [Advanced or Premium support tier](/docs/platform/howto/support).

## Cost of ECE

The cost of an enhanced compliance environment, beyond the initial
eligibility requirements, is exactly the same as a standard Aiven
deployment. All service costs are the same and all egress networking
charges are still covered in an ECE. Customers can still take advantage
of any applicable marketplaces and spend down their commitment
accordingly.

## Similarities to a standard environment

In many ways, an ECE is the same as a standard Aiven deployment.
Aiven's tooling, such as [Aiven CLI](/docs/tools/cli) and [Aiven Terraform Provider](/docs/tools/terraform),
interact with ECEs seamlessly, you will still be able to take advantage of Aiven's
service integrations, and you can access the environment
through VPC peering or Privatelink (on AWS or Azure).

However, there are some key differences from standard environments as
well:

- No internet access. Internet access cannot even be allow-listed as
  would be the case in standard private VPCs
- VPCs cannot be automatically provisioned and must be manually
  configured by our networking team.
- VPC peering or Privatelink connections must be manually approved on
  the Aiven end

With these differences in mind, Aiven requires the following to
provision an Enhanced Compliance Environment:

- A CIDR block for all region/environment combinations. For example,
  if you have a development, QA and production environment and operate
  in 3 regions in each of those, we will need 9 CIDR blocks.

The necessary peering information to enable the peer from our end. This
differs between clouds:

| Cloud name |                           Required peering information                           |
|------------|----------------------------------------------------------------------------------|
| AWS        | <ul><li>AWS account ID</li><li>VPC ID</li></ul>                                  |
| GCP        | <ul><li>GCP Project ID</li><li>VPC Network Name</li></ul>                        |
| Azure      | <ul> <li>Azure Tenant ID</li> <li>Azure App ID</li> <li>Azure VNet ID</li> </ul> |

## Compliances

Although not exhaustive, Aiven is capable of supporting both the Health
Insurance Portability and Accountability Act (HIPAA) and the Payment
Card Industry Data Security Standard (PCI DSS) compliances.

If you require compliance beyond these compliances, contact the [sales
team](mailto:sales@aiven.io) so we can better understand your specific needs.

Additionally, we offer an alternative deployment option. See
[Bring Your Own Cloud (BYOC)](/docs/platform/concepts/byoc).

## Migrate to an ECE

Migrations to Aiven are a standard procedure, but migrating
to an ECE can add complexity.

To migrate a new service to an ECE, contact [the sales team](mailto:sales@aiven.io)
to request help.

To migrate an existing Aiven service to an ECE, the Aiven network team creates a VPN
tunnel between your non-compliant VPC and your ECE VPC to enable a one-click migration.
The migration is then performed in an automated and zero-downtime fashion.
Once the migration is complete, the VPN tunnel is removed.
