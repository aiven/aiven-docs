---
title: avn user access-token
---

Full list of commands for `avn user access-token`.

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

Tokens can also be expired via the
[`avn user tokens-expire`](/docs/tools/cli/user#avncli%20user-tokens-expire) command.

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
