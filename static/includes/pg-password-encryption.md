:::note[Check your password hashing method]
If you use PgBouncer connection pooling, a pool pinned to a specific username can break
when `scram-sha-256` is enforced. Before you switch,
[check your pools and migrate your passwords from MD5 to SCRAM](/docs/products/postgresql/troubleshooting/pg-password-encryption-upgrade).
:::
