---
title: Upgrade Elasticsearch clients to OpenSearch®
---

Elasticsearch has introduced breaking changes into their client libraries as early as **7.13.\***, meaning newer Elasticsearch clients won't work with OpenSearch®.

## Migration steps

To upgrade the Elasticsearch clients to OpenSearch:

1.  Pin your Elasticsearch libraries to version **7.10.2** (latest
    version under the open-source license).
2.  Switch from **Elasticsearch 7.10.2** to the fully compatible
    **OpenSearch 1.0.0**.
3.  Update OpenSearch libraries till their latest version.

:::note
You can migrate your cluster from Elasticsearch to OpenSearch either
before or after switching the clients.
:::

## Postpone the upgrade

If you cannot upgrade immediately, we recommend locking the client
version of Elasticsearch to **7.10.2** and use this version till you can
proceed with the migration steps outlined above. This is true for
application libraries as well as for the supporting ecosystem of tooling
like File Beats and Logstash.

:::note
See [OpenSearch compatibility
documentation](https://opensearch.org/docs/latest/clients/index/) as the
source of truth.
:::

## Client migration examples

To help you with the migration, see some [code migration
examples](https://github.com/aiven/opensearch-migration-examples).

### Java and Spring Boot

[Java
client](https://opensearch.org/docs/latest/clients/java-rest-high-level/)
is a fork of the Elasticsearch library. To migrate change the Maven or
Gradle dependencies, and update the import statements for the DOA layer.
See an [example code
change](https://github.com/aiven/opensearch-migration-examples/commit/7453d659c06b234ae7f28f801a074e459c2f31c8)
in our repository.

### NodeJS

[Node library](https://opensearch.org/docs/latest/clients/javascript/)
is a fork of the Elasticsearch library. The only required change should
be the dependency in `package.json` and the `require` or `import`
statements. See an [example migration
code](https://github.com/aiven/opensearch-migration-examples/tree/main/node-client-migration)
in our repository.

### Python

[Python client
library](https://opensearch.org/docs/latest/clients/python) is a fork of
the Elasticsearch libraries. The only required change should be the
dependencies and the `require` or `import` statements. See an
[example migration
code](https://github.com/aiven/opensearch-migration-examples/tree/main/python-client-migration)
in our repository.

import ElasticSearch from "@site/static/includes/trademark-elasticsearch.md"

<ElasticSearch/>
