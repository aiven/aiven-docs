---
title: Enable logical replication on Amazon RDS PostgreSQL®
---

If you have not enabled logical replication on RDS already, the
following instructions shows how to set the `rds.logical_replication`
parameter to `1` (true) in the parameter group.

1.  Create a parameter group for your RDS database.

    ![RDS PostgreSQL parameter group](/images/content/products/postgresql/migrate-rds-pg-parameter-group.png)

2.  Set the `rds.logical_replication` parameter to `1` (true) in the
    parameter group

    ![RDS PostgreSQL parameter value](/images/content/products/postgresql/migrate-rds-pg-parameter-value.png)

3.  Modify Database options to use the new DB parameter group: `RDS` >
    `Databases` > `Modify`

    ![RDS PostgreSQL parameter modify](/images/content/products/postgresql/migrate-rds-pg-parameter-modify.png)

Apply immediately or a reboot is required to reflect the configuration change into `wal_level`.
