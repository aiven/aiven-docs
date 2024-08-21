---
title: Telegraf to M3 to Grafana® Example
---

To set up Telegraf to push metrics to Aiven for M3:

1.  Log into [Aiven Console](https://console.aiven.io) and
    [create an Aiven for M3 Service](/docs/platform/howto/create_new_service).
1.  Install and configure Telegraf Agent.
1.  Setup Aiven for Grafana® instance for visualization of telegraph
    metrics.

## Create Aiven for M3 service

If you don't have an existing Aiven account, you can sign up for a free
30-day trial with \$300 credits using the [Aiven
Console](https://console.aiven.io) link.

Within your existing Aiven project, create a M3 service:

1.  Log in to the [Aiven Console](https://console.aiven.io/).
1.  Follow
    [create an Aiven for M3DB®](/docs/platform/howto/create_new_service).

<!-- vale off -->
Open the new M3 service and select the **InfluxDB®** tab in
the **Connection information** section. You will use several values from
this page including the **Service URI, user, and password**. You will
need these values when configuring Telegraf in the next section.
<!-- vale on -->

## Install Telegraf

To simplify this example, we will install the Telegraf agent on a
MacBook to collect the system metrics. Of course, Telegraf can also be
installed on [Windows and
Linux](https://docs.influxdata.com/telegraf/v1.19/introduction/installation/)
machines.

Assuming you have Homebrew installed on a MacBook, run:

```bash
brew update && brew install telegraf
```

## Configure Telegraf and integrate it with M3

Use the Telegraf agent to generate a default configuration file for
editing:

```bash
telegraf config > telegraf.conf
```

Modify the `telegraf.conf` configuration file to change the output
endpoint to that of our M3 instance.

Change the URL under the `outputs.influxdb` section to that of your
Aiven for M3 service. **NOTE:** The URL prefix should
be `https://` and remove the `username:password` from the URI (see
snippet below).

Specify the service username/password and set the database name to
`default` (the database that is automatically created when your service
is provisioned):

```ini
[[outputs.influxdb]]
  urls = ["https://my-M3-service-my-project.aivencloud.com:24947/api/v1/influxdb"]
  database = "default"
  skip_database_creation = true
  username = "avnadmin"
  password = "my_service_password"
```

Finally, start Telegraf using the configuration file and begin sending
system metrics to M3 by running the command below:

```bash
telegraf -config telegraf.conf
```

Wait 10 seconds or so to see if there
are any error messages displayed in the terminal:

```text
MacBook-Pro tmp % telegraf -config telegraf.conf
2021-10-08T01:21:15Z I! Starting Telegraf 1.20.1
2021-10-08T01:21:15Z I! Loaded inputs: cpu disk diskio kernel mem processes swap system
2021-10-08T01:21:15Z I! Loaded aggregators:
2021-10-08T01:21:15Z I! Loaded processors:
2021-10-08T01:21:15Z I! Loaded outputs: influxdb
2021-10-08T01:21:15Z I! Tags enabled: host=MacBook-Pro
2021-10-08T01:21:15Z I! [agent] Config: Interval:10s, Quiet:false, Hostname:"MacBook-Pro", Flush Interval:10s
```

## Create Aiven for Grafana service

1.  In the [Aiven Console](https://console.aiven.io) , and access the
    M3DB service.
1.  In the **Service integrations** section, select **Manage
    integrations**.
1.  On the **Integrations** page, select **Grafana Metrics Dashboard**
    to establish a connection between your M3 instance and a new Grafana
    dashboard service.
1.  In the pop-up modal, select **New service** and select **Continue**.
1.  Fill out the required details and follow similar steps to create the
    service. This will initiate the startup process for your Aiven for
    Grafana service, which will automatically connect to the M3 database
    to display metrics.
1.  On the **Integrations** page on your M3DB service, you will find a
    link to the Grafana dashboard. Select the link to view the new
    Grafana service.
1.  Once service is running, select the Service URI and login with the
    user / password from the connection information.

## Visualizing metrics

In the Grafana dashboard, click the **Explore** tab.

![Grafana Explore](/images/content/products/m3db/telegraf-m3-example/m3_telegraph_11.png)

Select your M3 service as the data source from the drop down menu at the
top of the page. Click the metrics browser, select `cpu_usage_user`, and
then click **Use Query**.

![Grafana Explore for M3](/images/content/products/m3db/telegraf-m3-example/m3_telegraph_12.png)

The chart displayed below represents the CPU of the MacBook.

![Grafana Metrics for M3](/images/content/products/m3db/telegraf-m3-example/m3_telegraph_13.png)

Tear Down At the terminal, press `Ctrl+C` to stop the Telegraf agent.
Then, delete your M3 and Grafana services within the Aiven Console.
