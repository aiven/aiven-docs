---
title: Create a custom cloud
sidebar_label: Create custom clouds
keywords: [AWS, Amazon Web Services, GCP, Google Cloud Platform, byoc, bring your own cloud, custom cloud]
---

import DocCardList from '@theme/DocCardList';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";
import Card from "@site/src/components/non-swizzled/Card";
import GridContainer from "@site/src/components/non-swizzled/GridContainer";
import Cassandra from "@site/static/images/logos/cassandra.svg";

To create custom clouds in Aiven using self-service, select your cloud provider to integrate with.

<GridContainer columns={2}>
     <Card
      to="/docs/platform/howto/byoc/create-cloud/create-aws-custom-cloud"
      iconName="cloud"
      title="Amazon Web Services"
      description="Create an AWS-integrated custom cloud."
    />
    <Card
      to="/docs/platform/howto/byoc/create-cloud/create-google-custom-cloud"
      iconName="googleLogo"
      title="Google Cloud"
      description="Create a Google-integrated custom cloud."
    />
</GridContainer>

#### Limitations

-   You need at least the Advanced tier of Aiven support services to be
    eligible for activating BYOC.

    :::tip
    See [Aiven support tiers](https://aiven.io/support-services) and
    [Aiven responsibility matrix](https://aiven.io/responsibility-matrix) for BYOC.
    Contact your account team to learn more or upgrade your support tier.
    :::

-   Only [organization admins](/docs/platform/concepts/permissions#organization-roles-and-permissions)
    can create custom clouds.

#### Related pages

-   [About bring your own cloud](/docs/platform/concepts/byoc)
-   [Bring your own cloud networking and security](/docs/platform/howto/byoc/networking-security)
