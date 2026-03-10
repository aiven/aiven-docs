---
title: Control maintenance updates with upgrade pipelines
sidebar_label: Controlled upgrade
limited: true
---

import RelatedPages from "@site/src/components/RelatedPages";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Control when your Aiven managed services receive maintenance updates and test maintenance
updates in development or staging environments before they reach production.

:::important
Controlled upgrade pipeline is a
[limited availability](/docs/platform/concepts/service-and-feature-releases#limited-availability-)
feature.
[Contact Aiven](https://aiven.io/contact) to request access.
:::

Aiven performs automatic
[service maintenance for security fixes, minor software updates](/docs/platform/concepts/maintenance-window),
and other platform changes. The controlled upgrade pipeline feature lets you link services
of the same type in an ordered sequence to control when each service receives updates.
After a maintenance update upgrades a service at the initial pipeline step, you validate
that service version before the update proceeds to the service at the next pipeline step.
Validation can be manual or automatic after a configurable delay.

## About controlled upgrade pipelines

### Upgrade steps

An upgrade step is a pair of services linked by an upgrade constraint:

- **Source service**: The service that receives maintenance updates first
- **Destination service**: The service that waits for validation before receiving updates

Each destination service can have only one source service. A source service can have
multiple destination services.

### Upgrade pipelines

An upgrade pipeline is a chain of upgrade steps that spans multiple environments.
For example:

- Single chain: development → staging → production
- Multiple destinations: development → production-eu and development → production-na

## How validation works

When a maintenance update upgrades your source service:

1. The source service receives the update first.
1. Test the updated source service to verify it works as expected.
1. Validate the update manually using the API, or wait for automatic validation
  after the configured delay. The default delay is 7 days.
1. After validation, the destination service becomes eligible for the same
   maintenance update.

If one source service has multiple destination services, one validation for the
source service applies to all connected destination services.

Nodes in the destination service maintain the validated version until you approve a
newer version. When a node is recycled, it uses the same validated version, not the latest
available version.

When you create a step, the destination service keeps the newest version that is
already validated at that moment. If the destination service is already applying
maintenance during step creation, the in-progress target version becomes the initial
validated version.

## Limitations and considerations

- **Same service type**: You can only link services of the same type. For example,
  two Aiven for PostgreSQL services.
- **Chain length**: The maximum number of steps you can chain depends on your ACL
  permissions. The default maximum is 3 steps.
- **No cycles**: You cannot create circular dependencies between services.
- **Emergency overrides**: Aiven can apply critical security or stability fixes
  to a destination service before explicit validation.
- **Supported services**: Only independently deployable service types support this
  feature.
- **No permanent blocking**: You cannot prevent an update indefinitely. Automatic
  validation applies after the configured delay, up to the maximum delay allowed by
  your ACL permissions.

## Use controlled upgrade pipelines

### Prerequisites

To use controlled upgrade pipelines:

- [Aiven CLI](/docs/tools/cli) or [Aiven API](/docs/tools/api)
- Write access to the source and destination projects
- The correct access control list (ACL) permissions for the feature in your destination
  project
- At least two services of the same type (for example, two Aiven for PostgreSQL® services)
- Services can be in different projects in the same organization

### Set up an upgrade pipeline

Use the Aiven API to create upgrade steps between your services.

:::note
These upgrade pipeline commands require a preview build of Aiven CLI.
Command names and parameters can change before general availability.
:::

#### Create an upgrade step

Create a step to link a source service and a destination service:

<Tabs groupId="upgrade-step-create">
<TabItem value="cli" label="CLI" default>

```bash
avn upgrade-pipeline step create SOURCE_PROJECT SOURCE_SERVICE DESTINATION_PROJECT DESTINATION_SERVICE
```

</TabItem>
<TabItem value="api" label="API">

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

</TabItem>
</Tabs>

Parameters:

- `source_project`: Name of the project containing the source service
- `source_service`: Name of the source service
- `destination_project`: Name of the project containing the destination service
- `destination_service`: Name of the destination service
- `auto_validation_delay_days`: Optional. Number of days before automatic validation.
  The value must be at least `1`. The default is 7 days.

The maximum delay you can configure depends on your ACL permissions. The default
maximum is 30 days.

#### List upgrade steps

View all upgrade steps you have access to:

<Tabs groupId="upgrade-step-list">
<TabItem value="cli" label="CLI" default>

```bash
avn upgrade-pipeline step list --organization-id ORGANIZATION_ID
```

</TabItem>
<TabItem value="api" label="API">

```bash
curl https://api.aiven.io/v1/upgrade/step \
  -H "Authorization: Bearer TOKEN"
```

</TabItem>
</Tabs>

#### View a specific step

Get details about a specific upgrade step, including the last validation:

```bash
curl https://api.aiven.io/v1/upgrade/step/STEP_ID \
  -H "Authorization: Bearer TOKEN"
```

The step details include `last_validation` values such as `validated_at`,
`validated_by_user`, and `comment` when validation exists.

### Validate an upgrade

After testing your source service with the new update, validate the version to allow
the destination service to receive the same update.

#### Manual validation

Validate the current version of your source service:

<Tabs groupId="upgrade-step-validate">
<TabItem value="cli" label="CLI" default>

```bash
avn upgrade-pipeline step validate-for-service --project SOURCE_PROJECT SOURCE_SERVICE
```

</TabItem>
<TabItem value="api" label="API">

```bash
UPGRADE_VALIDATION_URL="https://api.aiven.io/v1/project/SOURCE_PROJECT/service/SOURCE_SERVICE/upgrade_validation"

curl -X POST "$UPGRADE_VALIDATION_URL" \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "comment": "Tested and verified in development"
  }'
```

</TabItem>
</Tabs>

The `comment` parameter is optional but helps track why a version was validated.

#### Automatic validation

If you do not manually validate an update, the system automatically validates the
source service version after the configured delay. Auto-validation starts from when
the source service receives the update.

### Manage upgrade steps

#### Update a step

Modify the automatic validation delay for an existing step:

```bash
curl -X PATCH https://api.aiven.io/v1/upgrade/step/STEP_ID \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "auto_validation_delay_days": 14
  }'
```

#### Delete a step

Remove an upgrade step to allow the destination service to receive updates independently:

<Tabs groupId="upgrade-step-delete">
<TabItem value="cli" label="CLI" default>

```bash
avn upgrade-pipeline step delete --organization-id ORGANIZATION_ID STEP_ID
```

Find `STEP_ID` from the upgrade step list command.

</TabItem>
<TabItem value="api" label="API">

```bash
curl -X DELETE https://api.aiven.io/v1/upgrade/step/STEP_ID \
  -H "Authorization: Bearer TOKEN"
```

</TabItem>
</Tabs>

Deleting a step removes all associated validations.

### Example: Three-environment pipeline

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
