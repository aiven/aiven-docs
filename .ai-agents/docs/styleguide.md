# Aiven documentation style guide

<!-- vale off -->

This guide has the content guidelines for writing and reviewing documentation in the [Aiven docs](https://github.com/aiven/aiven-docs) repository.
The guide is based in part on [Google developer documentation style](https://developers.google.com/style); where this document is stricter or different, this document takes precedence.

These guidelines apply to all documentation files in the repository. Check compliance based on content type:

- **Universal rules** (@universal): All documentation content
- **Prose rules** (@prose): Explanatory and conceptual content
- **Code rules** (@code): Code blocks, code examples, and inline code
- **Procedure rules** (@procedure): Instructions for Aiven Console and other interfaces

## Quick reference for AI agents

**Top rules to check first:**

1. **Sentences**: Keep under 25 words; first sentence of document on one line.
2. **Code formatting**: Use backticks for technical identifiers; bold+code (`**`backticks`**`) for UI + code.
3. **Bold/italics**: Bold **only** for UI elements and run-in list headings; avoid italics.
4. **Active voice**: Write "The system configures the service", not "The service will be configured".
5. **Avoid filler**: No "just", "easily", "simply", "quickly".
6. **Avoid temporal anchors**: Use timeless phrases or specific release notes or version statements when time matters. Don't use "now", "currently", "in the future", "yet", and "eventually".

## How to navigate this guide

### By metadata tags

Look for these tags throughout the document to filter relevant rules:

- **@universal**: Applies to all documentation (sentence length, grammar, voice, etc.)
- **@prose**: Writing explanations, conceptual content, and guides
- **@code**: Writing code examples, commands, CLI, and inline code
- **@procedure**: Writing step-by-step instructions and Console procedures

### By topic area

- **Sentence structure & grammar**: [Voice and tone](#voice-and-tone), [Sentences and paragraphs](#sentences-and-paragraphs), [Consistency](#consistency)
- **Bold, italics, capitalization**: [Bold and italics](#bold-and-italics), [Inline code](#inline-code), [Capitalization](#capitalization)
- **Punctuation & formatting**: [Punctuation, quotations, and text formatting](#punctuation-quotations-and-text-formatting)
- **Product names & trademarks**: [Product names and trademarks](#product-names-and-trademarks)
- **Procedures & UI conventions**: [Procedures](#procedures), [Console procedures](#console-procedures), [Click chains](#click-chains)
- **Code examples & placeholders**: [Code and examples](#code-and-examples), [Placeholders](#placeholders), [Domains, emails, and example names](#domains-emails-and-example-names)
- **Headings, lists, tables, links**: [Headings and titles](#headings-and-titles), [Lists](#lists), [Tables](#tables), [Links and cross-references](#links-and-cross-references)

### By workflow

**Writing step-by-step procedures:**
1. Start with [Procedures](#procedures) (@procedure)
2. Check [Sentences and paragraphs](#sentences-and-paragraphs) (@universal @prose)
3. Review [Bold and italics](#bold-and-italics) (@universal) for UI element formatting
4. Refer to [Inline code](#inline-code) (@code @prose) for console labels and technical values

**Writing code examples:**
1. Start with [Code and examples](#code-and-examples) (@code)
2. Check [Placeholders](#placeholders) (@code) for naming conventions
3. Review [Domains, emails, and example names](#domains-emails-and-example-names) (@code @prose)
4. Verify [Inline code](#inline-code) (@code @prose) conventions

**Writing conceptual content:**
1. Start with [Voice and tone](#voice-and-tone) (@universal)
2. Review [Sentences and paragraphs](#sentences-and-paragraphs) (@prose)
3. Check [Document structure and syntax](#document-structure-and-syntax) (@universal)
4. Refer to [Punctuation, quotations, and text formatting](#punctuation-quotations-and-text-formatting) (@universal) as needed
5. Review [Timeless product wording](#timeless-product-wording) (@universal) to avoid stale language

## How to use this guide

Rules are tagged for importance:

- **[CRITICAL]**: Must follow; request changes on violations in new or modified content.
- **[MEDIUM]**: Strong convention; request changes when several appear in the same change.

Run [Vale](https://vale.sh/) on files you edit. Read the [CONTRIBUTING.md](./CONTRIBUTING.md) guide for more information.

## PR review guidelines

When reviewing PRs:

- Focus on new or changed content; do not re-review unchanged legacy text unless the PR touches it.
- Request changes for all **[CRITICAL]** violations and for multiple **[MEDIUM]** violations in the same area.
- Suggest improvements for lower-priority polish.

## Voice and tone (@universal)

Documentation is scanned more than it is read line by line. Aim for clarity and directness.

- Include only what the reader needs for the task or concept.
- Chunk content into short sections with clear headings.
- Keep paragraphs to **3–5 sentences** where possible.
- Use lists to break up dense prose when items are parallel options, steps, or examples.
- Conceptual topics such as architecture or background information may be longer; procedures should be minimalistic.
- **[CRITICAL]** Avoid filler or judgmental words such as **just**, **easily**, **simply**, and **quickly**.
  - **Example**: Write Click **Save**, not "Just click **Save**".
  - **Example**: Write **You can configure…**, not "You can easily configure…".
- **[MEDIUM]** Remove sentences that do not add information (for example, avoid generic openers such as "This section describes how to…" when the heading already states the topic).
- **[CRITICAL]** Avoid duplicating information in an article.
- Avoid uncertain modals such as **might**, **could**, **ought**, or **shall** when a definite outcome is documented.

## Writing for a global audience (@universal)

- Use **US English**.
- **[MEDIUM]** Prefer simple, direct wording for international readers; avoid idioms and slang.
- **[MEDIUM]** Use phrasal verbs sparingly (for example, prefer "connects" over "hooks up") when a single verb is clear.
- Use consistent terminology; repeat a noun if it aids clarity.
- **[CRITICAL]** Avoid unnecessarily complex vocabulary; use **use** instead of "utilize" or "leverage".
- **[MEDIUM]** Avoid weasel words ("often", "probably", "possibly") when you can state facts or scope instead.
- Avoid **need** and **must** where the imperative is clearer (_Create a project_ rather than _You must create a project_).
- Use a serial comma before the final item in a list of three or more items.

### Plain English do's and don'ts (@universal)

| Category                  | Do                                               | Don't                                                                    |
|---------------------------|--------------------------------------------------|--------------------------------------------------------------------------|
| **Simple English**        | Use the Metrics API.                             | Utilize the Metrics API.                                                 |
| **Simple English**        | Import the item when the icon is green.          | The icon has turned green therefore meaning you can now import the item. |
| **Simple English**        | Import the catalog when the icon is green.       | You need to import the catalog when the icon is green.                   |
| **Phrasal verbs**         | The dialog appears.                              | The dialog pops up.                                                      |
| **Weasel word**           | Use this endpoint to implement…                  | This endpoint is often useful when implementing…                         |
| **Judging complexity**    | To create a service, click…                      | To create a service, simply click…                                       |
| **Latin**                 | Set a value, for example `32`.                   | You can set a value, e.g. `32`.                                          |
| **Parallelism**           | Add points to or subtract them from…             | Add or subtract points from…                                             |
| **Punctuation**           | The service can be active, inactive, or blocked. | The service can be active, inactive or blocked.                          |

### Jargon (@universal)

- Prefer the reader's terms when they are standard in the domain; introduce specialized terms briefly on first use.
- Define acronyms on first use if the acronym will appear again in the document.

### Tense and certainty (@universal)

| Type | Do | Don't | Note |
|------|----|-------|------|
| **Future** | Click **Create** to start the import. | Click **Create** and the import will start. | Avoid vague sequencing. |
| **Future** | Define a filter. | You will now define a filter. | Avoid "now" with future. |
| **Future** | Click **Save**. | You will need to click **Save**. | Prefer imperative. |
| **Title** | Configure the service | Configuring the service | Imperative for task headings. |
| **Title** | Add a user | To add a user | Avoid infinitive stack as a heading. |
| **Uncertainty** | The process starts in about 20 seconds. | The process might start in 20 seconds. | Avoid "might" for documented behavior. |

### Timeless product wording (@universal)

Product and reference docs should read correctly months later. Time-based words ("new", "now", "currently", "latest") often become wrong after the next release.

| Do | Don't |
|----|-------|
| These parameters tune the replication factor. | These new parameters tune the replication factor. |
| The following options are not supported: | The following options are not currently supported: |
| The integration supports these auth modes: | The integration now supports these auth modes: |

> **Exception:** Admonitions with information about limited or early available features may use time language, but these should be used sparingly. Procedural lines such as "The service stops soon after you run the delete command" are fine when they describe an immediate transition.

**[CRITICAL]** In capability docs, avoid promising roadmap items. Do not document **future** features unless they are tied to a named release or date in the same document.

### Person

- Address the reader as **you** in procedural and conceptual docs unless a different subject is clearer (for example, "the connector sends…").
- Avoid **we**; use "Aiven" or the relevant team name (for example, "the Aiven support team").
- Do not use **please**.

### Inclusive and accessible language (@universal)

- **[CRITICAL]** Avoid ableist, violent or militaristic, and divisive social or political phrasing.
  - **Examples to avoid**: "blind spot", "kill the process", "master/slave", "sanity check"
  - **Use instead**: "gap", "stop the process", "primary/secondary", "consistency check"

Accessibility means **predictable structure** (headings, lists, meaningful link text).

- Break up long walls of text with headings, short paragraphs, and lists.
- Put the purpose of a paragraph in its **first sentence** when possible.
- Avoid unnecessary decorative formatting; rely on headings and lists instead of unusual Unicode or emoji in body copy.
- Avoid **all caps** and **camelCase** in ordinary prose when they are not official product or API names; they can be harder to read and to announce correctly.

## Consistency

- **[MEDIUM]** Use the same term for the same concept across a page.
- **[MEDIUM]** Do not start every paragraph with **You** when the subject is obviously the reader; rephrase for variety without hiding the actor.

## Punctuation, quotations, and text formatting (@universal)

### Capitalization (@universal)

- **[CRITICAL]** Use sentence case for all headings and titles.
- Use a capital letter after a colon when a complete sentence follows, and for run-in labels such as notes:
  - **Example**: Your plan: Standard
  - **Example**: **Note:** You cannot change the token's session duration or allowlist after creating it.

### Slashes, ampersands, and alternatives (@universal)

- **[CRITICAL]** Do not use **ampersands (&)**.
- Do not use **"and/or"** in body text. Write **and** or **or**, or split into two clauses.
- Use slashes sparingly; prefer **or** or a short list.
- When using slashes, don't put a space before and after the slash.

### Parentheses (@universal)

- **[MEDIUM]** Avoid parentheses for asides; fold the thought into the sentence or add another sentence.

### Quotation marks (@universal)

- **[CRITICAL]** Do not use quotation marks for UI labels, emphasis, or technical values.

### Bold and italics (@universal)

- **[CRITICAL]** **Bold**: use **only** for **UI elements** and **run-in headings in lists**. Use `**double asterisks**`.
- Italics: use sparingly and only for _new terms you are defining_. Use `_single underscores_`.

> **Exception:** Italics are used sparingly and only for new terms you are defining. Avoid using italics for emphasis or other purposes.

**Ordinary (non-code) font** by default:

- **[MEDIUM]** Product, service, and organization names; domain names and home pages in narrative text.
- **[MEDIUM]** URLs the reader should open in a browser: prefer a descriptive link, not a bare URL string (see cross-reference and link guidelines elsewhere in this guide).

If you are describing any of the above explicitly as typed input, pasted output, or a code-level entity, use code font for that occurrence.

### Inline code (@prose @code)

(Markdown: `` `backticks` ``):

- In ordinary prose (not code blocks), use code font for text the reader types or copies verbatim, to show clear boundaries of literals, and to separate identifiers from surrounding words.
- **[CRITICAL]** Use inline code for technical identifiers and literals, including the following when they appear as names or values rather than as general concepts:
  - Attribute names and values; class, method, and function names; language keywords.
  - Command-line utility names; sample command output when you quote it inline.
  - Data types; database objects (for example tables, columns, rows); defined constants and enum values.
  - DNS record types; HTML and XML element names (do not wrap the element name in angle brackets).
  - Environment variables; filenames, extensions, paths, folders, and directories.
  - HTTP verbs; HTTP content-type values; HTTP status codes (put the numeric code and its name in code font, for example `404 Not Found`).
  - IAM role names and similar policy identifiers when they are fixed strings.
  - IP addresses; namespaces and package names when they are literal identifiers; port numbers.
  - Query parameter names and values; placeholders for values the user substitutes.
  - URLs, domains, and other strings when they appear as part of a command, API payload, or configuration literal.
  - Text the user enters into a field when you show the exact string.
- **[CRITICAL]** **UI + code**: When a UI label represents or displays a technical identifier, user-defined name, or system-generated value, use **bold and** code: **`pg_stat_monitor_enable`**, **`my-pg-service`**.
- **[CRITICAL]** For a labeled control whose value is dynamic, put the label in bold and the value in bold + code. Example: In the **Service name** list, select **`prod-pg`**.

**Further inline-code conventions**

- **[MEDIUM]** **Booleans**: format literal values (`true`, `false`, `0`, `1`) as code. If you describe the truth or falsity of a condition in plain English, do not format the words _true_ and _false_ as code.
- **[MEDIUM]** **CLI vs product name**: format the command in code (`avn`, `psql`, `kcat`). Use ordinary font for the human-facing product or project name when spelling differs (for example, the `psql` client and PostgreSQL®).
- **[MEDIUM]** **Email addresses**: code font when the reader must enter or copy the address as machine input; a normal `mailto` link or plain contact text when the address is for human correspondence.
- **[MEDIUM]** **Method names**: omit the class prefix unless it is needed to avoid ambiguity. Recommended: call the `close` method. Not recommended: call the `File.close` method when `close` is enough on its own.
- **[CRITICAL]** **HTTP status codes**: use the term **status code**, not _response code_ or _error code_. Example: Returns an HTTP `503 Service Unavailable` status code. Omit _HTTP_ when context is obvious. For ranges use forms like an HTTP `2xx` status code, status code `400`, or status codes in the `200`–`299` range, keeping numeric parts in code font.
- **[MEDIUM]** **Grammar**: do not use code tokens as inflected English verbs or nouns. Preferred: send a `POST` request. Avoid: using `POST` as a verb for the payload. Avoid possessives or plurals applied directly to a token; add a noun (for example, write the value of the `TOKEN` variable, not a possessive formed on the token itself).
- **[MEDIUM]** Do not put quotation marks around code-styled text unless the quotation marks are part of the literal.

### Full stops or periods (@universal)

Use a full stop at the end of a complete sentence, including in list items that are sentences.

### Introducing examples in a sentence (@prose)

- Use **for example** or **such as** to introduce short examples at the end of a clause, usually after a comma.
- Avoid ending a sentence with **for example,** immediately before a code token if it creates a choppy line; instead introduce the list or code block with a full sentence ending in a colon.

## Document structure and syntax (@universal)

### Sentences and paragraphs (@prose)

- **[CRITICAL]** Keep sentences under **25 words** where possible; split complex thoughts.
- **[CRITICAL]** The **first sentence of the document** must be on **one line**. Ignore line-length warnings for that sentence only.
- **[MEDIUM]** Put the most important information first in a paragraph to support scanning.
- **[CRITICAL]** Remove redundant words and duplicate ideas.

### Headings and titles (@prose)

- Do not use questions as titles (for example, avoid **How does it work?**).
- Use **sentence case** (capitalize only the first word and proper nouns).
- For task topics, use an **imperative** verb in the heading (_Create a service_, _Delete a pool_).
- For concept topics, prefer a **noun phrase** (_Database sharding_).
- Avoid CTA-style article stuffing in titles (_Delete user_ not _Delete a user_ when the article is not a marketing CTA).

| Type | Usage | Examples |
|------|--------|---------|
| Title **without** a verb | Concept or definition | Connection pooling |
| Title **with** a verb | Task or how-to | Create a service, Back up a database |

When you introduce a group of subsections, say **the following sections** (not "below" or ambiguous "these sections").

Maintain logical heading hierarchy (`##` then `###`); do not skip levels for styling.

### One title per page and heading levels

- Use a single level-1 heading (`#` in Markdown) per page, matching the page title in the site.
- Do not use a heading level purely for visual size; use CSS or the theme instead.
- **[MEDIUM]** Avoid repeating the exact page title as a level-2 heading on the same page; prefer a more specific task or section name.

### Articles (*a*, *an*, *the*) in headings and UI

- Include articles in running text and headings when they would appear in normal English (_Create a service_, not _Create service_), including before product nouns when grammar requires them.
- **[MEDIUM]** When an abbreviation is read as letters (**Aiven CLI**), use **an** before it if spoken with a vowel sound (_an Aiven CLI profile_).

## Lists

- Introduce lists with a **complete sentence**, ending with a **period** or **colon** as appropriate.
- Do not introduce a list with a sentence fragment that the list completes.
- **[CRITICAL]** Do not refer to list items as "below"; use **the following**.
- **[MEDIUM]** Use **parallel** grammar for list items.
- **[MEDIUM]** End list items with periods when they are full sentences; omit terminal periods for single words, bare imperatives in a procedure, items that are entirely code, or items that are only links—stay consistent within each list.
- **[CRITICAL]** Use **bold** for **run-in headings** in lists.

### Numbered, lettered, and bulleted lists

- Use a **numbered** list when order matters (procedures, ranked steps, migration phases).
- Use a **bulleted** list when order does not matter (options, non-sequential checks).
- **[MEDIUM]** Do not format a **single** item as a list; use a sentence or a note callout instead.

### Multiple paragraphs inside one list item

- In Markdown, separate paragraphs inside a list item with a blank line and consistent indentation so the item stays one logical step.

### Comma-separated lists in prose

- Use a **serial comma** before the final item in lists of three or more.
- **[MEDIUM]** Avoid ending a list in prose with **etc.**; either list representative items and imply more, or say **such as** with a few concrete examples.

---

## Tables

- Prefer a **list** when the order is not significant; prefer a **table** when readers must compare attributes across entities.
- Keep tables readable in Markdown: short header row, consistent columns, avoid merged cells in source (not supported in common Markdown parsers).
- Introduce each table with a short line of context.
- **[MEDIUM]** Avoid embedding a large table in the middle of a long numbered procedure; link to a reference table or split the procedure.

---

## Links and cross-references

You can link in two main ways:

1. **Link text matches the target page title** (best for reference jumps).
2. **Link text is the action** in the sentence (best for tasks).

Other patterns (for example, "click here") are harder to read and hurt accessibility.

| Example | Do | Don't |
|---------|----|-------|
| **Using the title** | To learn more about the API, see [Aiven API reference](https://api.aiven.io/doc/). | Click [here](https://api.aiven.io/doc/) for the API docs. |
| **Call to action** | Before you start, [install the Aiven CLI](https://aiven.io/docs/tools/cli). | Before you start, you can read [this page](https://aiven.io/docs/tools/cli). |

### Choose links selectively

- **[MEDIUM]** Prefer a short definition or two steps on the page over a link when the detour is small.
- **[MEDIUM]** Do not duplicate the same destination link many times on one page unless sections are far apart or the reader reasonably lands mid-page.

### Cross-reference phrasing

- When a whole sentence introduces a link, prefer **For more information, see …** or **For more information about …, see …** when the reason for the link is not obvious from the link text alone.
- Use **about**, not **on**, in that pattern (_For more information about authentication_, not _For more information on authentication_).

### Unexpected link behavior

- If a link downloads a file, opens an email client, jumps within the page, or opens a new tab, say so in the sentence or link text when it is not obvious.

---

## Procedures (@prose)

### Numbered steps (@prose)

- **[MEDIUM]** Add introductory text only when it orients the reader. Don't add introductory text if the page title or section heading is enough to orient the reader.
- **[MEDIUM]** Do not introduce steps with a sentence fragment that the numbered list completes (_To customize:_ as a standalone line before steps).
- Don't use step results.
- Use "1." for all steps. The Markdown parser will automatically number the steps.
- **[CRITICAL]** Prefix optional steps with **`Optional:`**.

> **Exception:** Use step results only when the reader must verify an outcome or copy a value from the result.

### Console procedures (@prose)

- **[CRITICAL]** Never describe the **type** of UI control in running text.
  - **Don't**: Click the **Save** button.
  - **Do**: Click **Save**.
- **[CRITICAL]** For menus, use **`>`** between levels: Click **Admin** > <ConsoleLabel name="application users"/>.
- **[MEDIUM]** Don't use directional language (**above**, **below**, and **to the right**). Do not describe screen location ("on the left", "at the bottom"); name the control.
- Use **select** when the reader picks from a dropdown or list.
- Use the `ConsoleLabel` component when the console shows an icon plus label: `<ConsoleLabel name="AI insights"/>`. See available names in `src/components/ConsoleIcons/index.tsx`.
- For icon-only controls, use `ConsoleIcon` plus visible text: Click <ConsoleIcon name="user"/> **User information**. Do not show an icon without adjacent text.
- Use **select** or **clear** for checkboxes; use **click** for toggles (for example, click the **Advanced options** toggle to the on position).
- Use qualifying nouns for files: the `config.json` file, the `README.md` document.
- If there is only one action, use a **bullet** and an imperative sentence rather than a one-item numbered list.

### Click chains (@prose)

Chains start with the **first** click in the UI, not the last.

| Example | Do | Don't |
|---------|----|-------|
| **Click chains** | Click **File** > **Save** > **OK** | Click **Save** > **OK** from the **File** menu. |
| **Short chain** | Click **Action** > **Delete**. | Click **Delete** in the **Actions** menu. |

### Sub-steps

- When a step contains sub-steps, treat the parent step like an intro sentence ending in a **colon** or **period**, then indent numbered sub-steps consistently (Markdown sub-lists).

## Code and examples (@code)

### Inline and fenced code (@code)

- **[MEDIUM]** Introduce a code sample with a sentence ending in a **period** or **colon**; use a colon when the code immediately follows.
- **[CRITICAL]** Separate **input** commands from **output** into different fenced blocks.
- Only show output when the reader must verify or copy something from it.
- Do not pluralize or make code tokens possessive; say **the `variables.tf` file's** path, not **the `variables.tf`'s** path.

### Click-to-copy and syntax in examples (@code)

- **[CRITICAL]** In **executable** examples, do not use shell meta-placeholders such as `[]`, `{}`, `|`, or `...`. Use concrete, valid commands or use comments inside the code for omissions.
- For **non-executable** syntax descriptions only, you may use `[optional]` and `{a|b}` style; keep optional parts minimal.

> **Exception:** For non-executable syntax descriptions only, you may use `[optional]` and `{a|b}` style; keep optional parts minimal. Do not use these in executable examples.

### Placeholders (@code)

- **[CRITICAL]** Use `UPPER_CASE_WITH_UNDERSCORES` for placeholders.
- Do not use angle brackets (`<project-id>`) or **`MY_` / `YOUR_` prefixes** (use `PROJECT_ID`, not `MY_PROJECT`).

### Multiple placeholders after a command (@code)

When a command uses more than one placeholder, follow it with a short list introduced by **Replace the following:** (or **Replace** _placeholder_ **with** … for a single value). Each list item uses the placeholder in code font, a colon, and a description that starts with a lowercase letter.

### Omitted lines in code samples (@code)

- **[MEDIUM]** If you omit lines in a sample, use a **comment** in that language (`# …` in shell and YAML, `// …` in many languages). Do not use `...` inside **copy-paste** blocks; ellipses confuse readers and break click-to-copy expectations.

### Domains, emails, and example names (@code @prose)

- **[CRITICAL]** Use IANA reserved domains only (`example.com`, `example.net`, `example.org`, or `example`).
- Use **`name@example.com`** for example email addresses.
- For example people, use **Alex, Amal, Izumi, Jie, Noam, Yuri**; use first initial only for surnames (for example, **Quinn N.**).

## Product names and trademarks

### Product naming rules (@prose)

- **[CRITICAL]** Use the **full product name** at first mention and in sidebar labels; then use the shorter common name.
- **[CRITICAL]** Apply **®** or **™** on the **first** occurrence of the offering and underlying open source project name as required by trademark policy.
- Do not repeat trademark symbols after the first mention in the same document.
- **[CRITICAL]** Do not imply Aiven owns third-party projects: write **Aiven for Apache Kafka®**, not "Aiven's Kafka".

### Official product names (@prose)

- Aiven for Apache Kafka®
- Aiven for Apache Kafka® Connect
- Aiven for Apache Kafka® MirrorMaker 2
- Aiven for ClickHouse®
- Aiven for DataHub
- Aiven for OpenSearch®
- Aiven for PostgreSQL®
- Aiven for Metrics
- Aiven for MySQL
- Aiven for Dragonfly
- Aiven for Thanos™
- Aiven for Grafana®
- Aiven for Valkey™
- Aiven Runtime
- **the Aiven Platform** (title case)
- **the Aiven Console** (short form: **the console**; in full sentences prefer **the Aiven Console**)
- **Aiven Provider for Terraform** (short: **Aiven Terraform Provider**)
- **Aiven Operator for Kubernetes®** (short: **Aiven Kubernetes Operator**; not "K8s")
- **Aiven CLI** (not "the CLI")
- EverSQL by Aiven
- Karapace
- Klaw

## Word list (quick reference)

Prefer these replacements in body text:

| Avoid | Use |
|-------|-----|
| just, simply, easily, quickly | (omit) or neutral verb |
| utilize, leverage | use |
| i.e., e.g. | that is, for example |
| and/or | and … or … (rewrite) |
| below (for cross-refs) | the following |
| master / slave | primary / secondary (or domain-specific neutral terms) |
| sanity check | consistency check |
| kill (a process) | stop |
