---
title: Rotate SCIM tokens
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import {ConsoleIcon} from "@site/src/components/ConsoleIcons"

You can manually rotate the SCIM token for an identity provider to maintain the security of your user provisioning setup.

To avoid interruptions to your user provisioning,
update the token in your identity provider configuration when you rotate a SCIM token.

To generate a SCIM token:

1. In your organization, click **Admin**.
1. Click <ConsoleLabel name="idp"/>.
1. Click the name of the identity provider.
1. In the **SCIM provisioning** section, click **Edit**.
1. To generate a new token, click <ConsoleIcon name="reset"/> **Generate new token**.
1. To confirm, click **Generate new token**.
1. Click <ConsoleLabel name="copy"/> and update it in your identity provider.
   - To update Okta configuration, follow the steps in the
      [user provisioning configuration](/docs/platform/howto/saml/add-okta-idp#step-4-optional-configure-user-provisioning) guide.
1. Click **Save changes**.

<RelatedPages/>
- [Add Okta as an identity provider](/docs/platform/howto/saml/add-okta-idp)
- [SAML identity providers and verified domains](/docs/platform/howto/list-identity-providers)
