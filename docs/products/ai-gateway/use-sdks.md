---
title: Use AI gateway with SDKs
sidebar_label: Use with SDKs
early: true
---

import AIGatewayModelInfo from "@site/src/components/AIGatewayModelInfo";

Use the OpenAI and Anthropic SDKs with the Aiven AI Gateway.

## Prerequisites

- AI Gateway [enabled for your organization](/docs/products/ai-gateway).
- An [API key](/docs/products/ai-gateway/api-keys).

## Use the OpenAI SDK

1. To install the SDK, run:

   ```bash
   uv add openai
   ```

1. Send a request:

   ```python
   from openai import OpenAI

   client = OpenAI(base_url="https://ai.aiven.io/v1", api_key="API_KEY")

   response = client.chat.completions.create(
     model="aiven-model",
     messages=[{"role": "user", "content": "Say hello"}],
   )
   print(response.choices[0].message.content)
   ```
<AIGatewayModelInfo variable="model" />

## Use the Anthropic SDK

1. To install the SDK, run:
   ```bash
   uv add anthropic
   ```

1. Send a request:

   ```python
   from anthropic import Anthropic

   client = Anthropic(base_url="https://ai.aiven.io", api_key="API_KEY")

   message = client.messages.create(
     model="aiven-model",
     max_tokens=1024,
     messages=[{"role": "user", "content": "Say hello"}],
   )
   print(message.content[0].text)
   ```

   Where `API_KEY` is your AI Gateway API key.

<AIGatewayModelInfo variable="model" />
