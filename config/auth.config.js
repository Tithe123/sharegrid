// Debug: Log environment variables
console.log('Environment variables loaded:');
console.log('SUPABASE_URL:', process.env.EXPO_PUBLIC_SUPABASE_URL);
console.log('GOOGLE_IOS_CLIENT_ID:', process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID);
console.log('GOOGLE_ANDROID_CLIENT_ID:', process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID);

// Authentication Configuration using Expo environment variables
export const AUTH_CONFIG = {
  // Supabase Configuration
  SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co',
  SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'your-supabase-anon-key-here',

  // Google OAuth Configuration
  GOOGLE_IOS_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || '244470367906-u8ci3be2l01s5qefahblssd8cisn0mj9.apps.googleusercontent.com',
  GOOGLE_ANDROID_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || '244470367906-u8ci3be2l01s5qefahblssd8cisn0mj9.apps.googleusercontent.com',

  // Apple Sign-In Configuration (iOS only)
  APPLE_CLIENT_ID: process.env.EXPO_PUBLIC_APPLE_CLIENT_ID || 'your_apple_client_id',

  // AsyncStorage Keys
  STORAGE_KEYS: {
    ACCESS_TOKEN: 'sharegrid_access_token',
    USER_DATA: 'sharegrid_user_data',
    REFRESH_TOKEN: 'sharegrid_refresh_token'
  },

  // Validation Rules
  VALIDATION: {
    PASSWORD_MIN_LENGTH: 8,
    VERIFICATION_CODE_LENGTH: 6,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }
};
