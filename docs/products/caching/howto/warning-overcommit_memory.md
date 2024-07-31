---
title: Handle warning overcommit_memory
---

When starting a Aiven for Caching service on [Aiven
console](https://console.aiven.io/), you may notice on **Logs** the
following **warning** `overcommit_memory`:

```plaintext
# WARNING overcommit_memory is set to 0! Background save may fail under
low memory condition. To fix this issue add
'vm.overcommit_memory = 1' to /etc/sysctl.conf and reboot or run the command 'sysctl vm.overcommit_memory=1'
for this to take effect.
```

This warning can be safely ignored as Aiven for Caching ensures that
the available memory never drops low enough to hit this particular
failure case.
