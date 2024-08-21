---
title: Use Aiven for OpenSearch® with cURL
---

Connect to your Aiven for OpenSearch® service with [cURL](https://curl.se/).

## Variables

These are the placeholders you will need to replace in the code samples:

| Variable         | Description                                                                            |
| ---------------- | -------------------------------------------------------------------------------------- |
| `OPENSEARCH_URI` | Service URI, including username and password, available from the service overview page |

## Connect to OpenSearch

Connect to your service with:

```
curl OPENSEARCH_URI
```

If the connection is successful, one of the nodes in your cluster will
respond with some information including:

-   `name` The node name you are connected to (this will be the name of
    your service, with the node identifier suffix)
-   `version` The version information includes both the `distribution`
    and the `version` of the distribution that is running

## Manage indices

OpenSearch groups data into an index rather than a table.

### Create an index

Create an index by making a `PUT` call to it:

```bash
curl -X PUT OPENSEARCH_URI/shopping-list
```

The response should have status 200 and the body data will have
`acknowledged` set to true.

If you already know something about the fields that will be in the
documents you'll store, you can create an index with mappings to
describe those known fields:

```bash
curl -X PUT -H "Content-Type: application/json" \
OPENSEARCH_URI/shopping-list \
-d '{
    "mappings": {
        "properties": {
            "item": { "type": "keyword"  },
            "quantity": { "type": "integer" }
        }
    }
 }'
```

This example creates the shopping list example but adds information to
help the indexer know how to handle the expected fields.

### List of indices

To list the indices do:

```bash
curl OPENSEARCH_URI/_cat/indices
```

### Add an item to the index

OpenSearch is a document database so there is no enforced schema
structure for the data you store. To add an item, `POST` the JSON data
that should be stored:

```bash
curl -H "Content-Type: application/json" \
OPENSEARCH_URI/shopping-list/_doc \
-d '{
    "item": "apple",
    "quantity": 2
    }'
```

Other data fields don't need to match in format:

```bash
curl -H "Content-Type: application/json" \
OPENSEARCH_URI/shopping-list/_doc \
-d '{
    "item": "bucket",
    "color": "blue",
    "quantity": 5,
    "notes": "the one with the metal handle"
    }'
```

These documents are stored in the `shopping-list` index.

## Search or retrieve data

OpenSearch is designed to make stored information easy to search and
access (the clue is in the name). See the following examples to get you
started, and refer to the official [OpenSearch
Documentation](https://opensearch.org/docs/opensearch/index/) for more
information.

### Search all items

To list everything, run:

```bash
curl OPENSEARCH_URI/_search
```

Search results include some key fields to look at when you try this
example:

-   `hits` holds the main payload of the response
-   `hits.hits` is a collection of results that matched the query. This
    includes:
    -   `_index` the index that the document was stored in
    -   `_score` how good a match the document is (on a scale of 0 to 1)
    -   `_source` the document that matched

### Simple search

For the most simple search to match a string, you can use:

```bash
curl OPENSEARCH_URI/_search?q=apple
```

### Advanced search options

For more advanced searches, you can send a more detailed payload to
specify which fields to search among other options:

```bash
curl -H "Content-Type: application/json" \
OPENSEARCH_URI/_search \
-d '{
    "query": {
        "multi_match" : {
            "query" : "apple",
            "fields" : ["item", "notes"]
        }
    }
}'
```
