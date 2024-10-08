---
title: When to create an index
---

Determine wether to create an index per customer/project/entity or to look for alternatives.

Consider creating an index per customer/project/entity when:

<!-- vale off -->
-   You have a very limited number of entities (tens, not hundreds or
    thousands);
-   You need to efficiently delete all the data related to a single entity.
<!-- vale on -->

For example, storing logs or other events on per-date indexes (
`logs_2018-07-20`, `logs_2018-07-21` etc.) adds value assuming old
indexes are cleaned up. If you have low-volume logging and want to keep
indexes for very long time (years?), consider per-week or per-month
indexes instead.

It is **not** recommended to create an index per customer/project/entity if:

-   You have potentially a very large number of entities (thousands), or
    you have hundreds of entities and need multiple different indexes
    for each and every one;
-   You expect a strong growth in number of entities;
-   You have no other reason than separating different entities from
    each other;

Instead of creating something like `items_project_a`, consider using a
single `items` index with a field for project identifier, and query the
data with OpenSearch® filtering. This will be far more efficient usage
of your OpenSearch service.

:::note
Aiven does not place any restrictions on the number of indices in your
OpenSearch service.
:::
