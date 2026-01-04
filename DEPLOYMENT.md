# Deployment Guide

## Backend Deployment (Render)

1. Push your code to GitHub
2. Go to [render.com](https://render.com) and sign up
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Click "Create Web Service"
7. Copy your deployed URL (e.g., `https://your-app.onrender.com`)

## Frontend Deployment (Netlify)

1. Update the API URL:
   - Copy `.env.example` to `.env.local`
   - Replace `https://your-backend-url.onrender.com` with your actual Render URL
2. Build the app:
   ```bash
   cd client/sse-client
   npm run build
   ```
3. Go to [netlify.com](https://netlify.com) and sign up
4. Drag and drop the `build` folder to Netlify
5. Your app is live!

## Testing

1. Open your Netlify URL
2. Open your Render URL + `/admin` (e.g., `https://your-app.onrender.com/admin`)
3. Send a message from admin panel
4. See it appear in real-time on your client app

## Notes

- Render free tier sleeps after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up
- Both services are completely free with no credit card required