import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ForkService from "@site/static/includes/fork-service-console.md";

## Fork a service

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

<ForkService/>

</TabItem>
<TabItem value="cli" label="CLI">

Use the
[create service command](/docs/tools/cli/service-cli#avn-cli-service-create)
with:

- `--service-to-fork-from`: the name of the service to use as the source.
- `--project-to-fork-from`: to fork a service in a different project,
  set this to the project name the source service is in.

</TabItem>
<TabItem value="api" label="API">

Use the
[`ServiceCreate` endpoint](https://api.aiven.io/doc/#tag/Service/operation/ServiceCreate)
and in the `user_config` property set:

- `service_to_fork_from`: the name of the source service.
- `project_to_fork_from`: to fork a service in a different project, set this
   to the name of the project the source service is in.

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the `service_to_fork_from` attribute in the user config of your service resource.

To fork a service in a different project, set the `project_to_fork_from` attribute.

More information on the service resources and their configuration options
are available in the
[Terraform documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs).

</TabItem>
</Tabs>
