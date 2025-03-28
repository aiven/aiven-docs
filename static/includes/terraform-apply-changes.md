To apply your Terraform configuration:

1. Initialize Terraform by running:

   ```bash
   terraform init
   ```

   The output is similar to the following:

   ```bash

   Initializing the backend...

   Initializing provider plugins...
   - Finding aiven/aiven versions matching ">= 4.0.0, < 5.0.0"...
   - Installing aiven/aiven v4.9.2...
   - Installed aiven/aiven v4.9.2
   ...
   Terraform has been successfully initialized!
   ...
   ```

1. To create an execution plan and preview the changes, run:

   ```bash
   terraform plan
   ```

1. To deploy your changes, run:

   ```bash
   terraform apply --auto-approve
   ```
