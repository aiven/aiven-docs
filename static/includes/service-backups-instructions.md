import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

To edit the backup schedule for your service:

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In your service, click <ConsoleLabel name="backups"/>.
1. Click <ConsoleLabel name="actions"/> > **Configure backup settings**.
1. Click **Add configuration options**.
1. Add `backup_hour` and `backup_minute`, and set their values.
1. Click **Save configuration**.

</TabItem>
<TabItem value="api" label="Aiven API">

Call the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
endpoint, and the following properties to the `user_config` object:

```bash {7-8}
curl --request PUT                                                        \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
  --header 'Authorization: Bearer YOUR_BEARER_TOKEN'                      \
  --header 'content-type: application/json'                               \
  --data '{
      "user_config": {
          "backup_hour": BACKUP_HOUR,
          "backup_minute": BACKUP_MINUTE
      }
  }'
```

Where:

- `SERVICE_NAME`: the name of your service.
- `PROJECT_NAME`: the name of your project.
- `BACKUP_HOUR`: the hour when the service backup starts.
  Accepted values are integers between `0` and `23`.
- `BACKUP_MINUTE`: the minute when the service backup starts.
  Accepted values are integers between `0` and `59`.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Run the [avn service update](/docs/tools/cli/service-cli#avn-cli-service-update) command,
and the following properties to the `user_config` object:

```bash {4-5}
avn service update SERVICE_NAME \
  --project PROJECT_NAME        \
  --user-config '{
      "backup_hour": BACKUP_HOUR,
      "backup_minute": BACKUP_MINUTE
  }'
```

Where:

- `SERVICE_NAME`: the name of your service.
- `PROJECT_NAME`: the name of your project.
- `BACKUP_HOUR`: the hour when the service backup starts.
  Accepted values are integers between `0` and `23`.
- `BACKUP_MINUTE`: the minute when the service backup starts.
  Accepted values are integers between `0` and `59`.

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the `backup_hour` and `backup_minute` attributes in
[your service resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs)
to set the start time for backups.

</TabItem>
</Tabs>

If a backup was recently made, it can take another backup cycle before the new backup
time takes effect.
