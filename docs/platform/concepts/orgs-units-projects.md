---
title: Organizations, units, and projects
---

The Aiven platform uses organizations, organizational units, and projects to organize services and manage access.

import Overview from "@site/static/images/content/figma/organizations-overview.png";

<img alt="Hierarchy showing two organizational units, each with two projects, nested within one organization." src={Overview} width="58%" class="centered"/>

## Organizations and organizational units

Organizations and organizational units are collections of projects. When
you sign up to Aiven, an organization is created for you.

You can use your organization to create a hierarchical structure that
fits your needs. Organizational units can be nested within an
organization, adding another level to group your projects. This gives
you greater flexibility to organize your infrastructure based on your
specific use cases. For example, you can split production and
testing workloads into different organizational units.

Grouping your projects in organizations and units lets
you centrally manage settings like:

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
   organization level. They can be used for all
   projects in the organization and its units. They cannot cannot be shared
   between organizations.

## Projects

Projects are collections of services and user permissions. You can
[create projects](/docs/platform/howto/manage-project) in an organization
or in organizational units.

Projects help you group your services based on your organization's structure or processes.
The following are some examples of how customers organize their services:

-   Single project: One project containing services that are
    distinguished by their names. For example, services have names based
    on the type of environment: `demo_pg_project.postgres-prod` and
    `demo_pg_project.postgres-staging`.
-   Environment-based: Each project represents a deployment environment,
    for example: `dev`, `qa`, and `production`. This can make it easier to apply
    uniform network security settings and manage user permissions,
    such as developer access to production infrastructure.
-   Project-based: Each project contains all the services for an
    internal project, with naming that highlights the relevant
    environment. For example: `customer-success-prod` and `business-analytics-test`.

## Users and roles

To add users to your organization, you send them an invite. Organization users can be
made super admin or they can be added to specific projects. They can also be [added to
groups](/docs/platform/howto/manage-groups) to control access to the services in a project.

Super admin have full access to the organization, including all organizational units,
projects, and services. Users are automatically made super admin when they create an
organization, and they can [make other users super admin](/docs/platform/howto/make-super-admin).

You grant other users access to services at the project level by
[adding them as project members](/docs/platform/howto/add-project-members),
either individually or in groups. You give project members a role that defines the
level of access they have to all services in the project.

The Aiven platform lets you use a mix of group and individual access
rights for projects.

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

For more complex cases, take advantage of the
organizational units. Organizational units group related projects.

You can, for example, group projects into organizational units that
correspond to your internal departments. Alternatively, you can group
them by categories like testing, staging, and production environments.

### Large organizations

For large organizations, keep your projects in
organizational units instead of organizations. By keeping your
projects in organizational units you can centrally manage things like
support contracts and billing groups for each group of projects.
