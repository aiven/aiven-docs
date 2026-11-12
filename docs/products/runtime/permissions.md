---
title: Permissions for Aiven Runtime features
sidebar_label: Permissions
---

The following roles and permissions are required for specific Aiven Runtime features.

[View all roles and permissions](/docs/platform/concepts/permissions)
for Aiven organizations and projects.

|                 Action                  |                                             Required roles and permissions                                             |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Connect or configure a GitHub account   | `role:organization:admin`                                                                                              |
| Deploy applications                     | `project:services:write`, `role:project:manager`, or `role:project:admin`                                              |
| Connect or disconnect an Aiven service  | `project:integrations:write`, `role:project:admin`, or `role:project:manager`                                          |
| Connect a Schema Registry               | `project:services:write`, `role:project:admin`, or `role:project:manager`                                              |
| Edit application environment variables  | `project:services:write`, `service:configuration:write`, `role:project:admin`, or `role:project:manager`               |
| Change the application cloud or region  | `project:services:write`, `role:project:admin`, or `role:project:manager`                                              |
| Change the application branch or ports  | `project:services:write`, `service:configuration:write`, `role:project:admin`, or `role:project:manager`               |
| Change the application plan             | `project:services:write`, `role:services:recover`, `role:project:admin`, or `role:project:manager`                     |
| Power on or off an application          | `project:services:write`, `role:project:admin`, or `role:project:manager`                                              |
| View build and runtime logs             | `service:logs:read`, `role:project:read`, `role:project:admin`, or `role:project:manager`                              |
| Connect a custom domain                 | `project:services:read`, `role:project:read`, `role:services:recover`, `role:project:admin`, or `role:project:manager` |
| Configure Aiven Identity authentication | `role:project:admin`, `role:project:manager`, `project:services:write`, or `service:configuration:write`               |
| Configure an OIDC identity provider     | `role:project:admin`, `role:project:manager`, or `project:services:write`                                              |
