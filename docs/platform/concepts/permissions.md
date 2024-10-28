---
title: Roles and permissions
---

To give users access to projects and services in your organizations, you grant them permissions and roles:

* **Permissions**: Actions that a principal can perform on a resource or
  group of resources.
* **Roles**: Sets of permissions that you can assign to a principal.

Principals are
[organization users](/docs/platform/howto/manage-org-users),
[application users](/docs/platform/concepts/application-users),
and [groups](/docs/platform/howto/list-groups).

You can grant access to principals at the organization and project level.

:::important
Permissions are not yet fully supported in the Aiven Console. They are intended for
use with the Aiven API, Aiven Provider for Terraform, and Aiven Operator for Kubernetes.
:::

## Organization roles

You can grant the following roles to principals at the organization level. The permissions
for each role apply to the organization and all units, projects, and services within it.

|    Console name     |          API name          |                                                                                                                                                                                                                                           Permissions                                                                                                                                                                                                                                           |
| ------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Admin               | `role:organization:admin`  | <ul> <li> Full access to the organization. </li> <li> View and change billing information. </li> <li> Change the authentication policy. </li> <li> Invite, deactivate, and remove organization users. </li> <li> Create, edit, and delete groups. </li> <li> Create and delete application users and their tokens. </li> <li> Add and remove domains. </li> <li> Add, enable, disable, and remove identity providers. </li> </ul>                                                               |
| Organization member | `role:organization:member` | Non-managed users can: <ul> <li> Edit their profiles. </li> <li> Create organizations. </li> <li> Leave organizations. </li> <li> Add [allowed authentication methods](/docs/platform/howto/set-authentication-policies). </li> <li> Generate and revoke personal tokens, if allowed by the [authentication policy](/docs/platform/howto/set-authentication-policies). </li> <li> Enable and disable feature previews. </li> </ul> This is the default role assigned to all organization users. |

## Organization permissions

You can grant the following permissions to principals. The actions listed for each
permission apply to the organization and all units, projects, and services within it.

|          Console name           |             API name             |                                                                                                                                 Allowed actions                                                                                                                                 |
| ------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Manage application users        | `organization:app_users:write`   | <ul> <li> Create, edit, and delete application users. </li> <li> Generate and revoke application tokens. </li> </ul>                                                                                                                                                            |
| View organization audit log     | `organization:audit_log:read`    | <ul> <li> View the audit log. </li> </ul>                                                                                                                                                                                                                                       |
| View billing                    | `organization:billing:read`      | <ul> <li> View all billing groups, billing addresses, and payment methods. </li> </ul>                                                                                                                                                                                          |
| Manage billing                  | `organization:billing:write`     | <ul> <li> Create, edit, and delete billing groups, billing addresses, and payment methods. </li> </ul>                                                                                                                                                                          |
| Manage domains                  | `organization:domains:write`     | <ul> <li> Add and remove domains. </li> </ul>                                                                                                                                                                                                                                   |
| Manage groups                   | `organization:groups:write`      | <ul> <li> Add and remove organization and application users to/from groups. </li> </ul>                                                                                                                                                                                         |
| Manage IdPs                     | `organization:idps:write`        | <ul> <li> Add edit, enable, disable, and remove identity providers. </li> </ul>                                                                                                                                                                                                 |
| View organization networking    | `organization:networking:read`   | <ul> <li> View all organization virtual private clouds (VPCs). </li> </ul>                                                                                                                                                                                                      |
| Manage organization networking  | `organization:networking:write`  | <ul> <li> Add, edit, and remove organization VPCs. </li> <li> Create and change VPC peering connections. </li> </ul>                                                                                                                                                            |
| View organization permissions   | `organization:permissions:read`  | <ul> <li> View all permissions. </li> </ul>                                                                                                                                                                                                                                     |
| Manage organization permissions | `organization:permissions:write` | <ul> <li> Grant, edit, and remove organization permissions to/from groups and users. </li> </ul>                                                                                                                                                                                |
| View projects                   | `organization:projects:read`     | <ul> <li> List all projects. </li> <li> View all project tags. </li> </ul> No project or service access.                                                                                                                                                                        |
| Manage projects                 | `organization:projects:write`    | <ul> <li> Create and delete projects. </li> <li> Change the billing group the project is assigned to. </li> <li> Move a project to another organization or unit. </li> <li> Add and remove project tags. </li> </ul> No access to other project settings or services. |


## Project roles

You can grant the following roles for projects to principals. The permissions for each
role apply to the project and all services within it.

| Console name |  API name   |                                                                                                                                                       Permissions                                                                                                                                                       |
| ------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Admin        | `admin`     | <ul> <li> Full access to the project and all of its services. </li> </ul>                                                                                                                                                                                                                                               |
| Developer    | `developer` | <ul> <li> Create databases. </li> <li> View connection information. </li> <li> Remove Aiven for OpenSearch® indexes. </li> <li> Create and change Aiven for Apache Kafka® topics. </li> <li> Create and change Aiven for PostgreSQL® connection pools. </li> <li> Create and change service database users. </li> </ul> |
| Operator     | `operator`  | <ul> <li> View project audit log. </li> <li> View project permissions. </li> <li>  Full access to all services in the project and their configuration. </li> </ul>                                                                                                                                                      |
| Read only    | `read_only` | <ul> <li> View all services and their configuration. </li> </ul>                                                                                                                                                                                                                                                        |

Project admin do not have access to organization settings such as billing unless
they are also a [super admin](/docs/platform/howto/make-super-admin).

## Project and service permissions

You can grant the following permissions to principals. The actions listed for each
permission apply to the project and all services within it.

|       Console name        |          API name           |                                          Allowed actions                                          |
| ------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------- |
| View project audit log    | `project:audit_logs:read`   | <ul> <li> View the log for the project. </li> <li> View the services. </li> </ul>                 |
| View project integrations | `project:integrations:read` | <ul> <li> View all integration endpoints for a project. </li> </ul>                               |
| View project networking   | `project:networking:read`   | <ul> <li> View all project VPCs. </li> </ul>                                                      |
| Manage project networking | `project:networking:write`  | <ul> <li> Add, edit, and remove project VPCs.  </li> </ul>                                        |
| View project permissions  | `project:permissions:read`  | <ul> <li> View all users granted permissions to a project. </li> </ul>                            |
| View services             | `project:services:read`     | <ul> <li> View all details for services, except the service logs. </li> </ul>                     |
| View service logs         | `service:logs:read`         | <ul> <li> View logs for services. </li> </ul> **Service logs may contain sensitive information.** |
