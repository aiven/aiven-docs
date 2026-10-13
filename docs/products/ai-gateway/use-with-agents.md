---
title: Use AI gateway with coding agents
sidebar_label: Use with coding agents
early: true
---

import RequirementsPanel from "@site/src/components/RequirementsPanel";
import AIGatewayModelInfo from "@site/src/components/AIGatewayModelInfo";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Point your coding agent like Claude Code or Codex at the AI gateway to send requests using your API key.

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

## Use Claude Code with AI gateway models

To use Claude Code with the AI Gateway, set the gateway address,
your API key, and the model names in the terminal or
in Claude Code's configuration file.

|             Variable             |          Value          |
| -------------------------------- | ----------------------- |
| `ANTHROPIC_BASE_URL`             | `https://ai.aiven.io`   |
| `ANTHROPIC_AUTH_TOKEN`           | Your AI Gateway API key |
| `ANTHROPIC_MODEL`                | `aiven-model`           |
| `ANTHROPIC_DEFAULT_OPUS_MODEL`   | `claude-opus-5`         |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | `claude-sonnet-5`       |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL`  | `claude-haiku-4-5`      |

<AIGatewayModelInfo variable="ANTHROPIC_MODEL" />

Claude Code sends smaller jobs, such as session titles and some subagent work,
to its Opus, Sonnet, and Haiku aliases. Those aliases default to the model you pin.

<Tabs groupId="group1">
<TabItem value="terminal" label="Terminal" default>

Export the variables for the session. Exports last for that terminal session
and for programs you start from it.

```bash
export ANTHROPIC_BASE_URL="https://ai.aiven.io"
export ANTHROPIC_AUTH_TOKEN="API_KEY"
export ANTHROPIC_MODEL="aiven-model"
export ANTHROPIC_DEFAULT_OPUS_MODEL="claude-opus-5"
export ANTHROPIC_DEFAULT_SONNET_MODEL="claude-sonnet-5"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="claude-haiku-4-5"
```

</TabItem>
<TabItem value="claude config" label="Claude Code configuration">

Put the values in the `env` block of the `~/.claude/settings.json` file.
To use these settings in only one project, add them to the
`.claude/settings.local.json ` file in that project.

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://ai.aiven.io",
    "ANTHROPIC_AUTH_TOKEN": "API_KEY",
    "ANTHROPIC_MODEL": "aiven-model",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "claude-opus-5",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "claude-sonnet-5",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-haiku-4-5"
  }
}
```

</TabItem>
</Tabs>

### Test Claude Code with AI Gateway

1. To start Claude Code, run `claude`.

  :::note[Note]
  If you exported the variables, run all commands in the same terminal where
  you exported the variables.
  :::

1. To confirm the gateway is configured, run `/status`.
   The **Auth token** is the variable `ANTHROPIC_AUTH_TOKEN` and the
   **Anthropic base URL** is `https://ai.aiven.io`.

1. Close the status and send a test prompt.

1. To verify the request was sent to the AI Gateway, go to the Aiven Console.

1. Click **AI Gateway**.

1. To see the request, [view the usage metrics](/docs/products/ai-gateway/metrics)
   on the page for the API key you used.
   A new request can take about 15 minutes to appear.

## Use Codex with AI gateway models

1. Export the API key.

   ```bash
   export AIVEN_AI_GATEWAY_KEY="API_KEY"
   ```

1. Add a provider to the `~/.codex/config.toml` file.

   ```toml
   model = "aiven-model"
   model_provider = "aiven"

   [model_providers.aiven]
   name = "Aiven AI Gateway"
   base_url = "https://ai.aiven.io/v1"
   env_key = "AIVEN_AI_GATEWAY_KEY"
   wire_api = "responses"
   ```

<AIGatewayModelInfo variable="model" />

### Test Codex with AI Gateway

In the same terminal where you exported the API key:

1. To start Codex, run `codex`.

1. To confirm the active model is `aiven-model`, run `/status`.

1. Send a test prompt.

1. To verify the request was sent to the AI Gateway, go to the Aiven Console.

1. Click **AI Gateway**.

1. To see the request, [view the usage metrics](/docs/products/ai-gateway/metrics)
   on the page for the API key you used.
   A new request can take about 15 minutes to appear.
