import ConsoleLabel from "@site/src/components/ConsoleIcons"

<!-- vale off -->

export const isForkable = (props) => {
  return(
    props.serviceType !== 'Apache Flink®' && props.serviceType !== 'Apache Kafka®' && props.serviceType !== 'Thanos Metrics');
  };

<!-- vale on -->

1. In your project, click <ConsoleLabel name="services"/>.

1. Click **Create service**.

1. Select {props.serviceType ? <strong>{props.serviceType}</strong> : 'the service type'}.

1. Enter a name for your service.

   :::important
   You cannot change the name after you create the service.
   {isForkable(props) && (
      <p>You can <a href="/docs/platform/concepts/service-forking">fork the service</a> with a new name instead.</p>
   )}
   :::

1. Optional: Add [tags](/docs/platform/howto/tag-resources).

1. Select the cloud provider, region, and plan.

   :::note
   Available plans and pricing for the same service can vary between cloud
   providers and regions.
   :::

1. Optional: Add [disk storage](/docs/platform/howto/add-storage-space).

1. In the **Service summary**, click **Create service**.

The status of the service is **Rebuilding** during its creation.
When the status is **Running**, you can start using the service.
This typically takes couple of minutes and can vary between cloud providers and regions.
