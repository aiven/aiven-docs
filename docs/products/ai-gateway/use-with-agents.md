---
title: Use AI gateway with coding agents
sidebar_label: Use with coding agents
early: true
---

import RequirementsPanel from "@site/src/components/RequirementsPanel";
import AIGatewayModelInfo from "@site/src/components/AIGatewayModelInfo";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Connect Claude Code, Codex, Pi, OpenCode, or OMP to Aiven AI gateway with your API key.

<RequirementsPanel
items={[
{
label: 'Permissions',
values: [
'`project:ai_gateway_keys:write`',
'`project:ai_gateway_keys:read`',
`role:project:admin`,
`role:project:manager`,
],
},
]}
/>

## Prerequisites

- AI gateway [enabled for your organization](/docs/products/ai-gateway).
- An [API key](/docs/products/ai-gateway/api-keys).

## Set up and launch with `aiven-ai-gateway`

The `aiven-ai-gateway` launcher supports Claude Code, Codex, Pi, OpenCode, and OMP.
Install the coding agent you want to use and the launcher.
On macOS or Linux, install the launcher with Homebrew:

```bash
brew install aiven/tap/aiven-ai-gateway
```

Run setup before launching a session:

```bash
aiven-ai-gateway setup claude
aiven-ai-gateway launch claude
```

`setup` writes persistent configuration under your home directory.
It checks model access and sends one minimal request for each API protocol the coding
agent uses, limited to one output token. These requests can incur usage.
Enter your API key at the hidden terminal prompt, or use a saved key.
Keep API keys out of command arguments and agent conversations.

Setup previews configuration changes and creates backups of changed existing files.
It preserves other providers and settings.
When asked whether to make Aiven the default, press Enter to keep your native default.
`--yes` also keeps the native default and approves the displayed setup changes.
Setup does not start a coding session.

`launch` starts a session using compatible Aiven configuration.
It does not install persistent provider configuration or change native defaults.
If configuration is missing or incompatible, run the setup command printed in the error.
Compatible manual configuration also satisfies the setup requirement.

| Coding agent | Persistent setup                  | Launch a session                   |
| ------------ | --------------------------------- | ---------------------------------- |
| Claude Code  | `aiven-ai-gateway setup claude`   | `aiven-ai-gateway launch claude`   |
| Codex        | `aiven-ai-gateway setup codex`    | `aiven-ai-gateway launch codex`    |
| Pi           | `aiven-ai-gateway setup pi`       | `aiven-ai-gateway launch pi`       |
| OpenCode     | `aiven-ai-gateway setup opencode` | `aiven-ai-gateway launch opencode` |
| OMP          | `aiven-ai-gateway setup omp`      | `aiven-ai-gateway launch omp`      |

In a terminal, `aiven-ai-gateway setup` lets you select one or more coding agents.
`aiven-ai-gateway launch` lets you select one installed agent.
Bare `aiven-ai-gateway` prints help.
Without an interactive terminal, specify the coding agent.
Pass native arguments after `--`, for example `aiven-ai-gateway launch codex -- resume`.

For Claude Code, launcher sessions retain canonical user and project settings.
Custom fields in `~/.claude/aiven.settings.json` are available through the direct command
`claude --settings ~/.claude/aiven.settings.json`.
Launcher sessions do not load arbitrary custom fields from that dedicated file.

### Install with npm

With Node.js 20 or later, install the launcher from npm instead of Homebrew:

```bash
npm install -g @aiven/ai-gateway
```

To run the launcher without installing it, use `npx @aiven/ai-gateway` followed by a
command, for example `npx @aiven/ai-gateway setup claude`.
The package installs a native binary for Linux, macOS, or Windows on x64 or ARM64, or
for Linux on ARMv7.
The binary is an optional dependency, so the launcher does not run after an install with
`--omit=optional`.
On Windows, add `--plain` to `setup` and `launch` to use numbered prompts instead of
selection lists.

### Install with Go

With Go 1.27.3 or later, install the launcher with `go install`:

```bash
go install github.com/aiven-open/ai-gateway-cli/cmd/aiven-ai-gateway@latest
```

The module path `github.com/aiven-open/ai-gateway-cli` is lowercase.
Ensure `$(go env GOPATH)/bin`, or `GOBIN` if set, is in your `PATH`.
To run the launcher without adding the Go binary directory to `PATH`, use
`go run github.com/aiven-open/ai-gateway-cli/cmd/aiven-ai-gateway@latest` followed by a
command, such as `setup`.

### Manage credentials and models

`aiven-ai-gateway login` saves a key after checking model access.
It does not configure a coding agent.
`aiven-ai-gateway models` lists models granted to the key.
`aiven-ai-gateway logout` removes the local credential but retains coding-agent
configuration.
It does not revoke the server key or clear environment variables inherited by your shell.

## Store the API key

