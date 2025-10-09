---
title: Verify the Aiven for PostgreSQL® password encryption method
sidebar_label: Verify password encryption
---

Verify that your Aiven for PostgreSQL® connections use `scram-sha-256` password encryption.

Aiven for PostgreSQL defaults to `scram-sha-256` password encryption for enhanced security,
moving away from the MD5 method. This new default might need enforcing in specific
configurations or setups.
[Check if your action is needed](/docs/products/postgresql/troubleshooting/pg-password-encryption-upgrade#check-if-your-action-is-needed)
and, if so, update your configuration to enable `scram-sha-256`.

:::important
PostgreSQL 19 will no longer support the MD5 password encryption, making the
`scram-sha-256` password encryption mandatory.
:::

## Check if your action is needed

- **No action is needed** if in your Aiven for PostgreSQL services:

  - There are **no** PGBouncer connection pools tied to specific database users.
  - All database users are managed by Aiven.

- **Your action is required** if in your Aiven for PostgreSQL services:

  - PGBouncer connection pools are tied to specific database users.
  - There are database users **not** managed by Aiven.

If your action is required, review the
[`scram-sha-256` compatibility guidelines](/docs/products/postgresql/troubleshooting/pg-password-encryption-upgrade#scram-sha-256-compatibility-guidelines),
and follow up, depending on your configuration requirements.

## scram-sha-256 compatibility guidelines

### Check applications using PGBouncer connection pools

When connection pools are configured with specific user names, attempting to connect using
another role after `scram-sha-256` is enforced will fail with a `permission denied` error.
This is due to the challenge-response flow initiated by the PostgreSQL client.

For example, for a connection pool with the following configuration:

```json {9}
{
  "pgbouncer": {
    "databases": {
      "mypool": {
        "host": "service-project.j.aivencloud.com",
        "port": 11752,
        "dbname": "defaultdb",
        "pool_size": 10,
        "username": "pool_user"
      }
    }
  }
}
```

You must ensure applications are connecting to the `mypool` pool with the `pool_user` role.
This is required to complete `scram-sha-256`'s challenge-response authentication flow from the client, through PGBouncer, to PostgreSQL.

If you need user-specific connection pools, consider migrating to `scram-sha-256` and
updating all relevant user passwords accordingly.

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
