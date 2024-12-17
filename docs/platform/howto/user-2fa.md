---
title: Manage two-factor authentication
---

import {ConsoleIcon} from "@site/src/components/non-swizzled/ConsoleIcons"
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Two-factor authentication in Aiven provides an extra level of security by requiring a second authentication code in addition to the user password.

This only applies to logins using email and password. The Aiven platform
cannot enforce 2FA for logins through third-party providers, including identity providers.

:::warning
Enabling and disabling two-factor authentication revokes personal tokens
that you
[created with password authentication](/docs/platform/howto/set-authentication-policies#personal-tokens).
:::

## Enable two-factor authentication {#enable-2fa}

1.  Click <ConsoleIcon name="user"/> **User information** and select
    <ConsoleLabel name="authenticationmethod"/>.

1.  On the **Aiven Password** method, click the **Two-factor authentication** toggle
    to the enabled position.

1.  Enter your password and click **Next**.

1.  On your mobile device, open your authenticator app and scan the QR
    code shown in Aiven Console. Alternatively, you can enter the TOTP
    secret from the Aiven Console into your authenticator app.

1.  In the Aiven Console enter the **Confirmation code** from the authenticator app.

1.  Click **Enable**.

To change the mobile device that you use for two-factor authentication,
[disable two-factor authentication](/docs/platform/howto/user-2fa#disable-2fa)
and enable it on the new device.

## Disable two-factor authentication {#disable-2fa}

1.  Click <ConsoleIcon name="user"/> **User information** and select
    <ConsoleLabel name="authenticationmethod"/>.
1.  On the **Aiven Password** method, click the **Two-factor authentication** toggle
    to the disabled position.
1.  Enter your password and click **Disable Two-Factor Authentication**.

## Reset two-factor authentication

If you have lost access to your mobile device or authenticator app, you
can regain access to your account by resetting your Aiven password.

1.  Log out of Aiven Console.
1.  Enter your login email and click **Log in**.
1.  Click **Forgot password?**.
1.  Enter your login email and click **Reset your password**.
1.  [Enable two-factor authentication](/docs/platform/howto/user-2fa#enable-2fa)
    on your new mobile device or authenticator app.
