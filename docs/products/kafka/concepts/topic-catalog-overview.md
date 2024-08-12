---
title: Aiven for Apache Kafka® topic catalog
sidebar_label: Topic catalog
early: true
---

The Aiven for Apache Kafka® topic catalog provides a centralized interface within the Aiven console to view and manage Apache Kafka topics across different projects and services.
This unified view consolidates all topics into one accessible location, streamlining
the management of your Aiven for Apache Kafka infrastructure.

## Key features and benefits

- **Centralized management**: Access all Apache Kafka topics across your organization
  and projects from a single interface.
- **Search topics**: Find specific Apache Kafka topics using the search bar.
- **Topic information at a glance**: View topic names, associated services, and projects
  in either table view or tile view. The owner column is displayed when governance is
  enabled and shows the group owning the topic.

## Governance on topic catalog

With [governance enabled](/docs/products/kafka/howto/enable-governance) for your
organization, you can efficiently manage topic ownership
and creation requests. You can also access and govern topics across your organization,
even if you aren't a member of all projects.

- **Claim topic ownership**: Request to claim ownership of individual topics not currently
  owned by your group. Additionally, select multiple topics and submit a batch claim
  request for ownership transfer.
- **Topic creation requests and approvals**: Submit requests for creating new
  topics, which go through an approval process to ensure proper governance.

## Related page

- [Manage Apache Kafka topics with topic catalog](/docs/products/kafka/howto/view-kafka-topic-catalog)
- [Aiven for Apache Kafka governance](/docs/products/kafka/concepts/governance-overview)
