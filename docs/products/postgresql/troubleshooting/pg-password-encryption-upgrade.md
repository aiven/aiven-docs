---
title: Migrate Aiven for PostgreSQL® passwords from MD5 to SCRAM
sidebar_label: Migrate MD5 to SCRAM
---

import RelatedPages from "@site/src/components/RelatedPages";

Find out which Aiven for PostgreSQL® database users still use the deprecated MD5 password hashing and migrate them to `scram-sha-256`.

MD5 password hashing is deprecated in PostgreSQL and
[will be removed in a future release](https://www.postgresql.org/docs/current/auth-password.html).
`scram-sha-256` is the recommended replacement. It resists offline attacks better and
stops a stored hash from being replayed as a password.

:::note
MD5 still works in all PostgreSQL versions that Aiven currently supports. You can
migrate at your own pace, but complete the migration before MD5 support is removed
upstream.
:::

## How Aiven for PostgreSQL hashes passwords

The `pg.password_encryption`
[service configuration option](/docs/products/postgresql/reference/advanced-params)
sets the algorithm used to hash passwords. It accepts `md5` or `scram-sha-256`.

- New services use `scram-sha-256` by default. Services in accounts that still allow
  legacy pinned PgBouncer pools default to `md5`.
- Changing `pg.password_encryption` applies to passwords that are set after the change.
  Existing database users keep their current hash until their password is set again.
- Aiven's internal system roles always use `scram-sha-256`, whatever this option is set
  to. This does not cover `avnadmin` or any other service user you connect with, so
  check and migrate those yourself.

## Check which users still use MD5

Every Aiven for PostgreSQL service user reports its current hashing algorithm in the
`password_encryption_type` field. The value is `scram-sha-256`, `md5`, or `unknown`.
`unknown` means the stored hash is missing or in an unrecognized format, for example
when the user has no password.

The default [`avn service user-list`](/docs/tools/cli/service/user#avn-service-user-list)
output doesn't include this field, so request it explicitly:

```bash
avn service user-list --project PROJECT_NAME SERVICE_NAME \
  --format '{username} {password_encryption_type}'
```

Example output:

```text
avnadmin scram-sha-256
pool_usr md5
app_user md5
```

Any user reported as `md5` still needs migrating.

## Migrate to scram-sha-256

### Check your PgBouncer connection pools first

A pool created with a specific username is pinned to that user: PgBouncer connects to
PostgreSQL as the pool user regardless of the user your application authenticates with.
Because the PostgreSQL client starts a challenge-response exchange that PgBouncer only
proxies, connecting as another role through a pinned pool fails with a
`permission denied` error once `scram-sha-256` is enforced.

While your account still allows pinned pools, setting `pg.password_encryption` to
`scram-sha-256` is rejected with a `403` response and the error
`Setting password_encryption to scram-sha-256 is not allowed for this project.`
Move your pools off the pinned behavior first, then
[contact Aiven support](mailto:support@aiven.io) to have the restriction lifted for your
account.

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

   - **Pools with usernames** (`my_pool` with `pool_usr`) can hit authentication
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

   - [Re-hash the pool user's password](/docs/products/postgresql/troubleshooting/pg-password-encryption-upgrade#re-hash-existing-user-passwords).

   - Update your application to use a different compatible pool without specific username
     requirements:

     ```txt
     postgresql://any_user:password@service-host:port/general_pool
     ```

### Set the password encryption option

Set the password encryption value in your service configuration:

```json
{
  "pg": {
    "password_encryption": "scram-sha-256"
  }
}
```

New passwords are hashed with `scram-sha-256` from this point on. Existing MD5 hashes
keep working, so your current connections are not interrupted.

:::important
This step alone does not migrate anyone. Users that already have an MD5 hash keep it
until you
[re-hash their passwords](/docs/products/postgresql/troubleshooting/pg-password-encryption-upgrade#re-hash-existing-user-passwords).
:::

### Re-hash existing user passwords

Set the password again for every user still reported as `md5` so that PostgreSQL stores
a `scram-sha-256` hash:

```sql
ALTER ROLE ROLE_NAME PASSWORD 'ROLE_PASSWORD';
```

You can reuse the same password. The hash is recalculated with the algorithm that
`pg.password_encryption` is currently set to, so run it only after you set the option
to `scram-sha-256`. On PostgreSQL 18 and later, `ALTER ROLE` returns a deprecation
`WARNING` if the password is still stored as an MD5 hash, which tells you the option is
not in effect yet.

Re-run the [check for MD5 users](/docs/products/postgresql/troubleshooting/pg-password-encryption-upgrade#check-which-users-still-use-md5)
to confirm that no users are left on MD5.

## Troubleshoot connection issues

If you experience authentication failures after migrating:

- **Check client library support**: Make sure your PostgreSQL client and driver support
  `scram-sha-256`.
- **Review connection logs**: Look for authentication method mismatches and
  `permission denied` errors, which point to a pinned connection pool.

<RelatedPages/>

- [PgBouncer connection pooling](/docs/products/postgresql/concepts/pg-connection-pooling)
- [Troubleshoot connection pooling issues](/docs/products/postgresql/troubleshooting/troubleshooting-connection-pooling)
- [Manage PostgreSQL service users](/docs/products/postgresql/howto/manage-service-users)
- [Advanced parameters](/docs/products/postgresql/reference/advanced-params)
