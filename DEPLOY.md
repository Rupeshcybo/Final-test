# 🚀 DEPLOYMENT GUIDE

## Choose Your Platform

### ✅ RECOMMENDED: Vercel (Easiest, Best)

**Why Vercel?**
- 100% FREE
- Perfect for React/Vite
- Environment variables work perfectly
- Auto HTTPS
- Fast global CDN

**Steps:**
1. Go to https://vercel.com
2. Sign up with GitHub (free)
3. Click "Add New" → "Project"
4. Upload this folder (zip it) OR import from GitHub
5. Settings:
   - Framework: Vite
   - Build: `npm run build`
   - Output: `dist`
6. Environment Variables:
   - Add: `VITE_GEMINI_API_KEY` = your key
7. Deploy!

**Result:** `https://yourname.vercel.app` ✅

---

### Alternative: Netlify

1. Go to https://netlify.com
2. Drag and drop `dist` folder (after `npm run build`)
3. Add env variable in settings
4. Redeploy

---

### NOT Recommended: GitHub Pages

GitHub Pages doesn't support:
- Environment variables properly
- React routing well
- Build process easily

Use Vercel instead!

---

## After Deployment Checklist

- [ ] Site loads correctly
- [ ] Can upload image
- [ ] Analysis works
- [ ] Results display properly
- [ ] Mobile works
- [ ] HTTPS enabled (automatic on Vercel)

---

## Custom Domain (Optional)

On Vercel:
1. Settings → Domains
2. Add your domain
3. Update DNS records
4. Wait 5-10 minutes
5. Done!

Free HTTPS certificate included!

---

## Monitoring

**Check daily:**
- Gemini API usage: https://makersuite.google.com
- Vercel bandwidth: Vercel dashboard

**Set alerts:**
- If API usage > 80% of free tier
- If bandwidth > 80GB/month

---

## Troubleshooting Deploy Issues

**Build fails:**
- Check all files are included
- Run `npm install` locally first
- Check for TypeScript errors

**Blank page:**
- Check environment variable is set
- Check browser console for errors
- Verify API key is correct

**Analysis doesn't work:**
- API key invalid
- API quota exceeded
- Check Vercel function logs

---

Need help? Check the main README.md!
