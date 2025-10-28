:::note[Verify your password encryption method]
If you use PGBouncer connection pooling,
[verify your password encryption method compatibility](/docs/products/postgresql/troubleshooting/pg-password-encryption-upgrade)
to ensure successful connections. You may need to migrate to `SCRAM-SHA-256` to maintain
compatibility as the MD5 password encryption will be deprecated in PostgreSQL 19.
:::
