---
title: Manage approvals in Aiven for Apache Kafka® Governance using Terraform & GitHub
sidebar_label: Governance with Terraform
---

import RelatedPages from "@site/src/components/RelatedPages";
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

Aiven for Apache Kafka® Governance lets you manage approval workflows for Apache Kafka topic changes using Terraform and GitHub Actions.

To manage approvals in the Aiven Console, see
[Manage approvals in the Aiven Console](/docs/products/kafka/howto/approvals).


## Prerequisites

- [Authentication token](/docs/platform/howto/create_authentication_token) for an
  [application user](/docs/platform/concepts/application-users) created specifically for
  Terraform, and assigned to a user group with governance permissions
- [GitHub repository](https://docs.github.com/en/get-started/quickstart/create-a-repo)
  with GitHub Actions enabled
- [User groups](/docs/platform/howto/manage-groups) configured to manage governance
   workflows
- Optional: To access early stage Aiven Terraform Provider features, enable the following
  environment variable:

  ```bash
  export PROVIDER_AIVEN_ENABLE_BETA=1
  ```

## How it works

Aiven for Apache Kafka® Governance enables approval workflows for Apache Kafka topic
changes using Terraform and GitHub Actions. These workflows follow three key principles:

- **Topic ownership**: Apache Kafka topics are assigned to user groups using
`owner_user_group_id`. Only members of the assigned group can approve changes to
that topic.
- **External identity mapping**: The `aiven_external_identity` resource links GitHub
usernames to Aiven users, ensuring that requesters and approvers are correctly identified.
- **Approval validation**: A GitHub Action automatically checks that pull request
creators and approvers meet governance requirements before changes are applied.

### Workflow steps:

1. Define governance policies using Aiven Terraform Provider:

   - Assign topic ownership (control who can approve changes) using `owner_user_group_id`.
   - Configure user groups (`aiven_organization_user_group`) to manage approval
     permissions.
   - Enforce team-based approval policies to ensure compliance.
   - Automatically validate changes against governance policies.

1. Map GitHub users to Aiven identities:

   - Link GitHub usernames to Aiven users using the `aiven_external_identity` resource.
   - Ensure that only mapped users can request or approve changes.

1. Submit and validate changes in GitHub

   - A user submits a pull request (PR) to modify an Apache Kafka topic.
   - The GitHub Action automatically runs governance compliance checks.
   - If the requester lacks approval permissions, the check fails.

1. Approve and apply changes

   - An authorized user approves the PR.
   - The GitHub Action reruns governance validation.
   - If all policies are met, the PR passes, and Terraform applies the changes.

### Approval rules

Governance enforces approval policies to maintain security and compliance:

- If an approver is a member of multiple teams, their approval applies to all teams
  they belong to.
- If a second approval is required, another member of the same user group must approve.
- The pull request creator must be a member of the user group that owns the Apache
  Kafka topic.

## Set up governance approvals

Set up approval workflows using Terraform and GitHub Actions.

### Step 1. Define topic ownership and user groups

To restrict modifications to authorized users, you must specify `owner_user_group_id`
in your Terraform configuration:

<TerraformSample filename="resources/aiven_kafka_topic/resource.tf" />

Setting `owner_user_group_id` alone does not enforce approvals. The GitHub Action must
be integrated to validate changes and enforce compliance.

### Step 2. Map GitHub users to Aiven identities

To verify requesters and approvers, assign them to the appropriate user group
using the `aiven_external_identity` resource. For more information, see the
[Aiven Terraform Provider documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/data-sources/external_identity).

**Example Terraform configuration**

```hcl
data "aiven_organization" "example_org" {
  name = "Example Organization"
}

resource "aiven_organization_user_group" "example_group" {
  organization_id = data.aiven_organization.example_org.id
  name            = "example-group"
  description     = "A group for governance approvals"
}

resource "aiven_organization_user_group_member" "example_user" {
  organization_id = data.aiven_organization.example_org.id
  group_id        = aiven_organization_user_group.example_group.group_id
  user_id         = "aiven_user_id"
}

data "aiven_external_identity" "github_identity" {
  organization_id       = data.aiven_organization.example_org.id
  internal_user_id      = "aiven_user_id"
  external_user_id      = "github_username"
  external_service_name = "github"
}
```

- This mapping ensures that GitHub users are recognized as Aiven users for governance
  approvals.
- Only mapped users can request or approve changes.
- Repeat this for all users who need to request or approve changes.

### Step 3. Set up compliance checks in GitHub

In your GitHub repository, define a GitHub Actions workflow to enforce governance
approvals.

**Example GitHub Actions workflow**

```yaml
 name: Kafka governance compliance check

 on:
   pull_request:
     types: [opened, synchronize, reopened]
   pull_request_review:
     types: [submitted]

 jobs:
   compliance:
   runs-on: ubuntu-latest
   steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Get PR approvers
        id: get_approvers
        uses: octokit/request-action@v2.x
        with:
          route: GET /repos/${{ github.repository }}/pulls/${{ github.event.pull_request.number }}/reviews
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Run compliance check
        uses: aiven/aiven-terraform-governance-compliance-checker@v0.1.0
        with:
          requester: ${{ github.event.pull_request.user.login }}
          approvers: ${{ steps.get_approvers.outputs.data }}
          aiven_token: ${{ secrets.AIVEN_API_TOKEN }}
```

### Step 4. Validate and apply changes using Terraform

Before applying approved changes, check governance compliance with Terraform:

```bash
terraform plan -out=tfplan
terraform show -json tfplan > plan.json
```

Use `plan.json` for governance compliance checks before merging the pull request.
If your workflow does not automatically apply Terraform changes, run:

```bash
terraform apply "tfplan"
```

:::note
Terraform does not enforce governance rules. It applies changes as long as the
authentication token is valid. The GitHub Action validates compliance by checking the
Terraform plan. Repository administrators must configure GitHub to enforce workflow
checks before merging changes.
:::

### Step 5. View compliance check results

After validation, check the GitHub Actions logs or Terraform output to verify compliance.

- Successful check: The request meets governance requirements.

  ```json
  {
    "ok": true
  }
  ```

- Failed check: The request does not meet governance rules, and an error message
  appears in the pull request.

  ```json
  {
    "ok": false,
    "errors": [
    {
      "error": "Requesting user is not a member of the owner group",
      "resource": "aiven_kafka_topic.orders"
    }
   ]
  }
  ```

The GitHub Action reports compliance results but does not block pull requests or fail
workflows automatically. To enforce workflow checks, repository administrators must
configure GitHub before merging changes.

- Ensure that the requester is a member of the owner user group for the Apache Kafka
  topic.
- Rerun the Terraform plan and GitHub compliance check before merging.

## Troubleshoot governance compliance issues

|Error | Cause | Fix |
|-----------|----------|---------|
| **Invalid plan JSON file** | Missing or incorrectly formatted plan file | Ensure a valid plan JSON file is provided |
| **User is not a member of the owner group** | Requester lacks required permissions | Assign requester to the correct user group |
| **Approval required from a member of the owner group** | PR lacks required approval | Ensure a valid team member has approved the PR |

<RelatedPages/>

[Manage approvals in the Aiven Console](/docs/products/kafka/howto/approvals)
