---
title: avn user
---

Manage users and personal tokens with the  `avn user` commands.

## Manage users

### `avn user info`

Retrieves the current user information such as:

-   Username
-   Real name
-   State (`active` or `inactive`)
-   Token validity start date
-   Associated projects
-   Authentication method

**Example:** Retrieve the information for the currently logged user.

```
avn user info
```

An example of user information:

```text
USER                  REAL_NAME  STATE   TOKEN_VALIDITY_BEGIN              PROJECTS                       AUTH
====================  =========  ======  ================================  =============================  ========
john.doe@example.com  John Doe   active  2021-08-18T09:24:10.298796+00:00  dev-sandbox, prod-environment  password
```

### `avn user login`

Logs the user in.

| Parameter | Information                               |
| --------- | ----------------------------------------- |
| `email`   | The email associated to the user          |
| `--token` | Logs in the user with a pre-created token |

**Example:** Log the `john.doe@example.com` user in, and prompt for
password.

```
avn user login john.doe@example.com
```

The user will be prompted to insert the password.

**Example:** Log the `john.doe@example.com` user in, using a personal token.

```
avn user login john.doe@example.com --token
```

The user will be prompted to insert the personal token.

### `avn user logout`

Logs the user out.

**Example:** Log the user out.

```
avn user logout
```
## Manage tokens

Commands for managing a user's tokens.

### `avn user access-token create`

Creates a token for the logged in user.

| Parameter            | Information                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------- |
| `--description`      | Description of how the token will be used                                                   |
| `--max-age-seconds`  | Maximum age of the token in seconds, if any, after which it will expire(30 days by default) |
| `--extend-when-used` | Extend token's expiry time when used (only applicable if token is set to expire)            |

**Example:** Create a token.

```
avn user access-token create --description "To be used with Python Notebooks"
```

**Example:** Create a token expiring every hour if not used.

```
avn user access-token create                       \
  --description "To be used with Python Notebooks" \
  --max-age-seconds 3600                           \
  --extend-when-used
```

The output will be similar to the following:

```text
EXPIRY_TIME           DESCRIPTION                       MAX_AGE_SECONDS  EXTEND_WHEN_USED  FULL_TOKEN
====================  ================================  ===============  ================  ===============================
2021-08-16T16:26:10Z  To be used with python notebooks  3600             true              6JsKDclT3OMQd1V2Fl2...RaraBPg==
```

### `avn user access-token list`

Retrieves the information for all the active tokens:

-   Expiration time
-   Token prefix
-   Description
-   Token's max age in seconds
-   Extended when used flag
-   Last used time
-   Last IP address
-   Last user agent

**Example:** Retrieve the information for the logged-in user.

```
avn user access-token list
```

An example of user information:

```text
EXPIRY_TIME           TOKEN_PREFIX  DESCRIPTION                       MAX_AGE_SECONDS  EXTEND_WHEN_USED  LAST_USED_TIME        LAST_IP      LAST_USER_AGENT
====================  ============  ================================  ===============  ================  ====================  ===========  ===================
2021-09-15T15:29:14Z  XCJ3+bgWywIh  Test token                        2592000          true              2021-08-16T15:29:14Z  192.168.1.1  aiven-client/2.12.0
2021-08-16T16:26:10Z  6JsKDclT3OMQ  To be used with Python Notebooks  3600             true              null                  null         null
```

### `avn user access-token revoke`

Revokes a token.

| Parameter      | Information                                                    |
| -------------- | -------------------------------------------------------------- |
| `token_prefix` | The full token or token prefix identifying the token to revoke |

**Example:** Revoke the token starting with `6JsKDclT3OMQ`.

```
avn user access-token revoke "6JsKDclT3OMQ"
```

### `avn user access-token update`

Updates the description of a token.

| Parameter       | Information                                                    |
| --------------- | -------------------------------------------------------------- |
| `token_prefix`  | The full token or token prefix identifying the token to update |
| `--description` | Description of how the token will be used                      |

**Example:** Update the description of the token starting with
`6JsKDclT3OMQ`.

```
avn user access-token update "6JsKDclT3OMQ" --description "To be used with Jupyter Notebooks"
```

### `avn user tokens-expire` {#avncli user-tokens-expire}

Expires all the tokens associated with the user expired.

**Example:**

```
avn user tokens-expire
```

### `avn user access-token`

Set of commands for managing a user's tokens.

### `avn user create`

Creates a new user.

| Parameter     | Information                      |
| ------------- | -------------------------------- |
| `email`       | The email associated to the user |
| `--real-name` | The user's real name             |

**Example:** Create a user.

```
avn user create john.doe@example.com
```

**Example:** Create a user specifying the real name.

```
avn user create john.doe@example.com --real-name "John Doe"
```
