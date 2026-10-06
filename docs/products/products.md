---
title: Products
---

import Card from "@site/src/components/Card";
import GridContainer from "@site/src/components/GridContainer";
import AI from "@site/static/images/logos/star-ai.svg";
import database from "@site/static/images/icons/home/database.svg";
import console from "@site/static/images/icons/home/console.svg";
import integrations from "@site/static/images/icons/home/integrations.svg";

Build and manage your infrastructure on the Aiven Platform.

<GridContainer>
    <Card
        to="/docs/products/services"
        iconComponent={database}
        title="Managed services"
        description="Deploy and manage open source data technologies as fully managed services."
    />
    <Card
        to="/docs/products/runtime"
        iconComponent={console}
        title="Aiven Runtime"
        description="Deploy and run your applications on the Aiven Platform."
    />
    <Card
        to="/docs/tools/agents"
        iconComponent={AI}
        title="Managed Agents"
        description="Create and run AI agents on the Aiven Platform."
    />
    <Card
        to="/docs/platform/concepts/service-integration"
        iconComponent={integrations}
        title="Integrations"
        description="Connect your services and tools to build complete data pipelines."
    />
</GridContainer>
