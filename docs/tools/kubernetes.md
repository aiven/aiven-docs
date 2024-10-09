---
title: Aiven Operator for Kubernetes®
---

Manage Aiven services with [Aiven Operator for Kubernetes®](https://aiven.github.io/aiven-operator/) by using [Custom Resource Definitions (CRD)](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/).

Aiven Operator for Kubernetes® supports:

- Aiven for Apache Kafka®
- Aiven for Caching
- Aiven for ClickHouse®
- Aiven for OpenSearch®
- Aiven for PostgreSQL®

## Get started

Take your first steps by configuring the Aiven Operator and deploying a PostgreSQL®
database.

### Requirements

- You have access to a Kubernetes cluster where you can run the operator.
- You have an Aiven account. If you don't have one yet, [sign up for free](https://console.aiven.io/signup).
- To use the operator locally, we recommend using [**kind**](https://kind.sigs.k8s.io/).
  See [the installation guide](https://kind.sigs.k8s.io/docs/user/quick-start/#installation).
- To install the operator, we recommend [**Helm**](https://helm.sh/).
  See the [installation guide](https://helm.sh/docs/intro/install/).

### Install the Kubernetes® operator

1. Optional: To manage the webhook TLS certificates used by our operator, install the `cert-manager`:

   ```bash
   kubectl apply -f https://github.com/jetstack/cert-manager/releases/latest/download/cert-manager.yaml
   ```

   :::tip
   You can also use the operator without `cert-manager` and the admission
   webhooks. To do so, skip this step and go to step 3 to install Helm.
   :::

   :::note
   - For GKE version >= 1.21 VPC users, add a firewall rule to explicitly allow
     ingress to port 9443 for admission webhook. See [the Google Cloud docs](https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#add_firewall_rules).

   - If you are running a GKE _Autopilot_ cluster in Google Cloud Platform,
     use GKE version >=1.21 and install `cert-manager`
     into the `cert-manager` namespace, as per [this GitHub issue
     comment](https://github.com/cert-manager/cert-manager/issues/3717#issuecomment-975031637)
   :::

1. Verify the `cert-manager` installation by checking if the pods are up
   and running:

   ```bash
   kubectl get pod -n cert-manager
   ```

   Ensure the pod's status is `Running`.

1. Add the [Aiven Helm chart
   repository](https://github.com/aiven/aiven-charts/) and update your
   local Helm information:

   ```bash
   helm repo add aiven https://aiven.github.io/aiven-charts
   helm repo update
   ```

1. Install the CRD and the operator itself:

   ```bash
   helm install aiven-operator-crds aiven/aiven-operator-crds
   helm install aiven-operator aiven/aiven-operator
   ```

   :::tip
   To disable the admission webhooks, run:
   ```
   helm install aiven-operator aiven/aiven-operator --set webhooks.enabled=false
   ```
   :::

1. Verify the installation by making sure the operator pod is running:

   ```bash
   kubectl get pod -l app.kubernetes.io/name=aiven-operator
   ```

Your pod's status should be `Running`.

### Authenticating

Before creating a service, authenticate the operator with Aiven's API:

1. [Create a token](/docs/platform/howto/create_authentication_token).
1. Create the Kubernetes secret in the namespace which is going to be used to create your Aiven
   services:

   ```bash
   kubectl create secret generic aiven-token --from-literal=token="<your-token>"
   ```

### Deploy Aiven for PostgreSQL®

Create an Aiven for PostgreSQL service using the Custom Resource provided by the operator:

1. Create a file named `pg-sample.yaml` with the content below, substituting
   the `<your-project-name>` with your Aiven project name:

   ```yaml
   apiVersion: aiven.io/v1alpha1
   kind: PostgreSQL
   metadata:
     name: pg-sample
   spec:

     # gets the token from the `aiven-token` secret
     authSecretRef:
       name: aiven-token
       key: token

     # outputs the PostgreSQL connection on the `pg-connection` secret
     connInfoSecretTarget:
       name: pg-connection

     # add your Project name here
     project: <your-project-name>

     # cloud provider and plan of your choice
     # you can check all of the possibilities here https://aiven.io/pricing
     cloudName: google-europe-west1
     plan: startup-4

     # general Aiven configuration
     maintenanceWindowDow: friday
     maintenanceWindowTime: 23:00:00

     # specific PostgreSQL configuration
     userConfig:
       pg_version: '11'
   ```

1. Apply the resource:

   ```bash
   kubectl apply -f pg-sample.yaml
   ```

1. Verify the status of your service:

   ```bash
   kubectl get postgresqls.aiven.io pg-sample
   ```

   Once the `STATE` field has the value `RUNNING`, your service is ready for use.

### Use the service

Once the service is up and running, you can deploy a pod to test the
connection to PostgreSQL from Kubernetes.

1. Create a file named `pod-psql.yaml` with the content below:

   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: psql-test-connection
   spec:
     restartPolicy: Never
     containers:
       - image: postgres:11-alpine
         name: postgres
         command: ['psql', '$(DATABASE_URI)', '-c', 'SELECT version();']

         # the pg-connection secret becomes environment variables
         envFrom:
         - secretRef:
             name: pg-connection
   ```

   The connection information in this case, the PostgreSQL service URI, is
   automatically created by the operator within a Kubernetes secret named
   after the value from the `connInfoSecretTarget.name` field.

1. Apply the resource to create the pod and test the connection:

   ```bash
   kubectl apply -f pod-psql.yaml
   ```

1. Check the logs with:

   ```bash
   kubectl logs psql-test-connection
   ```

An Aiven for PostgreSQL service deployed through Kubernetes.

### Clean up

To destroy the resources created:

```bash
kubectl delete pod psql-test-connection
kubectl delete postgresqls.aiven.io pg-sample
```

To remove the operator and `cert-manager`:

```bash
helm uninstall aiven-operator
helm uninstall aiven-operator-crds
kubectl delete -f https://github.com/jetstack/cert-manager/releases/latest/download/cert-manager.yaml
```

## Related links

- [Aiven Operator for Kubernetes repository](https://github.com/aiven/aiven-operator/)
- [Aiven Operator examples](https://aiven.github.io/aiven-operator/resources/project.html)
- [Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
