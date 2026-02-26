import { useState, useEffect, useCallback } from 'react';
import walletService from '../services/walletService';

/**
 * Custom hook for wallet operations
 * Uses backend custodial wallet system
 * 
 * @param {string} userId - User ID (from users table)
 * @returns {Object} Wallet state and methods
 */
export function useWallet(userId) {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [network, setNetwork] = useState('base-sepolia');

  /**
   * Fetch wallet info from backend
   */
  const fetchWallet = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return null;
    }

    try {
      const walletData = await walletService.getCryptoWallet(userId);
      setWallet(walletData);
      return walletData;
    } catch (err) {
      console.error('Error fetching wallet:', err);
      setError(err.message);
      return null;
    }
  }, [userId]);

  /**
   * Create wallet if it doesn't exist
   */
  const createWallet = useCallback(async () => {
    if (!userId) {
      throw new Error('User ID is required');
    }

    try {
      setLoading(true);
      setError(null);
      const walletData = await walletService.createCryptoWallet(userId);
      setWallet(walletData);
      return walletData;
    } catch (err) {
      console.error('Error creating wallet:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Fetch native ETH balance
   */
  const fetchBalance = useCallback(async () => {
    if (!userId) return null;

    try {
      const balanceData = await walletService.getCryptoBalance(userId, network);
      setBalance(balanceData);
      return balanceData;
    } catch (err) {
      console.error('Error fetching balance:', err);
      return null;
    }
  }, [userId, network]);

  /**
   * Initialize wallet - fetch or create
   */
  const initializeWallet = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Try to fetch existing wallet
      let walletData = await fetchWallet();

      // Create if doesn't exist
      if (!walletData) {
        console.log('No wallet found, creating new one...');
        walletData = await createWallet();
      }

      // Fetch balance
      if (walletData) {
        await fetchBalance();
      }
    } catch (err) {
      console.error('Error initializing wallet:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId, fetchWallet, createWallet, fetchBalance]);

  /**
   * Send native ETH
   */
  const sendTransaction = useCallback(async (toAddress, amount) => {
    if (!userId) {
      throw new Error('User ID is required');
    }

    if (!walletService.isValidAddress(toAddress)) {
      throw new Error('Invalid recipient address');
    }

    try {
      const result = await walletService.sendCrypto(userId, toAddress, amount, network);
      
      // Refresh balance after sending
      await fetchBalance();
      
      return result;
    } catch (err) {
      console.error('Error sending transaction:', err);
      throw err;
    }
  }, [userId, network, fetchBalance]);

  /**
   * Send ERC20 tokens
   */
  const sendToken = useCallback(async (tokenAddress, toAddress, amount) => {
    if (!userId) {
      throw new Error('User ID is required');
    }

    if (!walletService.isValidAddress(tokenAddress)) {
      throw new Error('Invalid token address');
    }

    if (!walletService.isValidAddress(toAddress)) {
      throw new Error('Invalid recipient address');
    }

    try {
      const result = await walletService.sendToken(userId, tokenAddress, toAddress, amount, network);
      
      // Refresh balance after sending
      await fetchBalance();
      
      return result;
    } catch (err) {
      console.error('Error sending token:', err);
      throw err;
    }
  }, [userId, network, fetchBalance]);

  /**
   * Get token balance
   */
  const getTokenBalance = useCallback(async (tokenAddress) => {
    if (!userId) {
      throw new Error('User ID is required');
    }

    try {
      return await walletService.getTokenBalance(userId, tokenAddress, network);
    } catch (err) {
      console.error('Error getting token balance:', err);
      throw err;
    }
  }, [userId, network]);

  /**
   * Get transaction history
   */
  const getTransactionHistory = useCallback(async (limit = 50) => {
    if (!userId) {
      return [];
    }

    try {
      return await walletService.getCryptoTransactions(userId, limit);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      return [];
    }
  }, [userId]);

  /**
   * Switch network
   */
  const switchNetwork = useCallback((newNetwork) => {
    if (newNetwork !== 'base' && newNetwork !== 'base-sepolia') {
      throw new Error('Invalid network. Use "base" or "base-sepolia"');
    }
    setNetwork(newNetwork);
  }, []);

  // Initialize on mount
  useEffect(() => {
    if (userId) {
      initializeWallet();
    }
  }, [userId, initializeWallet]);

  // Refresh balance when network changes
  useEffect(() => {
    if (userId && wallet) {
      fetchBalance();
    }
  }, [network, userId, wallet, fetchBalance]);

  return {
    // State
    wallet,
    balance,
    loading,
    error,
    network,
    
    // Wallet info
    address: wallet?.address || wallet?.wallet_address,
    
    // Actions
    initializeWallet,
    createWallet,
    fetchBalance,
    sendTransaction,
    sendToken,
    getTokenBalance,
    getTransactionHistory,
    switchNetwork,
    
    // Helpers
    isValidAddress: walletService.isValidAddress,
    formatEth: walletService.formatEth
  };
}

export default useWallet;
