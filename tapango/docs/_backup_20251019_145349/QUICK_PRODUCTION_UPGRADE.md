# Quick Production Upgrade Guide

For Supabase database hardening and when to drop dev policies, see
`docs/PROJECT_STATUS_AND_SUPABASE.md`.

## 🚀 **Ready to Eliminate the Warning? Upgrade to Production!**

### **Step 1: Create Production Instance**

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Click **"Development"** at the top of the page
3. Select **"Create Production Instance"** or **"Upgrade to Production"**
4. Follow the setup wizard

### **Step 2: Get Your Production Key**

1. In your new production instance
2. Go to **"API Keys"** section
3. Copy your **Publishable Key** (starts with `pk_live_`)

### **Step 3: Update Environment**

Replace in your `.env` file:

```bash
# OLD (development):
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_Ymxlc3NlZC1zZWFob3JzZS0zMy5jbGVyay5hY2NvdW50cy5kZXYk

# NEW (production):
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_production_key_here
```

### **Step 4: Restart Your App**

```bash
# Stop the current process (Ctrl+C)
npm start
```

### **✅ Result: No More Warnings!**

- Warning disappears
- Ready for app store deployment
- Higher usage limits
- Production support

## ⚠️ **Before You Upgrade**

**Only upgrade if you're ready for:**

- Real user deployments
- App store submissions
- Production usage
- Potential costs (based on usage)

**Stay on development if you're:**

- Still building features
- Testing and learning
- Not ready for production users

## 🤔 **Not Sure? Stay on Development**

The warning is **completely harmless** and just informational. Your app works
perfectly with development keys!

Development keys are **free and perfect** for building your app.
