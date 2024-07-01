---
title: Create an AWS custom cloud in Aiven
sidebar_label: Create custom clouds
keywords: [bring your own cloud, byoc, custom cloud]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

Create a [custom cloud](/docs/platform/concepts/byoc) for BYOC in your Aiven organization to better address your specific business needs or project requirements.

:::note

-   Creating and using custom clouds in your Aiven organization requires
    enabling
    [the _bring your own cloud (BYOC)_ feature](/docs/platform/concepts/byoc). Check the
    availability of the feature in
    [Who is eligible for BYOC](/docs/platform/concepts/byoc#eligible-for-byoc). To
    activate BYOC in your Aiven organization, follow
    [Enable bring your own cloud (BYOC) with Aiven](/docs/platform/howto/byoc/enable-byoc).
-   Enabling
    [the BYOC feature](/docs/platform/concepts/byoc) or creating custom clouds in your
    Aiven environment does not affect the configuration of your existing organizations,
    projects, or services. This only makes the new BYOC capabilities available in your
    environment.

:::

## About creating a custom cloud

Before creating a custom cloud, take note of the
[limitations](/docs/platform/howto/byoc/create-custom-cloud#byoc-limitations) and
the [prerequisites](/docs/platform/howto/byoc/create-custom-cloud#byoc-prerequisites).

The process of creating a custom cloud in Aiven differs depending on the
cloud provider to integrate with:

-   To use the AWS cloud provider, create your custom cloud
    yourself in [Aiven Console](https://console.aiven.io/).

:::note[BYOC self-service in Aiven Console]
You configure your custom cloud setup in [Aiven
Console](https://console.aiven.io/) and prepare your own AWS account so
that Aiven can access it. In [Aiven Console](https://console.aiven.io/),
you follow the **Create custom cloud** workflow to generate a Terraform
infrastructure-as-code (IaC) template. Next, you deploy this template in
your AWS account to acquire IAM Role ARN (Amazon Resource Name). You
supply your IAM Role ARN into the **Create custom cloud** wizard, which
gives Aiven the permissions to securely access your AWS account, create
resources, and manage them onward. Finally, you select projects that can
use your new custom clouds for creating services, and you add customer
contacts for your custom cloud.
:::

-   To use the GCP or Azure cloud providers, request the
    Aiven team to create the cloud.

## Limitations {#byoc-limitations}

-   You need the Premium tier of Aiven support services to be
    eligible for activating BYOC.

    :::note
    See [Aiven support tiers](https://aiven.io/support-services) and
    [Aiven responsibility matrix](https://aiven.io/responsibility-matrix) for BYOC.
    Contact your account team to learn more or upgrade your support tier.
    :::

-   To build your custom cloud with a cloud provider other
    than AWS, request it as detailed in
    [Enable bring your own cloud (BYOC) with Aiven](/docs/platform/howto/byoc/enable-byoc).
-   BYOC is supported with the
    [standard deployment](/docs/platform/concepts/byoc#byoc-deployment) model only.
-   Only organization's administrators can create custom clouds.

## Prerequisites {#byoc-prerequisites}

-   You have
    [enabled the BYOC feature](/docs/platform/howto/byoc/enable-byoc).
-   You have an active account with your cloud provider.
-   You have access to [Aiven Console](https://console.aiven.io/)
    ([to integrate with AWS](/docs/platform/howto/byoc/create-custom-cloud#create-cloud-aws)).
-   You have administrator's role in your Aiven organization
    ([to integrate with AWS](/docs/platform/howto/byoc/create-custom-cloud#create-cloud-aws)).
-   You have Terraform installed
    ([to integrate with AWS](/docs/platform/howto/byoc/create-custom-cloud#create-cloud-aws)).

### AWS IAM permissions

You need AWS credentials set up on your machine so that your user or role has required
Terraform permissions [to integrate with AWS](/docs/platform/howto/byoc/create-custom-cloud#create-cloud-aws).

<details><summary>
Show permissions required for creating resources for bastion and
workload networks
</summary>

```bash
{
    "Statement": [
        {
            "Action": [
                "iam:AttachRolePolicy",
                "iam:CreateRole",
                "iam:DeleteRole",
                "iam:DeleteRolePolicy",
                "iam:GetRole",
                "iam:GetRolePolicy",
                "iam:ListAttachedRolePolicies",
                "iam:ListInstanceProfilesForRole",
                "iam:ListRolePolicies",
                "iam:PutRolePolicy",
                "iam:UpdateAssumeRolePolicy"
            ],
            "Effect": "Allow",
            "Resource": "arn:aws:iam::*:role/cce-*-iam-role"
        },
        {
            "Action": [
                "ec2:DescribeAddresses",
                "ec2:DescribeAddressesAttribute",
                "ec2:DescribeAvailabilityZones",
                "ec2:DescribeInternetGateways",
                "ec2:DescribeNatGateways",
                "ec2:DescribeNetworkInterfaces",
                "ec2:DescribePrefixLists",
                "ec2:DescribeRouteTables",
                "ec2:DescribeSecurityGroups",
                "ec2:DescribeSecurityGroupRules",
                "ec2:DescribeStaleSecurityGroups",
                "ec2:DescribeSubnets",
                "ec2:DescribeVpcs",
                "ec2:DescribeVpcEndpoints",
                "ec2:DescribeVpcAttribute",
                "ec2:DescribeTags"
            ],
            "Effect": "Allow",
            "Resource": [
                "*"
            ],
            "Sid": "Describe"
        },
        {
            "Action": [
                "ec2:CreateTags"
            ],
            "Condition": {
                "StringEquals": {
                    "ec2:CreateAction": [
                        "AllocateAddress",
                        "CreateInternetGateway",
                        "CreateNatGateway",
                        "CreateRoute",
                        "CreateRouteTable",
                        "CreateSecurityGroup",
                        "CreateSubnet",
                        "CreateVpc",
                        "CreateVpcEndpoint"
                    ]
                }
            },
            "Effect": "Allow",
            "Resource": [
                "*"
            ],
            "Sid": "CreateTag"
        },
        {
            "Action": [
                "ec2:DeleteTags"
            ],
            "Effect": "Allow",
            "Resource": [
                "arn:aws:ec2:*:*:elastic-ip/*",
                "arn:aws:ec2:*:*:internet-gateway/*",
                "arn:aws:ec2:*:*:natgateway/*",
                "arn:aws:ec2:*:*:route-table/*",
                "arn:aws:ec2:*:*:security-group/*",
                "arn:aws:ec2:*:*:security-group-rule/*",
                "arn:aws:ec2:*:*:subnet/*",
                "arn:aws:ec2:*:*:vpc/*"
            ],
            "Sid": "DeleteTag"
        },
        {
            "Action": [
                "ec2:AllocateAddress",
                "ec2:CreateInternetGateway",
                "ec2:CreateVpc"
            ],
            "Condition": {
                "StringLike": {
                    "aws:RequestTag/Name": "cce-*"
                }
            },
            "Effect": "Allow",
            "Resource": [
                "*"
            ],
            "Sid": "Create"
        },
        {
            "Action": [
                "ec2:CreateNatGateway"
            ],
            "Condition": {
                "StringNotLike": {
                    "ec2:ResourceTag/Name": "cce-*"
                }
            },
            "Effect": "Deny",
            "Resource": [
                "arn:aws:ec2:*:*:elastic-ip/*",
                "arn:aws:ec2:*:*:subnet/*"
            ],
            "Sid": "CreateNGWAllowCCESubnetOnly"
        },
        {
            "Action": [
                "ec2:CreateNatGateway"
            ],
            "Condition": {
                "StringNotLike": {
                    "aws:RequestTag/Name": "cce-*"
                }
            },
            "Effect": "Deny",
            "Resource": [
                "arn:aws:ec2:*:*:natgateway/*"
            ],
            "Sid": "CreateNGWAllowCCEOnly"
        },
        {
            "Action": [
                "ec2:CreateNatGateway"
            ],
            "Effect": "Allow",
            "Resource": [
                "arn:aws:ec2:*:*:elastic-ip/*",
                "arn:aws:ec2:*:*:natgateway/*",
                "arn:aws:ec2:*:*:subnet/*"
            ],
            "Sid": "CreateNGW"
        },
        {
            "Action": [
                "ec2:CreateRouteTable",
                "ec2:CreateSecurityGroup",
                "ec2:CreateSubnet"
            ],
            "Condition": {
                "StringNotLike": {
                    "ec2:ResourceTag/Name": "cce-*"
                }
            },
            "Effect": "Deny",
            "Resource": [
                "arn:aws:ec2:*:*:vpc/*"
            ],
            "Sid": "CreateSubAllowCCEVPCOnly"
        },
        {
            "Action": [
                "ec2:CreateRouteTable"
            ],
            "Condition": {
                "StringNotLike": {
                    "aws:RequestTag/Name": "cce-*"
                }
            },
            "Effect": "Deny",
            "Resource": [
                "arn:aws:ec2:*:*:route-table/*"
            ],
            "Sid": "CreateRTAllowCCEOnly"
        },
        {
            "Action": [
                "ec2:CreateRouteTable"
            ],
            "Effect": "Allow",
            "Resource": [
                "arn:aws:ec2:*:*:route-table/*",
                "arn:aws:ec2:*:*:vpc/*"
            ],
            "Sid": "CreateRT"
        },
        {
            "Action": [
                "ec2:CreateSecurityGroup"
            ],
            "Condition": {
                "StringNotLike": {
                    "aws:RequestTag/Name": "cce-*"
                }
            },
            "Effect": "Deny",
            "Resource": [
                "arn:aws:ec2:*:*:security-group/*"
            ],
            "Sid": "CreateSGsAllowCCEOnly"
        },
        {
            "Action": [
                "ec2:CreateSecurityGroup"
            ],
            "Effect": "Allow",
            "Resource": [
                "arn:aws:ec2:*:*:security-group/*",
                "arn:aws:ec2:*:*:vpc/*"
            ],
            "Sid": "CreateSG"
        },
        {
            "Action": [
                "ec2:CreateSubnet"
            ],
            "Condition": {
                "StringNotLike": {
                    "aws:RequestTag/Name": "cce-*"
                }
            },
            "Effect": "Deny",
            "Resource": [
                "arn:aws:ec2:*:*:subnet/*"
            ],
            "Sid": "CreateSubAllowCCEOnly"
        },
        {
            "Action": [
                "ec2:CreateSubnet"
            ],
            "Effect": "Allow",
            "Resource": [
                "arn:aws:ec2:*:*:subnet/*",
                "arn:aws:ec2:*:*:vpc/*"
            ],
            "Sid": "CreateSubnets"
        },
        {
            "Action": [
                "ec2:CreateVpcEndpoint"
            ],
            "Effect": "Allow",
            "Resource": [
                "*"
            ],
            "Sid": "CreateVpcEndpoint"
        },
        {
            "Action": [
                "ec2:AssociateAddress",
                "ec2:AssociateRouteTable",
                "ec2:AssociateSubnetCidrBlock",
                "ec2:AssociateVpcCidrBlock",
                "ec2:AssignPrivateNatGatewayAddress",
                "ec2:AttachInternetGateway",
                "ec2:AuthorizeSecurityGroupEgress",
                "ec2:AuthorizeSecurityGroupIngress",
                "ec2:CreateRoute",
                "ec2:ModifySecurityGroupRules",
                "ec2:ModifySubnetAttribute",
                "ec2:ModifyVpcAttribute",
                "ec2:ModifyVpcEndpoint",
                "ec2:ReplaceRoute",
                "ec2:ReplaceRouteTableAssociation",
                "ec2:UpdateSecurityGroupRuleDescriptionsEgress",
                "ec2:UpdateSecurityGroupRuleDescriptionsIngress"
            ],
            "Condition": {
                "StringLike": {
                    "ec2:ResourceTag/Name": "cce-*"
                }
            },
            "Effect": "Allow",
            "Resource": [
                "*"
            ],
            "Sid": "Modify"
        },
        {
            "Action": [
                "ec2:DisassociateAddress"
            ],
            "Condition": {
                "StringNotLike": {
                    "ec2:ResourceTag/Name": "cce-*"
                }
            },
            "Effect": "Deny",
            "Resource": [
                "arn:aws:ec2:*:*:elastic-ip/*"
            ],
            "Sid": "DisassociateEIPAllowCCEOnly"
        },
        {
            "Action": [
                "ec2:DisassociateAddress"
            ],
            "Effect": "Allow",
            "Resource": [
                "arn:aws:ec2:*:*:*/*"
            ],
            "Sid": "DisassociateEIP"
        },
        {
            "Action": [
                "ec2:DetachInternetGateway",
                "ec2:DisassociateNatGatewayAddress",
                "ec2:DisassociateRouteTable",
                "ec2:DisassociateSubnetCidrBlock",
                "ec2:DisassociateVpcCidrBlock",
                "ec2:DeleteInternetGateway",
                "ec2:DeleteNatGateway",
                "ec2:DeleteNetworkInterface",
                "ec2:DeleteRoute",
                "ec2:DeleteRouteTable",
                "ec2:DeleteSecurityGroup",
                "ec2:DeleteSubnet",
                "ec2:DeleteVpc",
                "ec2:DeleteVpcEndpoints",
                "ec2:ReleaseAddress",
                "ec2:RevokeSecurityGroupEgress",
                "ec2:RevokeSecurityGroupIngress",
                "ec2:UnassignPrivateNatGatewayAddress"
            ],
            "Condition": {
                "StringLike": {
                    "ec2:ResourceTag/Name": "cce-*"
                }
            },
            "Effect": "Allow",
            "Resource": [
                "*"
            ],
            "Sid": "Delete"
        }
    ],
    "Version": "2012-10-17"
}
```

</details>

## Create a custom cloud {#create-cloud}

### Create a custom cloud with GCP or Azure {#create-cloud-non-aws}

To use the GCP or Azure cloud providers, you'll have your
custom cloud created by the Aiven team (not via [Aiven
Console](https://console.aiven.io/)). Therefore, after
[enabling the BYOC feature](/docs/platform/howto/byoc/enable-byoc) in
[Aiven Console](https://console.aiven.io/), there are no
further actions required from you to create your custom cloud. we'll
build your custom cloud for you according to the specifications you
provided while
[enabling BYOC](/docs/platform/howto/byoc/enable-byoc) in
[Aiven Console](https://console.aiven.io/). We might
reach out to you for more details if needed and follow up with you to
keep you informed on the progress.

### Create a custom cloud with AWS {#create-cloud-aws}

Create your infrastructure template in [Aiven
Console](https://console.aiven.io/), deploy the template in your AWS
account to generate Role ARN, and get back to [Aiven
Console](https://console.aiven.io/) with your Role ARN to proceed with
your custom cloud configuration. Finalize the setup by selecting in
which projects to use your custom cloud and assigning a contact
person for your custom cloud.

#### Launch the BYOC setup in Aiven Console

1.  Log in to [Aiven Console](https://console.aiven.io/) as an
    administrator, and go to a desired organization.
1.  From the top navigation bar, select **Admin**.
1.  From the left sidebar, select <ConsoleLabel name="bringyourowncloud"/>.
1.  In the **Bring your own cloud** view, select **Create custom
    cloud**.

#### Generate an infrastructure template {#generate-infra-template}

In this step, an IaC template is generated in the Terraform format. In
[the next step](/docs/platform/howto/byoc/create-custom-cloud#acquire-role-arn),
you'll deploy this template in your AWS account to acquire Role ARN
(Amazon Resource Name), which Aiven needs for accessing your AWS
account.

In the **Create custom cloud** wizard:

1.  Specify the following:

    -   Custom cloud name

    -   Cloud provider (AWS only)

    -   Region

    -   CIDR

        The **CIDR** block defines the IP address range of the VPC that
        Aiven creates in your AWS account. Any Aiven service created in
        the custom cloud will be placed in the VPC and will get an IP
        address within this address range.

        In the **CIDR** field, specify an IP address range for the BYOC
        VPC using a CIDR block notation, for example: `10.0.0.0/16`,
        `172.31.0.0/16`, or `192.168.0.0/20`.

        Make sure that an IP address range you use meets the following
        requirements:

        -   IP address range is within the private IP address ranges
            allowed in [RFC
            1918](https://datatracker.ietf.org/doc/html/rfc1918).

        -   CIDR block size is between `/16` (65536 IP addresses) and
            `/24` (256 IP addresses).

        -   CIDR block is large enough to host the desired number of
            services after splitting it into per-availability-zone
            subnets.

            For example, the smallest `/24` CIDR block might be enough
            for a few services but can pose challenges during node
            replacements or maintenance upgrades if running low on
            available free IP addresses.

        -   CIDR block of your BYOC VCP doesn't overlap with the CIDR
            blocks of VPCs you plan to peer your BYOC VPC with. You
            cannot change the BYOC VPC CIDR block after your custom
            cloud is created.

1.  Select **Next**.

Your IaC Terraform template gets generated based on your inputs. You can
view, copy, or download it. Now, you can use the template to
[acquire Role ARN](/docs/platform/howto/byoc/create-custom-cloud#acquire-role-arn).

#### Deploy the template to acquire `Role ARN` {#acquire-role-arn}

Role ARN is an [identifier of the
role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html)
created when running the infrastructure template in your AWS account.
Aiven uses Role ARN to [assume the
role](https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html)
and run operations such as creating VMs for service nodes in your BYOC
account.

Use the Terraform template generated in step
[Generate an infrastructure template](/docs/platform/howto/byoc/create-custom-cloud#generate-infra-template)
to create your Role ARN by deploying the template in your
AWS account. Continue working in the **Create custom cloud** wizard:

1.  Copy or download the template and the variables file from the
    **Create custom cloud** wizard.

1.  Optionally, modify the template as needed.

    :::note
    To connect to a custom-cloud service from different security groups
    (other than the one dedicated for the custom cloud) or from IP
    address ranges, add specific ingress rules before you apply a
    Terraform infrastructure template in your AWS account in the process
    of creating a custom cloud resources.

    Before adding ingress rules, see the examples provided in the
    Terraform template you generated and downloaded from [Aiven
    Console](https://console.aiven.io/).
    :::

1.  Use Terraform to deploy the infrastructure template in your AWS account with the
    provided variables.

    :::important
    When running `terraform plan` and `terraform apply`, make sure you
    add `-var-file=FILE_NAME.vars` as an option.
    :::

1.  Find the role identifier (Role ARN) in the output script after
    running the template.

1.  Enter Role ARN into the **Role ARN** field in the **Create custom
    cloud** wizard.

1.  Select **Next** to proceed or park your cloud setup and save
    your current configuration as a draft by selecting **Save draft**.
    You can resume creating your cloud later.

#### Set up your custom cloud's availability

Select in what projects you'll be able to use your new custom cloud as a hosting cloud for
services. In the projects where you enable your custom cloud, you can create new
services in the custom cloud or migrate your existing services to the custom cloud if your
service and networking configuration allows it. For more information on migrating your
existing services to the custom cloud, contact your account team.

Your cloud can be available in:

- All the projects in your organization
- Selected organizational units
- Specific projects only

Continue working in the **Create custom cloud** wizard:

1.  In the **Custom cloud's availability in your organization**
    section, select either:

    -   **By default for all projects** to make your custom cloud
        available in all existing and future projects in the
        organization

    or

    -   **By selection** to pick specific projects or organizational
        units where you want your custom cloud to be available.

1.  If you go for the **By selection** option, menus **Assign organizational units** and
    **Assign projects** show up. Use them to
    select organizational units and/ or projects in which to use your custom
    cloud.

:::note
By selecting an organizational unit, you make your custom cloud
available from all the projects in this unit.
:::

#### Add customer contacts

Select at least one person whom Aiven can contact in case any technical
issues with your custom cloud need fixing.

:::note
**Admin** is a mandatory role, which is required as a primary support contact.
:::

1.  In the **Customer contacts** section, select a contact person's
    role using the **Job title** menu, and provide their email
    address in the **Email** field.
1.  Use **+ Add another contact** to add as many customer contacts as
    needed for your custom cloud.
1.  Select **Create**.

The custom cloud process has been initiated for you, which is
communicated in the the **Create custom cloud** wizard as **Creating
your custom cloud**.

#### Complete the cloud setup

Select **Close** to close the **Create custom cloud** wizard.

The deployment of your new custom cloud might take a few minutes. As
soon as it's over, and your custom cloud is ready to use, you'll be
able to see it on the list of your custom clouds in the **Bring your own
cloud** view.

:::note
Your new custom cloud is ready to use only after its status changes to
**Active**.
:::

#### Check your cloud's status

1.  Log in to [Aiven Console](https://console.aiven.io/) as an
    administrator, and go to a desired organization.
1.  From the top navigation bar, select **Admin**.
1.  From the left sidebar, select <ConsoleLabel name="bringyourowncloud"/>.
1.  In the **Bring your own cloud** view, identify your new cloud on the
    list of available clouds and check its status in the **Status**
    column.

When your custom cloud's status is **Active**, its deployment has been completed. Your
custom cloud is ready to use and you can see it on the list of your custom clouds in the
**Bring your own cloud** view. Now you can create new services in the custom cloud or
migrate your existing services to the custom cloud if your service and networking
configuration allows it. For more information on migrating your existing services to the
custom cloud, contact your account team.

## Manage services in custom clouds

### Create new services in the custom cloud

To create a service in [Aiven Console](https://console.aiven.io/) in your new custom
cloud, follow the guidelines in
[Create a service](/docs/platform/howto/create_new_service).

When creating a service in the [Aiven Console](https://console.aiven.io/), at the
**Select service region** step, select **Custom clouds** from the available regions.

### Migrate existing services to the custom cloud

Whether you can migrate existing services to the custom cloud depends on your service and
networking configuration. Contact your account team for more
information.

## Related pages

-   [About bring your own cloud (BYOC)](/docs/platform/concepts/byoc)
-   [Enable bring your own cloud (BYOC)](/docs/platform/howto/byoc/enable-byoc)
-   [Assign a project to your custom cloud](/docs/platform/howto/byoc/assign-project-custom-cloud)
-   [Add customer's contact information for your custom cloud](/docs/platform/howto/byoc/add-customer-info-custom-cloud)
-   [Rename your custom cloud](/docs/platform/howto/byoc/rename-custom-cloud)
