# 🚀 Sideline Pinas - Deployment Guide

## 🌟 Overview
This guide will help you deploy the Sideline Pinas digital marketplace to production environments.

## 📋 Prerequisites

### Required Accounts
- [ ] **GitHub Account** - For source code management
- [ ] **Vercel Account** - For frontend deployment
- [ ] **Railway Account** - For backend deployment
- [ ] **MongoDB Atlas Account** - For database hosting
- [ ] **Cloudinary Account** - For image hosting

### Required Tools
- [ ] **Node.js** (v18 or higher)
- [ ] **Git** - For version control
- [ ] **npm** - For package management

## 🗂️ Project Structure
```
digital-marketplace/
├── frontend/          # React.js application
├── backend/           # Node.js API server
├── database/          # Database schemas
├── contracts/         # Smart contracts
├── docs/             # Documentation
└── DEPLOYMENT.md     # This file
```

## 🎯 Deployment Strategy

### Phase 1: Database Setup (MongoDB Atlas)
1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com/)
   - Create a new cluster (FREE tier available)
   - Set up database user and password
   - Whitelist your IP addresses (0.0.0.0/0 for now)

2. **Get Connection String**
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/sideline_pinas`

### Phase 2: Backend Deployment (Railway)
1. **Create Railway Account**
   - Go to [Railway](https://railway.app/)
   - Sign up with GitHub

2. **Deploy Backend**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login to Railway
   railway login
   
   # Navigate to backend directory
   cd backend
   
   # Deploy to Railway
   railway up
   ```

3. **Set Environment Variables**
   - Add all variables from `.env.example`
   - Set `MONGODB_URI` to your Atlas connection string
   - Set `NODE_ENV=production`

### Phase 3: Frontend Deployment (Vercel)
1. **Create Vercel Account**
   - Go to [Vercel](https://vercel.com/)
   - Sign up with GitHub

2. **Deploy Frontend**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Navigate to frontend directory
   cd frontend
   
   # Deploy to Vercel
   vercel --prod
   ```

3. **Set Environment Variables**
   - Add all variables from `.env.example`
   - Set `REACT_APP_API_URL` to your Railway backend URL

## 🔧 Configuration Files

### Frontend (Vercel)
- `vercel.json` - Vercel configuration
- `.env.example` - Environment variables template

### Backend (Railway)
- `railway.json` - Railway configuration
- `Dockerfile` - Container configuration
- `.env.example` - Environment variables template

## 🌐 Environment Variables

### Frontend (.env.local)
```env
REACT_APP_API_URL=https://your-backend-url.railway.app/api
REACT_APP_SOCKET_URL=https://your-backend-url.railway.app
REACT_APP_APP_NAME=Sideline Pinas
REACT_APP_VERSION=1.0.0
REACT_APP_ENVIRONMENT=production
```

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sideline_pinas
JWT_SECRET=your-super-secret-jwt-key
CLIENT_URL=https://your-frontend-url.vercel.app
```

## 🚀 Quick Deploy Commands

### 1. Clone and Setup
```bash
git clone https://github.com/your-username/sideline-pinas.git
cd sideline-pinas
```

### 2. Install Dependencies
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 3. Build Frontend
```bash
cd frontend
npm run build
```

### 4. Deploy Backend
```bash
cd backend
railway up
```

### 5. Deploy Frontend
```bash
cd frontend
vercel --prod
```

## 📊 Monitoring & Analytics

### Health Checks
- Backend: `https://your-backend-url.railway.app/api/health`
- Frontend: `https://your-frontend-url.vercel.app`

### Logging
- Railway provides built-in logging
- Vercel provides function logs

## 🔐 Security Checklist

- [ ] Environment variables are properly set
- [ ] Database connection is secure
- [ ] API endpoints are protected
- [ ] CORS is configured correctly
- [ ] Rate limiting is enabled
- [ ] Input validation is implemented

## 🚨 Troubleshooting

### Common Issues
1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check environment variables

2. **Database Connection Issues**
   - Verify MongoDB Atlas connection string
   - Check database user permissions
   - Ensure IP whitelist is configured

3. **API Connection Issues**
   - Check CORS configuration
   - Verify API URL in frontend
   - Check network connectivity

## 📈 Scaling Considerations

### Performance Optimization
- Enable caching for static assets
- Use CDN for file uploads
- Implement database indexing
- Monitor API response times

### Cost Optimization
- Use free tiers initially
- Monitor usage and scale as needed
- Implement proper caching strategies

## 🎉 Post-Deployment

### 1. Test All Features
- [ ] User registration/login
- [ ] Product uploads
- [ ] Payment processing
- [ ] NFT functionality
- [ ] Real-time features

### 2. Set Up Monitoring
- [ ] Uptime monitoring
- [ ] Error tracking
- [ ] Performance monitoring
- [ ] User analytics

### 3. Backup Strategy
- [ ] Database backups
- [ ] Code repository backups
- [ ] Environment variable backups

## 🆘 Support

For deployment issues, contact:
- **Email**: support@sidelinepinas.com
- **Documentation**: Check the `/docs` folder
- **Issues**: Create GitHub issues

---

**🌟 Happy Deploying! Welcome to the Sideline Pinas family! 🇵🇭**
