The practical memory limit will always be less than the service physical
memory limit.

**All services are subject to operating overhead:**

-   A small amount of memory is required by the operating system kernel
    to manage system resources, including networking functions and disk
    cache.
-   Aiven's cloud data platform requires memory to monitor
    availability, provide metrics, logging and manage backups.

A server or node's **usable memory** can be calculated as:

${ RAM - overhead }$

Where:

- $overhead$ is 350 MiB (≈ 0.34 GiB).

Services may utilize optional components, service integrations,
connection pooling, or plug-ins, which are not included in overhead
calculations.

If a service is overcommitted, the operating system, management layer,
backups or availability monitoring, may fail status checks or operations
due to resource contention. In severe instances, the node may fail
completely with an out-of-memory condition.
