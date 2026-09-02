---
title: Security and access in Aiven for OpenSearch®
sidebar_label: Security and access
---

import RelatedPages from "@site/src/components/RelatedPages";

Control access to your Aiven for OpenSearch® service and manage OpenSearch® Security
features.

## Choose an access control model

A service uses one of two access control models, not both, and the choice shapes
which tools you manage it with afterward:

- [**Aiven ACLs**](/docs/products/opensearch/concepts/access_control), the default:
  service users and index-level permissions stay manageable from the Aiven Console,
  API, CLI, or Terraform, the same tools you use for the rest of the service.
- [**OpenSearch® Security**](/docs/products/opensearch/howto/list-opensearch-security),
  an opt-in model. User, role, and permission management moves entirely to the
  OpenSearch Security dashboard or API, in exchange for capabilities ACLs don't
  offer, such as document and field-level security,
  [SAML](/docs/products/opensearch/howto/saml-sso-authentication),
  [OpenID Connect](/docs/products/opensearch/howto/oidc-authentication), and
  [JWT](/docs/products/opensearch/howto/jwt-authentication) single sign-on,
  [audit logging](/docs/products/opensearch/howto/audit-logs), and dashboard
  multi-tenancy.

Switching models is a one-way move. Once you enable OpenSearch Security, the Aiven
Console, API, CLI, Terraform, and Kubernetes Operator permanently lose the ability to
manage access control for that service. Test the switch on a
[forked](/docs/products/opensearch/howto/fork-service) copy before applying it to a
service you rely on.

## Things to know

- ACL rules cover indices by default, but not the top-level `_mget`, `_msearch`, and
  `_bulk` APIs. Turn on extended ACLs if you need those rules enforced there too.
- Forking doesn't carry over single sign-on configuration, so reconfigure it on the
  new service whenever you fork, rename, or restore a backup.
- A service user with a narrow ACL can still trip over OpenSearch Dashboards, since
  Dashboards issues `_msearch` requests on the user's behalf regardless of what that
  user is scoped to search directly.

<RelatedPages/>

- [Access control in Aiven for OpenSearch®](/docs/products/opensearch/concepts/access_control)
- [Manage users and access control in Aiven for
  OpenSearch®](/docs/products/opensearch/howto/control_access_to_content)
- [OpenSearch® Security management in Aiven for
  OpenSearch®](/docs/products/opensearch/howto/list-opensearch-security)