For manual setup or the Console setup prompt, store the key in a private credentials file.
The coding agent configurations in the following sections reference the `AIVEN_AI_GATEWAY_KEY`
environment variable, so the key stays out of tracked dotfiles and agent conversations.

1. Create the credentials files with mode `0600`:

   ```bash
   mkdir -p ~/.config/aiven
   touch ~/.config/aiven/ai-gateway-credentials.sh ~/.config/aiven/ai-gateway-credentials.fish
   chmod 600 ~/.config/aiven/ai-gateway-credentials.sh ~/.config/aiven/ai-gateway-credentials.fish
   ```

1. In a text editor, add the key to the `~/.config/aiven/ai-gateway-credentials.sh` file:

   ```bash
   export AIVEN_AI_GATEWAY_KEY="API_KEY"
   ```

   Add the key to the `~/.config/aiven/ai-gateway-credentials.fish` file:

   ```fish
   set -gx AIVEN_AI_GATEWAY_KEY "API_KEY"
   ```

   Where `API_KEY` is your AI gateway API key, which starts with `AVNS_`.

1. Load the credentials file from your shell startup file.
   The commands add the line only if it is not already there.

   <Tabs groupId="shell">
   <TabItem value="zsh" label="zsh" default>

   ```bash
   line='[ -f ~/.config/aiven/ai-gateway-credentials.sh ] && . ~/.config/aiven/ai-gateway-credentials.sh'
   grep -qxF "$line" ~/.zshrc || printf '%s\n' "$line" >> ~/.zshrc
   ```

   </TabItem>
   <TabItem value="bash" label="bash">

   ```bash
   line='[ -f ~/.config/aiven/ai-gateway-credentials.sh ] && . ~/.config/aiven/ai-gateway-credentials.sh'
   for rc in ~/.bashrc ~/.bash_profile; do
     touch "$rc"
     grep -qxF "$line" "$rc" || printf '%s\n' "$line" >> "$rc"
   done
   ```

   </TabItem>
   <TabItem value="fish" label="fish">

   ```fish
   set line 'test -f ~/.config/aiven/ai-gateway-credentials.fish; and source ~/.config/aiven/ai-gateway-credentials.fish'
   mkdir -p ~/.config/fish
   grep -qxF "$line" ~/.config/fish/config.fish; or printf '%s\n' "$line" >> ~/.config/fish/config.fish
   ```

   </TabItem>
   </Tabs>

1. Open a new terminal to load the variable.

## Set up a coding agent with a prompt

The Aiven Console provides a setup prompt for coding agents.
The prompt does not contain your API key.

1. In your project, click **AI gateway**.
1. Click **Connect with AI**.
1. Copy the setup prompt and paste it into your coding agent.

The agent adds an `aiven` provider that reads the key from the `AIVEN_AI_GATEWAY_KEY`
environment variable. Do not paste the API key into the conversation.

To configure a coding agent manually, use the following sections.
Each configuration keeps your other providers intact.
If a configuration file exists, merge the new settings into it instead of replacing the file.

## Use Claude Code with AI gateway models

Add the settings to the `.claude/settings.local.json` file in your project so
other projects keep their existing Claude Code provider settings. To use the
gateway across all projects on your machine, add them to `~/.claude/settings.json`.

```json
{
  "apiKeyHelper": ". ~/.config/aiven/ai-gateway-credentials.sh && printf '%s' \"$AIVEN_AI_GATEWAY_KEY\"",
  "env": {
    "ANTHROPIC_BASE_URL": "https://ai.aiven.io",
    "ANTHROPIC_AUTH_TOKEN": "",
    "ANTHROPIC_API_KEY": "",
    "CLAUDE_CODE_USE_BEDROCK": "",
    "AWS_BEARER_TOKEN_BEDROCK": "",
    "ANTHROPIC_MODEL": "claude-sonnet-5-5[1m]",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "claude-opus-5-5",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "claude-sonnet-5-5",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-haiku-5-5"
  }
}
```

- `apiKeyHelper` reads the key from the credentials file when Claude Code starts.
- The empty values for `ANTHROPIC_AUTH_TOKEN`, `ANTHROPIC_API_KEY`,
  `CLAUDE_CODE_USE_BEDROCK`, and `AWS_BEARER_TOKEN_BEDROCK` stop other
  credentials in your environment from overriding the gateway settings.
- The `[1m]` suffix tells Claude Code to use the 1M token context window of the model.

<AIGatewayModelInfo variable="ANTHROPIC_MODEL" />

Claude Code sends smaller jobs, such as session titles and some subagent work,
to its Opus, Sonnet, and Haiku aliases. Set `ANTHROPIC_DEFAULT_OPUS_MODEL`,
`ANTHROPIC_DEFAULT_SONNET_MODEL`, and `ANTHROPIC_DEFAULT_HAIKU_MODEL` to models
available in your project.

