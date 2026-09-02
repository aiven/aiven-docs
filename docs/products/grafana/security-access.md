---
title: Security and access in Aiven for Grafana®
sidebar_label: Security and access
---

import RelatedPages from "@site/src/components/RelatedPages";

Manage service credentials and OAuth configuration for your Aiven for Grafana® service.

## Two ways to control who signs in

Securing access to Aiven for Grafana covers two independent areas. The first is the
built-in `avnadmin` account and its password, which you rotate directly in Grafana and
then sync back to the Aiven Console. The second is federated sign-in through an identity
provider: Aiven for Grafana supports OAuth through a generic OAuth 2.0 provider, Google,
GitHub, GitLab, or Azure AD, configured as advanced parameters on the service.

## Before you start

- Rotating the `avnadmin` password is a manual process. You change it in the Grafana
  UI, then push the new value back to the Aiven Console with the `avn service
  user-password-reset` command so the console and the running service stay in sync.
- OAuth sign-in for Aiven for Grafana is configured through the `auth_generic_oauth`,
  `auth_google`, `auth_github`, `auth_gitlab`, or `auth_azuread` [advanced
  parameters](/docs/products/grafana/reference/advanced-params), not through a separate
  security page.
- Setting `oauth_allow_insecure_email_lookup` to `true` makes Grafana look up users by
  email instead of the unique ID your identity provider assigns them. Only enable it if
  you understand the phishing, spoofing, and account takeover risks that email-based
  lookup introduces.

<RelatedPages/>

- [Update Aiven for Grafana® service
  credentials](/docs/products/grafana/howto/rotating-grafana-service-credentials)
- [Aiven for Grafana® OAuth configuration and security
  considerations](/docs/products/grafana/howto/oauth-configuration)
