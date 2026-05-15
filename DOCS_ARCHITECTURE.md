# BotFacebook Web Architecture

## Overview

This workspace (`chatbotfbweb`) contains the Vue 3 frontend application used by BotFacebook.
It is designed to work with a separate backend service (normally `chatbotfbNode`).

Frontend app root: `BotFacebook.Web`

## Tech Stack

- Vue 3
- Vue Router 4
- TypeScript
- Vite

## Routing Model

Defined in `BotFacebook.Web/src/router/index.ts`:

- `/` -> Home view
- `/dashboard` -> Dashboard view
- `/policy` -> Policy view
- `/term` -> Terms view
- Fallback route redirects to `/`

Route components are lazy-loaded.

## API Access Model

Implemented in `BotFacebook.Web/src/services/api.ts`:

- `resolveApiUrl(path)`
: Resolves relative URL or prefixes `VITE_API_BASE_URL`.
- `requestJson<T>(path, init)`
: Wrapper around `fetch`, always uses `credentials: include`.
- `getAuthUrl()` and `getLogoutUrl()`
: Build backend auth links.

## Integration Contract (Backend)

Expected backend endpoints:

- `GET /api/auth`
- `GET /api/logout`
- `GET /api/dashboard`
- `POST /api/dashboard`
- `PUT /api/dashboard`
- `DELETE /api/dashboard`

The frontend does not implement webhook functionality. All webhook logic remains on backend.

## Home Page Content Contract

Home page (`src/views/HomeView.vue`) presents:

- Current bot command list
- Per-command short descriptions
- Login and dashboard navigation actions

The command cards should stay aligned with backend command handlers in `chatbotfbNode/src/botCommands`.

## Environment Variables

Supported frontend env vars:

- `VITE_API_BASE_URL` (optional)

Behavior:

- With value: calls are sent to the configured backend origin.
- Without value: calls use same-origin relative `/api/...` paths.

## Build and Run

```bash
cd BotFacebook.Web
npm install
npm run dev
npm run build
npm run preview
```

## Deployment Notes

- Ensure backend CORS and cookie policy allow the frontend origin.
- Ensure backend `Auth__FrontendBaseUrl` points to deployed frontend URL.
- For SPA hosting, configure fallback rewrite to `index.html` for unknown routes.
