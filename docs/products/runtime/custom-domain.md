---
title: Connect a custom domain to an Aiven Runtime application
sidebar_label: Connect a custom domain
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RequirementsPanel from "@site/src/components/RequirementsPanel";

Connect a custom domain to serve an Aiven Runtime application port from your own hostname instead of an Aiven-generated URL.
You can add a custom domain in Aiven to the ports you configured for your application.
Alternatively, you can use Cloudflare to forward traffic to your Aiven Runtime application.

## Configure a custom domain for a port

### Limitations and security considerations

- **Custom domains must be subdomains**:
  You cannot set a root domain such as `example.com` as a custom domain.

- **Adding a custom domain does not restrict access to the application**:
   The Aiven-generated URL can still be reached by anyone with access. To restrict access,
   add an [authentication method](/docs/products/runtime/authentication/apps-authentication-overview).

### Add a custom domain to an existing app

<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`project:services:write`', '`service:configuration:write`', '`role:project:admin`', '`role:project:manager`'],
    },
  ]}
/>

1. In the Aiven Console, click <ConsoleLabel name="runtime"/>
   and open your application.
1. In the **Connection information** section, click **Edit**.
1. In **Custom domain**, enter your domain. To add another domain, click **Add domain**.
1. Click **Save changes**.
1. In the **Connection information** section, open the port you added the
   custom domain to.
1. Click **View DNS instructions**.
1. Copy the CNAME record details.
1. In another browser tab or window, log in to your domain hosting provider.
1. Create a CNAME record and paste the details you copied.

It can take up to 72 hours for your DNS records to update and the domain to be verified.

## Custom domains managed by Cloudflare

Cloudflare receives traffic for your custom domain at its edge,
and a Cloudflare Worker forwards each request to the Aiven-generated application hostname.

This approach adds an extra network hop and a Worker subrequest
before traffic reaches Aiven. This can increase latency slightly.
Worker usage and pricing depend on your Cloudflare plan.

### Limitations and security considerations

This approach fronts your app's existing public URL. It doesn't replace the URL,
and you cannot rely on the Worker as a security boundary.

- **The application URL is still public**: Traffic reaches your container with
   the public `*.aiven.app` host. To restrict access to your app, add an
   [authentication method](/docs/products/runtime/authentication/apps-authentication-overview).
- **The app must be host-aware**: Requests reach your app with the `Host` set to the
  Aiven hostname. To avoid leaking that hostname in redirects, links, and cookies,
  configure your app to trust `X-Forwarded-Host` and `X-Forwarded-Proto`.
  Only the `Location` response header is rewritten for you.
- **Streaming and WebSockets need validation**: Server-sent events usually work with this
  proxy pattern. WebSockets need explicit upgrade handling in the Worker.
  Test both paths before production use.

### Prerequisites

- An Aiven Runtime application with a publicly accessible URL.
- A domain that is managed by Cloudflare and uses Cloudflare nameservers.
- The domain record is set to **Proxied** in Cloudflare.
- Universal SSL covers your root domain and first-level subdomains.
  Use Advanced Certificate Manager for deeper subdomains.

### Connect your Cloudflare-managed custom domain

<RequirementsPanel
  items={[
    {
      label: 'Aiven permissions',
      icon: 'people',
      values: ['`project:services:read`', '`role:project:read`', '`role:services:recover`', '`role:project:admin`', '`role:project:manager`'],
    }
  ]}
/>

1. To get the Aiven Runtime application URL, in the Aiven Console, click <ConsoleLabel name="runtime"/>
   and open your application.
1. In the **Connection information** section, copy the **Application URL**.
1. In Cloudflare, open your domain and click **DNS Records**.
1. Click **Add Record**.
1. For the **Type**, select **CNAME**.
1. Enter the **Name**.
1. For the **Target**, enter the application URL without `https://`.
1. Set the **Proxy status** to **Proxied**, and **TTL** to **Auto**.
1. Click **Back to Domains**, and in the sidebar,
   click **Compute** > **Workers & Pages**.
1. Click **Create application** > **Worker**. You can also use an existing
   Worker or deploy with [Wrangler](https://developers.cloudflare.com/workers/wrangler/).

   :::note[Note]
   Each exposed port has its own Aiven hostname. Front each one with its own Worker/route,
   or map hostnames to upstreams within a single Worker.
   :::

1. Configure the Worker. The following example forwards requests to
  an Aiven Runtime application host while preserving the original
  request method, body, and headers:

   ```js
   const AIVEN_HOST = "AIVEN_APP_HOSTNAME";

   export default {
     async fetch(request, env, ctx) {
       const incomingUrl = new URL(request.url);
       const upstreamUrl = new URL(request.url);

       upstreamUrl.protocol = "https:";
       upstreamUrl.hostname = AIVEN_HOST;
       upstreamUrl.port = "";

       const headers = new Headers(request.headers);

       headers.delete("Host");    // Host/SNI are taken from the fetch URL automatically
       headers.set("X-Forwarded-Host", incomingUrl.host);
       headers.set("X-Forwarded-Proto", "https");

       const init = {
         method: request.method,
         headers,
         redirect: "manual",
       };

       if (request.method !== "GET" && request.method !== "HEAD") {
         init.body = request.body;
       }

       const response = await fetch(upstreamUrl.toString(), init);
       const responseHeaders = new Headers(response.headers);

       rewriteLocationHeader(responseHeaders, incomingUrl);

       return new Response(response.body, {
         status: response.status,
         statusText: response.statusText,
         headers: responseHeaders,
       });
     },
   };

   function rewriteLocationHeader(headers, incomingUrl) {
     const location = headers.get("Location");

     if (!location) {
       return;
     }

     const publicOrigin = `${incomingUrl.protocol}//${incomingUrl.host}`;
     const upstreamOrigin = `https://${AIVEN_HOST}`;

     if (location.startsWith(upstreamOrigin)) {
       headers.set("Location", location.replace(upstreamOrigin, publicOrigin));
     }
   }
   ```

1. Click **Deploy**.

1. Open your domain and click **Workers Routes**.
1. Click **Add route**.
1. Add the **Route** using the pattern that matches the hostname you configured:

   - **Root domain**: `example.com/*`
   - **`www` subdomain**: `www.example.com/*`
   - **Other subdomain**: `app.example.com/*`

1. Select the **Worker** and click **Save**.

1. Open the custom domain in a browser to confirm the application loads.
