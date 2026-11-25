---
title: Enable AI description and classification for ingestion sources
sidebar_label: Enable AI description and classification
---

Enable AI-generated descriptions and classifications for your DataHub ingestion sources.

These features work with SQL sources such as PostgreSQL, MySQL, and ClickHouse. They are not supported for Kafka or Kafka Connect sources.

You can enable description and classification individually, or
[enable both at the same time](#enable-both-description-and-classification).

## AI descriptions

The describer feature automatically generates short descriptions for
every table and column. Descriptions end with `[AI GENERATED]` for easy identification.

The describer sends masked sample values to the LLM provider:
letters become `a`/`A`, digits become `9`. Some short codes like status values
and currencies are sent unmasked to provide better context.

## AI classifications

The classifier feature automatically sorts columns into categories that you define
in the taxonomy and tags the related tables.

Each taxonomy key becomes a DataHub tag. Include examples of column names and values
 in the taxonomy to help the LLM make decisions. Tags are applied to every
 matching column. They are also applied at the table level.

## Prerequisites

- Aiven DataHub version 1.7.0.1.4 or later
- An API key for an OpenAI-compatible endpoint

  :::tip[Tip]
  Use the Aiven AI gateway by creating an [API key](/docs/products/ai-gateway/api-keys)
  and choosing a model from the [model list](/docs/products/ai-gateway/model-catalog).
  :::

### Enable AI descriptions

1. In the DataHub UI, click **Data Sources**.
1. On the **Secrets** tab, click **Create secret**.
1. In **Name**, enter `LLM_API_KEY`.
1. Set **Value** to your API key.
1. Click **Create**.
1. On the **Sources** tab, find the source and click **Edit**.
1. To switch to the recipe view, click **YAML**.
1. In `source.config`, add the `SampleCollector`, and
   add the transformers block at the top level. The following example
   shows the sample collector and describer transformer configured to use
   the Aiven AI gateway:

   ```yaml
   source:
     type: postgres
     config:
       ...
       classification:
         enabled: true
         sample_size: 10
         max_workers: 1  # Required.
         classifiers:
           - type: 'datahub_describer.samples:SampleCollector'
             config:
               max_samples: 10
               max_value_characters: 200

   transformers:
     - type: datahub-describer
       config:
         llm_model: claude-sonnet-5
         llm_base_url: https://ai.aiven.io/v1
         llm_api_key: "${LLM_API_KEY}"
         llm_timeout_seconds: 60
         llm_max_retries: 0
         describe_tables: true
   ```

    The `max_workers` parameter is required.
    The options for the sample collector include:

    | Parameter | Description |
    |-----------|-------------|
    | `max_samples` | The maximum number of sample values kept in each column. Default is 10. |
    | `max_value_characters` | The maximum number of characters in a sample value. Default is 200. |

    [View describer transformer parameters](#describer-parameters)

1. Click **Next**.
1. On the last step, click **Advanced**.
1. In **Extra Pip Libraries**, enter
  `["-r /opt/aiven/ingestion-libraries/datahub-describer.txt"]`.
1. Click **Save & Run**.

When the run is finished, open a table in DataHub to verify that
tables and columns have descriptions ending with `[AI GENERATED]`.

### Enable AI classifications

:::warning[Warning]
The classifier sends unmasked sample values to the LLM provider.
:::

1. Add the LLM API key as a DataHub secret:
1. In the DataHub UI, click **Data Sources**.
1. On the **Secrets** tab, click **Create secret**.
1. In **Name**, enter `LLM_API_KEY`.
1. Set **Value** to your API key.
1. Click **Create**.
1. On the **Sources** tab, find the source and click **Edit**.
1. To switch to the recipe view, click **YAML**.
1. Add the `AIPIIClassifier` entry with your own taxonomy,
   and the `datahub-classifier` transformer as in the following example:

   ```yaml
   source:
     type: postgres
     config:
       ...
       classification:
         enabled: true
         sample_size: 10
         max_workers: 1  # Required.
         classifiers:
           - type: 'datahub_classifier.classifier:AIPIIClassifier'
             config:
               llm_model: claude-sonnet-5
               llm_base_url: 'https://ai.aiven.io/v1'
               llm_api_key: '${LLM_API_KEY}'
               llm_timeout_seconds: 60
               llm_max_retries: 0
               confidence_threshold: 0.6
               max_samples: 8
               max_columns_per_call: 50
               taxonomy: &taxonomy
                 C1: 'Restricted identifiers - National IDs, tax numbers, and SSNs'
                 C2: 'Confidential personal and payment data - Names, emails, phone numbers, home addresses, dates of birth, and money amounts'
                 C3: 'Internal operational data - Surrogate IDs, loyalty tiers, currency codes, order status, and timestamps'

   transformers:
     - type: datahub-classifier
       config:
         taxonomy: *taxonomy
   ```

   The `max_workers` parameter is required.
   The `taxonomy` map in the transformer must be the same as the classifier's. Use
   a YAML anchor to reference the classifier taxonomy in the transformer.
   [View classifier parameters](#classifier-parameters)

1. Click **Next**.
1. On the last step, click **Advanced**.
1. In **Extra Pip Libraries**, enter
   `["-r /opt/aiven/ingestion-libraries/datahub-classifier.txt"]`
1. Click **Save & Run**.

When the run is finished, open a table in DataHub to verify that
tables have tags from your taxonomy.

### Enable both description and classification

You can enable both AI descriptions and AI classifications at the same time
for the same ingestion source.

:::warning[Warning]
The classifier sends unmasked sample values to the LLM provider.
When both features are enabled, the classifier has access to sample data collected by the `SampleCollector`.
:::

1. In the DataHub UI, click **Data Sources**.
1. On the **Secrets** tab, click **Create secret**.
1. In **Name**, enter `LLM_API_KEY`.
1. Set **Value** to your API key.
1. Click **Create**.
1. On the **Sources** tab, find the source and click **Edit**.
1. To switch to the recipe view, click **YAML**.
1. In `source.config`, add the `SampleCollector` and `AIPIIClassifier` classifiers,
   and the `datahub-describer` and `datahub-classifier` transformers. The following
   example shows both features configured to use the Aiven AI gateway:
   ```yaml
   source:
     type: postgres
     config:
       ...
       classification:
         enabled: true
         sample_size: 10
         max_workers: 1  # Required.
         classifiers:
           - type: 'datahub_describer.samples:SampleCollector'
             config:
               max_samples: 10
               max_value_characters: 200
           - type: 'datahub_classifier.classifier:AIPIIClassifier'
             config:
               llm_model: claude-sonnet-5
               llm_base_url: 'https://ai.aiven.io/v1'
               llm_api_key: '${LLM_API_KEY}'
               llm_timeout_seconds: 60
               llm_max_retries: 0
               confidence_threshold: 0.6
               max_samples: 8
               max_columns_per_call: 50
               taxonomy: &taxonomy
                 C1: 'Restricted identifiers - National IDs, tax numbers, and SSNs'
                 C2: 'Confidential personal and payment data - Names, emails, phone numbers, home addresses, dates of birth, and money amounts'
                 C3: 'Internal operational data - Surrogate IDs, loyalty tiers, currency codes, order status, and timestamps'
   transformers:
     - type: datahub-describer
       config:
         llm_model: claude-sonnet-5
         llm_base_url: https://ai.aiven.io/v1
         llm_api_key: "${LLM_API_KEY}"
         llm_timeout_seconds: 60
         llm_max_retries: 0
         describe_tables: true
     - type: datahub-classifier
       config:
         taxonomy: *taxonomy
   ```

   [View classifier parameters](#classifier-parameters)

   [View describer parameters](#describer-parameters)

1. Click **Next**.
1. On the last step, click **Advanced**.
1. In **Extra Pip Libraries**, enter
   `["-r /opt/aiven/ingestion-libraries/datahub-describer.txt", "-r /opt/aiven/ingestion-libraries/datahub-classifier.txt"]`.
1. Click **Save & Run**.

When the run is finished, open a table in DataHub to verify that tables have descriptions
ending with `[AI GENERATED]` and tags from your taxonomy.

### Remove or regenerate AI descriptions

To remove the AI-generated descriptions, create a `datahub-describer`
ingestion source. It removes every description that ends with `[AI GENERATED]`.
Descriptions added by people are not removed.

You can limit the scope of this source to a database or schema. If you don't,
the source covers the whole catalog, and the ingestion stops if the scope
has more than 1000 datasets.

1. In the DataHub UI, click **Data Sources**.
1. Click **Create Source**.
1. Select **Other**.
1. Add the `datahub-describer` source with `delete_generated` mode. For example:

   ```yaml
   source:
     type: datahub-describer
     config:
       mode: delete_generated
       llm_model: claude-sonnet-5           # Required by the config, not used in this mode.
       llm_base_url: https://ai.aiven.io/v1
       llm_api_key: '${LLM_API_KEY}'
       # Optional: limit to one database or schema.
       # platform: postgres
       # container_name: sales              # Database or schema name.
       # dataset_name: customers
       # field_name: email                  # Requires dataset_name.
   ```

1. Click **Next**.
1. On the last step, click **Advanced**.
1. In **Extra Pip Libraries**, enter
   `["-r /opt/aiven/ingestion-libraries/datahub-describer.txt"]`.
1. Click **Save & Run**.

To regenerate the AI descriptions, run the ingestion for that source.

## Classifier parameters

The options for the classifier include:

| Parameter | Description |
|-----------|-------------|
| `llm_model` | The model ID of the provider. |
| `llm_base_url` | The base URL of an OpenAI-compatible endpoint. |
| `llm_api_key` | The DataHub secret that stored your API key for the LLM provider. |
| `llm_timeout_seconds` | The timeout for the LLM request. Default is 60 seconds. |
| `llm_max_retries` | The maximum number of retries for the LLM call. Default is 0. |
| `confidence_threshold` | Proposals below this value are ignored. Default is 0.6. |
| `max_samples` | The maximum number of real sample values for each column sent to the LLM. Default is 8. Set to 0 to send none, using names and types only. |
| `max_columns_per_call` | The maximum number of columns classified in one LLM call. Default is 50. |
| `taxonomy` | A map of your categories. |

The `taxonomy` map in the transformer must be the same as the classifier's. Use
a YAML anchor to reference the classifier taxonomy in the transformer.

## Describer parameters

The options for the describer transformer include:

| Parameter | Description |
|-----------|-------------|
| `llm_model` | The model ID of the provider. |
| `llm_base_url` | The base URL of an OpenAI-compatible endpoint. |
| `llm_api_key` | The DataHub secret that stored your API key for the LLM provider. |
| `llm_timeout_seconds` | The timeout for the LLM request. Default is 60 seconds. |
| `llm_max_retries` | The maximum number of retries for the LLM call. Default is 0. |
| `max_columns_per_call` | The maximum number of columns described in one LLM call. Default is 40. |
| `max_columns_per_table_description` | The maximum number of columns used to write the table description. Default is 100. |
| `describe_tables` | Writes a description for each table. Default is `true`. |
| `rewrite_existing_descriptions` | Replace existing descriptions, including ones written by people. Default is `false`. |
| `column_prompt` | A custom prompt for the column description.  |
| `table_prompt` | A custom prompt for the table description.  |
