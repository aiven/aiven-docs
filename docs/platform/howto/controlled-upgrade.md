---
title: Control maintenance updates with upgrade pipelines
sidebar_label: Controlled upgrade
limited: true
---

import RelatedPages from "@site/src/components/RelatedPages";

Ensure your source service is updated and validated before the same maintenance update reaches your destination service.

:::important
Controlled upgrade pipeline is a
[limited availability](/docs/platform/concepts/service-and-feature-releases#limited-availability-)
feature.
[Contact Aiven](https://aiven.io/contact) to request access.
:::

The controlled upgrade pipeline feature lets you test maintenance updates in
development or staging environments before they reach production. Link services of
the same type in an ordered sequence to control when each service receives updates.
After a maintenance update upgrades a service, you can validate that version before
the update proceeds to the next service. Validation can be manual or automatic after
a configurable delay.

## About controlled upgrade pipelines

### Upgrade steps

An upgrade step is a pair of services linked by an upgrade constraint:

- **Source service**: The service that receives maintenance updates first
- **Destination service**: The service that waits for validation before receiving updates

Each destination service can have only one source service, but a source service can
have multiple destination services.

### Upgrade pipelines

An upgrade pipeline is a chain of upgrade steps that spans multiple environments.
For example:

- Single chain: development → staging → production
- Multiple destinations: development → production-eu and development → production-na

## Prerequisites

To use controlled upgrade pipelines:

- The correct access control list (ACL) permissions for the feature in your destination project
- At least two services of the same type (for example, two Aiven for PostgreSQL® services)
- Services can be in different projects

## How validation works

When a maintenance update upgrades your source service:

1. The source service receives the update first.
1. Test the updated source service to verify it works as expected.
1. Validate the update manually using the API, or wait for automatic validation
   after the configured delay. The default delay is 7 days.
1. After validation, the destination service becomes eligible for the same
   maintenance update.

Nodes in the destination service maintain the validated version until you approve a
newer version. When a node is recycled or replaced, it uses the same validated
version, not the latest available version.

## Set up an upgrade pipeline

Use the Aiven API to create upgrade steps between your services.

### Create an upgrade step

Create a step to link a source service and a destination service:

```bash
curl -X POST https://api.aiven.io/v1/upgrade/step \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "source_project": "SOURCE_PROJECT_NAME",
    "source_service": "SOURCE_SERVICE_NAME",
    "destination_project": "DESTINATION_PROJECT_NAME",
    "destination_service": "DESTINATION_SERVICE_NAME",
    "auto_validation_delay_days": 7
  }'
```

Parameters:

- `source_project`: Name of the project containing the source service
- `source_service`: Name of the source service
- `destination_project`: Name of the project containing the destination service
- `destination_service`: Name of the destination service
- `auto_validation_delay_days`: Optional. Number of days before automatic validation.
  The default is 7 days.

The maximum delay you can configure depends on your ACL permissions. The default
maximum is 30 days.

### List upgrade steps

View all upgrade steps you have access to:

```bash
curl https://api.aiven.io/v1/upgrade/step \
  -H "Authorization: Bearer TOKEN"
```

### View a specific step

Get details about a specific upgrade step, including the last validation:

```bash
curl https://api.aiven.io/v1/upgrade/step/STEP_ID \
  -H "Authorization: Bearer TOKEN"
```

## Validate an upgrade

After testing your source service with the new update, validate the version to allow
the destination service to receive the same update.

### Manual validation

Validate the current version of your source service:

```bash
curl -X POST https://api.aiven.io/v1/project/SOURCE_PROJECT_NAME/service/SOURCE_SERVICE_NAME/upgrade_validation \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "comment": "Tested and verified in development"
  }'
```

The `comment` parameter is optional but helps track why a version was validated.

### Automatic validation

If you do not manually validate an update, the system automatically validates the
source service version after the configured delay. Auto-validation starts from when
the source service receives the update.

## Manage upgrade steps

### Update a step

Modify the automatic validation delay for an existing step:

```bash
curl -X PATCH https://api.aiven.io/v1/upgrade/step/STEP_ID \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "auto_validation_delay_days": 14
  }'
```

### Delete a step

Remove an upgrade step to allow the destination service to receive updates independently:

```bash
curl -X DELETE https://api.aiven.io/v1/upgrade/step/STEP_ID \
  -H "Authorization: Bearer TOKEN"
```

Deleting a step removes all associated validations.

## Limitations and considerations

- **Same service type**: You can only link services of the same type. For example,
  two Aiven for PostgreSQL services.
- **Chain length**: The maximum number of steps you can chain depends on your ACL
  permissions. The default maximum is 3 steps.
- **Emergency overrides**: If service failures or critical security patches occur,
  Aiven can apply maintenance updates to a constrained service before validation to
  maintain the service level agreement (SLA).
- **Supported services**: Only independently deployable service types support this
  feature.
- **No permanent blocking**: You cannot prevent an update indefinitely. If an update
  is mandatory and you cannot resolve compatibility issues before the maximum
  auto-validation delay expires, contact support.

## Example: Three-environment pipeline

Create a pipeline that promotes updates from development to staging to production:

1. Create a step from development to staging:

   ```bash
   curl -X POST https://api.aiven.io/v1/upgrade/step \
     -H "Authorization: Bearer TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "source_project": "dev-project",
       "source_service": "pg-dev",
       "destination_project": "staging-project",
       "destination_service": "pg-staging",
       "auto_validation_delay_days": 3
     }'
   ```

1. Create a step from staging to production:

   ```bash
   curl -X POST https://api.aiven.io/v1/upgrade/step \
     -H "Authorization: Bearer TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "source_project": "staging-project",
       "source_service": "pg-staging",
       "destination_project": "prod-project",
       "destination_service": "pg-prod",
       "auto_validation_delay_days": 7
     }'
   ```

When a maintenance update arrives:

1. The development service receives the update.
1. After testing, validate the development version or wait 3 days for auto-validation.
1. The staging service receives the update.
1. After testing, validate the staging version or wait 7 days for auto-validation.
1. The production service receives the update.

<RelatedPages/>

- [Service maintenance, updates and upgrades](/docs/platform/concepts/maintenance-window)
- [Fork a service](/docs/platform/concepts/service-forking)
