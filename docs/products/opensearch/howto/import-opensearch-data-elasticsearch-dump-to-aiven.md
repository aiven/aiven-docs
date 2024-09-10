---
title: Copy data from OpenSearch to Aiven for OpenSearch® using elasticsearch-dump
sidebar_label: Copy data from OpenSearch to Aiven for OpenSearch®
---

Backup your OpenSearch® data into Aiven for Opensearch.

To copy the index data, we will be using `elasticsearch-dump`
[tool](https://github.com/elasticsearch-dump/elasticsearch-dump). You
can read the [instructions on
GitHub](https://github.com/elasticsearch-dump/elasticsearch-dump/blob/master/README.md)
on how to install it. From this library, we will use `elasticdump`
command to copy the input index data to an specific output.

## Prerequisites {#copy-data-from-os-to-os}

-   `elasticsearch-dump`
    [tool](https://github.com/elasticsearch-dump/elasticsearch-dump)
    installed
-   OpenSearch cluster as the `input` (can be in Aiven or elsewhere)
-   Aiven for OpenSearch cluster as the `output`

:::note
The `input` and `ouput` can be either an OpenSearch URI or a file path
(local or remote file storage). In this particular case, we are using
both URLs, one from an **OpenSearch cluster** and the other one from
**Aiven for OpenSearch cluster**.
:::

To copy your data, collect this information:

OpenSearch cluster:

-   `INPUT_SERVICE_URI`: OpenSearch cluster URI, in the format
    `https://user:password@host:port`
-   `INPUT_INDEX_NAME`: the index that you aim to copy from your input
    source.

Aiven for OpenSearch:

-   `OUTPUT_SERVICE_URI`: your output OpenSearch service URI. You can
    find it in Aiven's dashboard.
-   `OUTPUT_INDEX_NAME`: the index to have in your output
    with the copied data.

:::note
Use `export` command to assign your variables in the command line before
running `elasticdump` command. For example, suppose your
`INPUT_SERVICE_URI` is `myexample`:

```
export INPUT_INDEX_NAME=myexample
```
:::

## Import mapping

The process of defining how a document and the fields are stored and
indexed is called mapping. When no data structure is specified, we rely
on OpenSearch to automatically detect the fields using dynamic mapping.
However, we can set our data mapping before the data is sent:

```shell
elasticdump \
--input=$INPUT_SERVICE_URI/$INPUT_INDEX_NAME \
--output=$OUTPUT_SERVICE_URI/$OUTPUT_INDEX_NAME \
--type=mapping
```

## Import data

This is how you can copy your index data from an OpenSearch cluster (can
be in Aiven or elsewhere) to an Aiven for OpenSearch one.

```shell
elasticdump \
--input=$INPUT_SERVICE_URI/$INPUT_INDEX_NAME \
--output=$OUTPUT_SERVICE_URI/$OUTPUT_INDEX_NAME \
--type=data
```

When the dump is completed, you can check that the index is available in
the OpenSearch service you send it to. You will be able to find it under
the **Indexes** tab in your Aiven console.

### Resources

Aiven for OpenSearch databases are automatically backed up, so you can
check more information about how the
[Backup process works](/docs/products/opensearch/concepts/backups).

------------------------------------------------------------------------
