# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Repository overview
- Monorepo with two Node.js projects:
  - backend: Express API with MongoDB via Mongoose, modular routes, and production Dockerfile.
  - frontend: React (Create React App) with TypeScript and Tailwind CSS.
- Refer to README.md for product context and domain goals (DID/SSI, NFTs, payments, auctions).

Common commands (PowerShell, Windows)
Note: Both projects use npm (package-lock.json present). Run commands from each subdirectory.

Frontend (frontend/)
- Install deps: npm ci
- Start dev server (port 3000, proxies API to http://localhost:5000): npm start
- Lint: npm run lint
- Lint with fixes: npm run lint:fix
- Format with Prettier: npm run format
- Run all tests (watch mode): npm test
- Run a single test file: npm test -- src\path\to\MyComponent.test.tsx
- Run tests matching a name: npm test -- --testNamePattern "partial name"
- Build production bundle: npm run build

Backend (backend/)
- Install deps: npm ci
- Start (prod): npm start
- Start (dev with nodemon): npm run dev
- Seed sample data (if scripts/seed.js exists in your branch): npm run seed
- Run tests (Jest): npm test
- Run a single test file: npx jest path\to\my.test.js
- Run tests matching a name: npx jest -t "partial name"

Docker (backend only)
- Build image: docker build -t sidelinepinas-backend:latest ./backend
- Run container (exposes 5000): docker run --rm -p 5000:5000 --env-file .env sidelinepinas-backend:latest

Environment variables (observed in code)
- PLATFORM_FEE_PERCENTAGE: Percentage commission used throughout routes (defaults to 10 if unset).
- PAYMENT_PROCESSING_FEE: Additional processing fee percentage in payments route (defaults to 2.5 if unset).
- JWT_SECRET: Used to sign tokens in auth routes (fallback present but set a proper secret).
- JWT_EXPIRE: Token expiration (e.g., 7d).
Note: Mongoose is used by the backend; ensure your server configuration sets the MongoDB connection string (e.g., MONGO_URI) even though it is not referenced in the snippets shown here.

Recommended dev workflow
- Terminal A: cd backend; npm ci; npm run dev (API on http://localhost:5000)
- Terminal B: cd frontend; npm ci; npm start (CRA on http://localhost:3000, proxies to backend via package.json "proxy")

High-level architecture
Backend (Express + Mongoose)
- Routes (backend/routes/)
  - auth.js: Registration/login endpoints; issues JWT using JWT_SECRET and JWT_EXPIRE. Replace TODOs with real user lookup and password verification.
  - products.js: CRUD-style handlers. Platform fee math derived from PLATFORM_FEE_PERCENTAGE; returns earnings breakdowns in responses.
  - bids.js: Auction-style bidding endpoints that consistently compute seller proceeds minus platform commission.
  - payments.js: Centralized commission/fee calculation and example transaction flow. Uses PLATFORM_FEE_PERCENTAGE and PAYMENT_PROCESSING_FEE to compute commission, processing fee, and seller amount; endpoints for processing payments, computing fee breakdowns, and retrieving transaction summaries.
  - nfts.js: NFT listing/minting endpoints mirroring products/fees flows; intended to integrate with chain and metadata storage.
  - users.js: Profile and earnings summary endpoints for creators ("Sideliners").
- Models (backend/models/)
  - User.js: Rich profile with validation, roles, preferences, payment methods, and wallet/escrow fields. Password hashing in pre-save, comparePassword instance method, and useful virtuals (fullName, displayName). Multiple indexes for common queries.
  - Product.js: Digital goods/NFT product with pricing, auctions, files/images, specifications, NFT metadata, status/visibility, statistics, reviews, and multiple indexes (including text search on title/description/tags). Virtuals expose auction state (timeRemaining, isAuctionActive). Static methods for getTrending and getFeatured encapsulate common query patterns with sorting and population.
- Cross-cutting logic
  - Commission and fee policies are environment-driven and consistently referenced across routes. This makes fee changes centrally configurable without code edits.
  - Real-time support (socket.io) is included as a dependency, though no socket server usage is shown in the provided files; expect server.js to initialize it alongside Express.
  - Security middlewares (helmet, express-rate-limit, mongo-sanitize, xss) are declared as dependencies and should be applied in server initialization.
- Deployment
  - Dockerfile is a multi-stage Node 18 Alpine build using dumb-init, runs as a non-root user, exposes 5000, and defines a healthcheck calling healthcheck.js. Ensure healthcheck.js exists or adjust the Dockerfile.

Frontend (React + TypeScript + Tailwind)
- Tooling
  - CRA (react-scripts) with TypeScript strict mode, eslint + prettier, and Tailwind CSS configured via tailwind.config.js and postcss.config.js.
  - package.json sets proxy to http://localhost:5000 to forward API calls in development.
- Theming
  - Tailwind theme extends with Philippine flag-inspired palette, typography, spacing, and animation presets to match brand identity.

Conventions and notes for future changes
- Keep fee and payout calculations centralized via environment variables; update payments.js first when policy changes, then ensure products/bids/nfts endpoints remain consistent with the same variables.
- When adding new routes that return monetary breakdowns, follow the pattern in payments.js to ensure commission and processing fees are represented clearly and rounded consistently before returning to clients.
- If you introduce real-time features (auctions/live bids), wire up socket.io in server.js and keep bid state updates idempotent. Reflect the same fee math on the server side rather than trusting client-side calculations.

