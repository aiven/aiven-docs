---
title: End of support for Aiven for Caching
sidebar_label: End of support
---

Aiven for Caching will reach end of availability on **December 31, 2024**, and end of life on **April 30, 2025**.
Learn about key dates, the transition process, and how to migrate to Aiven for Valkey to
maintain Redis compatibility.

## Timeline for end of support

- **End of availability (EOA)**: December 31, 2024. You can no longer create
  Aiven for Caching services after this date. Existing services will continue to operate
  until the end of life (EOL) date.

- **End of life (EOL)**: April 30, 2025.
  - All active Aiven for Caching services will be automatically upgraded to
    **Aiven for Valkey**.
  - Any powered-off Aiven for Caching services will be permanently deleted.

## Transition to Aiven for Valkey

[Aiven for Valkey™](/docs/products/valkey) is fully compatible with Redis and is the
recommended alternative to Aiven for Caching. You can upgrade your Aiven for Caching
service to Aiven for Valkey using the Aiven Console.

### What to expect

- **Full compatibility**: Aiven for Valkey is fully compatible with Aiven for Caching,
  allowing your existing applications and workflows to operate without modification.
- **Preserved configurations**: Essential settings including DNS, URLs, ACLs, and user
  configurations remains unchanged, ensuring minimal impact on your infrastructure
  and workflows.

For detailed instructions, see
[Upgrade from Aiven for Caching to Aiven for Valkey™](/docs/products/caching/howto/upgrade-aiven-for-caching-to-valkey).

:::note
If the upgrade option is unavailable for your Aiven for Caching service, run the
[maintenance update](docs/platform/concepts/maintenance-window) on your service
before the EOL date.
:::

## Next steps

To avoid service interruptions, upgrade to Aiven for Valkey before April 30, 2025. For
questions or assistance with the upgrade, contact
the [Aiven support team](mailto:support@aiven.io) or your
[sales team](mailto:sales@aiven.io).
