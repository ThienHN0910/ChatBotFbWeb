# BotFacebook Web (Vue 3)

`chatbotfbweb` is the standalone frontend workspace for BotFacebook.

## What this project contains

- Vue 3 + TypeScript SPA (`BotFacebook.Web`)
- Route-based pages: Home, Dashboard, Policy, Term
- API client with cookie-based requests (`credentials: include`)
- Auth redirect links to backend `/api/auth` and `/api/logout`

## Folder Layout

- `BotFacebook.Web/src/views/HomeView.vue`
: Landing page with command overview and navigation actions.
- `BotFacebook.Web/src/views/DashboardView.vue`
: Admin dashboard UI for knowledge and authorized users.
- `BotFacebook.Web/src/views/PolicyView.vue`
: Privacy policy page.
- `BotFacebook.Web/src/views/TermView.vue`
: Terms page.
- `BotFacebook.Web/src/services/api.ts`
: API URL resolver + JSON request helpers.
- `BotFacebook.Web/src/router/index.ts`
: Lazy-loaded route setup.

## Backend Integration

Frontend expects backend endpoints compatible with the Node project (`chatbotfbNode`):

- `/api/auth`
- `/api/logout`
- `/api/dashboard`
- `/health` (optional for monitoring)

When `VITE_API_BASE_URL` is set, requests go to that host.
When omitted, frontend uses relative paths.

## Command Display

Home page command cards are synced with current backend command set, including:

- `/ask`, `/weather`, `/pick`, `/random`
- `/time`, `/uptime`, `/ping`
- `/about`, `/echo`, `/fb`, `/link`, `/me`
- `/mem`, `/top`, `/history`, `/help`

Each command includes a short description in UI.

## Local Development

```bash
cd BotFacebook.Web
npm install
npm run dev
```

## Build

```bash
cd BotFacebook.Web
npm run build
npm run preview
```

## Environment

Frontend supports:

- `VITE_API_BASE_URL` (optional)

Example:

```env
VITE_API_BASE_URL=http://localhost:5000
```
