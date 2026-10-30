---
title: Custom files for Aiven for OpenSearch®
sidebar_label: Custom files
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages";

Upload, list, replace, and download custom files for your Aiven for OpenSearch® service to refine text analysis and improve search relevance.

Custom files are user-defined files that control how Aiven for OpenSearch analyzes text.
By adding domain-specific vocabulary and rules, these files refine search results to be
more accurate and relevant.

Aiven for OpenSearch supports the following custom file types:

- **Stopwords**: Exclude common words such as "the" and "is" to refine search results.
- **Synonyms**: Equate similar terms, such as "car" and "automobile," to improve
  query matching.
- **WordNet**: Provide semantic relationships between words, such as synonyms and
  antonyms.
- **Hyphenation patterns**: Define XML hyphenation patterns for the
  `hyphenation_decompounder` token filter, which splits compound words for languages
  such as German, Dutch, and the Scandinavian languages.

:::note
Stopwords, synonyms, and WordNet files must be in plain text (UTF-8 encoded) format.
Hyphenation patterns files must be well-formed XML (UTF-8 encoded).
:::

## Reference locations

Aiven for OpenSearch stores every uploaded file at a fixed reference location in the
following format:

```text
custom/FILE_TYPE/FILE_NAME
```

`FILE_TYPE` is `stopwords`, `synonyms`, `wordnet`, or `hyphenation_patterns`, and
`FILE_NAME` is the name you gave the file at upload, without a file extension. For
example, a stopwords file named `demo_stopwords` is stored at
`custom/stopwords/demo_stopwords`.

Use the reference location when you point an analyzer, token filter, or index setting at
the file. The reference location does not change when you replace the file.

## Upload files

Upload new custom files to your OpenSearch service.

<Tabs groupId="upload-method">
<TabItem value="Console" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io), select your project,
   and select your Aiven for OpenSearch service.
1. Click <ConsoleLabel name="data"/> > <ConsoleLabel name="opensearchindexes"/>.
1. In the **Custom files** section, click **Upload file**.
1. In the **Upload a custom file** window:
   - Select a **File type**: **Synonyms**, **Stopwords**, **WordNet**, or
     **Hyphenation patterns**.
   - Enter a **Filename**. Use alphanumeric characters and underscores only.
   - Choose the file from your system and click **Upload**.

</TabItem>
<TabItem value="CLI" label="CLI">

Run:

```bash
avn service custom-file upload --project PROJECT_NAME \
--file_type <stopwords|synonyms|wordnet|hyphenation_patterns> \
--file_path <file_path> \
--file_name <file_name> SERVICE_NAME

```

Parameters:

- `PROJECT_NAME`: Your Aiven project name.
- `<stopwords|synonyms|wordnet|hyphenation_patterns>`: The type of file to upload. Use
  `hyphenation_patterns` for the **Hyphenation patterns** (XML) file type.
- `<file_path>`: Path to the local file on your system.
- `<file_name>`: The name of the file to appear in Aiven for OpenSearch. Use
  alphanumeric characters and underscores only.
- `SERVICE_NAME`: Name of your OpenSearch service.

</TabItem>
</Tabs>

Aiven for OpenSearch validates the file against the selected file type and rejects
uploads that do not match, for example an XML file uploaded as **Stopwords**.

## List files

List all custom files associated with your OpenSearch service.

<Tabs groupId="list-method">
<TabItem value="Console" label="Console" default>

In the [Aiven Console](https://console.aiven.io), the **Custom files** section lists all
uploaded files with their **Reference location**, **File type**, **Size**, and
**Latest upload** time.

</TabItem>
<TabItem value="CLI" label="CLI">

Run:

```bash
avn service custom-file list --project PROJECT_NAME SERVICE_NAME
```

Parameters:

- `PROJECT_NAME`: Your Aiven project name.
- `SERVICE_NAME`: Name of your OpenSearch service.

</TabItem>
</Tabs>

## Replace files

Once you upload a custom file, you can only replace it, not delete it. To update an
existing file, replace it with a new file that contains the updated content. Replacing a
file overwrites the original permanently. You cannot change the file type or the
filename, and the reference location stays the same.

<Tabs groupId="replace-method">
<TabItem value="Console" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io), select your project,
   and select your Aiven for OpenSearch service.
1. Click <ConsoleLabel name="data"/> > <ConsoleLabel name="opensearchindexes"/>.
1. In the **Custom files** section, locate the file to replace.
1. Click <ConsoleLabel name="actions"/> > <ConsoleLabel name="replace file"/>.
1. Choose the new file from your system and click **Upload**.

</TabItem>
<TabItem value="CLI" label="CLI">

Run:

```bash
avn service custom-file update --project PROJECT_NAME \
  --file_path <file_path> \
  --file_id <file_id> SERVICE_NAME
```

Parameters:

- `PROJECT_NAME`: Your Aiven project name.
- `<file_path>`: Path to the local file on your system.
- `<file_id>`: ID of the file to replace. Obtain this ID using the
  [List](#list-files) command.
- `SERVICE_NAME`: Name of your OpenSearch service.

</TabItem>
</Tabs>

## Download files

Download a custom file to your local system.

<Tabs groupId="download-method">
<TabItem value="Console" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io), select your project,
   and select your Aiven for OpenSearch service.
1. Click <ConsoleLabel name="data"/> > <ConsoleLabel name="opensearchindexes"/>.
1. In the **Custom files** section, locate the file to download.
1. Click <ConsoleLabel name="actions"/> > <ConsoleLabel name="download file"/>.
1. Choose your location and click **Save**.

</TabItem>
<TabItem value="CLI" label="CLI">
Run:

