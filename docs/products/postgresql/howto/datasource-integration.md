---
title: Connect two PostgreSQL® services via datasource integration
---

There are two types of datasource integrations you can use with Aiven for PostgreSQL®:
- [Aiven for Grafana®](/docs/products/postgresql/howto/visualize-grafana)
- Another Aiven for PostgreSQL® service

If you are connecting two
PostgreSQL® services together, perhaps to
[query across them](/docs/products/postgresql/howto/use-dblink-extension), but still want to have a restricted IP allow-list, use the `IP Allow-List` service integration.

Whenever a service node needs to be recycled, for example, for maintenance, a
new node is created with a new IP address. As the new IP address cannot
be predicted, to maintain a connection between two
PostgreSQL services your choices are either to have a very broad IP
allow-list (which might be acceptable in the private IP-range of a
project VPC) or to use the `IP Allow-List` service integration to
dynamically create an IP allow-list entry for the other PostgreSQL
service.

## Integrate two PostgreSQL services

1.  On the **Overview** page for your Aiven for PostgreSQL service, go
    to **Manage integrations** and choose the **IP Allow-List** option.
1.  Choose either a new or existing Aiven for PostgreSQL service.

Now your Aiven for PostgreSQL allows IP traffic from the chosen
PostgreSQL service, regardless of what its IP address is.
