---
title: Use AI gateway with SDKs
sidebar_label: Use with SDKs
early: true
---

import AIGatewayModelInfo from "@site/src/components/AIGatewayModelInfo";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Use the OpenAI and Anthropic SDKs with the Aiven AI Gateway.

## Prerequisites

- AI Gateway [enabled for your organization](/docs/products/ai-gateway).
- An [API key](/docs/products/ai-gateway/api-keys) in the `AIVEN_AI_GATEWAY_KEY`
  environment variable. To store the key, see
  [Store the API key](/docs/products/ai-gateway/use-with-agents#store-the-api-key).

## Use the OpenAI SDK

<Tabs groupId="language">
<TabItem value="python" label="Python" default>

1. To install the SDK, run:

   ```bash
   uv add openai
   ```

1. Send a request:

   ```python
   import os

   from openai import OpenAI

   client = OpenAI(
     base_url="https://ai.aiven.io/v1",
     api_key=os.environ["AIVEN_AI_GATEWAY_KEY"],
   )

   response = client.chat.completions.create(
     model="claude-sonnet-5-5",
     messages=[{"role": "user", "content": "Say hello"}],
   )
   print(response.choices[0].message.content)
   ```

</TabItem>
<TabItem value="typescript" label="TypeScript">

1. To install the SDK, run:

   ```bash
   npm install openai
   ```

1. Send a request:

   ```typescript
   import OpenAI from "openai";

   const client = new OpenAI({
     baseURL: "https://ai.aiven.io/v1",
     apiKey: process.env.AIVEN_AI_GATEWAY_KEY,
   });

   const response = await client.chat.completions.create({
     model: "claude-sonnet-5-5",
     messages: [{ role: "user", content: "Say hello" }],
   });
   console.log(response.choices[0].message.content);
   ```

</TabItem>
</Tabs>

<AIGatewayModelInfo variable="model" />

## Use the Anthropic SDK

1. To install the SDK, run:

   ```bash
   uv add anthropic
   ```

1. Send a request:

   ```python
   import os

   from anthropic import Anthropic

   client = Anthropic(
     base_url="https://ai.aiven.io",
     api_key=os.environ["AIVEN_AI_GATEWAY_KEY"],
   )

   message = client.messages.create(
     model="claude-sonnet-5-5",
     max_tokens=1024,
     messages=[{"role": "user", "content": "Say hello"}],
   )
   print(message.content[0].text)
   ```

<AIGatewayModelInfo variable="model" />
