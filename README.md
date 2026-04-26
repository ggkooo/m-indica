# M Indica Pra Mim

Mobile marketplace app built with Expo, React Native, TypeScript, and Expo Router.

This project focuses on connecting users with service providers, including:
- service discovery
- provider profiles
- service details and reviews
- in-app chat flows
- account management (profile, notifications, payment methods, security, terms)

## Tech Stack

- Expo SDK 54
- React Native 0.81
- React 19
- TypeScript 5
- Expo Router (file-based routing)
- Expo modules (notifications, location, document picker, image picker, haptics)

## Main Features

- Marketplace catalog by category
- Provider detail pages with services and reviews
- Service detail pages with ratings and review submissions
- Chat and mediation-oriented conversation flows
- Account area with:
- personal data
- notification preferences
- payment methods (card list, secure reveal/remove flow, add-card modal)
- security and terms screens

## Project Structure

Key directories:

- `app/`: screens and routes (Expo Router)
- `components/`: reusable UI and feature-specific components
- `context/`: global state and marketplace domain logic
- `hooks/`: screen and utility hooks
- `data/`: mock data and domain data composition
- `theme/`: shared theme tokens and style helpers
- `assets/`: icons and images

Notable route groups:

- `app/(tabs)/`: tab navigation area
- `app/account/`: account screens
- `app/admin/`: admin-related screens
- `app/chat/`: chat route(s)
- `app/provider/`: provider route(s)
- `app/service/`: service route(s)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run start
```

### 3. Run on a platform

```bash
npm run android
npm run ios
npm run web
```

## Scripts

- `npm run start`: start Expo dev server
- `npm run android`: run/build Android app
- `npm run ios`: run/build iOS app
- `npm run web`: run web target
- `npm run lint`: run linting via Expo config

## Data and State Management

- Marketplace data is provided by `MarketplaceContext`.
- Domain hooks under `context/marketplace/` organize catalog, chat, and user settings logic.
- Mock data is split into domain modules and re-exported through the data layer.

## UI/UX Notes

- Shared profile-oriented visual language is centralized through `theme/profileTheme.ts`.
- Reusable interaction components (for example, pressable scaling and staggered animation wrappers) help keep behavior consistent across screens.
- Payment methods include a protected details flow and modal-based card creation.

## Lint and Type Check

Use these checks before opening a PR:

```bash
npm run lint
npx tsc --noEmit
```

## Current Status

This repository currently contains an actively evolving feature branch with large refactors and UI/UX enhancements across routing, components, hooks, and account/payment flows.
