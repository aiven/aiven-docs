---
title: Set up conversational search with RAG for Aiven for OpenSearch®
sidebar_label: Conversational search with RAG
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RelatedPages from "@site/src/components/RelatedPages";
import RequirementsPanel from "@site/src/components/RequirementsPanel";
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Connect your Aiven for OpenSearch® service to a large language model, index your own passages, and answer natural-language questions that are grounded in that data.

Conversational search combines retrieval augmented generation (RAG) with conversation
history. Aiven for OpenSearch retrieves the passages that match a question, sends them to
the model as context, and the model answers from those passages instead of from its
training data alone. A conversation memory stores the previous questions and answers, so
the model can resolve follow-up questions.

The setup in this article creates the following resources in your service:

- A connector to your model provider and a registered, deployed remote model.
- A search pipeline with a `retrieval_augmented_generation` response processor.
- An index that holds your passages.
- A conversation memory that stores the message history.

The examples use the [Aiven AI gateway](/docs/products/ai-gateway) as the model provider.
Its chat completions endpoint is OpenAI-compatible, which the RAG processor supports
without extra configuration. Any model provider with an HTTPS API works the same way.

## Requirements

<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`project:services:write`', '`service:configuration:write`', '`role:project:admin`', '`role:project:manager`'],
    },
  ]}
/>

