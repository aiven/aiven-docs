# Aiven docs repository guide for agents

<!-- vale off -->

Guide for agents working in the Aiven docs repository.

**Conventions:**
- **MUST/REQUIRED**: Mandatory
- **SHOULD/RECOMMENDED**: Deviate only with reason
- **MAY/OPTIONAL**: Use judgment

##  Repository structure

This repository uses Docusaurus. Most agent edits belong in source files under `docs/`.

- `docs/`: Primary documentation source.
	- `docs/products/`, `docs/platform/`, `docs/integrations/`, `docs/tools/`: Main content areas.
	- `docs/get-started.md`, `docs/marketplace-setup.md`, `docs/tools.md`: Top-level landing docs.
- `includes/`: Reusable Markdown partials included across docs.
- `static/`: Files copied as-is to the built site (images, fonts, code snippets, includes, page scripts).
- `src/`: Site UI and Docusaurus customizations (components, theme, CSS, plugins).
- `build/`: Generated site output. Do not edit manually.
- `scripts/`: Utility scripts for repository maintenance and content generation.
- `docusaurus.config.ts`, `sidebars.ts`: Core site configuration and navigation.
- `styleguide.md`: Source of truth for writing style and terminology.

## Documentation (Load on-demand)

When working in specific areas, load relevant files using your file-reading capability.

**Instructions**:
1. Load files lazily - only when working in the specified directory or when the task relates to the topic
2. Do NOT preload all files at session start
3. When loaded, treat content as authoritative guidance that supplements this file

### Core agent guidelines

Agent workflow rules:
- Edit source files in `docs/`, `includes/`, `src/`, or config files.
- Avoid direct edits in `build/` because content is regenerated.

|   Topic    |        Reference         | When to load |
| ---------- | ------------------------ | ------------ |
| Styleguide | `@.ai-agents/docs/styleguide.md` |              |
| ---------- | ------------------------ | ------------ |
