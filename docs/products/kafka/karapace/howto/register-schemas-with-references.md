---
title: Register schemas with references in Karapace
sidebar_label: Register schemas with references
---

import RelatedPages from "@site/src/components/RelatedPages";

Use the Karapace Schema Registry API and `curl` to register Avro and Protobuf schemas that use schema references.

[Schema references in Karapace](/docs/products/kafka/karapace/concepts/schema-references)
explains which formats support references, what each `references` field means, and how
Karapace resolves linked schemas during compatibility checks.

## Prerequisites

- An [Aiven for Apache Kafka®](/docs/products/kafka) service with the Karapace Schema
  Registry enabled
- Registry connection variables: `SCHEMA_REGISTRY_URL`, `SCHEMA_REGISTRY_USER`, and
  `SCHEMA_REGISTRY_PASSWORD`
- `curl` available in your environment

## Example: Avro records with references

Avro schema references require Karapace 6.1.0 or later.

In each `references` entry, `name` is a label only and can be any value. Karapace
resolves the reference from the fully qualified type name in your schema (for example
`com.example.Country`), together with `subject` and `version`.

Register a `Country` schema, an `Address` schema that references `Country`, a `Job`
schema, and a `Person` schema that references `Address` and `Job`.

1. Register the `Country` schema:

   ```bash
   curl -X POST "$SCHEMA_REGISTRY_URL/subjects/country/versions" \
     -u "$SCHEMA_REGISTRY_USER:$SCHEMA_REGISTRY_PASSWORD" \
     -H "Content-Type: application/vnd.schemaregistry.v1+json" \
     -d '{
       "schemaType": "AVRO",
       "schema": "{\"type\":\"record\",\"name\":\"Country\",\"namespace\":\"com.example\",\"fields\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"code\",\"type\":\"string\"}]}"
     }'
   ```

1. Register the `Address` schema, referencing `Country`:

   ```bash
   curl -X POST "$SCHEMA_REGISTRY_URL/subjects/address/versions" \
     -u "$SCHEMA_REGISTRY_USER:$SCHEMA_REGISTRY_PASSWORD" \
     -H "Content-Type: application/vnd.schemaregistry.v1+json" \
     -d '{
       "schemaType": "AVRO",
       "schema": "{\"type\":\"record\",\"name\":\"Address\",\"namespace\":\"com.example\",\"fields\":[{\"name\":\"street\",\"type\":\"string\"},{\"name\":\"city\",\"type\":\"string\"},{\"name\":\"country\",\"type\":\"com.example.Country\"}]}",
       "references": [
         {
           "name": "country.avsc",
           "subject": "country",
           "version": 1
         }
       ]
     }'
   ```

   In this request, `country.avsc` is only a label. Karapace resolves the `Country`
   record through the `com.example.Country` type in the schema, together with
   `subject` and `version`.

1. Register the `Job` schema:

   ```bash
   curl -X POST "$SCHEMA_REGISTRY_URL/subjects/job/versions" \
     -u "$SCHEMA_REGISTRY_USER:$SCHEMA_REGISTRY_PASSWORD" \
     -H "Content-Type: application/vnd.schemaregistry.v1+json" \
     -d '{
       "schemaType": "AVRO",
       "schema": "{\"type\":\"record\",\"name\":\"Job\",\"namespace\":\"com.example\",\"fields\":[{\"name\":\"title\",\"type\":\"string\"},{\"name\":\"salary\",\"type\":\"double\"}]}"
     }'
   ```

1. Register the `Person` schema, referencing `Address` and `Job`:

   ```bash
   curl -X POST "$SCHEMA_REGISTRY_URL/subjects/person/versions" \
     -u "$SCHEMA_REGISTRY_USER:$SCHEMA_REGISTRY_PASSWORD" \
     -H "Content-Type: application/vnd.schemaregistry.v1+json" \
     -d '{
       "schemaType": "AVRO",
       "schema": "{\"type\":\"record\",\"name\":\"Person\",\"namespace\":\"com.example\",\"fields\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"age\",\"type\":\"int\"},{\"name\":\"address\",\"type\":\"com.example.Address\"},{\"name\":\"job\",\"type\":\"com.example.Job\"}]}",
       "references": [
         {
           "name": "address.avsc",
           "subject": "address",
           "version": 1
         },
         {
           "name": "job.avsc",
           "subject": "job",
           "version": 1
         }
       ]
     }'
   ```

## Example: Protobuf messages with imports

Register an `Address` message and a `Customer` message that imports `Address`.

1. Register the `Address` schema:

   ```bash
   curl -X POST "$SCHEMA_REGISTRY_URL/subjects/address-proto/versions" \
     -u "$SCHEMA_REGISTRY_USER:$SCHEMA_REGISTRY_PASSWORD" \
     -H "Content-Type: application/vnd.schemaregistry.v1+json" \
     -d '{
       "schemaType": "PROTOBUF",
       "schema": "syntax = \"proto3\"; package com.example; message Address { string street = 1; string city = 2; }"
     }'
   ```

1. Register the `Customer` schema, referencing `Address`:

   ```bash
   curl -X POST "$SCHEMA_REGISTRY_URL/subjects/customer-proto/versions" \
     -u "$SCHEMA_REGISTRY_USER:$SCHEMA_REGISTRY_PASSWORD" \
     -H "Content-Type: application/vnd.schemaregistry.v1+json" \
     -d '{
       "schemaType": "PROTOBUF",
       "schema": "syntax = \"proto3\"; package com.example; import \"address.proto\"; message Customer { int32 id = 1; string name = 2; Address address = 3; }",
       "references": [
         {
           "name": "address.proto",
           "subject": "address-proto",
           "version": 1
         }
       ]
     }'
   ```

<RelatedPages/>

- [Schema references in Karapace](/docs/products/kafka/karapace/concepts/schema-references)
- [Get started with Karapace](/docs/products/kafka/karapace/get-started)
- [Enable Karapace schema registry and REST APIs](/docs/products/kafka/karapace/howto/enable-karapace)
