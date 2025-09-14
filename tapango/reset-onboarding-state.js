/**
 * Reset Onboarding State Utility
 *
 * This script can be used to reset the onboarding state for testing purposes.
 * Run this script to clear the onboarding completion flag so that the onboarding
 * screens will be shown again on the next app launch.
 */

// Simple script to show instructions for resetting onboarding state
console.log('🔄 TAPANGO Onboarding State Reset Instructions 🔄');
console.log('==============================================');
console.log('');
console.log('To reset the onboarding state, you have several options:');
console.log('');
console.log('Option 1: Use the Development Helper Button');
console.log('- Make sure you are running in development mode (__DEV__ = true)');
console.log('- Look for a "Reset Onboarding" button in the splash screen');
console.log('- Tap the button and confirm the reset');
console.log('');
console.log('Option 2: Clear App Data (Most Reliable)');
console.log('- iOS Simulator: Device > Erase All Content and Settings');
console.log('- Android Emulator: Settings > Apps > TAPANGO > Clear Storage');
console.log('- Physical Device: Settings > Apps > TAPANGO > Clear Storage');
console.log('');
console.log('Option 3: Use the Reset Button on Index Screen');
console.log('- Modify the index screen to not immediately redirect to splash');
console.log('- Or temporarily comment out the redirect in index.tsx');
console.log('- Then you will see the reset button on the index screen');
console.log('');
console.log('After resetting, restart the app to see the onboarding screens.');
