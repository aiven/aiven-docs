:::note[Total storage with a plan]

Total storage represents the maximum amount of data you can insert into a service, and it
doesn't depend on the number of nodes.

The inserted data is replicated on all available nodes. How many times it's replicated
depends on the number of nodes and the number of shards:

```math
number_of_data_replication_times = number_of_nodes / number_of_shards
```

**Examples**

- Service plan with **one shard**

  A Startup-16 plan or a Business-16 plan, each has 1150 GB of total storage per VM. Since
  the Business-16 plan offers three VMs, your total storage is 3450 GB, but effectively
  it's still 1150 GB because that’s the maximum a single node can hold.

- Service plan with **two shards**

  A Premium-6x-16 plan has two shards and six servers, each server with
  1150 GB of storage. The data you insert is replicated three times, held between two
  shards.

:::
