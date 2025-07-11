---
title: Security checklist
---

The Aiven Platform offers security features to help you protect your data and resources. Security needs vary based on organization, but the following are best practices you can use to make the best use of these features and increase your security posture.

- [Verify a domain](#verify-a-domain)
- [Add an identity provider](#add-an-identity-provider)
- [Configure your authentication policy](#configure-your-authentication-policy)
  - [Password requirements](#password-requirements)
  - [Create secure password](#create-secure-password)
- [Use units and projects to separate concerns](#use-units-and-projects-to-separate-concerns)
- [Grant least-privilege access to users](#grant-least-privilege-access-to-users)
  - [Limit the number of admin](#limit-the-number-of-admin)
  - [Use groups](#use-groups)
  - [Examples](#examples)
- [Create application users for automated access](#create-application-users-for-automated-access)
  - [Create dedicated application users for each application](#create-dedicated-application-users-for-each-application)
  - [Restrict access to trusted networks](#restrict-access-to-trusted-networks)
  - [Keep tokens secure and rotate them regularly](#keep-tokens-secure-and-rotate-them-regularly)
  - [Delete unused users and tokens](#delete-unused-users-and-tokens)
- [Create virtual private clouds](#create-virtual-private-clouds)
- [Employ a multi-cloud, geographically distributed strategy](#employ-a-multi-cloud-geographically-distributed-strategy)
- [Keep services up-to-date](#keep-services-up-to-date)
- [Use enhanced compliance environments](#use-enhanced-compliance-environments)

## Verify a domain

To make your organization users managed users and to set up single sign-on through
an identity provider, verify your organization's domain. Even if you
don't use an identity provider for logins, verifying your domain helps to
secure you organization on the Aiven Platform.

- [Verify your domain](/docs/platform/howto/manage-domains)
- [Learn about managed users](/docs/platform/concepts/managed-users)

## Add an identity provider

Use SAML federation for regular access to the Aiven Platform through an
identity provider (IdP). IdPs let you centralize identity management for multiple
platforms, give your organization users access through single sign-on (SSO), and
help to reduce the risk of credential exposure. This can reduce administrative
overhead and improve the user experience. Many IdPs also have additional
security features like multi-factor authentication and auditing.

All users with an email address from a verified domain
linked to your IdP can sign up and log in to the Aiven Platform without the need
for your admin to create individual user accounts. Use the strongest
cryptographic signature method supported by the provider.

When configuring an IdP it's best to enable the following SAML security settings:

- **Require assertion to be signed**: Verifies assertions were issued by a trusted party
  and have not been tampered with.
- **Sign authorization request sent to IdP**: Ensures authenticity and integrity with a
  digital signature.

The [authentication policy](#configure-your-authentication-policy) for the
organization is also an important component in securing access through an IdP.

- [Add an identity provider](/docs/platform/howto/saml/add-identity-providers)

## Configure your authentication policy

Set a policy that allows your organization users to access your organization on
the Aiven Platform only through approved methods.

For a greater level of security, only allow users to log in with your identity provider
and select the **require log in with an identity provider** option. If you do allow
password authentication, enforce two-factor authentication for all users.

Don't allow users to create personal tokens. If you decide to allow your users to
create personal tokens, you can still make these more secure by enabling the
**require log in with this organization's identity provider** setting.
This means that users cannot access your organization's resources with a token they
created when logged in with another organization's allowed authentication methods
or a previously allowed method. This setting also gives you the flexibility to change
the authentication policy at any time because tokens that are no longer compliant
with the new policy cannot be used.

A more secure way to centrally manage access through tokens is to create
[application users and application tokens](#create-application-users-for-automated-access).

- [Set an organization authentication policy](/docs/platform/howto/set-authentication-policies)

### Password requirements

Aiven enforces the following rules for password strength:

-   Minimum length is 8 characters
-   Cannot contain single repeating characters such as `aaaaaaaa`
-   Cannot contain your name or email address
-   Cannot contain common words, phrases, or strings such as password,
    security, or common names
-   Cannot contain words that are very similar to common words such as
    `password1`

These rules are also used for service integration passwords. For remote
external integrations these rules are not enforced, but they are recommended.

### Create secure password

If you use password authentication, follow these guidelines to create secure passwords:

- Use a password manager to create a randomly generated strong passwords
- Use passphrases as these are harder to guess
- Always use a unique password for every service and app

## Use units and projects to separate concerns

Avoid creating projects directly in the organization. Instead, create organizational
units to separate your projects, and use projects to further divide your services.
To support the principle of least privilege and to enable appropriate configuration
baselines, create unrelated services in different projects.
For example, put an OLTP database for order tracking and a time-series database
for website analytics in separate projects.

- [Learn about units and projects](/docs/platform/concepts/orgs-units-projects)

## Grant least-privilege access to users

Use granular permissions and roles to grant the lowest level of access needed to
users and groups at the appropriate level.
[Roles and permissions](/docs/platform/concepts/permissions) are available
at the organization, unit, and project level. This is where
[using projects and units to separate services](#use-units-and-projects-to-separate-concerns)
makes it easier to manage access.

At the service level, don't use the `avnadmin` service user for normal operations.
This user is intended for provisioning and recovery. Instead, create lower-privileged
service users within the service that have only the necessary permissions.
Additionally, users who only need to access services may not need to have
Aiven user accounts. For example ,a database administrator (DBA) who is configuring
a PostgreSQL service for an application might not need access to the Aiven Console.
You can create service users for these types of users and give them the connection string
and credentials for only that specific service.

### Limit the number of admin

Limit the number of organization admin and project admin. Grant the organization admin
to a limited number of users in the organization. Instead, assign specific permissions
at the organization level such as the **manage groups** or **manage projects** permissions.

Most importantly, minimize the number of
[super admin](/docs/platform/howto/manage-permissions#make-users-super-admin)
in your organization. Reserve super admin for emergency access when no other users have
enough permissions. Don't use super admin for normal operational tasks.
For user accounts with super admin access follow these best practices to secure them:

- **Store passwords offline**: Store printed passwords in a secure location that requires
   two-party control for access.
- **Enable two-factor authentication** and store the credentials offline.
- **Re-generate credentials after use**: If a super admin account is used, change its
   password.
- **Restrict access to the email associated with a super admin user**: A user with
  access to this email address can reset its password.
- **Use different emails for notifications**: Configure an email address not associated
  with a super admin account for billing, project, service, and other system notifications.

### Use groups

Use groups to streamline and increase the visibility of the process of granting access
to users. If you choose to automatically add users to a group when they sign up,
make sure the group has minimal permissions. Only grant users permissions to projects
that have a business need to access them.

### Examples
The following are examples of typical user types along with the roles and permissions they
need.

**Finance team members**

Users on this team often only need to view and download invoices. Grant these users
the **view billing** permission. If they need to edit billing details, grant them
the **manage billing** permission.

**Auditors**

Grant these users the **read only** role in the projects relevant for their work.

**Database administrators**

For users like database administrators, who use the Aiven Console or API to
configure services, but don't need to create them or power them off, grant them
the **developer** role in the relevant projects.

**DevOps**

For users who maintain services to keep them updated and set the maintenance window to
avoid downtime, grant the **maintain services** permission. If they also need to be
able to help restore a service after an incident, grant them the **recover services**
permission.

- [Roles and permissions](/docs/platform/concepts/permissions)
- [Manage permissions for users and groups](/docs/platform/howto/manage-permissions)

## Create application users for automated access

Because application users can have the same level of access to projects and services it's
important to secure these accounts and their tokens to avoid abuse.

### Create dedicated application users for each application

Create a different application user for each tool or application and generate
application tokens for each. For example, if you have an application that needs to
connect to services in one of your projects and you're using Aiven Terraform Provider
 in the same project, create two application users. Use the description field for
 each user to clearly indicate what it's used for.

This helps you manage the lifecycle of the users and ensure the access permissions are
correct for each use case.

### Restrict access to trusted networks

Specify allowed IP address ranges for each token. This prevents tokens from being used
outside of your trusted networks, reducing the risk of breaches. You can also specify
these ranges in your organization's
[authentication policy](#configure-your-authentication-policy), limiting
all access to the Aiven Platform to these IP addresses, including
through application tokens.

### Keep tokens secure and rotate them regularly

Make sure application tokens are securely stored and only accessible by people
who need them. Tokens should also be routinely
[revoked](/docs/platform/howto/manage-application-users#revoke-a-token-for-an-application-user)
and replaced with new tokens.

### Delete unused users and tokens

Regularly audit your list of application users to identify unused users. You can
view all application users, get details about when their tokens were last used,
and delete unused users in the Aiven Console and API.

- [Manage application users and tokens](/docs/platform/howto/manage-application-users)

## Create virtual private clouds

Many security compliance standards such as PCI DSS require that databases
not be reachable over the internet. Place services that don't need to be accessible
from the internet within a Virtual private cloud (VPC) in a supported cloud.
Peer the VPC with your cloud account at the relevant provider.
Route non-cloud resources through the provider.

Alternatively, you can create custom clouds using Aiven's bring your own cloud (BYOC)
feature to configure your infrastructure to meet your specific business requirements.

- Get detailed information about
  [cloud security at Aiven](/docs/platform/concepts/cloud-security)
- [Learn more about VPCs](/docs/platform/concepts/vpcs)
- [Learn about BYOC](/docs/platform/concepts/byoc)

## Employ a multi-cloud, geographically distributed strategy

For mission-critical services, deploy read-only replicas or standbys in different cloud
providers and regions. For example, for a primary service hosted on AWS in the
`us-west-2` region, create a standby on Azure in `eastus2`.

## Keep services up-to-date

When a new major version of a service becomes available, upgrade to it as soon as possible.
Don't continue to use end-of-life versions or discontinued services.

Don't avoid or delay maintenance and updates. Set maintenance windows during periods of
low activity or low business criticality. Stagger the maintenance windows for
redundant services.

- [Learn about maintenance, updates, and upgrades](/docs/platform/concepts/maintenance-window)

## Use enhanced compliance environments

If your environment is subject to a security compliance standards like PCI DSS or HIPAA,
Aiven can help you set up projects as enhanced compliance environments (ECE) so that
they meet these standards.

- [Learn about ECEs](/docs/platform/concepts/enhanced-compliance-env)
