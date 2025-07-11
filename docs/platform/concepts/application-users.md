---
title: Application users
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

An application user is a type of user that provides programmatic access to the Aiven platform and services through the [Aiven API](/docs/tools/api.md), [CLI](/docs/tools/), [Aiven Terraform Provider](/docs/tools/terraform.md), and [Aiven Kubernetes Operator](/docs/tools/kubernetes). They're intended for non-human users that need to access Aiven.

You must be an [organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions) to access this feature.

You [create and manage application users](/docs/platform/howto/manage-application-users)
at the organization level and you
[give them access to projects and services](/docs/platform/howto/manage-permissions)
in the same way as organization users. You can also grant application users the
organization admin role, giving them full access to your organization,
its organizational units, projects, services, billing, and other settings.

Unlike organization users, application users can't log in to the Aiven Console.

Follow the [security best practices for application users]
to keep these account secure.
