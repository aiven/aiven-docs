---
title: Get started with Aiven
sidebar_label: Get started
---

import Button from "@site/src/components/Buttons";
import {ButtonSecondary} from "@site/src/components/Buttons";
import Card from "@site/src/components/AivenCard";
import Overview from "@site/static/images/content/platform/platform-overview.webp";
import GridContainer from "@site/src/components/GridContainer";
import Cassandra from "@site/static/images/logos/cassandra.svg";
import ClickHouse from "@site/static/images/logos/clickhouse.svg";
import Dragonfly from "@site/static/images/logos/dragonfly.svg";
import Opensearch from "@site/static/images/logos/opensearch.svg";
import Flink from "@site/static/images/logos/flink.svg";
import Grafana from "@site/static/images/logos/grafana.svg";
import Kafka from "@site/static/images/logos/kafka.svg";
import MySQL from "@site/static/images/logos/mysql.svg";
import PG from "@site/static/images/logos/pg.svg";
import Valkey from "@site/static/images/logos/valkey.svg";
import K8sIcon from "@site/static/images/logos/kubernetes.svg";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!-- vale off -->

Aiven provides managed open source services for streaming, storing and analyzing data on all major clouds.
All services run reliably and securely in the clouds of your choice, are observable, and can easily be integrated with each other and with external 3rd party tools.

<img src={Overview} className="centered" alt="" width="62%" />

## Discover the Aiven platform

**Try it for free.** Aiven offers [free plans](/docs/platform/concepts/free-plan) and
[30-day trials](/docs/platform/concepts/free-trial) for you to explore the platform and services.

<GridContainer columns="3">
  <Button to="https://console.aiven.io/signup">Sign up for free</Button>
  <ButtonSecondary to="https://aiven.io/changelog">See product updates</ButtonSecondary>
</GridContainer>

### Subscribe through a marketplace

[Subscribe](/docs/marketplace-setup) and use Aiven services on AWS, Azure, or
Google Cloud Marketplace.


## First steps

