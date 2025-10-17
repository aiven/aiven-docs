import ConsoleLabel from "@site/src/components/ConsoleIcons";

1. In your project, click <ConsoleLabel name="services"/>.

1. Click **Create service**.

1. Select {props.serviceType ? <strong>{props.serviceType}</strong> : 'a service type'}.

1. Select a **Service tier**.

1. Select a **Cloud**.

   :::note
   You cannot choose a cloud provider or a specific cloud region
   on the Free tier.
   :::

1. Select a **Plan**.

   :::note
   The plans available can vary between cloud providers and regions
   for the same service.
   :::

1. In the **Service details**, enter a name for your service.

1. Optional: Add [service tags](/docs/platform/howto/tag-resources).

1. In the **Service summary**, click **Create service**.

The status of the service is **Rebuilding** during its creation.
When the status is **Running**, you can start using the service.
This typically takes a couple of minutes and can vary between cloud providers and regions.
