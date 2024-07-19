---
title: Set up billing
---

import Card from "@site/src/components/AivenCard";
import GridContainer from "@site/src/components/GridContainer"

<GridContainer columns={3}>
  <a href="/docs/platform/concepts/hourly-billing-model" target="_blank"
  style={{ textDecoration: 'none' }}>
     <Card
      iconName="book"
      title="Billing overview"
      description="Learn how billing and payments work."
    />
  </a>
  <a href="/docs/platform/howto/manage-payment-card" target="_blank"
  style={{ textDecoration: 'none' }}>
    <Card
      iconName="clipboardCheck"
      title="Create a payment method"
      description="Add a credit card to pay for your Aiven services."
    />
  </a>
  <a href="/docs/platform/howto/manage-payment-card" target="_blank"
  style={{ textDecoration: 'none' }}>
    <Card
      iconName="clipboardCheck"
      title="Configure your billing group"
      description="Add your payment method and other details to the default billing group."
    />
  </a>
</GridContainer>

<GridContainer>
  <Card
    to="/docs/platform/get-started/get-started-signup"
    title="<-- Sign up"
  />
  <Card
    to="/docs/platform/get-started/get-started-organization"
    title="Organization setup -->"
  />
</GridContainer>
