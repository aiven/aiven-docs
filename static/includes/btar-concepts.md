In addition to the primary service backup, you can keep a secondary backup in another
region.

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

:::note
Aiven enables BTAR for each project separately. Contact your account team to enable it
for your project.
:::

## Charges

BTAR is charged based on your usage, with no flat fee. Charges cover the following:

- **Secondary backup storage**: Aiven charges for the backup data held in the secondary
  region, for each GB-month. The rate depends on the secondary backup region.
- **Cross-region backup transfer**: Aiven charges for the backup data copied from the
  primary region to the secondary region, for each GB. The rate depends on whether the
  two regions are on the same continent.

Restoring from a secondary backup adds no transfer charge, because the restore runs in
the region where the backup is stored.

For [bring your own cloud](/docs/platform/concepts/byoc) services, Aiven charges a flat
monthly fee for each service with BTAR enabled. You pay your cloud provider directly for
the storage and transfer.

## Limitations

- The cloud provider for your secondary backup region must match the cloud provider for
  your service and its primary backup.
- You can configure one secondary backup region for each service.
- You can restore a secondary backup only in the region where it is stored.
- To fork from a secondary backup, the backup must already be replicated to the
  secondary region.
- Read replicas cannot restore from a secondary backup.
