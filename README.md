# FinDash

A cross-platform personal finance tracker built with **Expo** and **React Native**. Record income and expenses, view your balance at a glance, and explore spending patterns through charts.

Runs on **iOS**, **Android**, and **web** from a single codebase.

---

## Features

| Feature | Status |
|---------|--------|
| Add income & expense transactions | Done |
| Home dashboard with balance summary | Done |
| Recent transactions list | Done |
| Local SQLite persistence | Done |
| Category icons and colors | Done |
| Income vs expense bar chart | Done |
| Spending by category pie chart | Done |
| Stats tab | Planned |
| Settings (theme, currency) | Planned |
| Edit / delete transactions | Planned |

---

## Tech stack

- [Expo SDK 54](https://docs.expo.dev/) + [expo-router](https://docs.expo.dev/router/introduction/) (file-based routing)
- React Native 0.81, React 19
- [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/) for local storage
- [react-native-gifted-charts](https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts) for visualizations
- TypeScript (strict)

---

## Quick start

### Prerequisites

Node.js 18+ and npm.

### Install and run

```bash
npm install
npx expo start
```

Then choose your target from the Expo dev tools:

- **Android** — press `a` or run `npm run android`
- **iOS** — press `i` or run `npm run ios` (macOS + Xcode required)
- **Web** — press `w` or run `npm run web`
- **Device** — scan the QR code with [Expo Go](https://expo.dev/go)

### Lint

```bash
npm run lint
```

---

## Project structure

```
src/
├── app/           # Routes (expo-router)
├── screens/       # Screen implementations
├── components/    # UI, charts, transaction list
├── services/      # Data access (SQLite + facades)
├── context/       # React context (planned)
├── hooks/         # Custom hooks (planned)
├── types/         # Domain types
└── utils/         # Formatting and stats helpers
```

Routes stay thin; screens hold the feature logic. See the full breakdown in [docs/PROJECT_ARCHITECTURE.md](docs/PROJECT_ARCHITECTURE.md).

---

## Documentation

| Document | Description |
|----------|-------------|
| [Project Architecture](docs/PROJECT_ARCHITECTURE.md) | Layers, routing, data flow, implementation status |
| [Data Model](docs/DATA_MODEL.md) | SQLite schema, types, categories |
| [Development Guide](docs/DEVELOPMENT.md) | Setup, conventions, troubleshooting |

---

## Architecture at a glance

```
┌─────────────────────────────────────────────┐
│  src/app          expo-router routes        │
├─────────────────────────────────────────────┤
│  src/screens      Home, Add Transaction, …  │
├─────────────────────────────────────────────┤
│  src/components   UI · Charts · Transactions│
├─────────────────────────────────────────────┤
│  src/services     transactions · categories │
├─────────────────────────────────────────────┤
│  expo-sqlite      findex.db (local)         │
└─────────────────────────────────────────────┘
```

Screens currently fetch data directly from the service layer. Context providers and hooks are scaffolded for future shared state.

---

## Screenshots / demo flow

1. **Home** — summary cards (balance, income, expenses, savings rate), charts, last 5 transactions
2. **Add Transaction** — type, category, amount, description, date → saved to SQLite
3. **Stats / Settings** — placeholders (coming soon)

---

## Configuration

App metadata and plugins are in `app.json`:

- App name: **FinDash**
- URL scheme: `findash`
- Plugins: `expo-router`, `expo-splash-screen`, `expo-sqlite`
- Typed routes and React Compiler enabled

---

## License

Private project.
