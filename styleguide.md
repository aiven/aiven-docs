# Aiven documentation style guide

<!-- vale off -->

This guide is the single source of truth for writing and reviewing documentation in the [Aiven docs](https://github.com/aiven/aiven-docs) repository. The site is built with Docusaurus 3 and published at [aiven.io/docs](https://aiven.io/docs). It covers the Aiven Platform and managed services (for example, Apache Kafka®, PostgreSQL®, OpenSearch®, MySQL, ClickHouse®, Apache Flink®, Grafana®, and others).

**How to use this guide**

- Apply **[CRITICAL]** rules in every change. Treat **[MEDIUM]** rules as strong defaults; justify intentional exceptions in review.
- Keep examples copy-paste safe, use approved product names, and run [Vale](https://vale.sh/) on files you edit (see [CONTRIBUTING.md](./CONTRIBUTING.md)).

---

## Introduction, scope, and how to use this guide

These guidelines apply to all documentation files in the repository. When reviewing pull requests, check compliance based on content type:

- **Universal rules**: All documentation content
- **Prose rules**: Explanatory and conceptual content
- **Code rules**: Code blocks, examples, and inline code
- **UI rules**: Aiven Console instructions and procedures

---

## Priority system

Rules are tagged for importance:

- **[CRITICAL]**: Must follow; request changes on violations in new or modified content.
- **[MEDIUM]**: Strong convention; request changes when several appear in the same change.

### Enforcement guidelines

When reviewing PRs:

- Focus on new or changed content; do not re-review unchanged legacy text unless the PR touches it.
- Request changes for all **[CRITICAL]** violations and for multiple **[MEDIUM]** violations in the same area.
- Suggest improvements for lower-priority polish.

---

## Voice and tone

Documentation is scanned more than it is read line by line. Aim for clarity and directness over flourish.

- Go straight to the point; include only what the reader needs for the task or concept.
- **[MEDIUM]** Chunk content into short sections with clear headings.
- Keep paragraphs to **3–5 sentences** where possible.
- Use lists to break up dense prose when items are parallel options, steps, or examples.
- Concept topics (architecture, background) may be longer; task and reference topics should stay minimal. **Straight to the point does not mean incomplete.**
- **[CRITICAL]** Avoid filler or judgmental words such as **just**, **easily**, **simply**, and **quickly** in procedures and descriptions of difficulty.
  - **Example**: Write **Click Save**, not "Just click **Save**".
  - **Example**: Write **You can configure…**, not "You can easily configure…".

**[MEDIUM]** Remove sentences that do not add information (for example, avoid generic openers such as "This section describes how to…" when the heading already states the topic).

### Techniques for revision

- **[MEDIUM]** If a sentence feels overloaded, ask what single claim it makes; split or delete anything that does not support that claim.
- **[MEDIUM]** Read critical steps aloud; if a sentence is awkward spoken, simplify it.
- **[MEDIUM]** Vary sentence openings so every line does not begin with "You can" or "To …".

---

## Writing for a global audience

- Use **US English** and American spelling.
- **[MEDIUM]** Prefer simple, direct wording for international readers; avoid idioms and slang.
- **[MEDIUM]** Use phrasal verbs sparingly (for example, prefer "connects" over "hooks up") when a single verb is clear.
- **[MEDIUM]** Use consistent terminology; repeat a noun if it aids clarity.
- **[CRITICAL]** Avoid unnecessarily complex vocabulary; use **use** instead of "utilize" or "leverage".
- **[MEDIUM]** Avoid weasel words ("often", "probably", "possibly") when you can state facts or scope instead.
- **[MEDIUM]** Avoid **need** and **must** where the imperative is clearer (_Create a project_ rather than _You must create a project_).
- **[MEDIUM]** Use a serial comma before the final item in a list of three or more items.
- **[MEDIUM]** Use prepositions consistently (for example, pick either "on the Features page" or "on the Features screen" and stay consistent within a doc).

For accessibility of plain language (short sentences, defined terms), see [Inclusive language](#inclusive-language).

### Simple English and common mistakes

| Category | Do | Don't |
|----------|----|-------|
| **Simple English** | Use the Metrics API. | Utilize the Metrics API. |
| **Simple English** | Import the item when the icon is green. | The icon has turned green therefore meaning you can now import the item. |
| **Simple English** | Import the catalog when the icon is green. | You need to import the catalog when the icon is green. |
| **Phrasal verbs** | The dialog appears. | The dialog pops up. |
| **Weasel word** | Use this endpoint to implement… | This endpoint is often useful when implementing… |
| **Judging complexity** | To create a service, click… | To create a service, simply click… |
| **Latin** | Set a value, for example `32`. | You can set a value, e.g. `32`. |
| **Parallelism** | Add points to or subtract them from… | Add or subtract points from… |
| **Punctuation** | The service can be active, inactive, or blocked. | The service can be active, inactive or blocked. |

### Jargon

- Prefer the reader's terms when they are standard in the domain; introduce specialized terms briefly on first use.
- Define acronyms on first use if the acronym will appear again in the document.

### Modifiers and simpler phrasing

- **[MEDIUM]** Do not stack more than two nouns as modifiers in front of another noun (_Aiven for Apache Kafka® topic catalog_ is fine; avoid four- or five-noun chains).
- **[MEDIUM]** Place **only** immediately before the word or phrase it limits (_Request only one token_, not _Only request one token_ unless you mean exclusivity of the action itself).
- **[MEDIUM]** Prefer one strong verb over a vague verb plus adverb (_connects_ rather than _is able to connect_).

---

## Inclusive language

- **[CRITICAL]** Avoid ableist, violent or militaristic, and divisive social or political phrasing.
  - **Examples to avoid**: "blind spot", "kill the process", "master/slave", "sanity check"
  - **Use instead**: "gap", "stop the process", "primary/secondary", "consistency check"
- Write accessible prose: favor clear, concrete language; avoid unnecessary figurative harm; when discussing disability or accessibility, follow respectful, person-centered usage and avoid metaphors that treat disability as a defect.

Accessibility also means **predictable structure** (headings, lists, meaningful link text). See [Links and cross-references](#links-and-cross-references) for link text.

### Ease of reading and assistive technology

- **[MEDIUM]** Break up long walls of text with headings, short paragraphs, and lists.
- **[MEDIUM]** Put the purpose of a paragraph in its **first sentence** when possible.
- **[MEDIUM]** Avoid unnecessary decorative formatting; rely on headings and lists instead of unusual Unicode or emoji in body copy.
- **[MEDIUM]** Avoid **all caps** and **camelCase** in ordinary prose when they are not official product or API names; they can be harder to read and to announce correctly.

---

## Active voice, tense, and timeless wording

- **[MEDIUM]** Write in **active voice** and **present tense** for procedures and descriptions of steady behavior.
  - **Avoid**: "The service will be configured by the system"
  - **Use**: "The system configures the service"
- You may use passive voice when the actor is unimportant or is the system itself.
- Avoid uncertain modals such as **might**, **could**, **ought**, or **shall** when a definite outcome is documented.
- **[CRITICAL]** Avoid temporal anchors and vague time framing that go stale or confuse translators: **"now"**, **"currently"**, **"in the future"**, **"yet"**, and **"eventually"**. Prefer timeless phrasing or specific release notes or version statements when time matters.

### Active voice

Use _you_ as the subject when it clarifies who acts. Prefer active constructions.

| Do | Don't |
|----|-------|
| The message window appears. | The message window is displayed. |
| You can test notifications using… | Testing notifications can be done using… |
| The topic is created. | You have created the topic. |

### Tense and certainty

| Type | Do | Don't | Note |
|------|----|-------|------|
| **Future** | Click **Create** to start the import. | Click **Create** and the import will start. | Avoid vague sequencing. |
| **Future** | Define a filter. | You will now define a filter. | Avoid "now" with future. |
| **Future** | Click **Save**. | You will need to click **Save**. | Prefer imperative. |
| **Title** | Configure the service | Configuring the service | Imperative for task headings. |
| **Title** | Add a user | To add a user | Avoid infinitive stack as a heading. |
| **Uncertainty** | The process starts in about 20 seconds. | The process might start in 20 seconds. | Avoid "might" for documented behavior. |

### Timeless product wording

Product and reference docs should read correctly months later. Time-based words ("new", "now", "currently", "latest") often become wrong after the next release.

| Do | Don't |
|----|-------|
| These parameters tune the replication factor. | These new parameters tune the replication factor. |
| The following options are not supported: | The following options are not currently supported: |
| The integration supports these auth modes: | The integration now supports these auth modes: |

**Exceptions:** Release notes, blog posts, and time-stamped announcements may use time language when accurate. Procedural lines such as "The service stops soon after you run the delete command" are fine when they describe an immediate transition.

**[MEDIUM]** In capability docs, avoid promising roadmap items. Do not document **future** features or SKUs unless they are approved for public mention and tied to a named release or date in the same document.

---

## Person

- Address the reader as **you** in procedural and conceptual docs unless a different subject is clearer (for example, "the connector sends…").
- Avoid **we** unless it refers unambiguously to Aiven and adds clarity; do not use **we** to mean "you and the reader."
- Do not use **please** in procedures; see [Politeness](#politeness-and-tone-minor-mechanics) under punctuation and formatting.

### Consistency

- **[MEDIUM]** Use the same term for the same concept across a page (for example, pick either **project** or **organization** per context, not both for the same object).
- **[MEDIUM]** Do not start every paragraph with **You** when the subject is obviously the reader; rephrase for variety without hiding the actor.

---

## Punctuation, quotations, and text formatting

### Capitalization after colons

Use a capital letter after a colon when a complete sentence follows, and for run-in labels such as notes:

- Your plan: Standard
- **Note:** This is my note.

### Slashes, ampersands, and alternatives

- **[CRITICAL]** Do not use **ampersands (&)** or **"and/or"** in body text. Write **and** or **or**, or split into two clauses.
- Use slashes sparingly; prefer **or** or a short list.

### Parentheses

- **[MEDIUM]** Avoid parentheses for asides; fold the thought into the sentence or cut it.

### Quotation marks

- **[CRITICAL]** Do not use quotation marks for UI labels, emphasis, or technical values.

### Bold, italics, and inline code

- **[CRITICAL]** **Bold**: use **only** for **UI elements** and **run-in headings in lists**. Use `**double asterisks**`.
- Italics: use sparingly for _new terms you are defining_. Use `_single underscores_`.
- **[CRITICAL]** Inline code (`` `backticks` ``): use for attribute names and values, commands, CLI utilities, data types, database objects, DNS types, enums, environment variables, paths, filenames, HTTP methods and status codes, IP addresses, placeholder names in prose, and URLs inside commands.
- **UI + code**: When a UI control name is also a technical identifier, use bold + code: **`pg_stat_monitor_enable`**.

| Example | Do | Don't |
|---------|----|-------|
| UI element | Click **Account** > **Settings**. | Click "Account" and "Settings". |
| Code | Set `db_id` to `ABC`. | Set the "db_id" parameter to _ABC_. |
| Strong negation in UI | Do **not** click **Delete**. | Do _not_ click **Delete**. |

### Full stops (periods)

Use a full stop at the end of a complete sentence, including in list items that are sentences.

**Titles and UI labels** often omit a final period even when they read like a phrase (for example, dialog titles):

- Action required
- Confirm selection
- Integrating with the service

### Politeness and tone (minor mechanics)

Do not use **please** or other unnecessary politeness in instructions.

### Documentation element summary

| Information type | Style |
|------------------|--------|
| Interface element | Bold (`**`) |
| User input / typed values | Code (`` ` ``) |
| First introduction of a new term | Italics (`_`) |

### Latin abbreviations

- **[CRITICAL]** Do not use **i.e.** or **e.g.** Use **that is** or **for example**.

### Introducing examples in a sentence

- Use **for example** or **such as** to introduce short examples at the end of a clause, usually after a comma.
- **[MEDIUM]** Avoid ending a sentence with **for example,** immediately before a code token if it creates a choppy line; instead introduce the list or code block with a full sentence ending in a colon.

---

## Document structure and syntax

### Sentences and paragraphs

- **[CRITICAL]** Keep sentences under **25 words** where possible; split complex thoughts.
- **[CRITICAL]** The **first sentence of the document** must be on **one line**. Ignore line-length warnings for that sentence only.
- **[MEDIUM]** Put the most important information first in a paragraph to support scanning.
- **[MEDIUM]** Remove redundant words and duplicate ideas.

### Headings and titles

- Do not use questions as titles (for example, avoid **How does it work?**).
- Use **sentence case** (capitalize only the first word and proper nouns).
- For task topics, use an **imperative** verb in the heading (_Create a service_, _Delete a pool_).
- For concept topics, prefer a **noun phrase** (_Database sharding_).
- Avoid CTA-style article stuffing in titles (_Delete user_ not _Delete a user_ when the article is not a marketing CTA).

| Type | Usage | Example |
|------|--------|---------|
| Title **without** a verb | Concept or definition | _Connection pooling_ |
| Title **with** a verb | Task or how-to | _Create a service_, _Back up a database_ |

| Do | Don't | Comment |
|----|-------|---------|
| Delete user | Delete a user | Avoid marketing-style CTAs in titles. |

Use **`Optional:`** at the start of an **optional procedure step** or optional section heading when supported by your template.

When you introduce a group of subsections, say **the following sections** (not "below" or ambiguous "these sections").

Maintain logical heading hierarchy (`##` then `###`); do not skip levels for styling.

### One title per page and heading levels

- Use a single level-1 heading (`#` in Markdown) per page, matching the page title in the site.
- Do not use a heading level purely for visual size; use CSS or the theme instead.
- **[MEDIUM]** Avoid repeating the exact page title as a level-2 heading on the same page; prefer a more specific task or section name.

### Articles (*a*, *an*, *the*) in headings and UI

- Include articles in running text and headings when they would appear in normal English (_Create a service_, not _Create service_), including before product nouns when grammar requires them.
- **[MEDIUM]** When an abbreviation is read as letters (**Aiven CLI**), use **an** before it if spoken with a vowel sound (_an Aiven CLI profile_).

---

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

## Procedures and the Aiven Console

### Procedures (numbered steps)

- **[MEDIUM]** Add introductory text only when it orients the reader; otherwise start with the first step.
- Use step results only when the reader must verify an outcome or copy a value.
- Number steps in execution order.
- **[CRITICAL]** Prefix optional steps with **`Optional:`**.

### Console and UI copy

- **[CRITICAL]** Never describe the **type** of UI control in running text.
  - **Avoid**: Click the **Save** button.
  - **Use**: Click **Save**.
- **[CRITICAL]** For menus, use **`>`** between levels: Click **Admin** > <ConsoleLabel name="application users"/>.
- **[MEDIUM]** Do not describe screen location ("on the left", "at the bottom"); name the control.
- Use **select** when the reader picks from a dropdown or list.
- **[MEDIUM]** Use the `ConsoleLabel` component when the console shows an icon plus label: `<ConsoleLabel name="AI insights"/>`. See available names in `src/components/ConsoleIcons/index.tsx`.
- For icon-only controls, use `ConsoleIcon` plus visible text: Click <ConsoleIcon name="user"/> **User information**. Do not show an icon without adjacent text.
- Use **select** / **clear** for checkboxes; use **click** for toggles (for example, click the **Advanced options** toggle to the on position).
- Use qualifying nouns for files: the `config.json` file, the `README.md` document.

### Click chains

Chains start with the **first** click in the UI, not the last.

| Example | Do | Don't |
|---------|----|-------|
| **Click chains** | Click **File** > **Save** > **OK** | Click **Save** > **OK** from the **File** menu. |
| **Short chain** | Click **Action** > **Delete**. | Click **Delete** in the **Actions** menu. |

### Directional language

- **[MEDIUM]** Avoid **above**, **below**, and **to the right**; name the section or UI control instead.

### Procedure introductions and structure

- Introduce a procedure when the heading alone is not enough context; do not repeat the heading as a filler sentence.
- End the intro with a **colon** if it immediately precedes the steps, or a **period** if a note sits between the intro and the steps.
- **[MEDIUM]** Do not introduce steps with a sentence fragment that the numbered list completes (_To customize:_ as a standalone line before steps).

### Single-step "procedures"

- If there is only one action, use a **bullet** and an imperative sentence rather than a one-item numbered list, unless the single step is part of a longer numbered flow.

### Sub-steps

- When a step contains sub-steps, treat the parent step like an intro sentence ending in a **colon** or **period**, then indent numbered sub-steps consistently (Markdown sub-lists).

### Order inside a complex step

1. State the user-facing action.
2. Show the command or API call, if any.
3. Explain placeholders (see [Code and examples](#code-and-examples)).
4. Show output only when the reader must verify or copy from it.
5. Describe the outcome in prose if it is not obvious.

---

## Code and examples

### Inline and fenced code

- **[MEDIUM]** Introduce a code sample with a sentence ending in a **period** or **colon**; use a colon when the code immediately follows.
- **[MEDIUM]** Separate **input** commands from **output** into different fenced blocks.
- Only show output when the reader must verify or copy something from it.
- **[MEDIUM]** Do not pluralize or make code tokens possessive; say **the `variables.tf` file's** path, not **the `variables.tf`'s** path.

### Click-to-copy and syntax in examples

- **[CRITICAL]** In **executable** examples, do not use shell meta-placeholders such as `[]`, `{}`, `|`, or `...`. Use concrete, valid commands or use comments inside the code for omissions.
- For **non-executable** syntax descriptions only, you may use `[optional]` and `{a|b}` style; keep optional parts minimal.

### Placeholders

- **[CRITICAL]** Use `UPPER_CASE_WITH_UNDERSCORES` for placeholders.
- Do not use angle brackets (`<project-id>`) or **`MY_` / `YOUR_` prefixes** (use `PROJECT_ID`, not `MY_PROJECT`).

### Multiple placeholders after a command

When a command uses more than one placeholder, follow it with a short list introduced by **Replace the following:** (or **Replace** _placeholder_ **with** … for a single value). Each list item uses the placeholder in code font, a colon, and a description that starts with a lowercase letter.

### Omitted lines in code samples

- **[MEDIUM]** If you omit lines in a sample, use a **comment** in that language (`# …` in shell and YAML, `// …` in many languages). Do not use `...` inside **copy-paste** blocks; ellipses confuse readers and break click-to-copy expectations.

### Domains, emails, and example names

- **[CRITICAL]** Use IANA reserved domains only (`example.com`, `example.net`, `example.org`, or `example`).
- Use **`name@example.com`** for example email addresses.
- For example people, use **Alex, Amal, Izumi, Jie, Noam, Yuri**; use first initial only for surnames (for example, **Quinn N.**).

---

## Product names and trademarks

**Product naming rules**

- **[CRITICAL]** Use the **full product name** at first mention and in sidebar labels; then use the shorter common name.
- **[CRITICAL]** Apply **®** or **™** on the **first** occurrence of the offering and underlying open source project name as required by trademark policy.
- **[CRITICAL]** Do not repeat trademark symbols after the first mention in the same document.
- **[CRITICAL]** Do not imply Aiven owns third-party projects: write **Aiven for Apache Kafka®**, not "Aiven's Kafka".

**Official product names**

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
- **the Aiven Platform** (title case)
- **the Aiven Console** (short form: **the console**; in full sentences prefer **the Aiven Console**)
- **Aiven Provider for Terraform** (short: **Aiven Terraform Provider**)
- **Aiven Operator for Kubernetes®** (short: **Aiven Kubernetes Operator**; not "K8s")
- **Aiven CLI** (not "the CLI")
- EverSQL by Aiven
- Karapace
- Klaw

---

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

---

## Document maintenance

- **Last updated:** May 2026 (editorial consolidation).
- **Maintainers:** Documentation guild in the Aiven docs repository; propose changes through pull requests like any other doc.

---

## Contributing and tooling

This repository is partly enforced by [Vale](https://vale.sh/). See [CONTRIBUTING.md](./CONTRIBUTING.md) for install steps, line length conventions for reviews, and commit message format.

The guide is based in part on [Google developer documentation style](https://developers.google.com/style); where this document is stricter or different, **this document wins**.
