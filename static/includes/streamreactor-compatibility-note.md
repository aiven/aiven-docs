:::caution

**Version compatibility**

Stream Reactor version 9.0.2 includes class and package name changes introduced in
version 6.0.0 by Lenses. These changes standardize connector class names and converter
package names.

Version 9.x is not compatible with version 4.2.0. To continue using version 4.2.0,
[set the connector version](/docs/products/kafka/kafka-connect/howto/manage-connector-versions#set-version)
before upgrading.

If you are upgrading from version 4.2.0, you must recreate the connector using the
updated class name. For example:

```json
"connector.class": "io.lenses.streamreactor.connect.<connector_path>.<ConnectorClassName>"
```

For details about the changes, see the
[Stream Reactor release notes](https://docs.lenses.io/stream-reactor/docs/releases/).
:::
