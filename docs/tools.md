---
title: Aiven dev tools
sidebar_label: Overview
---

import Card from "@site/src/components/Card";
import GridContainer from "@site/src/components/GridContainer";
import K8sIcon from "@site/static/images/logos/kubernetes.svg";
import AI from "@site/static/images/logos/star-ai.svg";
import API from "@site/static/images/icons/home/dataflow-03.svg";
import Globe from "@site/static/images/icons/globe-02-1.svg";

Use your preferred tools to manage your infrastructure on the Aiven Platform.

<GridContainer>
    <Card
        to="/docs/tools/aiven-console"
        iconComponent={Globe}
        iconColor="var(--aiven-brand-green)"
        title="Aiven Console"
        description="Create and run agents on the Aiven Platform."
    />
    <Card
        to="/docs/tools/api"
        iconComponent={API}
        iconColor="var(--aiven-brand-orange)"
        title="Aiven API"
        description="Programmatically interact with and manage your Aiven infrastructure."
    />
    <Card
        to="/docs/tools/cli"
        iconName="console"
        iconColor="var(--aiven-brand-yellow)"
        title="Aiven CLI"
        description="Manage your Aiven services through the command-line interface."
    />
    <Card
        to="/docs/tools/mcp-server"
        iconComponent={AI}
        title="Aiven MCP"
        description="Manage Aiven services and access documentation from AI-powered coding assistants."
    />
    <Card
        to="/docs/tools/terraform"
        iconName="terraform"
        iconColor="var(--aiven-terraform-provider-purple)"
        title="Aiven Terraform Provider"
        description="Automate infrastructure provisioning and management with Terraform."
    />
    <Card
        to="/docs/tools/kubernetes"
        iconComponent={K8sIcon}
        title="Aiven Kubernetes Operator"
        description="Create and manage Aiven services directly within your Kubernetes clusters."
    />
</GridContainer>
