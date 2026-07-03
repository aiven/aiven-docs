Prepare your services for higher than usual traffic to avoid service outages by
doing the following:

- **Subscribe to service notifications:** To receive notifications about service health
  and warnings when resources are low, you can
  [set service and project contacts](https://aiven.io/docs/platform/howto/technical-emails).
  You can also view the status of the Aiven Platform and get updates on incidents on the
  [status page](https://status.aiven.io/).
  Follow the RSS feed, subscribe to email or SMS notifications,
  or use the Slack integration to get notifications about incidents.

- **Monitor your services:**
  [Monitor the health of your services](/docs/platform/howto/list-monitoring)
  using metrics, logs, alerts, and dashboards.

- **Scale your services:** If you forecast a load that can't be handled by the service,
  you can scale up your service.

- **Set the backup schedule:** To minimize the impact of the higher load during the
  backup process, schedule backups
  outside of peak traffic hours.

- **Set the maintenance window:** Schedule maintenance updates outside
  of your peak traffic hours.

- **Run load tests on service forks:** To test the impact of high traffic on a production
  service, fork the service and run your load test on the fork.

Additionally, optimizing a service allows it to perform better under stress therefore
avoiding the need of an upgrade. The more optimized a service is for
your usage, the better you can weather spikes in traffic.
