---
title: Get started with Aiven
sidebar_label: Get started guide
---

import Card from "@site/src/components/AivenCard";
import GridContainer from "@site/src/components/GridContainer";
import Button from "@site/src/components/Buttons";

Aiven provides managed open source services for streaming, storing, and analyzing data on all major clouds.

<!--
Might add a quick start later that covers only the minimum needed steps to get set up.

Complete the following tasks in order to get set up on the Aiven platform or use the
quick start to start using the most basic features.
<Button to="/docs/platform/get-started/quick-start">Quick start</Button>
-->

To get set up on the Aiven platform, complete the following tasks in order.

<GridContainer columns={3}>
    <Card
      to="/docs/platform/get-started/get-started-signup"
      iconName="person"
      title="Sign up"
      description="Create your Aiven user account."
    />
    <Card
      to="/docs/platform/get-started/get-started-billing"
      iconName="applications"
      title="Add your billing details"
      description="Create a payment method and set up your billing group."
    />
     <Card
      to="/docs/platform/get-started/get-started-organization"
      iconName="office"
      title="Set up your organization"
      description="Organize your resources with organizational units and projects."
    />
    <Card
      to="/docs/platform/get-started/get-started-users"
      iconName="tools"
      title="Manage users and groups"
      description="Invite users to your organization and create groups for granular
      access control."
    />
    <Card
      to="/docs/platform/get-started/get-started-security"
      iconName="lock"
      title="Secure your organization"
      description="Set authentication policies, assign roles, create VPCs, and more."
    />
    <Card
      to="/docs/platform/get-started/get-started-services"
      iconName="performance"
      title="Create an Aiven service"
      description="Choose a service to stream, store, or observe your data."
    />
</GridContainer>

## What's new

Discover the latest features, fixes, and improvements on the [product
updates page](https://aiven.io/changelog).

## Browse the docs

import DocCardList from '@theme/DocCardList';

<DocCardList />
