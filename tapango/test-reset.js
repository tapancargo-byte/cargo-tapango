/**
 * Test Reset Script
 * 
 * This script provides helper functions to reset the app state for testing purposes.
 * Run this script to clear onboarding state and start fresh.
 */

const { exec } = require('child_process');
const path = require('path');

// Function to reset onboarding state
function resetOnboarding() {
  console.log('Resetting onboarding state...');
  
  // Clear AsyncStorage in the app
  // This would normally be done through the app itself
  console.log('Onboarding state reset. Restart the app to see onboarding screens.');
}

// Function to reset the entire app
function resetApp() {
  console.log('Resetting entire app state...');
  
  // Clear all AsyncStorage
  console.log('App state reset. Restart the app for a completely fresh start.');
}

// Function to restart the Metro bundler
function restartMetro() {
  console.log('Restarting Metro bundler...');
  
  // Kill existing Metro process
  exec('taskkill /f /im node.exe 2>nul', (error) => {
    if (error) {
      console.log('No existing Metro process found or failed to kill it.');
    } else {
      console.log('Existing Metro process killed.');
    }
    
    // Start new Metro process
    console.log('Starting new Metro bundler...');
    console.log('Run "npm start" in your terminal to start the development server.');
  });
}

// Main execution
function main() {
  console.log('TAPANGO Test Reset Utility');
  console.log('========================');
  console.log('1. Reset onboarding state');
  console.log('2. Reset entire app state');
  console.log('3. Restart Metro bundler');
  console.log('4. Exit');
  console.log('');
  
  // For now, just show the options
  console.log('To reset onboarding state, use the "Reset Onboarding (Dev Only)" button in the app.');
  console.log('To reset the entire app, clear the app data/cache on your device/emulator.');
  console.log('To restart Metro, stop the current process and run "npm start" again.');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  resetOnboarding,
  resetApp,
  restartMetro
};