---
title: Perform pre-migration check
---

Learn how to find potential errors before starting your database migration process. This can be done by using either the [Aiven CLI](https://github.com/aiven/aiven-client) or the [Aiven REST API](https://api.aiven.io/doc/#section/Introduction).

:::note[Error example]

```text
{
    "migration": {
        "error": "Migration process failed",
        "method": "",
        "seconds_behind_master": null,
        "source_active": true,
        "status": "done"
    },
    "migration_detail": []
}
-----Response End-----
STATUS METHOD ERROR
====== ====== ========================
done Migration process failed
```

:::

## Aiven CLI

**Step 1: Create a task to perform the migration check**

You can create the task of migration, for example, from a MySQL DB to an
Aiven service (`project`: `MY_PROJECT_NAME`, `service`: `mysql`):

```shell
avn service task-create --operation migration_check --source-service-uri mysql://user:password@host:port/databasename --project MY_PROJECT_NAME mysql
```

You can see the information about the task including the ID.

```shell
TASK_TYPE              SUCCESS  TASK_ID
=====================  =======  ====================================
mysql_migration_check  null     e2df7736-66c5-4696-b6c9-d33a0fc4cbed
```

:::tip
List the options via the -h menu, for example, to
ignore certain databases for the check. Note that filter
databases are supported by MySQL only at the moment.
:::

**Step 2: Retrieve your task's status**

You can check the status of your task by running:

```bash
avn service task-get --task-id e2df7736-66c5-4696-b6c9-d33a0fc4cbed --project MY_PROJECT_NAME mysql
```

It lists whether the operation succeeds and more information about the migration.

```text
TASK_TYPE              SUCCESS  TASK_ID                               RESULT
=====================  =======  ====================================  ====================================================================================
mysql_migration_check  true     e2df7736-66c5-4696-b6c9-d33a0fc4cbed  All pre-checks passed successfully, preferred migration method will be [Replication]
```

## Aiven REST API

The same checks can be performed via the REST API. Read more:

-   [Create a task for service](https://api.aiven.io/doc/#operation/ServiceTaskCreate)
-   [Get task result](https://api.aiven.io/doc/#operation/ServiceTaskGet)
