# FinDash

FinDash is a cross-platform personal finance tracker built with Expo and React Native. It lets users record income and expense transactions, review a dashboard with summary cards and charts, and keep everything stored locally in SQLite.

The app currently runs on iOS, Android, and web from a single codebase.

---

## Current status

| Area                                | Status                                 |
| ----------------------------------- | -------------------------------------- |
| Add income and expense transactions | Implemented                            |
| Home dashboard summary cards        | Implemented                            |
| Recent transactions list            | Implemented                            |
| Local SQLite persistence            | Implemented                            |
| Category icons and colors           | Implemented                            |
| Income vs expense chart             | Implemented with real transaction data |
| Spending by category chart          | Implemented with real transaction data |
| Stats tab                           | Present as a simple placeholder        |
| Settings tab                        | Present as a simple placeholder        |
| Edit and delete transaction flows   | Planned                                |

---

## Tech stack

- Expo SDK 57 with expo-router for file-based navigation
- React Native 0.86 and React 19.2
- expo-sqlite for local storage in a SQLite database named findex.db
- react-native-gifted-charts for the income/expense and category charts
- TypeScript in strict mode

---

## Quick start

### Prerequisites

- Node.js 18+
- npm
- Optional: Android Studio or Xcode for native emulation

### Install and run

```bash
npm install
npx expo start
```

Then choose a target from Expo Dev Tools:

- Android: `npm run android`
- iOS: `npm run ios` (macOS + Xcode required)
- Web: `npm run web`
- Device: scan the QR code in Expo Go

### Lint

```bash
npm run lint
```

---

## Project structure

```text
src/
├── app/           # expo-router entry points and layout files
├── screens/       # Feature screens such as Home and Add Transaction
├── components/    # UI, chart, and transaction list components
├── services/      # SQLite access and transaction/category facades
├── context/       # Context scaffolding (not wired up yet)
├── hooks/         # Hook scaffolding (not wired up yet)
├── types/         # Domain TypeScript models
└── utils/         # Formatting and aggregation helpers
```

Routes stay thin; screens and services handle the app behavior. The current implementation uses direct service calls from screens rather than the context/hook layer yet.

---

## What the app does today

1. Home shows balance, income, expenses, and savings-rate summary cards.
2. The dashboard renders charts based on the actual transactions stored in SQLite.
3. The Add Transaction screen creates new entries and navigates back to the home flow.
4. Stats and Settings are available as lightweight placeholder screens.

---

## Documentation

| Document                                                     | Description                                    |
| ------------------------------------------------------------ | ---------------------------------------------- |
| [docs/PROJECT_ARCHITECTURE.md](docs/PROJECT_ARCHITECTURE.md) | Architecture, routing, layers, and status      |
| [docs/DATA_MODEL.md](docs/DATA_MODEL.md)                     | SQLite schema, types, and category definitions |
| [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)                   | Local setup, conventions, and troubleshooting  |

---

## Configuration

App metadata and Expo plugins are defined in app.json:

- App name: FinDash
- Scheme: findash
- Plugins: expo-router, expo-splash-screen, expo-sqlite, expo-font, expo-image, expo-status-bar, expo-web-browser
- Typed routes and React Compiler are enabled

---

## License

Private project.
