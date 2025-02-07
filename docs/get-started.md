---
title: Get started with Aiven
sidebar_label: Get started
---

import Button from "@site/src/components/non-swizzled/Buttons";
import {ButtonSecondary} from "@site/src/components/non-swizzled/Buttons";
import Card from "@site/src/components/non-swizzled/Card";
import Overview from "@site/static/images/content/platform/platform-overview.png";
import GridContainer from "@site/src/components/non-swizzled/GridContainer";
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

<img src={Overview} className="centered" alt="Illustration of the platform" width="54%" />

## Discover the Aiven platform

**Try it for free.** Aiven offers [free plans](/docs/platform/concepts/free-plan) and
[30-day trials](/docs/platform/concepts/free-trial) for you to explore the platform and services.

Aiven services are also available on the AWS, Azure, and Google Cloud marketplaces.

<GridContainer columns="3">
  <Button to="https://console.aiven.io/signup">Sign up for free</Button>
  <ButtonSecondary to="/docs/marketplace-setup">Marketplace signup</ButtonSecondary>
</GridContainer>

## First steps

Set up your organization and create your first service.

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
      title="Optional: Create organizational units"
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

<GridContainer columns={3}>
  <Card
    to="https://github.com/aiven/terraform-provider-aiven/blob/main/examples/organization/README.md"
    iconName="terraform"
    title="Organization setup with Terraform"
    description="Follow an example to set up your organization using
    the Aiven Provider for Terraform."
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
[user provisioning with Okta](/docs/platform/howto/saml/add-okta-idp)
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
      description="Add a verified domain to your organization
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
      to="/docs/platform/howto/manage-permissions"
      iconName="clipboardCheck"
      title="Give groups acess to projects"
      description="Grant roles and permissions to a group of users to access a project
      and its services."
    />
</GridContainer>

<GridContainer columns={3}>
  <Card
    to="https://github.com/aiven/terraform-provider-aiven/tree/main/examples/get-started"
    iconName="terraform"
    title="Create and assign groups with Terraform"
    description="Follow an example to create a user group and give it access to
    a project."
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
      to="/docs/platform/concepts/permissions"
      iconName="book"
      title="Permissions and roles"
      description="Learn how access is controlled at the organization, project, and
      service level."
    />
    <Card
      to="/docs/platform/concepts/permissions"
      iconName="clipboard"
      title="Manage organization admin"
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
      description="Use application users to access the Aiven API,
      Terraform Provider, CLI, and Kubernetes Operator."
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
[Aiven Provider for Terraform](/docs/tools/terraform) or
[Aiven Operator for Kubernetes®](/docs/tools/kubernetes).

<GridContainer columns={2}>
     <Card
      to="https://github.com/Aiven-Open/terraform-example-projects"
      iconName="terraform"
      title="Aiven Provider for Terraform examples"
    />
    <Card
      to="https://aiven.github.io/aiven-operator/resources/project.html"
      iconComponent={K8sIcon}
      title="Aiven Operator for Kubernetes® examples"
    />
</GridContainer>

Create a service using the Aiven CLI or API.

<GridContainer columns={2}>
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
      title="Read about cloud security"
    />
        <Card
      to="https://api.aiven.io/doc/#tag/Service/operation/ServiceCreate"
      iconName="book"
      title="Integrate your services"
    />
</GridContainer>
