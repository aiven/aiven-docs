In addition to the primary service backup, you can keep a secondary backup in another
region.

:::important
This feature is in
[limited availability](/docs/platform/concepts/service-and-feature-releases#limited-availability-).
Contact your account team to enable it for your project.
:::

Backup to another region (BTAR) is a disaster recovery feature that copies backup files
from your service's primary backup region to an additional, secondary region. BTAR
improves data resilience and protects your data against an outage in the primary backup
region. If the primary region becomes unavailable, you can fork your service from the
backup copy stored in the secondary region.

BTAR is not a live replica of your database. It replicates backup files asynchronously,
so recovery means forking or restoring from those files rather than failing over to a
running standby. For a live standby with managed failover, use
[cross-region disaster recovery](/docs/products/postgresql/crdr/crdr-overview) on
Aiven for PostgreSQL® instead.

## Limitations

- The cloud provider for your secondary backup region must match the cloud provider for
  your service and its primary backup.
- You can configure one secondary backup region for each service.
- You can restore a secondary backup only in the region where it is stored.
- To fork from a secondary backup, the backup must already be replicated to the
  secondary region.
- Read replicas cannot restore from a secondary backup.
