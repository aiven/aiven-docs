---
title: Handle low disk space in Aiven for OpenSearch®
sidebar_label: Handle low disk space
---

import RelatedPages from "@site/src/components/RelatedPages";

Free up disk space in Aiven for OpenSearch® and recover from the flood stage watermark when a node runs low on disk.

OpenSearch relies on
[watermarks](/docs/products/opensearch/reference/low-space-watermarks) to respond to low
disk space. When you're running low on disk space, use one of the following options:

- Upgrade to a larger plan using the [Aiven Console](https://console.aiven.io/) or the
  [Aiven CLI](https://github.com/aiven/aiven-client).
- Clean up unnecessary indices. For logs, create separate daily indices so you can clean
  up the oldest data efficiently.

## Recover after cleaning up space

If OpenSearch exceeded only the low or high watermark, no further action is needed once
you free up space: OpenSearch continues to allow writes.

If OpenSearch exceeded the flood stage watermark, it also sets
`index.blocks.read_only_allow_delete` on every index with a shard on the affected node,
not just the one you're cleaning up. Freeing up space doesn't clear this setting. Unset
it on all affected indices in one request using `_all` as the target:

```bash
curl -X PUT "https://USER:PASSWORD@HOST:PORT/_all/_settings" \
     -H 'Content-Type: application/json' \
     -d '{
  "index.blocks.read_only_allow_delete": null
}'
```

To unset it on a single index instead, replace `_all` with that index's name.

If the affected node is still over the flood stage watermark after you clear this
setting, OpenSearch sets it again automatically. Confirm disk usage has actually dropped
below the watermark before you try to clear the setting.

:::note
`index.blocks.read_only_allow_delete` applies at the index level. While it's set, you
can't delete individual documents from an index to shrink it, only delete the whole
index. Free up space by deleting entire indices or removing data elsewhere, then clear
the setting.
:::

Replace the following:

- `USER`: the username for the OpenSearch cluster.
- `PASSWORD`: the password for the OpenSearch cluster.
- `HOST`: the hostname for the connection.
- `PORT`: the port number for the connection.

:::note
Aiven for OpenSearch doesn't unset `index.blocks.read_only_allow_delete` automatically, to
avoid the index flipping between read-only and read-write as disk usage fluctuates near
the threshold.
:::

<RelatedPages/>

- [Disk watermarks in Aiven for OpenSearch®](/docs/products/opensearch/reference/low-space-watermarks)
- [Manage indices in Aiven for OpenSearch®](/docs/products/opensearch/concepts/indices)
- [Scale disk storage](/docs/products/opensearch/howto/scale-disk-storage)
