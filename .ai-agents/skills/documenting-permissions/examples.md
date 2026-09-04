# Permission documentation examples

## Example 1: Simple Aiven permissions only

**Scenario:** Documentation for a console-based task requiring a single role.

```jsx
import RequirementsPanel from "@site/src/components/RequirementsPanel";

<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`role:project:admin`'],
    },
  ]}
/>

## Rename a project

1. In the Aiven Console, click **Projects** > select your project.
2. Click **Settings** > **Project settings**.
3. In the **Project name** field, enter the new name.
4. Click **Save**.
```

## Example 2: Multiple Aiven permissions (OR logic)

**Scenario:** Task can be completed by either project admin or organization admin.

```jsx
<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`role:project:admin`', '`role:organization:admin`'],
    },
  ]}
/>

## Invite a team member

1. In the Aiven Console, click your organization name > **Team**.
2. Click **Invite**.
3. Enter the email address.
4. Click **Invite**.
```

## Example 3: Permissions + availability constraint

**Scenario:** Feature is limited to specific regions or service plans.

```jsx
<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`role:project:admin`'],
    },
    {
      label: 'Availability',
      values: ['Available in EU regions only'],
    },
  ]}
/>

## Enable HIPAA compliance mode

1. In the Aiven Console, navigate to your project.
2. Click **Settings** > **Security**.
...
```

## Example 4: Permissions + service plans

**Scenario:** Feature only available to paying customers, not free tier.

```jsx
<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`role:project:admin`', '`role:organization:admin`'],
    },
    {
      label: 'Service plans',
      values: ['Professional', 'Enterprise'],
    },
  ]}
/>

## Set up single sign-on (SSO)

1. In the Aiven Console, click your organization name > **Authentication**.
2. Under **Single Sign-On**, click **Set up**.
...
```

## Example 5: Custom field

**Scenario:** Procedure requires both Aiven roles and GitHub permissions. Use a custom field
for the GitHub permissions.

```jsx
<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`role:organization:admin`'],
    },
    {
      label: 'GitHub permissions',
      values: [
        <>
          Organization owner on{' '}
          <a href="https://docs.github.com/en/organizations/managing-peoples-access-to-your-organization-with-roles/roles-in-an-organization#organization-owners">
            GitHub
          </a>
        </>
      ],
    },
  ]}
/>

## Deploy an application from GitHub

1. In the Aiven Console, click **Projects** > select your project.
2. Click **Runtime** > **Deploy application**.
...
```

## Example 6: Cloud provider constraint

**Scenario:** Feature available only on specific cloud providers.

```jsx
<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`role:project:admin`'],
    },
    {
      label: 'Cloud',
      values: ['AWS', 'Google Cloud'],
    },
  ]}
/>

## Enable privatelink connectivity

1. In the Aiven Console, click **Services** > select your service.
2. Click **Networking** > **Private Access**.
...
```
