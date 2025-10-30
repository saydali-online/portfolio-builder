# Deployment Guide for Portfolio Builder

This guide explains how to deploy the Portfolio Builder application to various free hosting platforms.

## Option 1: Render (Recommended - Free Tier Available)

Render offers a free tier with automatic deployments from GitHub.

### Steps:

1. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/portfolio-builder.git
   git branch -M main
   git push -u origin main
   ```

2. **Create Render Account**:
   - Go to https://render.com
   - Sign up with GitHub

3. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `portfolio-builder` repository

4. **Configure Build Settings**:
   - **Name**: portfolio-builder
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free

5. **Add Environment Variables**:
   - Go to Environment section
   - Add the following:
     - `PORT`: 8080
     - `NODE_ENV`: production
     - `DATABASE_URL`: file:./dev.db
     - `JWT_SECRET`: (generate a secure random string)
     - `CORS_ORIGIN`: https://YOUR_RENDER_DOMAIN.onrender.com
     - `PUBLIC_BASE_URL`: https://YOUR_RENDER_DOMAIN.onrender.com
     - `UPLOAD_DIR`: ./uploads

6. **Deploy**:
   - Click "Create Web Service"
   - Wait for the deployment to complete
   - Your app will be available at: `https://YOUR_RENDER_DOMAIN.onrender.com`

7. **Access Frontend**:
   - Frontend files are in `backend/src/index.ts` - we need to serve them
   - Update the backend to serve static files from the frontend directory

## Option 2: Railway.app (Free Tier Available)

### Steps:

1. **Create Railway Account**:
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**:
   - Click "Create New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository

3. **Configure**:
   - Select the `portfolio-builder` repository
   - Railway will auto-detect the Node.js project

4. **Set Environment Variables**:
   - Add the same environment variables as Render

5. **Deploy**:
   - Railway will automatically deploy your app
   - Access it via the provided Railway domain

## Option 3: Heroku (Free Tier Discontinued - Paid Only)

Heroku no longer offers a free tier as of November 2022.

## Option 4: Replit (Free with Limitations)

### Steps:

1. **Create Replit Account**:
   - Go to https://replit.com
   - Sign up

2. **Create New Repl**:
   - Click "Create Repl"
   - Select "Import from GitHub"
   - Paste your repository URL

3. **Configure**:
   - Replit will auto-detect the Node.js project
   - Set environment variables in the Secrets section

4. **Run**:
   - Click "Run" to start the server
   - Replit provides a public URL

## Frontend Serving

To serve the frontend files from the backend, update `backend/src/index.ts`:

```typescript
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Add this before other routes:
app.use(express.static(path.join(__dirname, '../../frontend/public')));

// Add a catch-all for SPA routing:
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/public/index.html'));
});
```

## Database Persistence

**Important**: SQLite databases stored in the filesystem will be lost when the container restarts. For production:

1. **Use PostgreSQL** instead of SQLite
2. Update `backend/prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

3. Use a managed PostgreSQL service:
   - **Render**: Includes free PostgreSQL
   - **Railway**: Includes free PostgreSQL
   - **Neon**: Free PostgreSQL hosting (https://neon.tech)

## Troubleshooting

### Build Fails
- Ensure all dependencies are in `package.json`
- Check that the build command is correct
- Review build logs in the deployment platform

### App Crashes
- Check the logs in the deployment platform
- Verify environment variables are set correctly
- Ensure the database is accessible

### CORS Issues
- Update `CORS_ORIGIN` environment variable to match your deployment domain
- Ensure the frontend is accessing the correct API URL

## Next Steps

1. Set up a custom domain (most platforms support this)
2. Enable HTTPS (automatic on most platforms)
3. Set up monitoring and logging
4. Configure backups for your database
5. Set up CI/CD for automated deployments
