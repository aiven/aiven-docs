---
title: Use AI gateway with coding agents
sidebar_label: Use with coding agents
early: true
---

import RequirementsPanel from "@site/src/components/RequirementsPanel";
import AIGatewayModelInfo from "@site/src/components/AIGatewayModelInfo";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Point your coding agent like Claude Code, Codex, Pi, or OpenCode at the Aiven AI Gateway to send requests using your API key.

<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`project:ai_gateway_keys:write`', '`project:ai_gateway_keys:read`', `role:project:admin`, `role:project:manager`],
    },
  ]}
/>

## Prerequisites

- AI Gateway [enabled for your organization](/docs/products/ai-gateway).
- An [API key](/docs/products/ai-gateway/api-keys).

## Store the API key

Store the API key in a credentials file that only your user can read.
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

   Where `API_KEY` is your AI Gateway API key, which starts with `AVNS_`.

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

1. In your project, click **AI Gateway**.
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
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-haiku-4-5"
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

### Test Claude Code with AI Gateway

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
   name = "Aiven AI Gateway"
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

   [model_providers.aiven]
   name = "Aiven AI Gateway"
   base_url = "https://ai.aiven.io/v1"
   env_key = "AIVEN_AI_GATEWAY_KEY"
   wire_api = "responses"
   requires_openai_auth = false
   ```

<AIGatewayModelInfo variable="model" />

### Test Codex with AI Gateway

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
     `gpt-*` models use `"openai-responses"` on `https://ai.aiven.io/v1`.
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
         "name": "Aiven AI Gateway",
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

1. In your project, click **AI Gateway**.
1. To see the request, [view the usage metrics](/docs/products/ai-gateway/metrics)
   on the page for the API key you used.
   A new request can take about 15 minutes to appear.
