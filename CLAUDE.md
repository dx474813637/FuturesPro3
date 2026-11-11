# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"周期掘金" (v1.0.5) — a cross-platform financial app for commodity futures and stock analysis, built with **uni-app** (Vue 3 + Vite). Targets H5, WeChat Mini Program, iOS, and Android from a single codebase. Backend at `https://gx.h5.100ppi.com/Ppi3/`.

## Build & Run

There are **no npm scripts** in `package.json`. This project uses **HBuilderX** (DCloud IDE) for building and running.

- `npm install` to install dependencies
- Open in HBuilderX, then use its toolbar to run for a target platform (H5 browser, WeChat dev tools, mobile device)
- Vite dev server has HMR enabled and proxies `/Ppi3` → `https://gx.h5.100ppi.com/` (see `vite.config.js` for proxy config)
- There are no tests

## Architecture

```
App.vue (onLaunch, onShow — scene parsing, token injection, route guard setup)
└── main.js (SSR app creation, plugin install: uview-plus + Pinia + global mixin)
    ├── config/request.js        — HTTP interceptor (token injection, refresh queue, error display)
    ├── config/permission/       — Route guard (login gate + GPT subscription gate for /pages/analysis*)
    ├── config/apis/
    │   ├── index.js             — Auto-merges all API functions from ./interface/ via import.meta.glob
    │   └── interface/base.js    — ~40+ API endpoint functions using uni.$u.http.get/post
    ├── stores/                  — Pinia stores
    │   ├── base.js              — baseStore (app state, nav, WxShare, file upload), menusStore (menus, currPage), useCateStore (category/futures/season config)
    │   └── user.js              — Login state, subscriptions (gptVip/qhtVip), token refresh
    ├── components/              — Reusable components (TabBar, NavBar, charts, cards, popups)
    ├── composition/             — useNormal (scene parsing), useDataList (pagination composable)
    └── pages/                   — Page components
        ├── index/               — Home, hot stocks, GPT subscription, news, user card
        ├── analysis/            — Stock analysis with ECharts
        ├── login/               — Auth pages
        ├── my/                  — Profile, settings
        ├── order/               — Subscription orders
        ├── partner/             — Partner/referral system
        └── qxt/                 — Futures (qxt = 期货通)
```

## Key Patterns

### Auto-imports (no explicit imports needed)
- Vue 3 APIs (`ref`, `reactive`, `computed`, `inject`, `watch`, etc.)
- uni-app lifecycle hooks (`onLoad`, `onShow`, `onLaunch`, etc.)
- `useNormal` from `@/composition/useNormal`
- `messageManager` (default export) from `@/config/message` — a singleton for showing toasts
- `useToast` from `nutui-uniapp/composables`

### Component auto-resolution (easycom)
Components matching `nut-*`, `u-*`, `up-*`, `u--*` patterns are auto-resolved without imports, per `pages.json` easycom config.

### Dependency injection
- `$http` — the uview-plus HTTP client (`uni.$u.http`), provided in `main.js`
- `$api` — the merged API functions object, provided in `main.js`
- Access via `inject('$http')` / `inject('$api')`

### Platform conditionals
Heavy use of `#ifdef H5` / `#ifdef MP-WEIXIN` / `#ifdef APP-PLUS` preprocessor directives for platform-specific code paths (login flows, file upload, image handling).

### API flow
1. `config/request.js` sets base URL + headers, injects `userid` token into every request
2. For WeChat Mini Program: if no `userid` token exists, pauses the request queue and calls `user.refreshToken()` (which hits `login_cancel` API), then replays all queued requests with the new token
3. Response interceptor unwraps `response.data` and shows error toasts for `code != 1`
4. All API endpoints in `config/apis/interface/base.js` call `uni.$u.http.get/post` and return `response.data`
5. Expected response format: `{ code: 1, msg: "...", list: [...], ... }`

### Route guards (`config/permission/index.js`)
- White list pages (home, login, qxt, haibao_detail) bypass login check
- `/pages/analysis*` pages additionally require active GPT subscription, else redirect to `/pages/index/gpt` (subscription page)
- Non-white-list pages redirect to `/pages/login/login` when not logged in
- `menusStore.currPage` tracks current route + params

### HTTP proxy during development
Vite proxies `/Ppi3/*` → `https://gx.h5.100ppi.com/`, so API calls during local dev work without CORS issues.

### SCSS
Global SCSS in `uni.scss` imports uview-plus and nutui-uniapp variable systems. Custom styles in `common/ext.scss` and `common/iconfont.css`. App.vue imports uview-plus and nutui-uniapp styles globally.

### ECharts
Minified ECharts library stored locally at `pages/analysis/static/echarts.min.js` and `pages/qxt/static/echarts.min.js`. Wrapper components in `components/` (e.g., `ProductECharts`, `StockECharts`) encapsulate chart rendering.

### Naming conventions
- API functions: `snake_case` (`get_captcha`, `my_subscription`)
- Stores: PascalCase with Store suffix (`baseStore`, `userStore`)
- Composables: camelCase with `use` prefix
- Vue files: mostly PascalCase for components, camelCase/snake_case for pages
