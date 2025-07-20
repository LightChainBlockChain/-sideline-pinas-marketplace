# 🌟 Sideline Pinas - Vercel Environment Variables Setup Script
# Run this script to configure all production environment variables

Write-Host "🚀 Setting up Sideline Pinas production environment variables..." -ForegroundColor Green

# Essential API Configuration
Write-Host "📡 Configuring API endpoints..." -ForegroundColor Yellow
vercel env add REACT_APP_API_URL production <<< "https://sideline-pilipinas-backend.railway.app/api"
vercel env add REACT_APP_SOCKET_URL production <<< "https://sideline-pilipinas-backend.railway.app"

# Application Settings
Write-Host "⚙️ Configuring application settings..." -ForegroundColor Yellow
vercel env add REACT_APP_ENVIRONMENT production <<< "production"
vercel env add REACT_APP_APP_NAME production <<< "Sideline Pinas"
vercel env add REACT_APP_VERSION production <<< "2.0.0"
vercel env add REACT_APP_SITE_URL production <<< "https://sideline-pinas-marketplace-r4lfu6k6f-sidelinepinas.vercel.app"

# IPFS Configuration (default public gateway)
Write-Host "🌐 Configuring IPFS..." -ForegroundColor Yellow
vercel env add REACT_APP_IPFS_GATEWAY production <<< "https://ipfs.io/ipfs/"

# Web3 Configuration (Ethereum Mainnet)
Write-Host "⛓️ Configuring Web3..." -ForegroundColor Yellow
vercel env add REACT_APP_NETWORK_ID production <<< "1"
vercel env add REACT_APP_CHAIN_ID production <<< "1"

# Feature Flags
Write-Host "🎛️ Configuring feature flags..." -ForegroundColor Yellow
vercel env add REACT_APP_ENABLE_NFT_TRADING production <<< "true"
vercel env add REACT_APP_ENABLE_AUCTION_SYSTEM production <<< "true"
vercel env add REACT_APP_ENABLE_WALLET_CONNECT production <<< "true"

Write-Host "✅ Basic environment variables configured!" -ForegroundColor Green
Write-Host ""
Write-Host "🔑 Next steps:" -ForegroundColor Cyan
Write-Host "1. Set up your Infura project ID for Web3: vercel env add REACT_APP_INFURA_PROJECT_ID production"
Write-Host "2. Configure Stripe publishable key: vercel env add REACT_APP_STRIPE_PUBLISHABLE_KEY production"
Write-Host "3. Set up GCash merchant ID: vercel env add REACT_APP_GCASH_MERCHANT_ID production"
Write-Host "4. Configure PayMaya public key: vercel env add REACT_APP_PAYMAYA_PUBLIC_KEY production"
Write-Host "5. Set up Pinata API key for IPFS: vercel env add REACT_APP_PINATA_API_KEY production"
Write-Host "6. Configure Google Analytics: vercel env add REACT_APP_GOOGLE_ANALYTICS_ID production"
Write-Host ""
Write-Host "💡 After configuring environment variables, run: vercel --prod" -ForegroundColor Blue
