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
`index.blocks.read_only_allow_delete` on the affected indices. Freeing up space doesn't
clear this setting. Unset it manually for each affected index:

```bash
curl -X PUT "https://USER:PASSWORD@HOST:PORT/INDEX_NAME/_settings" \
     -H 'Content-Type: application/json' \
     -d '{
  "index.blocks.read_only_allow_delete": null
}'
```

Replace the following:

- `USER`: the username for the OpenSearch cluster.
- `PASSWORD`: the password for the OpenSearch cluster.
- `HOST`: the hostname for the connection.
- `PORT`: the port number for the connection.
- `INDEX_NAME`: the name of the affected index.

:::note
Aiven for OpenSearch doesn't unset `index.blocks.read_only_allow_delete` automatically, to
avoid the index flipping between read-only and read-write as disk usage fluctuates near
the threshold.
:::

<RelatedPages/>

- [Disk watermarks in Aiven for OpenSearch®](/docs/products/opensearch/reference/low-space-watermarks)
- [Manage indices in Aiven for OpenSearch®](/docs/products/opensearch/concepts/indices)
- [Scale disk storage](/docs/products/opensearch/howto/scale-disk-storage)
