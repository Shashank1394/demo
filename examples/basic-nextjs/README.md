# Sitecore Content SDK Next.js Sample Application

## Overview

This is the basic Next.js (App Router) starter with minimal XM Cloud integration.

## How to Run This Starter Locally

Follow the [root README — How to Run a Next.js Starter Locally](../../README.md#how-to-run-a-nextjs-starter-locally), using this path: **`examples/basic-nextjs`**.

Optional: for stable absolute URLs in server-rendered code when the request has no `Host` header, set `NEXT_PUBLIC_SITE_URL` or `NEXT_PUBLIC_BASE_URL` (see [`.env.remote.example`](.env.remote.example)).

From the repo root:

```bash
cd examples/basic-nextjs
npm install
npm run dev
```

Open **http://localhost:3000**.

## Revalidate Vercel Cache When Content Is Published

This starter supports on-demand cache revalidation from an Experience Edge
webhook. After these application changes are deployed once, publishing content
in XM Cloud refreshes cached Sitecore content on Vercel without a new Vercel
deployment.

### How it works

1. Cached page and dictionary reads register Sitecore cache tags in
   `src/lib/cached-functions.ts`.
2. Experience Edge sends an `OnUpdate` `POST` request to
   `/api/revalidate` after published content changes.
3. `src/app/api/revalidate/route.ts` validates the
   `x-revalidate-secret` header, maps changed item identifiers to Content SDK
   cache tags, and invalidates a shared Sitecore-content tag. The shared tag
   also covers datasource updates that do not identify the page item.
4. The next request regenerates the cached content from Experience Edge and
   Vercel serves the updated response. No redeploy is required.

### Next.js implementation changes

The following application changes are required. They are already implemented
in this starter and must be retained when copying this approach to another
Next.js App Router application.

1. Enable Cache Components in `next.config.ts`:

   ```ts
   const nextConfig = {
     cacheComponents: true,
   };
   ```

2. Define one shared tag in `src/lib/sitecore-cache.ts`:

   ```ts
   export const SITECORE_CONTENT_CACHE_TAG = "sc:content";
   ```

3. In every cached Sitecore page-read function, retain the `"use cache"`
   directive and register both the shared tag and the Content SDK page tags
   after the `client.getPage` call. In this starter, this is implemented in
   `src/lib/cached-functions.ts`:

   ```ts
   import { collectSitecorePageCacheTags } from "@sitecore-content-sdk/nextjs";
   import { cacheTag } from "next/cache";

   const result = await client.getPage(path, { site, locale });

   cacheTag(
     SITECORE_CONTENT_CACHE_TAG,
     ...collectSitecorePageCacheTags({
       path: `/${path.join("/")}`,
       site,
       locale,
       route: result?.layout.sitecore.route,
     }),
   );
   ```

4. Register the shared tag on cached dictionary reads too:

   ```ts
   import { buildSitecoreDictionaryCacheTag } from "@sitecore-content-sdk/nextjs";

   const dictionary = await client.getDictionary({ site, locale });
   cacheTag(
     SITECORE_CONTENT_CACHE_TAG,
     buildSitecoreDictionaryCacheTag({ site, locale }),
   );
   ```

5. Add the `POST` route at `src/app/api/revalidate/route.ts`. The Content SDK
   handler authenticates the header and resolves the `OnUpdate` payload's item
   IDs to the tags registered above. Revalidate the shared tag only when that
   handler returns success:

   ```ts
   import { createSitecoreRevalidateRouteHandler } from "@sitecore-content-sdk/nextjs/route-handler";
   import { revalidateTag } from "next/cache";
   import { NextRequest } from "next/server";
   import sites from ".sitecore/sites.json";

   const { POST: sitecoreRevalidate } = createSitecoreRevalidateRouteHandler({
     sites,
     defaultLocale: "en",
     secret: process.env.SITECORE_REVALIDATE_SECRET,
   });

   export async function POST(request: NextRequest) {
     const response = await sitecoreRevalidate(request);

     if (response.ok) {
       revalidateTag(SITECORE_CONTENT_CACHE_TAG, "max");
     }

     return response;
   }
   ```

   Import `SITECORE_CONTENT_CACHE_TAG` from `src/lib/sitecore-cache.ts` in the
   route. Do not log the webhook body or secret header: both can contain
   sensitive data.

### 1. Configure the shared secret

Create a strong secret and use the exact same value in both places below. Do
not commit the value.

- In Vercel, add `SITECORE_REVALIDATE_SECRET` to the **Production** environment
  variables for this project, then deploy the application once.
- In Experience Edge, set the webhook header named `x-revalidate-secret` to
  that value.

For local development, add the variable to `.env.local` yourself. The tracked
[`.env.remote.example`](.env.remote.example) documents the variable but remains
empty.

### 2. Create the Experience Edge webhook

Use an Experience Edge Admin API bearer token (`$accessToken`) with permission
to manage webhooks. The Admin API base URL is
`https://edge.sitecorecloud.io/api/admin/v1`.

Run the following in PowerShell, replacing the placeholders. `uri` must be the
public HTTPS URL of the deployed Vercel app.

```powershell
$accessToken = "<Experience Edge Admin API bearer token>"
$revalidateSecret = "<same value as SITECORE_REVALIDATE_SECRET in Vercel>"
$webhook = @{
  label = "Next.js Cache Revalidation"
  uri = "https://<your-vercel-domain>/api/revalidate"
  method = "POST"
  headers = @{
    "x-revalidate-secret" = $revalidateSecret
  }
  createdBy = "Next.js"
  executionMode = "OnUpdate"
}

Invoke-RestMethod `
  -Method Post `
  -Uri "https://edge.sitecorecloud.io/api/admin/v1/webhooks" `
  -Headers @{ Authorization = "Bearer $accessToken" } `
  -ContentType "application/json" `
  -Body ($webhook | ConvertTo-Json -Depth 4)
```

Save the returned `id`; it identifies the webhook for later inspection, update,
or deletion.

Use **`OnUpdate`**, not `OnEnd`. `OnUpdate` sends changed entities in a JSON
request body, which is required to map events to cache tags. An `OnEnd` webhook
without a compatible custom JSON body returns `400 Bad Request` from this app
and can be automatically disabled after repeated failures.

### 3. Verify it

List the webhooks and confirm the revalidation webhook has
`executionMode: "OnUpdate"` and is not disabled:

```powershell
Invoke-RestMethod `
  -Method Get `
  -Uri "https://edge.sitecorecloud.io/api/admin/v1/webhooks" `
  -Headers @{ Authorization = "Bearer $accessToken" }
```

Publish a small content change in XM Cloud, then inspect `lastRuns` in the
result. A successful invocation has `success: true`. You can also check the
Vercel function logs for the `/api/revalidate` request. Visit the affected page
after a successful webhook call to regenerate its cached response.

### Remove an obsolete `OnEnd` webhook

If an earlier `OnEnd` revalidation webhook exists, delete it by ID while
keeping the `OnUpdate` webhook:

```powershell
$webhookId = "<obsolete OnEnd webhook id>"

Invoke-RestMethod `
  -Method Delete `
  -Uri "https://edge.sitecorecloud.io/api/admin/v1/webhooks/$webhookId" `
  -Headers @{ Authorization = "Bearer $accessToken" }
```

A successful delete returns HTTP `204 No Content`.

## Documentation

- [Skills: capability map for this starter](Skills.md) — High-level capability groupings; see also the repo [docs/Skills.md](../../docs/Skills.md).
- [Sitecore Content SDK for XM Cloud](https://doc.sitecore.com/xmc/en/developers/content-sdk/sitecore-content-sdk-for-xm-cloud.html)
- [Experience Edge Admin REST API: webhook endpoints](https://doc.sitecore.com/sai/en/developers/sitecoreai/experience-edge/experience-edge-apis/admin-rest-api.html)
- [Experience Edge webhook objects](https://doc.sitecore.com/sai/en/developers/sitecoreai/experience-edge/webhook-objects/webhook-objects.html)
- [Experience Edge webhook execution modes](https://doc.sitecore.com/sai/en/developers/sitecoreai/experience-edge/webhook-objects/the-webhook-execution-modes.html)
