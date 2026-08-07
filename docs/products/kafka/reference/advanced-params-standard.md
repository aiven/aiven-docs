---
title: Advanced parameters for Standard Kafka
sidebar_label: Standard Kafka
---

View the configuration options for Standard Kafka. These configurations apply to
Standard Kafka on Aiven Cloud.

Standard Kafka supports two topic types. Classic topics use
`remote.storage.enable=true`, and diskless topics use `diskless.enable=true`.
For more information about the differences and use cases, see
[Classic topics vs. diskless topics](/docs/products/kafka/diskless/concepts/topics-vs-classic#compare-classic-and-diskless-topics).

import BrokerReference from '@site/static/includes/config-kafka-inkless-saas.md';
import TopicReference from '@site/static/includes/config-kafka-inkless-saas-topic.md';

## Broker parameters

<BrokerReference />

## Topic parameters

<TopicReference />
