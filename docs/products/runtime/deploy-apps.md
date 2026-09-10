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

## ## Prerequisites

- ...


## Deploy an application

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

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
<TabItem value="" label="">


1. Authenticate and pick a project
avn user login

1. avn project switch YOUR_PROJECT

1. Choose GitHub account, repository, and branch. On the CLI you pass them as configuration, not as picker clicks.

You need:

VCS_INTEGRATION_ID — for example vcs51174433e50
REMOTE_REPOSITORY_ID — GitHub numeric repo ID
REPOSITORY_URL — for example https://github.com/org/repo.git
BRANCH — for example main
CONTAINERFILE_PATH — for example Dockerfile or docker-compose.yml
BUILD_PATH — usually .
Console’s Scan step discovers these from the repo. The CLI does not scan; you set the paths yourself (from the repo, or from a scan you already ran in Console).


1. Optional: create any data services the app should use (PostgreSQL, Kafka, Valkey, OpenSearch). Create these before the application, same as Console deploy.


avn service create my-postgres \
  --project PROJECT_NAME \
  -t pg \
  --cloud aws-eu-west-1 \
  --plan startup-4


1. Create the application

     ```bash
        ```
   avn service create my-app \
  --project PROJECT_NAME \
  -t application \
  --cloud aws-eu-west-1 \
  --plan startup-50-1024 \
  -c application.source.vcs_integration_id=VCS_INTEGRATION_ID \
  -c application.source.remote_repository_id=REMOTE_REPOSITORY_ID \
  -c application.source.repository_url=https://github.com/org/repo.git \
  -c application.source.branch=main \
  -c application.source.build_path=. \
  -c application.source.containerfile_path=Dockerfile \
  -c 'application.ports=[{"name":"http","port":8080,"protocol":"HTTP"}]' \
  -c 'application.environment_variables=[{"key":"LOG_LEVEL","value":"INFO","kind":"variable"}]'
  ```

   Add --project-vpc-id VPC_ID if the project requires a VPC.

   For CLI you have to read VCS_INTEGRATION_ID and REMOTE_REPOSITORY_ID from the API.

   VCS_INTEGRATION_ID is Aiven’s ID for the GitHub App installation linked to your organization (vcs…). It is created when an org admin finishes Connect GitHub in Console.

   curl -sS \
     "https://api.aiven.io/v1/organization/ORGANIZATION_ID/application/vcs-integrations" \
     -H "Authorization: Bearer $AIVEN_TOKEN"
   Use vcs_integrations[].vcs_integration_id. vcs_account_name is the GitHub org or user you connected (for example my-github-org).

   REMOTE_REPOSITORY_ID is GitHub’s numeric repository ID, as a string (for example "1234567890"). It is not the repo name.

   curl -sS \
     "https://api.aiven.io/v1/organization/ORGANIZATION_ID/application/vcs-integrations/VCS_INTEGRATION_ID/repositories" \
     -H "Authorization: Bearer $AIVEN_TOKEN"
   Use repositories[].remote_repository_id for the row whose full_name is org/repo. You also get source_url (the clone URL to pass as repository_url).

   Same ID on GitHub: repo Settings (the numeric ID) or GET https://api.github.com/repos/ORG/REPO → id.

1. Optional: attach service credentials (CLI equivalent of edit app integration config).


avn service integration-create \
  --project PROJECT_NAME \
  -t application_service_credential \
  -s my-postgres \
  -d my-app \
  -c service_type=pg \
  -c exposed_values.connection_string.environment_variable_key=DATABASE_URL

3. Wait until it is running
avn service wait my-app --project YOUR_PROJECT
avn service get my-app --project YOUR_PROJECT

Watch state (REBUILDING / RUNNING / error states). Connection info and published HTTP ports
 come from the service.




</TabItem>
</Tabs>


## Redeploy an application

When you redeploy an application, Aiven deploys the latest commit from
the selected branch.

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Open your application.
1. On the **Overview** page, click <ConsoleLabel name="actions"/> > <ConsoleLabel name="redeployapp"/>.




There is no dedicated avn subcommand for this; call the same endpoint the Console uses:

avn rest POST /project/YOUR_PROJECT/service/my-app/application/redeploy


<!--

update app


# Config / env (secrets redacted unless you have permission and request them)
avn service get my-app --project YOUR_PROJECT
avn rest GET /project/YOUR_PROJECT/service/my-app/application/environment-variables

# Update source, ports, or env
avn service update my-app --project YOUR_PROJECT \
  -c application.source.branch=main \
  -c 'application.ports=[{"name":"http","port":8080,"protocol":"HTTP"}]'

# Delete
avn service terminate my-app --project YOUR_PROJECT
-->
