import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

class DashboardService {
  constructor() {
    this.baseURL = 'http://localhost:3001/api';
  }

  // ============================================
  // Wallet Methods
  // ============================================

  /**
   * Get wallet balance for a profile
   * @param {string} profileId - Profile ID
   * @returns {Object} Balance info { balance, currency }
   */
  async getBalance(profileId) {
    try {
      const response = await axios.get(`${this.baseURL}/wallets/${profileId}/balance`);
      return response.data?.data || { balance: 0, currency: 'NGN' };
    } catch (error) {
      console.error('Error fetching balance:', error);
      return { balance: 0, currency: 'NGN' };
    }
  }

  /**
   * Get transaction history
   * @param {string} profileId - Profile ID
   * @param {number} limit - Max transactions
   * @param {number} offset - Offset for pagination
   * @returns {Array} Array of transactions
   */
  async getTransactionHistory(profileId, limit = 20, offset = 0) {
    try {
      const response = await axios.get(
        `${this.baseURL}/wallets/${profileId}/transactions`,
        { params: { limit, offset } }
      );
      return response.data?.data || [];
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  }

  // ============================================
  // Location Methods
  // ============================================

  /**
   * Update user location
   * @param {string} profileId - Profile ID
   * @param {Object} locationData - Location data
   * @returns {Object} Updated location
   */
  async updateLocation(profileId, locationData) {
    try {
      const response = await axios.put(
        `${this.baseURL}/locations/${profileId}`,
        locationData
      );
      return response.data?.data || null;
    } catch (error) {
      console.error('Error updating location:', error);
      throw new Error(error.response?.data?.message || 'Failed to update location');
    }
  }

  /**
   * Get user location
   * @param {string} profileId - Profile ID
   * @returns {Object|null} Location data
   */
  async getLocation(profileId) {
    try {
      const response = await axios.get(`${this.baseURL}/locations/${profileId}`);
      return response.data?.data || null;
    } catch (error) {
      console.error('Error fetching location:', error);
      return null;
    }
  }

  /**
   * Get formatted location string
   * @param {string} profileId - Profile ID
   * @returns {string|null} Formatted location (e.g., "Lagos, NG")
   */
  async getFormattedLocation(profileId) {
    try {
      const response = await axios.get(`${this.baseURL}/locations/${profileId}/formatted`);
      return response.data?.data?.formatted || null;
    } catch (error) {
      console.error('Error fetching formatted location:', error);
      return null;
    }
  }

  // ============================================
  // Hotspot Methods
  // ============================================

  /**
   * Get nearby hotspots
   * @param {number} latitude - User latitude
   * @param {number} longitude - User longitude
   * @param {number} radius - Search radius in km (default 5)
   * @param {number} limit - Max results (default 20)
   * @returns {Array} Array of nearby hotspots
   */
  async getNearbyHotspots(latitude, longitude, radius = 5, limit = 20) {
    try {
      const response = await axios.get(`${this.baseURL}/hotspots/nearby`, {
        params: { latitude, longitude, radius, limit }
      });
      return response.data?.data || [];
    } catch (error) {
      console.error('Error fetching nearby hotspots:', error);
      return [];
    }
  }

  /**
   * Get hotspot by ID
   * @param {string} hotspotId - Hotspot ID
   * @returns {Object|null} Hotspot data
   */
  async getHotspotById(hotspotId) {
    try {
      const response = await axios.get(`${this.baseURL}/hotspots/${hotspotId}`);
      return response.data?.data || null;
    } catch (error) {
      console.error('Error fetching hotspot:', error);
      return null;
    }
  }

  /**
   * Get hotspots by host
   * @param {string} hostProfileId - Host profile ID
   * @returns {Array} Array of hotspots
   */
  async getHotspotsByHost(hostProfileId) {
    try {
      const response = await axios.get(`${this.baseURL}/hotspots/host/${hostProfileId}`);
      return response.data?.data || [];
    } catch (error) {
      console.error('Error fetching host hotspots:', error);
      return [];
    }
  }

  /**
   * Create a new hotspot
   * @param {Object} hotspotData - Hotspot data
   * @returns {Object} Created hotspot
   */
  async createHotspot(hotspotData) {
    try {
      const response = await axios.post(`${this.baseURL}/hotspots`, hotspotData);
      return response.data?.data || null;
    } catch (error) {
      console.error('Error creating hotspot:', error);
      throw new Error(error.response?.data?.message || 'Failed to create hotspot');
    }
  }

  /**
   * Update a hotspot
   * @param {string} hotspotId - Hotspot ID
   * @param {Object} updates - Updates to apply
   * @returns {Object} Updated hotspot
   */
  async updateHotspot(hotspotId, updates) {
    try {
      const response = await axios.put(`${this.baseURL}/hotspots/${hotspotId}`, updates);
      return response.data?.data || null;
    } catch (error) {
      console.error('Error updating hotspot:', error);
      throw new Error(error.response?.data?.message || 'Failed to update hotspot');
    }
  }

  /**
   * Delete a hotspot
   * @param {string} hotspotId - Hotspot ID
   */
  async deleteHotspot(hotspotId) {
    try {
      await axios.delete(`${this.baseURL}/hotspots/${hotspotId}`);
    } catch (error) {
      console.error('Error deleting hotspot:', error);
      throw new Error(error.response?.data?.message || 'Failed to delete hotspot');
    }
  }

  /**
   * Rate a hotspot
   * @param {string} hotspotId - Hotspot ID
   * @param {string} userProfileId - User profile ID
   * @param {number} rating - Rating (1-5)
   * @param {string} review - Optional review
   * @returns {Object} Rating data
   */
  async rateHotspot(hotspotId, userProfileId, rating, review = null) {
    try {
      const response = await axios.post(`${this.baseURL}/hotspots/${hotspotId}/rate`, {
        userProfileId,
        rating,
        review
      });
      return response.data?.data || null;
    } catch (error) {
      console.error('Error rating hotspot:', error);
      throw new Error(error.response?.data?.message || 'Failed to rate hotspot');
    }
  }

  // ============================================
  // Dashboard Data (Combined)
  // ============================================

  /**
   * Get all dashboard data for a user profile
   * @param {string} profileId - Profile ID
   * @param {Object} location - User's current location { latitude, longitude }
   * @returns {Object} Dashboard data
   */
  async getDashboardData(profileId, location = null) {
    try {
      const [balance, userLocation] = await Promise.all([
        this.getBalance(profileId),
        this.getLocation(profileId)
      ]);

      let nearbyHotspots = [];
      const lat = location?.latitude || userLocation?.latitude;
      const lng = location?.longitude || userLocation?.longitude;

      if (lat && lng) {
        nearbyHotspots = await this.getNearbyHotspots(lat, lng, 5, 10);
      }

      return {
        balance,
        location: userLocation,
        nearbyHotspots
      };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      return {
        balance: { balance: 0, currency: 'NGN' },
        location: null,
        nearbyHotspots: []
      };
    }
  }

  // ============================================
  // Helper Methods
  // ============================================

  /**
   * Format balance for display
   * @param {number} balance - Balance amount
   * @returns {string} Formatted balance (e.g., "5,334.90")
   */
  formatBalance(balance) {
    return new Intl.NumberFormat('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(balance || 0);
  }

  /**
   * Format distance for display
   * @param {number} distanceKm - Distance in kilometers
   * @returns {string} Formatted distance (e.g., "0.2 km away")
   */
  formatDistance(distanceKm) {
    if (distanceKm < 1) {
      return `${Math.round(distanceKm * 1000)} m away`;
    }
    return `${distanceKm.toFixed(1)} km away`;
  }
}

export default new DashboardService();
