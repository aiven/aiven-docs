
Backups are stored in the object storage of the cloud region where the service is created,
for example, S3 for AWS or Google Cloud Storage for Google Cloud.

:::note
If you change a
service's cloud provider or an availability zone, its backups are not migrated
from their original location.
:::

Whenever a service is powered on from a powered-off state, the latest available
backup is automatically restored.

Backups are automatically deleted
<strong>{Variables.backup_policy} days</strong> after the service's deletion date.


