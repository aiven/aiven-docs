---
title: Deploy an application
---

import {ConsoleIcon} from "@site/src/components/ConsoleIcons";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RequirementsPanel from "@site/src/components/RequirementsPanel";
import GitHubAccountVisibilityNote from "@site/static/includes/runtime-github-account-visibility-note.md";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Build and deploy applications using Aiven Runtime from source code in a GitHub repository.

<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`role:organization:admin` to connect a GitHub account. `project:services:write`, `role:project:manager`, or `role:project:admin` to deploy applications.'],
    },
    {
      label: 'GitHub permissions',
      icon: 'people',
      values: [
         <>
           To connect a GitHub organization account, you must be an{' '}
           <a href="https://docs.github.com/en/organizations/managing-peoples-access-to-your-organization-with-roles/roles-in-an-organization#organization-owners">
             organization owner
           </a>. You can also connect a personal GitHub account.
         </>,
       ],
    }
  ]}
/>

<GitHubAccountVisibilityNote/>

You cannot use Compose files to deploy applications through the Aiven API or Aiven MCP.
Use
[Containerfiles or Dockerfiles](/docs/products/runtime/manifest-files/containerfiles) instead.

## Prerequisites

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

- A GitHub account

</TabItem>
<TabItem value="cli" label="CLI" default>

- The [Aiven CLI installed](/docs/tools/cli)
- [An Aiven token](/docs/platform/concepts/authentication-tokens)
- A [connected GitHub account](/docs/products/runtime/connect-github-account)

</TabItem>
<TabItem value="api" label="API" default>

- [An Aiven token](/docs/platform/concepts/authentication-tokens)
- A [connected GitHub account](/docs/products/runtime/connect-github-account)

</TabItem>
</Tabs>

## Deploy an application

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

:::note
When you connect a GitHub account to your Aiven organization, all users in that
organization can select that account in Aiven Runtime.
:::

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Click **Deploy application**.
1. Select or connect your **GitHub account**.
1. Select your **Account**, **Repository**, and **Branch**.
1. Click **Next**.
1. Select your manifest file and click **Scan**. Aiven Runtime automatically detects
   what applications and services are needed.
1. To change the configuration of an application, click <ConsoleIcon name="edit"/>.
   To change the configuration of a service integration, click
   <ConsoleLabel name="editappintegrationconfig"/>.
1. To deploy the application and create the services, click **Deploy**.

</TabItem>
<TabItem value="cli" label="CLI">

1. To choose a project, run:

   ```bash
   avn project switch PROJECT_NAME
   ```

   Where `PROJECT_NAME` is the name of your Aiven project.

1. Optional: Create data services for the app to use with the `avn service create` command.
   The following example creates a PostgreSQL service:

   ```bash
   avn service create example-postgres \
     --project PROJECT_NAME \
     -t pg \
     --cloud aws-eu-west-1 \
     --plan startup-4
   ```

1. Get your `VCS_INTEGRATION_ID` from the Aiven API. This is Aiven's ID
   for the GitHub Aiven App installation linked to your organization when
   you [connected your GitHub account](/docs/products/runtime/connect-github-account).
   To get your ID, run:

   ```bash
   curl -sS \
     "https://api.aiven.io/v1/organization/ORGANIZATION_ID/application/vcs-integrations" \
     -H "Authorization: Bearer $AIVEN_TOKEN"
   ```

   Where `ORGANIZATION_ID` is the
   [Aiven organization ID](/docs/platform/reference/get-resource-IDs) the GitHub account
   is connected to.

1. Get the ID of the connected repository from the Aiven API.
   To get the `REMOTE_REPOSITORY_ID`, run the following command using the
    `VCS_INTEGRATION_ID`:

   ```bash
   curl -sS \
     "https://api.aiven.io/v1/organization/ORGANIZATION_ID/application/vcs-integrations/VCS_INTEGRATION_ID/repositories" \
     -H "Authorization: Bearer $AIVEN_TOKEN"
   ```

