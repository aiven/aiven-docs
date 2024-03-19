---
title: Integrate Aiven for Apache Flink® with external PostgreSQL
---

Integrating Aiven for Apache Flink® with external PostgreSQL allows users to extend their real-time data streaming and processing capabilities by connecting to an external PostgreSQL database as a source or sink.

## Prerequisites

- Aiven for Apache Flink service
- An external PostgreSQL database running and accessible. You will need the database's
  hostname, port, database name, user, and password.
- For SSL-encrypted databases, the SSL certificate in PEM format is required for a secure connection.

## Configure integration using CLI​

To configure integration using Aiven CLI, follow these steps:

### Create an Aiven for Apache Flink service

To use an existing Aiven for Apache Flink service and retrieve its details,
execute the following command:

```bash
avn service create -t flink -p <project-name> --cloud <cloud-name> <flink-service-name>
```

Alternatively, if can create a new Aiven for Apache Flink service,
you can use the following command:

```bash
avn service create -t flink -p <project-name> --cloud <cloud-name> <flink-service-name>
```

Parameters:

- `-t flink`: The type of service to create, which is Aiven for Apache
  Flink.
- `-p <project-name>`: The name of the Aiven project where the service
  should be created.
- `cloud <cloud-name>`: The name of the cloud provider on which the
  service should be created.
- `<flink-service-name>`: The name of the new Aiven for Apache Flink
  service to be created. This name must be unique within the specified
  project.

### Gather external PostgreSQL details

Ensure you have all the necessary details of your external PostgreSQL database,
including any SSL certificates, if applicable.

### Create an external PostgreSQL endpoint

Create an integration endpoint for your external PostgreSQL database using the
[avn service integration-endpoint-create](/docs/tools/cli/service/integration#avn_service_integration_endpoint_create)
command with the required parameters.

```bash
avn service integration-endpoint-create --project <project-name> \
    --endpoint-name <external-pg-endpoint-name> \
    --endpoint-type external_postgresql \
    --user-config-json '{"host":"<postgres_host>", \
    "port":"<postgres_port>", "db_name":"<postgres_db>", \
    "user":"<postgres_user>", "password":"<postgres_password>", \
    "ssl":"<ssl_mode>", "sslrootcert":"<path_to_ssl_cert>"}'
```

Parameters:

- `--project <project-name>`: The name of your Aiven project.
- `--endpoint-name <external-pg-endpoint-name>`: The name for the new endpoint.
- `--endpoint-type external_postgresql`: The type of endpoint to create.
- `--user-config-json`: Configuration details of your PostgreSQL database in JSON format.

### Verify integration with service

After creating the integration between Aiven for Apache Flink and your external
PostgreSQL database, verify that the
integration has been created successfully, and create applications that
use the integration.

```bash
  avn service integration-list --project <project-name> <flink-service-name>
```

Parameters:
- `--project <project-name>`: The name of your Aiven project.
- `<flink-service-name>`: The name of your Aiven for Apache Flink service.


### Create Aiven for Apache Flink applications

To create an Aiven for Apache Flink application, retrieve the `integration_id` for
your Aiven for Apache Flink service from the
[integration list](docs/tools/cli/service/integration#avn_service_integration_list)
and use it to connect your application to an external PostgreSQL database as
either a source or a sink.

For information on how to create Aiven for Apache Flink applications, see
[avn service flink create-application](/docs/tools/cli/service/flink#avn%20service%20flink%20create-application).

## Configure integration using Aiven Console

Integrate your Aiven for Apache Flink service with an external PostgreSQL database
via the Aiven Console by following these steps:

1. Log in to [Aiven Console](https://console.aiven.io/) and choose your project.
1. [Create a new Aiven for Apache Flink](/docs/platform/howto/create_new_service)
   service or select an existing service.
1. Configure an external PostgreSQL integration endpoint:

   1. Go to the **Projects > Integration endpoints**
   1. Click **External PostgreSQL** from the list, then click **Add new endpoint**.
   1. Enter the following details:

      - **Endpoint name**: Name your endpoint.
      - **Host**: PostgreSQL server's hostname or IP.
      - **Port**: PostgreSQL server's port.
      - **Database name**: Name of the database to connect.
      - **Username**: Username for database access.
      - **Password**: Password for the username.
      - For SSL-encrypted databases:

        - **SSL Mode**: Choose `require`, `verify-ca`, or `verify-full`.
        - **SSL Root Certificate**: Upload the SSL root certificate.
   1. Click **Create**.
1. Create Integration:
   1. Return to the **Project** page and open your Aiven for Apache Flink service
     from the list of services.
   1. For first-time integration, click **Get Started** on the **Overview page**.
     Otherwise, add a new integration in the **Data Flow** section by clicking **Plus (+)**.
   1. On the **Data Service integrations screen**, go to the
     **Create external integration endpoint** tab.

   1. Select the checkbox next to **PostgreSQL**, and select the external PostgreSQL
     endpoint from the list to integrate.
   1. Click **Integrate**.

After completing these steps, the integration is set up,
enabling you to start creating [Aiven for Apache Flink applications](/docs/products/flink/howto/create-flink-applications)
that use the external PostgreSQL database as either a source or a sink.
