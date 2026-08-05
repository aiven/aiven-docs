# Verify Service Information Architecture (IA) Compliance

Use this skill to verify that documentation content follows the established information architecture standards in `sidebars.ts`, ensuring consistency and structural integrity across all services and platform sections.

## When to Use This Skill

Trigger this skill when:
- Adding new documentation sections to a service
- Restructuring existing sidebar categories
- Reviewing content organization before merging sidebar changes
- Building documentation for a new service
- Migrating content between categories

## Core Principles

This skill enforces **structural guidelines**, not prescriptive content requirements. Services can vary in which sections they include (PostgreSQL has 9 top-level categories, MySQL has 5), but when categories ARE present, they must follow consistent structural patterns.

---

## Structural Standards

### Category Label Grammar

All category labels must be **noun phrases** that clearly describe the section's content.

**Rules:**
- Use title case: "Get started", "Connect to service", "Service management"
- Avoid imperative verbs: ❌ "Configure settings", ✓ "Service management"
- Avoid second-person constructions: ❌ "How to query data", ✓ "Query and analyze data"
- Connect parallel concepts with "and": "High availability and disaster recovery", "Backup and restore"
- Keep labels concise (2–4 words ideally) but descriptive enough to be scannable
- Use consistent grammatical structure across sibling categories (all noun phrases, not mixed)

**Examples:**

✓ **Correct (parallel noun phrases at same level):**
```
- Get started
- Connect to service
- Query and analyze data
- Service management
- High availability and disaster recovery
```

❌ **Incorrect (mixed grammar):**
```
- Getting started          (gerund, inconsistent)
- Connecting to service    (gerund, inconsistent)
- Query and analyze data   (noun phrase)
- Managing your service    (gerund + second-person)
```

---

### Link Patterns

**Standard rule:**
- **Top-level categories MUST have a `link` property**
- **Subcategories MUST NOT have a `link` property**
- Links reference the category's overview or landing document

**Correct structure:**

```typescript
{
  type: 'category',
  label: 'Aiven for PostgreSQL®',
  link: {
    type: 'doc',
    id: 'products/postgresql'
  },
  items: [
    {
      type: 'category',
      label: 'Get started',
      link: {
        type: 'doc',
        id: 'products/postgresql/get-started'
      },
      items: [
        // Leaf items - no links needed
        'products/postgresql/concepts/pg-free-tier',
        'products/postgresql/reference/resource-capability'
      ]
    },
    {
      type: 'category',
      label: 'Connect to service',
      // ❌ NO LINK HERE - subcategories should not have links
      items: [
        {
          type: 'category',
          label: 'Connection methods',
          // ❌ NO LINK HERE - deeper nesting
          items: [
            'products/postgresql/howto/connect-go',
            'products/postgresql/howto/connect-python'
          ]
        }
      ]
    }
  ]
}
```

**Exception:** Use `type: 'generated-index'` with a slug for auto-generated index pages, only at top level:

```typescript
{
  type: 'category',
  label: 'Connect to service',
  link: {
    type: 'generated-index',
    slug: 'products/kafka/howto/list-code-samples'
  },
  items: [ /* ... */ ]
}
```

---

### Nesting Depth

Nesting depth is **flexible and content-driven**, not rigid. Both patterns below are valid:

**Pattern 1: Flat structure (appropriate for 2–6 related items)**
```typescript
{
  type: 'category',
  label: 'Authentication',
  items: [
    'platform/howto/add-authentication-method',
    'platform/reference/password-policy',
    'platform/howto/user-2fa'
    // No subcategories
  ]
}
```

**Pattern 2: Nested structure (appropriate for 7+ related items or logical grouping)**
```typescript
{
  type: 'category',
  label: 'User and access management',
  items: [
    {
      type: 'category',
      label: 'Organization user management',
      items: [
        'platform/howto/manage-org-users',
        'platform/concepts/application-users'
      ]
    },
    {
      type: 'category',
      label: 'Permissions',
      items: [
        'platform/concepts/permissions',
        'platform/howto/manage-permissions'
      ]
    }
  ]
}
```

**Depth limits:**
- Top-level service/platform categories: Depth 1
- Feature-specific sections: Up to 3–4 levels deep (reserve for major feature areas like X-region disaster recovery)
- General sections: 1–2 levels is typical

**Guideline:** If nesting exceeds 4 levels, reconsider whether the structure is helping users navigate or adding complexity.

---

### Item Count per Category

- **Minimum:** 2 items (avoid single-item categories unless unavoidable)
- **Recommended:** 2–8 items per category
- **Maximum:** 12 items (beyond this, consider subcategories to improve scannability)

---

### Common Service Sections (Optional Reference)

These sections are common but NOT required. Include them if they apply to your service, and structure them according to these rules.

| Section | Type | Typical Nesting | Notes |
|---------|------|---|---|
| **Get started** | Onboarding | Usually flat or 1 level | Free tier info, terminology, prerequisites |
| **Connect to service** | Task-focused | Often 1–2 levels | Connection methods, pooling, management |
| **Query and analyze data** | Task-focused | Often 2–3 levels | Database operations, optimization, tools |
| **Service management** | Admin tasks | Usually flat or 1 level | Upgrades, versions, maintenance |
| **High availability and disaster recovery** | Advanced | Can be 2–3 levels | Failover, replication, cross-region |
| **Storage, backups, and migration** | Admin tasks | Often 1–2 levels | Backup procedures, restore, data migration |
| **Observability and monitoring** | Integration | Often 1–2 levels | Metrics, logging, external tools |
| **Integrations and extensions** | Advanced | Often 1–2 levels | Plugins, third-party connections |
| **User and schema** | Security/Admin | Usually flat | Permissions, user roles, schema management |

