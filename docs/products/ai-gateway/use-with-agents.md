---
title: Use AI gateway with agents
---

import RequirementsPanel from "@site/src/components/RequirementsPanel";




<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`project:ai_gateway_keys:write`'],
    },
  ]}
/>

## Prerequisites

- AI gateway enabled for your organization.
- An [AI access key](/docs/products/ai-gateway/ai-access-keys)

## Use Claude Code with AI gateway models

Claude Code needs the gateway address, your key, and model names the gateway catalogue lists.




|            Variable            |         Value         |
| ------------------------------ | --------------------- |
| ANTHROPIC_BASE_URL             | `https://ai.aiven.io` |
| ANTHROPIC_AUTH_TOKEN           | Your AI access key    |
| ANTHROPIC_MODEL                | `aiven-model`         |
| ANTHROPIC_DEFAULT_OPUS_MODEL   | `claude-opus-5`       |
| ANTHROPIC_DEFAULT_SONNET_MODEL | `claude-sonnet-5`     |
| ANTHROPIC_DEFAULT_HAIKU_MODEL  | `claude-haiku-4-5`    |


aiven-model is the main model. It is the Aiven router, and usage on it is free.
Claude Code sends smaller jobs, such as session titles and some subagent work,
to its Opus, Sonnet, and Haiku aliases. Those aliases default to the model aliases you pin.
To use a specific catalogue model for the main session, set ANTHROPIC_MODEL to that model's name. Named models are billed at the rates on the Models page.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="group1">
<TabItem value="terminal" label="Terminal" default>

Export the base URL, your AI access key, and model names for the session.
Exports last for that terminal and for programs you start from it.

```
export ANTHROPIC_BASE_URL="https://ai.aiven.io"
export ANTHROPIC_AUTH_TOKEN="AI_ACCESS_KEY"
export ANTHROPIC_MODEL="aiven-model"
export ANTHROPIC_DEFAULT_OPUS_MODEL="claude-opus-5"
export ANTHROPIC_DEFAULT_SONNET_MODEL="claude-sonnet-5"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="claude-haiku-4-5"
claude
```

</TabItem>
<TabItem value="claude config" label="Claude Code configuration">

Put the same values in the env block of ~/.claude/settings.json.

```
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://ai.aiven.io",
    "ANTHROPIC_AUTH_TOKEN": "AI_ACCESS_KEY",
    "ANTHROPIC_MODEL": "aiven-model",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "claude-opus-5",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "claude-sonnet-5",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-haiku-4-5"
  }
}
```

To use in one project only, use .claude/settings.local.json in that project.

