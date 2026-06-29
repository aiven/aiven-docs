---
title: Manage Aiven for PostgreSQL® service users
sidebar_label: Service users
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import UsersConcepts from "@site/static/includes/service-users-concepts.md";
import AddUser from "@site/static/includes/service-users-instructions.md";
import UsersLimitation from "@site/static/includes/service-users-limitation.md";
import RelatedPages from "@site/src/components/RelatedPages";

Create and manage service users in your Aiven for PostgreSQL® service to control access
to its databases and tables.

<UsersConcepts/>

## Limitations

<UsersLimitation/>

## Add a service user

<Tabs groupId="add-user">
<TabItem value="console" label="Aiven Console" default>

<AddUser/>

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Run the
[avn service user-create](/docs/tools/cli/service/user#avn-service-user-create) command:

```bash
avn service user-create SERVICE_NAME --username USERNAME
```

Replace the following:

- `SERVICE_NAME`: the name of your Aiven for PostgreSQL service.
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
[`aiven_pg_user` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/pg_user)
to create and manage service users.

</TabItem>
</Tabs>

<RelatedPages/>

- [Create a database](/docs/products/postgresql/howto/create-database)
- [Connect to your service](/docs/products/postgresql/howto/list-code-samples)
