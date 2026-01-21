---
title: Enable OpenSearch Security management for Aiven for OpenSearch®
sidebar_label: Enable OpenSearch Security
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

[OpenSearch Security](/docs/products/opensearch/concepts/os-security) provides a range of security features, including fine-grained access controls, SAML authentication, and audit logging to monitor activity within your Aiven for OpenSearch® service.

By enabling this, you can manage user permissions, roles, and other security aspects
through the OpenSearch Dashboard.

:::info

In addition to Role-Based Access Control (**RBAC**), the following external authentication
methods are supported for Aiven for OpenSearch Security:

- Security Assertion Markup Language (**SAML**)
- OpenID Connect (**OIDC**)

:::

## Considerations before enabling OpenSearch Security management

Before enabling OpenSearch Security management on your Aiven for
OpenSearch service, note the following:

-   OpenSearch Security management cannot be disabled once enabled.
    Therefore, ensure that you thoroughly understand the security
    features and implications before proceeding. If you need assistance
    disabling OpenSearch Security management, contact [Aiven
    support](https://aiven.io/support-services).
-   Fine-grained user access control can be managed through the
    OpenSearch Dashboard after enabling OpenSearch Security management
    for the service.
-   Any existing user roles and permissions will be automatically
    transferred to the OpenSearch Dashboard.
-   To ensure the security of your OpenSearch service, managing the
    security features of OpenSearch is limited only to a dedicated
    administrator role.
-   Once you have enabled OpenSearch Security management, you can no
    longer use [Aiven Console](https://console.aiven.io/), [Aiven
    API](https://api.aiven.io/doc/),
    [Aiven CLI](/docs/tools/cli),
    [Aiven Terraform Provider](/docs/tools/terraform) or
    [Aiven Operator for Kubernetes®](/docs/tools/kubernetes) to manage access controls.

## Enable OpenSearch Security

To activate OpenSearch Security management for your Aiven for OpenSearch service:

1.  Log in to the [Aiven Console](https://console.aiven.io/) and access
    the Aiven for OpenSearch service for which to enable
    security.

1.  On the service page, click <ConsoleLabel name="users"/> in the sidebar.

1.  On the **Users** page, click **Enable OpenSearch Security**.

1.  Review the information in the **OpenSearch Security management** window, confirm
    you understand and want to proceed by selecting the checkbox, and click **Continue**.

1.  Create your administrator user by entering a password for this user.

    :::note
    -   OpenSearch Security administrator username set by default cannot be changed.
    -   To reset the password later, contact [Aiven Support](mailto:support@aiven.io).
    :::

1.  Click **Enable OpenSearch Security** to create the administrator user and activate
    OpenSearch Security management.

After activating OpenSearch Security management, you are redirected to the **Users** page,
where you can verify that the security feature is enabled.

To manage user permissions and other security settings, access OpenSearch Security
management by logging in to the [OpenSearch Dashboard](/docs/products/opensearch/dashboards)
using your security admin credentials.
