---
title: Use the REST API
sidebar_label: REST API
early: true
---

import RelatedPages from "@site/src/components/RelatedPages";

Use cURL to interact with the Aiven AI Gateway REST API.

## Prerequisites

- AI Gateway [enabled for your organization](/docs/products/ai-gateway).
- An [API key](/docs/products/ai-gateway/api-keys).

## Use cURL

Send a request:

```
curl -X POST 'https://ai.aiven.io/v1/chat/completions' \
-H 'Authorization: Bearer API_KEY' \
-H 'Content-Type: application/json' \
-d '{ "model": "claude-sonnet-5-5", "messages": [{"role": "user", "content": "Say hello"}] }'
```

To use a different model, replace `claude-sonnet-5-5` with a model name from the
[model list](/docs/products/ai-gateway/model-catalog) in the Aiven Console.
To list the available models with the API, run:

```
curl 'https://ai.aiven.io/v1/models' \
-H 'Authorization: Bearer API_KEY'
```
<RelatedPages/>

- [Aiven API documentation](https://api.aiven.io/doc/)
