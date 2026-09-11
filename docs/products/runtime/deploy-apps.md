---
title: Deploy an application
---

import {ConsoleIcon} from "@site/src/components/ConsoleIcons";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RequirementsPanel from "@site/src/components/RequirementsPanel";
import GitHubAccountVisibilityNote from "@site/static/includes/runtime-github-account-visibility-note.md";

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

## Deploy an application

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

## Redeploy an application

When you redeploy an application, Aiven deploys the latest commit from
the selected branch.

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Open your application.
1. On the **Overview** page, click <ConsoleLabel name="actions"/> > <ConsoleLabel name="redeployapp"/>.
