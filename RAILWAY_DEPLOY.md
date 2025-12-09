# Railway Deployment Guide

## Quick Deploy to Railway

### Method 1: Deploy from GitHub (Recommended)

1. **Login to Railway**
   - Go to https://railway.app
   - Sign in with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `lexyerresta/lexchange`

3. **Configure Deployment**
   - Railway will auto-detect Next.js
   - Build Command: `npm run build` (auto-detected)
   - Start Command: `npm start` (auto-detected)

4. **Add Environment Variables** (Optional)
   - Click on your service
   - Go to "Variables" tab
   - Add if needed:
     ```
     NODE_ENV=production
     ```

5. **Deploy**
   - Railway will automatically deploy
   - Wait for build to complete (2-3 minutes)
   - Get your deployment URL: `https://your-app.railway.app`

### Method 2: Deploy with Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Link to your repo
railway link

# Deploy
railway up
```

## Post-Deployment

### Custom Domain (Optional)
1. Go to your Railway project
2. Click "Settings"
3. Scroll to "Domains"
4. Add custom domain
5. Update DNS records as instructed

### Environment Variables
Railway automatically sets:
- `PORT` - Auto-assigned
- `RAILWAY_ENVIRONMENT` - production
- `NODE_ENV` - production

### Monitoring
- View logs: Railway Dashboard → Deployments → Logs
- View metrics: Railway Dashboard → Metrics
- Set up alerts: Railway Dashboard → Settings → Notifications

## Troubleshooting

### Build Fails
```bash
# Check build logs in Railway dashboard
# Common fixes:
- Ensure all dependencies are in package.json
- Check Node version compatibility
- Verify build command is correct
```

### App Not Starting
```bash
# Check start command
# Should be: npm start
# Verify in railway.json or Railway dashboard
```

### Port Issues
```bash
# Railway automatically assigns PORT
# Next.js will use it automatically
# No configuration needed
```

## Automatic Deployments

Railway automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Railway will automatically:
# 1. Detect the push
# 2. Build the app
# 3. Deploy new version
# 4. Zero-downtime deployment
```

## Rollback

If something goes wrong:
1. Go to Railway Dashboard
2. Click "Deployments"
3. Find previous working deployment
4. Click "Redeploy"

## Cost

- **Free Tier**: $5 credit/month
- **Pro Plan**: $20/month for more resources
- Lexchange should run fine on free tier for testing

## Performance Tips

1. **Enable Caching**
   - Railway automatically caches node_modules
   - Next.js build cache is preserved

2. **Optimize Build**
   - Already configured in next.config.ts
   - Production builds are optimized

3. **Monitor Usage**
   - Check Railway dashboard for resource usage
   - Upgrade if needed

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- GitHub Issues: https://github.com/lexyerresta/lexchange/issues

## Quick Commands

```bash
# View logs
railway logs

# Open app in browser
railway open

# Check status
railway status

# Environment variables
railway variables

# Restart service
railway restart
```

## Success Checklist

- [ ] GitHub repo connected
- [ ] Build successful
- [ ] App deployed and accessible
- [ ] Environment variables set (if needed)
- [ ] Custom domain configured (optional)
- [ ] Monitoring enabled
- [ ] Auto-deploy working

Your app will be live at: `https://lexchange-production.up.railway.app` (or similar)
