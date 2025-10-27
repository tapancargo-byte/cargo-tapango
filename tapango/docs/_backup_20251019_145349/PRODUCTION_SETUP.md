# Production Deployment Guide for Clerk Authentication

For Supabase database hardening steps and the plan to drop dev-only policies
before release, see `docs/PROJECT_STATUS_AND_SUPABASE.md`.

## Current Status

✅ **Development Setup Complete** - Your app is using Clerk development keys,
which is perfect for testing and development.

⚠️ **Before Production Deployment** - You'll need to upgrade to production keys.

## When to Upgrade to Production

Upgrade to production when you're ready to:

- Deploy to app stores (Apple App Store, Google Play Store)
- Have real users sign up and use the app
- Need higher usage limits

## Production Setup Steps

### 1. Create Production Instance

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Click on your project
3. In the top navigation, you'll see "Development" - click it
4. Select "Create Production Instance" or upgrade your existing instance

### 2. Update Environment Variables

Once you have your production instance:

```bash
# Replace in your .env file:
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_production_key_here
```

### 3. Configure Your Domain

- Set up your custom domain in Clerk Dashboard
- Configure DNS records as required
- Update any redirect URLs

### 4. Social Sign-In (Optional)

If you plan to use social sign-in (Google, Apple, etc.):

- Set up OAuth credentials for each provider
- Configure them in your production Clerk instance
- Update your app configuration

### 5. Build for Production

```bash
# Build your app with production keys
eas build --platform all
```

## Development vs Production Limits

| Feature               | Development | Production     |
| --------------------- | ----------- | -------------- |
| Monthly Active Users  | 10,000      | Varies by plan |
| API Requests          | Limited     | Higher limits  |
| Custom Domains        | ❌          | ✅             |
| Remove Clerk Branding | ❌          | ✅ (Pro plan+) |
| Advanced Features     | Limited     | Full access    |

## Current Configuration

Your app is properly set up with:

- ✅ Secure token storage
- ✅ Email verification flow
- ✅ Protected routes
- ✅ Sign-out functionality
- ✅ User profile integration

**The development key warning is normal and expected during development!**

## Need Help?

- [Clerk Production Deployment Docs](https://clerk.com/docs/deployments/overview)
- [Clerk Dashboard](https://dashboard.clerk.com)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
