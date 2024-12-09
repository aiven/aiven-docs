---
title: Aiven Operator for Kubernetes®
---

Manage Aiven infrastructure with [Aiven Operator for Kubernetes®](https://github.com/aiven/aiven-operator/) by using [Custom Resource Definitions (CRD)](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/).

The [Aiven Kubernetes Operator documentation](https://aiven.github.io/aiven-operator/index.html) includes an API reference and example usage for the resources.

## Get started

Take your first steps by configuring the Aiven Operator and deploying a PostgreSQL®
database.

### Prerequisites

- [Sign up for Aiven](https://console.aiven.io/signup).
- [Install the Aiven Operator](https://aiven.github.io/aiven-operator/installation/helm.html).
- Have admin access to a Kubernetes cluster where you can run the operator.
- Create a [personal token](/docs/platform/howto/create_authentication_token).
- [Create a Kubernetes Secret](https://aiven.github.io/aiven-operator/authentication.html).

### Deploy Aiven for PostgreSQL®

This example creates an Aiven for PostgreSQL service using the operator's custom resource:

1. Create a file named `pg-sample.yaml` and add the following:

   ```yaml
   apiVersion: aiven.io/v1alpha1
   kind: PostgreSQL
   metadata:
     name: pg-sample
   spec:

     # Gets the token from the `aiven-token` secret
     authSecretRef:
       name: aiven-token
       key: token

     # Outputs the PostgreSQL connection information to the `pg-connection` secret
     connInfoSecretTarget:
       name: pg-connection

     project: PROJECT-NAME

     cloudName: google-europe-west1
     plan: startup-4

     maintenanceWindowDow: friday
     maintenanceWindowTime: 23:00:00

     # PostgreSQL configuration
     userConfig:
       pg_version: '16'
   ```

   Where `PROJECT-NAME` is the name of the Aiven project to create the service in.

1. To apply the resource, run:

   ```bash
   kubectl apply -f pg-sample.yaml
   ```

1. Verify the status of your service by running:

   ```bash
   kubectl get postgresqls.aiven.io pg-sample
   ```

   Once the `STATE` field is `RUNNING`, your service is ready for use.


The connection information is automatically created by the operator
within a Kubernetes Secret named `pg-connection`. For PostgreSQL, the connection
information is the service URI.

### Use the service

When the service is running, you can deploy a pod to test the
connection to PostgreSQL from Kubernetes.

1. Create a file named `pod-psql.yaml` with the following:

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

         # The pg-connection secret becomes environment variables
         envFrom:
         - secretRef:
             name: pg-connection
   ```

1. Apply the resource to create the pod and test the connection by running:

   ```bash
   kubectl apply -f pod-psql.yaml
   ```

1. To check the logs, run:

   ```bash
   kubectl logs psql-test-connection
   ```

### Clean up

1. To destroy the resources, run:

   ```bash
   kubectl delete pod psql-test-connection
   kubectl delete postgresqls.aiven.io pg-sample
   ```

1. To remove the operator and `cert-manager`, run:

   ```bash
   helm uninstall aiven-operator
   helm uninstall aiven-operator-crds
   kubectl delete -f https://github.com/jetstack/cert-manager/releases/latest/download/cert-manager.yaml
   ```

## Related links

- [Aiven Operator for Kubernetes repository](https://github.com/aiven/aiven-operator/)
- [Aiven Kubernetes Operator examples](https://aiven.github.io/aiven-operator/resources/project.html)
- [Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
