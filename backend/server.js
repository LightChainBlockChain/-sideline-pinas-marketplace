const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const nftRoutes = require('./routes/nfts');
const bidRoutes = require('./routes/bids');
const paymentRoutes = require('./routes/payments');
const adminRoutes = require('./routes/admin');
const walletRoutes = require('./routes/wallet');
const miningRoutes = require('./routes/mining');
const faucetRoutes = require('./routes/faucet');

// Security middleware
app.use(helmet());
app.use(compression());
app.use(mongoSanitize());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static('uploads'));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sideline-pinas', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('🗄️  Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/nfts', nftRoutes);
app.use('/api/bids', bidRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/mining', miningRoutes);
app.use('/api/faucet', faucetRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Sideline_Pinas - Decentralized Marketplace for the Philippines 🇵🇭',
    description: 'Decentralized Marketplace for the Philippines',
    tagline: 'Powered by VeriToken',
    features: {
      '🔐 Decentralized Identity': 'Secure identity verification using blockchain technology and VeriToken integration',
      '💰 Secure Transactions': 'Safe and transparent transactions with blockchain-powered security',
      '🌐 Philippines-Focused': 'Tailored services and solutions specifically for Filipino entrepreneurs and businesses',
      '⚡ VeriToken Integration': 'Native integration with VeriToken for seamless identity and payment processing'
    },
    endpoints: {
      'GET /': 'Welcome message',
      'GET /health': 'Health check',
      'GET /api/marketplace': 'Marketplace features',
      'GET /api/identity': 'Identity verification',
      'GET /api/status': 'Service status'
    },
    version: '2.0.0',
    stack: 'Built with Express.js',
    deployment: 'Deployed on Multiple Platforms',
    mission: '🏆 Supporting Filipino Innovation Through Blockchain Technology'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Sideline_Pinas API is running',
    timestamp: new Date().toISOString(),
    version: '2.0.0'
  });
});

// API endpoints for marketplace info
app.get('/api/marketplace', (req, res) => {
  res.json({
    features: ['NFT Trading', 'Digital Art Marketplace', 'Real-time Auctions', 'Filipino Payment Methods'],
    paymentMethods: ['GCash', 'PayMaya', 'UnionBank', 'BPI', 'Credit/Debit Cards'],
    status: 'active'
  });
});

app.get('/api/identity', (req, res) => {
  res.json({
    verification: 'VeriToken Integration',
    blockchain: 'Ethereum',
    security: 'Multi-layer authentication'
  });
});

app.get('/api/status', (req, res) => {
  res.json({
    service: 'operational',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Socket.io for real-time bidding
io.on('connection', (socket) => {
  console.log('👤 User connected:', socket.id);

  socket.on('join-auction', (productId) => {
    socket.join(`auction-${productId}`);
    console.log(`👤 User ${socket.id} joined auction for product ${productId}`);
  });

  socket.on('leave-auction', (productId) => {
    socket.leave(`auction-${productId}`);
    console.log(`👤 User ${socket.id} left auction for product ${productId}`);
  });

  socket.on('new-bid', (data) => {
    // Broadcast new bid to all users in the auction room
    socket.to(`auction-${data.productId}`).emit('bid-update', data);
  });

  socket.on('disconnect', () => {
    console.log('👤 User disconnected:', socket.id);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Sideline_Pinas server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
