import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

<!-- vale off -->

export const isForkable = (props) => {
  return(
    props.serviceType !== 'Apache Flink®' && props.serviceType !== 'Apache Kafka®' && props.serviceType !== 'Thanos Metrics');
  };

<!-- vale on -->

1. From your project, in the <ConsoleLabel name="services"/> page, click **Create service**.

1. From the **Select service** page,
   click {props.serviceType ? <strong>{props.serviceType}</strong> : 'the service type of your choice'}.

1. Select the cloud provider and region to host your service on.

   :::note
   The pricing for the same service can vary between different
   providers and regions. The service summary shows you the pricing
   for your selected options.
   :::

1. Select a service plan.

   :::note
   This determines the number of servers and the memory,
   CPU, and disk resources allocated to your service. See
   [Plans & Pricing](https://aiven.io/pricing).
   :::

1. Optional: Add [disk storage](/docs/platform/howto/add-storage-space).

1. Enter a name for your service.

   :::important
   You cannot change the name after you create the service.
   {isForkable(props) && (
      <p>You can <a href="/docs/platform/concepts/service-forking">fork the service</a> with a new name instead.</p>
   )}
   :::

1. Optional: Add [tags](/docs/platform/howto/tag-resources).

1. Click **Create service**.

The <ConsoleLabel name="overview"/> page of the service opens. It shows
the connection parameters for your service, its current status, and the
configuration options.

The status of the service is **Rebuilding** during its creation.
When the status becomes **Running**, you can start using the service.
This typically takes couple of minutes and can vary between cloud providers and regions.
<!-- vale off -->
