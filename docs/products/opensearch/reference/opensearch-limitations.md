---
title: Aiven for OpenSearch® limits and limitations
sidebar_label: Limits and limitations
---

import RelatedPages from "@site/src/components/RelatedPages";

Aiven for OpenSearch® has configuration, API, and feature restrictions that differ from upstream OpenSearch to maintain service stability and security.

## Configuration restrictions

You cannot directly modify OpenSearch configuration files or settings in Aiven for
OpenSearch. These restrictions apply:

| Restriction | Description |
|-------------|-------------|
| **No shell access** | You cannot access or modify YAML configuration files |
| **JVM tuning** | You cannot modify JVM options directly |
| **Advanced configuration** | Only supported options are available through **Advanced configuration** in the Aiven Console |
| **Configuration files** | You cannot access or modify static configuration files |

To request support for additional configuration options,
[contact Aiven support](http://support.aiven.io/).

## Connection requirements

All connections to Aiven for OpenSearch must meet these requirements:

| Requirement | Details |
|-------------|---------|
| **Protocol** | HTTPS only |
| **Authentication** | User authentication always required |
| **Authorization** | Managed using Aiven ACLs or OpenSearch Security (when security management is enabled) |

## API restrictions

Aiven restricts access to certain OpenSearch APIs to maintain service stability and
security. Attempting to access blocked endpoints returns a
`403 Forbidden - Request forbidden by administrative rules` error.

| API endpoint | Allowed methods | Restrictions |
|--------------|-----------------|--------------|
| `/_cluster/*` | `GET` only | Limited to specific read-only endpoints; all other `/_cluster/` endpoints are blocked |
| `/_tasks` | `GET` only | View tasks only; you cannot cancel tasks using `/_tasks/_cancel` |
| `/_nodes` | `GET` only | Read-only access to node information |
| `/_snapshot` | None | Automated by Aiven; no direct access |
| `/_cat/repositories` | None | No access allowed |

### Allowed cluster endpoints

You can access these read-only cluster endpoints:

- `/_cluster/allocation/explain/`
- `/_cluster/health/`
- `/_cluster/pending_tasks/`
- `/_cluster/stats/`
- `/_cluster/state/`
- `/_cluster/settings/`

## Snapshot management

| Feature | Behavior |
|---------|----------|
| **Automated snapshots** | Daily or hourly snapshots managed automatically by Aiven |
| **API access** | You cannot access the snapshot API directly without configuring custom repositories |
| **OpenSearch API** | <ul><li>[Restore from snapshot](/docs/products/opensearch/howto/manage-snapshots#restore-from-snapshots) has [security-related restrictions](https://docs.opensearch.org/latest/tuning-your-cluster/availability-and-recovery/snapshots/snapshot-restore/#security-considerations).</li><li>[Create a snapshot](/docs/products/opensearch/howto/manage-snapshots#create-a-snapshot) and [delete a snapshot](/docs/products/opensearch/howto/manage-snapshots#delete-a-snapshot) are not supported for snapshots in Aiven-managed repositories (prefixed with `aiven_repo`).</li></ul> |
| **Dashboard limitations** | Dashboard suggestions for snapshot management that require configuration file changes cannot be completed |

See
[snapshot management limitations](/docs/products/opensearch/howto/manage-snapshots#limitations)
for details.

## Plugin restrictions

You can only use pre-approved plugins with Aiven for OpenSearch.

| Aspect | Details |
|--------|---------|
| **Supported plugins** | Only a defined set of plugins is available |
| **Custom plugins** | You cannot install custom plugins |
| **Plugin list** | See [available plugins](/docs/products/opensearch/reference/plugins) |

To request support for additional plugins, [contact Aiven support](http://support.aiven.io/).

## Access control models

Aiven for OpenSearch supports two access control models with different limitations:

- [Security management disabled (default)](/docs/products/opensearch/reference/opensearch-limitations#security-management-disabled)
- [Security management enabled](/docs/products/opensearch/reference/opensearch-limitations#security-management-enabled)

:::note
To turn on security management, see
[Enable security management](/docs/products/opensearch/howto/enable-opensearch-security).
:::

### Security management disabled

| Feature | Behavior |
|---------|----------|
| **User management** | You manage users through Aiven API, CLI, Console, or Terraform |
| **Access control** | You configure access using Aiven ACLs |
| **Permission scope** | Index-level access only |
| **User equality** | All service users have equal privileges within their ACL permissions |
| **Dashboard tenancy** | Private dashboards per user plus global dashboards |
| **Password changes** | You change passwords using the Aiven Console. Password changes you make in the OpenSearch dashboard are overwritten during service configuration updates, which occur daily |

### Security management enabled

| Feature | Behavior |
|---------|----------|
| **User management** | You manage users directly in OpenSearch using OpenSearch Security API or dashboard |
| **Access control** | You configure access using OpenSearch Security roles and permissions |
| **Permission scope** | Document-level access control available |
| **Dashboard tenancy** | Full multi-tenancy support |
| **External authentication** | SAML and OpenID Connect supported |
| **Password changes** | You manage passwords directly in OpenSearch. Password changes in the Aiven Console have no effect |
| **Aiven API support** | Limited; displays state at enablement time only |

:::warning
You cannot reverse security management after you enable it. Once enabled, you manage all
users and permissions directly in OpenSearch.
:::

:::note
The security plugin is always present in Aiven for OpenSearch. Security management is an
additional feature you can enable to gain full control over security configurations.
:::

## ACL limitations

When [security management](/docs/products/opensearch/concepts/os-security) is disabled,
Aiven ACLs control access to your service.

| Limitation | Description |
|------------|-------------|
| **Index patterns only** | You can only define ACL rules using index patterns; rules for top-level APIs like `_bulk` or `_search` are not enforced |
| **Index-level access** | You can control access to indices but not to OpenSearch Dashboards |
| **Predefined action groups** | ACL access levels are fixed; you cannot create custom permission sets |

:::note
When you
[enable security management](/docs/products/opensearch/howto/enable-opensearch-security),
Aiven ACLs no longer apply. You manage all permissions using OpenSearch Security roles.
:::

### ACL access levels

Use these access levels when configuring ACLs:

| ACL level | Permissions granted |
|-----------|-------------------|
| `admin` | Full access to matching indices |
| `read` | Read-only access to matching indices |
| `write` | Write access to matching indices |
| `readwrite` | Read and write access to matching indices |

## Reserved users

Aiven creates and manages these special users. You cannot delete or modify their
permissions.

| Username | Purpose |
|----------|---------|
| `avnadmin` | Default administrator user for your service |
| `metrics_user_datadog` | Metrics collection by Datadog integration |
| `osd_internal_user` | Internal OpenSearch Dashboards operations |
| `replication_user` | Cross-cluster replication |
| `os-sec-admin` | Security management access (created when you enable security management) |

## Reserved roles

When [security management](/docs/products/opensearch/concepts/os-security) is disabled,
you cannot modify the reserved roles. When you
[enable security management](/docs/products/opensearch/howto/enable-opensearch-security),
you can modify the `provider_*` roles but not the `service_security_admin_access` role.

| Role name | Purpose |
|-----------|---------|
| `service_security_admin_access` | Grants access to security management API and dashboard |
| `provider_service_user` | Base permissions for all service users |
| `provider_index_all_access` | Full index access (when ACLs are disabled) |
| `provider_managed_user_role_<username>` | Individual user permissions (when ACLs are enabled) |

## Known issues and limitations

### Security dashboard

| Issue | Description |
|-------|-------------|
| **Get started section** | Most content is not applicable to Aiven for OpenSearch; only the multi-tenancy section applies |
| **Configuration file instructions** | Dashboard help text references configuration file modifications that you cannot perform in managed services |
| **Password changes** | When security management is disabled, you change passwords using the Aiven Console. Password changes you make in the OpenSearch dashboard are overwritten during service configuration updates, which occur daily. When security management is enabled, you change passwords directly in OpenSearch and Aiven Console password changes have no effect |

### Security management

| Issue | Description | Solution |
|-------|-------------|----------|
| **REST API permissions** | You cannot create roles with REST API permissions | Map your users to the `service_security_admin_access` role |
| **Self-lockout** | You can unmap yourself from security admin role | [Contact Aiven support](http://support.aiven.io/) to remap the `os-sec-admin` user |
| **os-sec-admin deletion** | You cannot delete the `os-sec-admin` user | User remains but you can unmap it from admin role |

### Permissions model

| Behavior | Description |
|----------|-------------|
| **Index creation** | Writing to non-existent index requires both write and create permissions |
| **Error messages** | Permission errors specify the missing permission in `error.root_cause` |

## Differences from upstream OpenSearch

| Feature | Upstream OpenSearch | Aiven for OpenSearch |
|---------|---------------------|----------------------|
| **Configuration files** | Direct file access | You manage configuration using Advanced configuration options |
| **Snapshot management** | Full API access | Automated; you cannot access the API directly |
| **Security plugin** | Optional | Always enabled |
| **User management** | Direct configuration | You manage users using Aiven tools or Security API (when security management is enabled) |
| **Cluster settings** | Full API access | Limited to approved settings using [advanced configuration](/docs/products/opensearch/reference/advanced-params) |
| **Plugin installation** | Install any plugin | Only selected [plugins available](/docs/products/opensearch/reference/plugins) |
| **API access** | Full access to all APIs | Restricted access to certain management APIs |
| **JVM tuning** | Direct access to JVM options | Not available |

## Elasticsearch compatibility

Aiven for OpenSearch diverged from Elasticsearch 7 and is not compatible with
Elasticsearch-specific features.

| Aspect | Details |
|--------|---------|
| **Client libraries** | You must use OpenSearch-compatible client libraries |
| **APIs** | Elasticsearch-specific APIs are not supported |
| **Migration** | Verify compatibility when migrating from Elasticsearch |

## Service tiers and quotas

For information about service-specific limits based on your plan, see:

- [Quotas for Business and Premium plans](https://aiven.io/pricing?tab=plan-pricing&product=opensearch)
- [Plans comparison](https://aiven.io/pricing?tab=plan-comparison&product=opensearch)

<RelatedPages/>

- [OpenSearch security](/docs/products/opensearch/concepts/os-security)
- [Enable security management](/docs/products/opensearch/howto/enable-opensearch-security)
- [Access control](/docs/products/opensearch/concepts/access_control)
- [Manage access and access control lists](/docs/products/opensearch/howto/control_access_to_content)
- [Available plugins](/docs/products/opensearch/reference/plugins)