```bash
avn service custom-file get --project PROJECT_NAME \
--file_id <file_id> \
--target_filepath <file_path> \
--stdout_write SERVICE_NAME
```

Parameters:

- `PROJECT_NAME`: Your Aiven project name.
- `<file_id>`: ID of the file to download. Obtain this ID using the
  [List](#list-files) command.
- `<file_path>`: Path where the file should be saved locally.
- `SERVICE_NAME`: Name of your OpenSearch service.

</TabItem>
</Tabs>

## Limitations

- Files cannot be deleted. They can only be replaced.
- The reference location is fixed and cannot be customized.
- If you move to a different cloud or project, files are copied or moved accordingly.
- For OpenSearch Cross-Cluster Replication (CCR), files must be uploaded to
  both services manually.
- Use alphanumeric characters and underscores only for file names.
- Hyphenation patterns files must be well-formed XML, or the upload is rejected.

## Example: Use a stopwords file with an index

After uploading a custom file, you can use it in your index settings by specifying custom
filters or analyzers. This example shows how to create an index that uses a custom
stopwords file.

### Create a stopwords file

Create a file named `demo_stopwords.txt` with your stopwords.

```plaintext
a
fox
jumps
the
```

### Upload the stopwords file

[Upload](#upload-files) this file as the **Stopwords** file type with the filename
`demo_stopwords`. Aiven for OpenSearch stores it at
`custom/stopwords/demo_stopwords`.

### Create an index that uses the stopwords file

Create an index using the stopwords file via the OpenSearch Dashboards or the API.

<Tabs groupId="create-index-method">
<TabItem value="OpenSearch Dashboards" label="OpenSearch Dashboards" default>

1. Log in to the [Aiven Console](https://console.aiven.io), select your project,
   and select your Aiven for OpenSearch service.
1. Access the **OpenSearch Dashboards** tab in the **Connection information** section.
1. Use the **Service URI** to access OpenSearch Dashboards in a browser.
1. Log in with the provided **User** and **Password**.
1. Click **Index Management** > **Indices** > **Create Index**.
1. Enter the details for the index.
1. Expand the **Advanced settings** section and insert the following JSON
   configuration to use the stopwords file:

   ```json
   {
     "index.analysis.analyzer.default.filter": [
       "custom_stop_words_filter"
     ],
     "index.analysis.analyzer.default.tokenizer": "whitespace",
     "index.analysis.filter.custom_stop_words_filter.ignore_case": "true",
     "index.analysis.filter.custom_stop_words_filter.stopwords_path": "custom/stopwords/demo_stopwords",
     "index.analysis.filter.custom_stop_words_filter.type": "stop",
     "index.number_of_replicas": "1",
     "index.number_of_shards": "1"
   }
   ```

1. Click **Create**.

</TabItem>
<TabItem value="API" label="API">

Alternatively, you can use the API by replacing `${SERVICE_URL}` with your service URL
and running the following command:

```bash
curl -X PUT -H "Content-Type: application/json" -d'{
  "settings": {
    "analysis": {
      "analyzer": {
        "default": {
          "tokenizer": "whitespace",
          "filter": ["custom_stop_words_filter"]
        }
      },
      "filter": {
        "custom_stop_words_filter": {
          "type": "stop",
          "ignore_case": true,
          "stopwords_path": "custom/stopwords/demo_stopwords"
        }
      }
    }
  }
}' ${SERVICE_URL}/demo-index?pretty

```

</TabItem>
</Tabs>

### Verify the stopwords filter

Verify the stopwords filter by using the `_analyze` API.

<Tabs groupId="verify-filter-method">
<TabItem value="OpenSearch Dashboards" label="OpenSearch Dashboards" default>

1. Go to **Dev Tools** in OpenSearch Dashboards.
1. Use the `_analyze` API to verify that the stopwords filter is working.

```bash
POST demo-index/_analyze
{
  "text": "a quick brown fox jumps over the lazy dog"
}
```

</TabItem>
<TabItem value="API" label="API">

Alternatively, use the API by replacing `${SERVICE_URL}` with your service URL and
running the following command:

```curl
curl -H 'Content-Type: application/json' -d'{
  "text": "a quick brown fox jumps over the lazy dog"
} ' ${SERVICE_URL}/demo-index/_analyze?pretty

```

</TabItem>
</Tabs>

## Example: Use a hyphenation patterns file with an index

Hyphenation patterns files are referenced the same way, through the
`hyphenation_patterns_path` parameter of the `hyphenation_decompounder` token filter.
After you [upload](#upload-files) an XML patterns file as the **Hyphenation patterns**
file type with the filename `de_hyphenation`, create an index that uses it:

```bash
curl -X PUT -H "Content-Type: application/json" -d'{
  "settings": {
    "analysis": {
      "filter": {
        "custom_decompounder": {
          "type": "hyphenation_decompounder",
          "hyphenation_patterns_path": "custom/hyphenation_patterns/de_hyphenation",
          "word_list": ["kraft", "fahrzeug"]
        }
      },
      "analyzer": {
        "custom_decompound_analyzer": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": ["lowercase", "custom_decompounder"]
        }
      }
    }
  }
}' ${SERVICE_URL}/demo-compound-index?pretty

```

The `hyphenation_decompounder` token filter also requires a word list, supplied either
inline with `word_list`, as in the preceding example, or as a path to a file with
`word_list_path`.

<RelatedPages/>

- [Indices](/docs/products/opensearch/concepts/indices)
- [OpenSearch text analysis](https://docs.opensearch.org/latest/analyzers/)
- [Hyphenation decompounder token filter](https://docs.opensearch.org/latest/analyzers/token-filters/hyphenation-decompounder/)
- [Analyze API](https://docs.opensearch.org/latest/api-reference/analyze-apis/)