1. To create the application, run the following:

   ```bash
   avn service create example-app \
   --project PROJECT_NAME \
   -t application \
   --cloud aws-eu-west-1 \
   --plan startup-50-1024 \
   -c application.source.vcs_integration_id=VCS_INTEGRATION_ID \
   -c application.source.remote_repository_id=REMOTE_REPOSITORY_ID \
   -c application.source.repository_url=REPOSITORY_URL \
   -c application.source.branch=BRANCH_NAME \
   -c application.source.build_path=. \
   -c application.source.containerfile_path=Dockerfile \
   -c 'application.ports=[{"name":"http","port":8080,"protocol":"HTTP"}]' \
   ```

   Where:
   - `VCS_INTEGRATION_ID` is the GitHub Aiven app ID.
   - `REMOTE_REPOSITORY_ID` is the ID of the connected repository.
   - `REPOSITORY_URL` is the URL of the connected repository.
   - `BRANCH_NAME` is the branch to deploy.


   To use a project VPC, add `--project-vpc-id VPC_ID`.

1. Optional: Integrate your data services with the app.
   For example, to integrate the PostgreSQL service with the app, run:

   ```bash
   avn service integration-create \
     --project PROJECT_NAME \
     -t application_service_credential \
     -s example-postgres \
     -d example-app \
     --user-config-json '{"service_type":"pg","exposed_values":{"connection_string":{"environment_variable_key":"DATABASE_URL"}}}'
   ```

:::tip
To check the status of your services or applications, run
`avn service wait SERVICE_NAME --project PROJECT_NAME`.
:::

</TabItem>
<TabItem value="api" label="API">

1. Optional: Create data services to integrate with your application using the
  `POST /v1/project/{project}/service` endpoint. For example, the following
  creates Aiven for PostgreSQL® service:

     ```bash
      curl -sS -X POST "https://api.aiven.io/v1/project/example-project/service" \
        -H "Authorization: Bearer $AIVEN_TOKEN" \
        -H "Content-Type: application/json" \
        -d '{
          "service_name": "example-postgres-service",
          "service_type": "pg",
          "plan": "startup-4",
          "cloud": "aws-eu-west-1"
        }'
     ```

1. To create the application, use the `POST/v1/project/{project}/service` endpoint. The
   following example deploys an application, sets environment variables, and integrates
   the app with an existing PostgreSQL service:

   ```bash
   curl -sS -X POST \
     "https://api.aiven.io/v1/project/PROJECT_NAME/service" \
     -H "Authorization: Bearer $AIVEN_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "service_name": "example-app",
       "service_type": "application",
       "cloud": "aws-eu-west-1",
       "plan": "startup-50-1024",
       "user_config": {
         "application": {
           "source": {
             "repository_url": "REPOSITORY_URL",
             "branch": "BRANCH_NAME",
             "build_path": "./",
             "containerfile_path": "Dockerfile"
           },
           "ports": [
             { "name": "http", "port": 8080, "protocol": "HTTP" }
           ],
           "environment_variables": [
             { "key": "LOG_LEVEL", "value": "INFO", "kind": "variable" },
             { "key": "API_KEY", "value": "secret", "kind": "secret" }
           ]
         }
       },
       "service_integrations": [
         {
           "integration_type": "application_service_credential",
           "source_service": "example-postgres-service",
           "user_config": {
             "service_type": "pg",
             "exposed_values": {
               "connection_string": {
                 "environment_variable_key": "DATABASE_URL"
               }
             }
           }
         }
       ]
     }'
   ```

   Where:
   - `PROJECT_NAME` is the name of your Aiven project.
   - `REPOSITORY_URL` is the URL of the connected repository.
   - `BRANCH_NAME` is the branch to deploy.
   - `containerfile_path`: Use the repository-relative path for your
     Dockerfile or Containerfile. For example, `./Dockerfile` or `./api/Dockerfile.prod`.
   - `build_path` is the build context and defaults to `./.`.
     If you set `build_path` and omit `containerfile_path`, Aiven searches that directory
     for a Dockerfile/Containerfile.
   - `source_service` is the name of the service to integrate with the application.

   To use a project VPC, add `"project_vpc_id": "VPC_ID"`.

</TabItem>
</Tabs>


## Redeploy an application

When you redeploy an application, Aiven deploys the latest commit from
the selected branch.

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Open your application.
1. On the **Overview** page, click <ConsoleLabel name="actions"/> > <ConsoleLabel name="redeployapp"/>.
