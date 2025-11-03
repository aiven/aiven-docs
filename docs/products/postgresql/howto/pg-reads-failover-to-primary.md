---
title: Aiven for PostgreSQL® reads failover to the primary
sidebar_label: Reads failover to primary
limited: true
---

## Overview

When you route read-only queries to standby nodes, a standby failure can make your replica URI temporarily unreachable until a new standby is provisioned and catches up. Reads failover to the primary automatically and temporarily redirects read-only traffic to the healthy primary node when all standbys are unavailable, helping you avoid downtime.

## Benefits

-   Improves availability for read workloads during standby outages
-   Reduces operational effort; no app-side routing changes required
-   Uses a single, stable connection endpoint for read traffic

## How it works (high level)

-   When enabled, your service exposes a dedicated HA Replica DNS endpoint for read-only traffic.
-   Under normal conditions, this endpoint resolves to standby nodes.
-   If all standbys become unavailable, the endpoint automatically switches to the primary.
-   When standbys recover, the endpoint switches back to replicas.

## Enable the feature

You can enable reads failover to the primary from the Console, CLI, or API.

### Console

1.   In the Aiven Console, open your PostgreSQL® service.
1.   Go to Service settings.
1.   Enable Reads failover to primary (HA Replica DNS).
1.   Save changes.

### CLI

```bash
aiven service update <SERVICE_NAME> -c enable_ha_replica_dns=true
```

### API

Set the `enable_ha_replica_dns` configuration to `true` using the service update endpoint. See the [API reference](/docs/tools/api) for details.

## Use the HA Replica DNS endpoint

-   After enabling, retrieve the replica connection URI from the Console, CLI, or API. This URI will automatically redirect to the primary when replicas are unavailable and switch back once replicas are healthy.
-   Point your read-only clients to this URI to benefit from automatic failover without changing application logic.

## Considerations

-   During a failover to primary, read-only traffic is served by the primary. Ensure your application can tolerate reads from the primary if it assumes read-after-write or specific consistency behavior.
-   Existing connections to replicas may fail during an outage. New connections using the HA Replica DNS continue to succeed.
-   This feature does not create additional replicas; it only redirects read traffic when replicas are unavailable.

## Disable the feature

You can disable reads failover to the primary at any time.

### Console (disable)

1.   In the Aiven Console, open your PostgreSQL® service.
1.   Go to Service settings.
1.   Disable Reads failover to primary (HA Replica DNS).
1.   Save changes.

### CLI (disable)

```bash
aiven service update <SERVICE_NAME> -c enable_ha_replica_dns=false
```

### API (disable)

Set `enable_ha_replica_dns` to `false` with the service update endpoint.
