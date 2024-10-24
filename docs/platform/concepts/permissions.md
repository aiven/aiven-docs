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
You can grant access to principals at the project level.

To grant access to resources at the organization level, you can
make organization users [super admin](/docs/platform/howto/make-super-admin).
Limit the number of users with this role as it gives unrestricted access to
all organization resources including billing, admin, and all projects and services.

## Project roles

You can grant the following roles for projects to principals.

| Console name |  API name   |                                                                                                                                                       Permissions                                                                                                                                                       |
| ------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Admin        | `admin`     | <ul> <li> Full access to the project and all of its services. </li> </ul>                                                                                                                                                                                                                                               |
| Developer    | `developer` | <ul> <li> Create databases. </li> <li> View connection information. </li> <li> Remove Aiven for OpenSearch® indexes. </li> <li> Create and change Aiven for Apache Kafka® topics. </li> <li> Create and change Aiven for PostgreSQL® connection pools. </li> <li> Create and change service database users. </li> </ul> |
| Operator     | `operator`  | <ul> <li> View project audit log. </li> <li> View project permissions. </li> <li>  Full access to all services in the project and their configuration. </li> </ul>                                                                                                                                                      |
| Read only    | `read_only` | <ul> <li> View all services and their configuration. </li> </ul>                                                                                                                                                                                                                                                        |

Project admin do not have access to organization settings such as billing unless
they are also a [super admin](/docs/platform/howto/make-super-admin).

## Project and service permissions

:::important
Permissions are not yet fully supported in the Aiven Console. They are intended for
use with the Aiven API, Aiven Provider for Terraform, and Aiven Operator for Kubernetes.
:::

You can grant the following permissions to principals. The actions listed for each
permission apply to the project and all services within it.

|       Console name        |          API name           |                                                   Allowed actions                                                    |
| ------------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| View project audit log    | `project:audit_logs:read`   | <ul> <li> View the log for the project. </li> <li> View all services in the project. </li> </ul>                     |
| View project integrations | `project:integrations:read` | <ul> <li> View all integration endpoints for a project. </li> </ul>                                                  |
| View project networking   | `project:networking:read`   | <ul> <li> View all project VPCs. </li> </ul>                                                                         |
| Manage project networking | `project:networking:write`  | <ul> <li> Add, edit, and remove project VPCs.  </li> </ul>                                                           |
| View project permissions  | `project:permissions:read`  | <ul> <li> View all users granted permissions to a project. </li> </ul>                                               |
| View services             | `project:services:read`     | <ul> <li> View all details for services in a project, except the service logs. </li> </ul>                         |
| View service logs         | `service:logs:read`         | <ul> <li> View logs for all services in the project. </li> </ul> **Service logs may contain sensitive information.** |
