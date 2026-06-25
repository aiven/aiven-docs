---
title: Connect a custom domain to an Aiven App
sidebar_label: Connect a custom domain
limited: true
---

Connect a custom domain to an Aiven App using Cloudflare. Cloudflare receives traffic for your custom domain at its edge, and a Cloudflare Worker forwards each request to the Aiven-generated app hostname.

This approach adds an extra network hop and a Worker subrequest
before traffic reaches Aiven. This can increase latency slightly.
Worker usage and pricing depend on your Cloudflare plan.

## Limitations and security considerations

This approach fronts your app's existing public URL. It doesn't replace the URL,
and you cannot rely on the Worker as a security boundary.

- **The Aiven App URL stays publicly reachable**: Traffic reaches your container with
   the public `*.aiven.app` host. Anyone who knows that URL can bypass your custom domain
   and any Cloudflare-layer protections you configure on it.
- **The app must be host-aware**: Requests reach your app with the `Host` set to the
  Aiven hostname. To avoid leaking that hostname in redirects, links, and cookies,
  configure your app to trust `X-Forwarded-Host` and `X-Forwarded-Proto`.
  Only the `Location` response header is rewritten for you.
- **Streaming and WebSockets need validation**: Server-sent events usually work with this
  proxy pattern. WebSockets need explicit upgrade handling in the Worker.
  Test both paths before production use.

## Prerequisites

- An Aiven App with a publicly accessible URL.
- A domain that is managed by Cloudflare and uses Cloudflare nameservers.
- The domain record is set to **Proxied** in Cloudflare.
- Universal SSL covers your root domain and first-level subdomains.
  Use Advanced Certificate Manager for deeper subdomains.

## Connect a custom domain managed by Cloudflare

1. To get the Aiven App URL, in the Aiven Console, click **Applications** and
   open your app.
1. In the **Connection information** section, copy the **Application URL**.
1. In Cloudflare, open your domain and click **DNS Records**.
1. Click **Add Record**.
1. For the **Type**, select **CNAME**.
1. Enter the **Name**.
1. For the **Target**, enter the Aiven App URL without `https://`.
1. Set the **Proxy status** to **Proxied**, and **TTL** to **Auto**.
1. Click **Back to Domains**, and in the sidebar,
   click **Compute** > **Workers & Pages**.
1. Click **Create application** > **Worker**. You can also use an existing
   Worker or deploy with [Wrangler](https://developers.cloudflare.com/workers/wrangler/).

   :::note
   Each exposed port has its own Aiven hostname. Front each one with its own Worker/route,
   or map hostnames to upstreams within a single Worker.
   :::

1. Configure the Worker. The following example forwards requests to
  an Aiven App host while preserving the original request method, body, and headers:

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

1. Open the custom domain in a browser to confirm the app loads.
