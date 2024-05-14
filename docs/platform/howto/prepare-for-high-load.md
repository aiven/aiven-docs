---
title: Prepare services for high load
---

Prepare your services for higher than usual traffic to avoid service outages.

## Monitor service health

### Subscribe for service notifications

To receive notifications about the service health, you can set the
appropriate emails in [Aiven Console](https://console.aiven.io/):

1. Go to your project, and select **Settings** from the sidebar.
1. In the **Settings** page, include relevant email addresses in the
   **Technical Emails** section.

The specified email addresses will receive notifications related to
plan size change, performance, outages and upcoming maintenance.

:::warning
If no technical emails are specified, Aiven sends some high priority
messages to the project admins.

Therefore, if some technical support members are not admins, they might
be missing important notifications for your services.
:::

### Subscribe to platform status updates

The Aiven services are managed by the Aiven platform, therefore is a
good idea to check its status and receive notifications in case of
platform wide incidents. You can follow the RSS feed, subscribe for
email or SMS notifications, or use the Slack integration to get notified
where your team is already.

<!-- vale off -->
You can check the status of the the Aiven platform and subscribe to
updates on incidents directly from
[status.Aiven.io](https://status.aiven.io/).
<!-- vale on -->

## Monitor the services

Monitoring helps you prepare for high load, see
[Monitoring services](/docs/platform/howto/list-monitoring).

## Modify the service plan

If you forecast a load that can't be handled by the current service
plan, you can decide either to
[scale up your service plan](/docs/platform/howto/scale-services), or [request a custom plan](/docs/platform/howto/custom-plans)
if none of the available plans satisfies your requirements.

## Define the backups schedule

To minimize the impact of the higher load during the backup process, it is
recommended to schedule backups outside of peak traffic hours.

To configure the daily backup time in  **Aiven for PostgreSQL®** and **Aiven for MySQL®** services:

1. Access the `Aiven Console <https://console.aiven.io/>`, select your project and
   choose your service.
1. In the service page, select **Service settings** from the sidebar, and scroll down
   to the **Advanced configuration** section.
1. Click **Configure**.
1. In the **Advanced configuration** dialog, configure the values for these variables:

   - `backup_hour`: The hour of the day when the backup starts.
   - `backup_minute`: The minute of the hour to begin the backup.

:::tip
If you intend to make a plan upgrade, we recommend you do it immediately
after a full backup. This reduces the amount of incremental
changes that need to be applied on top of the base backup and therefore
speeds up the upgrade itself.
:::

## Define the maintenance schedule

Similar to backups, it is important to make sure your
[maintenance windows](/docs/platform/concepts/maintenance-window) are configured correctly.

:::tip
Plan maintenance updates outside of your peak traffic hours and days.
Optional updates will not be automatically installed unless you apply
them yourself or a mandatory update is created.
:::

## Run load test on service forks

To test the impact of high traffic on a production service,
[fork the service to test](/docs/platform/concepts/service-forking) and run your load
test on the fork.

## Perform service specific optimizations

Optimizing a service allows it to perform better under stress therefore
avoiding the need of an upgrade. The more optimized a service is for
your usage, the better you can weather spikes in traffic.

## Related pages

<!-- vale off -->
- [Apache Kafka® and Apache Kafka® Connect best practices](/docs/products/kafka/howto/best-practices)
- [PostgreSQL® best practices](/docs/products/postgresql/howto/optimize-pg-slow-queries)
<!-- vale on -->
