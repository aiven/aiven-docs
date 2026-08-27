---
title: Permissions for Aiven for DataHub features
sidebar_label: Permissions
---

The following roles and permissions are required for specific Aiven for DataHub features.

DataHub UI permissions are different, and managed within DataHub


|                                                                                                           Action                                                                                                           | Required roles and permissions |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| Add and remove Aiven service connectors                                                                                                                                                                                    | `service::`                    |
| View connection information                                                                                                                                                                                                | `:services:`                   |
| Edit application environment variables to: <br/> <ul> <li> Enable Slack notifications </li> <li> Enable Teams notifications </li> <li> Enable OIDC authentication </li> <li> Reindex search and graph indices </li>  </ul> | `:services:`                   |
| Rotate secrets                                                                                                                                                                                                             | `:services:`                   |



[View all organization and project roles and permissions](/docs/platform/concepts/permissions)
