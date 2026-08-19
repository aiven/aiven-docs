import ConsoleLabel from "@site/src/components/ConsoleIcons"

## Step 2: Register an app in your identity provider

1. Open the console for your identity provider in another tab.
1. In your identity provider, register a new app.
1. Paste the **Redirect URI** you copied from the Aiven Console into the
   redirect or callback URL field.
1. Add the scopes `openid`, `profile`, and `email`.
1. Copy the **Issuer/Provider URL**, **Client ID**, and **Client secret**.
