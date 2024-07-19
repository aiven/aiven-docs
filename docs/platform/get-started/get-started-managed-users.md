---
title: Manage users in your organization
---

import Card from "@site/src/components/AivenCard";
import GridContainer from "@site/src/components/GridContainer"

<GridContainer columns={3}>
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
    <Card
      to="/docs/platform/howto/okta-user-provisioning-with-scim"
      iconName="clipboard"
      title="(Optional) Configure user provisioning with Okta"
      description="Automate user provisioning with Okta through System for Cross-domain
      Identity Management (SCIM)"
    />
    <Card
      to="/docs/platform/howto/list-groups"
      iconName="book"
      title="Groups"
      description="Learn about user groups and how they help you control access to
      projects and services."
    />
    <Card
      to="/docs/platform/howto/manage-groups"
      iconName="clipboardCheck"
      title="Create groups"
      description="Create and users to groups."
    />
</GridContainer>

<GridContainer columns={3}>
    <Card
      to="/docs/platform/reference/project-member-privileges"
      iconName="book"
      title="Project member roles"
      description="View the different roles that you can assign to groups and their
      level of access to a project and its services."
    />
    <Card
      to="/docs/platform/howto/add-groups-projects"
      iconName="clipboardCheck"
      title="Add groups to projects"
      description="Give users in a group access to a project."
    />
</GridContainer>

<GridContainer>
  <Card
    to="/docs/platform/get-started/get-started-users"
    title="<-- Users and groups"
  />
  <Card
    to="/docs/platform/get-started/get-started-security"
    title="Secure your organization -->"
  />
</GridContainer>
