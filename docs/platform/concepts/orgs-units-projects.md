---
title: Organizations, units, and projects
---

import Overview from "@site/static/images/content/figma/organizations-overview.png";

The Aiven platform uses organizations, organizational units, and projects to efficiently and securely organize your services and manage access.

There are three levels in this hierarchy:

- **Organization**: Contains all of your projects and services. It's recommended to have one
    Aiven organization.
- **Organizational units**: Added to the organization, giving you greater flexibility to
   organize your infrastructure based on your specific use cases. For example, you can
   split production and testing workloads into different organizational units.
- **Projects**: Created in the organization or organizational units to group your services
    together.

<div style={{ textAlign: 'center' }}>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/axhcppn6W2c?si=6uC3mmQ4ATNbyTrt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
</div>

## Organizations

When you sign up to Aiven, an organization is created for you. You can use your
organization to create a hierarchical structure that fits your needs.

<img alt="Hierarchy showing two organizational units, each with two projects, nested within one organization." src={Overview} width="58%" className="centered"/>

Organizations also let you centrally manage settings like:

- [Billing information](/docs/platform/concepts/billing-and-payment): Managed only at
  the organization level, you can use billing groups across all projects in the
  organization and its units. You can't share billing information between organizations.
- [Users](/docs/platform/concepts/user-access-management) and
  [groups](/docs/platform/howto/manage-groups): Managed at the organization level. You
  can grant users and groups access at the organization and project level with
  permissions and roles.
- [Domains](/docs/platform/howto/manage-domains) and
  [identity providers (IdPs)](/docs/platform/howto/saml/add-identity-providers):
   Only available at the organization level, verified domains and IdPs provide
   greater control and security for your organization's resources.
- [Authentication policies](/docs/platform/howto/set-authentication-policies):
   Manage user authentication at the organization level.
- [Support tiers](/docs/platform/howto/support): Specific to a single organization and
   applied to all units, projects, and services within that organization. They cannot be
   shared between organizations.
- Access control lists (ACLs): Available on the organization, organizational unit,
  and project level.
  - ACLs for service plans are inherited, meaning all projects
    within an organization or organizational unit have the same service plan.

## Organizational units

Organizational units are collections of projects. Customers often use these to group
projects based on things like:
- Departments in their company like finance, marketing, and engineering.
- Environments such as development, testing, and production.

You can create as many units as you need in your organization, but you cannot
create units in other units.

## Projects

Projects are collections of services. You can
[create projects](/docs/platform/howto/manage-project) in an organization
or in organizational units.

Projects help you group your services based on your organization's structure or processes.
You can grant access to projects and their resources using project-level
[roles and permissions](/docs/platform/concepts/permissions).
They also let you apply uniform network security settings across all services within
the project. The following are some examples of how customers organize their services:

-   Single project: One project containing services that are
    distinguished by their names. For example, services have names based
    on the type of environment: `demo_pg_project.postgres-prod` and
    `demo_pg_project.postgres-staging`.
-   Environment-based: Each project represents a deployment environment,
    for example: `dev`, `qa`, and `production`. This can make it easier to apply
    uniform user permissions, such as developer access to production infrastructure.
-   Project-based: Each project contains all the services for an
    internal project, with naming that highlights the relevant
    environment. For example: `customer-success-prod` and `business-analytics-test`.

## Best practices for organizations

### Small organizations

For smaller organizations that have a limited number of projects it's
recommended to consolidate all your projects within one organization.
This makes it easier for your teams to navigate between projects and
services.

Good naming conventions also help with finding projects and services.
For example, you can include the environment type,  `dev`, `prod`,
etc., at the beginning of project names.

### Medium organizations

For more complex cases, take advantage of the organizational units to
group related projects.

You can, for example, group projects into units that correspond to your internal
departments. Alternatively, you can group them by categories like testing, staging,
and production environments.

### Large organizations

For large organizations, keep all projects in
organizational units instead of the organization. By keeping your
projects in units you can centrally manage things like
support contracts and billing groups for each group of projects.
