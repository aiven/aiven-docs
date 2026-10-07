## Limitations

- Disk added for extra storage is slower than the original disk until
  the next maintenance update. The slower disk can reduce performance
  for I/O-intensive workloads.
- Maximum storage depends on the plan, service type, and cloud provider.
  It can be up to five times the plan's base storage size.
- Cloud providers limit how many times you can increase storage between
  maintenance updates. If you reach the limit, run a maintenance update
  to optimize performance.
- You cannot add storage during a maintenance update.
- Dynamic disk sizing (DDS) is not supported on custom service plans.

:::note[Pricing]
If you add storage when you create a service, **Additional disk storage**
shows an estimated monthly cost. The **Service summary** lists plan storage
plus additional storage. The estimated monthly price includes the
additional storage cost.

If you add storage to a running service, the Aiven Console shows the
cost of the additional storage and related backups. The same costs
appear on your invoices.
:::
