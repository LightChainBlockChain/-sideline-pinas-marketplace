# Sideline Pinas - Digital Marketplace

[![CI](https://github.com/LightChainBlockChain/-sideline-pinas-marketplace/actions/workflows/ci.yml/badge.svg)](https://github.com/LightChainBlockChain/-sideline-pinas-marketplace/actions/workflows/ci.yml)

A comprehensive digital marketplace for the Philippines where Sideliners can buy, sell, and trade digital products, with privacy-preserving identity (DID/SSI) powered by VeriToken.

## 🚀 Features

- Privacy-Preserving Identity (DID/SSI): Verifiable credentials for merchants and customers with selective disclosure
- Product Authenticity & Provenance: Tamper-evident product records and supply-chain attestations
- Trusted Transactions: Cryptographically signed transaction attestations and dispute evidence
- Decentralized Reputation: Credential-backed ratings that resist manipulation
- Digital Assets Marketplace: Buy/sell digital goods and NFTs with provenance guarantees
- Auctions & Real-time Commerce: Real-time bidding and live updates
- Local Payments First: GCash, PayMaya, banks, and cards with PHP currency support
- Filipino-First UX: Localization for language, compliance, and time zones
- Sustainable Architecture: Versioned schemas/APIs, testable modules, and observability-by-default
- Transparent Fees: Clear platform fees with on-chain or auditable accounting

## 🛠️ Tech Stack

### Frontend
- React.js (TypeScript)
- Tailwind CSS
- Web3.js (blockchain interactions)
- Socket.io (real-time)

### Backend
- Node.js (Express)
- MongoDB
- JWT authentication
- Multer (file uploads)
- Socket.io (real-time)

### Blockchain
- EVM chain (e.g., Polygon) for marketplace and asset smart contracts
- DID Methods & Verifiable Credentials for identity and trust
- IPFS/Filecoin for decentralized content storage
- Anchoring model: off-chain credentials with on-chain anchors for auditability
- Optional account abstraction for better UX and gas sponsorship
- Interoperability-first design (standards-aligned schemas, versioned contracts)

### Payment Integration
- GCash, PayMaya, UnionBank, BPI, Stripe

## 📁 Project Structure

```
digital-marketplace/
├── frontend/          # React frontend application
├── backend/           # Node.js backend API
├── database/          # Database schemas and migrations
├── contracts/         # Smart contracts for NFTs
├── docs/              # Documentation and API specs
└── README.md          # This file
```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies for both frontend and backend
3. Set up environment variables
4. Run database migrations
5. Start the development servers

## 🧑‍💻 Local Development

Environment variables
- Backend: see backend/.env.example (copy to backend/.env and adjust)
- Frontend: see frontend/.env.example (for CRA, create frontend/.env.local as needed)

Run the apps
- Terminal A:
  - cd backend
  - npm ci
  - npm run dev (API at http://localhost:5000)
- Terminal B:
  - cd frontend
  - npm ci
  - npm start (CRA at http://localhost:3000, proxies to backend)

Testing & linting
- Backend tests (Jest):
  - cd backend; npm test
  - Single test: npx jest __tests__/health.test.js
- Frontend tests (react-scripts):
  - cd frontend; npm test
  - Single test file: npm test -- src\\path\\to\\MyComponent.test.tsx
- Frontend lint/format:
  - npm run lint; npm run lint:fix; npm run format

## 🔐 Security & Privacy

- JWT-based authentication
- File upload validation
- Rate limiting and CSRF protection
- Input sanitization
- Secure payment processing
- DID/SSI security: selective disclosure, local key storage, ZK-proof readiness

## 🇵🇭 Philippine Market Focus

- Peso (PHP) as primary currency
- Local payment method integration
- Filipino language support
- Local time zone handling
- PH-specific compliance

## 📚 Documentation

- VeriToken DID/SSI integration: docs/VERITOKEN_README.md

## 📄 License

This project is proprietary software for Sideline Pinas.
