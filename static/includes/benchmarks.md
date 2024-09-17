When creating or updating an Aiven service, the plan that you choose will drive the specific resources (CPU, memory, disk IOPS, etc.) powering your service.

Aiven is a cloud data platform, so the underlying instance types are chosen
appropriately for the type of service. Elements like local NVMe SSDs,
sufficient memory for the expected workloads, fast access to backup storage,
ability to encrypt the disks, contribute to the choice of the instance types to use on
the selected cloud platforms.

In addition, particular instance types are sometimes
not available in a specific cloud region. There is no one-size-fits-all
for choosing the optimal instance type, so Aiven takes all
of these criteria into account to select the right instance type for a
given service.

To know how much your service can handle, you can benchmark it
with your specific workload, in a representative setup.
It will be affected by more than just the instance type: network throughput,
latency to your applications, number of connections active at the time,
type of TLS encryption in use, and a whole range of things specific to
the cloud environment can contribute to a service's expected
performance.

The best way to know how your application will work is to benchmark it
in your setup. You can move between plans, scaling up and down, without
any downtime in order to try different sizes.
