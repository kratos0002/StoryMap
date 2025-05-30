# Mapbox Integration Guide for StoryMap

This document explains how to set up your Mapbox API key for the StoryMap application.

## About Mapbox Integration

StoryMap uses Mapbox GL JS for its interactive map component. Mapbox provides beautiful map styles and powerful features that enhance the storytelling experience. The application is configured to use environment variables for secure API key management.

## Setting Up Your Mapbox API Key

### Step 1: Create a Mapbox Account and Get an API Key

1. If you don't already have one, create an account at [Mapbox](https://www.mapbox.com/)
2. Navigate to your Account page and create a new access token
3. For added security, you can restrict the token to only work on your specific domain

### Step 2: Configure the Environment Variable

#### For Local Development

Create a `.env.local` file in the root of the project with the following content:

```
VITE_MAPBOX_TOKEN=your_mapbox_access_token_here
```

#### For Production Deployment

When deploying to a hosting service, set the environment variable according to your provider's instructions:

- **Vercel**: Add `VITE_MAPBOX_TOKEN` in the Environment Variables section of your project settings
- **Netlify**: Add `VITE_MAPBOX_TOKEN` in the Build & Deploy > Environment settings
- **Other providers**: Consult their documentation for adding environment variables

### Step 3: Verify the Integration

After setting up your API key:

1. Start the application locally or deploy it
2. Verify that the map loads correctly with all story pins
3. Test interactions like clicking on pins and reading stories

## Troubleshooting

If the map doesn't load correctly:

1. Check that your API key is correctly set in the environment variables
2. Verify that your API key has the necessary permissions
3. Check for any console errors in your browser's developer tools

## Security Considerations

- Never commit your API key to version control
- Use environment variables as implemented in the application
- Consider using domain restrictions on your Mapbox token
- Rotate your API key periodically for enhanced security
