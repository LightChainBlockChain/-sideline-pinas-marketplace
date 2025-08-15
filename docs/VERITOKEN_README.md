# Sideline Pinas powered by VeriToken (DID/SSI)

A privacy-preserving identity and credentials layer integrated with the Sideline Pinas digital marketplace. This document consolidates the decentralized identity (DID) and self-sovereign identity (SSI) concepts, architecture, and example usage for a sustainable integration.

## Overview

VeriToken Marketplace extends DID/VC standards (W3C DID, Verifiable Credentials) to support secure marketplace flows:
- Merchant and customer verification with selective disclosure
- Product authenticity and supply-chain provenance
- Transaction attestations for trust and compliance

This enables secure, privacy-preserving commerce using verifiable credentials and decentralized identifiers without over-collecting personal data.

## Architecture (Conceptual)

```
VeriToken-Marketplace/
├── src/
│   ├── core/                # Core DID functionality
│   │   └── did.js           # Base DID implementation
│   ├── credentials/         # Verifiable Credentials
│   │   └── verifiable-credential.js
│   ├── marketplace/         # Marketplace-specific schemas
│   │   └── schemas.js       # Entity types and validation
│   ├── cli.js               # Command-line interface (optional)
│   └── index.js             # Main marketplace system entry
├── storage/                 # Local storage for DIDs and credentials
├── tests/                   # Test suites
├── docs/                    # Documentation
└── examples/                # Usage examples
```

Note: Filenames are representative. Align with your actual code structure.

## Core Capabilities

- Marketplace DID Schemas:
  - MerchantDID: business identity, verification levels, reputation
  - CustomerDID: KYC levels, privacy controls
  - ProductDID: authenticity, supply-chain tracking
  - TransactionDID: transaction attestation/verification

- Credential Issuance System:
  - Merchant, Customer, Product, and Transaction credentials

- Wallet & Onboarding:
  - MarketplaceWallet with multi-identity support
  - Connection management and credential storage
  - Selective disclosure and ZK-proof generation (conceptual)

- API Endpoints (conceptual):
  - Identity, Wallet, Onboarding, Product Authenticity, Credentials, Transactions, Stats

## Security Features

- Ed25519 signatures
- Local key storage (private keys remain on device)
- Selective disclosure (least-privilege sharing)
- Zero-knowledge proofs (where supported)
- Decentralized architecture (no single point of failure)

## Sample Output (Demo)

```
🚀 VeriToken Marketplace Demo

1. Creating merchant...
✅ Merchant created: did:veritoken-merchant:mainnet:f076719f-40d9-4ce8-9309-44df1f61ed61

2. Creating customer...
✅ Customer created: did:veritoken-customer:mainnet:04667199-9070-4dfa-9029-8d0a5296d662

3. Creating product...
✅ Product created: did:veritoken-product:mainnet:17c0a847-f232-4cc9-9397-bcc1ae68ee0e

4. Issuing merchant verification credential...
✅ Merchant credential issued: urn:uuid:6064686e-d596-4f65-a180-444fbd1887ae

5. Creating transaction...
✅ Transaction created: did:veritoken-transaction:mainnet:66cb13dc-198c-4363-b13a-bc34cbfcd27f

6. Completing transaction...
✅ Transaction completed with attestation: urn:uuid:ed879b99-3142-47af-a45b-f71da5c8eb95

7. Marketplace Statistics:
📊 Total Entities: 4
📊 Total Credentials: 2
📊 Total Transactions: 1
📊 Entity Breakdown: { merchant: 1, customer: 1, product: 1, transaction: 1 }

🎉 Demo completed successfully!
```

## Development Roadmap (Snapshot)

- Phase 2: Core Integration — Completed
  - Wallet integration, onboarding, product authenticity, basic APIs
- Phase 3: TikTok-inspired marketplace — Completed
  - Creator profiles, short-form content, affiliate tracking, social features, analytics, REST API
- Phase 4: Advanced Features — Next
  - Advanced ZK proofs, decentralized reputation, interoperability, privacy controls, smart contracts, mobile wallet, dispute resolution, AI recommendations

## Sustainable Integration Guidance

- Separation of concerns: keep DID/SSI logic isolated from marketplace business logic
- Clear interfaces: define schemas and endpoints with versioning
- Testability: unit-test DID operations and credential flows
- Compliance: document data handling and retention policies
- Observability: add metrics on credential issuance/verification (no PII)
- Backwards compatibility: version credentials and APIs to allow gradual upgrades

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m "feat: add amazing feature"`
4. Push branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

See the project’s root LICENSE for licensing terms.

