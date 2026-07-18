---
title: Migrate to Aiven for OpenSearch® using Migration Assistant on GCP
sidebar_label: Migrate using Migration Assistant (GCP)
---

import RelatedPages from "@site/src/components/RelatedPages";

Use the OpenSearch Migration Assistant to migrate Elasticsearch or OpenSearch workloads to Aiven for OpenSearch® on Google Cloud Platform (GCP), with support for large-scale backfill, live traffic capture, and private networking.

The [OpenSearch Migration Assistant](https://github.com/opensearch-project/opensearch-migrations)
is an open-source, Kubernetes-native tool that handles migrating to OpenSearch. It
covers metadata migration, index mapping, live traffic capture and replay, and
comparison tooling to validate your target cluster before cutover. Aiven contributed
full GCP support, including private networking, to the project.

Use the Migration Assistant rather than
[reindexing from remote](./migrating_elasticsearch_data_to_aiven.md) when:

- Your dataset is large (hundreds of millions of documents or more).
- You need live migration with minimal downtime by capturing traffic during the
  migration.
- Your organization requires migration traffic to stay off the public internet.

## Prerequisites

Before you start:

- A GCP project with permission to create GKE clusters, VPCs, and Cloud Storage
  buckets.
- [Terraform](https://developer.hashicorp.com/terraform) 1.6 or later.
- An [Aiven for OpenSearch service](/docs/products/opensearch/get-started) as the
  migration target.
- A source Elasticsearch or OpenSearch cluster reachable from GCP.

:::note
For Elasticsearch versions earlier than 8.0, install the `repository-gcs` plugin on
every source node before registering the snapshot repository. Elasticsearch 8.0+
and OpenSearch include this plugin by default. Without it, snapshot-repository
registration fails with `repository type [gcs] does not exist`.
:::

## Architecture: migration data legs

A migration has several independent network paths, called data legs. Configure each
leg for private networking independently. Legs without a private networking
configuration keep their existing public behavior.

| Leg | What it carries | How to make it private |
|-----|-----------------|------------------------|
| Target write | Migrated documents to the Aiven for OpenSearch target | `target_connectivity`: PSC consumer or VPC peering |
| Source read | Snapshot or proxy traffic to the source cluster | `source_connectivity`: PSC consumer or VPC peering |
| Snapshot to object storage | Snapshot data to Cloud Storage | Private Google Access (default on Terraform-created VPCs) |
| Live capture-proxy ingress | Client traffic to the capture proxy | Internal load balancer on GKE, automatic |
| Control plane | Terraform and kubectl traffic to the GKE cluster | Private endpoint and narrowed authorized ranges |

## Deploy the Migration Assistant on GCP

The Migration Assistant deploys using Terraform and Helm. The GCP Terraform module is
in the
[`deployment/terraform/gcp`](https://github.com/opensearch-project/opensearch-migrations/tree/main/deployment/terraform/gcp)
directory of the
[`opensearch-project/opensearch-migrations`](https://github.com/opensearch-project/opensearch-migrations)
repository. Follow the Terraform README in that directory to provision the GKE
cluster and configure Helm chart values.

To target Aiven for OpenSearch, set the target cluster endpoint and credentials in
your workflow configuration to your Aiven service's connection details. Find these on
the **Overview** page of your service in the
[Aiven Console](https://console.aiven.io).

## Run a backfill migration

A backfill migration uses snapshot-based reindex-from-snapshot (RFS):

1. The source cluster creates a snapshot to a Cloud Storage bucket.
1. RFS workers read the snapshot and write documents to the target Aiven for OpenSearch
   cluster.
1. After reindexing completes, verify document counts and index parity between source
   and target before cutting over.

## Run a live migration

A live migration captures and replays traffic while the backfill runs, so the target
stays in sync as writes continue on the source.

```text
client traffic ──▶ capture proxy ──▶ source cluster
                        │ (mirror)
                        ▼
                      Kafka ──▶ replayer ──▶ target cluster
```

- Client traffic goes to the capture proxy, which forwards requests to the source
  cluster and mirrors them to an in-cluster Kafka topic.
- The replayer reads from Kafka and applies the captured operations to the target
  Aiven for OpenSearch cluster.
- On GKE, the capture proxy's Kubernetes Service uses an internal load balancer
  automatically. The proxy's ingress IP is VPC-local with no extra configuration.

## Configure private networking

Private networking keeps migration traffic off the public internet. Configure each
data leg independently. All private networking variables default to the existing
public behavior, so deployments that do not set them are unaffected.

### PSC consumer (source and target legs)

Private Service Connect (PSC) consumer mode creates an internal forwarding rule in
the migration VPC that connects to a PSC service attachment published by the source
or target cluster:

1. The source or target cluster publishes a PSC service attachment.
1. Terraform creates a forwarding rule and an optional private Cloud DNS zone that
   maps the cluster hostname to an internal IP address.
1. The producer must approve the connection. Verify the endpoint reaches **ACCEPTED**
   state before running the migration.

Set `source_connectivity` or `target_connectivity` to `psc_consumer` and provide the
service attachment URI.

### VPC peering (source and target legs)

VPC peering connects the migration VPC to the source or target VPC over internal IP
addresses. Set `source_connectivity` or `target_connectivity` to `vpc_peering`. The
two VPCs must not have overlapping CIDR ranges.

### Private Google Access (Cloud Storage leg)

Snapshot traffic to Cloud Storage uses Private Google Access by default when Terraform
creates the VPC. This routes Cloud Storage traffic over Google's private network
without requiring a public IP address.

If you supply an existing subnet, enable Private Google Access on that subnet before
running the migration.

:::note
If your organization uses VPC Service Controls, you may need to route Google API
traffic through the restricted VIP. Check your organization's VPC Service Controls
perimeter configuration.
:::

### Private GKE control plane

Setting `enable_private_endpoint = true` removes the public IP from the GKE
control-plane endpoint. After enabling it, access the cluster through one of:

- Cloud IAP tunnel
- A bastion host in the same VPC
- Cloud VPN or Cloud Interconnect

The machine running `terraform apply` must also reach the private endpoint, not
only interactive `kubectl` sessions.

## Prepare for cutover

A live migration does not complete automatically. The source continues accepting
writes; the replayer runs continuously, staying slightly behind live. Cutover is a
manual step you take when the target is ready.

**Readiness signal:** monitor replay lag, which is the time since the replayer last
applied an operation. The target is ready when lag is small and stable, not just
momentarily low. Observe lag from replayer status output or from the Kafka
consumer-group lag on the capture topic.

**Cutover sequence:**

1. Quiesce or stop writes to the source cluster.
1. Wait for the replayer to drain the remaining operations until lag approaches zero.
1. Verify document counts and index parity between source and target.
1. Update your clients to point to the Aiven for OpenSearch target.
1. Resume write activity on the target.
1. Tear down the migration infrastructure after you are satisfied with the result.

:::note
A detailed step-by-step cutover runbook is not yet available. Test the full cutover
procedure in a non-production environment before running it in production.
:::

## Performance and sizing

Private networking is a security feature, not a performance feature. For same-region
GCP migrations, private routing provides consistent latency but does not
significantly increase throughput compared to public routing.

The migration bottleneck is target indexing throughput. Under load, the target's
write thread pool can saturate and return HTTP 429 responses or timeouts to backfill
and replay workers. Data is not lost because requests retry, but throughput is gated
by the target cluster's write capacity.

For large migrations, consider the following tuning steps:

- Increase the number of primary shards on hot indices before the migration.
- Set `number_of_replicas=0` and `refresh_interval=-1` on target indices during the
  load, then restore default values after indexing completes.
- Size Kafka broker storage for the volume of captured traffic.
- Limit replayer concurrency and heap to avoid memory pressure during heavy replay.

<RelatedPages/>

- [Migrate Elasticsearch data to Aiven for OpenSearch®](/docs/products/opensearch/howto/migrating_elasticsearch_data_to_aiven)
- [Migrate data to Aiven for OpenSearch® using snapshots](/docs/products/opensearch/howto/manage-snapshots)
- [Migrate external snapshots to Aiven for OpenSearch®](/docs/products/opensearch/howto/migrate-external-snapshots-aiven-opensearch)
- [Reapply ISM policies after snapshot restore](/docs/products/opensearch/howto/migrate-ism-policies)
