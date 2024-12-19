---
title: Create an AWS-integrated custom cloud
sidebar_label: Amazon Web Services
keywords: [AWS, Amazon Web Services, byoc, bring your own cloud, custom cloud]
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Create a [custom cloud](/docs/platform/concepts/byoc) for BYOC in your Aiven organization to better address your specific business needs or project requirements.

To configure a custom cloud in your Aiven organization and prepare your AWS
account so that Aiven can access it:

1. In the Aiven Console or with the Aiven CLI client, you specify new cloud details to
   generate a Terraform infrastructure-as-code template.
1. You download the generated template and deploy it in your AWS account to acquire IAM
   Role ARN (Amazon Resource Name).
1. You deploy your custom cloud resources supplying the acquired IAM Role ARN to the Aiven
   platform, which gives Aiven the permissions to securely access your AWS account, create
   resources, and manage them onward.
1. You select projects that can use your new custom clouds for creating services.
1. You add contact details for individuals from your organization that Aiven can reach out
   to in case of technical issues with the new cloud.

## Before you start

### Prerequisites

-   You have [enabled the BYOC feature](/docs/platform/howto/byoc/enable-byoc).
-   You have an active account with your cloud provider.
-   Depending on the tool to use for creating a custom cloud:
    - Console: Access to the [Aiven Console](https://console.aiven.io/) or
    - CLI:
      - [Aiven CLI client](/docs/tools/cli) installed
      - Aiven organization ID from the output of the `avn organization list` command or
        from the [Aiven Console](https://console.aiven.io/) > <ConsoleLabel name="userinformation"/>
        \> <ConsoleLabel name="organizations"/>.
-   You have the [organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
    role in your Aiven organization.
-   You have Terraform installed.
-   You have required
    [IAM permissions](/docs/platform/howto/byoc/create-cloud/create-aws-custom-cloud#iam-permissions).

### IAM permissions

You need cloud account credentials set up on your machine so that your user or role has
required Terraform permissions
[to integrate with your cloud provider](/docs/platform/howto/byoc/create-cloud/create-aws-custom-cloud#create-a-custom-cloud).

<details><summary>
Show permissions required for creating resources for bastion and workload networks
</summary>

```json
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

## Create a custom cloud

Create a custom cloud either in the Aiven Console or with the Aiven CLI.

<Tabs groupId="group1">
<TabItem value="1" label="Aiven Console" default>

#### Launch the BYOC setup

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to an organization.
1.  Click **Admin** in the top navigation, and click <ConsoleLabel name="bringyourowncloud"/>
    in the sidebar.
1.  In the **Bring your own cloud** view, select **Create custom cloud**.

#### Generate an infrastructure template

In this step, an IaC template is generated in the Terraform format. In
[the next step](/docs/platform/howto/byoc/create-cloud/create-aws-custom-cloud#deploy-the-template),
you'll deploy this template in your AWS account to acquire Role ARN
(Amazon Resource Name), which Aiven needs for accessing your AWS
account.

In the **Create custom cloud** wizard:

1.  Specify cloud details:

    -   Cloud provider
    -   Region
    -   Custom cloud name
    -   [Infrastructure tags](/docs/platform/howto/byoc/tag-custom-cloud-resources)

    Click **Next**.

1.  Specify deployment and storage details:

    -   [Deployment model](/docs/platform/concepts/byoc#byoc-architecture)

        Choose between:
        - Private model, which routes traffic through a proxy for additional security
          utilizing a bastion host logically separated from the Aiven services.
        - Public model, which allows the Aiven control plane to connect to the service
          nodes via the public internet.

    -   CIDR

        The **CIDR** block defines the IP address range of the VPC that
        Aiven creates in your own cloud account. Any Aiven service created in
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

    Click **Generate template**.

Your IaC Terraform template gets generated based on your inputs. You can
view, copy, or download it. Now, you can use the template to
[acquire Role ARN](/docs/platform/howto/byoc/create-cloud/create-aws-custom-cloud#deploy-the-template).

#### Deploy the template

Role ARN is an [identifier of the
role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html)
created when running the infrastructure template in your AWS account.
Aiven uses Role ARN to [assume the
role](https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html)
and run operations such as creating VMs for service nodes in your BYOC
account.

Use the
[generated Terraform template](/docs/platform/howto/byoc/create-cloud/create-aws-custom-cloud#generate-an-infrastructure-template)
to create your Role ARN by deploying the template in your AWS account.

Continue working in the **Create custom cloud** wizard:

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
    When running `terraform plan` and `terraform apply`, add `-var-file=FILE_NAME.tfvars`
    as an option.
    :::

1.  Find a role identifier (Role ARN) in the output script after
    running the template.

1.  Enter Role ARN into the **IAM role ARN** field in the **Create custom
    cloud** wizard.

1.  Click **Next** to proceed or park your cloud setup and save
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

To set up your cloud's availability in the **Create custom cloud** wizard >
the **Assign BYOC to projects** section, select one of the two following options:

-   **By default for all projects** to make your custom cloud
    available in all existing and future projects in the
    organization
-   **By selection** to pick specific projects or organizational
    units where you want your custom cloud to be available.

:::note
By selecting an organizational unit, you make your custom cloud
available from all the projects in this unit.
:::

#### Add customer contacts

Select at least one person whom Aiven can contact in case of any technical
issues with your custom cloud.

:::note
**Admin** is a mandatory role, which is required as a primary support contact.
:::

In the **Create custom cloud** wizard > the **Customer contacts** section:

1.  Select a contact person's role using the **Job title** menu, and provide their email
    address in the **Email** field.
1.  Use **+ Add another contact** to add as many customer contacts as
    needed for your custom cloud.
1.  Click **Save and validate**.

The custom cloud process has been initiated.

#### Complete the cloud setup

Select **Done** to close the **Create custom cloud** wizard.

The deployment of your new custom cloud might take a few minutes. As
soon as it's over, and your custom cloud is ready to use, you'll be
able to see it on the list of your custom clouds in the **Bring your own
cloud** view.

:::note
Your new custom cloud is ready to use only after its status changes to
**Active**.
:::

</TabItem>
<TabItem value="2" label="Aiven CLI">

1. Generate an infrastructure template by running
   [avn byoc create](/docs/tools/cli/byoc#avn-byoc-create).

    ```bash
    avn byoc create                               \
      --organization-id "ORGANIZATION_ID"         \
      --deployment-model "DEPLOYMENT_MODEL_NAME"  \
      --cloud-provider "aws"                      \
      --cloud-region "CLOUD_REGION_NAME"          \
      --reserved-cidr "CIDR_BLOCK"                \
      --display-name "CUSTOM_CLOUD_DISPLAY_NAME"
    ```

   Replace the following:

   - `ORGANIZATION_ID` with the ID of your Aiven organization to
     connect with your own cloud account to create the custom cloud,
     for example `org123a456b789`. Get your `ORGANIZATION_ID`
     [from the Aiven Console or CLI](/docs/platform/howto/byoc/create-cloud/create-aws-custom-cloud#prerequisites).
   - `DEPLOYMENT_MODEL_NAME` with the type of [network architecture](/docs/platform/concepts/byoc#byoc-architecture)
     your custom cloud uses:
     - `standard_public` (public) model: The nodes have public IPs and can be configured
       to be publicly accessible for authenticated users. The Aiven control plane can
       connect to the service nodes via the public internet.
     - `standard` (private) model: The nodes reside in a VPC without public IP addresses
       and are by default not accessible from outside. Traffic is routed through a proxy
       for additional security utilizing a bastion host logically separated from the
       Aiven services.
   - `CLOUD_REGION_NAME` with the name of an AWS cloud region where to create your custom cloud,
     for example `europe-north1`. See all available options in
     [AWS cloud regions](/docs/platform/reference/list_of_clouds#amazon-web-services).
   - `CIDR_BLOCK` with a CIDR block defining the IP address range of the VPC that Aiven
     creates in your own cloud account, for example: `10.0.0.0/16`, `172.31.0.0/16`, or
     `192.168.0.0/20`.
   - `CUSTOM_CLOUD_DISPLAY_NAME` with the name of your custom cloud, which you can set
     arbitrarily.

    <details><summary>
    Show sample output
    </summary>

    ```json
    {
        "custom_cloud_environment": {
            "cloud_provider": "aws",
            "cloud_region": "europe-north1",
            "contact_emails": [
                {
                    "email": "firstname.secondname@domain.com",
                    "real_name": "Test User",
                    "role": "Admin"
                }
            ],
            "custom_cloud_environment_id": "018b6442-c602-42bc-b63d-438026133f60",
            "deployment_model": "standard",
            "display_name": "My BYOC Cloud on AWS",
            "errors": [],
            "reserved_cidr": "10.0.0.0/16",
            "state": "draft",
            "tags": {},
            "update_time": "2024-05-07T14:24:18Z"
        }
    }
    ```

    </details>

1. Deploy the IaC template.

   1. Download the template and the variable file:

      - [avn byoc template terraform get-template](/docs/tools/cli/byoc#avn-byoc-template-terraform-get-template)

            ```bash
            avn byoc template terraform get-template             \
              --organization-id "ORGANIZATION_ID"                \
              --byoc-id "CUSTOM_CLOUD_ID" >| "tf_dir/tf_file.tf"
            ```

         Replace the following:

         - `ORGANIZATION_ID` with the ID of your Aiven organization to
           connect with your own cloud account to create the custom cloud,
           for example `org123a456b789`. Get your `ORGANIZATION_ID`
           [from the Aiven Console or CLI](/docs/platform/howto/byoc/create-cloud/create-aws-custom-cloud#prerequisites).
         - `CUSTOM_CLOUD_ID` with the identifier of your custom cloud, which you can
           extract from the output of the [avn byoc list](/docs/tools/cli/byoc#avn-byoc-list)
           command, for example `018b6442-c602-42bc-b63d-438026133f60`.

      - [avn byoc template terraform get-vars](/docs/tools/cli/byoc#avn-byoc-template-terraform-get-vars)

            ```bash
            avn byoc template terraform get-vars                   \
              --organization-id "ORGANIZATION_ID"                  \
              --byoc-id "CUSTOM_CLOUD_ID" >| "tf_dir/tf_file.tfvars"
            ```

         Replace the following:

         - `ORGANIZATION_ID` with the ID of your Aiven organization to
           connect with your own cloud account to create the custom cloud,
           for example `org123a456b789`. Get your `ORGANIZATION_ID`
           [from the Aiven Console or CLI](/docs/platform/howto/byoc/create-cloud/create-aws-custom-cloud#prerequisites).
         - `CUSTOM_CLOUD_ID` with the identifier of your custom cloud, which you can
           extract from the output of the [avn byoc list](/docs/tools/cli/byoc#avn-byoc-list)
           command, for example `018b6442-c602-42bc-b63d-438026133f60`.

   1. Optionally, modify the template as needed.

        :::note
        To connect to a custom-cloud service from different security groups
        (other than the one dedicated for the custom cloud) or from IP
        address ranges, add specific ingress rules before you apply a
        Terraform infrastructure template in your AWS cloud account in the process
        of creating a custom cloud resources.

        Before adding ingress rules, see the examples provided in the
        Terraform template you generated and downloaded from the [Aiven
        Console](https://console.aiven.io/).
        :::

   1. Use Terraform to deploy the infrastructure template with the provided variables in
      your AWS cloud account. This will generate a Role ARN.

       :::important
       When running `terraform plan` and `terraform apply`, add `-var-file=FILE_NAME.tfvars`
       as an option.
       :::

   1. Find `aws-iam-role-arn` in the output script after running the template.

1. Provision resources by running [avn byoc provision](/docs/tools/cli/byoc#avn-byoc-provision)
   and passing the generated `aws-iam-role-arn` as an option.

        ```bash
        avn byoc provision                        \
          --organization-id "ORGANIZATION_ID"     \
          --byoc-id "CUSTOM_CLOUD_ID"             \
          --aws-iam-role-arn "GENERATED_ROLE_ARN"
        ```

   Replace the following:

   - `ORGANIZATION_ID` with the ID of your Aiven organization to
     connect with your own cloud account to create the custom cloud,
     for example `org123a456b789`. Get your `ORGANIZATION_ID`
     [from the Aiven Console or CLI](/docs/platform/howto/byoc/create-cloud/create-aws-custom-cloud#prerequisites).
   - `CUSTOM_CLOUD_ID` with the identifier of your custom cloud, which you can
     extract from the output of the [avn byoc list](/docs/tools/cli/byoc#avn-byoc-list)
     command, for example `018b6442-c602-42bc-b63d-438026133f60`.
   - `GENERATED_ROLE_ARN` with the identifier of the role created when running the
     infrastructure template in your AWS cloud account.
     You can extract `GENERATED_ROLE_ARN` from the output of the `terraform apply`
     command or `terraform output` command.

1. Enable your custom cloud in organizations, projects, or units by running
   [avn byoc cloud permissions add](/docs/tools/cli/byoc#avn-byoc-cloud-permissions-add).

        ```bash
        avn byoc cloud permissions add        \
          --organization-id "ORGANIZATION_ID" \
          --byoc-id "CUSTOM_CLOUD_ID"         \
          --account "ACCOUNT_ID"
        ```

   Replace the following:

   - `ORGANIZATION_ID` with the ID of your Aiven organization to
     connect with your own cloud account to create the custom cloud,
     for example `org123a456b789`. Get your `ORGANIZATION_ID`
     [from the Aiven Console or CLI](/docs/platform/howto/byoc/create-cloud/create-aws-custom-cloud#prerequisites).
   - `CUSTOM_CLOUD_ID` with the identifier of your custom cloud, which you can
     extract from the output of the [avn byoc list](/docs/tools/cli/byoc#avn-byoc-list)
     command, for example `018b6442-c602-42bc-b63d-438026133f60`.
   - `ACCOUNT_ID` with the identifier of your account (organizational unit) in Aiven,
     for example `a484338c34d7`. You can extract `ACCOUNT_ID` from the output of
     the `avn organization list` command.

1. Add customer contacts for the new cloud by running
   [avn byoc update](/docs/tools/cli/byoc#avn-byoc-update).

        ```bash
        avn byoc update                     \
        --organization-id "ORGANIZATION_ID" \
        --byoc-id "CUSTOM_CLOUD_ID"         \
        '
            {
            "contact_emails": [
                {
                "email": "EMAIL_ADDRESS",
                "real_name": "John Doe",
                "role": "Admin"
                }
            ]
            }
        '
        ```

    Replace the following:

    - `ORGANIZATION_ID` with the ID of your Aiven organization to
      connect with your own cloud account to create the custom cloud,
      for example `org123a456b789`. Get your `ORGANIZATION_ID`
      [from the Aiven Console or CLI](/docs/platform/howto/byoc/create-cloud/create-aws-custom-cloud#prerequisites).
    - `CUSTOM_CLOUD_ID` with the identifier of your custom cloud, which you can
      extract from the output of the [avn byoc list](/docs/tools/cli/byoc#avn-byoc-list)
      command, for example `018b6442-c602-42bc-b63d-438026133f60`.

</TabItem>
</Tabs>

## Related pages

-   [Bring your own cloud networking and security](/docs/platform/howto/byoc/networking-security)
-   [View the status of a custom cloud](/docs/platform/howto/byoc/view-custom-cloud-status)
-   [Manage services hosted in custom clouds](/docs/platform/howto/byoc/manage-byoc-service)
