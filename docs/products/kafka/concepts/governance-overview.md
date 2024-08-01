---
title: Aiven for Apache Kafka® governance
sidebar_label: Governance
limited: true
---

Governance in Aiven for Apache Kafka® provides a structured and secure way to manage your Aiven for Apache Kafka clusters, ensuring security, compliance, and efficiency.
It includes policies, roles, and processes that streamline operations, enforce standards,
and centralize control, helping organizations manage their
Aiven for Apache Kafka environments effectively.

:::note
Governance for Aiven for Apache Kafka is in
[limited availability (LA)](/docs/platform/concepts/beta_services#limited-availability-).
Only a subset of governance features are available at this stage. More features and
functionalities are incrementally added as development continues.
:::

## Benefits of governance

- **Enhanced security:** Control access to ensure only authorized users can access and
  modify Aiven for Apache Kafka resources.
- **Increased efficiency:** Decentralize management by allowing teams to manage topics
  independently, reducing manual effort and streamlining operations.
- **Regulatory compliance:** Enforce data retention, audit trails, and data integrity
  measures to comply with regulatory requirements.
- **Centralized control:** Manage Aiven for Apache Kafka resources centrally,
  simplifying administration across multiple environments.

## Key elements of governance

- **Ownership distribution:** Assign topic ownership to user groups, enabling them to
  manage configurations and access data without direct Apache Kafka cluster access.
  This promotes shared responsibility, enhances control, and aids in accountability
  tracking during incidents.

- **Request management:** Enable group members to submit and approve requests to create and
  own topics. The request system follows the Four Eyes Principle, requiring another
  team member to review and approve changes, thereby maintaining a clear audit trail.

- **Self-service:** Provide a user-friendly interface for users to manage
  Aiven for Apache Kafka resources. Empower team members to claim ownership of Apache
  Kafka topics proactively, reducing the workload of the administration team and
  eliminating bottlenecks.

- **Standardization:** Establish and enforce standards for topic configurations and
  partitioning strategies across all Apache Kafka clusters to ensure efficient resource
  use.

- **Improved catalog:** Enhance the topic catalog to make it easier for teams to find
  and manage topics across the organization.

- **Schema management:** Compare schema versions in the topic catalog to help
  maintain data quality and compatibility.

- **Access control:** Implement role-based access control (RBAC) for fine-grained
  permissions to ensure only authorized users can access sensitive data. Enable
  organization-wide visibility for Apache Kafka topics, allowing teams to discover
  topics without direct access to Apache Kafka clusters.

- **Monitoring and auditing:** Implement comprehensive monitoring of clusters, topics,
  and applications. Maintain audit logs for all actions performed on the infrastructure.

- **Notifications:** Provide automated notifications to inform users about changes,
  requests, and approvals.

## Related pages

- [Enable governance for Aiven for Apache Kafka®](/docs/products/kafka/howto/enable-governance)
- [Aiven for Apache Kafka® topic catalog](/docs/products/kafka/concepts/topic-catalog-overview)
