---
title: Configuration backups for Aiven for Apache Kafka®
sidebar_label: Configuration backups
---
Aiven for Apache Kafka® includes **configuration backups** that automatically back up key service configurations at no additional cost.

By eliminating the need for manual reconfiguration, Aiven for Apache Kafka® configuration
backups streamline disaster recovery and service restoration. This ensures a reliable
way to restore your service configurations after an incident or when powering off/on your
service, saving you valuable time and resources.

## What is backed up

Configuration backups cover the following components of your Aiven for Apache
Kafka service:

- **Apache Kafka topics configurations**: Including related configuration parameters such
  as retention time and number of partitions.
- **Apache Kafka users and ACLs**: User permissions and access control lists are included.
- **Schema Registry data**: Including schema definitions, schema IDs, configurations
  (such as compatibility level), subjects, and subject versions.
- **Apache Kafka Connect configurations**: Includes all related settings.

## How backups work

- **Automatic backups**: Backups are enabled by default and stored in cloud storage
  every 3 hours.
- **Encryption**: Backups are encrypted for security, preventing direct access by
  users.
- **Automatic restoration and configuration retention**: Configuration backups are
  automatically restored (using the latest backup) after a power off/on cycle. This
  ensures your service configurations are retained and ready for use.

## Limitations

While configuration backups offer significant benefits, there are some limitations:

- **No data backups**: Configuration backups do not include the actual data stored in
  topics, consumer groups, and their offsets. Only the cluster configurations are
  backed up.
- **Latest backup restoration**: Restoration is always from the latest backup available.
  You cannot choose a specific backup for restoration.

## Additional support

For additional support with configuration backups for your Aiven for Apache Kafka®
services, contact [support@aiven.io](mailto:support@aiven.io).
