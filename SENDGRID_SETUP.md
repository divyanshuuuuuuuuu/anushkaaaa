# 🚀 SendGrid Setup for Real Email OTP

## Step 1: Create SendGrid Account
1. Go to [https://sendgrid.com](https://sendgrid.com)
2. Click "Start for Free"
3. Sign up with your email
4. Verify your email

## Step 2: Generate API Key
1. Login to SendGrid Dashboard
2. Go to **Settings** → **API Keys**
3. Click **"Create API Key"**
4. Name it: `Rasoiyaa-OTP`
5. Select **"Full Access"** permissions
6. Click **"Create & View"**
7. **COPY THE API KEY** (you won't see it again!)

## Step 3: Verify Sender Email
1. In SendGrid Dashboard, go to **Settings** → **Sender Authentication**
2. Click **"Verify a Single Sender"**
3. Fill in:
   - **From Email**: `noreply@rasoiyafood.com` (or your domain)
   - **From Name**: `Rasoiyaa Food`
   - **Reply To**: Your email
4. Click **"Send Verification Email"**
5. Check your email and click the verification link

## Step 4: Configure Your Backend
1. Open `backend/.env` file
2. Replace the placeholder with your real API key:
   ```
   SENDGRID_API_KEY=SG.your_actual_api_key_here
   FROM_EMAIL=noreply@rasoiyafood.com
   PORT=3002
   ```

## Step 5: Test Real Email OTP
1. Restart your backend server:
   ```bash
   cd backend
   node server.js
   ```
2. Open `rosaiya/index.html`
3. Click "Login"
4. Enter a real Gmail address
5. Click "Send OTP"
6. **Check your Gmail inbox** for the OTP email!

## 📧 What You'll Get
- **Professional HTML email** with Rasoiyaa branding
- **Large, clear 6-digit OTP** display
- **5-minute expiration** notice
- **Responsive design** for all devices

## 💰 SendGrid Pricing
- **Free Tier**: 100 emails/day
- **Paid**: $0.0006 per additional email
- Perfect for small business!

## 🔧 Troubleshooting
- **"Invalid API key"**: Double-check your API key in `.env`
- **"Unverified sender"**: Complete sender verification in SendGrid
- **No email received**: Check spam folder, wait 5-10 minutes
- **Still not working**: Check SendGrid dashboard → Activity Feed

---
**Once set up, your OTP system will send real emails to any Gmail address!** 🎉