# FinDash Development Guide

This guide covers local setup, implementation notes, and the current workflow for working on FinDash.

---

## Prerequisites

- Node.js 18+
- npm
- Optional: Android Studio for the Android emulator or Xcode for iOS simulation
- Expo Go on a physical device for quick previews

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

From Expo Dev Tools you can:

- Press `a` to open the Android emulator
- Press `i` to open the iOS simulator
- Press `w` to open the web preview
- Scan the QR code in Expo Go

### Useful scripts

```bash
npm run android
npm run ios
npm run web
npm run lint
```

---

## Project configuration

| File               | Purpose                                     |
| ------------------ | ------------------------------------------- |
| app.json           | Expo app metadata, plugins, and experiments |
| tsconfig.json      | TypeScript strict mode and path aliases     |
| tsconfig.base.json | Shared Expo TypeScript settings             |
| eslint.config.js   | Lint rules for the project                  |
| expo-env.d.ts      | Expo-generated type references              |

### Path aliases

The project uses the `@/` alias for imports, so code should follow patterns such as:

```typescript
import HomeScreen from "@/src/screens/HomeScreen";
import { saveTransaction } from "@/src/services/transactions";
```

### Expo experiments

The current app config enables:

- typedRoutes
- reactCompiler
- New Architecture via `newArchEnabled`

---

## Development workflow

### Adding a new screen

1. Create the screen under src/screens if it is a reusable feature screen.
2. Add a route in src/app or src/app/(tabs) if it should be navigable.
3. Keep navigation or layout wiring in the route files and leave business logic in the screen/service layers.

### Adding or changing a transaction operation

1. Update the SQLite function in src/services/db/transactions.ts.
2. Expose it through src/services/transactions.ts if screens should call it.
3. Update the docs and types if the domain shape changes.

### Working with categories

To add or adjust a category:

1. Extend the union in src/types/Category.ts.
2. Add the lookup entry in src/services/categories.ts.
3. Ensure the Add Transaction form picks up the new value automatically.

### Platform-specific code

Expo resolves files such as these automatically:

| File                  | Used on       |
| --------------------- | ------------- |
| Component.tsx         | All platforms |
| Component.web.tsx     | Web only      |
| Component.ios.tsx     | iOS only      |
| Component.android.tsx | Android only  |

---

## Current architecture notes

The app currently follows a service-driven approach:

- Screens call the service layer directly.
- The service layer delegates to the SQLite database layer.
- The context and hook directories exist as scaffolding but are not yet wired into the UI.

That is why the current implementation is straightforward and easy to follow, but it also means some stateful behavior is still duplicated across screens.

---

## Database notes

- Database file: findex.db
- Initialization happens in the root layout via initDB()
- The app creates the transactions table with `CREATE TABLE IF NOT EXISTS`
- To reset data during development, uninstall the app or clear app storage on the target platform

SQLite is provided by expo-sqlite and works on iOS, Android, and web.

---

## Current limitations

- Summary card trend text is still hardcoded.
- The Stats and Settings tabs are lightweight placeholder screens.
- The Transaction Details screen is not implemented yet.
- Edit and delete transaction flows are not exposed in the UI.
- Context and hooks are present as scaffolding but are not yet active in the app state model.

---

## Troubleshooting

### Metro cache issues

```bash
npx expo start --clear
```

### Route type issues

If expo-router starts reporting stale types, restart the dev server and allow the generated route files to refresh.

### SQLite on web

Ensure expo-sqlite is present in app.json. Expo handles the web implementation through its SQLite plugin support.

### Path alias issues

Verify the tsconfig paths include:

```json
"paths": {
  "@/*": ["./*"]
}
```

---

## Documentation index

| Document                                             | Contents                                |
| ---------------------------------------------------- | --------------------------------------- |
| [README.md](../README.md)                            | Overview and quick start                |
| [PROJECT_ARCHITECTURE.md](./PROJECT_ARCHITECTURE.md) | System design and implementation status |
| [DATA_MODEL.md](./DATA_MODEL.md)                     | Schema, types, and categories           |
| [DEVELOPMENT.md](./DEVELOPMENT.md)                   | This guide                              |
