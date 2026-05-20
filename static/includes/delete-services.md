import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Delete a service

<Tabs groupId="sync">
<TabItem value="Console" label="Console" default>

1.  In your project, click <ConsoleLabel name="services"/>.
1.  Open the service to delete, and click <ConsoleLabel name="actions"/> >
    **Delete service**.

</TabItem>
<TabItem value="CLI" label="CLI">

To delete a service, run:

   ```bash
   avn service terminate SERVICE_NAME
   ```

</TabItem>
</Tabs>
