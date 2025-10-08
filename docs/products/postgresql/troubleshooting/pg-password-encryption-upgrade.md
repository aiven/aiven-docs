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

- **No action is needed** if:

  - In your organizations, there's **no** PGBouncer connection pools tied to specific
    database users.
  - In your organizations, database users are managed by Aiven.
  - In your organizations, there are **no** services with additional database users
    created.
  - You're **not** experiencing authentication issues.

- **Your action is required** if:

  - In your organizations, there are PGBouncer connection pools tied to specific database
    users.
  - In your organizations, there are database users **not** managed by Aiven.
  - In your organizations, there are services with additional database users created.
  - You're experiencing authentication issues.

If your action is required, review the
[`scram-sha-256` compatibility guidelines](/docs/products/postgresql/troubleshooting/pg-password-encryption-upgrade#scram-sha-256-compatibility-guidelines),
and follow up, depending on your configuration requirements.

## scram-sha-256 compatibility guidelines

### Update service's `user_config`

Update the password encryption value in your service's `user_config`:

```json
{
  "pg": {
    "password_encryption": "scram-sha-256"
  }
}
```

This maintains the MD5 compatibility. You can still
[re-hash the password](/docs/products/postgresql/troubleshooting/pg-password-encryption-upgrade#re-hash-database-user-password)
later.
New managed users' password will be hashed and authenticated using `scram-sha-256`.

### Re-hash database user password

Re-hash the existing passwords supported by MD5 to use the new encryption using the
following SQL statement:

```sql
ALTER ROLE ROLE_NAME PASSWORD 'new_password';
```

**Example Python code to list all database users and upgrade them to `scram-sha-256`**

```txt
# Use avn-client to fetch the avnadmin service user connection details
# Provide a script that can be run using uv to pack all dependencies
```

### Update PGBouncer configuration

When connection pools are configured with specific user names, an attempt to connect using
another role fails with a `permission denied` error. This is due to the challenge-response
flow initiated by the PostgreSQL client.

## Troubleshoot connection issues

If you experience authentication failures:

1. **Check client library support**: Ensure your PostgreSQL client supports `scram-sha-256`.
1. **Verify PGBouncer configuration**: Check `auth_type` and `auth_file` settings.
1. **Review connection logs**: Look for authentication method mismatches.
