---
title: Organization hierarchy and access
---

The Aiven platform uses organizations, organizational units, and projects to organize services and manage access to those services.

import Overview from "@site/static/images/figma/organizations-overview.png";

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

Grouping your projects in organizations and organizational units lets
you centrally manage settings like:

- Authentication methods: Only available on the organization level
- Access control lists (ACLs): Can be set on all levels (organization,
  organizational unit, and project)
  - ACLs for service plans are inherited, meaning all projects
    within an organization or organizational unit will have the same
    service plan.
- Groups: Managed at the organization level and assigned to projects
- Support contracts: Specific to a single organization and cannot be
  shared between them
- Billing groups: Specific to a single organization and cannot be
  shared between them

### Super admin

Super admin have full access to the organization, including all
organizational units, projects, and services. Users are automatically
made super admin when they create an organization, and they can
[make other users super admin](/docs/platform/howto/make-super-admin).

Super admin are the same as account owners. Adding a user to the account
owners team makes them a super admin. Likewise, when you make a user a
super admin, they are added to the account owners team.

## Projects

Projects are collections of services and user permissions. Each project
must have a unique name. You can group your services however you see
fit. These are some examples of how customers organize their services:

-   Single project: One project containing services that are
    distinguished by their names. For example, services are named based
    on the type of environment: `demo_pg_project.postgres-prod` and
    `demo_pg_project.postgres-staging`.
-   Environment-based: Each project represents a deployment environment,
    for example: `dev`, `qa`, and `production`. This allows you to apply
    uniform network security, such as the use of virtual private clouds,
    to all services within each environment. This also gives you more
    granular user permissions, such as developer access to production
    infrastructure.
-   Project-based: Each project contains all the services for an
    internal project, with naming that highlights the relevant
    environment; for example: `customer-success-prod` and
    `business-analytics-test`.

## Project and service access management

You can grant users access to services at the project level by adding
them as project members, either individually or in
[groups](/docs/platform/howto/add-groups-projects).

The Aiven platform lets you use a mix of group and individual access
rights for projects. One example of this is to grant read-only access to
all projects in an organization or unit for a group of external
contractors.

### Groups

[Organization users](/docs/platform/howto/manage-org-users) can be [added to
groups](/docs/platform/howto/manage-groups), making it easy to control access to
the services in a project. When you [add a group to a
project](/docs/platform/howto/add-groups-projects), you also select the role for
that group. This role gives users in that group the same level of access to
all services in the project.

## Best practices for organizations

### Small organizations

For smaller organizations that have a limited number of projects we
recommend consolidating all your projects within one organization.
This will make it easier for your teams to navigate between projects and
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
