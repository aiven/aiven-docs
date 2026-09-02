---
title: Security and access in Aiven for Grafana®
sidebar_label: Security and access
---

import RelatedPages from "@site/src/components/RelatedPages";

Manage service credentials and OAuth configuration for your Aiven for Grafana® service.

## Two ways to control who signs in

Securing access to Aiven for Grafana covers two independent areas. The first is
[rotating your service
credentials](/docs/products/grafana/howto/rotating-grafana-service-credentials):
updating the built-in `avnadmin` account's password directly in Grafana, then syncing
it back to the Aiven Console. The second is federated sign-in through an identity
provider, set up through [OAuth
configuration](/docs/products/grafana/howto/oauth-configuration) using a generic OAuth
provider, Google, GitHub, GitLab, or Azure AD, as [advanced
parameters](/docs/products/grafana/reference/advanced-params) on the service.

## Before you start

- Credential rotation and OAuth solve different problems: rotating the `avnadmin`
  password is a manual, single-account fix, while OAuth hands sign-in and
  deprovisioning to your identity provider for everyone who uses Grafana.
- OAuth sign-in for each provider is configured separately, through the
  `auth_generic_oauth`, `auth_google`, `auth_github`, `auth_gitlab`, or `auth_azuread`
  parameters, rather than through one combined settings page.
- Setting `oauth_allow_insecure_email_lookup` to `true` makes Grafana look up users by
  email instead of the unique ID your identity provider assigns them. Only enable it if
  you understand the phishing, spoofing, and account takeover risks that email-based
  lookup introduces.

<RelatedPages/>

- [Update Aiven for Grafana® service
  credentials](/docs/products/grafana/howto/rotating-grafana-service-credentials)
- [Aiven for Grafana® OAuth configuration and security
  considerations](/docs/products/grafana/howto/oauth-configuration)
