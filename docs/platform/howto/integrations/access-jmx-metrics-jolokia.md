---
title: Access JMX metrics via Jolokia
---

[Jolokia](https://jolokia.org/) is one of the external metrics integration supported on the Aiven platform besides [Datadog metrics](/docs/integrations/datadog/datadog-metrics) and [Prometheus metrics](/docs/platform/howto/integrations/prometheus-metrics).

:::note
Only Aiven for Apache Kafka® has support for Jolokia integration.
:::

## Jolokia endpoint configuration

To enable Jolokia integration for Aiven services, create a Jolokia endpoint configuration:

1.  Log in to the [Aiven console](https://console.aiven.io/) , and from
    the **Services** page, select **Integration endpoints** on the left
    sidebar.

1.  In the **Integrations** page, select **Jolokia**, and select
    **Add new endpoint**.

1.  Enter an **Endpoint name** for the new Jolokia endpoint and select
    **Create**. The system will automatically generate a username and
    password for authentication. Usually, you can reuse the same
    Jolokia endpoint configuration for all services within a project.

:::note
You can
[create a service endpoint using the Aiven CLI](/docs/tools/cli/service/integration#avn_service_integration_endpoint_create) as well.
:::

## Enabling Jolokia integration

To enable Jolokia integration for a specific service, follow these
steps:

1. Access the `Aiven Console <https://console.aiven.io/>`_ and click the service
   the Jolokia integration should be enabled for.
1. On the **Overview** page of your service, click **Integrations** in the sidebar.
1. On the **Integrations** page, in **Endpoint integrations**, click **Jolokia**.
1. Choose the Jolokia endpoint you created and click **Enable**. The system configures
   the Jolokia endpoint on all service nodes, providing access to the metrics.

The Aiven Jolokia integration enables HTTP POST requests to retrieve
values from service-specific metrics. It also supports bulk requests for
batch collection of metrics. For more detailed information on the
Jolokia protocol, refer to [Jolokia
documentation](https://jolokia.org/reference/html/manual/jolokia_protocol.html).

Several metrics are specific to a Kafka® broker. Therefore, you may need
to query each node to obtain a comprehensive overview. The node IP is
represented by a single DNS name. You can use the `host` command on Unix
systems or the `nslookup` command on Windows systems to retrieve the
list of IP addresses associated with a DNS name.

```shell
host kafka-67bd7c5-myproject.aivencloud.com
kafka-67bd7c5-myproject.aivencloud.com has address 35.228.218.115
kafka-67bd7c5-myproject.aivencloud.com has address 35.228.234.106
kafka-67bd7c5-myproject.aivencloud.com has address 35.228.157.197
```

## Example cURL requests

Before executing the cURL
request,[download the CA certificate](/docs/platform/concepts/tls-ssl-certificates#download-ca-certificates) specific
to your project. The CA certificate file is
identical for all endpoints and services within the same project.
Performing a cURL request to read a specific metric:

Ensure that you use port 6733, the default port for Jolokia. Replace
`joljkr2l:PWD` with the username and password obtained during the
Jolokia endpoint setup step. See the endpoint details on the
**Integration endpoints** page.

```shell
curl --cacert ca.pem \
    -X POST \
    https://joljkr2l:PWD@HOST_IP:6733/jolokia/  \
    -d \
'{"type":"read","mbean":"kafka.server:type=ReplicaManager,name=PartitionCount"}'
```

Jolokia supports searching beans using `search` command:

```shell
curl --cacert ca.pem \
    -X POST \
    https://joljkr2l:PWD@HOST_IP:6733/jolokia/  \
    -d \
'{"type":"search","mbean":"kafka.server:*"}'
```
