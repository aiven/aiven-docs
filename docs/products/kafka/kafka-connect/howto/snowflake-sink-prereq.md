---
title: Configure Snowflake for a sink connector
---

To sink data from Apache Kafka® to Snowflake via the dedicated connector:

1.  Configure a [key pair
    authentication](https://docs.snowflake.com/en/user-guide/key-pair-auth#configuring-key-pair-authentication)
1.  Create a dedicated Snowflake user and associate the public key
1.  Create a Snowflake role
1.  Grant the Snowflake role access to the required database

## Configure a Snowflake key pair authentication

The Snowflake sink connector requires a key pair
authentication with a minimum 2048-bit RSA. Generate the key
pair locally and [upload the public key to Snowflake](https://docs.snowflake.com/en/user-guide/key-pair-auth#configuring-key-pair-authentication):

1.  Generate the private key using `openssl`:

    ```
    openssl genrsa 2048 | openssl pkcs8 -topk8 -inform PEM -out rsa_key.p8
    ```

:::note
You'll be prompted for the private key password. Keep for a later step.
:::

1.  Generate the public key using `openssl`:

    ```
    openssl rsa -in rsa_key.p8 -pubout -out rsa_key.pub
    ```

The above commands create two files:

-   `rsa_key.p8`: contains the private key, secured by a password
-   `rsa_key.pub`: contains the public key

## Create a dedicated Snowflake user and add the public key

Associate the public key generated at the previous with a
new or existing Snowflake user. To create a user and associate the public key to it:

1.  In the Snowflake UI, go to the **Worksheets** panel, and
    ensure to use a role with enough privileges (**SECURITYADMIN** or
    **ACCOUNTADMIN**)

1.  Run the following query to create a user:

    ```
    CREATE USER aiven;
    ```

1.  Copy from `rsa_key.pub` all the content between
    `-----BEGIN PUBLIC KEY-----` and `-----END PUBLIC KEY-----` and
    remove the newlines

:::note
The generated public key is usually stored on various lines, like:

```
-----BEGIN PUBLIC KEY-----
YXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXY
-----END PUBLIC KEY-----
```

The output for the following command is the content between
`-----BEGIN PUBLIC KEY-----` and `-----END PUBLIC KEY-----` in one line,
like:

```
YXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXY
```
:::

1.  Run the following query to associate to the newly created `aiven`
    user the public key, by replacing the `PUBLIC_KEY` placeholder with
    the output of the above command:

    ```
    alter user aiven set RSA_PUBLIC_KEY='PUBLIC_KEY';
    ```

## Create a dedicated Snowflake role and assign the user

Creating a new role is strongly suggested to provide the minimal amount
of privileges needed to the connector to operate:

1.  In the Snowflake UI, go to the **Worksheets** panel, and
    ensure to use a role with enough privileges (**SECURITYADMIN** or
    **ACCOUNTADMIN**)

1.  Run the following query to create a role:

    ```
    create role aiven_snowflake_sink_connector_role;
    ```

1.  Run the following query to grant the role to the previously created
    user:

    ```
    grant role aiven_snowflake_sink_connector_role to user aiven;
    ```

1.  Run the following query to alter the user making the new role
    default when logging in:

    ```
    alter user aiven set default_role=aiven_snowflake_sink_connector_role;
    ```

## Grant the Snowflake role access to the required database

The Snowflake sink connector will write data in tables belonging to a
schema within a database. Define the required grants
that need to be associated to newly created role to write to the
`TESTSCHEMA` schema in the `TESTDATABASE` database:

1.  In the Snowflake UI, go to the **Worksheets** panel, and
    ensure to use a role with enough privileges (**SECURITYADMIN** or
    **ACCOUNTADMIN**)

1.  Grant the required privileges to the newly created
    `aiven_snowflake_sink_connector_role` role:

    ```
    grant usage on database TESTDATABASE to role aiven_snowflake_sink_connector_role;
    grant usage on schema TESTDATABASE.TESTSCHEMA to role aiven_snowflake_sink_connector_role;
    grant create table on schema TESTDATABASE.TESTSCHEMA to role aiven_snowflake_sink_connector_role;
    grant create stage on schema TESTDATABASE.TESTSCHEMA to role aiven_snowflake_sink_connector_role;
    grant create pipe on schema TESTDATABASE.TESTSCHEMA to role aiven_snowflake_sink_connector_role;
    ```
