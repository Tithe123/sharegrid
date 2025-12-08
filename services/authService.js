import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { supabase } from '../utils/supabase';
import { AUTH_CONFIG } from '../config/auth.config';

class AuthService {
  constructor() {
    this.baseURL = 'https://spikier-maura-fremd.ngrok-free.dev/api'; // Backend API for user/profile management
    this.tokenKey = '@sharegrid_token';
    this.userKey = '@sharegrid_user';
    this.onboardedKey = '@sharegrid_onboarded';
    
    // Configure Google Sign-In with platform-specific client ID
    this.configureGoogleSignIn();
  }

  configureGoogleSignIn() {
    try {
      console.log('Configuring Google Sign-In for platform:', Platform.OS);
      console.log('iOS Client ID:', AUTH_CONFIG.GOOGLE_IOS_CLIENT_ID);
      console.log('Android Client ID:', AUTH_CONFIG.GOOGLE_ANDROID_CLIENT_ID);
      
      const config = {
        webClientId: AUTH_CONFIG.GOOGLE_IOS_CLIENT_ID,
        offlineAccess: true,
      };

      if (Platform.OS === 'ios') {
        config.iosClientId = AUTH_CONFIG.GOOGLE_IOS_CLIENT_ID;
      }

      console.log('Google Sign-In config:', config);
      GoogleSignin.configure(config);
      console.log('Google Sign-In configured successfully');
    } catch (error) {
      console.error('Error configuring Google Sign-In:', error);
    }
  }

  // Email/Password Authentication using Supabase
  async signup(email, password, firstName = null, lastName = null) {
    try {
      console.log('Starting email signup with Supabase...');
      
      // Sign up with Supabase Auth (with email confirmation disabled)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: undefined, // Disable Supabase email confirmation
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });

      if (authError) {
        throw new Error(authError.message);
      }

      console.log('Supabase signup successful:', authData);

      // Store session and access token
      if (authData.session) {
        await AsyncStorage.setItem('@access_token', authData.session.access_token);
        await AsyncStorage.setItem('@refresh_token', authData.session.refresh_token);
      }

      // Create user record in backend database with access token
      if (authData.user) {
        const backendResponse = await this.createUserInBackend({
          supabaseUserId: authData.user.id,
          email: authData.user.email,
          firstName,
          lastName,
          authType: 'email'
        }, authData.session?.access_token);

        console.log('Backend user creation response:', backendResponse);
      }

      // Store user data temporarily for verification flow
      await AsyncStorage.setItem('@temp_user_data', JSON.stringify({
        email,
        firstName,
        lastName,
        supabaseUserId: authData.user.id,
        accessToken: authData.session?.access_token
      }));

