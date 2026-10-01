---
name: documenting-permissions
description: Document required permissions and prerequisites in procedural documentation using the RequirementsPanel component. Use when writing, updating, or reviewing procedural docs to ensure permissions are clearly listed in a standardized format.
---

# Documenting permissions in procedural documentation

This skill ensures that required permissions are consistently documented in procedural docs using a standardized format. Permissions should appear at the top of procedural documentation before step-by-step instructions begin. On pages where there are multiple sets of instructions with different permissions requirements, permissions should appear after the heading but before the instructions.

## When to use this skill

Use this skill when:

- Writing new procedural documentation
- Adding procedures to existing docs
- Updating existing procedures that don't have the `RequirementsPanel` component
- Reviewing procedural documentation for completeness

## Why standardize permissions

Readers need to know upfront whether they have the permissions to complete a procedure. A standardized format:

- Makes permissions **immediately visible** at doc start
- Makes permissions easier to quickly scan
- Prevents users from wasting time on steps they can't complete
- Creates a consistent mental model across all Aiven docs

## Quick checklist

Before finalizing procedural docs, verify:

- [ ] **Permissions block exists** if procedure requires any roles or permissions
- [ ] **Permissions block is first element** after frontmatter and intro sentence; alternatively, after the heading but before the instructions of EACH procedure
- [ ] **Aiven permissions use API names** in backticks: `` `role:organization:admin` ``
- [ ] **No extraneous "Prerequisites" section** duplicating permissions

## Implementation: RequirementsPanel component

Use the `RequirementsPanel` component to render permissions and related constraints.

### Import

```jsx
import RequirementsPanel from '@site/src/components/RequirementsPanel';
```

### Required permissions only

```jsx
<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`role:project:admin`', '`role:organization:admin`'],
    },
  ]}
/>
```

### Permissions

- Use only API names for roles and permissions in backticks.
- Label is `Permissions`.

```jsx
<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`role:project:admin`'],
    },
  ]}
/>
```

### Other preset fields

In addition to permissions, other preset fields that have a standard format are:

- Feature availability: Used for limited and early availability. Use the label `Availability`.
- Cloud: Used for cases where a feature is limited to a cloud provider or region. Use the label `Cloud`.
- Service plans: Used for cases where a feature is limited to specific service plans. Use the label `Service plans`.

Preset labels automatically map to the correct icon and normalized text.

```jsx
<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`role:project:admin`'],
    },
    {
      label: 'Availability',
      values: ['EU regions only'],
    },
    {
      label: 'Cloud',
      values: ['AWS', 'GCP'],
    },
    {
      label: 'Service plans',
      values: ['Startup', 'Professional'],
    },
  ]}
/>
```

### Custom fields

Where needed, you can add other limitations in the panel with your own custom label and icon. Use any `AquariumIcons` icon name. Check `@aivenio/aquarium/icons/index` for available icons.

This should be done sparingly. Do not add general prerequisites like installation of software or tools, creating tokens, or other items that belong in the prerequisites section of the doc. This panel should be reserved for limitations like permissions and cloud providers that users have no control over themselves.

```jsx
<RequirementsPanel
  items={[
    {
      label: 'GitHub permissions',    # Custom field for apps that require third-party permissions
      icon: 'people',
      values: ['Organization admin'],
    },
  ]}
/>
```

If you don't specify an icon, the default info icon is used.

## Include links in values

You can use JSX elements like links directly in the values array.

```jsx
<RequirementsPanel
  items={[
    {
      label: 'GitHub requirements',
      values: [
        <>
          On GitHub, you must be an organization admin.{' '}
          <a href="https://docs.github.com/...">Learn more</a>
        </>,
      ],
    },
  ]}
/>
```

Supported value types:

- **Strings**: Plain text or backtick-wrapped code `` `role:admin` ``
- **JSX elements**: Links `<a>`, tags `<span>`, code `<code>`, emphasis `<strong>`, abbreviations `<abbr>`
- **Mixed**: Combine in the same values array; items are joined with ", " or "or" based on count. Wrap multiple elements in a single JSX element to avoid commas between them.

## Rules

- **Permissions label**: Use this exact name for Aiven role-based permissions. Automatically reformatted to "Required roles or permissions".
- **Preset labels** (Permissions, Availability, Cloud, Service plans): Automatically formatted. Use exact names.
- **Custom labels**: Any other label is rendered as-is.
- **Backticks**: Automatically render as inline code: `` `role:admin` `` → `role:admin`

## What NOT to include in RequirementsPanel

- Software prerequisites ("Must have Docker installed")
- Setup instructions ("Create a GitHub token first")
- General knowledge ("Basic familiarity with Kubernetes")
- Steps from other docs (link instead)

These belong in a separate **Prerequisites** section or referenced link.

## Examples

See [examples.md](examples.md) for complete, copy-paste-ready examples.
