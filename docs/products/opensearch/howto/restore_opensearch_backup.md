---
title: Restore an Aiven for OpenSearch® backup
sidebar_label: Restore a backup
---

import ForkService from "@site/static/includes/fork-service-console.md";
import RelatedPages from "@site/src/components/RelatedPages";

Restore an Aiven for OpenSearch® service from an automatic backup by forking it to a new service.

Aiven for OpenSearch services are backed up automatically. Depending on your service
plan, you can restore a backup from a specific day or hour. For the backup history that
each plan keeps, see
[High availability in Aiven for OpenSearch®](/docs/products/opensearch/concepts/high-availability-for-opensearch).

To restore a backup:

<ForkService/>

Once the new service is running, change your application's
connection settings to point to it and power off the original service.

<RelatedPages/>

- [Fork your Aiven for OpenSearch® service](/docs/products/opensearch/howto/fork-service)
- [Back up your Aiven for OpenSearch® service to another region](/docs/products/opensearch/howto/backup-to-another-region)
- [Track restore progress for your Aiven for OpenSearch® service](/docs/products/opensearch/howto/track-restore-progress)
- [High availability in Aiven for OpenSearch®](/docs/products/opensearch/concepts/high-availability-for-opensearch)
