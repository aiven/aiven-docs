---
title: Create Aiven for MySQL® read replicas
---

import CreateReplica from "@site/static/includes/create-replica-console.md";

Learn how to create an Aiven for MySQL® read replica to provide a read-only instance of your managed MySQL service in another geographically autonomous region.

## About read replicas

Aiven for MySQL read-only replicas provide a great way to reduce the
load on the primary server by enabling read-only queries to be performed
against the replica. It is also a good way to optimise query response
times across different geographical locations since, with Aiven, the
replica can be placed in different regions or even different cloud
providers.

Using read-only replicas works as an extra measure to protect your data
from the unlikely event that a whole region would go down. It can also
improve performance if a read-only replica is placed closer to your
end-users that read from the database.

## Create a read replica

<CreateReplica/>

You can see the read-only replica being created and listed next to other
Aiven service in the **Services** page in [Aiven
Console](https://console.aiven.io/).
