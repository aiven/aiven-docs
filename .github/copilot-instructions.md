# Aiven Documentation

This is the official Aiven documentation repository built with Docusaurus 3. It generates the content at [aiven.io/docs](https://aiven.io/docs), covering the Aiven Platform and its managed open source services (Kafka, PostgreSQL, OpenSearch, MySQL, ClickHouse, Flink, Grafana, etc.).

## About the Repository

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

## Documentation Standards (Critical)

Ensure compliance with the following key style guide requirements.

**General Guidelines:**

Follow best practices for modern technical documentation, being consistent, reducing cognitive load, removing redundancy, and paring back language for clarity and readability.

- Don't use complex sentences.
- Use consistent terminology.
- Chunk content into digestible sections and group related information.
- Keep paragraphs to 3-5 sentences.
- Keep sentences under 25 words.
- Remove unnecessary words or sentences that don't add value.
- The first sentence of the document needs to be on one line. **Ignore warnings about line length for the first sentence in a file.**

**Product Names**:

Use the full prouduct name in the first or most prominent place of a document. Always use it in the sidebar label. After that, use the shorter common name.

The following are the proper names for all Aiven products.

- Aiven for AlloyDB Omni
- Aiven for Apache Kafka®
- Aiven for Apache Kafka® Connect
- Aiven for Apache Kafka® MirrorMaker 2
- Aiven for Apache Flink®
- Aiven for Apache Cassandra®
- Aiven for ClickHouse®
- Aiven for Metrics
- Aiven for Thanos™
- Aiven for M3
- Aiven for M3 Aggregator
- Aiven for OpenSearch®
- Aiven for PostgreSQL®
- Aiven for MySQL
- Aiven for Dragonfly
- Aiven for Grafana®
- Aiven for Caching - Use only in relation to backwards compatibility with the Redis® service. Otherwise use Aiven for Valkey™.
- Aiven for Valkey™
- the Aiven Platform - always in titel case
- Aiven Console - short form: "the console"; use the definite article in full sentences: "the Aiven Console"
- Aiven Provider for Terraform - short form: "Aiven Terraform Provider"
- Aiven Operator for Kubernetes® - short form: "Aiven Kubernetes Operator"; NOT "K8s"
- Aiven CLI - NOT "the CLI"
- EverSQL by Aiven
- Karapace
- Klaw

Apply the trademark the first time you write the full name of the Aiven offering and the open-source software project in the title or heading. Avoid giving the impression that another company's products are created or owned by Aiven. Do not use formulations like:

- Aiven for Flink
- Aiven's Kafka
- Aiven's Apache Kafka

**Writing Style:**

- Use active voice, present tense only (never future: "Click X to start" not "Click X and import will start")
- Use plain, US English for international readers, avoiding idioms, colloquialism, and phrasal verbs
- Avoid unnecesarily complex vocabulary. For example, use "use" instead of "utilize" or "leverage".
- Use numbered lists for sequential steps, bullets for unordered items
- Always use serial comma: "A, B, and C"
- Avoid using paretheses for asides

**Formatting:**

- Inline code elements in backticks: `tableName`, `service_name`
- Code blocks in triple backticks with language specified: `json`, `bash`
- Admonitions: `:::note`, `:::tip`, `:::warning`, `:::caution`
- Bold: use ONLY for UI elements and run-in headings in lists. Use double asterisks for bold. For example: Click **Save**.
- Italics: use sparingly. You can use it to introduce new terms that you are defining. Use underscores for italics. For example: "A _VPC_ is a logically isolated section of a cloud provider's network."
- Quotation marks: do not use quotation marks for labels or emphasis.
- Don't use ampersands (&) or "and/or".

**Inclusive Language:**

- Avoid ableist terms like "crazy", "dummy variable"
- Avoid violent or militaristic language, like "kill a process," "blast radius"
- Avoid divisive social/political terms like "blacklist/whitelist," "master/slave," "native features"

**Words to Avoid:**

- Complexity judgments like "easily", "simply", or "quickly"
- Latin abbreviations - use "for example" not "e.g."
- "Etc.", "and so forth", "and so on", and related phrases - use phrasing like "such as" or "including" instead (for example, "Your personal profile includes information such as your name, email address, and job title.").
- Temporal words and phrases about the platform or its features like "now", "currently", "in the future", "yet", and "eventually". It's okay to use these words when referring to consequences of user actions.
- Weasel words like "often" and "probably"
- Directional language like "above", "below" and "to the right"
- Deselect or unselect - use "clear"
- Wish or desire/desired - for example, say "select the format" not "select the desired format"
- Config - spell out "configuration" unless it's a UI label
- "Create the new" - don't use "new" with the verb "create"
- "For instance" - use "for example"
- "Network IP address" - use "internal IP address"
- Avoid using "possible" and "impossible". Use "can" and "cannot" instead.

**UI Instructions:**

- Never describe UI element types: Write "Click **Save**" not "Click the Save button"
- Never describe locations: "Click **Save**" not "Click Save on the left menu"
- Use "select" when a user chooses from a dropdown or list.
- Use `ConsoleLabel` component for UI elements that have an icon and a label: `<ConsoleLabel name="AI insights"/>`
  - Check the list of available icons in `src/components/ConsoleIcons/index.tsx`
- For UI elements without labels, use the icon and the tooltip text: Click <ConsoleIcon name="user"/> **User information**.
  - Don't use icons without text.
- Use qualifying nouns for technical keywords. For example, when referring to a file called example.yaml, call it the example.yaml file and not example.yaml by itself.
- Use "select" and "clear" for checkboxes.
- Use "click" for toggles: "To enable the feature, click the **Feature** toggle.", "In **Settings**, click the **Advanced options** toggle to the on position."

**Lists:**

- Introduce lists with a complete sentence explaining the context, ending with a period or colon.
- Don't introduce a list with a sentence fragment that is completed by the list.
- Don't refer to the list items using "below". Instead, use "the following".
- Use parallel syntax for list items.
- Use periods at the end of list items unless:
  - The items are single words
  - The items are entirely in code format
  - The items are links
- Use bold text for run-in headings.

**Code Semantics & Syntax:**

- Backtick usage: Use backticks for attribute names and values, commands, CLI utilities, data types, database elements, DNS types, enums, env vars, filenames/extensions/paths, folders, HTTP content types/status codes/verbs, IP addresses, placeholder variables, and URLs/domains within commands.
- UI Code: If a UI element requires code font, apply both bold and code (for example, **`pg_stat_monitor_enable`**).
- Immutability: Never pluralize or make code elements possessive (for example, don't write "the `variables.tf`'s"). Always follow the code element with a descriptive noun (write "the `config.json` file").

**Code Blocks & CLI:**

- Introductions: Precede code with a sentence ending in a colon or period (for example, "To enable this feature, run:"). Link command names to docs if available (for example, Use the [`avn service` command](/docs/...):").
- Click-to-Copy Examples: Do not use meta-characters (`[]`, `{}`, `|`, `...`) in executable examples. Provide specific, valid commands.
- Reference Syntax: Use `[arg]` for optional and `{opt1|opt2}` for mutually exclusive arguments only in non-executable syntax references. Minimize optional arguments.
- Input/Output: Always separate input (commands) and output (results) into distinct code blocks.
- Output: Only include command output if the user must verify a value or copy a string from it.

**Placeholders & Generic Data:**

- Placeholders: Use `UPPER_CASE_WITH_UNDERSCORES`. Do not use other characters like angle brackets (< >) or "MY\_" prefixes (for example, use `PROJECT_ID`, not <project-id> or `MY_PROJECT`).
- Domains: Use IANA reserved domains only (for example, `example`, `example.com`, `example.net`, `example.org`).
- Emails: Use `name@example.com`.
- Names: Use Alex, Amal, Izumi, Jie, Noam, Yuri. Use first initial only for surnames (for example, Quinn N.).
