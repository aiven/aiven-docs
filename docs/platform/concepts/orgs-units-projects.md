---
title: Organizations, units, and projects
---

The Aiven platform uses organizations, organizational units, and projects to efficiently and securely organize your services and manage access.

import Overview from "@site/static/images/content/figma/organizations-overview.png";

<img alt="Hierarchy showing two organizational units, each with two projects, nested within one organization." src={Overview} width="58%" class="centered"/>

There are three levels in this hierarchy:

1. Organization: Contains all of your projects and services. It's recommended to have one
    Aiven organization.
1. Organizational units: Added to the organization, giving you greater flexibility to
   organize your infrastructure based on your specific use cases. For example, you can
   split production and testing workloads into different organizational units.
1. Projects: Created in the organization or organizational units to group your services
    together.

## Organizations

When you sign up to Aiven, an organization is created for you. You can use your
organization to create a hierarchical structure that fits your needs.

Organizations also let you centrally manage settings like:

- [Domains and identity providers](/docs/platform/howto/list-identity-providers):
   Only available at the organization level
- [Authentication policies](/docs/platform/howto/set-authentication-policies):
   Only available on the organization level
- Access control lists (ACLs): Can be set on all levels (organization,
  organizational unit, and project)
  - ACLs for service plans are inherited, meaning all projects
    within an organization or organizational unit have the same service plan.
- [Groups](/docs/platform/howto/list-groups): Managed only at the organization level
   and assigned to projects
- [Support tiers](/docs/platform/howto/support): Specific to a single organization and
   apply to all units, projects, and services within that organization. They cannot be
   shared between organizations.
- [Billing information](/docs/platform/concepts/hourly-billing-model): Managed at the
   organization level. They can be used for all projects in the organization
   and its units. They cannot cannot be shared between organizations.

## Organizational units

Organizational units are collections of projects. Customers often use these to group
projects based on things like:
- Departments in their company like finance, marketing, and engineering
- Environments such as development, testing, and production

You can create as many units as you need in your organization, but you cannot
create units in other units.

## Projects

Projects are collections of services and user permissions. You can
[create projects](/docs/platform/howto/manage-project) in an organization
or in organizational units.

Projects help you group your services based on your organization's structure or processes.
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

## Users and roles

To add users to your organization, you send them an invite. With a verified domain
these users become [managed users](/docs/platform/concepts/managed-users),
which gives you greater control to manage access to your organization's resources.

Super admin have full access to the organization, including all organizational units,
projects, and services. Users are automatically made super admin when they create an
organization, and they can
[make other users super admin](/docs/platform/howto/make-super-admin).

For projects, the Aiven platform lets you use a mix of group and individual access rights.
You grant users access to projects by
[adding them as project members](/docs/platform/howto/add-project-members),
either individually or in groups. Project members have a role that defines the
level of access they have to the project and its services. Alternatively, you can
[add users to specific services](/docs/platform/howto/create_new_service_user).

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
