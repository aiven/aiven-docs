## Migration limitations

Aiven for Dragonfly does not support automatic migration of users, access control lists
(ACLs), or service configurations from Redis or Valkey.

If you customized your Aiven for Caching or Aiven for Valkey service with specific
settings, manually apply these configurations to Aiven for Dragonfly. Automatic transfer
of custom configurations is unavailable due to differences in service configurations.
