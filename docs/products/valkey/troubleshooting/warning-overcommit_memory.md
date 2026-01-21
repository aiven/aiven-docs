---
title: Handle the overcommit memory warning
sidebar_label: Overcommit memory
---

When starting an Aiven for Valkey™ service in the [Aiven Console](https://console.aiven.io/),
you may notice on **Logs** the following **warning** `overcommit_memory`:

```plaintext
# WARNING overcommit_memory is set to 0! Background save may fail under
low memory condition. To fix this issue add
'vm.overcommit_memory = 1' to /etc/sysctl.conf and reboot or run the command 'sysctl vm.overcommit_memory=1'
for this to take effect.
```

This warning can be safely ignored as Aiven for Valkey ensures that
the available memory never drops low enough to hit this particular
failure case.