- An Aiven for OpenSearch service running OpenSearch 2.19 or later. The automated
  workflow in [Create the connector and register the model](#create-the-connector-and-register-the-model)
  requires OpenSearch 3.6 or later, which is when the
  [Flow Framework](/docs/products/opensearch/reference/plugins) plugin became available.
- A paid service plan. [Free tier](/docs/products/opensearch/concepts/opensearch-free-tier)
  services run a fixed configuration, so you cannot add the trusted endpoint that a
  connector requires.
- An [AI gateway API key](/docs/products/ai-gateway/api-keys), or credentials for another
  model provider.
- The service URI, available on the service <ConsoleLabel name="overview"/> page in the
  [Aiven Console](https://console.aiven.io/). The examples use `OPENSEARCH_URI` as a
  placeholder for a service URI that includes the username and password.

:::note
Upstream OpenSearch documentation starts conversational search setup with a
`PUT /_cluster/settings` request that enables
`plugins.ml_commons.memory_feature_enabled` and
`plugins.ml_commons.rag_pipeline_feature_enabled`. Skip that step. Both settings are
enabled by default, and Aiven for OpenSearch allows only `GET` requests to `/_cluster/`
endpoints. For details, see
[Aiven for OpenSearch limits and limitations](/docs/products/opensearch/reference/opensearch-limitations#api-restrictions).
:::

## Add the model endpoint to the trusted endpoints

ML Commons accepts a connector only when its endpoint URL matches
`ml_commons_trusted_connector_endpoints_regex`. Add a Java regular expression that matches
your model provider.

<Tabs groupId="config-methods">
<TabItem value="gui" label="Console" default>

1.  Log in to the [Aiven Console](https://console.aiven.io/).
1.  Click <ConsoleLabel name="Services"/>, then select your Aiven for OpenSearch service.
1.  Click <ConsoleLabel name="service settings"/>. Scroll to the
    **Advanced configuration** section and click **Configure**.
1.  Click **Add configuration options**, then select
    **`opensearch.ml_commons_trusted_connector_endpoints_regex`**.
1.  Enter `^https://ai\.aiven\.io/.*$` and click **Save configuration**.

</TabItem>
<TabItem value="cli" label="CLI">

Use the [`avn service update`](/docs/tools/cli/service-cli#avn-cli-service-update)
command:

```bash
avn service update SERVICE_NAME \
  -c 'opensearch.ml_commons_trusted_connector_endpoints_regex=["^https://ai\.aiven\.io/.*$"]'
```

Replace `SERVICE_NAME` with your Aiven for OpenSearch service name.

</TabItem>
</Tabs>

The value you set replaces the upstream default list of trusted endpoints, so include a
pattern for every provider your connectors call. Enter each pattern without surrounding
quotation marks, which otherwise become part of the pattern. Changing this setting doesn't
restart your service, but the new value takes a few minutes to reach the cluster. Confirm
that it arrived before you create a connector:

```bash
curl "OPENSEARCH_URI/_cluster/settings?include_defaults=false"
```

For the other ML Commons settings and the ways to set them, see
[Enable ML Commons for Aiven for OpenSearch](/docs/products/opensearch/howto/enable-ml-commons).

## Create the connector and register the model

Create the connector and register the model either from a workflow template or by calling
each API yourself.

<Tabs groupId="rag-setup-method">
<TabItem value="workflow" label="Automated workflow" default>

The `conversational_search_with_llm_deploy` workflow template creates the connector,
registers and deploys the model, and creates a search pipeline named `rag-pipeline`. The
template defaults target Cohere, so override the parameters that describe your provider:

```bash
curl -X POST -H "Content-Type: application/json" \
"OPENSEARCH_URI/_plugins/_flow_framework/workflow?use_case=conversational_search_with_llm_deploy&provision=true" \
-d '{
  "create_connector.name": "Aiven AI gateway chat model",
  "create_connector.description": "Connector to the Aiven AI gateway chat completions API",
  "create_connector.endpoint": "ai.aiven.io",
  "create_connector.model": "MODEL_NAME",
  "create_connector.credential.key": "AI_GATEWAY_API_KEY",
  "create_connector.actions.url": "https://ai.aiven.io/v1/chat/completions",
  "create_connector.actions.request_body": "{ \"messages\": ${parameters.messages}, \"model\": \"${parameters.model}\" }",
  "register_remote_model.name": "Aiven AI gateway chat model"
}'
```

Replace the following:

- `MODEL_NAME`: a model from the
  [AI gateway model list](/docs/products/ai-gateway/model-catalog).
- `AI_GATEWAY_API_KEY`: your AI gateway API key.

The `${parameters.messages}` placeholder carries no quotation marks because the RAG
processor supplies a serialized JSON array. The `${parameters.model}` placeholder is a
string, so it keeps its quotation marks.

The response contains a workflow ID. Poll the workflow until its `state` is `COMPLETED`:

```bash
curl "OPENSEARCH_URI/_plugins/_flow_framework/workflow/WORKFLOW_ID/_status"
```

The status response lists the resources the workflow created, including the model ID you
need in the following steps. Continue with
[Index your passages](#index-your-passages), because the workflow already created the
search pipeline.

</TabItem>
<TabItem value="manual" label="Manual setup">

1.  Create the connector:

    ```bash
    curl -X POST -H "Content-Type: application/json" \
    "OPENSEARCH_URI/_plugins/_ml/connectors/_create" \
    -d '{
      "name": "Aiven AI gateway chat connector",
      "description": "Connector to the Aiven AI gateway chat completions API",
      "version": 2,
      "protocol": "http",
      "parameters": {
        "endpoint": "ai.aiven.io",
        "model": "MODEL_NAME"
      },
      "credential": {
        "gateway_key": "AI_GATEWAY_API_KEY"
      },
      "actions": [
        {
          "action_type": "predict",
          "method": "POST",
          "url": "https://${parameters.endpoint}/v1/chat/completions",
          "headers": {
            "Authorization": "Bearer ${credential.gateway_key}"
          },
          "request_body": "{ \"messages\": ${parameters.messages}, \"model\": \"${parameters.model}\" }"
        }
      ]
    }'
    ```

    Replace the following:

    - `MODEL_NAME`: a model from the
      [AI gateway model list](/docs/products/ai-gateway/model-catalog).
    - `AI_GATEWAY_API_KEY`: your AI gateway API key.

    The response contains a connector ID.

1.  Register and deploy the model, using the connector ID from the previous step:

    ```bash
    curl -X POST -H "Content-Type: application/json" \
    "OPENSEARCH_URI/_plugins/_ml/models/_register?deploy=true" \
    -d '{
      "name": "Aiven AI gateway chat model",
      "function_name": "remote",
      "description": "Chat model served through the Aiven AI gateway",
      "connector_id": "CONNECTOR_ID"
    }'
    ```

    The response contains a task ID and a model ID. Check that registration finished:

    ```bash
    curl "OPENSEARCH_URI/_plugins/_ml/tasks/TASK_ID"
    ```

    The task `state` changes to `COMPLETED`.

1.  Create the search pipeline, using the model ID from the previous step:

    ```bash
    curl -X PUT -H "Content-Type: application/json" \
    "OPENSEARCH_URI/_search/pipeline/rag_pipeline" \
    -d '{
      "response_processors": [
        {
          "retrieval_augmented_generation": {
            "tag": "conversational_search",
            "description": "RAG pipeline using the Aiven AI gateway",
            "model_id": "MODEL_ID",
            "context_field_list": ["text"],
            "system_prompt": "You are a helpful assistant",
            "user_instructions": "Generate a concise and informative answer in less than 100 words for the given question"
          }
        }
      ]
    }'
    ```

    `context_field_list` names the document fields the processor sends to the model as
    context. The examples in this article store passages in a `text` field.

</TabItem>
</Tabs>

## Index your passages

Create an index for the passages that answer questions, then index one document per
passage:

```bash
curl -X PUT -H "Content-Type: application/json" \
"OPENSEARCH_URI/rag_passages" \
-d '{
  "mappings": {
    "properties": {
      "text": { "type": "text" },
      "title": { "type": "keyword" }
    }
  }
}'
```

Keep each passage to a few hundred words. A question returns whole documents, and the
processor sends them to the model as one prompt, so oversized documents use up the model
context window and dilute the answer.

:::note
Upstream OpenSearch documentation sets `index.search.default_pipeline` to the RAG pipeline
on the index. Name the pipeline on the search request instead, as the following steps do.
The `_count`, `_cat/count`, and `_delete_by_query` APIs also run through an index default
pipeline, and the RAG processor rejects those requests because they carry no generation
parameters.
:::

## Create a conversation memory

A memory stores the questions and answers of one conversation. Create one memory per
conversation:

```bash
curl -X POST -H "Content-Type: application/json" \
"OPENSEARCH_URI/_plugins/_ml/memory/" \
-d '{ "name": "Product support conversation" }'
```

The response contains a memory ID. You cannot rename a memory after you create it.

A memory ID grants access to the message history it holds. With
[OpenSearch Security management](/docs/products/opensearch/concepts/os-security) enabled,
each memory is private to the user who created it. With security management disabled, all
service users have the `ml_full_access` role, so any service user that knows a memory ID
can read its messages.

## Ask a question

Send a search request that names the RAG pipeline and carries the generation parameters in
`ext.generative_qa_parameters`:

```bash
curl -X POST -H "Content-Type: application/json" \
"OPENSEARCH_URI/rag_passages/_search?search_pipeline=rag_pipeline" \
-d '{
  "size": 5,
  "query": {
    "match": { "text": "How long does a return take?" }
  },
  "ext": {
    "generative_qa_parameters": {
      "llm_model": "MODEL_NAME",
      "llm_question": "How long does a return take?",
      "memory_id": "MEMORY_ID",
      "context_size": 5,
      "message_size": 5,
      "timeout": 30
    }
  }
}'
```

The response carries the original search hits and the generated answer in
`ext.retrieval_augmented_generation.answer`. Because every hit is a document with an ID,
you can cite the passages that the answer came from.

Set `size` and `context_size` together to control how much context the model receives.
`size` limits the hits the query returns, and `context_size` limits how many of those hits
reach the model. Without them, the pipeline sends every hit in the search response.

To ask a follow-up question, send another request with the same `memory_id`. The pipeline
adds the recent messages from that memory to the prompt, so the model resolves references
to the earlier turns. To read the stored messages:

```bash
curl "OPENSEARCH_URI/_plugins/_ml/memory/MEMORY_ID/messages"
```

## Add semantic retrieval

A `match` query finds passages that share words with the question. To also match passages
that answer a question in different words, deploy an embedding model in the cluster and
combine keyword and vector rankings in one hybrid query.

1.  Set `ml_commons_only_run_on_ml_node` to `false`, unless your service plan has
    dedicated ML nodes. The setting applies to models that run in the cluster, and its
    default of `true` prevents them from deploying on data nodes. For the ways to set it,
    see
    [Enable ML Commons for Aiven for OpenSearch](/docs/products/opensearch/howto/enable-ml-commons).

1.  Register and deploy a pretrained embedding model:

    ```bash
    curl -X POST -H "Content-Type: application/json" \
    "OPENSEARCH_URI/_plugins/_ml/models/_register?deploy=true" \
    -d '{
      "name": "huggingface/sentence-transformers/multi-qa-MiniLM-L6-cos-v1",
      "version": "1.0.2",
      "model_format": "TORCH_SCRIPT"
    }'
    ```

    This model produces 384-dimensional vectors. Check that the model state is `DEPLOYED`
    before you index any documents:

    ```bash
    curl "OPENSEARCH_URI/_plugins/_ml/models/EMBEDDING_MODEL_ID"
    ```

1.  Create an ingest pipeline that embeds each passage as it is indexed:

    ```bash
    curl -X PUT -H "Content-Type: application/json" \
    "OPENSEARCH_URI/_ingest/pipeline/rag_embedding" \
    -d '{
      "processors": [
        {
          "text_embedding": {
            "model_id": "EMBEDDING_MODEL_ID",
            "field_map": { "text": "embedding" }
          }
        }
      ]
    }'
    ```

1.  Create a k-NN index that uses the ingest pipeline as its default:

    ```bash
    curl -X PUT -H "Content-Type: application/json" \
    "OPENSEARCH_URI/rag_passages_knn" \
    -d '{
      "settings": {
        "index.knn": true,
        "default_pipeline": "rag_embedding"
      },
      "mappings": {
        "properties": {
          "text": { "type": "text" },
          "title": { "type": "keyword" },
          "embedding": {
            "type": "knn_vector",
            "dimension": 384,
            "space_type": "cosinesimil",
            "method": {
              "name": "hnsw",
              "engine": "lucene"
            }
          }
        }
      }
    }'
    ```

    You cannot add `index.knn` or a `knn_vector` field to an existing index. Create a new
    index and reindex your passages into it.

1.  Add a `score-ranker-processor` phase results processor to the search pipeline, so it
    merges the two rankings before generation:

    ```bash
    curl -X PUT -H "Content-Type: application/json" \
    "OPENSEARCH_URI/_search/pipeline/rag_pipeline" \
    -d '{
      "phase_results_processors": [
        {
          "score-ranker-processor": {
            "combination": {
              "technique": "rrf",
              "rank_constant": 60
            }
          }
        }
      ],
      "response_processors": [
        {
          "retrieval_augmented_generation": {
            "tag": "conversational_search",
            "description": "RAG pipeline using the Aiven AI gateway",
            "model_id": "MODEL_ID",
            "context_field_list": ["text"],
            "system_prompt": "You are a helpful assistant",
            "user_instructions": "Generate a concise and informative answer in less than 100 words for the given question"
          }
        }
      ]
    }'
    ```

1.  Ask a question with a `hybrid` query that runs a keyword match and a vector search
    over the same passages:

    ```bash
    curl -X POST -H "Content-Type: application/json" \
    "OPENSEARCH_URI/rag_passages_knn/_search?search_pipeline=rag_pipeline" \
    -d '{
      "size": 5,
      "_source": { "excludes": ["embedding"] },
      "query": {
        "hybrid": {
          "queries": [
            { "match": { "text": "How long does a return take?" } },
            {
              "neural": {
                "embedding": {
                  "query_text": "How long does a return take?",
                  "model_id": "EMBEDDING_MODEL_ID",
                  "k": 10
                }
              }
            }
          ]
        }
      },
      "ext": {
        "generative_qa_parameters": {
          "llm_model": "MODEL_NAME",
          "llm_question": "How long does a return take?",
          "memory_id": "MEMORY_ID",
          "context_size": 5,
          "message_size": 5,
          "timeout": 30
        }
      }
    }'
    ```

    Exclude the `embedding` field from `_source` to keep vectors out of the response. Hit
    scores are reciprocal rank fusion scores, not relevance scores, so compare them only
    with each other.

## Limitations

- You cannot register a custom model. Aiven for OpenSearch supports pretrained
  OpenSearch models and externally hosted models reached through a connector. For
  details, see
  [ML Commons for Aiven for OpenSearch](/docs/products/opensearch/concepts/ml-commons).
- Free tier services run a fixed configuration and don't support this setup.
- The `retrieval_augmented_generation` processor recognizes the request and response
  formats of OpenAI, Amazon Bedrock, and Cohere models. For a provider whose format
  differs from all three, set `llm_response_field` to the field in the model response
  that holds the answer.

<RelatedPages/>

- [ML Commons for Aiven for OpenSearch](/docs/products/opensearch/concepts/ml-commons)
- [Enable ML Commons for Aiven for OpenSearch](/docs/products/opensearch/howto/enable-ml-commons)
- [Aiven for OpenSearch use cases](/docs/products/opensearch/use-cases)
- [AI gateway overview](/docs/products/ai-gateway)
