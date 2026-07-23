---
title: Huge pages for Aiven for PostgreSQL®
sidebar_label: Huge pages
---

import RelatedPages from "@site/src/components/RelatedPages";

Understand how Aiven for PostgreSQL® uses Linux huge pages to improve memory performance, and learn how to verify huge pages status on your service.

## What are huge pages

Linux manages physical memory in fixed-size units called pages. The default page size is
4 KB. Huge pages are larger memory pages that reduce memory management overhead for
processes with large shared memory segments.

PostgreSQL uses huge pages for `shared_buffers`, which is a large shared memory area.
Allocating shared buffers with huge pages reduces memory overhead compared to the default
4 KB pages. The result is more predictable query throughput and faster standby promotion
during failover.

## How Aiven manages huge pages

Aiven manages huge page allocation automatically. No configuration is required on your
part.

The behavior depends on the amount of RAM available to the service node:

- **Services with 8 GB RAM or more**: Aiven allocates huge pages at node startup and
  configures PostgreSQL to use them. If allocation fails, the node restarts rather than
  starting without huge pages.
- **Services with less than 8 GB RAM**: Huge pages are turned off. This keeps memory
  behavior consistent and avoids the memory pressure that huge pages can create on
  smaller nodes.

:::note
This behavior is rolling out gradually across the Aiven for PostgreSQL® fleet. Services
that have not yet received the update run without dedicated huge page allocation.
:::

### When you change shared_buffers_percentage

The `shared_buffers_percentage` setting controls how much of node RAM PostgreSQL
allocates to shared buffers. Because shared buffers are the main consumer of huge pages,
changing this setting changes the number of huge pages required.

Aiven handles this automatically. When `shared_buffers_percentage` changes on a large
node, the platform recomputes the required huge page pool and grows it if needed before
applying the new PostgreSQL configuration.

## Verify huge pages status

Connect to your PostgreSQL service and run the following queries to confirm the current
huge pages configuration and status:

```sql
SHOW huge_pages;
SHOW huge_pages_status;
SHOW shared_memory_size_in_huge_pages;
```

The output columns mean:

| Parameter | Description |
|-----------|-------------|
| `huge_pages` | The requested huge pages mode. `on` forces huge pages, `off` turns them off, `try` requests them and falls back silently if unavailable. |
| `huge_pages_status` | The actual runtime result: `on` means PostgreSQL is running on huge pages, `off` means it is using standard pages. |
| `shared_memory_size_in_huge_pages` | How many huge pages PostgreSQL's shared memory segment requires. |

For a service with `huge_pages = on`, `huge_pages_status` is always `on`. If it is
`off` while `huge_pages` is `on`, PostgreSQL would not have started at all.

<RelatedPages>

- [Aiven for PostgreSQL® shared buffers](/docs/products/postgresql/concepts/pg-shared-buffers)
- [High availability of Aiven for PostgreSQL®](/docs/products/postgresql/concepts/high-availability)
- [Upgrade and failover procedures for Aiven for PostgreSQL®](/docs/products/postgresql/concepts/upgrade-failover)

</RelatedPages>
