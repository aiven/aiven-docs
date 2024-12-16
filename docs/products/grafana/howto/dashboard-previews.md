---
title: Dashboard preview for Aiven for Grafana®
---
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"
import ConsoleIcon from "@site/src/components/non-swizzled/ConsoleIcons"

Grafana's dashboard previews provide a visual overview of your dashboards, displaying each configured dashboard as a graphical thumbnail.

Dashboard previews are an optional beta feature available in Grafana 9.0+. By default,
this feature is disabled on Aiven for Grafana® services.

## Enable dashboard previews

1. In the [Aiven Console](https://console.aiven.io/), select your project and choose
   your Aiven for Grafana® service.

1. Click <ConsoleLabel name="Service settings"/> in the sidebar.

1. Scroll down to **Advanced configuration** and click **Configure**.

1. In the **Advanced configuration** window, click
   <ConsoleIcon name="Add config options"/>.

1. Find and set `dashboard_previews_enabled` to **Enabled**.

1. Click **Save configuration**. The status next to `dashboard_previews_enabled` changes
   to `synced`.

1. Click <ConsoleIcon name="overview"/>. From the **Connection information**, copy
   the **Service URI** into your browser to open the Grafana login page.

1. Enter the username and password from the **Connection information**, and click
   **Log in**.

1. Click **Dashboards** in the left menu, and select the grid layout
   to view dashboard previews. Previews are displayed as thumbnails and can be
   sorted alphabetically.

    ![Dashboard previews on Grafana](/images/content/products/grafana/dashboard-previews-on-grafana.png)

## Limitations

- Dashboard previews are not available for Hobbyist and Startup-1 plans.
- Before downgrading your service plan to Hobbyist or Startup-1, first disable dashboard previews.

## Related pages

For more information on Dashboard previews, see [Grafana
documentation](https://grafana.com/docs/grafana/latest/dashboards/).
