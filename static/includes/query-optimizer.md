import ConsoleLabel from "@site/src/components/ConsoleIcons"

Use Aiven's AI-powered SQL query optimizer to get optimization recommendations for your SQL queries.

If you're running an {props.service} service, you can also use Aiven's
automatically generated suggestions for slow queries.
In the Aiven Console, go to your service and click <ConsoleLabel name="aiinsights"/>.

To optimize a query:

1. Click **Tools** > **SQL query optimizer**.
1. Click **Optimize a query**.
1. Select {props.service} as the database type.
1. Enter your query and click **Next**.
1. Optional: To improve the suggestions, submit the schema structure and statistics:
   1. Copy the query in **Schema structure and statistics** and execute it in your database.
   1. Paste the query output in **Query output**.
1. Click **Optimize**.
