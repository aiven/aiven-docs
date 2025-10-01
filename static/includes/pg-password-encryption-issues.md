## Password encryption compatibility with PGBouncer

If you have PGBouncer connection pools configured and are experiencing authentication issues, this may be related to password encryption methods.

### Background

Aiven for PostgreSQL now defaults to `scram-sha-256` password encryption for enhanced
security. However, organizations with existing PGBouncer pools may need to take action
to ensure compatibility.

### Who is affected

- Organizations with PGBouncer connection pools
- Services using MD5-hashed passwords that need to maintain compatibility

### Recommended actions

#### Option 1: Update to scram-sha-256 (recommended)

1. **Check PGBouncer compatibility**: Ensure your PGBouncer version supports
   `scram-sha-256` authentication.

1. **Update service configuration**:

   ```sql
   ALTER SYSTEM SET password_encryption = 'scram-sha-256';
   SELECT pg_reload_conf();
   ```

1. **Recreate user passwords**: Existing MD5 passwords need to be reset to use the new
   encryption:

   ```sql
   ALTER ROLE username PASSWORD 'new_password';
   ```

#### Option 2: Maintain MD5 compatibility (temporary)

If immediate migration isn't possible:

1. **Keep MD5 as default** in your service's `user_config`:

   ```json
   {
     "pg": {
       "password_encryption": "md5"
     }
   }
   ```

1. **Plan migration**: MD5 password encryption will be deprecated in future PostgreSQL
   versions.

#### Option 3: Mixed environment

For gradual migration, you can use both methods:

1. Keep service default as `md5`
1. Create new roles with `scram-sha-256`:

   ```sql
   SET password_encryption = 'scram-sha-256';
   CREATE ROLE new_user WITH LOGIN PASSWORD 'secure_password';
   ```

### Troubleshooting connection issues

If you experience authentication failures:

1. **Check client library support**: Ensure your PostgreSQL client supports `scram-sha-256`
1. **Verify PGBouncer configuration**: Check `auth_type` and `auth_file` settings
1. **Review connection logs**: Look for authentication method mismatches

### Need help?

Contact Aiven support if you need assistance with:

- PGBouncer configuration updates
- Client library compatibility
- Migration planning for large deployments
