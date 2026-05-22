# FinDash Project Architecture

## Overview
FinDash is a finance tracker built as an Expo app with React Native and `expo-router`. The app is organized around a clear separation of concerns:

- UI and navigation in `src/app`
- Stateful domain logic in `src/context`
- Screen-level views in `src/screens`
- Reusable UI building blocks in `src/components`
- Data access and persistence in `src/services`
- Shared business logic and utilities in `src/hooks` and `src/utils`
- Domain types in `src/types`

The project also contains an `app-example` folder with starter app scaffolding, while the actual application implementation lives under `src/`.

---

## Core Architecture

### 1. Routing and navigation

The app uses Expo Router's file-based routing under `src/app`:

- `src/app/_layout.tsx` configures the main navigation stack.
- `src/app/add-transaction.tsx` is a dedicated screen for adding new transactions.
- `src/app/(tabs)/_layout.tsx` defines the bottom tabs layout and tab navigation.
- `src/app/(tabs)/index.tsx`, `settings.tsx`, and `stats.tsx` are the main tab screens.
- `src/app/(tabs)/home.web.css` and `index.web.tsx` add web-specific styling and behavior.

This structure keeps route definitions close to the screen files and enables cross-platform navigation for mobile and web.

### 2. Screens

The main application screens are placed in `src/screens` and represent the app’s feature surfaces:

- `HomeScreen.tsx` – Primary dashboard for today’s balance, recent transactions, and quick overview.
- `AddTransactionScreen.tsx` – Form screen to create or edit transactions.
- `SettingsScreen.tsx` – Application settings and preferences.
- `StatsScreen.tsx` – Financial charts, reports, and trend summaries.
- `TransactionDetailsScreen.tsx` – Detailed view for a selected transaction.

These screens are the main entry points for user flows and orchestrate data from context, services, and hooks.

### 3. State management and context

Shared app state is intended to be managed through the `src/context` directory:

- `CategoriesContext.tsx` – Category data and category-related state.
- `ThemeContext.tsx` – Theme and appearance settings for the app.
- `TransactionsContext.tsx` – Transaction data and the transaction state lifecycle.

Context providers wrap screen and component trees so UI can consume app state without deep prop drilling.

### 4. Data services and persistence

The `src/services` layer handles data access, persistence, and domain operations:

- `db.ts` – Database initialization, connection, and persistence helpers.
- `transactions.ts` – Transaction-specific CRUD operations and business rules.
- `categories.ts` – Category data operations and helper utilities.

This layer isolates storage concerns (likely SQLite or Expo data persistence) from UI and state logic.

### 5. Reusable components

`src/components` contains reusable UI components and charts:

- `src/components/ui` – Generic UI building blocks like `Button`, `Card`, `DateInputField`, `DropdownInputField`, `InputField`, `Modal`, and `SegmentedControl`.
- `src/components/charts` – Chart components such as `CategoryPieChart` and `IncomeExpenseChart`.
- `src/components/transactions` – Transaction-specific list and item components like `TransactionList` and `TransactionItem`.

This component structure supports consistent visual patterns across the app while keeping feature screens lightweight.

### 6. Domain models and types

Type definitions live in `src/types` and define core domain entities:

- `Transaction.ts` – Transaction model shape.
- `Category.ts` – Category model shape.
- `Stats.ts` – Statistical result shapes used by charts and reports.

Using typed models promotes consistency across services, hooks, and components.

### 7. Custom hooks and utilities

Custom hooks and utilities support reusable logic:

- `src/hooks/useCategories.ts` – Category-related data fetching and state hooks.
- `src/hooks/useTransactions.ts` – Transaction-related hooks.
- `src/hooks/useStats.ts` – Stats computation and chart-ready data hooks.
- `src/hooks/useSQLite.ts` – Database or persistence hook abstraction.
- `src/utils/calculateStats.ts` – Business logic to derive financial statistics.
- `src/utils/formatCurrency.ts` and `src/utils/formatDate.ts` – Presentation utilities.
- `src/utils/constants.ts` – Shared constants used across the app.

These hooks and utilities encapsulate common logic so screens and components remain declarative.

---

## Cross-platform considerations

FinDash is designed for mobile and web through Expo and React Native Web:

- `src/app/_layout.web.tsx` and `src/app/(tabs)/_layout.web.tsx` provide platform-specific routing/layout behavior.
- `src/app/(tabs)/home.web.css` contains web-specific styling for the home tab.

This allows the same codebase to adapt UI and navigation for both native and browser targets.

---

## Project conventions

- Keep route-driven pages under `src/app`.
- Use `src/screens` for feature screen implementations and content-heavy views.
- Encapsulate state and business logic within `src/context`, `src/services`, and `src/hooks`.
- Keep shared presentational building blocks in `src/components`.
- Define domain data shapes in `src/types`.
- Isolate formatting and derived logic in `src/utils`.

This architecture supports iterative feature development while keeping the finance tracker modular and maintainable.
