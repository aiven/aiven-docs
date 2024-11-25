---
title: Roles and permissions
---

To give users access to projects and services in your organizations, you grant them permissions and roles:

* **Permissions**: Actions that a principal can perform on a resource or
  group of resources.
* **Roles**: Sets of permissions that you can assign to a principal.

Principals can be:
* [Organization users](/docs/platform/howto/manage-org-users)
* [Application users](/docs/platform/concepts/application-users)
* [Groups](/docs/platform/howto/manage-groups)

You can
[grant access to principals at the project level](/docs/platform/howto/manage-permissions).
You can also [add users to services](/docs/platform/howto/create_new_service_user).

To grant access to resources at the organization level, you can
make organization users [super admin](/docs/platform/howto/make-super-admin).
Limit the number of users with this role as it gives unrestricted access to
all organization resources including billing, admin, and all projects and services.

## Project roles

You can grant the following roles for projects to principals.

|   Console name    |          API name           |                                                                                                                                                           Permissions                                                                                                                                                           |
| ----------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Admin             | `admin`                     | <ul> <li> Full access to the project and all of its services. </li> </ul>                                                                                                                                                                                                                                                       |
| Developer         | `developer`                 | <ul> <li> Create databases. </li> <li> View service connection information. </li> <li> Remove Aiven for OpenSearch® indexes. </li> <li> Create and change Aiven for Apache Kafka® topics. </li> <li> Create and change Aiven for PostgreSQL® connection pools. </li> <li> Create and change service database users. </li> </ul> |
| Operator          | `operator`                  | <ul> <li> View project audit log. </li> <li> View project permissions. </li> <li>  Full access to all services in the project and their configuration. </li> </ul>                                                                                                                                                              |
| Read only         | `read_only`                 | <ul> <li> View all services and their configuration. </li> </ul>                                                                                                                                                                                                                                                                |
| Maintain services | `role:services:maintenance` | <ul> <li> Perform service maintenance updates. </li> <li> Change maintenance windows. </li> <li> Upgrade service versions. </li> </ul>                                                                                                                                                                                          |
| Recover services  | `role:services:recover`     | <ul> <li> Add and remove  dynamic disk sizing and tiered storage. </li> <li> Change service plans. </li> <li> Fork services. </li> <li> Promote read replicas. </li> </ul>                                                                                                                                                      |

Project admin do not have access to organization settings such as billing unless
they are also a [super admin](/docs/platform/howto/make-super-admin).

## Project and service permissions

:::important
Permissions are not yet fully supported in the Aiven Console. They are intended for
use with the Aiven API, Aiven Provider for Terraform, and Aiven Operator for Kubernetes®.
:::

You can grant the following permissions to principals. The actions listed for each
permission apply to the project and all services within it.

|         Console name         |           API name            |                                                                                                                                                                       Allowed actions                                                                                                                                                                       |
| ---------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| View project audit log       | `project:audit_logs:read`     | <ul> <li> View the log for the project. </li> <li> View all services in the project. </li> </ul>                                                                                                                                                                                                                                                            |
| View project integrations    | `project:integrations:read`   | <ul> <li> View all integration endpoints for a project. </li> </ul>                                                                                                                                                                                                                                                                                         |
| Manage project integrations  | `project:integrations:write`  | <ul> <li> Add and remove integration endpoints. </li> <li> Read and write integration secrets. </li> </ul>                                                                                                                                                                                                                                                  |
| View project networking      | `project:networking:read`     | <ul> <li> View all project VPCs. </li> </ul>                                                                                                                                                                                                                                                                                                                |
| Manage project networking    | `project:networking:write`    | <ul> <li> Add, edit, and remove project VPCs.  </li> </ul>                                                                                                                                                                                                                                                                                                  |
| View project permissions     | `project:permissions:read`    | <ul> <li> View all users granted permissions to a project. </li> </ul>                                                                                                                                                                                                                                                                                      |
| View services                | `project:services:read`       | <ul> <li> View all details for services in a project, except the service logs. </li> </ul>                                                                                                                                                                                                                                                                  |
| Manage services              | `project:services:write`      | <ul> <li> Create and delete services. </li> <li> Power on and off services. </li> <li> Add and remove dynamic disk sizing and tiered storage. </li> <li> Change service plans. </li> <li> Change cloud regions. </li> <li> Fork services. </li> </ul>                                                                                                       |
| Manage service configuration | `service:configuration:write` | <ul> <li> Change clouds and regions. </li> <li> Change deployment models. </li> <li> Update IP allowlists. </li> <li> Change the network configuration options. </li> <li> Add and remove service tags. </li> <li> Enable and disable termination protection. </li> <li> Configure backup settings. </li> <li> Add and remove service contacts. </li> </ul> |
| Access data                  | `service:data:write`          | <ul> <li> Perform service queries through the API and Console. </li> <li> View query statistics and current queries. </li> <li> Manage service-specific features like Kafka Topics and Schemas, PostgreSQL and AlloyDB Omni connection pools, and OpenSearch indexes. </li> </ul>                                                                           |
| View service logs            | `service:logs:read`           | <ul> <li> View logs for all services in the project. </li> </ul> **Service logs may contain sensitive information.**                                                                                                                                                                                                                                        |
| View configuration secrets   | `service:secrets:read`        | <ul> <li> Read service configuration secrets such as keys. </li> </ul>                                                                                                                                                                                                                                                                                      |
| Manage service users         | `service:users:write`         | <ul> <li> Create and delete service users. </li> <li> View and update connection information for services. </li> </ul>                                                                                                                                                                                                                                      |
