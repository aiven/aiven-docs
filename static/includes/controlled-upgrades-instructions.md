import LimitedBadge from "@site/src/components/Badges/LimitedBadge";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Use controlled upgrade pipelines

### Prerequisites

To use controlled upgrade pipelines, you need the following:

- The feature enabled by Aiven (<LimitedBadge/>)
- Dev tool of your choice:
  - [Aiven CLI](/docs/tools/cli)

    Install the latest version of the Aiven CLI to access the `upgrade-pipeline` commands.

  - [Aiven API](/docs/tools/api)
  - [Aiven Provider for Terraform](/docs/tools/terraform)

    - Set `PROVIDER_AIVEN_ENABLE_BETA=true` before running Terraform.
    - See the
      [resource documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/upgrade_step)
      for full schema, import format, and lifecycle behavior.

  - [Aiven Operator for Kubernetes](/docs/tools/kubernetes)

    Install the operator and create an Aiven token secret named `aiven-token`
    that the operator uses to authenticate against the Aiven API.

- Write access to the source and destination projects
- At least two services of the same type (for example, two Aiven for PostgreSQL® services)
- Services can be in different projects in the same organization

### Set up an upgrade pipeline

Use the Aiven CLI or API to create upgrade steps between your services.

:::note
The `upgrade-pipeline` CLI commands require Aiven CLI version 4.x or later.
Command names and parameters may change before general availability.
:::

#### Create an upgrade step

Create a step to link a source service and a destination service:

<Tabs groupId="upgrade-pipeline">
<TabItem value="cli" label="CLI" default>

```bash
avn upgrade-pipeline step create \
  --organization-id ORGANIZATION_ID \
  [--source-project SOURCE_PROJECT] SOURCE_SERVICE \
  [--destination-project DESTINATION_PROJECT] DESTINATION_SERVICE \
  [--auto-validation-delay-days DAYS]
```

**Options**

- `--organization-id` is required.
- `--source-project` and `--destination-project` are optional. If you omit either project
  option, Aiven CLI uses the current default project set with `avn project switch`.
- `--auto-validation-delay-days` is optional. Defaults to 7 days if not specified.

</TabItem>
<TabItem value="api" label="API">

```bash
curl -X POST https://api.aiven.io/v1/organization/ORGANIZATION_ID/upgrade-pipeline/steps \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "source_project_name": "SOURCE_PROJECT_NAME",
    "source_service_name": "SOURCE_SERVICE_NAME",
    "destination_project_name": "DESTINATION_PROJECT_NAME",
    "destination_service_name": "DESTINATION_SERVICE_NAME",
    "auto_validation_delay_days": 7
  }'
```

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the
[`aiven_upgrade_step`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/upgrade_step)
resource:

```hcl
resource "aiven_upgrade_step" "example" {
  organization_id          = "ORGANIZATION_ID"
  source_project_name      = "SOURCE_PROJECT_NAME"
  source_service_name      = "SOURCE_SERVICE_NAME"
  destination_project_name = "DESTINATION_PROJECT_NAME"
  destination_service_name = "DESTINATION_SERVICE_NAME"
  auto_validation_delay_days = 7
}
```

</TabItem>
<TabItem value="kubernetes" label="Kubernetes">

Apply an `UpgradePipelineStep` manifest with `kubectl`:

```yaml
apiVersion: aiven.io/v1alpha1
kind: UpgradePipelineStep
metadata:
  name: upgrade-step-sample
spec:
  authSecretRef:
    name: aiven-token
    key: token

  organizationId: ORGANIZATION_ID
  sourceProjectName: SOURCE_PROJECT_NAME
  sourceServiceName: SOURCE_SERVICE_NAME
  destinationProjectName: DESTINATION_PROJECT_NAME
  destinationServiceName: DESTINATION_SERVICE_NAME
  autoValidationDelayDays: 7
```

```bash
kubectl apply -f upgrade-step.yaml
```

The `organizationId`, `sourceProjectName`, `sourceServiceName`,
`destinationProjectName`, and `destinationServiceName` fields are immutable
after the resource is created.

</TabItem>
</Tabs>

Parameters:

- `source_project_name`: Name of the project containing the source service
- `source_service_name`: Name of the source service
- `destination_project_name`: Name of the project containing the destination service
- `destination_service_name`: Name of the destination service
- `auto_validation_delay_days`: Optional. Number of days before automatic validation.
  The value must be at least `1`. The default is 7 days.

The maximum delay you can configure is 30 days.

#### List upgrade steps

View all upgrade steps you have access to:

<Tabs groupId="upgrade-pipeline">
<TabItem value="cli" label="CLI" default>

```bash
avn upgrade-pipeline step list --organization-id ORGANIZATION_ID
```

</TabItem>
<TabItem value="api" label="API">

```bash
curl https://api.aiven.io/v1/organization/ORGANIZATION_ID/upgrade-pipeline/steps \
  -H "Authorization: Bearer TOKEN"
```

