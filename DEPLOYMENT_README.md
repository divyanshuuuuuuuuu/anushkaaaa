# Rasoiyaa Food E-commerce Deployment Guide

## 🚀 Deploying to GitHub Pages + Backend Service

### Step 1: Set up SendGrid for Email OTP

1. **Create SendGrid Account**
   - Go to [SendGrid](https://sendgrid.com) and create a free account
   - Verify your email and phone number

2. **Generate API Key**
   - Go to Settings → API Keys
   - Create a new API key with "Full Access" permissions
   - Copy the API key (keep it safe!)

3. **Verify Sender Email**
   - Go to Settings → Sender Authentication
   - Verify a single sender (use your email or a custom domain)
   - Note: For production, consider using a custom domain

### Step 2: Deploy Backend (API Server)

Choose one of these backend hosting services:

#### Option A: Railway (Recommended - Free tier available)
1. Go to [Railway.app](https://railway.app) and create account
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect your GitHub repo
4. Add environment variables:
   ```
   SENDGRID_API_KEY=your_sendgrid_api_key_here
   FROM_EMAIL=your_verified_sender@email.com
   PORT=3002
   ```
5. Deploy and get your backend URL (e.g., `https://your-app.railway.app`)

#### Option B: Render (Free tier available)
1. Go to [Render.com](https://render.com) and create account
2. Click "New +" → "Web Service"
3. Connect your GitHub repo, select `/backend` as root directory
4. Set build command: `npm install`
5. Set start command: `node server.js`
6. Add environment variables (same as above)
7. Deploy and get your backend URL

#### Option C: Vercel (Free tier)
1. Install Vercel CLI: `npm i -g vercel`
2. In backend folder: `vercel --prod`
3. Add environment variables during setup
4. Get your backend URL

### Step 3: Update Frontend API URLs

1. **Edit `rosaiya/script.js`** and replace:
   ```javascript
   fetch('http://localhost:3002/send-otp', {
   fetch('http://localhost:3002/verify-otp', {
   ```
   With your deployed backend URL:
   ```javascript
   fetch('https://your-backend-url.railway.app/send-otp', {
   fetch('https://your-backend-url.railway.app/verify-otp', {
   ```

### Step 4: Deploy Frontend to GitHub Pages

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Add Rasoiyaa Food e-commerce site"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repo → Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main` (or your default branch)
   - Folder: `/` (root)
   - Save

3. **Your site will be live at**: `https://yourusername.github.io/your-repo-name/`

### Step 5: Test the Live Site

1. Visit your GitHub Pages URL
2. Click "Login" and enter a real email
3. Check your email for the OTP
4. Complete the login process
5. Test adding items to cart and checkout

## 📧 Email Template Preview

The OTP emails include:
- Beautiful HTML design with Rasoiyaa branding
- Large, clear OTP display
- 5-minute expiration notice
- Professional styling

## 🔧 Environment Variables Required

### For Email OTP (SendGrid):
```
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxx
FROM_EMAIL=noreply@rasoiyafood.com
```

### For SMS OTP (Twilio):
```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_API_KEY_SID=SKxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_API_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+1234567890
```

### General:
```
PORT=3002
```

**Note**: You can use either SendGrid OR Twilio, or both for fallback options.

## 🛠 Troubleshooting

### Email not sending?
- Check SendGrid API key is correct
- Verify sender email is authenticated in SendGrid
- Check SendGrid dashboard for delivery status

### CORS errors?
- Ensure backend has CORS enabled
- Update frontend API URLs to match deployed backend

### GitHub Pages not loading?
- Wait 5-10 minutes after enabling Pages
- Check browser console for errors
- Ensure all file paths are correct

## 💰 Cost Estimate

- **SendGrid**: Free for 100 emails/day, then $0.0006 per email
- **Railway/Render**: Free tier sufficient for small business
- **GitHub Pages**: Completely free

## 🔒 Security Notes

- Never commit `.env` files to GitHub
- Use environment variables for all sensitive data
- Consider adding rate limiting for OTP requests
- Use HTTPS in production (GitHub Pages provides this automatically)

---

**Need help?** Check the console logs in your backend service dashboard for debugging!