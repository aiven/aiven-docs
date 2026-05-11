# Copilot instructions for Aiven docs

<!-- vale off -->

The full **Aiven documentation style guide** lives in the repository root: **[`styleguide.md`](../styleguide.md)**. GitHub Copilot and other assistants should treat that file as the single source of truth for voice, structure, UI wording, code samples, product names, and review priorities.

## Non-negotiables (quick checklist)

When editing or generating docs in this repo:

1. **[CRITICAL]** Keep sentences short (under ~25 words); put the **first sentence of each page on one line** (ignore line-length warnings for that line only).
2. **[CRITICAL]** No filler or judgmental wording: **just**, **easily**, **simply**, **quickly** (and similar).
3. **[CRITICAL]** Use **use**, not "utilize" or "leverage"; no **i.e.** / **e.g.** (use **that is** / **for example**); no **&** or **and/or** in prose.
4. **[CRITICAL]** **Bold** only for **UI elements** and **run-in list headings**; no quotation marks for labels or emphasis.
5. **[CRITICAL]** Inclusive, non-ableist language; no violent or militaristic metaphors; avoid temporal fluff (**now**, **currently**, **in the future**, **yet**, **eventually**) unless tied to a specific release fact.
6. **[CRITICAL]** Product names and **®** / **™** on first mention per [`styleguide.md`](../styleguide.md); never write "Aiven's Kafka" for third-party brands.
7. **[CRITICAL]** Console steps: name controls as users see them (**Click Save**); use **`>`** in menu paths; optional steps start with **`Optional:`**; use **`ConsoleLabel`** / **`ConsoleIcon`** as described in the style guide.
8. **[CRITICAL]** Executable examples: no `[]`, `{}`, `|`, or `...` placeholders; use **`UPPER_SNAKE_CASE`** placeholders; IANA **`example.*`** domains and **`name@example.com`** for sample email.
9. **[MEDIUM]** Separate command and output into different fenced blocks; introduce each code block with a sentence ending in `.` or `:`.

For tables, links, lists, heading rules, and the full product list, open **`styleguide.md`**.
