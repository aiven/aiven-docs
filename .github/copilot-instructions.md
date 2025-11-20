# Aiven Documentation

This is the official Aiven documentation repository built with Docusaurus 3. It generates the content at [aiven.io/docs](https://aiven.io/docs), covering the Aiven Platform and its managed open source services (Kafka, PostgreSQL, OpenSearch, MySQL, ClickHouse, Flink, Grafana, etc.).

## About the Repository

### Architecture

**Folder Structure:**

- `docs/` - Documentation content (MDX/Markdown)
  - `products/` - Service-specific docs (kafka/, postgresql/, opensearch/, etc.)
  - `platform/` - Platform features (concepts/, howto/, reference/)
  - `tools/` - Client tools (aiven-console/, cli/, terraform/)
  - `integrations/` - Third-party integrations (datadog/, cloudwatch/, etc.)
- `src/` - React components and custom code
  - `components/` - Custom components (Card, ConsoleLabel, GridContainer, RelatedPages, Badges, Buttons)
  - `css/` - Custom stylesheets (fonts.css, colors.css, navbar.css, admonitions.css)
  - `pages/` - Non-docs pages (homepage)
  - `plugins/` - Custom Docusaurus plugins
- `static/` - Static assets served at `/docs/`
  - `includes/` - Reusable content snippets (50+ files, some auto-generated)
  - `images/` - Images (content/, logos/, icons/)
  - `code/` - Code samples
- `scripts/` - Node.js scripts for content generation
- `external/` - Git submodules (e.g., terraform-provider)
- `docusaurus.config.ts` - Main Docusaurus configuration (316 lines)
- `sidebars.ts` - Sidebar navigation structure (2000+ lines)

**Docusaurus Static Site Generator:**

- TypeScript configuration in `docusaurus.config.ts` (316 lines) defines site metadata, plugins, theme customization, and integrations (Algolia search, Kapa AI chatbot, analytics)
- Sidebar structure manually configured in `sidebars.ts` (2000+ lines) organizing 1000+ documentation pages
- Custom React components in `src/components/` (Card, ConsoleLabel, GridContainer, RelatedPages, Badges, Buttons)
- Markdown content in `docs/` organized by product/platform/tools with extensive use of MDX features

**Content Reuse System:**

- Reusable content snippets in `static/includes/*.md` (50+ files) imported into documentation pages
- Example: `import ConsoleLabel from "@site/src/components/ConsoleIcons"` for UI element references
- Generated configuration files in `static/includes/config-*.md` created by scripts (not manually edited)

**Dynamic Content Generation:**

- `scripts/service_type_parser.js` fetches service configurations from Aiven API and generates markdown tables
- `scripts/clouds_parser.js` generates cloud provider listings
- Run via `Makefile` targets (e.g., `make all-service-type-configs`)

### Workflow

**Pre-commit Validation:**

- Vale linting enforces style guide (`.vale.ini`, see `styleguide.md`)
- Husky git hooks prevent commits with Vale errors
- `yarn build` checks for broken links
- Conventional commits enforced: `fix:`, `feat:`, `add:` prefixes

**VS Code Integration:**

- Hard line breaks at 90 characters (ruler should be visible)

### Component Usage Patterns

**Importing Components:**

```jsx
import ConsoleLabel from '@site/src/components/ConsoleIcons';
import Card from '@site/src/components/Card';
import GridContainer from '@site/src/components/GridContainer';
import RelatedPages from '@site/src/components/RelatedPages';
import {ButtonSecondary} from '@site/src/components/Buttons';
```

**Static Assets:**

- Import images: `import Overview from "@site/static/images/content/platform/platform-overview.png"`
- Reference in JSX: `<img src={Overview} alt="..." />`

**MDX Features:**

- Tabs: `<Tabs><TabItem value="x" label="Y">...</TabItem></Tabs>` (from `@theme/Tabs`)
- Include snippets: Direct import and render as component (e.g., `<IncludedContent />`)

### File Modification Warnings

**Never manually edit generated files:**

- `static/includes/config-*.md` (regenerate via `make all-service-type-configs`)
- `static/includes/clouds-list.md` (regenerate via `make cloud-list`)

**External content:**

- `external/terraform-provider/` is a submodule - update via git submodule commands

## Documentation Standards (Critical)

Ensure compliance with the following key style guide requirements:

**Writing Style:**

- Use active voice, present tense only (never future: "Click X to start" not "Click X and import will start")
- Use plain, US English for international readers - avoid phrasal verbs, Latin abbreviations (use "for example" not "e.g."), and complex vocabulary (use "use" instead of "utilize")
- Make sentences short, keep them under 25 words
- Don't use weasel words like "often" and "probably"
- Don't make complexity judgments (for example, using words like "easily" or "quickly")
- Use numbered lists for sequential steps, bullets for unordered items
- Always use serial comma: "A, B, and C"
- Don't use directional language like "above" or "to the right"
- Use parallel syntax for list items (for example, start each item with a verb and end with a period)
- Avoid using paretheses for asides

**UI Instructions:**

- Never describe UI element types: Write "Click **Save**" not "Click the Save button"
- Never describe locations: "Click **Save**" not "Click Save on the left menu"
- Use `ConsoleLabel` component for UI elements that have an icon and a label: `<ConsoleLabel name="AI insights"/>`
- Use qualifying nouns for technical keywords. For example, when referring to a file called example.yaml, call it the example.yaml file and not example.yaml by itself.

**Admonition Usage:**

- **Warning** (:::warning): Use STRICTLY for irreversible data loss, security breaches, or critical system outages. Never use for typos, generic errors, or reversible configuration issues.

- **Caution** (:::caution): Use ONLY for blocking constraints, version incompatibility, or mandatory prerequisites. Ignoring this leads to task failure or rework.

- **Note** (:::note): Use for peripheral context only. The user must be able to skip the note and still complete the task. NEVER use :::note for core content (tables, pricing lists, math formulas) or mandatory requirements.

- **Tip** (:::tip): Use for optional shortcuts or optimizations. Do not use for context or for general "See also" links.

- **Titles**: Use custom titles only for specific conditions (e.g., :::note[Windows only]). Flag generic titles like "Examples", "Pricing", or "Availability" — these must be standard headers, not admonitions.

**Formatting:**

- Code elements in backticks: `tableName`, `service_name`
- Bold for UI elements: **Save**, **Create service**
- Admonitions: `:::note`, `:::tip`, `:::warning`, `:::caution`
- Never use italics for emphasis or labels

**Inclusive Language:**

- Avoid ableist terms (for example, "crazy", "dummy variable")
- Avoid violent or militaristic language (for example, "kill a process", "blast radius")
- Avoid divisive social/political terms (for example, "blacklist/whitelist", "master/slave", "native features")
