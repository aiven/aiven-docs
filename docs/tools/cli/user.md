---
title: avn user
---

Here you\'ll find the full list of commands for `avn user`.

## Create and manage users and sessions

Commands for managing project users and `avn` client sessions.

### `avn user access-token`

Set of commands for managing user\'s access tokens.
[See detailed command information](user/user-access-token) for more information.

### `avn user create`

Creates a new user.

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`email`</td>
      <td>The email associated to the user</td>
    </tr>
    <tr>
      <td>`--real-name`</td>
      <td>The user\'s real name</td>
    </tr>
  </tbody>
</table>


**Example:** Create a new user.

``` 
avn user create john.doe@example.com
```

**Example:** Create a new user specifying the real name.

``` 
avn user create john.doe@example.com --real-name "John Doe"
```

### `avn user info`

Retrieves the current user information such as:

-   Username
-   Real name
-   State (`active` or `inactive`)
-   Authentication token validity start date
-   Associated projects
-   Authentication method

**Example:** Retrieve the information for the currently logged user.

``` 
avn user info
```

An example of user information:

``` text
USER                  REAL_NAME  STATE   TOKEN_VALIDITY_BEGIN              PROJECTS                       AUTH
====================  =========  ======  ================================  =============================  ========
john.doe@example.com  John Doe   active  2021-08-18T09:24:10.298796+00:00  dev-sandbox, prod-environment  password
```

### `avn user login`

Logs the user in.

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`email`</td>
      <td>The email associated to the user</td>
    </tr>
    <tr>
      <td>`--token`</td>
      <td>Logs in the user with a pre-created token</td>
    </tr>
  </tbody>
</table>


**Example:** Log the `john.doe@example.com` user in, and prompt for
password. .. code:

    avn user login john.doe@example.com

The user will be prompted to insert the password.

**Example:** Log the `john.doe@example.com` user in, using a pre-created
authentication token. .. code:

    avn user login john.doe@example.com --token 

The user will be prompted to insert the pre-created authentication
token.

### `avn user logout`

Logs the user out.

**Example:** Log the user out. .. code:

    avn user logout

### `avn user tokens-expire` {#avncli user-tokens-expire}

Makes all the authentication tokens associated with the user expired.

**Example:** Make all the authentication tokens expired. .. code:

    avn user tokens-expire

See also other
[access-token related commands](user/user-access-token)
