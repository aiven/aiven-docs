---
title: Sample dataset
---

Databases are more fun with data, so to get you started on your OpenSearch® journey we picked this open data set of recipes as a great example you can try out yourself.

<!-- vale off -->

## Epicurious recipes

A dataset from [Kaggle](https://www.kaggle.com/hugodarwood/epirecipes)
with recipes, rating and nutrition information from
[Epicurious](https://www.epicurious.com).

Let's take a look at a sample recipe document:

```json
{
    "title": "A very nice Vegan dish",
    "desc": "A beautiful description of the recipe",
    "date": "2015-05-01T04:00:00.000Z",
    "categories": [
        "Vegan",
        "Tree Nut Free",
        "Soy Free",
        "No Sugar Added"
    ],
    "ingredients": [
        "list",
        "of",
        "ingredients"
    ],
    "directions": [
        "list",
        "of",
        "steps",
        "to prepare the dish"
    ],
    "calories": 32.0,
    "fat": 1.0,
    "protein": 1.0,
    "rating": 5.0,
    "sodium": 959.0,
}
```

## Load the data with Python {#load-data-with-python}

1.  Download and unzip the
    [full_format_recipes.json](https://www.kaggle.com/hugodarwood/epirecipes?select=full_format_recipes.json)
    file from the dataset in your current directory.
1.  Install the Python dependencies:

    ```shell
    pip install opensearch-py==1.0.0
    ```

1.  In this step you will create the script that reads the data file you
    downloaded and puts the records into the OpenSearch service. Create
    a file named `epicurious_recipes_import.py`, and add the following
    code; you will need to edit it to add the connection details for
    your OpenSearch service.

    Find the `SERVICE_URI` on Aiven's dashboard.

    ```python
    import json
    from opensearchpy import helpers, OpenSearch


    SERVICE_URI = 'YOUR_SERVICE_URI_HERE'
    INDEX_NAME = 'epicurious-recipes'

    os_client = OpenSearch(hosts=SERVICE_URI, ssl_enable=True)


    def load_data():
        with open('full_format_recipes.json', 'r') as f:
            data = json.load(f)
            for recipe in data:
                yield {'_index': INDEX_NAME, '_source': recipe}
    ```

    OpenSearch Python client offers a helper called bulk() which allows us
    to send multiple documents in one API call.

    ```python
    helpers.bulk(os_client, load_data())
    ```

1.  Run the script with the following command, and wait for it to
    complete:

    ```bash
    python epicurious_recipes_import.py
    ```

## Get data mapping with Python {#get-mapping-with-python}

When no data structure is specified, which is our case as shown on
[load the data with Python](/docs/products/opensearch/howto/sample-dataset#load-data-with-python),
OpenSearch uses dynamic mapping to automatically detect the
fields. To check the mapping definition of your data, OpenSearch client
provides a function called `get_mapping` as shown:

```python
import pprint

INDEX_NAME = 'epicurious-recipes'
mapping_data = os_client.indices.get_mapping(INDEX_NAME)

# Find index doc_type
doc_type = list(mapping_data[INDEX_NAME]["mappings"].keys())[0]

schema = mapping_data[INDEX_NAME]["mappings"][doc_type]
fields =  list(schema.keys())
pprint(fields)
pprint(schema)
```

You should be able to see the fields\' output:

```bash
['calories',
'categories',
'date',
'desc',
'directions',
'fat',
'ingredients',
'protein',
'rating',
'sodium',
'title']
```

And the mapping with the fields and their respective types.

```bash
{'calories': {'type': 'float'},
 'categories': {'fields': {'keyword': {'ignore_above': 256, 'type': 'keyword'}},
                'type': 'text'},
 'date': {'type': 'date'},
 'desc': {'fields': {'keyword': {'ignore_above': 256, 'type': 'keyword'}},
          'type': 'text'},
 'directions': {'fields': {'keyword': {'ignore_above': 256, 'type': 'keyword'}},
                'type': 'text'},
 'fat': {'type': 'float'},
 'ingredients': {'fields': {'keyword': {'ignore_above': 256,
                                        'type': 'keyword'}},
                 'type': 'text'},
 'protein': {'type': 'float'},
 'rating': {'type': 'float'},
 'sodium': {'type': 'float'},
 'title': {'fields': {'keyword': {'ignore_above': 256, 'type': 'keyword'}},
           'type': 'text'}}
```

Read more about OpenSearch mapping in the [official OpenSearch
documentation](https://opensearch.org/docs/latest/opensearch/rest-api/index-apis/put-mapping/).

## Load the data with NodeJS {#load-data-with-nodejs}

To load data with NodeJS we'll use [OpenSearch JavaScript
client](https://github.com/opensearch-project/opensearch-js)

Download
[full_format_recipes.json](https://www.kaggle.com/hugodarwood/epirecipes?select=full_format_recipes.json),
unzip and put it into the project folder.

It is possible to index values either one by one or by using a bulk
operation. Because we have a file containing a long list of recipes
we'll use a bulk operation. A bulk endpoint expects a request in a
format of a list where an action and an optional document are followed
one after another:

-   Action and metadata
-   Optional document
-   Action and metadata
-   Optional document
-   and so on

To achieve this expected format, use a flat map to create a flat list of
such pairs instructing OpenSearch to index the documents.

```javascript
module.exports.recipes = require("./full_format_recipes.json");

/**
 * Indexing data from json file with recipes.
 */
module.exports.indexData = () => {
  console.log(`Ingesting data: ${recipes.length} recipes`);
  const body = recipes.flatMap((doc) => [
    { index: { _index: indexName } },
    doc,
  ]);

  client.bulk({ refresh: true, body }, console.log(result.body));
};
```

Run this method to load the data and wait till it's done. We\'re
injecting over 20k recipes, so it can take 10-15 seconds.

## Get data mapping with NodeJS {#get-mapping-with-nodejs}

We didn't specify any particular structure for the recipes data when we
uploaded it. Even though we could have set explicit mapping beforehand,
we opted to rely on OpenSearch to derive the structure from the data and
use dynamic mapping. To see the mapping definitions use the `getMapping`
method and provide the index name as a parameter.

```javascript
/**
 * Retrieving mapping for the index.
 */
module.exports.getMapping = () => {
  console.log(`Retrieving mapping for the index with name ${indexName}`);

  client.indices.getMapping({ index: indexName }, (error, result) => {
    if (error) {
      console.error(error);
    } else {
      console.log(result.body.recipes.mappings.properties);
    }
  });
};
```

You should be able to see the following structure:

```javascript
{
  calories: { type: 'long' },
  categories: { type: 'text', fields: { keyword: [Object] } },
  date: { type: 'date' },
  desc: { type: 'text', fields: { keyword: [Object] } },
  directions: { type: 'text', fields: { keyword: [Object] } },
  fat: { type: 'long' },
  ingredients: { type: 'text', fields: { keyword: [Object] } },
  protein: { type: 'long' },
  rating: { type: 'float' },
  sodium: { type: 'long' },
  title: { type: 'text', fields: { keyword: [Object] } }
}
```

These are the fields you can play with. You can find information on
dynamic mapping types [in the
documentation](https://opensearch.org/docs/latest/field-types/#dynamic-mapping).

## Sample queries with HTTP client

With the data in place, we can start trying some queries against your
OpenSearch service. Since it has a simple HTTP interface, you can use
your favorite HTTP client. In these examples, we will use
[httpie](https://github.com/httpie/httpie) because it's one of our
favorites.

First, export the `SERVICE_URI` variable with your OpenSearch service
URI address and index name from the previous script:

```bash
export SERVICE_URI="YOUR_SERVICE_URI_HERE/epicurious-recipes"
```

1.  Execute a basic search for the word `vegan` across all documents and
    fields:

    ```bash
    http "$SERVICE_URI/_search?q=vegan"
    ```

1.  Search for `vegan` in the `desc` or `title` fields only:

    ```bash
    http POST "$SERVICE_URI/_search" <<< '
    {
        "query": {
            "multi_match": {
                "query": "vegan",
                "fields": ["desc", "title"]
            }
        }
    }
    '
    ```

1.  Search for recipes published only in 2013:

    ```bash
    http POST "$SERVICE_URI/_search" <<< '
    {
        "query": {
            "range" : {
                "date": {
                "gte": "2013-01-01",
                "lte": "2013-12-31"
                }
            }
        }
    }
    '
    ```
