:::note[Total storage per plan]
In service plans with a single shard, storage capacity doesn't depend on the number of
nodes, and the data of this single shard is replicated on all the available nodes.

For example, with a Startup-16 plan you get 1150 GB of total storage per VM, same as with
a Business-16 plan. Since the Business-16 plan offers three VMs, your total storage is
3450 GB, but effectively it's still 1150 GB because that’s the maximum a single node can
hold.
:::
