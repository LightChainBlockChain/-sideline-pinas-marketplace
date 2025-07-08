# Sideline Pilipinas - Deployment Guide

## Prerequisites

### System Requirements
- Node.js 18.x or higher
- MongoDB 5.0 or higher
- Redis 6.x or higher
- Git

### Philippine Payment Gateway Accounts
1. **GCash** - Apply for merchant account at [GCash Business](https://www.gcash.com/business)
2. **PayMaya** - Register at [PayMaya Business](https://business.paymaya.com/)
3. **UnionBank** - Contact UnionBank for API access
4. **BPI** - Apply for BPI API access
5. **Paymongo** - Sign up at [Paymongo](https://paymongo.com/)

## Local Development Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd digital-marketplace
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 4. Database Setup
```bash
# Install MongoDB locally or use MongoDB Atlas
# Create database: sideline-pilipinas
# The application will create collections automatically
```

## Production Deployment

### 1. Server Setup (Ubuntu/CentOS)
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Install Redis
sudo apt install redis-server

# Install PM2 for process management
sudo npm install -g pm2
```

### 2. Application Deployment
```bash
# Clone repository
git clone <repository-url>
cd digital-marketplace

# Backend deployment
cd backend
npm install --production
cp .env.example .env
# Configure production environment variables
npm run build

# Frontend deployment
cd ../frontend
npm install
npm run build

# Start with PM2
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

### 3. Nginx Configuration
```nginx
server {
    listen 80;
    server_name sidelinepilipinas.com www.sidelinepilipinas.com;

    # Frontend
    location / {
        root /var/www/sideline-pilipinas/frontend/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # File uploads
    location /uploads {
        alias /var/www/sideline-pilipinas/backend/uploads;
        expires 1y;
        add_header Cache-Control public;
    }
}
```

### 4. SSL Certificate (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d sidelinepilipinas.com -d www.sidelinepilipinas.com
```

## Environment Variables

### Required Environment Variables
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sideline-pilipinas
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=https://sidelinepilipinas.com

# Payment Gateway Credentials
GCASH_MERCHANT_ID=your-gcash-merchant-id
GCASH_SECRET_KEY=your-gcash-secret-key
PAYMAYA_PUBLIC_KEY=your-paymaya-public-key
PAYMAYA_SECRET_KEY=your-paymaya-secret-key
PAYMONGO_PUBLIC_KEY=your-paymongo-public-key
PAYMONGO_SECRET_KEY=your-paymongo-secret-key
```

## Philippine Payment Integration

### GCash Integration
1. Register as GCash merchant
2. Get API credentials
3. Configure webhook endpoints
4. Test with sandbox environment

### PayMaya Integration
1. Create PayMaya business account
2. Get API keys
3. Configure payment flows
4. Test transactions

### Banking Integration
1. Contact banks for API access
2. Complete KYC requirements
3. Get production credentials
4. Implement security measures

## Security Considerations

### 1. API Security
- Use HTTPS everywhere
- Implement rate limiting
- Validate all inputs
- Use JWT tokens properly
- Implement CORS correctly

### 2. Payment Security
- Use webhook verification
- Implement idempotency
- Log all transactions
- Monitor for fraud
- Use secure storage for sensitive data

### 3. File Upload Security
- Validate file types
- Scan for malware
- Limit file sizes
- Use secure storage (AWS S3)

## Monitoring and Maintenance

### 1. Application Monitoring
```bash
# PM2 monitoring
pm2 monit

# Check logs
pm2 logs

# Restart application
pm2 restart all
```

### 2. Database Monitoring
```bash
# MongoDB status
sudo systemctl status mongod

# Database backups
mongodump --db sideline-pilipinas --out /backup/$(date +%Y%m%d)
```

### 3. Performance Optimization
- Enable gzip compression
- Implement caching (Redis)
- Optimize database queries
- Use CDN for static assets
- Monitor API response times

## Backup Strategy

### 1. Database Backup
```bash
# Daily backup script
#!/bin/bash
BACKUP_DIR="/backup/mongodb"
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --db sideline-pilipinas --out $BACKUP_DIR/$DATE
```

### 2. File Backup
```bash
# Backup uploaded files
rsync -av /var/www/sideline-pilipinas/backend/uploads/ /backup/uploads/
```

## Troubleshooting

### Common Issues
1. **Payment Gateway Timeout**
   - Check network connectivity
   - Verify API credentials
   - Review webhook configurations

2. **High Memory Usage**
   - Monitor Node.js heap size
   - Implement pagination
   - Optimize database queries

3. **File Upload Issues**
   - Check disk space
   - Verify file permissions
   - Review upload limits

### Log Locations
- Application logs: PM2 logs
- Nginx logs: `/var/log/nginx/`
- MongoDB logs: `/var/log/mongodb/`
- System logs: `/var/log/syslog`

## Scaling Considerations

### 1. Horizontal Scaling
- Use load balancers
- Implement session clustering
- Use MongoDB replica sets
- Scale file storage (AWS S3)

### 2. Performance Optimization
- Implement caching strategies
- Use CDN for static assets
- Optimize database indexes
- Monitor API performance

## Legal and Compliance

### 1. Philippine Regulations
- Register with DTI
- Comply with BSP regulations
- Follow data privacy laws
- Implement AML policies

### 2. Tax Compliance
- Implement VAT calculation
- Generate proper receipts
- Maintain transaction records
- Comply with BIR requirements

## Support and Maintenance

### 1. Regular Updates
- Update dependencies monthly
- Security patches immediately
- Database maintenance weekly
- Performance monitoring daily

### 2. Backup Verification
- Test restore procedures
- Verify backup integrity
- Document recovery steps
- Train support team

For technical support, contact: support@sidelinepilipinas.com
