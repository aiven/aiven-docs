---
title: Access and use AI models with Aiven for AlloyDB Omni
sidebar_label: Use AI models
keywords: [Vertex AI, VertexAI]
early: true
---

Enable and use AI models in Aiven for AlloyDB Omni to build and deploy generative AI applications directly on your operational data.

Aiven for AlloyDB Omni allows you to integrate and use many AI models including
[OpenAI](/docs/products/alloydbomni/access-ai-models#use-openai),
[Gemini](/docs/products/alloydbomni/access-ai-models#use-gemini), or
[Hugging Face](/docs/products/alloydbomni/access-ai-models#use-hugging-face). You can also
integrate an AI model you built yourself using the
[bring your own model (BYOM)](/docs/products/alloydbomni/access-ai-models#bring-your-own-model-byom)
capability.

## Prerequisites

- Aiven for AlloyDB Omni service running

  :::note
  Aiven for AlloyDB Omni is in the
  [early availability](/docs/platform/concepts/beta_services#early-availability-) stage.
  :::

- [`psql` CLI client installed](https://www.postgresql.org/download/)
- [`gcloud` CLI client installed](https://cloud.google.com/sdk/docs/install)
- [Google service account credentials uploaded into Aiven for AlloyDB Omni](/docs/products/alloydbomni/manage-credentials)
- `google_ml_integration` extension installed using the `psql` CLI:

  ```sql
  CREATE EXTENSION google_ml_integration;
  ```

## Use OpenAI

1. Record your OpenAI user API key as a secret in Google Secret Manager.

1. Grant your Google service account access to the created secret using the `gcloud` CLI:

   ```bash
   gcloud secrets add-iam-policy-binding SECRET_ID
     --member="serviceAccount:GOOGLE_SERVICE_ACCOUNT_PRINCIPAL"
     --role="roles/secretmanager.secretAccessor"
   ```

   where:
   - `SECRET_ID` is the ID of you newly created secret recorded in the Google Secret
     Manager
   - `GOOGLE_SERVICE_ACCOUNT_PRINCIPAL` is your Google service account principal,
     for example `abc-vertex-ai-sa@sample-project-name.iam.gserviceaccount.com`

1. Declare the secret for the integration using the `psql` CLI:

   ```sql
   CALL google_ml.create_sm_secret(
       secret_id=>'DECLARED_SECRET_ID',
       secret_path=>'projects/GOOGLE_CLOUD_PROJECT_NAME/secrets/SECRET_ID/versions/1');
   ```

   where:
   - `DECLARED_SECRET_ID` is the local identifier for your secret
   - `GOOGLE_CLOUD_PROJECT_NAME` is the name of your Google Cloud project where the
     secret in stored
   - `SECRET_ID` is the ID of the secret created in Google Secret Manager

1. Define the AI model using the `psql` CLI:

   ```sql
   CALL google_ml.create_model(
       model_id => 'gpt-4o',
       model_provider => 'open_ai',
       model_request_url =>'https://api.openai.com/v1/chat/completions',
       model_type => 'generic',
       model_auth_type => 'secret_manager',
       model_auth_id => 'DECLARED_SECRET_ID',
       model_qualified_name => 'gpt-4o');
   ```

   where `DECLARED_SECRET_ID` is the local identifier for the secret declared for the
   integration.

1. Use the model by running:

   ```sql
   SELECT google_ml.predict_row('gpt-4o','{"model" : "gpt-4o", "messages" : [{"role": "user", "content": "What is Aiven?"}]}')->'choices'->0->'message'->'content';
   ```

## Use Gemini

:::note
[Gemini](https://cloud.google.com/gemini/docs/overview) models are integrated into Google
Cloud’s [Vertex AI](https://cloud.google.com/vertex-ai/docs?hl=en) platform. To enable
other Vertex-AI-supported models in Aiven, use
[the instructions for integrating Gemini](/docs/products/alloydbomni/access-ai-models#use-gemini),
adjusting as needed.
:::

1. Grant the service user access to utilize Vertex AI using the `gcloud` CLI:

   ```bash
   gcloud projects add-iam-policy-binding GOOGLE_CLOUD_PROJECT_NAME
     --member="serviceAccount:GOOGLE_SERVICE_ACCOUNT_PRINCIPAL"
     --role="roles/aiplatform.user"
   ```

   where:
   - `GOOGLE_CLOUD_PROJECT_NAME` is the name of your Google Cloud project
   - `GOOGLE_SERVICE_ACCOUNT_PRINCIPAL` is your Google service account principal,
     for example `abc-vertex-ai-sa@sample-project-name.iam.gserviceaccount.com`.

1. Define the AI model on your Aiven for AlloyDB Omni service using the `psql` CLI:

   ```sql
   CALL google_ml.create_model(
       model_id => 'gemini-1.0-pro',
       model_request_url => 'https://us-central1-aiplatform.googleapis.com/v1/projects/GOOGLE_CLOUD_PROJECT_NAME/locations/us-central1/publishers/google/models/gemini-1.0-pro:streamGenerateContent',
       model_provider => 'google',
       model_auth_type => 'alloydb_service_agent_iam');
   ```

   where `GOOGLE_CLOUD_PROJECT_NAME` is the name of your Google Cloud project.

1. Use the model by running:

   ```sql
   SELECT google_ml.predict_row(
     model_id =>'gemini-1.0-pro',
     request_body =>'{ "contents": { "role": "user", "parts": { "text": "What is Aiven?" }  }}');
   ```

## Use Hugging Face

1. Record your [Hugging Face access token](https://huggingface.co/docs/hub/en/security-tokens)
   as a secret in Google Secret Manager.

1. Grant your Google service account access to the created secret using the `gcloud` CLI:

   ```bash
   gcloud secrets add-iam-policy-binding SECRET_ID
     --member="serviceAccount:GOOGLE_SERVICE_ACCOUNT_PRINCIPAL"
     --role="roles/secretmanager.secretAccessor"
   ```

   where:
   - `SECRET_ID` is the ID of you newly created secret recorded in the Google Secret
     Manager
   - `GOOGLE_SERVICE_ACCOUNT_PRINCIPAL` is your Google service account principal,
     for example `abc-vertex-ai-sa@sample-project-name.iam.gserviceaccount.com`

1. Declare the secret for the integration using the `psql` CLI:

   ```sql
   CALL google_ml.create_sm_secret(
       secret_id=>'DECLARED_SECRET_ID',
       secret_path=>'projects/GOOGLE_CLOUD_PROJECT_NAME/secrets/SECRET_ID/versions/1');
   ```

   where:
   - `DECLARED_SECRET_ID` is the local identifier for your secret
   - `GOOGLE_CLOUD_PROJECT_NAME` is the name of your Google Cloud project where the
     secret in stored
   - `SECRET_ID` with the ID of the secret created in Google Secret Manager

1. Define the AI model using the `psql` CLI:

   ```sql
   CALL google_ml.create_model(
       model_id => 'Mistral-7B-Instruct-v0.3',
       model_provider => 'custom',
       model_request_url =>'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3',
       model_type => 'generic',
       model_auth_type => 'secret_manager',
       model_auth_id => 'DECLARED_SECRET_ID',
       model_qualified_name => 'Mistral-7B-Instruct-v0.3');
   ```

   where `DECLARED_SECRET_ID` is the local identifier for the secret declared for the
   integration.

1. Use the model by running:

   ```sql
   SELECT google_ml.predict_row('Mistral-7B-Instruct-v0.3','{"inputs" : "What is Aiven?"}')->0->'generated_text';
   ```

## Bring your own model (BYOM)

Aiven for AlloyDB Omni can connect to custom or 3rd party models remotely. Such remote
models can be used to:

- Generate embeddings by translating text prompts into numerical vectors (`embedding()`)
- Invoke predictions using SQL within transactions (`predict_row()`)

### BYOM prerequisites

- Model endpoint can be called using the HTTP/HTTPS REST protocol.
- Input and output of model endpoint calls support the JSON format.

### Enable BYOM for text embeddings

1. Declare transformation functions to move from text input to a JSON request by encode
   the `input_text` parameter into a JSON field `prompt` for the outgoing request:

    ```bash
    CREATE OR REPLACE FUNCTION mymodel_text_input_transform(model_id VARCHAR(100), input_text TEXT)
    RETURNS JSON
    LANGUAGE plpgsql
    AS $$
    DECLARE
        transformed_input JSON;
    BEGIN
        SELECT json_build_object(
            ‘prompt’,
            json_build_array(input_text))::JSON
        INTO transformed_input;
        RETURN transformed_inpput;
    END;
    $$;
    ```

1. Parse the returned response from JSON into a array of real vectors by translating the
   list of vector array into a single list of expected vectors:

    ```bash
    CREATE OR REPLACE FUNCTION mymodel_text_output_transform(model_id VARCHAR(100), response_json JSON)
    RETURNS REAL[]
    LANGUAGE plpgsql
    AS $$
    DECLARE
        transformed_output REAL[];
    BEGIN
        SELECT ARRAY(SELECT json_array_elements_text(response_json->0)) INTO transformed_output;
        RETURN transformed_output;
    END;
    $$;
    ```

1. Declare the secret for the integration using the `psql` CLI:

   ```sql
   CALL google_ml.create_sm_secret(
       secret_id=>'DECLARED_SECRET_ID',
       secret_path=>'projects/GOOGLE_CLOUD_PROJECT_NAME/secrets/SECRET_ID/versions/1');
   ```

   where:
   - `DECLARED_SECRET_ID` is the local identifier for your secret
   - `GOOGLE_CLOUD_PROJECT_NAME` is the name of your Google Cloud project where the
     secret in stored
   - `SECRET_ID` is the ID of the secret created in Google Secret Manager

1. Define the AI model using the `psql` CLI:

   ```sql
   CALL google_ml.create_model(
       model_id => 'LOCAL_MODEL_ID',
       model_provider => 'custom',
       model_request_url =>'MODEL_URL_ENDPOINT',
       model_type => 'MODEL_TYPE',
       model_auth_type => 'secret_manager',
       model_auth_id => 'DECLARED_SECRET_ID',
       model_in_transform_fn => ‘mymodel_text_input_transform’,
       model_out_transform_fn => ‘mymodel_text_output_transform’);
   ```

   where:
   - `LOCAL_MODEL_ID` is the name of the registered model
   - `M̀ODEL_URL_ENDPOINT` is a pointer to your remote model
   - `MODEL_TYPE` is either `text-embedding` or `generic` depending on whether to use
     an `embedding()` call or a `predict_row()` call
   - `DECLARED_SECRET_ID` is the local identifier for the secret declared for the
     integration
   - `model_in_transform_fn` and `model_out_transform_fn` are the transformation
     functions declared earlier

1. Use your model by running:

   ```sql
   SELECT
   google_ml.embedding(
   model_id => 'LOCAL_MODEL_ID',
   content => 'Aiven for AlloyDB Omni is a managed cloud-hosted SQL database service with AI integrations');
   ```

## Next step

With an AI model integrated, you can
[build generative AI applications using AlloyDB AI](https://cloud.google.com/alloydb/docs/ai).
