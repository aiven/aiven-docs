---
title: Application users
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

An application user is a type of user that provides programmatic access to the Aiven platform and services through the [Aiven API](/docs/tools/api.md), [CLI](/docs/tools/), [Aiven Terraform Provider](/docs/tools/terraform.md), and [Aiven Kubernetes Operator](/docs/tools/kubernetes). They're intended for non-human users that need to access Aiven.

You must be an [organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions) to access this feature.

## Application user permissions

You [create and manage application users](/docs/platform/howto/manage-application-users)
at the organization level and you
[give them access to projects and services](/docs/platform/howto/manage-permissions)
in the same way as organization users. You can also make application user admin,
giving them full access to your organization, its organizational units, projects,
services, and billing and other settings.

Unlike organization users, application users can't log in to the Aiven Console and the
authentication policies don't apply to them.

## Security best practices

Because application users can have the same level of access to projects and services it's
important to secure these accounts and their tokens to avoid abuse. The
following are some suggested best practices for using Aiven application users.

### Create dedicated application users for each application

Try to create a different application user for each tool or application. For example, if
you have an application that needs to connect to services in one of your projects and
you're using Aiven Terraform Provider in the same project, create two application users. Use
the description field for each user to clearly indicate what it's used for.

This helps you manage the lifecycle of the users and ensure the access permissions are
correct for each use case.

### Keep tokens secure and rotate them regularly

Make sure tokens are securely stored and only accessible by people who need them. Tokens
should also be routinely [revoked](/docs/platform/howto/manage-application-users#revoke-a-token-for-an-application-user)
and replaced with new tokens.

### Delete unused users and tokens

Regularly audit your list of application users to delete unused users. You can view a
list of your organization's application users and the last time they were used in
**Admin** > <ConsoleLabel name="Application users"/>. Click
<ConsoleLabel name="actions"/> > <ConsoleLabel name="view app user profile"/>
to see a user's tokens.

You can [delete unused users](/docs/platform/howto/manage-application-users#delete-an-application-user)
and [revoke specific tokens](/docs/platform/howto/manage-application-users#revoke-a-token-for-an-application-user).
