---
title: Connect Aiven for Apache Kafka® with Quix
---

Connect your Aiven for Apache Kafka® service with Quix to consume the data and process it in real-time, and produce it back to Kafka via Quix Cloud.

[Quix](https://quix.io?utm_source=aiven) is a complete platform for developing,
deploying, and monitoring stream processing pipelines. You use the Quix Streams
Python library to develop modular stream processing applications, and deploy
them to containers managed in Quix with a single click. You can develop and
manage applications on the command line or manage them in Quix Cloud and
visualize them as a end-to-end pipeline.

import NewEnv from "@site/static/images/content/products/kafka/1_quix_new_env_menu.png";
import BrokerOption from "@site/static/images/content/products/kafka/2_quix-aiven-broker-option.png";
import BrokerSettings from "@site/static/images/content/products/kafka/3_quix-aiven-broker-settings.png";
import Template from "@site/static/images/content/products/kafka/4_helloquix-template.png";
import Pipeline from "@site/static/images/content/products/kafka/5_helloquix-pipeline.png";

## Prerequisites

To connect Aiven for Apache Kafka® and Quix:

- A running Aiven for Apache Kafka® service. See [Getting started with Aiven for Apache
  Kafka](/docs/products/kafka/get-started) for more information.
- A CA certificate file for your Kafka instance. See [Use SASL authentication with Aiven
  for Apache Kafka®](/docs/products/kafka/howto/kafka-sasl-auth).
- An account with Quix. If you don't yet have an account, you can [sign up for a free
  trial](https://portal.platform.quix.io/self-sign-up).

## Connect Aiven for Apache Kafka® to Quix

To configure and connect Aiven for Apache Kafka® with Klaw:

1. Log in to the **Quix Portal**.

1. Open an existing **Project** or create a project. For more details, see the **Create a
   test pipeline section** below.

1. Create an environment.
   - If you're editing an existing project, open the project settings and click **+ New environment**.

     <img src={NewEnv} className="image" width="50%" alt="New environment"/>

   - Follow the setup wizard until you get to the broker settings.

1. When you get to the broker settings, select **Aiven** as your broken provider.

   <img src={BrokerOption} className="image" width="50%" alt="Broker settings"/>

1. Configure the required settings:

   <img src={BrokerSettings} className="image" width="50%" alt="Broker setup"/>

   - **Service URI**: Enter the Service URI for your Apache Kafka service. Find the
     service URI in the Connection information page of your service in Aiven Console
   - **Cluster Size**: This number is used to limit the replication factor of the
     topics. You'll find it in the Services overview section of your Aiven account
   - **User name**: Make sure that SASL is enabled in the Aiven Advanced Configuration
     section and copy the user name into this field.
   - **Password**: Likewise, copy the password from the  Aiven Advanced Configuration
     section.
   - **SASL Mechanism**: Use the same SASL mechanism as defined in the Aiven Advanced
     Configuration section.
   - **CA Certificate**: Upload the CA file that you downloaded from the Aiven console.

## Create a test pipeline

To help you get started, the Quix platform includes several pipeline templates that you
can deploy in a few clicks.

To test your Aiven for Apache Kafka® connection, you can use the [_Hello Quix_
template](https://quix.io/templates/hello-quix), which is a three-step pipeline:

<img src={Template} className="image" alt="Screenshot of a pipeline"/>

1. Click [**Clone this project**](https://portal.platform.quix.io/signup?projectName=Hello%20Quix&httpsUrl=https://github.com/quixio/template-hello-quix&branchName=tutorial).
1. On the **Import Project** screen, click **Quix advanced configuration**  to ensure
   you get the option to configure own broker settings.
1. Follow the project creation wizard and configure your Aiven for Apache Kafka® connection
  details when prompted.
1. Click **Sync your pipeline**.

## Test the Setup

In the Quix portal, wait for the services to deploy and their status to become **Running**.

<img src={Pipeline} className="image" alt="Screenshot of a pipeline"/>

Ensure the `_csv-data_` and `_counted-names_` required topics appear in both Quix
and Aiven. In Aiven, topics that originate from Quix have the Quix workspace
and project name as a prefix, such as `_quixdemo-helloquix-csv-data_`.

## Related pages

- [Quix documentation](https://quix.io/docs/get-started/welcome)
- [Quix guide to creating projects](https://quix.io/blog/how-to-create-a-project-from-a-template#cloning-a-project-template-into-github)
- [Quix Streams Python library](https://github.com/quixio/quix-streams)
