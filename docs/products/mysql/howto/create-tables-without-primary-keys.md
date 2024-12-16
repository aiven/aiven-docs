---
title: Create new tables without primary keys
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

If your Aiven for MySQL® service was created after 2020-06-03, by default it does not allow creating new tables without primary keys.

## Verify if new tables require a primary key

1.  Log in to [Aiven Console](https://console.aiven.io/).

1.  Open your MySQL service and in the sidebar, click <ConsoleLabel name="servicesettings"/>.

1.  Scroll down to the **Advanced configuration** section and find the
    `mysql.sql_require_primary_key` parameter and its status.

    If `mysql.sql_require_primary_key` is enabled, your Aiven for MySQL
    does not allow you to create new tables without primary keys.

    If creating tables without primary keys is prevented and the table
    that you're trying to create is known to be small, you may override
    this setting and create the table anyway.

Read more about the MySQL replication in the
[Replication overview](/docs/products/mysql/concepts/mysql-replication) article.

## Create a table without primary keys

You have two options to create the tables:

-   Setting `mysql.sql_require_primary_key` to `0` for the current
    session, programmatically:

    1. Run:

       ```shell
       SET SESSION sql_require_primary_key = 0;
       ```

    1. Execute the CREATE TABLE or ALTER TABLE statement again in the same session.

-   Disabling the `mysql.sql_require_primary_key` parameter. To disable the
    `mysql.sql_require_primary_key` parameter:

    :::warning
    We recommend this approach when the table is
    created by an external application and using the session variable is
    not an option. To prevent more problematic tables from being
    unexpectedly created in the future, you should enable the setting
    again once you finished creating the tables without primary keys.
    :::

    1.  Log in to [Aiven Console](https://console.aiven.io/).
    1.  Open your MySQL service and in the sidebar, click <ConsoleLabel name="servicesettings"/>.
    1.  Scroll down to the **Advanced configuration** section and select **Configure**.
    1.  Find `mysql.sql_require_primary_key` and disable it and click **Save configuration**.

## Related pages

Learn how to
[create missing primary keys](/docs/products/mysql/howto/create-missing-primary-keys) in your Aiven for MySQL.
