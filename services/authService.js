import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { supabase } from '../utils/supabase';
import { AUTH_CONFIG } from '../config/auth.config';

class AuthService {
  constructor() {
    this.baseURL = 'http://localhost:3001/api'; // Backend API for user/profile management
    
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
      
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
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

      // Create user record in backend database
      if (authData.user) {
        await this.createUserInBackend({
          supabaseUserId: authData.user.id,
          email: authData.user.email,
          firstName,
          lastName,
          authType: 'email'
        });
      }

      return {
        user: authData.user,
        session: authData.session,
        needsEmailVerification: !authData.session
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

  // Apple Authentication
  async signInWithApple() {
    try {
      if (Platform.OS !== 'ios') {
        throw new Error('Apple Sign-In is only available on iOS');
      }

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential.identityToken) {
        // Send the credential to your backend
        const response = await axios.post(`${this.baseURL}/apple-auth`, {
          identityToken: credential.identityToken,
          authorizationCode: credential.authorizationCode,
          fullName: credential.fullName,
          email: credential.email
        });

        if (response.data.accessToken) {
          await this.storeToken(response.data.accessToken);
          await this.storeUserData(response.data.user);
        }

        return response.data;
      }

      throw new Error('No identity token received from Apple');
    } catch (error) {
      if (error.code === 'ERR_REQUEST_CANCELED') {
        throw new Error('Apple Sign-In was cancelled');
      }
      throw new Error(error.response?.data?.message || error.message || 'Apple authentication failed');
    }
  }

  // Token and User Data Management
  async storeToken(token) {
    try {
      await AsyncStorage.setItem(this.tokenKey, token);
    } catch (error) {
      console.error('Error storing token:', error);
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
}

export default new AuthService();
