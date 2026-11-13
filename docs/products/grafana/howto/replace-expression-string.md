---
title: Replace strings in Grafana® dashboard metric expressions
sidebar_label: Replace strings
---

import RelatedPages from "@site/src/components/RelatedPages";

Sometimes, it is useful to replace all occurrences of a string in Grafana metric expressions.
Do it with the `aiven-string-replacer-for-grafana` tool available on
[GitHub](https://github.com/aiven/aiven-string-replacer-for-grafana).

The approach described will work with your own Grafana cluster or with
an Aiven for Grafana cluster.

:::note
Aiven tested this tool with Grafana 11 and 12. Run it with `-dry` first to preview the changes before you save them.
:::

## Prerequisites

Building the tool requires a Go environment. Follow the [Go installation
instructions](https://go.dev/dl/).

To build the tool from its [source
repository](https://github.com/aiven/aiven-string-replacer-for-grafana),
run the following at the terminal prompt:

```bash
go install github.com/aiven/aiven-string-replacer-for-grafana
```

## Values you will need

|        Variable         |                  Description                  |
|-------------------------|-----------------------------------------------|
| `GRAFANA_TOKEN`         | The service account token for Grafana         |
| `GRAFANA_DASHBOARD_URL` | The URL for the Grafana dashboard             |
| `GRAFANA_DASHBOARD_UID` | The UID that identifies the Grafana dashboard |
| `OLD_STRING`            | The old string to replace                     |
| `NEW_STRING`            | The new string to use instead                 |

### Get a Grafana service account token

The tool needs a Grafana service account token with permissions to edit
dashboards. Grafana API keys are deprecated and replaced by service account tokens.

To get your token (`GRAFANA_TOKEN`):

1. In the Grafana UI, go to **Administration** > **Users and access** >
   **Service accounts**.
1. If you already have a service account with the **Editor** or **Admin** role, open it.
   Otherwise, click **Add service account**, enter a name, set the role to **Editor**,
   and click **Create**.
1. On the service account page, click **Add service account token**.
1. Optional: Enter a token name and set an expiration date.
1. Click **Generate token**, and save the token. Grafana shows it only once.

### To get the Grafana dashboard URL and UID

To get the dashboard URL and UID (`GRAFANA_DASHBOARD_URL` and
`GRAFANA_DASHBOARD_UID`):

-   Go to the dashboard on which where to change the metric expression
    strings.
-   Save the dashboard URL (`GRAFANA_DASHBOARD_URL`).
-   Select the **Dashboard settings** icon, then select **JSON Model**.
    Save the dashboard *UID* from the *JSON Model* page
    (`GRAFANA_DASHBOARD_UID`).

## Perform the replacement

Use a command like the following to perform the replacement, changing
the placeholder variable names to the values you collected above:

```bash
aiven-string-replacer-for-grafana \
    -apikey GRAFANA_TOKEN \
    -url GRAFANA_DASHBOARD_URL \
    -from OLD_STRING \
    -to NEW_STRING \
    -uid GRAFANA_DASHBOARD_UID
```

## Example: changing `elasticsearch_` to `opensearch_`

For instance, use the following command to change all metric expressions
that start with `elasticsearch_` to instead start with `opensearch_`:

```bash
aiven-string-replacer-for-grafana \
    -apikey GRAFANA_TOKEN \
    -url YOUR_DASHBOARD_URL \
    -from elasticsearch_ \
    -to opensearch_ \
    -uid YOUR_DASHBOARD_UID
```

The change will be visible in the *Query* panel:

-   Before running the command, metrics start with `elasticsearch_`:

    ![A screenshot of the Grafana Dashboard query showing metrics with prefix](/images/content/products/grafana/query-with-elasticsearch-prefix.png)

-   After running the command, metrics start with `opensearch_`:

    ![A screenshot of the Grafana Dashboard query showing metrics with prefix](/images/content/products/grafana/query-with-opensearch-prefix.png)

## Use the version history to revert

If necessary, the *Dashboard changelog* page can be used to revert a
change to a specific version.

-   Go to the dashboard that you modified.
-   Select the **Dashboard settings** icon, then select **Versions**.
-   This will show your Dashboard changelog, and you can use this to
    revert to an earlier version of the dashboard.

![A screenshot of the Grafana Dashboard version changelog after conversion](/images/content/products/grafana/grafana-version-changelog.png)

<RelatedPages/>

- [Plugins for Aiven for Grafana®](/docs/products/grafana/reference/plugins)
- [Upgrade the Aiven for Grafana® service version](/docs/products/grafana/howto/grafana-version-upgrade)
- [Get started with Aiven for Grafana®](/docs/products/grafana/get-started)
