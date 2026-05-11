# BotFacebook Migration

This repository now uses a Vue 3 frontend plus an ASP.NET Core Web API backend.

## Layout

- `BotFacebook.Api/BotFacebook.Api` - ASP.NET Core 8 backend for webhook, dashboard API, auth, MongoDB, and Gemini/Facebook integration.
- `BotFacebook.Api/BotFacebook.Web` - Vue 3 SPA for the public pages and admin dashboard.

## What the app does

- Facebook webhook verification and message receive flow.
- Dashboard CRUD for knowledge base and authorized users.
- Google login for the dashboard with cookie-based session auth.
- Public `/policy` and `/term` pages in Vue.
- Bot command support kept in the backend: `/ask`, `/time`, `/keo`, `/mem`, `/top`, `/history`, `/help`, and related aliases.

## Backend setup

Environment values are loaded from `.env` and appsettings. Use `__` in environment variable names when targeting nested config sections.

Examples:

- `Mongo__ConnectionString`
- `Mongo__DatabaseName`
- `Facebook__PageAccessToken`
- `Facebook__PageId`
- `Facebook__GraphApiVersion`
- `Gemini__ApiKey`
- `Webhook__VerifyToken`
- `Auth__GoogleClientId`
- `Auth__GoogleClientSecret`
- `Auth__OAuthRedirect`
- `Auth__FrontendBaseUrl`
- `Auth__SessionSecret`

Run the backend:

```bash
dotnet build BotFacebook.Api/BotFacebook.Api.sln -c Release
dotnet run --project BotFacebook.Api/BotFacebook.Api/BotFacebook.Api.csproj
```

## Frontend setup

The Vue app calls the backend API with `credentials: include`, so set the API base URL in the frontend environment if the frontend and backend are hosted on different origins.

Example file:

- `BotFacebook.Api/BotFacebook.Web/.env.example`

Example:

- `VITE_API_BASE_URL=https://your-botfb-api-host`

Current production split:

- Frontend: `https://chat-bot-fb-lime.vercel.app`
- Backend: `https://chatbotfb-production.up.railway.app`

If you deploy frontend and backend on the same origin, the app can still fall back to relative `/api/...` URLs when `VITE_API_BASE_URL` is omitted.

Run the frontend:

```bash
cd BotFacebook.Api/BotFacebook.Web
npm install
npm run dev
```

Build the frontend:

```bash
cd BotFacebook.Api/BotFacebook.Web
npm run build
```

## Notes

- The old Node/Express source was removed from the root of this repo.
- The dashboard login flow redirects back to the Vue route `/dashboard`.
- `FrontendBaseUrl` in the backend auth settings must match the Vue app origin for CORS and post-login redirects.
- If `GET /api/auth` returns 404 on Railway, the backend deployment is not running this repo's ASP.NET app and must be redeployed from `BotFacebook.Api/BotFacebook.Api.csproj`.