1. [Set up billing](#step-1-set-up-billing) for your organization.
2.  Organize your resources by [setting up your organization](#step-2-set-up-your-organization),
   including its units and projects.
3. Start collaborating by [adding users to your organization](#step-3-manage-organization-users)
   and creating user groups.
4. Follow best practices to [secure your organization](#step-4-secure-your-organization).
5. Start [creating services](#step-5-create-your-first-service).

### Step 1: Set up billing

<GridContainer columns={3}>
    <Card
      to="/docs/platform/concepts/billing-and-payment"
      iconName="book"
      title="Billing overview"
      description="Learn how billing and payments work."
    />
    <Card
      to="/docs/platform/howto/manage-payment-card"
      iconName="clipboardCheck"
      title="Create a payment method"
      description="Add a credit card to pay for your Aiven services."
    />
    <Card
      to="/docs/platform/howto/use-billing-groups"
      iconName="clipboardCheck"
      title="Configure your billing group"
      description="Add your payment method and other details to the default
      billing group."
    />
</GridContainer>

### Step 2: Set up your organization

<GridContainer columns={3}>
     <Card
      to="/docs/platform/concepts/orgs-units-projects"
      iconName="book"
      title="Organizations overview"
      description="Learn about organizing your resources with organizations, units,
      and projects."
    />
    <Card
      to="/docs/tools/aiven-console/howto/create-orgs-and-units"
      iconName="clipboard"
      title="Create organizational units"
      description="Use units to group your Aiven projects."
    />
    <Card
      to="/docs/platform/howto/manage-project"
      iconName="clipboardCheck"
      title="Create projects"
      description="Create projects in your organization or units
      to hold your Aiven services."
    />
</GridContainer>

<GridContainer>
  <Card
    to="https://github.com/aiven/terraform-provider-aiven/blob/main/examples/organization/README.md"
    iconName="terraform"
    title="Organization setup with Terraform"
    description="Follow an example to set up units and projects
    within your organization using the Aiven Provider for Terraform."
  />
</GridContainer>

### Step 3: Manage organization users

Start collaborating by adding users to your organization, creating  groups, and
assigning them to projects. You can add users manually to your organization or
create managed users through your identity provider (IdP).

#### Add users to your organization

<Tabs groupId="manual">
<TabItem value="1" label="Add users manually" default>

<GridContainer columns={3}>
    <Card
      to="/docs/platform/howto/manage-org-users"
      iconName="clipboardCheck"
      title="Invite users to your organization"
      description="Email your team invites to join your organization on Aiven."
    />
</GridContainer>
</TabItem>

<TabItem value="2" label="Create managed users" default>

Make your organization users managed users by verifiying a domain and configuring an
identity provider.

Aiven also supports automatic
[user provisioning with Okta](/docs/platform/howto/okta-user-provisioning-with-scim)
through System for Cross-domain Identity Management (SCIM).

<GridContainer columns={3}>
      <Card
      to="/docs/platform/concepts/managed-users"
      iconName="book"
      title="Managed users"
      description="Understand the benefits of managed users."
    />
    <Card
      to="/docs/platform/howto/manage-domains"
      iconName="clipboardCheck"
      title="Add a domain"
      description="Add a verified domain to your organizatoin
      using a DNS TXT record or HTML file."
    />
    <Card
      to="/docs/platform/howto/saml/add-identity-providers"
      iconName="clipboardCheck"
      title="Add an identity provider"
      description="Let your users access Aiven through your preferred IdP."
    />
</GridContainer>
</TabItem>
</Tabs>

#### Set up user groups

Add users to groups to streamline access management to your Aiven projects and services.

<GridContainer columns={3}>
    <Card
      to="/docs/platform/howto/manage-groups"
      iconName="clipboardCheck"
      title="Create groups"
      description="Create and add users to groups."
    />
    <Card
      to="/docs/platform/reference/project-member-privileges"
      iconName="book"
      title="Project member roles"
      description="View the roles and their level of access
      to a project and its services."
    />
    <Card
      to="/docs/platform/howto/add-groups-projects"
      iconName="clipboardCheck"
      title="Add groups to projects"
      description="Give a group of users access to a project."
    />
</GridContainer>

<GridContainer>
  <Card
    to="https://github.com/aiven/terraform-provider-aiven/tree/main/examples/get-started"
    iconName="terraform"
    title="Create and assign groups with Terraform"
    description="Follow an example to create a project and user group in your
    organization, and give the group access to the project."
  />
</GridContainer>

### Step 4: Secure your organization

<GridContainer columns={3}>
     <Card
      to="/docs/platform/howto/set-authentication-policies"
      iconName="clipboardCheck"
      title="Configure an authentication policy"
      description="Determine how your organization users log in and use tokens."
    />
    <Card
      to="/docs/platform/concepts/orgs-units-projects#users-and-roles"
      iconName="book"
      title="Users and roles"
      description="Learn how access is controlled at the organization, project, and
      service level."
    />
    <Card
      to="/docs/platform/howto/make-super-admin"
      iconName="clipboard"
      title="Manage super admin"
      description="Control who can manage the organization, its billing, and all
      projects."
    />
    <Card
      to="/docs/platform/concepts/application-users"
      iconName="book"
      title="Application users"
      description="Learn how application users provide more secure
      programmatic access to the Aiven platform."
    />
    <Card
      to="/docs/platform/howto/manage-application-users"
      iconName="clipboard"
      title="Create application users"
      description="Create application users and tokens for use with the API,
      Terraform Provider, CLI, and Aiven Operator."
    />
    <Card
      to="/docs/platform/howto/manage-vpc-peering"
      iconName="clipboard"
      title="Create a virtual private cloud"
      description="Connect private networks with each other without going
      through the public internet."
    />
</GridContainer>

### Step 5: Create your first service

Start deploying services in your project to stream, store, or analyze your data.

#### Create a service in the Aiven Console

<GridContainer columns={3}>
  <Card
      to="/docs/products/services"
      iconName="book"
      title="View all services"
      description="Choose a service to learn more about it."
  />
  <Card
    to="/docs/platform/howto/create_new_service"
    iconName="clipboardCheck"
    title="Create a service"
    description="Create your first Aiven service."
  />
  <Card
    to="/docs/platform/howto/list-service"
    iconName="book"
    title="Manage your services"
    description="Learn about backups, maintenance, service resources, and more."
  />
</GridContainer>

#### Create a service using the dev tools

See examples of services and integrations using code samples for the
[Aiven Operator for Kubernetes](/docs/tools/kubernetes) or
[Aiven Provider for Terraform](/docs/tools/terraform).

<GridContainer columns={3}>
     <Card
      to="https://github.com/Aiven-Open/terraform-example-projects"
      iconName="terraform"
      title="Aiven Provider for Terraform examples"
    />
    <Card
      to="https://aiven.github.io/aiven-operator/resources/project.html"
      iconComponent={K8sIcon}
      title="Aiven Operator for Kubernetes examples"
    />
</GridContainer>

Create a service using the Aiven CLI or API.

<GridContainer columns={3}>
     <Card
      to="/docs/tools/cli/service-cli#avn-cli-service-create"
      iconName="code"
      title="Aiven CLI"
    />
    <Card
      to="https://api.aiven.io/doc/#tag/Service/operation/ServiceCreate"
      iconName="code"
      title="Aiven API"
    />
</GridContainer>

## Next steps

<GridContainer columns={3}>
     <Card
      to="/docs/tools/aiven-console"
      iconName="book"
      title="Explore Aiven Console"
    />
    <Card
      to="https://api.aiven.io/doc/#tag/Service/operation/ServiceCreate"
      iconName="book"
      title="Read more about cloud security"
    />
        <Card
      to="https://api.aiven.io/doc/#tag/Service/operation/ServiceCreate"
      iconName="book"
      title="Integrate your services"
    />
</GridContainer>
