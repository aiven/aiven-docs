---
title: Custom dictionary files
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Custom dictionary files are user-defined files that enhance query analysis and improve search relevance in OpenSearch. By adding domain-specific vocabulary and rules, these files refine search results to be more accurate and relevant.

Custom dictionary files are categorized into three types:

- **Stopwords**: Exclude common words like "the" and "is" to refine search results.
- **Synonyms**: Equate similar terms, such as "car" and "automobile," to improve
  query matching.
- **WordNet**: Provide semantic relationships between words, such as synonyms and antonyms.

:::note
Ensure your custom dictionary files are in plain text (UTF-8 encoded) format.
:::

## Upload files

Upload new custom dictionary files to your OpenSearch service.

<Tabs groupId="upload-method">
<TabItem value="Console" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io), select your project,
   and select your Aiven for OpenSearch service.
1. Click **Indexes** on the sidebar.
1. Click **Upload file** in the **Custom dictionary files** section.
1. In the **Upload a custom dictionary file** screen:
   - Select **File type** (Stopwords, Synonyms, WordNet).
   - Enter a **File name**.
   - Choose the file from your system and click **Upload**.

</TabItem>
<TabItem value="CLI" label="CLI">

Run:

```bash
avn service custom-file upload --project PROJECT_NAME \
--file_type <stopwords|synonyms|wordnet> \
--file_path <file_path> \
--file_name <file_name> SERVICE_NAME

```

Parameters:

- `PROJECT_NAME`: Your Aiven project name.
- `<stopwords|synonyms|wordnet>`: The type of dictionary file to upload.
- `<file_path>`: Path to the local file on your system.
- `<file_name>`: The name of the file to appear in Aiven for OpenSearch.
- `SERVICE_NAME`: Name of your OpenSearch service.

</TabItem>
</Tabs>

## List files

List all custom dictionary files associated with your OpenSearch service.

<Tabs groupId="list-method">
<TabItem value="Console" label="Console" default>

In the **Aiven Console**, the **Custom Dictionary Files** section displays all uploaded
custom dictionary files, including details such as the file path, type, size, and the
most recent upload timestamp.

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

Once you upload a custom dictionary file, you can only replace it, not delete it.
To update an existing custom dictionary file, replace it with a new file containing
the updated words.

<Tabs groupId="replace-method">
<TabItem value="Console" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io), select your project,
   and select your Aiven for OpenSearch service.
1. Click **Indexes** on the sidebar.
1. In the **Custom dictionary files** section, locate the desired file.
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

Download a custom dictionary file to your local system.

<Tabs groupId="download-method">
<TabItem value="Console" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io), select your project,
   and select your Aiven for OpenSearch service.
1. Click **Indexes** on the sidebar.
1. In the **Custom dictionary files** section, locate the desired file.
1. Click <ConsoleLabel name="actions"/> > <ConsoleLabel name="download"/>.
1. Choose you location and click **Save**.


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
- `<file_id>`: ID of the file to replace to download. Obtain this ID using the
  [List](#list-files) command.
- `<file_path>`: Path where the file should be saved locally.
- `SERVICE_NAME`: Name of your OpenSearch service.

</TabItem>
</Tabs>

## Limitations

- This feature requires Aiven Enterprise.
- Files cannot be deleted. They can only be replaced.
- The file location is fixed and cannot be customized.
- If you move to a different cloud or project, files are copied or moved accordingly.
- For OpenSearch Cross-Cluster Replication (CCR), files must be uploaded to
  both services manually.
- Use alphanumeric characters and underscores only for file names.

## Example: How to use custom dictionary files with indexes

After uploading a custom dictionary file, you can use it in your index settings by
specifying custom filters or analyzers. This example demonstrates how to create an
index that uses a custom stopwords file.

### Create a stopwords file

Create a file named `demo_stopwords.txt` with your stopwords.

```plaintext
a
fox
jumps
the
EOF
```

### Upload the stopwords file

[Upload](#upload-files) this file using the Aiven Console or CLI.

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
     "index.analysis.filter.custom_stop_words_filter.stopwords_path": "custom/stopwords/nofox",
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
          "stopwords_path": "custom/stopwords/nofox"
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
POST customdictionarytest/_analyze
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

## Related pages

- [Indices](/docs/products/opensearch/concepts/indices)
- [OpenSearch text analysis](https://opensearch.org/docs/2.13/analyzers/)
- [Analyze API](https://opensearch.org/docs/latest/api-reference/analyze-apis/)