---

## Verification Checklist

Use this checklist when reviewing sidebar changes:

### Label Grammar
- [ ] All category labels are noun phrases (no imperative verbs)
- [ ] Labels use title case
- [ ] Parallel concepts connected with "and"
- [ ] Labels are 2–4 words (concise but clear)
- [ ] Sibling categories use consistent grammatical structure

### Link Patterns
- [ ] Top-level service/platform categories have `link` property
- [ ] No subcategories have `link` property
- [ ] Link `type` is either `'doc'` or `'generated-index'`
- [ ] Link `id` references an existing or planned document

### Structure
- [ ] Each category has 2–12 items
- [ ] Nesting depth appropriate for content volume (max 4 levels)
- [ ] Flat categories (no nesting) used when 2–6 items
- [ ] Nested categories used when 7+ items or logical grouping needed
- [ ] No orphaned categories (single-item categories justified if present)

### Consistency
- [ ] Category ordering follows a logical user journey
- [ ] Sibling categories at same level use parallel structure
- [ ] Document paths follow naming conventions (concepts, howto, reference, troubleshooting)

---

## Common Patterns & Examples

### Example 1: Service with Multiple Connection Methods

✓ **Correct:**
```typescript
{
  type: 'category',
  label: 'Connect to service',
  items: [
    {
      type: 'category',
      label: 'Connection methods',
      items: [
        'products/service/howto/connect-python',
        'products/service/howto/connect-java',
        'products/service/howto/connect-go'
      ]
    },
    {
      type: 'category',
      label: 'Connection management',
      items: [
        'products/service/concepts/connection-pooling',
        'products/service/reference/connection-limits'
      ]
    }
  ]
}
```

❌ **Incorrect:**
```typescript
{
  type: 'category',
  label: 'Connect to service',
  link: { type: 'doc', id: 'products/service/connect' },  // ❌ No link on non-top-level
  items: [
    // No subcategories—mixing flat items with structure below
    'products/service/howto/connect-python',
    {
      type: 'category',
      label: 'Connection pooling',
      items: [ /* ... */ ]
    }
  ]
}
```

### Example 2: Flat vs. Nested (Both Valid)

**Flat (6 items, no nesting):**
```typescript
{
  type: 'category',
  label: 'Authentication',
  items: [
    'platform/howto/add-authentication-method',
    'platform/howto/user-2fa',
    'platform/concepts/authentication-tokens',
    'platform/reference/password-policy',
    'platform/howto/set-authentication-policies',
    'platform/howto/create_authentication_token'
  ]
}
```

**Nested (same items, organized for clarity):**
```typescript
{
  type: 'category',
  label: 'Authentication',
  items: [
    {
      type: 'category',
      label: 'Authentication methods',
      items: [
        'platform/howto/add-authentication-method',
        'platform/howto/user-2fa',
        'platform/howto/set-authentication-policies'
      ]
    },
    {
      type: 'category',
      label: 'Tokens and credentials',
      items: [
        'platform/concepts/authentication-tokens',
        'platform/howto/create_authentication_token'
      ]
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'platform/reference/password-policy'
      ]
    }
  ]
}
```

Both are valid. Choose nesting if it improves scannability and user navigation.

---

## What NOT to Do

❌ **Mixed links (some subcategories have links, others don't):**
```typescript
{
  type: 'category',
  label: 'Features',
  items: [
    {
      type: 'category',
      label: 'Feature A',
      link: { type: 'doc', id: 'feature-a' },  // ❌ Inconsistent
      items: [ /* ... */ ]
    },
    {
      type: 'category',
      label: 'Feature B',
      items: [ /* ... */ ]
    }
  ]
}
```

❌ **Imperative or second-person labels:**
```typescript
- "Connecting to Your Service"      // ❌ Second-person
- "How to Manage Users"             // ❌ Imperative
- "Optimize Database Performance"   // ❌ Imperative
```

❌ **Single-item categories (without strong justification):**
```typescript
{
  type: 'category',
  label: 'Disaster Recovery',
  items: [
    'products/service/concepts/disaster-recovery'  // ❌ Why nest single item?
  ]
}
```

❌ **Overly deep nesting (5+ levels):**
```typescript
Feature → Sub-feature → Task → Subtask → Detail → Step  // ❌ Too deep
```

---

## Integration with Styleguide

For content within documents, refer to [@.ai-agents/docs/styleguide.md](.ai-agents/docs/styleguide.md):

- **Headings:** Follow [Headings and titles](#headings-and-titles) rules
- **Sentence structure:** Keep under 25 words; use active voice
- **Lists:** Maintain parallel structure within lists
- **Bold formatting:** Use for UI elements only, not for emphasis

The IA skill governs **navigation structure** (sidebars.ts); the styleguide governs **content within documents**.

---

## Workflow: Verifying Your Changes

1. **Map your structure:** Outline the categories and nesting you're proposing
2. **Check labels:** Run them against the Grammar rules above
3. **Verify links:** Ensure top-level has links, subcategories don't
4. **Count items:** Are you in the 2–12 range per category?
5. **Check depth:** Is nesting justified by content volume?
6. **Compare siblings:** Do categories at the same level follow parallel structure?
7. **Run the checklist:** Work through the verification checklist above
8. **Test navigation:** Does the order make sense for a user's mental model?

---

## Questions?

Refer to the plan file: [verify_service_ia_skill_5d553fa1.plan.md](.cursor/plans/verify_service_ia_skill_5d553fa1.plan.md)

For specific examples in the codebase:
- **PostgreSQL service structure:** `sidebars.ts` lines 1767–2028
- **Platform IA (Organizations, Users, Authentication):** `sidebars.ts` lines 36–175
