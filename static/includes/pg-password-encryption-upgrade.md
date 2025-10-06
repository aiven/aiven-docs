## Password encryption migration to SCRAM and compatibility with PGBouncer

Aiven for PostgreSQL now defaults to `scram-sha-256` password encryption for enhanced
security. MD5 password encryption will be deprecated in future PostgreSQL versions.

Database users managed by Aiven can be upgraded from MD5 with a single button.

Organizations with existing PGBouncer pools may need to take action to ensure compatibility.
If you have PGBouncer connection pools configured and are experiencing authentication issues,
this may be related to password encryption methods.

Organization with database users that aren't managed by Aiven can follow the guidance below to re-hash their passwords.

### Who is affected

- Organizations with PGBouncer connection pools that are tied to specific database users
- Services that have created additional database users 

### Recommended actions

#### Update your user config to enforce scram-sha-256 for your service

Update the password encryption value in your service's `user_config`:

```json
{
  "pg": {
    "password_encryption": "scram-sha-256"
  }
}
```

This maintains MD5 compatibility: you may re-hash the password (shown below) at a later point.
New managed users' password will be hashed and authenticated using scram-sha-256.

#### Re-hash database user password to upgrade to scram-sha-256

**Re-hash user passwords**: Existing passwords supported by MD5 need to be re-hashed to use the new encryption.

This can be done using the following SQL statement:

```sql
ALTER ROLE <rolename> PASSWORD 'new_password';
```

Here is example Python code to list all database users and upgrade them to SCRAM:


```python
# Use avn-client to fetch the avnadmin service user connection details
# Then provide a script that can be run using uv to pack all dependencies
```

### Update your pgBouncer connection pool configuration

When connection pools are configured with specific user names, attempting to connect using another role will fail with a permission denied error.

This is due to the challenge-response flow initiated by the PG client, that ensures 

### Troubleshooting connection issues

If you experience authentication failures:

1. **Check client library support**: Ensure your PostgreSQL client supports `scram-sha-256`
1. **Verify PGBouncer pool configuration**: Check 
1. **Review connection logs**: Look for authentication method mismatches

### Need help?

Contact Aiven support if you need assistance with:

- PGBouncer configuration updates
- Client library compatibility
- Migration planning for large deployments
