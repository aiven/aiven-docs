---
title: Project roles and permissions
sidebar_label: Project member roles
---

When you add users to a project individually or as part of a [group](/docs/platform/howto/manage-groups) you also assign them a role for that project.

| Role              | View services | Create services | Manage services | Connect | Power services on/off | Edit permissions |
| ----------------- | ------------- | --------------- | --------------- | ------- | --------------------- | ---------------------- |
| **Administrator** | ✅             | ✅               | ✅               | ✅       | ✅                     | ✅                      |
| **Operator**      | ✅             | ✅               | ✅               | ✅       | ✅                     |                        |
| **Developer**     | ✅             |                 | ✅               | ✅       |                       |                        |
| **Read Only**     | ✅             |                 |                 |         |                       |                        |

- **Admin**: Full access to the project and its services.
  -   Every project has at least one admin user. This role is automatically granted to
      users who create a project.
  -   Does not have access to organization settings such as billing unless they are also
      a [super admin](/docs/platform/howto/make-super-admin).
  -   Can add users and groups to the project.
  -   Can remove users and groups from the project.

- **Operator**: Full access to all services in the project.
  -   Can create new services.
  -   Cannot make changes to the users, groups, or permissions for a project.
- **Developer**: Allowed to manage services in this project.
  -   Can make changes to services and databases, for example:
        creating databases, connecting to databases, removing Aiven for
        OpenSearch® indexes, creating and modifying Aiven for Apache
        Kafka® topics, and creating and modifying Aiven for PostgreSQL®
        connection pools.
  -   Can create and change service database users.
  -   Cannot make changes to the project users, groups, or permissions.
  -   Cannot make changes that affect billing, such as powering services on or off.
- **Read-only**: Only allowed to view services.
  -   Cannot make any changes to the project or its services.
