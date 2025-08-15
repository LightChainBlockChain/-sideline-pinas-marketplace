import React from 'react';
import './App.css';
import { useAuthToken, useWalletLinking, useMining } from './hooks/walletAndMining';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const { token, setToken } = useAuthToken();
  const { linkWithMetaMask } = useWalletLinking(API_BASE, token);
  const { claimDaily } = useMining(API_BASE, token);
  const [address, setAddress] = React.useState<string>('');
  const [miningInfo, setMiningInfo] = React.useState<any>(null);

  const handleFakeLogin = async () => {
    const fake = window.prompt('Enter JWT token (temporary demo)');
    if (fake) setToken(fake);
  };
  const onLinkWallet = async () => {
    try {
      const addr = await linkWithMetaMask();
      setAddress(addr);
      alert('Wallet linked: ' + addr);
    } catch (e: any) {
      alert('Wallet link failed: ' + (e?.message || 'unknown error'));
    }
  };
  const onClaim = async () => {
    try {
      const data = await claimDaily();
      setMiningInfo(data);
      alert('Claimed ' + data.reward + ' tokens. Balance: ' + data.tokenBalance);
    } catch (e: any) {
      alert('Claim failed: ' + (e.response?.data?.message || e.message));
    }
  };

  return (
    <div className="App">
      <header className="min-h-screen bg-gradient-to-br from-filipino-blue via-primary-600 to-secondary-500 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold font-display mb-4">
              Sideline_Pinas
            </h1>
            <p className="text-xl md:text-2xl font-light opacity-90 mb-2">
              The Premier Digital Marketplace for Filipino Sideliners
            </p>
            <p className="text-lg opacity-75">
              Buy, sell, and trade digital products including NFTs, digital art, and more
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-secondary-500 text-primary-800 px-8 py-3 rounded-lg font-semibold hover:bg-secondary-400 transition-colors duration-200 shadow-lg">
              Get Started
            </button>
            <button className="border-2 border-secondary-400 text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary-500 hover:text-primary-800 transition-colors duration-200">
              Learn More
            </button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-3xl mb-4">🖼️</div>
              <h3 className="text-lg font-semibold mb-2">NFT Marketplace</h3>
              <p className="text-sm opacity-80">Trade unique digital assets and collectibles</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-lg font-semibold mb-2">Digital Art</h3>
              <p className="text-sm opacity-80">Showcase and sell your creative works</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold mb-2">Real-time Bidding</h3>
              <p className="text-sm opacity-80">Participate in live auctions</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-sm opacity-75 mb-4">
              Supporting all major Philippine payment methods
            </p>
            <div className="flex justify-center items-center gap-6 flex-wrap">
              <span className="bg-secondary-400/30 border border-secondary-400 px-4 py-2 rounded-full text-sm font-medium">GCash</span>
              <span className="bg-secondary-400/30 border border-secondary-400 px-4 py-2 rounded-full text-sm font-medium">PayMaya</span>
              <span className="bg-secondary-400/30 border border-secondary-400 px-4 py-2 rounded-full text-sm font-medium">UnionBank</span>
              <span className="bg-secondary-400/30 border border-secondary-400 px-4 py-2 rounded-full text-sm font-medium">BPI</span>
              <span className="bg-secondary-400/30 border border-secondary-400 px-4 py-2 rounded-full text-sm font-medium">Cards</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for Filipino Sideliners
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of Filipino entrepreneurs who are building their digital sideline businesses 
              with our secure, easy-to-use platform designed specifically for the Philippine market.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Community-Driven</h3>
              <p className="text-gray-600">Built by Filipinos, for Filipinos</p>
            </div>
            
            <div className="text-center">
              <div className="bg-secondary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Low Fees</h3>
              <p className="text-gray-600">Only 10% platform fee on sales</p>
            </div>
            
            <div className="text-center">
              <div className="bg-accent-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure</h3>
              <p className="text-gray-600">Bank-level security for all transactions</p>
            </div>
            
            <div className="text-center">
              <div className="bg-success-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🇵🇭</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Local Support</h3>
              <p className="text-gray-600">Customer support in Filipino and English</p>
            </div>
          </div>
        </div>
      </main>

      {/* Developer panel (temporary) */}
      <section className="p-6 bg-white border-t">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold mb-2">Developer Panel (temporary)</h2>
          <div className="flex gap-3 flex-wrap items-center mb-2">
            <button className="px-4 py-2 bg-gray-900 text-white rounded" onClick={handleFakeLogin}>Set JWT Token (temporary)</button>
            <span>Token set: {token ? 'yes' : 'no'}</span>
          </div>
          <div className="flex gap-3 flex-wrap items-center mb-2">
            <button className="px-4 py-2 bg-primary-600 text-white rounded disabled:opacity-50" onClick={onLinkWallet} disabled={!token}>Link MetaMask Wallet</button>
            <span>Linked address: {address || '—'}</span>
          </div>
          <div className="flex gap-3 flex-wrap items-center">
            <button className="px-4 py-2 bg-secondary-500 text-primary-900 rounded disabled:opacity-50" onClick={onClaim} disabled={!token}>Claim Daily Mining Reward</button>
            {miningInfo && (
              <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{JSON.stringify(miningInfo, null, 2)}</pre>
            )}
          </div>
        </div>
      </section>
      
      <footer className="bg-primary-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-secondary-400">Sideline_Pinas</h3>
              <p className="text-gray-400 text-sm">
                The premier digital marketplace for Filipino sideliners to buy, sell, and trade digital products.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-300">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Marketplace</li>
                <li>NFT Trading</li>
                <li>Digital Art</li>
                <li>Auctions</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-300">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Community</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-300">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
            <p>&copy; 2025 Sideline_Pinas. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
