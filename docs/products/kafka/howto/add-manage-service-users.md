---
title: Manage service users in Aiven for Apache Kafka®
sidebar_label: Manage service users
---
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RelatedPages from "@site/src/components/RelatedPages";

Create and manage service users in Aiven for Apache Kafka® to enable secure access and interaction with your service.

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
avn service user-create SERVICE_NAME --username USER_NAME
```

Replace the following:

- `SERVICE_NAME`: the name of the Aiven service
- `USER_NAME`: the username for the new service user

</TabItem>
<TabItem value="api" label="Aiven API">

Use the [ServiceUserCreate](https://api.aiven.io/doc/#operation/ServiceUserCreate)
API endpoint to create a service user:

```bash
curl -X POST https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME/user \
  -H "Authorization: Bearer API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"username": "USER_NAME"}'
```

Replace the following:

- `PROJECT_NAME`: the name of the Aiven project
- `SERVICE_NAME`: the name of the Aiven service
- `USER_NAME`: the username for the new service user
- `API_TOKEN`: Aiven API
  [token](https://aiven.io/docs/platform/howto/create_authentication_token)
  for authentication

</TabItem>
</Tabs>

## Manage users

<Tabs groupId="manage-users">
<TabItem value="console" label="Aiven Console" default>

1. Open your Aiven for Apache Kafka service in the
   [Aiven Console](https://console.aiven.io).
1. Click <ConsoleLabel name="Access & Control" /> > **Users** in the sidebar to
   view the list of users.
1. To view the password, click <ConsoleLabel name="show password" /> in the password
   field for the respective user.
1. Click <ConsoleLabel name="actions" /> in the user row and choose an action:
   - Click <ConsoleLabel name="reset" /> to reset the credentials.
   - Click <ConsoleLabel name="delete user" /> to delete the user.

</TabItem>

<TabItem value="cli" label="Aiven CLI">

- View users:

  ```bash
  avn service user-list SERVICE_NAME
  ```

  Replace `SERVICE_NAME` with the name of your Aiven service.

- Reset user credentials:

  ```bash
  avn service user-password-reset SERVICE_NAME --username USER_NAME
  ```

  Replace the following:

  - `SERVICE_NAME`: the name of the Aiven service
  - `USER_NAME`: the username of the service user

- Delete a user:

  ```bash
  avn service user-delete SERVICE_NAME --username USER_NAME
  ```

  Replace the following:

  - `SERVICE_NAME`: the name of the Aiven service
  - `USER_NAME`: the username of the service user

</TabItem>

<TabItem value="api" label="Aiven API">

- View user details:

  Use the username-specific endpoint to get details for a service user.

  ```bash
  curl -X GET https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME/user/USER_NAME \
    -H "Authorization: Bearer API_TOKEN"
  ```

  Replace the following:

  - `PROJECT_NAME`: the name of the Aiven project
  - `SERVICE_NAME`: the name of the Aiven service
  - `USER_NAME`: the username of the service user
  - `API_TOKEN`: Aiven API token for authentication

- Reset user credentials:

  ```bash
  curl -X POST https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME/user/USER_NAME/reset-credentials \
    -H "Authorization: Bearer API_TOKEN"
  ```

  Replace the following:

  - `PROJECT_NAME`: the name of the Aiven project
  - `SERVICE_NAME`: the name of the Aiven service
  - `USER_NAME`: the username of the service user
  - `API_TOKEN`: Aiven API token for authentication

- Delete a user:

  ```bash
  curl -X DELETE https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME/user/USER_NAME \
    -H "Authorization: Bearer API_TOKEN"
  ```

  Replace the following:

  - `PROJECT_NAME`: the name of the Aiven project
  - `SERVICE_NAME`: the name of the Aiven service
  - `USER_NAME`: the username of the service user
  - `API_TOKEN`: Aiven API token for authentication

</TabItem>
</Tabs>

<RelatedPages/>

- [Access Control Lists in Aiven for Apache Kafka®](/docs/products/kafka/concepts/acl)
- [Manage access control lists in Aiven for Apache Kafka®](/docs/products/kafka/howto/manage-acls)
