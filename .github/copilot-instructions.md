# Aiven Documentation

<!-- vale off -->
This is the official Aiven documentation repository built with Docusaurus 3. It generates the content at [aiven.io/docs](https://aiven.io/docs), covering the Aiven Platform and its managed open source services (Kafka, PostgreSQL, OpenSearch, MySQL, ClickHouse, Flink, Grafana, etc.).

When reviewing documentation, ensure compliance with the following key style guide requirements.

## Documentation Standards (Critical)

### General Guidelines - Apply to ALL content

- Avoid use complex sentences; keep sentences under 25 word.
- Chunk content into digestible sections and group related information.
- Keep paragraphs to 3-5 sentences.
- The first sentence of the document needs to be on one line. **Ignore warnings about line length for the first sentence in a file.**
- Remove unnecessary words or sentences that don't add value.
- Use consistent terminology and remove redundant phrasing.
- Write in active voice and present tense only.
- Use plain, US English for international readers; avoiding idioms, colloquialism, and phrasal verbs.
- Avoid filler or judgmental words ("just", "easily", "simply", or "quickly")
- Avoid unnecesarily complex vocabulary. For example, use "use" instead of "utilize" or "leverage".
- Avoid using paretheses for asides.
- Bold: use ONLY for UI elements and run-in headings in lists. Use double asterisks for bold. For example: Click **Save**.
- Italics: use sparingly. You can use it to introduce new terms that you are defining. Use underscores for italics. For example: "A _VPC_ is a logically isolated section of a cloud provider's network."
- Quotation marks: do not use quotation marks for labels or emphasis.
- Don't use ampersands (&) or "and/or".
- Don't use Latin abbreviations - use "for example" not "e.g."
- Avoid language that is ableist, violent or militaristic, and divisive social/political terms.
- Avoid temporal words ("now", "currently", "in the future", "yet", and "eventually").
- Avoid directional language ("above", "below" and "to the right").

**Product Names**:

- Use full product name at first mention and in sidebar labels, then use shorter common name.
- Apply trademarks on the first occurrence of the offering and underlying OSS project.
- Avoid implying Aiven owns 3rd-party projects: "Aiven’s Kafka”, “Aiven for Flink”

The following are the proper names for all Aiven products.

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

## Prose Guidelines - Apply to explanatory and conceptual content

**UI Instructions:**

- Use introductory text only if needed before steps.
- Never describe UI element types: Write "Click **Save**" not "Click the Save button"
- For menus, use ">" to indicate navigation: "Click **Admin** > <ConsoleLabel name="application users"/>."
- Never describe locations: "Click **Save**" not "Click Save on the left menu"
- Use "select" when a user chooses from a dropdown or list.
- Use `ConsoleLabel` component for UI elements that have an icon and a label: `<ConsoleLabel name="AI insights"/>`
  - Check the list of available icons in `src/components/ConsoleIcons/index.tsx`
- For UI elements without labels, use the icon and the tooltip text: Click <ConsoleIcon name="user"/> **User information**.
  - Don't use icons without text.
- Use qualifying nouns for technical keywords. For example, when referring to a file called example.yaml, call it the example.yaml file and not example.yaml by itself.
- Use "select" and "clear" for checkboxes.
- Use "click" for toggles: "To enable the feature, click the **Feature** toggle.", "In **Settings**, click the **Advanced options** toggle to the on position."
- If a step is optional add "Optional:" at the start of the step.

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

### Code samples - Apply to code blocks and inline code

- Backtick usage: Use backticks for attribute names and values, commands, CLI utilities, data types, database elements, DNS types, enums, env vars, filenames/extensions/paths, folders, HTTP content types/status codes/verbs, IP addresses, placeholder variables, and URLs/domains within commands.
- UI Code: If a UI element requires code font, apply both bold and code (for example, **`pg_stat_monitor_enable`**).
- Immutability: Never pluralize or make code elements possessive (for example, don't write "the `variables.tf`'s"). Always follow the code element with a descriptive noun (write "the `config.json` file").
- Introductions: Precede code with a sentence ending in a colon or period (for example, "To enable this feature, run:"). Link command names to docs if available (for example, Use the [`avn service` command](/docs/...):").
- Click-to-Copy Examples: Do not use meta-characters (`[]`, `{}`, `|`, `...`) in executable examples. Provide specific, valid commands.
- Reference Syntax: Use `[arg]` for optional and `{opt1|opt2}` for mutually exclusive arguments only in non-executable syntax references. Minimize optional arguments.
- Input/Output: Always separate input (commands) and output (results) into distinct code blocks.
- Output: Only include command output if the user must verify a value or copy a string from it.
- Placeholders: Use `UPPER_CASE_WITH_UNDERSCORES`. Do not use other characters like angle brackets (< >) or "MY\_" prefixes (for example, use `PROJECT_ID`, not <project-id> or `MY_PROJECT`).
- Domains: Use IANA reserved domains only (for example, `example`, `example.com`, `example.net`, `example.org`).
- Emails: Use `name@example.com`.
- Names: Use Alex, Amal, Izumi, Jie, Noam, Yuri. Use first initial only for surnames (for example, Quinn N.).
