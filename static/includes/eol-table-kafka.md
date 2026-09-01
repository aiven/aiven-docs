Aiven for Apache Kafka versions reach EOL one year after they become available on the
Aiven Platform.

| Version | Aiven EOL  | Service creation supported until | Service creation supported from |
| ------- | ---------- | -------------------------------- | ------------------------------- |
| 3.8.x   | 2026-09-30 | 2026-06-30                       | 2024-09-06                      |
| 3.9.x   | 2027-09-30 | 2027-06-30                       | 2025-03-20                      |
| 4.0.x   | 2026-09-18 | 2026-06-18                       | 2025-09-18                      |
| 4.1.x   | 2027-01-31 | 2026-09-10                       | 2025-12-10                      |
| 4.2.x   | 2027-06-15 | 2027-03-15                       | 2026-06-15                      |

:::note
Apache Kafka 3.8 is the last version that supports ZooKeeper.

Starting with Apache Kafka 3.9, Aiven for Apache Kafka uses KRaft (Kafka Raft) to manage
metadata and controllers instead of ZooKeeper. For details about the migration process
and rollout limitations, see:

- [KRaft in Aiven for Apache Kafka®](/docs/products/kafka/concepts/kraft-mode)
- [Transitioning to KRaft](/docs/products/kafka/concepts/upgrade-procedure#transitioning-to-kraft)

To support the transition to KRaft, Aiven supports Apache Kafka 3.8 until the EOL date
shown in the table. The EOL date already includes the extended support period.
:::
