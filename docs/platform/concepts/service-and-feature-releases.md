---
title: Service and feature releases
---

import LimitedBadge from "@site/src/components/Badges/LimitedBadge";
import EarlyBadge from "@site/src/components/Badges/EarlyBadge";

New services and features follow a release lifecycle that promotes quality by giving customers the chance to test them and provide feedback.

The release stages and labels for new services and features vary across the Aiven Console
and other interfaces like the Aiven API and Aiven Terraform Provider.


## Aiven Console

The release stages for features in the Aiven Console are:

1. Limited availability
1. Early availability
1. General availability

### Limited availability <LimitedBadge/>

The limited availability stage is an initial release of a
new feature or service that you can try out by invitation only.

To try a service or feature in this stage, contact the
[sales team](https://aiven.io/contact).

### Early availability <EarlyBadge/>

Features and services in the early availability stage are
released to all users for testing and feedback. There are some
restrictions on the functionality and [service level agreement](https://aiven.io/sla).

They are intended for use in non-production environments, but you can test them with
production-like workloads to gauge their behavior under heavy load. Support tickets
for these services and features are considered
[low severity](https://aiven.io/support-services).

You can enable most early availability features yourself on the
[feature preview page](/docs/platform/howto/feature-preview) in the user profile.

:::note
Using an early availability means that you consent to Aiven contacting
you to request feedback that helps shape the products.
:::

### General availability

New services and features become generally available once they are ready
for production use at scale. The duration of the early and limited
availability stages depends on customer adoption and the time it takes
to address any issues discovered during testing.

### Billing for limited and early availability services

Aiven provides credits for customers to try out limited and early availability
services. After the credit code expires or after you have used the
credits, you are charged for the service at the usual rate.

## Aiven API

Some new API endpoints are marked experimental, but the feature is stable and functional.
The API specification for experimental endpoints can be adjusted based on feedback or
evolving requirements. Any such changes are communicated to ensure a smooth transition.

## Aiven Provider for Terraform

Resources and data sources can be beta or deprecated.

### Beta
Resources and data sources that are in development have the beta label. You can use
these by setting the
[beta environment variable](https://registry.terraform.io/providers/aiven/aiven/latest/docs#environment-variables).

### Deprecated

Deprecated resources and data sources have warnings in the documentation and
when you plan or apply changes. Warnings include details on which resources to use
as replacements and the
[migration guide](https://registry.terraform.io/providers/aiven/aiven/latest/docs/guides/update-deprecated-resources)
provides instructions on moving to the new resources.

## Feature roadmap

You can see Aiven's public roadmap, track the progress of
specific features, submit your own suggestions, and vote on other
suggestions on [Aiven Ideas](https://ideas.aiven.io/).
