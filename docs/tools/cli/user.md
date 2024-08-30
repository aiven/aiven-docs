---
title: avn user
---

Full list of commands for `avn user`.

## Create and manage users and sessions

Commands for managing project users and `avn` client sessions.

### `avn user access-token`

Set of commands for managing a user's tokens.
[See detailed command information](user/user-access-token) for more information.

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

### `avn user tokens-expire` {#avncli user-tokens-expire}

Expires all the tokens associated with the user expired.

**Example:**

```
avn user tokens-expire
```

See more [access-token related commands](user/user-access-token)
