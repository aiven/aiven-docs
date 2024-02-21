---
title: Manage two-factor authentication
---

Two-factor authentication in Aiven provides an extra level of security by requiring a second authentication code in addition to the user password.

:::warning
Enabling and disabling two-factor authentication revokes your
existing authentication tokens.
:::

## Enable two-factor authentication {#enable-2fa}

To enable two-factor authentication on the [Aiven
Console](https://console.aiven.io/):

1.  Click the **User information** icon in the top right and select
    **Authentication**.

1.  On the **Aiven Password** method, toggle on **Two-factor
    authentication**.

1.  Enter your password and click **Next**.

1.  On your mobile device, open your authenticator app and scan the QR
    code shown in Aiven Console.

    :::note
    Alternatively, you can enter the TOTP secret from the Aiven Console
    into your authenticator app.
    :::

1.  Enter the code from the authenticator app in the **Confirmation
    code** field in Aiven Console.

1.  Click **Enable**.

To change the mobile device that you use for two-factor
authentication and [disable two-factor authentication](/docs/platform/howto/user-2fa#disable-2fa)
and enable it on the new device.

## Disable two-factor authentication {#disable-2fa}

To disable two-factor authentication on the Aiven Console:

1.  Click the **User information** icon in the top right and select
    **Authentication**.
1.  On the **Aiven Password** method, toggle off **Two-factor
    authentication**.
1.  Enter your password and click **Disable Two-Factor Authentication**.

## Reset two-factor authentication

If you have lost access to your mobile device or authenticator app, you
can regain access to your account by resetting your Aiven password:

1.  Log out of Aiven Console.
1.  Enter your login email and click **Log in**.
1.  Click **Forgot password?**.
1.  Enter your login email and click **Reset your password**.
1.  Follow the instructions in the password reset email to set a new
    password.
1.  [Enable two-factor authentication](/docs/platform/howto/user-2fa#enable-2fa) on your new mobile device or authenticator app.
