import ConsoleLabel from "@site/src/components/ConsoleIcons";

To shift the backup schedule to a new time:

1. Log in to the [Aiven Console](https://console.aiven.io/) and go to your service's page.
1. Click <ConsoleLabel name="backups"/> in the sidebar.
1. Click <ConsoleLabel name="actions"/> > **Configure backup settings**.
1. Set `backup_hour` and `backup_minute`, and click **Save configuration**.

   If a backup was recently made, it can take another backup cycle before the new backup
   time takes effect.
