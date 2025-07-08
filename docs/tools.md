---
title: Aiven dev tools
sidebar_label: Overview
---

import Card from "@site/src/components/Card";
import GridContainer from "@site/src/components/GridContainer";
import K8sIcon from "@site/static/images/logos/kubernetes.svg";
import AI from "@site/static/images/logos/star-ai.svg";

You can interact with the Aiven platform with various interfaces and tools that best suit your workflow.

<GridContainer>
    <Card
        to="/docs/tools/terraform"
        iconName="terraform"
        title="Aiven Terraform Provider"
        description="Automate infrastructure provisioning and management on the Aiven Platform."
    />
    <Card
        to="/docs/tools/kubernetes"
        iconComponent={K8sIcon}
        title="Aiven Kubernetes Operator"
        description="Create and manage Aiven services directly within your Kubernetes clusters."
    />
    <Card
        to="/docs/tools/api"
        iconName="tools"
        title="Aiven API"
        description="Programmatically interact with and manage your Aiven infrastructure."
    />
    <Card
        to="/docs/tools/cli"
        iconName="tools"
        title="Aiven CLI"
        description="Manage your Aiven services through the command-line interface."
    />
    <Card
        to="/docs/tools/query-optimizer"
        iconComponent={AI}
        title="SQL query optimizer"
        description="Use AI to optimize your queries."
    />
</GridContainer>
