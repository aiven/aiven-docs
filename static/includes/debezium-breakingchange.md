:::note
Aiven supports multiple Debezium versions through multi-version support, including
versions 1.9.7, 2.5.0, 2.7.4, and 3.1.0.

Debezium version 2.5 introduced changes to connector configuration and behavior. To
prevent unintentional upgrades during maintenance updates, pin the connector version
using the `plugin_versions` configuration property.
For instructions, see [Manage connector versions](/docs/products/kafka/kafka-connect/howto/manage-connector-versions).

If you use Debezium for PostgreSQL with version 1.9.7 and the `wal2json` replication
format, do not upgrade to version 2.0 or later until you migrate to a supported
format such as `pgoutput`.

To upgrade from version 1.9.7 to a newer supported version, use multi-version support
and test your configuration before applying changes in production.
:::