More information on pointing Claude Code at an AI gateway is available in
the [Claude Code docs](https://code.claude.com/docs/en/llm-gateway-connect).

</TabItem>
</Tabs>


## Test

Start claude from the terminal where you exported the variables, or restart it after saving settings.json.
Run /status.
Anthropic base URL is https://ai.aiven.io.
Auth token names ANTHROPIC_AUTH_TOKEN.

Send a short prompt and confirm you get a reply.

In the Console, open AI Gateway > Overview. The request shows up on the key after usage has been collected.


Troubleshooting
What you see	What to do
Claude Code opens the login screen
The key did not reach the process. Export it in this terminal, or set ANTHROPIC_AUTH_TOKEN in ~/.claude/settings.json, then start claude again.
/status has no Anthropic base URL line
ANTHROPIC_BASE_URL did not reach the session. A settings-file env block overrides a shell export.
401 or the key is rejected
The key is missing, revoked, or expired. Create a new key and update ANTHROPIC_AUTH_TOKEN. The gateway reads the bearer token from that variable.
Unknown model
A pin still names a model the catalogue does not list. Copy the current name from AI Gateway > Models.
The main session works, and titles or subagents fail
ANTHROPIC_DEFAULT_HAIKU_MODEL, ANTHROPIC_DEFAULT_SONNET_MODEL, or ANTHROPIC_DEFAULT_OPUS_MODEL is unset or out of date.
Usage does not appear on Overview
Confirm /status shows https://ai.aiven.io and that you are looking at the same project as the key. Collection is not instant.

## Use Codex with AI gateway models

Codex needs a provider in `~/.codex/config.toml` and your AI access key in the environment.

| Setting          | Value                    |
| ---------------- | ------------------------ |
| model            | `aiven-model`            |
| model_provider   | `aiven`                  |
| base_url         | `https://ai.aiven.io/v1` |
| env_key          | `AIVEN_AI_GATEWAY_KEY`   |
| wire_api         | `responses`              |

`aiven-model` is the Aiven router, and usage on it is free. Codex reads the key from `AIVEN_AI_GATEWAY_KEY`. To use a specific catalogue model, set `model` to that model's name. Named models are billed at the rates on the Models page.

Add a provider to `~/.codex/config.toml`:

```
model = "aiven-model"
model_provider = "aiven"

[model_providers.aiven]
name = "Aiven AI Gateway"
base_url = "https://ai.aiven.io/v1"
env_key = "AIVEN_AI_GATEWAY_KEY"
wire_api = "responses"
```

Export the key and start Codex. The export lasts for that terminal and for programs you start from it.

```
export AIVEN_AI_GATEWAY_KEY="AI_ACCESS_KEY"
codex
```

## Use the OpenAI SDK with AI gateway models

The OpenAI SDK needs the gateway base URL, your AI access key, and a model name.

| Setting  | Value                    |
| -------- | ------------------------ |
| base_url | `https://ai.aiven.io/v1` |
| api_key  | Your AI access key       |
| model    | `aiven-model`            |

`aiven-model` is the Aiven router, and usage on it is free. To use a specific catalogue model, set `model` to that model's name. Named models are billed at the rates on the Models page.

Install the SDK, then send a request:

```
uv add openai
```

```
from openai import OpenAI

client = OpenAI(base_url="https://ai.aiven.io/v1", api_key="AI_ACCESS_KEY")

response = client.chat.completions.create(
  model="aiven-model",
  messages=[{"role": "user", "content": "Say hello"}],
)
print(response.choices[0].message.content)
```

## Use the Anthropic SDK with AI gateway models

The Anthropic SDK needs the gateway base URL, your AI access key, and a model name. The base URL has no `/v1` suffix.

| Setting  | Value                 |
| -------- | --------------------- |
| base_url | `https://ai.aiven.io` |
| api_key  | Your AI access key    |
| model    | `aiven-model`         |

`aiven-model` is the Aiven router, and usage on it is free. To use a specific catalogue model, set `model` to that model's name. Named models are billed at the rates on the Models page.

Install the SDK, then send a request:

```
uv add anthropic
```

```
from anthropic import Anthropic

client = Anthropic(base_url="https://ai.aiven.io", api_key="AI_ACCESS_KEY")

message = client.messages.create(
  model="aiven-model",
  max_tokens=1024,
  messages=[{"role": "user", "content": "Say hello"}],
)
print(message.content[0].text)
```

## Use cURL with AI gateway models

cURL sends the AI access key as a bearer token. The chat endpoint includes `/v1`.

| Setting       | Value                                     |
| ------------- | ----------------------------------------- |
| Endpoint      | `https://ai.aiven.io/v1/chat/completions` |
| Authorization | `Bearer AI_ACCESS_KEY`                    |
| model         | `aiven-model`                             |

`aiven-model` is the Aiven router, and usage on it is free. To use a specific catalogue model, set `model` to that model's name. Named models are billed at the rates on the Models page.

```
curl -X POST 'https://ai.aiven.io/v1/chat/completions' \
-H 'Authorization: Bearer AI_ACCESS_KEY' \
-H 'Content-Type: application/json' \
-d '{ "model": "aiven-model", "messages": [{"role": "user", "content": "Say hello"}] }'
```

List the models this key can use:

```
curl 'https://ai.aiven.io/v1/models' \
-H 'Authorization: Bearer AI_ACCESS_KEY'
```