### Test Claude Code with AI gateway

1. To start Claude Code, run `claude`.
1. To confirm the gateway is configured, run `/status`.
   The **Anthropic base URL** is `https://ai.aiven.io`.
1. Close the status and send a test prompt.
1. [Verify the request in the Aiven Console](#verify-requests-in-the-aiven-console).

## Use Codex with AI gateway models

1. Add the `aiven` provider to the `~/.codex/config.toml` file (and remove any
   legacy `[profiles.aiven]` section from `~/.codex/config.toml` if present):

   ```toml
   [model_providers.aiven]
   name = "Aiven AI gateway"
   base_url = "https://ai.aiven.io/v1"
   env_key = "AIVEN_AI_GATEWAY_KEY"
   wire_api = "responses"
   requires_openai_auth = false
   ```

1. Create the `~/.codex/aiven.config.toml` profile file so your top-level
   `model` and `model_provider` in `~/.codex/config.toml` remain unchanged:

   ```toml
   model_provider = "aiven"
   model = "gpt-6.1-sol"
   web_search = "disabled"

   [model_providers.aiven]
   name = "Aiven AI gateway"
   base_url = "https://ai.aiven.io/v1"
   env_key = "AIVEN_AI_GATEWAY_KEY"
   wire_api = "responses"
   requires_openai_auth = false
   ```

   `web_search = "disabled"` stops Codex from offering its hosted web search tool,
   which AI gateway refuses on some models, such as Gemini.

<AIGatewayModelInfo variable="model" />

### Test Codex with AI gateway

1. To start Codex with the profile, run `codex -p aiven`.
1. To confirm the active model is `gpt-6.1-sol`, run `/status`.
1. Send a test prompt.
1. [Verify the request in the Aiven Console](#verify-requests-in-the-aiven-console).

## Use Pi with AI gateway models

1. Add an `aiven` entry under `providers` in the `~/.pi/agent/models.json` file:

   ```json
   {
     "providers": {
       "aiven": {
         "baseUrl": "https://ai.aiven.io/v1",
         "api": "openai-completions",
         "apiKey": "$AIVEN_AI_GATEWAY_KEY",
         "models": [
           {
             "id": "claude-sonnet-5-5",
             "name": "claude-sonnet-5-5",
             "api": "anthropic-messages",
             "baseUrl": "https://ai.aiven.io",
             "contextWindow": 1000000,
             "maxTokens": 64000,
             "reasoning": true,
             "input": ["text", "image"]
           },
           {
             "id": "gpt-6.1-sol",
             "name": "gpt-6.1-sol",
             "api": "openai-responses",
             "contextWindow": 272000,
             "maxTokens": 128000,
             "reasoning": true,
             "input": ["text", "image"]
           }
         ]
       }
     }
   }
   ```

   - Pi resolves `$AIVEN_AI_GATEWAY_KEY` from the environment.
     Without the `$` prefix, Pi sends the variable name as a literal key.
   - `claude-*` models use `"anthropic-messages"` on `https://ai.aiven.io`.
     `gpt-*` models other than `gpt-oss` and `gpt-oss-*` use
     `"openai-responses"` on `https://ai.aiven.io/v1`.
     Other models in the [model list](/docs/products/ai-gateway/model-catalog)
     use the provider default `"openai-completions"` on `https://ai.aiven.io/v1`.

1. To start Pi with the gateway, run:

   ```bash
   pi --provider aiven --model claude-sonnet-5-5
   ```

1. [Verify the request in the Aiven Console](#verify-requests-in-the-aiven-console).

## Use OpenCode with AI gateway models

1. Add an `aiven` entry under `provider` in the `~/.config/opencode/opencode.json` file:

   ```json
   {
     "$schema": "https://opencode.ai/config.json",
     "provider": {
       "aiven": {
         "npm": "@ai-sdk/openai-compatible",
         "name": "Aiven AI gateway",
         "options": {
           "baseURL": "https://ai.aiven.io/v1",
           "apiKey": "{env:AIVEN_AI_GATEWAY_KEY}"
         },
         "models": {
           "claude-sonnet-5-5": {
             "limit": {
               "context": 1000000,
               "output": 64000
             }
           }
         }
       }
     }
   }
   ```

   To add other models, add keys under `models` with the model names from the
   [model list](/docs/products/ai-gateway/model-catalog).

1. To start OpenCode with the gateway, run:

   ```bash
   opencode --model aiven/claude-sonnet-5-5
   ```

1. [Verify the request in the Aiven Console](#verify-requests-in-the-aiven-console).

## Verify requests in the Aiven Console

1. In your project, click **AI gateway**.
1. To see the request, [view the usage metrics](/docs/products/ai-gateway/metrics)
   on the page for the API key you used.
   A new request can take about 15 minutes to appear.
