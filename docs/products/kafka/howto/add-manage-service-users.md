---
title: Manage service users in Aiven for Apache Kafka®
sidebar_label: Manage service users
---
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Create and manage service users in Aiven for Apache Kafka to enable secure access and interaction with your service.

:::note
Users with `Admin` permission can create topics with any name because
the `CreateTopics` permission applies at the cluster level.

Other permissions, such as `Alter` and `Delete`, apply only to topics that match
the specified pattern.
:::

## Add a user

<Tabs groupId="add-user">
<TabItem value="console" label="Aiven Console" default>

To add service users using the Aiven Console, see
[Create a service user](/docs/platform/howto/create_new_service_user).

After creating a user, download their access key and certificate from the **Users** page.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Run the following command to create a service user:

```bash
avn service user-create <service-name> --username <user-name>
```

Parameters:

- `<service-name>`: Name of the Aiven service.
- `<user-name>`: Username for the new service user.

</TabItem>
<TabItem value="api" label="Aiven API">

Use the [ServiceUserCreate](https://api.aiven.io/doc/#operation/ServiceUserCreate) API endpoint to create a service user:

```bash
curl -X POST https://api.aiven.io/v1/project/<project-name>/service/<service-name>/user \
  -H "Authorization: Bearer <api-token>" \
  -H "Content-Type: application/json" \
  -d '{"username": "<user-name>"}'
```

Parameters:

- `<project-name>`: Name of the Aiven project.
- `<service-name>`: Name of the Aiven service.
- `<user-name>`: Username for the new service user.
- `<api-token>`: Aiven API
  [token](https://aiven.io/docs/platform/howto/create_authentication_token)
  for authentication.

</TabItem>
</Tabs>

## Manage users

<Tabs groupId="manage-users">
<TabItem value="console" label="Aiven Console" default>

1. Open your Aiven for Apache Kafka service in the
   [Aiven Console](https://console.aiven.io).
1. Click <ConsoleLabel name="serviceusers" /> in the sidebar to view the list of users.
1. To view the password, click <ConsoleLabel name="show password" /> in the password
   field for the respective user.
1. Click <ConsoleLabel name="actions" /> in the respective user row and choose the
   desired operation:
   - Click <ConsoleLabel name="reset" /> to reset the credentials.
   - Click <ConsoleLabel name="delete user" /> to delete the user.

</TabItem>

<TabItem value="cli" label="Aiven CLI">

- View users:

  ```bash
  avn service user-list <service-name>
  ```

  Replace `<service-name>` with the name of your Aiven service.

- Reset user credentials:

  ```bash
  avn service user-password-reset <service-name> --username <user-name>
  ```

  Parameters:
  - `<service-name>`: Name of the Aiven service.
  - `<user-name>`: Username of the service user.

- Delete a user:

  ```bash
  avn service user-delete <service-name> --username <user-name>
  ```

  Parameters:
  - `<service-name>`: Name of the Aiven service.
  - `<user-name>`: Username of the service user.

</TabItem>

<TabItem value="api" label="Aiven API">

- View users:

  ```bash
  curl -X GET https://api.aiven.io/v1/project/<project-name>/service/<service-name>/user \
    -H "Authorization: Bearer <api-token>"
  ```

  Parameters:
  - `<project-name>`: Name of the Aiven project.
  - `<service-name>`: Name of the Aiven service.
  - `<api-token>`: Aiven API token for authentication.

- Reset user credentials:

  ```bash
  curl -X POST https://api.aiven.io/v1/project/<project-name>/service/<service-name>/user/<user-name>/reset-credentials \
    -H "Authorization: Bearer <api-token>"
  ```

  Parameters:
  - `<project-name>`: Name of the Aiven project.
  - `<service-name>`: Name of the Aiven service.
  - `<user-name>`: Username of the service user.
  - `<api-token>`: Aiven API token for authentication.

- Delete a user:

  ```bash
  curl -X DELETE https://api.aiven.io/v1/project/<project-name>/service/<service-name>/user/<user-name> \
    -H "Authorization: Bearer <api-token>"
  ```

  Parameters:
  - `<project-name>`: Name of the Aiven project.
  - `<service-name>`: Name of the Aiven service.
  - `<user-name>`: Username of the service user.
  - `<api-token>`: Aiven API token for authentication.

</TabItem>
</Tabs>

## Related pages

- [Access Control Lists in Aiven for Apache Kafka®](/docs/products/kafka/concepts/acl)
- [Manage service users in Aiven for Apache Kafka®](/docs/products/kafka/howto/add-manage-service-users)
- [Manage access control lists in Aiven for Apache Kafka®](/docs/products/kafka/howto/manage-acls)
