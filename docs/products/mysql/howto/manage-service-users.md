---
title: Manage Aiven for MySQL® service users
sidebar_label: Service users
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import UsersConcepts from "@site/static/includes/service-users-concepts.md";
import AddUser from "@site/static/includes/service-users-instructions.md";
import RelatedPages from "@site/src/components/RelatedPages";

Create and manage service users in your Aiven for MySQL® service to control access to
its databases and tables.

<UsersConcepts/>

## Add a service user

<Tabs groupId="add-user">
<TabItem value="console" label="Aiven Console" default>

<AddUser sectionName="connect"/>

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Run the
[avn service user-create](/docs/tools/cli/service/user#avn-service-user-create) command:

```bash
avn service user-create SERVICE_NAME --username USERNAME
```

Replace the following:

- `SERVICE_NAME`: the name of your Aiven for MySQL service.
- `USERNAME`: the name of the service user to create.

</TabItem>
<TabItem value="api" label="Aiven API">

Use the
[ServiceUserCreate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUserCreate)
endpoint:

```bash
curl --request POST                                                          \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME/user \
  --header 'Authorization: Bearer YOUR_BEARER_TOKEN'                         \
  --header 'content-type: application/json'                                  \
  --data '{"username": "USERNAME"}'
```

Replace the placeholders with your project name, service name, bearer token, and the
username to create.

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the
[`aiven_mysql_user` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/mysql_user)
to create and manage service users.

</TabItem>
</Tabs>

<RelatedPages/>

- [Create a database](/docs/products/mysql/howto/create-database)
- [Connect to your service](/docs/products/mysql/howto/list-code-samples)
