# Vercel Deployment Guide

## Prerequisites
- Node.js installed
- Vercel account (free)
- Git repository (GitHub, GitLab, or Bitbucket)

## Quick Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New..." → "Project"
   - Import your repository

3. **Configure Build Settings**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site will be live at `your-project-name.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Follow the prompts**
   - Set up and deploy: Y
   - Which scope: Select your account
   - Link to existing project: N
   - Project name: (enter name or press enter)
   - Directory: ./
   - Override settings: N

5. **Deploy to production**
   ```bash
   vercel --prod
   ```

## Build Locally (Optional)

To test the build locally before deploying:

```bash
npm install
npm run build
npm run preview
```

## Configuration Files

The following files are configured for Vercel:

- `vercel.json` - Vercel configuration
- `vite.config.js` - Vite build configuration
- `package.json` - Build scripts

## Troubleshooting

### Build fails
- Make sure `node_modules` is not committed (check `.gitignore`)
- Verify `package.json` has the `build` script
- Check that all dependencies are listed in `package.json`

### CSS not loading
- Vite automatically handles CSS imports
- Check browser console for errors
- Verify `styles.css` is in the root directory

### JavaScript not working
- Check browser console for errors
- Verify `script.js` is in the root directory
- Make sure the file is not blocked by ad blockers

### Images not loading
- Ensure image paths are correct and relative
- Check that images are in the correct directory
- Verify images are committed to git

## Environment Variables (if needed)

If you need environment variables:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add your variables
3. Redeploy

## Custom Domain

To add a custom domain:

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions

## Continuous Deployment

Once set up, every push to your main branch will automatically:
- Build your site
- Deploy to production
- Available at your Vercel URL

## Support

- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vitejs.dev/
