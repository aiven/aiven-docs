---
title: Security and access in Aiven for Valkey™
sidebar_label: Security and access
---

import RelatedPages from "@site/src/components/RelatedPages";

Control access and secure connections to your Aiven for Valkey™ service.

## Two independent layers of control

Securing an Aiven for Valkey™ service involves two layers that don't affect each
other. Transport security, SSL, encrypts the connection between a client and the
service. Authorization, through access control lists (ACLs), determines what an
already-connected user can do, down to individual commands, key patterns, and pub/sub
channels. Turning SSL off doesn't loosen a user's ACLs, and tightening ACLs doesn't
encrypt an otherwise plain-text connection.

## Things to know

- Every service starts with a default administrative user that has full access.
  Create separate service users with restricted ACLs for applications and
  integrations instead of sharing that user's credentials.
- Aiven for Valkey restricts the server's own `ACL` and `CONFIG` commands, so you
  configure ACLs and SSL settings through the Aiven Console, Aiven CLI, Aiven API, or
  Terraform rather than by running these commands directly.
- When you set ACL categories, commands, or keys for a user through the CLI, API, or
  Terraform, specify all three together. Pub/sub channel rules can be set on their own.
- Disabling SSL sends credentials and data in plain text, so it isn't recommended.

<RelatedPages/>

- [Configure ACL permissions in Aiven for
  Valkey™](/docs/products/valkey/howto/configure-acl-permissions)
- [Manage SSL connectivity in Aiven for
  Valkey™](/docs/products/valkey/howto/manage-ssl-connectivity)