</TabItem>
<TabItem value="terraform" label="Terraform">

**Reference**:
[`aiven_upgrade_step` resource documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/upgrade_step)

To list managed upgrade steps, use:

```bash
terraform state list 'aiven_upgrade_step.*'
terraform state show 'aiven_upgrade_step.example'
```

</TabItem>
<TabItem value="kubernetes" label="Kubernetes">

List `UpgradePipelineStep` resources in the current namespace:

```bash
kubectl get upgradepipelinesteps
```

</TabItem>
</Tabs>

#### View a specific step

Get details about a specific upgrade step, including the last validation:

<Tabs groupId="upgrade-pipeline">
<TabItem value="cli" label="CLI" default>

```bash
avn upgrade-pipeline step get \
  --organization-id ORGANIZATION_ID \
  STEP_ID
```

</TabItem>
<TabItem value="api" label="API">

```bash
curl https://api.aiven.io/v1/organization/ORGANIZATION_ID/upgrade-pipeline/steps/STEP_ID \
  -H "Authorization: Bearer TOKEN"
```

</TabItem>
<TabItem value="terraform" label="Terraform">

**Reference**:
[`aiven_upgrade_step` resource documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/upgrade_step)

```bash
terraform state show aiven_upgrade_step.example
```

</TabItem>
<TabItem value="kubernetes" label="Kubernetes">

Show the manifest and full status, including `id`, `conditions`, and
`lastValidation`:

```bash
kubectl describe upgradepipelinestep RESOURCE_NAME
kubectl get upgradepipelinestep RESOURCE_NAME -o yaml
```

</TabItem>
</Tabs>

The step details include `last_validation` values such as `validated_at`,
`validated_by_user`, and `comment` when validation exists (available through the API).

### Validate an upgrade

After testing your source service with the new update, validate the version to allow
the destination service to receive the same update.

#### Manual validation

Validate the current version of your source service:

<Tabs groupId="upgrade-pipeline">
<TabItem value="cli" label="CLI" default>

```bash
avn upgrade-pipeline step validate-for-service \
  --project SOURCE_PROJECT \
  SERVICE_NAME \
  [--comment "COMMENT"]
```

`--comment` is optional. Use it to record a note about the validation, for example `"Tested and verified in development"`.

</TabItem>
<TabItem value="api" label="API">

```bash
curl -X POST https://api.aiven.io/v1/project/SOURCE_PROJECT/service/SOURCE_SERVICE/upgrade-validation \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "comment": "Tested and verified in development"
  }'
```

</TabItem>
<TabItem value="terraform" label="Terraform">

Terraform manages upgrade steps, but validation is done through the API or CLI.
Use the **CLI** or **API** tab to validate and optionally add a comment.

</TabItem>
<TabItem value="kubernetes" label="Kubernetes">

The operator manages upgrade steps, but validation is done through the API or CLI.
Use the **CLI** or **API** tab to validate and optionally add a comment.

</TabItem>
</Tabs>

#### Automatic validation

If you do not manually validate an update, the system automatically validates the
source service version after the configured delay. Auto-validation starts from when
the source service receives the update.

### Manage upgrade steps

#### Update a step

Modify the automatic validation delay for an existing step:

<Tabs groupId="upgrade-pipeline">
<TabItem value="cli" label="CLI" default>

```bash
avn upgrade-pipeline step update \
  --organization-id ORGANIZATION_ID \
  --auto-validation-delay-days 14 \
  STEP_ID
```

</TabItem>
<TabItem value="api" label="API">

```bash
curl -X PATCH https://api.aiven.io/v1/organization/ORGANIZATION_ID/upgrade-pipeline/steps/STEP_ID \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "auto_validation_delay_days": 14
  }'
```

</TabItem>
<TabItem value="terraform" label="Terraform">

**Reference**:
[`aiven_upgrade_step` resource documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/upgrade_step)

```hcl
resource "aiven_upgrade_step" "example" {
  # ...required fields...
  auto_validation_delay_days = 14  # Updated from 7 to 14
}
```

Apply the changes:

```bash
terraform plan
terraform apply
```

</TabItem>
<TabItem value="kubernetes" label="Kubernetes">

Edit `autoValidationDelayDays` in your manifest and re-apply:

```yaml
spec:
  autoValidationDelayDays: 14
```

```bash
kubectl apply -f upgrade-step.yaml
```

The `organizationId`, `sourceProjectName`, `sourceServiceName`,
`destinationProjectName`, and `destinationServiceName` fields are immutable.
To change them, delete the resource and create a new one.

</TabItem>
</Tabs>

#### Delete a step

Remove an upgrade step to allow the destination service to receive updates independently:

<Tabs groupId="upgrade-pipeline">
<TabItem value="cli" label="CLI" default>

```bash
avn upgrade-pipeline step delete --organization-id ORGANIZATION_ID STEP_ID
```

