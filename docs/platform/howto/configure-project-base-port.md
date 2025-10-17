---
title: Configure project base port
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The base port number for a project determines the Aiven service ports. The base port is randomly assigned, but you can also configure the port number for a project.

To set the base port number for a project:

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In the project, click <ConsoleLabel name="projectsettings"/>.
1. In the **Networking settings** section, enter a **Base port** number.
1. Click **Save changes**.

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the `base_port` attribute in
[your `aiven_organization_project` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/organization_project).

</TabItem>
</Tabs>
