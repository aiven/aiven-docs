---
title: Connect with redis-cli
---

Learn how to establish a connection to an Aiven for Caching service using the `redis-cli`.


## Variables

Replace the following placeholders in the code sample with actual values
from your service overview page:

| Variable    | Description                                              |
| ----------- | -------------------------------------------------------- |
| `SERVICE_URI` | URI for the Aiven for Caching service connection  |

## Prerequisites

For this example, you will need:

1.  The `redis-cli` client installed. You can install this as part of
    the [Redis server
    installation](https://redis.io/docs/getting-started/tutorial/) or as
    standalone client.

## Code

Execute the following command from a terminal window to connect:

```shell
redis-cli -u SERVICE_URI
```

This command initiates a connection to the Aiven for Caching service.

To verify the connection, execute:

```shell
INFO
```

This command displays all server parameters, ensuring the connection is active:

```text
# Server
redis_version:6.2.3
redis_git_sha1:c708fc4f
redis_git_dirty:1
redis_build_id:eca3e7fbe7ce45c7
redis_mode:standalone
...
```

To set a key, execute the following command:

```bash
SET mykey mykeyvalue123
```

Following successful execution, a confirmation message `OK` appears.

To retrieve the key value, execute the following command:

```bash
GET mykey
```

This will display the value of `mykey`, in this case,`"mykeyvalue123"`.
