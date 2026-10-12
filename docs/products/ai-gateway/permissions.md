---
title: Permissions for AI Gateway
sidebar_label: Permissions
---

The following roles and permissions are required for specific AI Gateway features.

[View all roles and permissions](/docs/platform/concepts/permissions)
for Aiven organizations and projects.

|     Action      |                 Required roles and permissions                  |
| --------------- | --------------------------------------------------------------- |
| Manage API keys | `project:ai_gateway_keys:write`                                |
| View model list | `project:ai_gateway_keys:write`, `project:ai_gateway_keys:read` |
| View metrics    | `project:ai_gateway_keys:write`, `project:ai_gateway_keys:read` |
