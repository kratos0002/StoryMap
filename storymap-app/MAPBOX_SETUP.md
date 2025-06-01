# Mapbox Setup Guide - StoryMap

## Overview

StoryMap now uses environment variables for Mapbox configuration instead of asking users to enter their API key in the frontend. This is more secure and provides a better developer experience.

## Quick Setup

### 1. Get a Mapbox API Key

1. Sign up for a free account at [Mapbox](https://account.mapbox.com/auth/signup/)
2. Navigate to your Account page
3. Create a new access token
4. Copy the token (starts with `pk.`)

### 2. Configure Environment Variables

Create a `.env` file in the `storymap-app` directory:

```bash
# In storymap-app/.env
VITE_MAPBOX_API_KEY=pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbG9lMXVrZWgwMGNsMmptbGw1cXRxNnJ1In0.your_actual_token_here
```

### 3. Restart Development Server

```bash
npm run dev
```

The map should now load automatically without any configuration screen.

## Environment Variable Details

### Required Variables

- `VITE_MAPBOX_API_KEY`: Your Mapbox public access token

### Optional Variables

If you need to override Supabase configuration:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Security Notes

### ✅ Good Practices

- Use environment variables for all API keys
- Add `.env` to your `.gitignore` file (already done)
- Use public tokens only (tokens starting with `pk.`)
- Set up domain restrictions on your Mapbox token

### ❌ Avoid

- Hardcoding API keys in source code
- Committing `.env` files to version control
- Using secret tokens in frontend applications

## Troubleshooting

### Map Not Loading

1. **Check Console Errors**: Open browser dev tools and look for errors
2. **Verify API Key**: Ensure your `.env` file has the correct token
3. **Restart Server**: Environment variables require a server restart
4. **Check Token Permissions**: Ensure your Mapbox token has the necessary scopes

### Common Error Messages

- `"Mapbox API key not configured"`: Create/update your `.env` file
- `"Failed to load map"`: Check if your API key is valid
- `"Unauthorized"`: Verify your token hasn't expired

### Environment Variable Not Loading

Ensure your variable name starts with `VITE_`:
```bash
# ✅ Correct
VITE_MAPBOX_API_KEY=pk.your_token

# ❌ Wrong (won't be accessible in frontend)
MAPBOX_API_KEY=pk.your_token
```

## Development vs Production

### Development
- Use `.env` file in project root
- Restart dev server after changes

### Production
- Set environment variables in your hosting platform
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Environment Variables
- Other platforms: Check their documentation

## Token Restrictions (Recommended)

For added security, restrict your Mapbox token:

1. Go to your Mapbox account
2. Edit your access token
3. Add URL restrictions:
   - `http://localhost:*` (for development)
   - `https://yourdomain.com/*` (for production)

## Example .env File

```bash
# Mapbox Configuration
VITE_MAPBOX_API_KEY=pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbG9lMXVrZWgwMGNsMmptbGw1cXRxNnJ1In0.your_actual_token_here

# Optional: Supabase Override (if needed)
# VITE_SUPABASE_URL=https://your-project.supabase.co
# VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## Migration from Previous Setup

If you were using the old configuration screen:

1. Your browser's localStorage will be ignored
2. Create the `.env` file as described above
3. The configuration screen is now removed
4. The map will load automatically

## Support

If you encounter issues:

1. Check this guide first
2. Verify your `.env` file format
3. Check browser console for errors
4. Ensure you've restarted the development server

The new environment variable approach provides better security and a smoother development experience! 