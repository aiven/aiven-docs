---
title: Verify the Aiven for PostgreSQL® password encryption method
sidebar_label: Verify password encryption
---

Verify that your Aiven for PostgreSQL® connections use `scram-sha-256` password encryption.

Aiven for PostgreSQL defaults to `scram-sha-256` password encryption for enhanced security,
replacing the MD5 method. In some configurations, you might need to
enforce this setting manually.
[Check when configuration changes are required](/docs/products/postgresql/troubleshooting/pg-password-encryption-upgrade#check-when-to-update-your-configuration)
and, if so, update your configuration to enable `scram-sha-256`.

:::important
PostgreSQL 19 will no longer support the MD5 password encryption, making the
`scram-sha-256` password encryption mandatory.
:::

## Check when to update your configuration

- **No changes needed** if your Aiven for PostgreSQL services have:

  - **No** PgBouncer connection pools tied to specific database users.
  - All database users managed by Aiven.

- **Configuration updates required** if your Aiven for PostgreSQL services have:

  - PgBouncer connection pools tied to specific database users.
  - Database users **not** managed by Aiven.

When configuration updates are required, review the
[`scram-sha-256` compatibility guidelines](/docs/products/postgresql/troubleshooting/pg-password-encryption-upgrade#ensure-scram-sha-256-compatibility)
and follow the appropriate setup steps based on your configuration.

## Ensure scram-sha-256 compatibility

### Ensure app connections to PgBouncer connection pools

When a connection pool is configured with a specific username, an attempt to connect using
another role after `scram-sha-256` is enforced fails with a `permission denied` error.

This is due to the challenge-response authentication flow initiated by the PostgreSQL
client and proxied by PgBouncer to PostgreSQL.

1. Check which connection pools have specific usernames by running the
   [`avn service connection-pool-list`](/docs/tools/cli/service/connection-pool) command:

   ```bash
   avn service connection-pool-list --project PROJECT_NAME SERVICE_NAME
   ```

   Example output:

   ```text
   POOL_NAME        DATABASE      USERNAME  POOL_MODE    POOL_SIZE
   ===============  ============  ========  ===========  =========
   my_pool          defaultdb     pool_usr  session      20
   general_pool     defaultdb               transaction  15
   ```

1. Review the `USERNAME` column to identify potential issues:

   - **Pools with usernames** (`my_pool` with `pool_usr`) may experience authentication
     issues with `scram-sha-256`.
   - **Pools without usernames** (`general_pool`) are compatible with `scram-sha-256`.

1. For pools with specific usernames, check your application's connection string
   `postgresql://pool_usr:password@service-host:port/my_pool` to verify the username
   matches exactly:

   - Connection string username: `pool_usr`
   - Pool configuration username: `pool_usr`

1. If the usernames don't match, connect your application to a pool with a matching
   username or migrate the pool using one of the following methods:

   - Remove the username from the pool:

     ```bash
     avn service connection-pool-update \
       --project PROJECT_NAME SERVICE_NAME my_pool \
       --username=""
     ```

   - [Re-hash the pool user's password](/docs/products/postgresql/troubleshooting/pg-password-encryption-upgrade#re-hash-database-user-passwords).

   - Update your application to use a different compatible pool without specific username
     requirements:

     ```txt
     postgresql://any_user:password@service-host:port/general_pool
     ```

### Update service's `user_config`

Update the password encryption value in your service's `user_config`:

```json
{
  "pg": {
    "password_encryption": "scram-sha-256"
  }
}
```

This enables hashing and authenticating new managed users' passwords using `scram-sha-256`.

:::important
While this maintains the MD5 compatibility,
[re-hash the passwords](/docs/products/postgresql/troubleshooting/pg-password-encryption-upgrade#re-hash-database-user-passwords)
at your earlier convenience.
:::

### Re-hash database user passwords

Re-hash existing passwords supported by MD5 to use the `scram-sha-256` encryption:

```sql
ALTER ROLE ROLE_NAME PASSWORD 'ROLE_PASSWORD';
```

## Troubleshoot connection issues

If you experience authentication failures:

- **Check client library support**: Ensure your PostgreSQL client supports `scram-sha-256`.
- **Review connection logs**: Look for authentication method mismatches.
