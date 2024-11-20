---
title: Key considerations and system adaptation for OpenSearch® Security management
sidebar_label: Security management
---

Before enabling OpenSearch Security management for Aiven for OpenSearch service, understand its impact on your current system and adapt your infrastructure accordingly.

## Test OpenSearch® Security management

If you are an existing Aiven for OpenSearch user, testing OpenSearch
Security management before applying it to your running services is
advisable. To do this, you have two options:

1.  [Create a service](/docs/platform/howto/create_new_service) for testing purposes.
2.  [Fork](/docs/platform/concepts/service-forking) one of your existing running services to create a test
    environment.

## Enabling OpenSearch® Security management

Once OpenSearch Security management is enabled, the following changes
will occur:

1.  Your current Aiven for OpenSearch users and roles will be
    transferred to OpenSearch.
2.  Aiven for OpenSearch Access Control List (ACL) APIs will be
    deactivated. The affected API endpoints are:
    -   [ServiceOpenSearchAclGet](https://api.aiven.io/doc/#tag/Service:_OpenSearch/operation/ServiceOpenSearchAclGet)
    -   [ServiceOpenSearchAclSet](https://api.aiven.io/doc/#tag/Service:_OpenSearch/operation/ServiceOpenSearchAclSet)
    -   [ServiceOpenSearchAclUpdate](https://api.aiven.io/doc/#tag/Service:_OpenSearch/operation/ServiceOpenSearchAclUpdate)
3.  Aiven for OpenSearch ACL in the Aiven Terraform Provider will be
    disabled. The affected resources are:
    -   [Opensearch_acl_config](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/opensearch_acl_config)
    -   [Opensearch_acl_rule](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/opensearch_acl_rule)
    -   [Opensearch_user](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/opensearch_user)
4.  Managing OpenSearch ACL through the [Aiven
    Console](https://console.aiven.io/) will no longer be available.
    Instead, use the OpenSearch API and OpenSearch Security dashboard
    for user and role management.

## Adapting your system, automation, and infrastructure

Preparing and adapting your systems, automation processes, and
infrastructure is important to accommodate the changes introduced by
OpenSearch Security Management for Aiven for OpenSearch. This adaptation
ensures that your organization can seamlessly transition to the new
security measures and benefit from enhanced protection.

1.  Assess the impact of OpenSearch Security management on your existing
    systems and infrastructure, identifying areas that require
    modification to support the new security features.
2.  Review and update your automation processes to incorporate the
    security configurations, policy, and control implementation offered
    by OpenSearch Security, ensuring consistency across your system and
    infrastructure.
3.  Test and validate the updated systems, automation, and
    infrastructure to ensure compatibility and functionality with the
    new security features.
4.  Provide training and support to your teams to familiarize them with
    the changes and ensure they can effectively manage the transition.
5.  Monitor and adjust your systems, automation, and infrastructure as
    needed, maintaining optimal performance and security in alignment
    with your organization's requirements.