      return {
        user: authData.user,
        session: authData.session,
        needsEmailVerification: true
      };
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error(error.message || 'Signup failed');
    }
  }

  async login(email, password) {
    try {
      console.log('Starting email login with Supabase...');
      
      // Sign in with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        throw new Error(authError.message);
      }

      console.log('Supabase login successful:', authData);

      // Store session
      await this.storeUserData({
        id: authData.user.id,
        email: authData.user.email,
        ...authData.user.user_metadata
      });

      // Get user profiles from backend
      const userProfiles = await this.getUserProfiles(authData.user.id);

      return {
        user: authData.user,
        session: authData.session,
        profiles: userProfiles
      };
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed');
    }
  }

  async verifyEmail(email, code) {
    try {
      const response = await axios.post(`${this.baseURL}/verify-email`, {
        email,
        code
      });
      
      if (response.data.accessToken) {
        await this.storeToken(response.data.accessToken);
        if (response.data.user) {
          await this.storeUserData(response.data.user);
        }
      }
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Email verification failed');
    }
  }

  // Google Authentication using Supabase
  async signInWithGoogle() {
    try {
      console.log('Starting Google Sign-In with Supabase...');
      
      // Check if Google Play Services are available (Android)
      if (Platform.OS === 'android') {
        await GoogleSignin.hasPlayServices();
        console.log('Google Play Services available');
      }
      
      // Sign in with Google to get ID token
      const userInfo = await GoogleSignin.signIn();
      console.log('Google Sign-In successful:', userInfo);
      
      if (userInfo.data && userInfo.data.idToken) {
        console.log('ID Token received, authenticating with Supabase...');
        
        // Sign in with Supabase using Google ID token
        const { data: authData, error: authError } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo.data.idToken,
        });

        if (authError) {
          throw new Error(authError.message);
        }

        console.log('Supabase Google auth successful:', authData);

        // Create user record in backend database if new user
        if (authData.user) {
          await this.createUserInBackend({
            supabaseUserId: authData.user.id,
            email: authData.user.email,
            firstName: authData.user.user_metadata?.first_name || authData.user.user_metadata?.full_name?.split(' ')[0],
            lastName: authData.user.user_metadata?.last_name || authData.user.user_metadata?.full_name?.split(' ').slice(1).join(' '),
            authType: 'google',
            avatarUrl: authData.user.user_metadata?.avatar_url
          });
        }

        // Get user profiles from backend
        const userProfiles = await this.getUserProfiles(authData.user.id);

        return {
          user: authData.user,
          session: authData.session,
          profiles: userProfiles
        };
      }

      throw new Error('No ID token received from Google');
    } catch (error) {
      console.error('Google Sign-In error:', error);
      
      if (error.code === 'statusCodes.SIGN_IN_CANCELLED') {
        throw new Error('Google Sign-In was cancelled');
      } else if (error.code === 'statusCodes.IN_PROGRESS') {
        throw new Error('Google Sign-In is already in progress');
      } else if (error.code === 'statusCodes.PLAY_SERVICES_NOT_AVAILABLE') {
        throw new Error('Google Play Services not available');
      }
      
      throw new Error(error.message || 'Google authentication failed');
    }
  }


  async getToken() {
    try {
      return await AsyncStorage.getItem(this.tokenKey);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  async storeUserData(userData) {
    try {
      await AsyncStorage.setItem(this.userKey, JSON.stringify(userData));
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  }

  async getUserData() {
    try {
      const userData = await AsyncStorage.getItem(this.userKey);
      console.log('User data:', userData);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  async logout() {
    try {
      await AsyncStorage.multiRemove([this.tokenKey, this.userKey]);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  async isAuthenticated() {
    const token = await this.getToken();
    return !!token;
  }

  // Get current user
  async getCurrentUser() {
    return await this.getUserData();
  }

  // Update user profile
  async updateUserProfile(updates) {
    try {
      const token = await this.getToken();
      const response = await axios.put(`${this.baseURL}/profile`, updates, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Update local storage
      const userData = await this.getUserData();
      if (userData) {
        const updatedUserData = {
          ...userData,
          firstName: updates.first_name || userData.firstName,
          lastName: updates.last_name || userData.lastName,
        };
        await this.storeUserData(updatedUserData);
      }

      return response.data.user;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  }

  // Forgot Password
  async forgotPassword(email) {
    try {
      const response = await axios.post(`${this.baseURL}/forgot-password`, {
        email
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Forgot password request failed');
    }
  }

  // Reset Password
  async resetPassword(token, newPassword) {
    try {
      const response = await axios.post(`${this.baseURL}/reset-password?token=${token}`, {
        newPassword
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Password reset failed');
    }
  }

  // Verify email with code
  async verifyEmailCode(email, code) {
    try {
      console.log('Verifying email code...');
      const response = await axios.post(`${this.baseURL}/users/verify-email`, {
        email,
        code
      });
      console.log('Email verified:', response.data);
      return response.data;
    } catch (error) {
      console.error('Email verification error:', error);
      throw new Error(error.response?.data?.message || 'Email verification failed');
    }
  }

  // Resend verification code
  async resendVerificationCode(email) {
    try {
      console.log('Resending verification code...');
      const response = await axios.post(`${this.baseURL}/users/send-verification`, {
        email
      });
      console.log('Verification code sent:', response.data);
      return response.data;
    } catch (error) {
      console.error('Resend verification error:', error);
      throw new Error(error.response?.data?.message || 'Failed to resend code');
    }
  }

  // Create profile after verification
  async createProfile(supabaseUserId, firstName, lastName, role, avatarUrl = null) {
    try {
      console.log('Creating profile...');
      const payload = {
        supabaseUserId,
        firstName,
        lastName,
        role
      };
      
      // Only include avatarUrl if provided, otherwise backend will generate Gravatar
      if (avatarUrl) {
        payload.avatarUrl = avatarUrl;
      }
      
      const response = await axios.post(`${this.baseURL}/profiles`, payload);
      console.log('Profile created:', response.data);
      return response.data;
    } catch (error) {
      console.error('Profile creation error:', error);
      throw new Error(error.response?.data?.message || 'Profile creation failed');
    }
  }

  // Helper method to create user in backend database
  async createUserInBackend(userData, accessToken = null) {
    try {
      console.log('Creating user in backend database:', userData);
      
      const headers = {};
      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }
      
      const response = await axios.post(`${this.baseURL}/users`, userData, { headers });
      console.log('User created in backend:', response.data);
      return response.data;
    } catch (error) {
      // If user already exists, that's okay - just log it
      if (error.response?.status === 409) {
        console.log('User already exists in backend');
        return null;
      }
      console.error('Error creating user in backend:', error);
      console.error('Error details:', error.response?.data);
      // Don't throw error - user is already created in Supabase
      return null;
    }
  }

  // Helper method to get user profiles from backend
  async getUserProfiles(supabaseUserId) {
    try {
      console.log('Fetching user profiles for:', supabaseUserId);
      const response = await axios.get(`${this.baseURL}/users/${supabaseUserId}/profiles`);
      console.log('User profiles fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profiles:', error);
      // Return empty array if no profiles found
      return [];
    }
  }

  // ============================================
  // AsyncStorage Session Management Methods
  // ============================================

  /**
   * Store user data in AsyncStorage
   * @param {Object} userData - User data to store
   */
  async storeUserData(userData) {
    try {
      await AsyncStorage.setItem(this.userKey, JSON.stringify(userData));
      console.log('User data stored successfully');
    } catch (error) {
      console.error('Failed to store user data:', error);
      throw new Error('Failed to save user data');
    }
  }

  /**
   * Get user data from AsyncStorage
   * @returns {Object|null} User data or null
   */
  async getUserData() {
    try {
      const userData = await AsyncStorage.getItem(this.userKey);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      return null;
    }
  }

  /**
   * Store authentication token
   * @param {string} token - JWT token
   */
  async storeToken(token) {
    try {
      await AsyncStorage.setItem(this.tokenKey, token);
      console.log('Token stored successfully');
    } catch (error) {
      console.error('Failed to store token:', error);
      throw new Error('Failed to save token');
    }
  }

  /**
   * Get authentication token
   * @returns {string|null} Token or null
   */
  async getToken() {
    try {
      return await AsyncStorage.getItem(this.tokenKey);
    } catch (error) {
      console.error('Failed to fetch token:', error);
      return null;
    }
  }

  /**
   * Mark user as onboarded
   */
  async setOnboarded() {
    try {
      await AsyncStorage.setItem(this.onboardedKey, 'true');
      console.log('User marked as onboarded');
    } catch (error) {
      console.error('Failed to set onboarded status:', error);
    }
  }

  /**
   * Check if user has completed onboarding
   * @returns {boolean} True if onboarded
   */
  async isOnboarded() {
    try {
      const value = await AsyncStorage.getItem(this.onboardedKey);
      return value === 'true';
    } catch (error) {
      console.error('Failed to check onboarded status:', error);
      return false;
    }
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} True if authenticated
   */
  async isAuthenticated() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return !!session;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }

  /**
   * Get current Supabase session
   * @returns {Object|null} Session object or null
   */
  async checkSession() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    } catch (error) {
      console.error('Error checking session:', error);
      return null;
    }
  }

  /**
   * Clear all stored data (logout)
   */
  async clearStorage() {
    try {
      await AsyncStorage.multiRemove([
        this.userKey,
        this.tokenKey,
        this.onboardedKey,
        '@temp_user_data'
      ]);
      console.log('Storage cleared successfully');
    } catch (error) {
      console.error('Failed to clear storage:', error);
      throw new Error('Failed to clear storage');
    }
  }

  /**
   * Logout user - clear storage and Supabase session
   */
  async logout() {
    try {
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      // Clear local storage
      await this.clearStorage();
      
      console.log('User logged out successfully');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Failed to logout');
    }
  }

  /**
   * Send password reset email
   * @param {string} email - User's email address
   * @returns {Object} Success response
   */
  async forgotPassword(email) {
    try {
      console.log('Sending password reset email to:', email);
      
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'sharegrid://reset-password', // Deep link for mobile app
      });

      if (error) {
        console.error('Forgot password error:', error);
        throw new Error(error.message);
      }

      console.log('Password reset email sent successfully');
      return { 
        success: true, 
        message: 'Password reset email sent successfully' 
      };
    } catch (error) {
      console.error('Forgot password error:', error);
      throw new Error(error.message || 'Failed to send password reset email');
    }
  }

  /**
   * Reset password with new password
   * @param {string} newPassword - New password
   * @returns {Object} Success response
   */
  async resetPassword(newPassword) {
    try {
      console.log('Resetting password...');
      
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        console.error('Reset password error:', error);
        throw new Error(error.message);
      }

      console.log('Password reset successfully');
      return { 
        success: true, 
        message: 'Password reset successfully',
        user: data.user 
      };
    } catch (error) {
      console.error('Reset password error:', error);
      throw new Error(error.message || 'Failed to reset password');
    }
  }

  /**
   * Verify reset password token and set session
   * @param {string} accessToken - Access token from reset link
   * @param {string} refreshToken - Refresh token from reset link
   * @returns {Object} Session data
   */
  async verifyResetToken(accessToken, refreshToken) {
    try {
      console.log('Verifying reset password token...');
      
      const { data, error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      });

      if (error) {
        console.error('Token verification error:', error);
        throw new Error(error.message);
      }

      console.log('Reset token verified successfully');
      return { 
        success: true, 
        session: data.session,
        user: data.user 
      };
    } catch (error) {
      console.error('Token verification error:', error);
      throw new Error(error.message || 'Invalid or expired reset token');
    }
  }

  /**
   * Change password for authenticated user
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Object} Success response
   */
  async changePassword(currentPassword, newPassword) {
    try {
      console.log('Changing password...');
      
      // First verify current password by attempting to sign in
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('User not authenticated');
      }

      // Re-authenticate with current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: session.user.email,
        password: currentPassword
      });

      if (signInError) {
        throw new Error('Current password is incorrect');
      }

      // Update password
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        console.error('Change password error:', error);
        throw new Error(error.message);
      }

      console.log('Password changed successfully');
      return { 
        success: true, 
        message: 'Password changed successfully' 
      };
    } catch (error) {
      console.error('Change password error:', error);
      throw new Error(error.message || 'Failed to change password');
    }
  }

  /**
   * Get all stored keys (for debugging)
   * @returns {Array} Array of storage keys
   */
  async getAllKeys() {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Failed to get all keys:', error);
      return [];
    }
  }
}

export default new AuthService();
