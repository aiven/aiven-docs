---
title: Pause or terminate your service
sidebar_label: Pause or terminate service
---

Cloud services can be created, paused, or destroyed as needed, to optimize costs. For example, you can power the service off temporarily to save credits.

:::important
Static IP addresses are not disassociated/deleted when a service is powered off or
deleted. They continue to generate the usual costs. To remove static IP addresses, see
[Manage static IP addresses](/docs/platform/howto/static-ip-addresses).
:::

You can update the state of your service either through the service
overview page in [Aiven Console](https://console.aiven.io) or by using
Aiven command line interface:

```bash
avn service update <your service name> --power-off
```

When you're ready to continue using the service run the command to
power it on. Use the `wait` command to see when the service is up and
running.

```bash
avn service update <your service name> --power-on
avn service wait <your service name>
```

If you have finished exploring your OpenSearch® service, you can destroy
or _terminate_ the service. To terminate the service completely use
the following command:

```bash
avn service terminate <your service name>
```

You will be prompted to re-enter the service name to confirm that you
want to complete the termination.
