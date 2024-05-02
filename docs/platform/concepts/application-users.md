---
title: Application users
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

An application user is a type of user that provides programmatic access to the Aiven platform and services through the [Aiven API](/docs/tools/api.md), [CLI](/docs/tools/), [Terraform](/docs/tools/terraform.md), and [Kubernetes](/docs/tools/kubernetes.md). They're intended for non-human users that need to access Aiven.

:::info
You must be a [super admin](/docs/platform/howto/make-super-admin) to access this feature.
:::

## Application user permissions

You [create and manage application users](/docs/platform/howto/manage-application-users)
at the organization level. Application users are granted access to projects
and services in the same way as organization users by adding them to
[projects](/docs/platform/howto/add-project-members) and assigning them a role. However,
unlike organization users, application users can't log in to the Aiven Console and the
authentication policies don't apply to them.

## Security best practices

Because application users can have the same level of access to projects and services it's
important to secure these accounts and their authentication tokens to avoid abuse. The
following are some suggested best practices for using Aiven application users.

### Create dedicated application users for each application

Try to create a different application user for each tool or application. For example, if
you have an application that needs to connect to services in one of your projects and
you are using Terraform in the same project, create two application users. Use
the description field for each user to clearly indicate what it's used for.

This helps you manage the lifecycle of the users and ensure the access permissions are
correct for each use case.

### Keep tokens secure and rotate them regularly

Make sure tokens are securely stored and only accessible by people who need them. Tokens
should also be routinely [revoked](/docs/platform/howto/manage-application-users#revoke-a-token-for-an-application-user)
and replaced with new tokens.

### Delete unused users and tokens

Regularly audit your list of application users to delete unused users.

To list all application users and the last time they were used,
click **Admin** > <ConsoleLabel name="Application users"/>.

To see a user's tokens, in the <ConsoleLabel name="Application users"/> page,
click <ConsoleLabel name="actions"/> > <ConsoleLabel name="view profile"/>.

You can [delete unused users](/docs/platform/howto/manage-application-users#delete-an-application-user)
or [revoke specific tokens](/docs/platform/howto/manage-application-users#revoke-a-token-for-an-application-user).
