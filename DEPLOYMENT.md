# Deployment Guide - Wadi Hadramout Restaurant

This guide covers deploying the Wadi Hadramout restaurant website to production.

## Quick Start - Deploy to Vercel

Vercel is the recommended platform for deploying Next.js applications.

### Prerequisites
- GitHub account with repository
- Vercel account (free tier available)
- Supabase project with credentials

### Step 1: Push Code to GitHub

```bash
git add .
git commit -m "Initial commit: Wadi Hadramout restaurant website"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select the Wadi-Hadramout repository

### Step 3: Configure Environment Variables

In Vercel dashboard, go to Settings → Environment Variables and add:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Step 4: Deploy

Click "Deploy" - your site will be live in 1-2 minutes!

Your site URL will be: `https://wadi-hadramout.vercel.app` (or custom domain)

---

## Alternative Deployment Options

### Deploy to Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables
5. Deploy!

### Deploy to Railway

1. Connect GitHub repository
2. Select Next.js template
3. Add environment variables
4. Deploy!

### Deploy to Self-Hosted Server (Ubuntu/Linux)

#### Prerequisites
- Ubuntu/Debian server
- Node.js 18+
- PM2 (process manager)
- Nginx (web server)

#### Installation Steps

```bash
# SSH into your server
ssh user@your-server.com

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Clone repository
git clone https://github.com/yourusername/Wadi-Hadramout.git
cd Wadi-Hadramout

# Install dependencies
npm install

# Create .env.local with production credentials
nano .env.local
# Add your Supabase credentials

# Build the application
npm run build

# Start with PM2
pm2 start "npm start" --name "wadi-hadramout"
pm2 startup
pm2 save

# Configure Nginx
sudo nano /etc/nginx/sites-available/default
```

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Enable HTTPS (SSL)

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
sudo systemctl restart nginx
```

---

## Domain Setup

### Connect Custom Domain to Vercel

1. Go to Vercel project settings
2. Domains section
3. Add your domain
4. Update DNS records with provider:
   - A record: `76.76.19.89`
   - CNAME: `cname.vercel-dns.com`

### Connect Custom Domain to Netlify

1. Go to Netlify site settings
2. Domain settings
3. Add custom domain
4. Update DNS with provider

---

## SSL/HTTPS Setup

### Vercel & Netlify
- Automatic SSL (included)
- Free HTTPS certificates

### Self-Hosted
```bash
# Using Let's Encrypt
sudo certbot certonly --standalone -d your-domain.com
```

---

## Database Configuration

### Supabase Production Setup

1. Create separate production project on Supabase
2. Run DATABASE_SETUP.md migrations
3. Add custom domain (optional)
4. Enable backup and restore
5. Set up monitoring

### Database Backups

```sql
-- Automatic backups in Supabase
-- Settings → Backups → Enable automated backups
```

---

## Performance Optimization

### CDN Configuration

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['cdn.example.com'],
    unoptimized: false,
  },
  compress: true,
}
```

### Cache Configuration

```javascript
// Vercel serverless function caching
export const config = {
  maxDuration: 10,
  revalidate: 60, // ISR - revalidate every 60 seconds
}
```

---

## Monitoring & Logging

### Set Up Monitoring

1. **Vercel Analytics**
   - Automatic tracking
   - Dashboard available

2. **Sentry for Error Tracking**
   ```bash
   npm install @sentry/nextjs
   ```

3. **Supabase Monitoring**
   - Database health
   - API metrics
   - Real-time logs

### Log Management

```bash
# View logs on server
pm2 logs wadi-hadramout

# View Vercel logs
vercel logs --follow
```

---

## Maintenance & Updates

### Deploy Updates

```bash
# On your local machine
git add .
git commit -m "Update feature"
git push origin main

# Automatically deployed to production on Vercel/Netlify
```

### Database Migrations

For production updates:

1. Test on staging database first
2. Create migration script
3. Run migration during low traffic
4. Monitor for issues

```bash
# Run migration script
node scripts/migration.js --production
```

### Backup & Recovery

```sql
-- Backup command
pg_dump -U postgres wadi_hadramout > backup.sql

-- Restore command
psql -U postgres wadi_hadramout < backup.sql
```

---

## Security Checklist

- [ ] Environment variables configured
- [ ] HTTPS/SSL enabled
- [ ] Database backups enabled
- [ ] Row Level Security (RLS) enabled
- [ ] Input validation on forms
- [ ] Rate limiting configured
- [ ] Regular security updates
- [ ] Monitor for suspicious activity

---

## Troubleshooting Deployments

### Build Failures

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Database Connection Issues

```bash
# Test Supabase connection
curl https://your-project.supabase.co/rest/v1/menu_items \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

### Performance Issues

1. Check Vercel Analytics
2. Monitor database query performance
3. Optimize images
4. Enable caching

---

## Scaling Considerations

### When to Scale Up

- Traffic > 1000 daily users
- Database > 10GB
- Need for 99.9% uptime SLA

### Scaling Options

1. **Upgrade Supabase Plan**
   - More connections
   - Better performance
   - Priority support

2. **Load Balancing**
   - Multiple app instances
   - Automated failover

3. **Database Optimization**
   - Add indexes
   - Optimize queries
   - Archive old data

---

## Cost Estimation

### Monthly Costs (Estimate)

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| Vercel | $0 | $20+/month |
| Supabase | $0-100 | $100-500+/month |
| Domain | $0 | $10-15/year |
| SSL | $0 | $0 (free with Vercel) |
| **Total** | **$0** | **$30-100+/month** |

---

## Support Resources

- [Vercel Deployment Docs](https://vercel.com/docs)
- [Supabase Deployment Guide](https://supabase.com/docs/guides/hosting/overview)
- [Next.js Production Guide](https://nextjs.org/docs/going-to-production)

---

**Deployed and maintained for Wadi Hadramout Restaurant** 🌅
