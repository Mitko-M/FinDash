# FinDash Development Guide

Guide for setting up, running, and contributing to FinDash locally.

---

## Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** (comes with Node)
- For native development:
  - [Android Studio](https://docs.expo.dev/workflow/android-studio-emulator/) (Android emulator)
  - [Xcode](https://docs.expo.dev/workflow/ios-simulator/) (iOS simulator, macOS only)
- [Expo Go](https://expo.dev/go) on a physical device (optional, quickest way to preview)

---

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npx expo start
```

From the Expo dev tools you can:

- Press `a` — open Android emulator
- Press `i` — open iOS simulator
- Press `w` — open in web browser
- Scan QR code — open in Expo Go

### Platform-specific shortcuts

```bash
npm run android   # expo start --android
npm run ios       # expo start --ios
npm run web       # expo start --web
```

### 3. Lint

```bash
npm run lint
```

---

## Project configuration

| File | Purpose |
|------|---------|
| `app.json` | Expo app config: name, icons, plugins (expo-router, expo-sqlite, splash) |
| `tsconfig.json` | TypeScript strict mode, `@/*` path alias |
| `tsconfig.base.json` | Shared Expo TS compiler options |
| `eslint.config.js` | ESLint with `eslint-config-expo` |
| `expo-env.d.ts` | Generated Expo type references |

### Path aliases

Imports use the `@/` prefix mapped to the project root:

```typescript
import HomeScreen from "@/src/screens/HomeScreen";
import { TransactionDb } from "@/src/types/Transaction";
```

### Expo experiments

From `app.json`:

- **typedRoutes** — type-safe route params with expo-router
- **reactCompiler** — React Compiler enabled
- **newArchEnabled** — React Native New Architecture

---

## Development workflow

### Adding a new screen

1. Create the screen component in `src/screens/MyScreen.tsx`
2. Add a route file in `src/app/` (or under `src/app/(tabs)/` for a tab)
3. Wire navigation in the appropriate `_layout.tsx` if needed
4. Update [PROJECT_ARCHITECTURE.md](./PROJECT_ARCHITECTURE.md) implementation status

Example tab route:

```typescript
// src/app/(tabs)/my-tab.tsx
import MyScreen from "@/src/screens/MyScreen";

export default function MyTabRoute() {
  return <MyScreen />;
}
```

### Adding a database operation

1. Add the SQL function in `src/services/db/transactions.ts`
2. Expose it through the facade in `src/services/transactions.ts`
3. Update [DATA_MODEL.md](./DATA_MODEL.md) with schema or operation changes

Keep raw SQLite calls out of screens and components.

### Working with categories

To add a category:

1. Add the key to the `CategoryType` union in `src/types/Category.ts`
2. Add the entry to `Categories` in `src/services/categories.ts` (label, icon, color)
3. The add-transaction dropdown will pick it up automatically

### Platform-specific code

Expo resolves platform files automatically:

| File | Used on |
|------|---------|
| `Component.tsx` | All platforms (default) |
| `Component.web.tsx` | Web only |
| `Component.ios.tsx` | iOS only |
| `Component.android.tsx` | Android only |

CSS files (e.g. `home.web.css`) are imported only from web-specific components.

---

## Code conventions

### Layer responsibilities

| Layer | Should | Should not |
|-------|--------|------------|
| `src/app` | Define routes, navigation options | Contain business logic |
| `src/screens` | Orchestrate data and layout | Execute raw SQL |
| `src/components` | Present data via props | Fetch from database directly |
| `src/services` | Data access and domain operations | Render UI |
| `src/context` / `src/hooks` | Shared state and reusable logic | Define routes |

### Type naming

- `TransactionDb` — database/persistence shape
- `TransactionType` — UI presentation shape
- Suffix `Type` for unions/enums (`CategoryType`)

### Styling

- Native: React Native `StyleSheet`
- Web overrides: `.web.tsx` components and `.web.css` where needed
- Shared color tokens will eventually live in `ThemeContext` / `constants.ts`

---

## Database notes

- Database file: `findex.db`
- Initialized on every app launch via `initDB()` in root `_layout.tsx`
- Uses `CREATE TABLE IF NOT EXISTS` — safe to call repeatedly
- To reset data during development: uninstall the app or clear app storage (platform-specific)

SQLite is provided by `expo-sqlite` and works on iOS, Android, and web.

---

## Known limitations (current codebase)

- Charts on Home use **demo data**, not live transactions
- Summary card trend text is **hardcoded** (not computed from history)
- Stats and Settings tabs are **placeholders**
- Context/hooks directories exist but are **empty** — screens call services directly
- Web home (`index.web.tsx`) is a **separate mockup**, not shared with `HomeScreen`
- No edit/delete transaction UI despite `deleteTransaction` existing in the DB layer
- `TransactionList` uses array index as React key — should use `item.id`

These are documented in [PROJECT_ARCHITECTURE.md](./PROJECT_ARCHITECTURE.md#implementation-status).

---

## Troubleshooting

### Metro bundler cache issues

```bash
npx expo start --clear
```

### Type errors after route changes

Expo generates typed routes under `.expo/types/`. Restart the dev server if route types seem stale.

### SQLite on web

Ensure `expo-sqlite` is listed in `app.json` plugins. Web SQLite uses a WASM-backed implementation via Expo.

### Path alias not resolving

Verify `tsconfig.json` includes:

```json
"paths": {
  "@/*": ["./*"]
}
```

Restart the TypeScript server in your editor if imports show errors.

---

## Documentation index

| Document | Contents |
|----------|----------|
| [README.md](../README.md) | Overview and quick start |
| [PROJECT_ARCHITECTURE.md](./PROJECT_ARCHITECTURE.md) | System design, layers, data flow |
| [DATA_MODEL.md](./DATA_MODEL.md) | Schema, types, categories |
| [DEVELOPMENT.md](./DEVELOPMENT.md) | This guide |