Find `STEP_ID` from the upgrade step list command.

</TabItem>
<TabItem value="api" label="API">

```bash
curl -X DELETE https://api.aiven.io/v1/organization/ORGANIZATION_ID/upgrade-pipeline/steps/STEP_ID \
  -H "Authorization: Bearer TOKEN"
```

</TabItem>
<TabItem value="terraform" label="Terraform">

**Reference**:
[`aiven_upgrade_step` resource documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/upgrade_step)

Remove the resource from configuration and apply, or destroy it directly:

```bash
terraform apply
terraform destroy -target=aiven_upgrade_step.example
```

</TabItem>
<TabItem value="kubernetes" label="Kubernetes">

Delete the `UpgradePipelineStep` resource:

```bash
kubectl delete upgradepipelinestep RESOURCE_NAME
```

</TabItem>
</Tabs>

Deleting a step removes all associated validations.

### Example: Three-environment pipeline

Create a pipeline that promotes updates from development to staging to production:

<Tabs groupId="upgrade-pipeline">
<TabItem value="cli" label="CLI" default>

1. Create a step from development to staging:

   ```bash
   avn upgrade-pipeline step create \
     --organization-id ORGANIZATION_ID \
     --source-project dev-project \
     --destination-project staging-project \
     --auto-validation-delay-days 3 \
     pg-dev pg-staging
   ```

1. Create a step from staging to production:

   ```bash
   avn upgrade-pipeline step create \
     --organization-id ORGANIZATION_ID \
     --source-project staging-project \
     --destination-project prod-project \
     --auto-validation-delay-days 7 \
     pg-staging pg-prod
   ```

</TabItem>
<TabItem value="api" label="API">

1. Create a step from development to staging:

   ```bash
   curl -X POST https://api.aiven.io/v1/organization/ORGANIZATION_ID/upgrade-pipeline/steps \
     -H "Authorization: Bearer TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "source_project_name": "dev-project",
       "source_service_name": "pg-dev",
       "destination_project_name": "staging-project",
       "destination_service_name": "pg-staging",
       "auto_validation_delay_days": 3
     }'
   ```

1. Create a step from staging to production:

   ```bash
   curl -X POST https://api.aiven.io/v1/organization/ORGANIZATION_ID/upgrade-pipeline/steps \
     -H "Authorization: Bearer TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "source_project_name": "staging-project",
       "source_service_name": "pg-staging",
       "destination_project_name": "prod-project",
       "destination_service_name": "pg-prod",
       "auto_validation_delay_days": 7
     }'
   ```

</TabItem>
<TabItem value="terraform" label="Terraform">

**Reference**:
[`aiven_upgrade_step` resource documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/upgrade_step)

```hcl
# Step 1: Development → Staging
resource "aiven_upgrade_step" "dev_to_staging" {
  organization_id            = "ORGANIZATION_ID"
  source_project_name        = "dev-project"
  source_service_name        = "pg-dev"
  destination_project_name   = "staging-project"
  destination_service_name   = "pg-staging"
  auto_validation_delay_days = 3
}

# Step 2: Staging → Production
resource "aiven_upgrade_step" "staging_to_prod" {
  organization_id            = "ORGANIZATION_ID"
  source_project_name        = "staging-project"
  source_service_name        = "pg-staging"
  destination_project_name   = "prod-project"
  destination_service_name   = "pg-prod"
  auto_validation_delay_days = 7
}
```

Apply the configuration:

```bash
export PROVIDER_AIVEN_ENABLE_BETA=true
terraform init
terraform plan
terraform apply
```

</TabItem>
<TabItem value="kubernetes" label="Kubernetes">

Define both steps in a single manifest and apply it:

```yaml
apiVersion: aiven.io/v1alpha1
kind: UpgradePipelineStep
metadata:
  name: dev-to-staging
spec:
  authSecretRef:
    name: aiven-token
    key: token

  organizationId: ORGANIZATION_ID
  sourceProjectName: dev-project
  sourceServiceName: pg-dev
  destinationProjectName: staging-project
  destinationServiceName: pg-staging
  autoValidationDelayDays: 3
---
apiVersion: aiven.io/v1alpha1
kind: UpgradePipelineStep
metadata:
  name: staging-to-prod
spec:
  authSecretRef:
    name: aiven-token
    key: token

  organizationId: ORGANIZATION_ID
  sourceProjectName: staging-project
  sourceServiceName: pg-staging
  destinationProjectName: prod-project
  destinationServiceName: pg-prod
  autoValidationDelayDays: 7
```

```bash
kubectl apply -f upgrade-pipeline.yaml
```

</TabItem>
</Tabs>

When a maintenance update arrives:

1. The development service receives the update.
1. After testing, validate the development version or wait 3 days for auto-validation.
1. The staging service receives the update during its next maintenance window.
1. After testing, validate the staging version or wait 7 days for auto-validation.
1. The production service receives the update during its next maintenance window.
