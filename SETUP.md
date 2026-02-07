# ⚡ QUICK SETUP GUIDE

## Step 1: Extract Files
Extract the ZIP file to your desired location.

## Step 2: Install Dependencies (3 minutes)

Open terminal in the project folder and run:

```bash
npm install
```

This installs all required packages (~150MB download).

## Step 3: Get Gemini API Key (2 minutes)

1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key (starts with "AIza...")

## Step 4: Configure Environment (1 minute)

```bash
# Copy the example file
cp .env.example .env.local
```

Edit `.env.local` and replace:
```
VITE_GEMINI_API_KEY=YOUR_API_KEY_HERE
```

With your actual key:
```
VITE_GEMINI_API_KEY=AIzaSyABC123...your_real_key
```

## Step 5: Test Locally (1 minute)

```bash
npm run dev
```

Open browser to: http://localhost:5173

Test by:
1. Uploading a chart image
2. Selecting NIFTY/BANKNIFTY
3. Clicking "Get Signal"

## Step 6: Deploy (10 minutes)

### Using Vercel (Recommended):

1. **Zip this folder**
2. Go to: https://vercel.com
3. Sign up (free)
4. Click "Add New" → "Project"
5. Upload ZIP file
6. Configure:
   - Framework: **Vite**
   - Build: `npm run build`
   - Output: `dist`
7. **Add environment variable:**
   - Name: `VITE_GEMINI_API_KEY`
   - Value: (your API key)
8. Deploy!

Your site: `https://yourname.vercel.app` ✅

---

## ✅ That's It!

Your site is now LIVE and FREE!

## 📋 Checklist

- [ ] Extracted files
- [ ] Ran `npm install`
- [ ] Got Gemini API key
- [ ] Created `.env.local` file
- [ ] Added API key to `.env.local`
- [ ] Tested locally with `npm run dev`
- [ ] Deployed to Vercel
- [ ] Added env variable on Vercel
- [ ] Site is live!

---

## 🐛 Common Issues

**Issue: "Module not found"**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Issue: "API key invalid"**
- Check key in `.env.local` is correct
- No quotes around the key
- No extra spaces

**Issue: "Build failed"**
- Make sure all files are present
- Run `npm install` first
- Check Node.js version (need v18+)

**Issue: "White screen on deployed site"**
- Check environment variable on Vercel is set
- Redeploy after adding env variable

---

## 📚 Next Steps

After deployment:
1. Share your link!
2. Monitor API usage
3. Read DEPLOY.md for advanced tips
4. Check README.md for full documentation

Need help? Check the README.md file!
