---
title: Sign up for Aiven
---

import Card from "@site/src/components/AivenCard";
import GridContainer from "@site/src/components/GridContainer"

<GridContainer columns={3}>
  <a href="/docs/platform/concepts/free-trial" target="_blank"
  style={{ textDecoration: 'none' }}>
    <Card
      iconName="book"
      title="30-day trials"
      description="Learn more about free trials and credits."
    />
  </a>
  <Card
      to="https://console.aiven.io/signup"
      iconName="linkExternal"
      title="Sign up"
      description="Create your user account."
  />
  <a href="/docs/marketplace-setup" target="_blank"
  style={{ textDecoration: 'none' }}>
    <Card
      iconName="applications"
      title="Sign up through a marketplace"
      description="You can also use Aiven services through the
      AWS, Azure, or Google marketplaces."
    />
  </a>
</GridContainer>

<GridContainer>
  <Card
    to="/docs/get-started"
    title="<-- Back"
  />
  <Card
    to="/docs/platform/get-started/get-started-billing"
    title="Billing details -->"
  />
</GridContainer>
