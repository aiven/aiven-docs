import ConsoleLabel from "@site/src/components/ConsoleIcons"
import FAQ from "@site/static/includes/faq-ai.md"

Use Aiven's AI-powered **SQL query optimizer** to get query optimization recommendations for an ad-hoc {props.service} query.

:::important
If you are running an {props.service} service, Aiven automatically suggests
optimizations for slow queries from the <ConsoleLabel name="aiinsights"/> menu entry.
See [AI database optimizer for {props.service}]({props.aiInsightsPath}).
:::

To optimize a query:

1. Click **Tools** > **SQL query optimizer**.
1. Click **Optimize a query**.
1. Select {props.service} as the database type and version.
1. Paste your query and click **Next**.
1. Optional:
   1. Provide your table structure and statistics by running the query provided in
      the UI.
   1. Paste it in the **Query output** field.
1. Click **Optimize**.

The optimization report shows the optimized query and potential optimal indexes.
To learn more about the recommendations, click **Optimization details**.

<details>
  <summary>Frequently asked questions</summary>
  <FAQ/>
</details>
