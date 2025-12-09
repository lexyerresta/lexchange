# Quick Deploy to Railway - Step by Step

## Langkah 1: Persiapan (Sudah Selesai)
- [x] Code sudah di-push ke GitHub
- [x] Railway configuration files sudah dibuat
- [x] Package.json sudah siap

## Langkah 2: Deploy ke Railway

### A. Buka Railway
1. Buka browser
2. Go to: https://railway.app
3. Klik "Login" atau "Start a New Project"
4. Login dengan GitHub account Anda

### B. Create New Project
1. Klik tombol "New Project"
2. Pilih "Deploy from GitHub repo"
3. Authorize Railway untuk akses GitHub (jika diminta)
4. Cari dan pilih repository: `lexyerresta/lexchange`
5. Klik repository untuk deploy

### C. Configure (Auto-detected)
Railway akan otomatis detect:
- Framework: Next.js
- Build Command: `npm run build`
- Start Command: `npm start`
- Port: Auto-assigned

**Tidak perlu konfigurasi tambahan!**

### D. Deploy
1. Railway akan langsung mulai build
2. Tunggu 2-3 menit
3. Build progress bisa dilihat di tab "Deployments"

### E. Get Your URL
1. Setelah deploy sukses, klik tab "Settings"
2. Scroll ke "Domains"
3. Klik "Generate Domain"
4. Copy URL yang diberikan (contoh: `lexchange-production.up.railway.app`)

## Langkah 3: Test Deployment

1. Buka URL yang didapat dari Railway
2. Test semua fitur:
   - Homepage loads
   - Login/Register works
   - Market data loads
   - Trading works
   - Portfolio updates

## Langkah 4: Setup Auto-Deploy (Optional)

Railway sudah auto-setup! Setiap kali push ke GitHub:
```bash
git add .
git commit -m "Update"
git push origin main
```
Railway akan otomatis:
1. Detect push
2. Build ulang
3. Deploy versi baru
4. Zero downtime!

## Troubleshooting

### Jika Build Gagal:
1. Check logs di Railway Dashboard → Deployments → View Logs
2. Pastikan semua dependencies ada di package.json
3. Coba build lokal dulu: `npm run build`

### Jika App Tidak Jalan:
1. Check logs: Railway Dashboard → Deployments → Logs
2. Pastikan PORT tidak di-hardcode (Railway auto-assign)
3. Verify start command: `npm start`

### Jika Perlu Restart:
1. Go to Railway Dashboard
2. Click service name
3. Click "Restart"

## Environment Variables (Jika Diperlukan)

Jika nanti perlu tambah env vars:
1. Railway Dashboard → Variables
2. Click "New Variable"
3. Add key-value pairs
4. Redeploy

## Monitoring

- **Logs**: Railway Dashboard → Deployments → Logs
- **Metrics**: Railway Dashboard → Metrics
- **Usage**: Railway Dashboard → Usage

## Cost

- **Free Tier**: $5 credit/month
- Cukup untuk testing dan development
- Upgrade ke Pro ($20/month) jika traffic tinggi

## Next Steps After Deploy

1. Test semua fitur di production URL
2. Share URL dengan teman/client
3. Setup custom domain (optional)
4. Monitor usage di Railway dashboard
5. Continue development - auto-deploy akan handle sisanya!

## Quick Links

- Railway Dashboard: https://railway.app/dashboard
- Your Repo: https://github.com/lexyerresta/lexchange
- Railway Docs: https://docs.railway.app

## Summary

Setelah deploy, Anda akan punya:
- Live URL untuk Lexchange
- Auto-deploy setiap push ke GitHub
- Monitoring dan logs
- Zero-downtime deployments
- Free hosting (dengan limits)

**Estimated Time: 5-10 menit**

Good luck! 🚀
