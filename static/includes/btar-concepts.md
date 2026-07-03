In addition to the primary service backup, you can have a secondary backup in
an alternative location.

:::important
This feature is in [limited availability](/docs/platform/concepts/service-and-feature-releases#limited-availability-).
Contact your account team to enable it.
:::

Backup to another region (BTAR) is a disaster recovery feature that allows backup
files to be copied from the service's primary backup region to an additional (secondary)
region. BTAR can bolster data resilience and helps improve data protection against
disasters in the primary backup region. When the primary region is down, BTAR allows
forking the service from an additional copy of the backup residing in a secondary region.

## Limitations

- The cloud provider for your additional backup region must match the cloud provider for
  your service and the primary backup.
- Secondary backup can only be restored in the region where it was stored.
