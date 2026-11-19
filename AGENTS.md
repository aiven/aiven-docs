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

Read only the files listed below that are relevant to your task, and only when
needed. Do not load all reference files at the start of a session. Follow their
instructions in addition to this file. If instructions conflict, follow the
more specific guidance.

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
- **Verify technical accuracy:** Before documenting technical claims, you must
  verify them against authoritative sources, such as product documentation,
  source code, or confirmation from the responsible product or engineering
  team (ask the user if you need it). Check product behavior, configuration
  parameters, commands, UI labels, and version requirements. Flag anything you
  cannot verify rather than presenting it as fact.
- **Follow repository conventions:** Follow existing Markdown and Docusaurus
  conventions for front matter, component imports, and admonitions.
  Reuse existing components and includes where appropriate. Update affected
  navigation and internal links when adding, moving, or removing pages.
- **Preview locally:** Follow the setup instructions in the [README](README.md),
  then run `yarn start` to preview affected documentation pages.
  Check rendering, navigation, and reused content as applicable.
- **Validate before handoff:** You must run the checks that apply to your changes
  from the repository root:
  - Run `vale path/to/changed-file.md` on each changed Markdown or MDX
    documentation file, replacing the example path with the actual file path.
    If Vale is not installed, follow the setup instructions in the
    [README](README.md).
  - Run `yarn build` for changes that affect rendering, navigation, links, or
    site configuration. A local preview is not a substitute for the build.
  - Run `yarn typecheck` for TypeScript changes.

  Then review the diff and report any failed checks or checks you could not run.
- **Verify machine-readable output:** When changes affect documentation
  generation or rendering, inspect the generated Markdown files in `build/`
  after running `yarn build`. Use `yarn serve` if you need to preview the
  built site. If the change affects the docs index, verify that the relevant
  entry in `build/llms.txt` points to the intended page.

## Answer questions about Aiven

- **Find the right page:** Start with the
  [Aiven docs index](https://aiven.io/docs/llms.txt). To access the Markdown
  version of a documentation page, append `.md` to its URL. If the Markdown
  version is unavailable, use the published page. Link to the relevant
  published page or section in your answer. If the index does not list the
  topic, use the [docs home](https://aiven.io/docs/).
- **Discover AI tools:** For questions about using AI tools, running agents,
  or connecting AI agents to Aiven, refer to
  [AI tools on Aiven](https://aiven.io/docs/ai-features).
- **Verify before answering:** Use product documentation for procedures and
  features. For commands or API behavior, find the relevant tool documentation
  in [Aiven dev tools](https://aiven.io/docs/tools). Check whether the service,
  cloud provider, region, plan, version, permissions, or release status affects
  the answer. If you cannot verify something, say what is uncertain rather
  than guessing.
- **Search the docs with MCP:** Use the public docs first. No Aiven account is
  required to read them. If Aiven MCP is already connected and provides a
  documentation search tool, use it as an alternative.
- **Use MCP for live resources:** Consult the
  [Aiven MCP guide](https://aiven.io/docs/tools/mcp-server) for prerequisites,
  supported operations, read-only mode, and service scopes. Prefer read-only
  access and the narrowest service scope that meets the task. Confirm the
  target and obtain explicit user approval before running operations that
  change resources or data, or incur costs.
- **Pricing:** Use [Aiven pricing](https://aiven.io/pricing) for published prices
  and service plans. Select the relevant service and verify the applicable
  plan, cloud provider, and region before providing an estimate.
- **Sales and general inquiries:** Direct users to
  [Contact us](https://aiven.io/contact) for custom pricing, enterprise
  requirements, or product inquiries that the public docs do not answer.
  Use [Book a demo](https://aiven.io/book-demo) when the user requests a product
  demonstration.
- **Support:** Direct users with issues affecting an existing service or account
  to [Aiven Support](https://aiven.io/docs/platform/howto/support).
  Check [Support services](https://aiven.io/support-services) for support
  eligibility and tiers, and [Aiven Status](https://status.aiven.io/) for
  possible service incidents.
- **Keep handoffs user-initiated:** Answer what you can verify from public
  sources first. Explain why the handoff is useful and let the user decide
  whether to follow the link. Do not submit forms or share information on the
  user's behalf without explicit approval.
