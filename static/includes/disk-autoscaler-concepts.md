Use the Aiven Autoscaler to automatically increase the storage capacity of a service
disk when it's running out of space. Disk autoscaler only increases storage, it doesn't
scale storage down.

## Why use disk autoscaling

- **Cost efficiency**: Start with a regular-sized disk and let Aiven scale it up only
  when needed, without the risk of running out of disk space.
- **Resiliency**: Avoid a service becoming non-functional because it ran out of disk
  space, including during unexpected spikes in demand.

## How it works

1. You create an autoscaler integration endpoint in your project, setting the maximum
   total disk size to allow.
1. You enable an autoscaler integration for your service using that endpoint.
1. Aiven monitors the disk space usage of your service.
1. When disk usage reaches the threshold for your service type, Aiven increases the
   available storage by at least 10%, using the current used space as a baseline.

   :::note
   The exact increase depends on the service type and cloud provider. Some providers
   enforce a minimum increase of 10 GB.
   :::

   :::note[Autoscale thresholds per service type]
   The threshold that triggers disk autoscaling is a percentage of the available disk
   storage capacity:

   - Aiven for OpenSearch®: 75% of the available disk storage capacity
   - All other supported service types: 85% of the available disk storage capacity
   :::

1. The disk increase is recorded in the project event log, and you receive a
   notification about the added disk space.

## Limitations and considerations

- **Maximum storage**: The maximum storage that the autoscaler can allocate for your
  service is limited by both the maximum disk size set on the autoscaler endpoint and
  the maximum disk storage supported for your service plan.
- **Timing**: Autoscaling takes a moment to complete. In the meantime, the service disk
  might fill up and the service might enter read-only mode until autoscaling finishes,
  unless the autoscaler's disk capacity limit is reached.
- **Maintenance updates**: Autoscaling works only on fully running services and can't
  happen during a maintenance update.
- **Manual changes**: Changing disk space manually can delay an autoscaling event.
- **Terraform**: Don't manage disk space with the Aiven Terraform Provider on a service
  that uses the autoscaler, to avoid conflicts between the two.
- **Performance**: Disk added through autoscaling is slower than the original disk
  until the next maintenance update applies. This might affect I/O-intensive workloads.

## Prerequisites

- An Aiven organization, project, and service that's up and running
- The operator role for the organization, project, and service
- Dynamic disk sizing support on your service plan and cloud region
- One of the following to manage the autoscaler:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven API](https://api.aiven.io/doc/)
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven Provider for Terraform](/docs/tools/terraform)
