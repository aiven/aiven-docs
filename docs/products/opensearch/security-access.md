---
title: Security and access in Aiven for OpenSearch®
sidebar_label: Security and access
---

import RelatedPages from "@site/src/components/RelatedPages";

Control access to your Aiven for OpenSearch® service and manage OpenSearch® Security
features.

## Choose an access control model

Aiven for OpenSearch supports two ways to control access, and a service uses one or
the other, not both:

- **Aiven ACLs**, the default model: Manage service users and index-level permissions
  from the Aiven Console, API, CLI, or Terraform. Rules cover indices only. Enable
  extended ACLs if you also need index rules to govern the `_mget`, `_msearch`, and
  `_bulk` APIs.
- **OpenSearch® Security**, an opt-in model: Manage users, roles, and permissions from
  the OpenSearch Security dashboard or API instead. This model adds document and
  field-level security, SAML, OpenID Connect, and JWT single sign-on, audit logging,
  and dashboard multi-tenancy.

Switching to OpenSearch Security is permanent for that service. Once enabled, you
can't disable it, and the Aiven Console, API, CLI, Terraform, and Kubernetes Operator
all lose the ability to manage access control for it. Test the switch on a forked
service before applying it to a service you rely on.

## Things to know

- Single sign-on methods, such as SAML, aren't copied when you fork a service,
  because they're tied to URLs and endpoints that change during forking. Reconfigure
  them on the new service.
- ACLs apply only to indices, but OpenSearch Dashboards still checks every request
  against the current user's ACLs. A read-only user can get an `HTTP 500` status code
  on dashboards that use the `_msearch` API unless you also grant that user `admin`
  access to `_msearch`.

<RelatedPages/>

- [Access control in Aiven for OpenSearch®](/docs/products/opensearch/concepts/access_control)
- [Manage users and access control in Aiven for
  OpenSearch®](/docs/products/opensearch/howto/control_access_to_content)
- [OpenSearch® Security management in Aiven for
  OpenSearch®](/docs/products/opensearch/howto/list-opensearch-security)
