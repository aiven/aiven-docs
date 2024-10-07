---
title: Aiven dev tools
sidebar_label: Overview
---

import Card from "@site/src/components/AivenCard";
import GridContainer from "@site/src/components/GridContainer";
import K8sIcon from "@site/static/images/logos/kubernetes.svg";
import AI from "@site/static/images/logos/star-ai.svg";

Interact with the Aiven platform with the following tools:

 <GridContainer>
    <Card
      to="/docs/tools/terraform/get-started"
      iconName="terraform"
      title="Aiven Terraform Provider"
      description="Discover our Terraform Provider."
    />
     <Card
      to="/docs/tools/kubernetes"
      iconComponent={K8sIcon}
      title="Aiven Kubernetes Operator"
      description="Discover our Kubernetes Operator."
    />
    <Card
      to="/docs/tools/api"
      iconName="tools"
      title="Aiven API"
      description="Discover our APIs."
    />
    <Card
      to="/docs/tools/cli"
      iconName="tools"
      title="Aiven CLI"
      description="Discover our CLI."
    />
    <Card
      to="/docs/tools/query-optimizer"
      iconComponent={AI}
      title="SQL query optimizer"
      description="Use AI to optimize your queries."
    />
</GridContainer>
