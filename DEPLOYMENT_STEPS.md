# 🚀 Sideline Pinas - Complete Deployment Guide

## Current Status
✅ **Backend Ready**: Configuration files created and environment variables set
✅ **Frontend Ready**: Vercel configuration in place
✅ **Database Ready**: MongoDB service running on Railway
⚠️ **Deployment Blocked**: Railway account needs plan upgrade

## 🎯 Step-by-Step Deployment

### Step 1: Upgrade Railway Plan
1. **Visit Railway Dashboard**: https://railway.app/account/plans
2. **Upgrade to Hobby Plan** ($5/month) or **Pro Plan** ($20/month)
3. **Verify upgrade** before proceeding

### Step 2: Deploy Backend to Railway
```bash
# Navigate to backend directory
cd backend

# Link to existing project
railway link

# Deploy the backend
railway up

# Set environment variables (after deployment)
railway variables set JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2024
railway variables set FRONTEND_URL=https://your-frontend-domain.vercel.app

# Generate domain for backend
railway domain

# Check deployment status
railway status
railway logs
```

### Step 3: Deploy Frontend to Vercel
```bash
# Navigate to frontend directory
cd frontend

# Install Vercel CLI if not installed
npm install -g vercel

# Deploy to Vercel
vercel --prod

# Set environment variables in Vercel dashboard
REACT_APP_API_URL=https://your-backend-domain.railway.app/api
REACT_APP_SOCKET_URL=https://your-backend-domain.railway.app
REACT_APP_APP_NAME=Sideline Pinas
REACT_APP_VERSION=1.0.0
REACT_APP_ENVIRONMENT=production
```

### Step 4: Update Cross-Origin Settings
After both deployments, update the CORS settings:

**Backend (Railway)**:
```bash
railway variables set FRONTEND_URL=https://your-frontend-domain.vercel.app
```

**Frontend (Vercel)**:
Update the API URL in Vercel dashboard environment variables.

### Step 5: Test Deployment
1. **Backend Health Check**: `https://your-backend-domain.railway.app/api/health`
2. **Frontend Access**: `https://your-frontend-domain.vercel.app`
3. **API Connection**: Test registration/login from frontend

## 📋 Environment Variables Summary

### Backend (Railway)
- `NODE_ENV=production`
- `PORT=5000`
- `MONGODB_URI=mongodb://mongo:DOqDRfcwljaihWUGwsbSMKhpVqCKNKyc@mongodb.railway.internal:27017/sideline-pinas`
- `JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2024`
- `JWT_EXPIRE=7d`
- `FRONTEND_URL=https://your-frontend-domain.vercel.app`
- `APP_NAME=Sideline Pinas`
- `APP_VERSION=1.0.0`
- `SUPPORT_EMAIL=support@sidelinepinas.com`

### Frontend (Vercel)
- `REACT_APP_API_URL=https://your-backend-domain.railway.app/api`
- `REACT_APP_SOCKET_URL=https://your-backend-domain.railway.app`
- `REACT_APP_APP_NAME=Sideline Pinas`
- `REACT_APP_VERSION=1.0.0`
- `REACT_APP_ENVIRONMENT=production`

## 🔧 Files Created/Updated
- ✅ `backend/.env.production` - Production environment variables
- ✅ `backend/healthcheck.js` - Docker health check script
- ✅ `backend/railway.json` - Updated with MongoDB URI and variables
- ✅ `frontend/vercel.json` - Already configured for deployment

## 🚨 Important Notes
1. **Plan Upgrade Required**: Railway free plan doesn't support multiple services
2. **Database Ready**: MongoDB is already running on Railway with credentials
3. **Security**: Change JWT_SECRET to a secure random string
4. **Domains**: Save both frontend and backend URLs for cross-referencing

## 🔄 Next Steps After Deployment
1. **Custom Domain**: Set up custom domains for both services
2. **SSL Certificates**: Both platforms provide automatic SSL
3. **Monitoring**: Set up uptime monitoring and error tracking
4. **Backup**: Configure database backups
5. **Performance**: Monitor API response times and frontend loading

## 🆘 Troubleshooting
- **Plan Issues**: Visit railway.com/account/plans
- **Build Errors**: Check `railway logs` for backend, Vercel dashboard for frontend
- **CORS Errors**: Verify FRONTEND_URL matches your Vercel domain
- **Database Issues**: Check MongoDB service status in Railway dashboard

---

**🎉 Ready to Deploy!** Follow the steps above after upgrading your Railway plan.
