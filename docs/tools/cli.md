---
title: Aiven CLI
---

The Aiven command line interface (CLI) lets you use the Aiven platform and services in a scriptable way through the API.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Install the Aiven CLI

1. The `avn` utility is a [Python package](https://pypi.org/project/aiven-client/):

   <Tabs groupId="group1">
   <TabItem value="PIP" label="pip" default>

   ```bash
   pip install aiven-client
   ```

   </TabItem>
   <TabItem value="Brew" label="Homebrew">

   ```bash
   brew install aiven-client
   ```

   </TabItem>
   </Tabs>

1. To check your installation, run:

   ```bash
   avn --version
   ```

## Authenticate with the Aiven CLI

You can authenticate using your password or a
[token](/docs/platform/concepts/authentication-tokens).

<Tabs groupId="group1">
<TabItem value="With a password" label="With a password" default>

1. To log in with your email, run:

   ```bash
   avn user login EMAIL_ADDRESS
   ```

1. When prompted, enter your password.

</TabItem>
<TabItem value="With a token" label="With a token">

1. [Create a token](/docs/platform/howto/create_authentication_token).

1. To authenticate with a token, run:

   ```bash
   avn user login EMAIL_ADDRESS --token
   ```

</TabItem>
</Tabs>

## Configure the output format

To get information in JSON format, use the `--json` switch with any command.

## Related pages

- [Learn how to use the Aiven CLI](https://aiven.io/blog/aiven-cmdline) for common tasks.
- Watch the [how to get started tutorial](https://www.youtube.com/watch?v=nf3PPn5w6K8).
- Go to the [aiven-client repository on GitHub](https://github.com/aiven/aiven-client).
