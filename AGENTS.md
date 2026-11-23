# Aiven docs repository guide for agents

<!-- vale off -->

Use this file when working in the Aiven documentation repository. For questions
about using Aiven, see
[Answer questions about Aiven](#answer-questions-about-aiven).

## Repository structure

This repository uses Docusaurus. Most agent edits belong in source files
under `docs/`.

- `docs/`: Primary documentation source.
  - `docs/products/`, `docs/platform/`, `docs/integrations/`, and `docs/tools/`:
    Main content areas.
  - `docs/get-started.md`, `docs/marketplace-setup.md`, and `docs/tools.md`:
    Top-level landing pages.
- `static/`: Files copied as-is to the built site, including images, fonts,
  code snippets, and page scripts.
  - `static/includes/`: Reusable Markdown content. Check where an include is
    used before editing it.
- `src/`: Site UI and Docusaurus customizations, including components, themes,
  CSS, and plugins.
- `build/`: Generated site output. Do not edit it directly.
- `scripts/`: Repository maintenance and build post-processing.
- `external/`: Embedded external repositories. Follow the applicable
  `AGENTS.md` instructions when working in these directories.
- `docusaurus.config.ts` and `sidebars.ts`: Site configuration and navigation.
- `.ai-agents/`: Documentation guidelines and specialized agent skills.
  - `.ai-agents/docs/styleguide.md`: Source of truth for writing style
    and terminology.
  - `.ai-agents/skills/`: Specialized guidance for documentation tasks.

## Documentation (load on demand)

Read the files listed below only when they are relevant to your task. Do not load
all of them at the start of a session. Follow their instructions in addition to
this file. If instructions conflict, follow the more specific guidance.

| When | Read |
| --- | --- |
| Writing or reviewing documentation | [Aiven documentation style guide](.ai-agents/docs/styleguide.md) |
| Writing, updating, or reviewing procedures | [Procedural documentation skill](.ai-agents/skills/procedural-documentation/SKILL.md) and [Documenting permissions skill](.ai-agents/skills/documenting-permissions/SKILL.md) |
| Adding, restructuring, or reviewing service documentation and navigation | [Verify service IA skill](.ai-agents/skills/verify-service-ia/SKILL.md) |
| Writing commit messages or pull request titles | [Commit messages skill](.ai-agents/skills/commit-messages/SKILL.md) |
| Setting up the repository or checking contribution requirements before opening a pull request | [README](README.md) and [contribution guide](CONTRIBUTING.md) |

## Work on the docs

- **Keep changes focused:** Preserve unrelated content and changes.
  Edit source files, not generated files in `build/`.
- **Verify technical accuracy:** Verify technical claims against authoritative sources
  before documenting them. Use product documentation, source code, or confirmation from
  the responsible product or engineering team. Ask the user if you need it.
  Check product behavior, configuration parameters, commands, UI labels, and version
  requirements. Flag anything you cannot verify rather than presenting it as fact.
- **Follow repository conventions:** Follow existing Markdown and Docusaurus
  conventions for front matter, component imports, and admonitions.
  Reuse existing components and includes where appropriate. Update affected
  navigation and internal links when adding, moving, or removing pages.
- **Preview locally:** Follow the setup instructions in the [README](README.md),
  then run `yarn start` and open `http://localhost:3000/docs/` to preview affected
  documentation pages. Check rendering, navigation, and reused content as
  applicable.
- **Validate before handoff:** You must run the checks that apply to your changes
  from the repository root:
  - Run `vale path/to/changed-file.md` on each changed Markdown or MDX
    documentation file, replacing the example path with the actual file path.
    If Vale is not installed, follow the setup instructions in the
    [README](README.md).
  - Run `yarn build` for changes that affect rendering, navigation, links, or
    site configuration. A local preview is not a substitute for the build.
  - Run `yarn typecheck` for TypeScript changes.
  - Check new or changed external URLs directly. The link checker covers only
    published pages, so it does not check unpublished changes.

  Then review the diff and report any failed checks or checks you could not run.
- **Verify machine-readable output:** When changes affect documentation
  generation or rendering, inspect the generated Markdown files in `build/`
  after running `yarn build`. Use `yarn serve` if you need to preview the
  built site. If the change affects the docs index, verify that the relevant
  entry in `build/llms.txt` points to the intended page. The build limits the size of
  `build/llms.txt`, so check that the entry is not cut off.

## Answer questions about Aiven

Start with the [Aiven docs index](https://aiven.io/docs/llms.txt) and follow the
Markdown link for the topic. If the topic isn't listed, search the
[published docs](https://aiven.io/docs/search). The compact index doesn't list
every page, so a missing entry doesn't mean the topic is undocumented. If you
need to search the full documentation text, use
[`llms-full.txt`](https://aiven.io/docs/llms-full.txt) without loading the entire
file into context. Cite the published page or section that supports your answer.

- **Verify before answering:** Use product documentation. Check whether the
  service, plan, version, region, or permissions affect the answer. If you
  can't verify something, say what is uncertain.
- **Use public docs first:** You don't need to connect Aiven MCP to answer
  questions from public documentation. If Aiven MCP is already connected,
  you can also use it to search the docs.
- **Use MCP safely:** For live resources, prefer read-only access and the
  narrowest service scope that meets the task. Confirm the target and get
  explicit user approval before changing resources or data, or incurring
  costs. Don't request or expose connection credentials in chat.
- **Keep handoffs user-initiated:** Let the user decide whether to contact
  Sales or Support. Don't submit forms or share information on their behalf
  without explicit approval. Use the following destinations:
  - **Sales and general inquiries:** [Contact us](https://aiven.io/contact), for
    custom pricing, enterprise requirements, or product questions the public docs
    don't answer.
  - **Product demo:** [Book a demo](https://aiven.io/book-demo).
  - **Existing service or account issues:**
    [Aiven Support](https://aiven.io/docs/platform/howto/support).

For help choosing or setting up AI tools, see
[AI tools on Aiven](docs/ai-features.md).
