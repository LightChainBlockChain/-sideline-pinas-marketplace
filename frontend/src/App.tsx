import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold font-display mb-4">
              Sideline Pilipinas
            </h1>
            <p className="text-xl md:text-2xl font-light opacity-90 mb-2">
              The Premier Digital Marketplace for Filipino Sideliners
            </p>
            <p className="text-lg opacity-75">
              Buy, sell, and trade digital products including NFTs, digital art, and more
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg">
              Get Started
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200">
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
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">GCash</span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">PayMaya</span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">UnionBank</span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">BPI</span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">Cards</span>
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
      
      <footer className="bg-dark-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Sideline Pilipinas</h3>
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
            <p>&copy; 2025 Sideline Pilipinas. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
