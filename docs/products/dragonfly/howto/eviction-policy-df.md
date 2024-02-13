---
title: Data eviction policy in Aiven for Dragonfly
sidebar_label: Data eviction policy
---

Aiven for Dragonfly® optimizes cache memory management with a low-overhead data eviction policy.

## Understand data eviction policy

Aiven for Dragonfly® uses a variation of the 2Q key eviction algorithm, which
intelligently manages cache by deciding which data to retain or evict based on usage
patterns. This system uses two distinct buffers to streamline cache memory management:

- **Protected buffer:** Stores frequently accessed items, indicating their higher value
  for caching due to repeated use.
- **Probationary buffer:** Temporarily stores new or less frequently accessed items.
  These items move to the protected buffer upon repeated access, indicating their growing
  significance.

This dual-buffer approach ensures resilience against fluctuating access patterns,
maintaining cache efficiency without additional memory overhead per item.
It's a key factor in Dragonfly's ability to keep valuable data accessible while managing
less critical data efficiently.

## Enable `cache_mode` via Aiven Console

By default, `cache_mode `in Aiven for Dragonfly is disabled, which might result in
out-of-memory errors when the `maxmemory` limit is reached. To prevent these errors,
enable `cache_mode` in the advanced settings.

1. Log in to the [Aiven Console](https://console.aiven.io/), select your project, and
   select your Aiven for Dragonfly service.
1. Select **Service settings** from the sidebar.
1. On the **Service settings** page, scroll to the **Advanced configuration** section.
1. Click **Configure**.
1. In the **Advanced configuration dialog**, set the `cache_mode` toggle to **Enabled**.
1. Click **Save configuration**.
