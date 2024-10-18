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

|   Name    |                                                                                                                               Permissions                                                                                                                                |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Admin     | Full access to the project and all of its services. <br/> Admin do not have access to organization settings like billing or organization admin.                                                                                                                          |
| Operator  | View project audit log. <br/> View project permissions. <br/>  Full access to all services in the project and their configuration.                                                                                                                                       |
| Developer | Create databases. <br/> View connection information. <br/> Remove Aiven for OpenSearch® indexes. <br/> Create and change Aiven for Apache Kafka® topics. <br/> Create and change Aiven for PostgreSQL® connection pools. <br/> Create and change service database users. |
| Read only | View all services and their configuration.                                                                                                                                                                                                                               |

Project admin do not have access to organization settings such as billing unless
they are also a [super admin](/docs/platform/howto/make-super-admin).

## Project and service permissions

:::important
Permissions are not yet fully supported in the Aiven Console. They are intended for
use with the Aiven API, Aiven Provider for Terraform, and Aiven Operator for Kubernetes.
:::

You can grant the following permissions to principals. The actions listed for each
permission apply to the project and all services within it.

|       Console name       |          API name          |                                           Allowed actions                                            |
| ------------------------ | -------------------------- | ---------------------------------------------------------------------------------------------------- |
| View project networking  | `project:networking:read`  | View all project VPCs.                                                                               |
| View project permissions | `project:permissions:read` | View all users granted permissions to a project.                                                     |
| View project audit log        | `project:audit_logs:read`        | View the log for the project. <br/> View all services in the project. <br/> |
| View service logs        | `service:logs:read`        | View logs for all services in the project. <br/> **Service logs may contain sensitive information.** |
| View services            | `project:services:read`    | View all of a project's services details except the service logs.                                            |
