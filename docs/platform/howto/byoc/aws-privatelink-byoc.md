---
title: Use AWS PrivateLink with BYOC services
sidebar_label: Use AWS PrivateLink
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Enable and manage AWS PrivateLink for your Aiven services deployed in your own cloud using [bring your own cloud (BYOC)](/docs/platform/concepts/byoc).

## Limitations

- AWS PrivateLink for Aiven BYOC is a feature with [limited availability](/docs/platform/concepts/service-and-feature-releases#limited-availability-).
- You can enable AWS PrivateLink for your Aiven BYOC service only if it uses the [AWS BYOC
  private deployment](/docs/platform/concepts/byoc#byoc-architecture) model.

## Prerequisites

- [Aiven CLI](/docs/tools/cli)
- [AWS CLI](https://aws.amazon.com/cli/)
- [Terraform](https://developer.hashicorp.com/terraform)
- Optionally, access to:
  - [Aiven Console](https://console.aiven.io/)
  - [AWS Management Console](https://console.aws.amazon.com)

## Set up permissions

Use your Terraform template to grant Aiven the permissions to set up and manage secure
PrivateLink connections within your AWS environment for your BYOC service. To add the
required permissions to your own AWS account:

1. [Download the latest version of your Terraform template](/docs/platform/howto/byoc/download-infrastructure-template).
1. [Apply the updated template in your own AWS account using Terraform](/docs/platform/howto/byoc/create-cloud/create-aws-custom-cloud#deploy-the-template).

## Enable AWS PrivateLink

See
[Use AWS PrivateLink with Aiven services](/docs/platform/howto/use-aws-privatelinks#enable-aws-privatelink).

<RelatedPages/>

- [Create a custom cloud (BYOC environment in Aiven)](/docs/platform/howto/byoc/create-cloud/create-aws-custom-cloud#create-a-custom-cloud)
- [Download an infrastructure template and a variables file](/docs/platform/howto/byoc/download-infrastructure-template)
