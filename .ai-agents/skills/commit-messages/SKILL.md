---
name: commit-messages
description: Enforce commit message guidelines following conventional commits format with required sign off. Use when creating commits, writing commit messages, reviewing PR titles, or helping other agents understand Aiven docs commit conventions.
---

<!-- vale off -->

# Commit Messages

This repository enforces [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) with specific types and mandatory signoff. GitHub Actions validates all commits and PRs.

## Format

Commit messages follow this pattern:

```
<type>: <subject>
```

Optional scope is acceptable but not recommended (rarely used, minimal clarity):

```
<type>(<scope>): <subject>
```

## Allowed Types

Use one of these types (enforced by GitHub Actions):

- **`feat`** - New features
- **`fix`** - Bug fixes
- **`chore`** - Maintenance tasks and routine work
- **`ci`** - CI/CD pipeline changes
- **`deps`** - Dependency updates
- **`style`** - Code style changes
- **`update`** - General updates and improvements
- **`delete`** - Deletions and removals

## Subject Line Rules

- Use present tense, imperative mood ("add feature" not "added feature")
- Be concise and descriptive
- Do not end with a period
- Keep under 50 characters when possible
- Start with lowercase letter (unless it's a proper noun)

## Scope (Optional)

Scope is acceptable but not recommended. If included:

- Use lowercase
- Keep it short and meaningful
- Valid characters: letters, numbers, dots, hyphens, asterisks, forward slashes, spaces
- Examples: `docs`, `api`, `build`

## Signoff Requirement

**All commits must be signed off.** This confirms you have the right to contribute the code.

### Using the CLI

Add the `--signoff` flag when committing:

```bash
git commit --signoff -m "feat: add new feature"
```

Or use the short form:

```bash
git commit -S -m "feat: add new feature"
```

### Using GitHub Web Interface

When creating or editing commits via GitHub's web interface, enable the "Sign off" checkbox before committing.

### Verification

Your commit message will include a signoff line like:

```
Signed-off-by: Your Name <your.email@example.com>
```

## Pre-Commit Checklist

Before committing, verify:

- [ ] Type is one of the allowed types (feat, fix, chore, ci, deps, style, update, delete)
- [ ] Subject line is concise and descriptive
- [ ] Subject line uses imperative mood (present tense)
- [ ] Subject line does not end with a period
- [ ] Scope is omitted unless truly necessary for clarity
- [ ] Commit is signed off with `--signoff` flag
- [ ] Message follows the format: `<type>: <subject>` or `<type>(<scope>): <subject>`

## PR Title Note

Pull request titles must also follow conventional commit format (`<type>: <subject>`). The GitHub Actions workflow validates PR titles on creation and edit, so PRs won't merge without proper formatting.

## Examples

For realistic examples covering all types, edge cases, and common mistakes, see [examples.md](examples.md).

## Resources

- [CONTRIBUTING.md](../../CONTRIBUTING.md) - Project contribution guidelines
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) - Standard specification
- [GitHub PR Validation Workflow](.github/workflows/semantic-pr.yaml) - Enforcement rules
