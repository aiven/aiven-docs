# AI agents configuration

<!-- vale off -->
This is a shared configuration directory for AI tools working in this repository.
It contains the rules, skills, documentation, and other configuration files for agents.
Every tool-specific directory contains symlinks that point back to the
relevant files in this directory, meaning the same configuration is applied
to all tools.

## Structure

In the repository root, the `AGENTS.md` file guides agents on how to work
in the Aiven docs repository.

In the `.ai-agents` directory are the following:

- `agents/`: Custom personas configured for specific tasks and workflows.
- `commands`: Custom prompts for common tasks that are triggered by users
  by typing `/` in chat.
- `docs`: Documentation for agents that can be referenced in custom agents, commands,
  rules, and skills.
- `rules`: Default instructions that should always be followed by agents.
- `skills`: Detailed instructions for specialized tasks that can include scripts,
  examples, and other resources.

## Tool integration

| Tool | Config Directory | Main Instructions |
|------|------------------|-------------------|
| OpenCode | `.opencode/` | `opencode.json`, which points to `AGENTS.md` |
| Cursor | `.cursor/` | `AGENTS.md` |
| VS Code/GitHub Copilot | `.github/` | `.github/copilot-instructions.md` |
| Claude Code | `.claude/` | `CLAUDE.md`, which points to `AGENTS.md` |

## Add configuration files

To add an agent, command, doc, rule, or skill, create a new file in the
appropriate folder under `.ai-agents/`. The symlinks in each tool's directory
automatcally makes them avaialble to those tools.

To add a configuration file that only applies to one specific tool,
create a new file in that tool's directory.
