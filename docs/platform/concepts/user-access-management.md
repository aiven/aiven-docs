---
title: User and access management
---

There are several types of users in the Aiven Platform:

- [Super admin](/docs/platform/howto/make-super-admin): Users with full access to the
  organization and are not subject to controls like authentication policies.
  Limit the number of these users in an organization for increased security.
- [Organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
   with full access to an organization's users and resources.
- [Organization members](/docs/platform/howto/manage-org-users): All users in an
  organization.
- [Managed users](/docs/platform/concepts/managed-users): Users that have more
  restrictions and are centrally managed. With a verified domain organization users
 automatically become managed users.
- [Application users](/docs/platform/concepts/application-users): Non-human users intended
  for programmatic access to the platform.

All users can be added to [groups](/docs/platform/howto/manage-groups) to help streamline
the process of granting access to organization resources. You grant them access to
resources with [roles and permissions](/docs/platform/concepts/permissions).
