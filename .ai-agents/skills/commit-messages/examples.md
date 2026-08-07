# Commit Message Examples

## Examples by Type

### feat: New Features

**Good:**
```
feat: add dark mode to documentation
```

**Good (with scope, if needed):**
```
feat(ui): add dark mode toggle
```

**Bad:**
```
feat: Added dark mode feature
feat: dark mode.
feature: add dark mode
```

---

### fix: Bug Fixes

**Good:**
```
fix: correct incorrect parameter documentation
```

**Good (with scope, if needed):**
```
fix(api): resolve null pointer exception
```

**Bad:**
```
fix: Fixed a bug
fix: Fixed bug in the system.
Fix: fixed broken link
```

---

### chore: Maintenance

**Good:**
```
chore: update dependencies
```

**Good (with scope, if needed):**
```
chore(ci): update Node version in CI
```

**Bad:**
```
chore: update stuff
chore: Various updates and fixes.
Chore: cleanup
```

---

### ci: CI/CD Changes

**Good:**
```
ci: add GitHub Actions workflow for linting
```

**Bad:**
```
ci: changed the pipeline
CI: Updated configuration.
ci: stuff
```

---

### deps: Dependency Updates

**Good:**
```
deps: upgrade vale to 3.0
```

**Bad:**
```
deps: Updated packages
deps: bump versions.
update dependencies
```

---

### style: Code Style

**Good:**
```
style: reformat markdown to 90 character line breaks
```

**Bad:**
```
style: fixed formatting
style: prettier.
Style: formatting changes
```

---

### update: General Updates

**Good:**
```
update: refresh installation guide with new steps
```

**Bad:**
```
update: stuff updated
update: misc changes.
Update: general updates
```

---

### delete: Deletions

**Good:**
```
delete: remove deprecated API endpoint
```

**Bad:**
```
delete: deleted files
delete: removed stuff.
Delete: cleanup
```

---

## Common Patterns

### Multi-line Commits

When you need to provide more context, use a multi-line format:

```
feat: add automated changelog generation

Implement a script that generates changelog entries from
conventional commit messages. This helps maintain an
up-to-date CHANGELOG.md for each release.
```

The first line is the subject (still under 50 chars). Blank line separates from the body.

### Scope Examples (if used)

Scope helps identify the affected area, but is optional and rarely needed:

```
fix(docs): correct typo in installation guide
fix(build): resolve missing export statement
fix(config): update base URL configuration
```

Without scope (recommended):

```
fix: correct typo in installation guide
fix: resolve missing export statement
fix: update base URL configuration
```

---

## Anti-Patterns

### ❌ Wrong: Vague or generic messages

```
fix: stuff
feat: changes
update: misc
```

### ❌ Wrong: Multiple types in one commit

```
feat/fix: add feature and fix bug
```

### ❌ Wrong: Uses past tense instead of imperative

```
feat: added dark mode
fix: fixed the bug
update: updated dependencies
```

### ❌ Wrong: Exceeds line length (and ends with period)

```
feat: this is a really long commit message that describes in excessive detail everything that was done and why.
```

### ❌ Wrong: Incorrect type

```
feature: add dark mode
bugfix: correct parameter
update: add new feature
```

---

## Signoff Examples

When you use `git commit --signoff`, Git automatically appends:

```
fix: correct incorrect parameter

Signed-off-by: Your Name <your.email@example.com>
```

This appears in the commit log and GitHub will validate it's present.
