Adding or removing disk storage does not disrupt the running service.
You pay only for extra storage instead of upgrading compute resources.

You can add extra storage when you create a service or after it is running.
When you add storage to a running service, the Aiven Platform provisions
the extra disk and adds it to the running instances.

For a clustered service such as Aiven for Apache Kafka®, Aiven divides
extra storage equally between the nodes.
For a shared service, each node receives the full extra capacity.
