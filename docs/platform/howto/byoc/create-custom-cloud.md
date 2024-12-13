---
title: Create a custom cloud
sidebar_label: Create custom clouds
keywords: [AWS, Amazon Web Services, GCP, Google Cloud Platform, byoc, bring your own cloud, custom cloud]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Create a [custom cloud](/docs/platform/concepts/byoc) for BYOC in your Aiven organization to better address your specific business needs or project requirements.

:::note

-   Creating and using custom clouds in your Aiven organization requires
    enabling
    [the _bring your own cloud (BYOC)_ feature](/docs/platform/concepts/byoc). Check
    [who is eligible for BYOC](/docs/platform/concepts/byoc#eligible-for-byoc). To
    use the feature,
    [enable BYOC in your Aiven organization](/docs/platform/howto/byoc/enable-byoc).
-   Enabling
    [the BYOC feature](/docs/platform/concepts/byoc) or creating custom clouds in your
    Aiven environment does not affect the configuration of your existing organizations,
    projects, or services. This only makes the new BYOC capabilities available in your
    environment.

:::

The process of creating a custom cloud in Aiven differs depending on the
cloud provider to integrate with:

<Tabs groupId="group1">
<TabItem value="1" label="AWS" default>
You configure your custom cloud setup in the [Aiven
Console](https://console.aiven.io/) and prepare your own AWS account so
that Aiven can access it. In the [Aiven Console](https://console.aiven.io/),
you follow the **Create custom cloud** workflow to generate a Terraform
infrastructure-as-code (IaC) template. Next, you deploy this template in
your AWS account to acquire IAM Role ARN (Amazon Resource Name). You
supply your IAM Role ARN into the **Create custom cloud** wizard, which
gives Aiven the permissions to securely access your AWS account, create
resources, and manage them onward. Finally, you select projects that can
use your new custom clouds for creating services, and you add customer
contacts for your custom cloud.
</TabItem>
<TabItem value="2" label="GCP">
You create and configure a custom cloud via CLI, and you prepare your remote GCP account so
that Aiven can access it. Using the Aiven CLI, you generate an infrastructure-as-code
(IaC) template in the Terraform format. You download the template and deploy it in your
remote GCP cloud account to generate a privilege-bearing service account (SA), which Aiven
needs for accessing your GCP account only with permissions that are required.

:::note
Privilege-bearing service account (SA) is an
[identifier](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/google_service_account)
of the [service account](https://cloud.google.com/iam/docs/service-account-types#user-managed)
created when running the IaC template in your Google account. Aiven [impersonates this
service account](https://cloud.google.com/iam/docs/create-short-lived-credentials-direct)
and runs operations, such as creating VMs for service nodes, in your BYOC account.
:::

Next, you deploy your custom cloud resources supplying the generated privilege-bearing SA
as a parameter. Finally, you select in which Aiven projects to use your custom cloud, and
you assign a contact person for your custom cloud.
</TabItem>
</Tabs>

## Limitations {#byoc-limitations}

-   You need at least the Advanced tier of Aiven support services to be
    eligible for activating BYOC.

    :::note
    See [Aiven support tiers](https://aiven.io/support-services) and
    [Aiven responsibility matrix](https://aiven.io/responsibility-matrix) for BYOC.
    Contact your account team to learn more or upgrade your support tier.
    :::

-   Only [organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
    can create custom clouds.

## Prerequisites {#byoc-prerequisites}

<Tabs groupId="group1">
<TabItem value="1" label="AWS" default>
-   You have [enabled the BYOC feature](/docs/platform/howto/byoc/enable-byoc).
-   You have an active account with your cloud provider.
-   Depending on the dev tool to use for creating a custom cloud, you have:
    - Access to the [Aiven Console](https://console.aiven.io/) or
    - [Aiven CLI](/docs/tools/cli) installed
-   You have the [organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
    role in your Aiven organization.
-   You have Terraform installed.
-   You have required [IAM permissions](#iam-permissions)
</TabItem>
<TabItem value="2" label="GCP">
-   You have [enabled the BYOC feature](/docs/platform/howto/byoc/enable-byoc).
-   You have an active account with your cloud provider.
-   You have the [Aiven CLI client](/docs/tools/cli) installed.
-   You have the [organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
    role in your Aiven organization.
-   You have [Terraform](/docs/tools/terraform) installed.
-   You have required [IAM permissions](#iam-permissions).
-   You have your Aiven organization ID from:

    - Output of the `avn organization list` command
    - [Aiven Console](https://console.aiven.io/) > <ConsoleLabel name="userinformation"/>
      \> <ConsoleLabel name="organizations"/>.

</TabItem>
</Tabs>

### IAM permissions

You need cloud account credentials set up on your machine so that your user or role has
required Terraform permissions
[to integrate with your cloud provider](/docs/platform/howto/byoc/create-custom-cloud#create-cloud).

<Tabs groupId="group1">
<TabItem value="1" label="AWS permissions" default>
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
</TabItem>
<TabItem value="2" label="GCP permissions">
<details><summary>
Show permissions needed by your service account that will run the Terraform script in your
Google project
</summary>
- `roles/iam.serviceAccountAdmin` (sets up impersonation to the privilege-bearing service account)
- `roles/resourcemanager.projectIamAdmin` (provides permissions to the privilege-bearing
  service account to use your project)
- `roles/compute.instanceAdmin.v1` (manages networks and instances)
- `roles/compute.securityAdmin` (creates firewall rules)
- Enable [Identity and Access Management (IAM) API](https://cloud.google.com/iam/docs/reference/rest)
  to create the privilege-bearing service account
- Enable
  [Cloud Resource Manager (CRM) API](https://cloud.google.com/resource-manager/reference/rest)
  to set IAM policies to the privilege-bearing service account
- Enable
  [Compute Engine API](https://console.cloud.google.com/marketplace/product/google/compute.googleapis.com).
</details>
For more information on Google Cloud roles, see
[IAM basic and predefined roles reference](https://cloud.google.com/iam/docs/understanding-roles)
in the Goodle Cloud documentation.
</TabItem>
</Tabs>

## Create a custom cloud {#create-cloud}

How you create a custom cloud in Aiven depends on what cloud provider you use.

<Tabs groupId="group1">
<TabItem value="1" label="AWS" default>

#### Launch the BYOC setup

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to a organization.
1.  Click **Admin** in the top navigation, and click <ConsoleLabel name="bringyourowncloud"/>
    in the sidebar.
1.  In the **Bring your own cloud** view, select **Create custom cloud**.

#### Generate an infrastructure template {#generate-infra-template}

In this step, an IaC template is generated in the Terraform format. In
[the next step](/docs/platform/howto/byoc/create-custom-cloud#deploy-template),
you'll deploy this template in your AWS account to acquire Role ARN
(Amazon Resource Name), which Aiven needs for accessing your AWS
account.

In the **Create custom cloud** wizard:

1.  Specify the following:

    -   Custom cloud name

    -   Cloud provider

    -   Region

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

    -   Deployment model: Choose between
        [the private architecture and the public architecture](/docs/platform/concepts/byoc).

        - Private model routes traffic through a proxy for additional security utilizing
          a bastion host physically separated from the Aiven services.
        - Public model allows the Aiven control plane to connect to the service nodes
          via the public internet.

    -   Infrastructure tags: Select key-value pairs to
        [tag your custom cloud resources](/docs/platform/howto/byoc/tag-custom-cloud-resources).

1.  Select **Next**.

Your IaC Terraform template gets generated based on your inputs. You can
view, copy, or download it. Now, you can use the template to
[acquire Role ARN](/docs/platform/howto/byoc/create-custom-cloud#deploy-template).

#### Deploy the template{#deploy-template}

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
    When running `terraform plan` and `terraform apply`, add `-var-file=FILE_NAME.vars`
    as an option.
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
    select organizational units and/or projects in which to use your custom
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
</TabItem>

<TabItem value="2" label="GCP">
1. Generate an IaC template by running [avn byoc create](/docs/tools/cli/byoc#avn-byoc-create).

    ```bash
    avn byoc create                               \
      --organization-id "ORGANIZATION_ID" \
      --deployment-model "DEPLOYMENT_MODEL_NAME"  \
      --cloud-provider "google"                   \
      --cloud-region "CLOUD_REGION_NAME"          \
      --reserved-cidr "CIDR_BLOCK"                \
      --display-name "CUSTOM_CLOUD_DISPLAY_NAME"
    ```

   Replace the following:

   - `ORGANIZATION_ID` with the ID of your Aiven organization to
     connect with your own cloud account to create the custom cloud,
     for example `org123a456b789`. Get your `ORGANIZATION_ID`
     [from the Aiven Console or CLI](#byoc-prerequisites).
   - `DEPLOYMENT_MODEL_NAME` with the type of [network architecture](/docs/platform/concepts/byoc#byoc-deployment)
     your custom cloud uses:
     - `standard_public` (public) model: The nodes have public IPs and can be configured
       to be publicly accessible for authenticated users. The Aiven control plane can
       connect to the service nodes via the public internet.
     - `standard` (private) model: The nodes reside in a VPC without public IP addresses
       and are by default not accessible from outside. Traffic is routed through a proxy
       for additional security utilizing a bastion host physically separated from the
       Aiven services.
   - `CLOUD_REGION_NAME` with the name of a Google region where to create your custom cloud,
     for example `europe-north1`. See all available options in
     [Google Cloud regions](/docs/platform/reference/list_of_clouds#google-cloud).
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
            "cloud_provider": "google",
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
            "display_name": "My BYOC Cloud on Google",
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
            avn byoc template terraform get-template        \
              --organization-id "ORGANIZATION_ID"   \
              --byoc-id "CUSTOM_CLOUD_ID" >| "tf_dir/tf_file.tf"
            ```

         Replace the following:

         - `ORGANIZATION_ID` with the ID of your Aiven organization to
           connect with your own cloud account to create the custom cloud,
           for example `org123a456b789`. Get your `ORGANIZATION_ID`
           [from the Aiven Console or CLI](#byoc-prerequisites).
         - `CUSTOM_CLOUD_ID` with the identifier of your custom cloud, which you can
           extract from the output of the [avn byoc list](/docs/tools/cli/byoc#avn-byoc-list)
           command, for example `018b6442-c602-42bc-b63d-438026133f60`.

      - [avn byoc template terraform get-vars](/docs/tools/cli/byoc#avn-byoc-template-terraform-get-vars)

            ```bash
            avn byoc template terraform get-vars              \
              --organization-id "ORGANIZATION_ID"     \
              --byoc-id "CUSTOM_CLOUD_ID" >| "tf_dir/tf_file.vars"
            ```

         Replace the following:

         - `ORGANIZATION_ID` with the ID of your Aiven organization to
           connect with your own cloud account to create the custom cloud,
           for example `org123a456b789`. Get your `ORGANIZATION_ID`
           [from the Aiven Console or CLI](#byoc-prerequisites).
         - `CUSTOM_CLOUD_ID` with the identifier of your custom cloud, which you can
           extract from the output of the [avn byoc list](/docs/tools/cli/byoc#avn-byoc-list)
           command, for example `018b6442-c602-42bc-b63d-438026133f60`.

   1. Optionally, modify the template as needed.

        :::note
        To connect to a custom-cloud service from different security groups
        (other than the one dedicated for the custom cloud) or from IP
        address ranges, add specific ingress rules before you apply a
        Terraform infrastructure template in your GCP account in the process
        of creating a custom cloud resources.

        Before adding ingress rules, see the examples provided in the
        Terraform template you generated and downloaded from the [Aiven
        Console](https://console.aiven.io/).
        :::

   1. Use Terraform to deploy the infrastructure template with the provided variables in
      your GCP account. This will generate a privilege-bearing service account (SA).

       :::important
       When running `terraform plan` and `terraform apply`, add `-var-file=FILE_NAME.vars`
       as an option.
       :::

   1. Find `privilege_bearing_service_account_id` in the output script after running
      the template.

1. Provision resources by running [avn byoc provision](/docs/tools/cli/byoc#avn-byoc-provision)
   and passing the generated `google-privilege-bearing-service-account-id` as an option.

        ```bash
        avn byoc provision                            \
          --organization-id "ORGANIZATION_ID" \
          --byoc-id "CUSTOM_CLOUD_ID"         \
          --google-privilege-bearing-service-account-id "GENERATED_SERVICE_ACCOUNT_ID"
        ```

   Replace the following:

   - `ORGANIZATION_ID` with the ID of your Aiven organization to
     connect with your own cloud account to create the custom cloud,
     for example `org123a456b789`. Get your `ORGANIZATION_ID`
     [from the Aiven Console or CLI](#byoc-prerequisites).
   - `CUSTOM_CLOUD_ID` with the identifier of your custom cloud, which you can
     extract from the output of the [avn byoc list](/docs/tools/cli/byoc#avn-byoc-list)
     command, for example `018b6442-c602-42bc-b63d-438026133f60`.
   - `GENERATED_SERVICE_ACCOUNT_ID` with the identifier of the service account
     created when running the infrastructure template in your Google Cloud account,
     for example
     `projects/your-project/serviceAccounts/cce-cce0123456789a@your-project.iam.gserviceaccount.com`.
     You can extract `GENERATED_SERVICE_ACCOUNT_ID` from the output of the `terraform apply`
     command or `terraform output` command.

1. Enable your custom cloud in organizations, projects, or units by running
   [avn byoc cloud permissions add](/docs/tools/cli/byoc#avn-byoc-cloud-permissions-add).

        ```bash
        avn byoc cloud permissions add              \
          --organization-id "ORGANIZATION_ID" \
          --byoc-id "CUSTOM_CLOUD_ID"         \
          --account "ACCOUNT_ID"
        ```

   Replace the following:

   - `ORGANIZATION_ID` with the ID of your Aiven organization to
     connect with your own cloud account to create the custom cloud,
     for example `org123a456b789`. Get your `ORGANIZATION_ID`
     [from the Aiven Console or CLI](#byoc-prerequisites).
   - `CUSTOM_CLOUD_ID` with the identifier of your custom cloud, which you can
     extract from the output of the [avn byoc list](/docs/tools/cli/byoc#avn-byoc-list)
     command, for example `018b6442-c602-42bc-b63d-438026133f60`.
   - `ACCOUNT_ID` with the identifier of your account (organizational unit) in Aiven,
     for example `a484338c34d7`. You can extract `ACCOUNT_ID` from the output of
     the `avn organization list` command.

1. Add customer contacts for the new cloud by running
   [avn byoc update](/docs/tools/cli/byoc#avn-byoc-update).

        ```bash
        avn byoc update                               \
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
      [from the Aiven Console or CLI](#byoc-prerequisites).
    - `CUSTOM_CLOUD_ID` with the identifier of your custom cloud, which you can
      extract from the output of the [avn byoc list](/docs/tools/cli/byoc#avn-byoc-list)
      command, for example `018b6442-c602-42bc-b63d-438026133f60`.

</TabItem>
</Tabs>

## Check your cloud's status

1.  Log in to [Aiven Console](https://console.aiven.io/) as an
    administrator, and go to an organization.
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

### Create a service in the custom cloud

<Tabs groupId="group1">
<TabItem value="1" label="Aiven Console" default>
To create a service in the [Aiven Console](https://console.aiven.io/) in your new
custom cloud, follow the guidelines in
[Create a service](/docs/platform/howto/create_new_service).

When creating a service in the [Aiven Console](https://console.aiven.io/), at the
**Select service region** step, select **Custom clouds** from the available regions.
</TabItem>
<TabItem value="2" label="Aiven CLI">
To create a service hosted in your new custom cloud, run
[avn service create](/docs/tools/cli/service-cli#avn-cli-service-create) passing your new
custom cloud name as an option:

    ```bash
    avn service create                    \
    --project "PROJECT_NAME"              \
    --service-type "TYPE_OF_BYOC_SERVICE" \
    --plan "PLAN_OF_BYOC_SERVICE"         \
    --cloud "CUSTOM_CLOUD_NAME"           \
    "NEW_BYOC_SERVICE_NAME"
    ```

</TabItem>
</Tabs>

### Migrate existing services to the custom cloud

Whether you can migrate existing services to the custom cloud depends on your service and
networking configuration. Contact your account team for more information.

## Related pages

-   [About bring your own cloud (BYOC)](/docs/platform/concepts/byoc)
-   [Enable bring your own cloud (BYOC)](/docs/platform/howto/byoc/enable-byoc)
-   [Assign a project to your custom cloud](/docs/platform/howto/byoc/assign-project-custom-cloud)
-   [Add customer's contact information for your custom cloud](/docs/platform/howto/byoc/add-customer-info-custom-cloud)
-   [Tag custom cloud resources](/docs/platform/howto/byoc/tag-custom-cloud-resources)
-   [Rename your custom cloud](/docs/platform/howto/byoc/rename-custom-cloud)
