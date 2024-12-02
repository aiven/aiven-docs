---
title: Connect with valkey-cli
---

Learn how to establish a connection to an Aiven for Valkey™ service using the `valkey-cli`.

## Variables

Replace the following placeholders in the code sample with actual values
from your service overview page:

| Variable    | Description                                              |
| ----------- | -------------------------------------------------------- |
| `SERVICE_URI` | URI for the Aiven for Valkey service connection  |

## Prerequisites

Ensure that the valkey-cli client is installed. You can install it as part of the [Valkey server installation](https://valkey.io/topics/installation/).
## Setup and run

Run the following command from a terminal window to connect:

```shell
valkey-cli -u SERVICE_URI
```

This command initiates a connection to the Aiven for Valkey service.

To verify the connection, execute:

```shell
INFO
```

This command displays all server parameters, ensuring the connection is active:

```text
# Server
redis_version:7.2.4
server_name:valkey
valkey_version:7.2.7
redis_git_sha1:c0b10003
redis_git_dirty:0
redis_build_id:e63142036e093656
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
