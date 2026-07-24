# RequirementsPanel Component

A reusable component for displaying permissions, service plans, and other requirements across documentation pages.

## Features

- **Scalable**: Easily add new requirement types without modifying the component
- **Icon Support**: Uses Aquarium design system icons for visual consistency
- **Interactive**: Optional tooltips and links on individual values
- **Dark Mode**: Full dark mode support using Aiven design tokens
- **Accessible**: Semantic HTML and proper contrast ratios
- **Inline Display**: Values shown on a single line with comma separation for compact presentation

## Usage

### Basic Example

```tsx
import RequirementsPanel from '@site/src/components/RequirementsPanel';

export default function MyComponent() {
  return (
    <RequirementsPanel
      items={[
        {
          icon: 'people',
          label: 'Required permissions',
          values: ['Manage services', 'Operator', 'Project admin'],
        },
        {
          icon: 'layers',
          label: 'Supported service plans',
          values: ['Developer', 'Professional'],
        },
      ]}
    />
  );
}
```

### With Links and Tooltips

```tsx
<RequirementsPanel
  items={[
    {
      icon: 'people',
      label: 'Required permissions',
      values: [
        {
          text: 'Manage services',
          tooltip: 'Full access to service management',
          href: '/docs/platform/concepts/permissions',
        },
        'Operator',
        'Project admin',
      ],
    },
  ]}
/>
```

## Props

### `RequirementsPanelProps`

- **items** (`RequirementItem[]`, required): Array of requirement items to display

### `RequirementItem`

- **icon** (`keyof AquariumIcons`, required): Icon name from Aquarium design system
- **label** (`string`, required): Section label (e.g., "Required permissions")
- **values** (`(string | RequirementValue)[]`, required): Array of values to display

### `RequirementValue`

- **text** (`string`, required): The text to display
- **tooltip** (`string`, optional): Tooltip content shown on hover
- **href** (`string`, optional): URL to link to

## Available Icons

The component uses icons from the Aquarium design system. Common icons include:

- `people` - For permissions
- `layers` - For service plans or tiers
- `database` - For services
- `cog` - For settings
- `lock` - For security
- `cloud` - For infrastructure

For a complete list, see the [Aquarium icon documentation](https://aquarium-library.aiven.io/?path=/docs/data-display-icons--docs).

## Styling

The component uses CSS variables from your design system and automatically adapts to light and dark themes. Key colors used:

- **Icons**: `--aiven-brand-teal` (light mode) / `--aiven-light-blue-300` (dark mode)
- **Background**: `--aiven-grey-0` (light mode) / `--aiven-grey-90` (dark mode)
- **Border**: `--aiven-grey-10` (light mode) / `--aiven-grey-70` (dark mode)
- **Text**: `--aiven-grey-60` (light mode) / `--aiven-grey-30` (dark mode)

## Examples in Documentation

### Permission Requirements

```tsx
<RequirementsPanel
  items={[
    {
      icon: 'people',
      label: 'Required permissions',
      values: ['Manage services', 'Operator', 'Project admin'],
    },
  ]}
/>
```

### Service Plan Requirements

```tsx
<RequirementsPanel
  items={[
    {
      icon: 'layers',
      label: 'Supported service plans',
      values: ['Developer', 'Professional', 'Premium'],
    },
  ]}
/>
```

### Combined Requirements

```tsx
<RequirementsPanel
  items={[
    {
      icon: 'people',
      label: 'Required permissions',
      values: ['Manage services', 'Operator', 'Project admin'],
    },
    {
      icon: 'layers',
      label: 'Supported service plans',
      values: ['Developer', 'Professional'],
    },
    {
      icon: 'cloud',
      label: 'Cloud providers',
      values: ['AWS', 'Azure', 'Google Cloud'],
    },
  ]}
/>
```
