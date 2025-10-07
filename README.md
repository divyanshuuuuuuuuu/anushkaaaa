# Flipkart Replica

A simple e-commerce website replica of Flipkart with product listings, cart, checkout, and user authentication.

## Features
- Multi-page site with categories (Electronics, Fashion, Home & Furniture, Appliances, Beauty, Sports)
- Shopping cart with localStorage
- User signup/login with password strength validation
- OTP verification for signup (requires backend)
- Responsive design

## Setup

### Frontend
Open `flipkart/index.html` in a browser.

### Backend (for SMS OTP)
1. Install Node.js
2. Navigate to `backend/` directory
3. Run `npm install`
4. Sign up for Twilio account and get credentials
5. Update `server.js` with your Twilio SID, Auth Token, and phone number
6. Run `node server.js`
7. The frontend will call `http://localhost:3000/send-otp` for OTP

## Files
- `flipkart/`: Frontend HTML, CSS, JS
- `backend/`: Node.js server for SMS OTP