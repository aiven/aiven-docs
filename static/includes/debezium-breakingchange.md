:::note
Aiven supports multiple Debezium versions through multi-version support, including
versions 1.9.7, 2.5.0, 2.7.4, and 3.1.0.

Debezium 2.5 introduced changes to connector configuration and behavior. To prevent
unintentional upgrades during maintenance updates, pin the connector version using the
`plugin_versions` configuration property.
For details, see [Manage connector versions](/docs/products/kafka/kafka-connect/howto/manage-connector-versions).

If you use Debezium for PostgreSQL version 1.9.7 with the `wal2json` replication format,
do not upgrade to version 2.0 or later until you migrate to a supported format such as
`pgoutput`.

To upgrade from version 1.9.7, use multi-version support to test your configuration
before applying changes in production.

:::
