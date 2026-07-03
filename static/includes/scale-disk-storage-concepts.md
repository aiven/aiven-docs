Use dynamic disk sizing (DDS) to scale your service's disk storage.

This operation does not disrupt your running service. You pay only for the
additional storage instead of upgrading the compute resources.

When you add storage to your service, the Aiven platform provisions the
extra disk space and dynamically adds it to your running instances.

In a clustered service such as Apache Kafka, the
additional storage is equally divided between the nodes. In a shared
service, each node receives the total shared capacity of the added
storage.

## Limitations

- Disk added for extra storage is slower than the original disk until service maintenance
  is applied. This may have performance implications depending on the load on your service.
  Dynamically adding disk (either manually or in an automated fashion) may not be
  appropriate for certain I/O intensive workloads.

- Maximum storage size depends on the plan, service type, and cloud provider. It
  can go as high as five times the base storage size of the plan.
- Due to cloud provider restrictions, there is a limit on how many
  times storage can be increased between two maintenance updates. If
  this limit is reached, perform a maintenance update for
  performance optimization.
- If there is an ongoing maintenance update, you cannot add storage
  until the update is completed.
- DDS is not supported on custom service plans.

:::note

If you add storage when you create a service, the cost is included as
part of your service's total cost and is shown in the service summary.

The cost of adding storage to a running service is shown in Aiven
Console when you add it. The total price you
see is the cost of the additional storage and any backups associated
with it. You can also see these storage usage costs in your invoices.

:::
