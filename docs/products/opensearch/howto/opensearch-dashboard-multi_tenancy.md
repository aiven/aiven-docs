---
title: Set up OpenSearch® Dashboard multi-tenancy
---

Aiven for OpenSearch® provides support for multi-tenancy through OpenSearch Security Dashboard.
Multi-tenancy in OpenSearch Security
enables multiple users or groups to securely access the same OpenSearch
cluster while maintaining their distinct permissions and data access
levels. With multi-tenancy, each tenant has its own isolated space for
working with indexes, visualizations, dashboards, and other OpenSearch
objects, ensuring tenant-specific data and resources are protected from
unauthorized access.

## Prerequisites

-   Aiven for OpenSearch
-   Administrative access to both the Aiven for OpenSearch service and
    OpenSearch Dashboard

## Optional: Enabling security management

Enabling OpenSearch Security management is optional if you are using the
default tenants (Private and Global) in OpenSearch Dashboard without the
need to restrict access to the Global tenant. However, if you intend to
create custom tenants or require advanced authentication and
authorization features, you must
[enable OpenSearch Security management](/docs/products/opensearch/howto/enable-opensearch-security).

## Configure multi-tenancy in OpenSearch® Dashboard

This section provides information on configuring multi-tenancy in
OpenSearch Dashboard, which involves enabling OpenSearch Security
management for custom tenant, creating custom tenants, assigning roles,
and mapping roles to users.

### Step 1: Create a tenant

A tenant is a logical grouping of users and data, each with its own set
of users, roles, and permissions. OpenSearch users can access two
default tenants: *Global* and *Private*, which are available even
without enabling OpenSearch Security management. All users share the
Global Tenant, and the Private Tenant is exclusively available to a
single user and cannot be shared.

If you have enabled OpenSearch Security management and wish to create a
custom tenant:

1.  Log in to OpenSearch Dashboard with administrative access.
1.  From the left navigation menu, select **Security** and select
    **Tenants**.
1.  Select **Create tenant** to create a tenant.
1.  In the **Create Tenant** screen, enter a name and description for
    your new tenant.
1.  Select **Create** to save your new custom tenant.

### Step 2: Assign tenant to roles

After creating a tenant, assign it to a role. A role is a
collection of permissions for a specific tenant that can be granted to
users. To assign a tenant to a role:

1.  In the OpenSearch dashboard, go to the **Security** section in
    the left-hand navigation menu, then select **Roles**.
1.  Choose whether to create a role or modify an existing one to
    include the tenant.
1.  To create a role:
    -   Select **Create role** and enter a name for your new role.
    -   Select the permissions to grant to this role.
    -   In the **Tenant permissions** section, choose the tenant you
        want to assign to the role from the dropdown menu. Then, select
        the tenant permissions for the role, such as read and/or write
        permissions.
    -   Select **Create** to save your new role with the assigned
        tenant.
1.  To modify an existing role:
    -   Search for the role to edit and select it to view its
        permissions screen.
    -   Select **Edit role** and add the required tenant in the **Tenant
        permissions** section. Additionally, select the tenant
        permissions for the role, such as read and/or write permissions.
    -   Select **Update** to save your changes.

### Step 3: Map roles to users

After assigning tenants to roles and setting the required permissions,
the next step is associating each user with a specific role, granting
them access to the tenant and its resources. The level of access and
control a user has over the tenant's data and resources will be
determined by their assigned role.

To map roles to internal users:

1.  In the OpenSearch dashboard, go to the **Security** section in
    the left-hand navigation menu, then select **Roles**.
1.  Search for the role to assign a user and select it to view
    its details.
1.  Select the **Mapped Users** tab and select **Map users** (or
    **Manage mapping** if users are already mapped).
1.  In the **Users** section, choose the internal user you wish to
    assign to the role from the dropdown list.
1.  Select **Map** to add the selected user to the mapped user list.

:::note
If you have enabled SAML SSO authentication in your Aiven for OpenSearch
service, you can use SAML integration to map users roles.
:::

### Step 4: Manage tenants

To manage tenants in the OpenSearch dashboard, you can follow these
steps:

-   **Access the tenant list**: Go to the Security section in the
    OpenSearch dashboard and select the Tenant option to view the
    available tenants and create new ones.
-   **Switch between tenants**: Besides creating new tenants, you can
    switch between them by selecting the checkbox next to the desired
    tenant and using the **Actions** dropdown to select **Switch the
    selected tenant**.
-   **View and create Index Patterns**: To view and create *Index
    Patterns*, *Saved Objects*, and manage *Advanced settings*, select
    **View Dashboards** or **View Visualisations** for a specific
    tenant.
-   **Edit, delete, or duplicate tenants**: To manage existing tenants,
    select them from the list and use the **Actions** dropdown to edit,
    delete, or duplicate them according to your needs.

## Related pages

-   [OpenSearch Dashboards
    multi-tenancy](https://opensearch.org/docs/2.6/security/multi-tenancy/tenant-index/)
