# Aiven Documentation Style Guide

<!-- vale off -->

This is the official Aiven documentation repository built with Docusaurus 3. It generates the content at [aiven.io/docs](https://aiven.io/docs), covering the Aiven Platform and its managed open source services (Kafka, PostgreSQL, OpenSearch, MySQL, ClickHouse, Flink, Grafana, etc.).

## Scope and Application

These guidelines apply to all documentation files in the repository. When reviewing pull requests, check compliance with these requirements based on content type:

- **Universal rules**: Apply to ALL documentation content
- **Prose rules**: Apply to explanatory and conceptual content
- **Code rules**: Apply to code blocks, examples, and inline code
- **UI rules**: Apply to Aiven Console instructions and procedures

### Priority System

Higher priority rules are marked as a guide to their importance: **[CRITICAL]**, **[MEDIUM]**

### Enforcement Guidelines

When reviewing PRs:

- Focus on new/changed content; don't review existing content unless it's being modified
- Request changes for all CRITICAL and multiple MEDIUM violations
- Suggest improvements for LOW priority items

## Universal Rules (Apply to ALL content)

These rules must be followed in all documentation.

### Writing Style

- **[CRITICAL]** Avoid using complex sentences; keep sentences under 25 words.
- **[MEDIUM]** Chunk content into digestible sections and group related information.
- Keep paragraphs to 3-5 sentences.
- **[CRITICAL]** The first sentence of the document needs to be on one line. **Ignore warnings about line length for the first sentence in a file.**
- **[MEDIUM]** Remove unnecessary words or sentences that don't add value.
- **[MEDIUM]** Use consistent terminology and remove redundant phrasing.
- **[MEDIUM]** Write in active voice and present tense only.
  - **Avoid**: "The service will be configured by the system"
  - **Use**: "The system configures the service"
- Use plain, US English for international readers; avoiding idioms, colloquialism, and phrasal verbs.
- **[CRITICAL]** Avoid filler or judgmental words ("just", "easily", "simply", or "quickly")
  - **Example**: Instead of "Just click Save", write "Click Save"
  - **Example**: Instead of "You can easily configure", write "You can configure"
- **[CRITICAL]** Avoid unnecessarily complex vocabulary; use "use" instead of "utilize" or "leverage".
- Avoid using parentheses for asides.
- **[CRITICAL]** Bold: use ONLY for UI elements and run-in headings in lists. Use double asterisks for bold.
- Italics: use sparingly for introducing new terms that you are defining. Use single underscores for italics.
- **[CRITICAL]** Quotation marks: do not use quotation marks for labels or emphasis.
- **[CRITICAL]** Don't use ampersands (&) or "and/or".
- **[CRITICAL]** Don't use Latin abbreviations
  - **Avoid**: "i.e." and "e.g."
  - **Use**: "that is" not "i.e."
- **[CRITICAL]** Avoid language that is ableist, violent or militaristic, and divisive social/political terms.
  - **Examples to avoid**: "blind spot", "kill the process", "master/slave", "sanity check"
  - **Use instead**: "gap", "stop the process", "primary/secondary", "consistency check"
- **[MEDIUM]** Avoid temporal words.
  - **Examples to avoid**: "now", "currently", "in the future", "yet", and "eventually"
- **[MEDIUM]** Avoid directional language
  - **Examples to avoid**: "above", "below" and "to the right"

### Product Names and Terminology

**Product naming rules:**

- **[CRITICAL]** Use full product name at first mention and in sidebar labels, then use shorter common name.
- **[CRITICAL]** Apply trademarks on the first occurrence of the offering and underlying OSS project.
- **[CRITICAL]** Avoid implying Aiven owns 3rd-party projects: write "Aiven for Apache Kafka®" not "Aiven's Kafka"

**Official product names:**

- Aiven for Apache Kafka®
- Aiven for Apache Kafka® Connect
- Aiven for Apache Kafka® MirrorMaker 2
- Aiven for ClickHouse®
- Aiven for Metrics
- Aiven for Thanos™
- Aiven for OpenSearch®
- Aiven for PostgreSQL®
- Aiven for MySQL
- Aiven for Dragonfly
- Aiven for Grafana®
- Aiven for Valkey™
- the Aiven Platform - always in title case
- the Aiven Console - short form: "the console"; use the definite article in full sentences: "the Aiven Console"
- Aiven Provider for Terraform - short form: "Aiven Terraform Provider"
- Aiven Operator for Kubernetes® - short form: "Aiven Kubernetes Operator"; NOT "K8s"
- Aiven CLI - NOT "the CLI"
- EverSQL by Aiven
- Karapace
- Klaw

## Prose Rules (Explanatory and conceptual content)

### Console Instructions

- **[MEDIUM]** Use introductory text only if needed before steps.
- **[CRITICAL]** Never describe UI element types
  - **Avoid**: Click the **Save** button.
  - **Use**: Click **Save**.
- **[CRITICAL]** For menus, use ">" to indicate navigation
  - **Example**: Click **Admin** > <ConsoleLabel name="application users"/>.
- **[MEDIUM]** Don't describe locations.
  - **Avoid**: Click Save on the left menu.
  - **Use**: Click **Save**.
- Use "select" when a user chooses from a dropdown or list.
- **[MEDIUM]** Use `ConsoleLabel` component for UI elements that have an icon and a label: `<ConsoleLabel name="AI insights"/>`
  - Check the list of available icons in `src/components/ConsoleIcons/index.tsx`
- For UI elements without labels, use the icon and the tooltip text:
  - **Example**: Click <ConsoleIcon name="user"/> **User information**.
  - Don't use icons without text.
- Use qualifying nouns for technical keywords.
  - **Examples**: "the config.json file", "the setup.py script", "the README.md document"
- Use "select" and "clear" for checkboxes.
- Use "click" for toggles
  - **Examples**: "To enable the feature, click the **Feature** toggle.", "In **Settings**, click the **Advanced options** toggle to the on position."
- **[CRITICAL]** If a step is optional add "Optional:" at the start of the step.

### Lists

- Introduce lists with a complete sentence explaining the context, ending with a period or colon.
- Don't introduce a list with a sentence fragment that is completed by the list.
- **[CRITICAL]** Don't refer to the list items using "below", use "the following".
- **[MEDIUM]** Use parallel syntax for list items.
- **[MEDIUM]** Use periods at the end of list items unless:
  - The items are single words
  - The items are entirely in code format
  - The items are links
- **[CRITICAL]** Use bold text for run-in headings.

## Code Rules (Code blocks and inline code)

### Formatting and Syntax

- **[CRITICAL]** Backtick usage: Use backticks for attribute names and values, commands, CLI utilities, data types, database elements, DNS types, enums, env vars, filenames/extensions/paths, folders, HTTP content types/status codes/verbs, IP addresses, placeholder variables, and URLs/domains within commands.
- UI Code: If a UI element requires code font, apply both bold and code (for example, **`pg_stat_monitor_enable`**).
- **[MEDIUM]** Immutability: Never pluralize or make code elements possessive.
  - **Example**: don't write "the `variables.tf`'s", use "the `variables.tf` file's".
- **[MEDIUM]** Introductions: Precede code with a sentence ending in a colon or period
  - **Example**: To enable this feature, run:
- **[CRITICAL]** Click-to-Copy Examples: Do not use meta-characters (`[]`, `{}`, `|`, `...`) in executable examples. Provide specific, valid commands.
- Reference Syntax: Use `[arg]` for optional and `{opt1|opt2}` for mutually exclusive arguments only in non-executable syntax references. Minimize optional arguments.
- **[MEDIUM]** Input/Output: Always separate input (commands) and output (results) into distinct code blocks.
- Output: Only include command output if the user must verify a value or copy a string from it.
- **[CRITICAL]** Placeholders: Use `UPPER_CASE_WITH_UNDERSCORES`. Do not use other characters like angle brackets (< >) or "MY\_" prefixes (for example, use `PROJECT_ID`, not <project-id> or `MY_PROJECT`).
- **[CRITICAL]** Domains: Use IANA reserved domains only (for example, `example`, `example.com`, `example.net`, `example.org`).
- Emails: Use `name@example.com`.
- Names: Use Alex, Amal, Izumi, Jie, Noam, Yuri. Use first initial only for surnames (for example, Quinn N.).
