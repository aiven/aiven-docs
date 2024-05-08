---
title: Custom dictionay files
enterprise: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"

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
1. In the **Upload a custom dictionary file** modal:
   - Select **File type** (Stopwords, Synonyms, WordNet).
   - Enter a **File name**.
   - Choose the file from your system and click **Upload**.

</TabItem>
<TabItem value="CLI" label="CLI">

Run:

```bash
  avn service custom-file upload --project <project> \
  --file_type <stopwords|synonyms|wordnet> \
  --file_path <file_path> \
  --file_name <file_name> <service_name>
```

Parameters:

- `<project>`: Your Aiven project name.
- `<stopwords|synonyms|wordnet>`: The type of dictionary file to upload.
- `<file_path>`: Path to the local file on your system.
- `<file_name>`: The name of the file to appear in Aiven for OpenSearch.
- `<service_name>`: Name of your OpenSearch service.

</TabItem>
</Tabs>

## List files

List all custom dictionary files associated with your OpenSearch service.

<Tabs groupId="list-method">
<TabItem value="Console" label="Console" default>

In the **Aiven Console**, all uploaded custom dictionary files are listed in the
**Custom dictionary files** section, showing the file path, type, size, and
latest upload timestamp.

</TabItem>
<TabItem value="CLI" label="CLI">

Run:
```bash
  avn service custom-file list --project <project> <service_name>
```
Parameters:

- `<project>`: Your Aiven project name.
- `<service_name>`: Name of your OpenSearch service.

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
  avn service custom-file update --project <project> \
    --file_path <file_path> \
    --file_id <file_id> <service_name>
```

Parameters:

- `<project>`: Your Aiven project name.
- `<file_path>`: Path to the local file on your system.
- `<file_id>`: ID of the file to replace. Obtain this ID using the
  [List](#list-files) command.
- `<service_name>`: Name of your OpenSearch service.

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
  avn service custom-file get --project <project> \
  --file_id <file_id> \
  --target_filepath <file_path> \
  --stdout_write <service_name>
```

Parameters:

- `<project>`: Your Aiven project name.
- `<file_id>`: ID of the file to replace to download. Obtain this ID using the
  [List](#list-files) command.
- `<file_path>`: Path where the file should be saved locally.
- `<service_name>`: Name of your OpenSearch service.

</TabItem>
</Tabs>

## Limitations

- This feature requires Aiven Enterprise.
- Files cannot be deleted. They can only be replaced.
- The file location is fixed and cannot be customized.
- If you move to a different cloud or project, files will be copied or moved accordingly.
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
cat <<EOF > demo_stopwords.txt
a
fox
jumps
the
EOF
```

### Upload the stopwords file

[Upload](#upload-files) this file using the Aiven Console or CLI.

### Create an index that uses the stopwords file

Create an index using the stopwords file via the Aiven Console or CLI.

<Tabs groupId="create-index-method">
<TabItem value="Console" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io), select your project,
   and select your Aiven for OpenSearch service.
1. Click **Indexes** from the sidebar.
1. In the **Index retention patterns** section, click **Add pattern**.
1. Enter the pattern to use and the maximum index count for the pattern.
1. Click **Create**.

</TabItem>
<TabItem value="CLI" label="CLI">

Replace `<service_url>` with your service's URL and run the following command to
create the index:

```curl
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
}' `<service_url>/demo-index?pretty`

```

</TabItem>
</Tabs>

### Verify the stopwords filter

Use the `_analyze ` API to verify that the stopwords filter is working.
Replace `<service_url>` with your service's URL.

```bash
  curl -H 'Content-Type: application/json' -d'{
    "text": "a quick brown fox jumps over the lazy dog"
  } ' <service_url>/demo-index/_analyze?pretty
```

Expected output tokens: "quick," "brown," "over," "lazy," and "dog."


## Related pages

- [OpenSearch text analysis](https://opensearch.org/docs/2.13/analyzers/)
