---
title: Connect or configure a GitHub account
---

import {ConsoleIcon} from "@site/src/components/ConsoleIcons";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RequirementsPanel from "@site/src/components/RequirementsPanel";
import GitHubAccountVisibilityNote from "@site/static/includes/runtime-github-account-visibility-note.md";

Connect your GitHub account to deploy applications from your GitHub repositories.

<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`role:organization:admin`'],
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

You cannot connect the same GitHub organization or personal account
to more than one Aiven organization.

<GitHubAccountVisibilityNote />

## Connect a GitHub account

To connect your GitHub account, install the Aiven Platform app on GitHub:

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Click **Deploy application**.
1. Click <ConsoleIcon name="plusCircle"/> **Connect another account**.
1. Click **GitHub**.
1. On the tab that opens, select a GitHub account.
1. Select **All repositories** or choose specific repositories.
   All users in the Aiven organization can view and deploy from the connected repositories.
1. Click **Install & Authorize**.
1. To confirm, click **Connect**.

In the Aiven Console tab, you can select your account and connected repositories to
[deploy your application](/docs/products/runtime/deploy-apps).

## Configure or uninstall the Aiven Platform app on GitHub

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Click **Deploy application**.
1. Click <ConsoleIcon name="plusCircle"/> **Connect another account**.
1. Click **GitHub**.
1. On the tab that opens, click **Configure** on a GitHub account.

You can change the connected repositories, suspend the installation,
or uninstall the Aiven Platform app.

## Troubleshooting

If you have issues connecting your GitHub account,
[uninstall the Aiven Platform app from GitHub](https://docs.github.com/en/enterprise-cloud@latest/apps/using-github-apps/reviewing-and-modifying-installed-github-apps)
and try again.
