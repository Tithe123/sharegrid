import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001/api';

/**
 * Wallet Service
 * Handles both fiat (NGN) and crypto (ETH on Base) wallet operations
 * All crypto operations are custodial - handled by the backend
 */
class WalletService {
  constructor() {
    this.baseURL = API_URL;
  }

  // ============================================
  // Crypto Wallet Methods (Custodial - Base Network)
  // ============================================

  /**
   * Get crypto wallet info for a user
   * @param {string} userId - User ID
   * @returns {Object} Wallet info (address, network, createdAt)
   */
  async getCryptoWallet(userId) {
    try {
      const response = await axios.get(`${this.baseURL}/wallet/crypto/${userId}/wallet`);
      return response.data.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return null;
      }
      console.error('Error fetching crypto wallet:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch wallet');
    }
  }

  /**
   * Create crypto wallet for a user
   * @param {string} userId - User ID
   * @returns {Object} Created wallet info
   */
  async createCryptoWallet(userId) {
    try {
      const response = await axios.post(`${this.baseURL}/wallet/crypto/${userId}/wallet`);
      return response.data.data;
    } catch (error) {
      console.error('Error creating crypto wallet:', error);
      throw new Error(error.response?.data?.message || 'Failed to create wallet');
    }
  }

  /**
   * Get native ETH balance
   * @param {string} userId - User ID
   * @param {string} network - Network (base or base-sepolia)
   * @returns {Object} Balance info
   */
  async getCryptoBalance(userId, network = 'base-sepolia') {
    try {
      const response = await axios.get(
        `${this.baseURL}/wallet/crypto/${userId}/balance?network=${network}`
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching crypto balance:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch balance');
    }
  }

  /**
   * Get ERC20 token balance
   * @param {string} userId - User ID
   * @param {string} tokenAddress - Token contract address
   * @param {string} network - Network (base or base-sepolia)
   * @returns {Object} Token balance info
   */
  async getTokenBalance(userId, tokenAddress, network = 'base-sepolia') {
    try {
      const response = await axios.get(
        `${this.baseURL}/wallet/crypto/${userId}/token-balance?network=${network}&token=${tokenAddress}`
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching token balance:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch token balance');
    }
  }

  /**
   * Send native ETH
   * @param {string} userId - User ID
   * @param {string} toAddress - Recipient address
   * @param {string} amount - Amount in ETH
   * @param {string} network - Network (base or base-sepolia)
   * @returns {Object} Transaction result
   */
  async sendCrypto(userId, toAddress, amount, network = 'base-sepolia') {
    try {
      const response = await axios.post(
        `${this.baseURL}/wallet/crypto/${userId}/send-native`,
        { to: toAddress, amount, network }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error sending crypto:', error);
      throw new Error(error.response?.data?.message || 'Failed to send transaction');
    }
  }

  /**
   * Send ERC20 tokens
   * @param {string} userId - User ID
   * @param {string} tokenAddress - Token contract address
   * @param {string} toAddress - Recipient address
   * @param {string} amount - Amount in token units
   * @param {string} network - Network (base or base-sepolia)
   * @returns {Object} Transaction result
   */
  async sendToken(userId, tokenAddress, toAddress, amount, network = 'base-sepolia') {
    try {
      const response = await axios.post(
        `${this.baseURL}/wallet/crypto/${userId}/send-token`,
        { token: tokenAddress, to: toAddress, amount, network }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error sending token:', error);
      throw new Error(error.response?.data?.message || 'Failed to send token');
    }
  }

  /**
   * Get crypto transaction history
   * @param {string} userId - User ID
   * @param {number} limit - Max transactions to return
   * @returns {Array} Transaction history
   */
  async getCryptoTransactions(userId, limit = 50) {
    try {
      const response = await axios.get(
        `${this.baseURL}/wallet/crypto/${userId}/transactions?limit=${limit}`
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching crypto transactions:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch transactions');
    }
  }

  // ============================================
  // Fiat Wallet Methods (Paystack/NGN)
  // ============================================

  /**
   * Get fiat wallet balance
   * @param {string} profileId - Profile ID
   * @returns {Object} Balance info
   */
  async getFiatBalance(profileId) {
    try {
      const response = await axios.get(`${this.baseURL}/wallet/fiat/${profileId}/balance`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching fiat balance:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch balance');
    }
  }

  /**
   * Initialize fiat funding (Paystack)
   * @param {string} profileId - Profile ID
   * @param {number} amount - Amount in NGN
   * @returns {Object} Payment initialization data
   */
  async initializeFunding(profileId, amount) {
    try {
      const response = await axios.post(
        `${this.baseURL}/wallet/fiat/${profileId}/initialize-funding`,
        { amount }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error initializing funding:', error);
      throw new Error(error.response?.data?.message || 'Failed to initialize funding');
    }
  }

  /**
   * Verify fiat payment
   * @param {string} reference - Payment reference
   * @returns {Object} Verification result
   */
  async verifyPayment(reference) {
    try {
      const response = await axios.post(
        `${this.baseURL}/wallet/fiat/verify-payment`,
        { reference }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw new Error(error.response?.data?.message || 'Failed to verify payment');
    }
  }

  /**
   * Initiate fiat withdrawal
   * @param {string} profileId - Profile ID
   * @param {number} amount - Amount in NGN
   * @param {string} bankCode - Bank code
   * @param {string} accountNumber - Account number
   * @returns {Object} Withdrawal result
   */
  async withdrawFiat(profileId, amount, bankCode, accountNumber) {
    try {
      const response = await axios.post(
        `${this.baseURL}/wallet/fiat/${profileId}/withdraw`,
        { amount, bankCode, accountNumber }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error withdrawing fiat:', error);
      throw new Error(error.response?.data?.message || 'Failed to initiate withdrawal');
    }
  }

  /**
   * Get fiat transaction history
   * @param {string} profileId - Profile ID
   * @param {number} limit - Max transactions to return
   * @returns {Array} Transaction history
   */
  async getFiatTransactions(profileId, limit = 20) {
    try {
      const response = await axios.get(
        `${this.baseURL}/wallet/fiat/${profileId}/transactions?limit=${limit}`
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching fiat transactions:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch transactions');
    }
  }

  /**
   * Get list of banks
   * @returns {Array} List of banks
   */
  async getBanks() {
    try {
      const response = await axios.get(`${this.baseURL}/wallet/fiat/banks`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching banks:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch banks');
    }
  }

  /**
   * Resolve bank account
   * @param {string} accountNumber - Account number
   * @param {string} bankCode - Bank code
   * @returns {Object} Account details
   */
  async resolveAccount(accountNumber, bankCode) {
    try {
      const response = await axios.post(
        `${this.baseURL}/wallet/fiat/resolve-account`,
        { accountNumber, bankCode }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error resolving account:', error);
      throw new Error(error.response?.data?.message || 'Failed to resolve account');
    }
  }

  // ============================================
  // Helper Methods
  // ============================================

  /**
   * Get current user ID from storage
   * @returns {string|null} User ID
   */
  async getCurrentUserId() {
    try {
      const userData = await AsyncStorage.getItem('@sharegrid_user');
      if (userData) {
        const parsed = JSON.parse(userData);
        return parsed.supabaseUserId || parsed.id;
      }
      return null;
    } catch (error) {
      console.error('Error getting user ID:', error);
      return null;
    }
  }

  /**
   * Get current profile ID from storage
   * @returns {string|null} Profile ID
   */
  async getCurrentProfileId() {
    try {
      const profiles = await AsyncStorage.getItem('@sharegrid_profile');
      if (profiles) {
        const parsed = JSON.parse(profiles);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed[0].id;
        }
      }
      return null;
    } catch (error) {
      console.error('Error getting profile ID:', error);
      return null;
    }
  }

  /**
   * Validate Ethereum address
   * @param {string} address - Address to validate
   * @returns {boolean} True if valid
   */
  isValidAddress(address) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }

  /**
   * Format ETH amount for display
   * @param {string} amount - Amount in ETH
   * @param {number} decimals - Decimal places
   * @returns {string} Formatted amount
   */
  formatEth(amount, decimals = 6) {
    const num = parseFloat(amount);
    if (isNaN(num)) return '0';
    return num.toFixed(decimals);
  }

  /**
   * Format fiat amount for display
   * @param {number} amount - Amount in NGN
   * @returns {string} Formatted amount
   */
  formatNgn(amount) {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  }
}

export default new WalletService();
