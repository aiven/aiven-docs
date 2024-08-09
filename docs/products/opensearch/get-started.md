---
title: Get started with Aiven for OpenSearch®
sidebar_label: Get started
keywords: [quick start]
---

import CreateService from "@site/static/includes/create-service-console.md"

To start using Aiven for OpenSearch®, the first step is to create a service. You can do this on the [Aiven Console](https://console.aiven.io/) or with the [Aiven CLI](https://github.com/aiven/aiven-client).

## Create an Aiven for OpenSearch® service

<CreateService serviceType="OpenSearch®"/>

## Access OpenSearch Dashboards

When you create an Aiven for OpenSearch service, you will automatically
get access to OpenSearch Dashboards. This enables you to visualize data from your
OpenSearch service.

To access OpenSearch Dashboards:

1. On the **Overview** page of your Aiven for OpenSearch service, click
   **OpenSearch Dashboards**.
1. Copy or click the Service URI to open OpenSearch Dashboards in
   your browser.
1. Enter the username and password from the connection information
   screen when prompted.
1. Click **Sign In** to view the OpenSearch Dashboards.

After logging in, you can explore and interact with your data, as well
as add sample data and utilize OpenSearch API features.

For more information, see
[OpenSearch Dashboards](/docs/products/opensearch/dashboards) section.

## Connect to OpenSearch

To start working with your data in OpenSearch, connect to your service.
A good starting point is to learn how to
[connect with cURL](/docs/products/opensearch/howto/opensearch-with-curl). See the necessary connection details in the
service overview page.

If you're new to OpenSearch and looking for inspiration, see our
[sample dataset](/docs/products/opensearch/howto/sample-dataset),
which provides a great starting point for exploring the capabilities of
the platform.
