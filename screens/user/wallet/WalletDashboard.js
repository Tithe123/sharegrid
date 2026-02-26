import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import walletService from '../../../services/walletService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001/api';
const DEFAULT_NETWORK = 'base-sepolia';

export default function WalletDashboard({ navigation, route }) {
  const { profileId } = route.params;
  
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fiatBalance, setFiatBalance] = useState(null);
  const [cryptoBalance, setCryptoBalance] = useState(null);
  const [cryptoWallet, setCryptoWallet] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    loadWalletData();
  }, []);

  const loadWalletData = async () => {
    try {
      setLoading(true);
      
      // Get user ID from storage
      const userData = await AsyncStorage.getItem('@sharegrid_user');
      let uid = null;
      if (userData) {
        const parsed = JSON.parse(userData);
        uid = parsed.supabaseUserId || parsed.id;
        setUserId(uid);
      }
      
      // Load fiat balance
      try {
        const fiatResponse = await axios.get(
          `${API_URL}/wallet/fiat/${profileId}/balance`
        );
        setFiatBalance(fiatResponse.data.data);
      } catch (err) {
        console.log('Fiat wallet not found, will be created on first fund');
        setFiatBalance({ balance: 0, lockedBalance: 0 });
      }
      
      // Load crypto wallet using walletService
      if (uid) {
        try {
          const wallet = await walletService.getCryptoWallet(uid);
          if (wallet) {
            setCryptoWallet({
              address: wallet.address || wallet.wallet_address,
              network: wallet.network
            });
            
            // Load balance
            try {
              const balanceData = await walletService.getCryptoBalance(uid, DEFAULT_NETWORK);
              setCryptoBalance({
                balanceFormatted: balanceData?.balance?.formatted || '0',
                symbol: balanceData?.balance?.symbol || 'ETH',
                network: DEFAULT_NETWORK
              });
            } catch (balanceErr) {
              console.log('Could not fetch crypto balance:', balanceErr.message);
              setCryptoBalance({ balanceFormatted: '0', symbol: 'ETH', network: DEFAULT_NETWORK });
            }
          } else {
            setCryptoWallet(null);
            setCryptoBalance(null);
          }
        } catch (err) {
          console.log('Crypto wallet not found yet');
          setCryptoWallet(null);
          setCryptoBalance(null);
        }
      }
      
      // Load recent fiat transactions
      try {
        const txResponse = await axios.get(
          `${API_URL}/wallet/fiat/${profileId}/transactions?limit=5`
        );
        setRecentTransactions(txResponse.data.data || []);
      } catch (err) {
        console.log('No transactions yet');
        setRecentTransactions([]);
      }
      
    } catch (error) {
      console.error('Error loading wallet data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadWalletData();
  };

  const formatCurrency = (amount) => {
    return `₦${parseFloat(amount || 0).toLocaleString('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const formatCrypto = (amount, symbol) => {
    return `${parseFloat(amount || 0).toFixed(6)} ${symbol}`;
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'funding':
        return { name: 'arrow-down-circle', color: '#10B981' };
      case 'transfer_out':
        return { name: 'arrow-up-circle', color: '#EF4444' };
      case 'transfer_in':
        return { name: 'arrow-down-circle', color: '#10B981' };
      case 'withdrawal':
        return { name: 'cash-outline', color: '#F59E0B' };
      default:
        return { name: 'swap-horizontal', color: '#6B7280' };
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7C3AED" />
        <Text style={styles.loadingText}>Loading wallet...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wallet</Text>
        <TouchableOpacity onPress={() => navigation.navigate('WalletSettings')}>
          <Ionicons name="settings-outline" size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      {/* Fiat Wallet Card */}
      <View style={styles.walletCard}>
        <View style={styles.walletHeader}>
          <View>
            <Text style={styles.walletLabel}>Fiat Balance (NGN)</Text>
            <Text style={styles.walletBalance}>
              {formatCurrency(fiatBalance?.balance)}
            </Text>
            {fiatBalance?.lockedBalance > 0 && (
              <Text style={styles.lockedBalance}>
                Locked: {formatCurrency(fiatBalance.lockedBalance)}
              </Text>
            )}
          </View>
          <View style={styles.currencyIcon}>
            <Text style={styles.currencySymbol}>₦</Text>
          </View>
        </View>

        {/* Fiat Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('FundWallet', { profileId })}
          >
            <Ionicons name="add-circle" size={24} color="#7C3AED" />
            <Text style={styles.actionText}>Fund</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('TransferFunds', { profileId })}
          >
            <Ionicons name="swap-horizontal" size={24} color="#7C3AED" />
            <Text style={styles.actionText}>Transfer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('WithdrawFunds', { profileId })}
          >
            <Ionicons name="cash-outline" size={24} color="#7C3AED" />
            <Text style={styles.actionText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Crypto Wallet Card */}
      <View style={styles.walletCard}>
        <View style={styles.walletHeader}>
          <View style={{ flex: 1 }}>
            <View style={styles.networkBadge}>
              <Text style={styles.networkText}>Base Sepolia (Testnet)</Text>
            </View>
            <Text style={styles.walletLabel}>Crypto Balance (ETH)</Text>
            {cryptoWallet ? (
              <>
                <Text style={styles.walletBalance}>
                  {formatCrypto(cryptoBalance?.balanceFormatted, cryptoBalance?.symbol || 'ETH')}
                </Text>
                <TouchableOpacity 
                  onPress={() => {
                    if (cryptoWallet?.address) {
                      // Copy address to clipboard
                      Alert.alert('Wallet Address', cryptoWallet.address);
                    }
                  }}
                >
                  <Text style={styles.walletAddress} numberOfLines={1}>
                    {cryptoWallet?.address ? 
                      `${cryptoWallet.address.slice(0, 10)}...${cryptoWallet.address.slice(-8)}` : 
                      'No address'
                    }
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.noWalletContainer}>
                <Text style={styles.noWalletText}>No wallet connected</Text>
                <TouchableOpacity 
                  style={styles.connectWalletButton}
                  onPress={() => navigation.navigate('ConnectWallet', { profileId })}
                >
                  <Text style={styles.connectWalletText}>Create Wallet</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={[styles.currencyIcon, { backgroundColor: '#EEF2FF' }]}>
            <Ionicons name="logo-ethereum" size={32} color="#627EEA" />
          </View>
        </View>

        {/* Crypto Actions - Only show if wallet exists */}
        {cryptoWallet && (
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('DepositCrypto', { 
                address: cryptoWallet?.address,
                network: DEFAULT_NETWORK
              })}
            >
              <Ionicons name="qr-code" size={24} color="#627EEA" />
              <Text style={styles.actionText}>Receive</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('SendCrypto', { 
                profileId,
                balance: cryptoBalance?.balanceFormatted,
                network: DEFAULT_NETWORK
              })}
            >
              <Ionicons name="send" size={24} color="#627EEA" />
              <Text style={styles.actionText}>Send</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('CryptoTransactions', { 
                profileId,
                network: DEFAULT_NETWORK
              })}
            >
              <Ionicons name="list" size={24} color="#627EEA" />
              <Text style={styles.actionText}>History</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('TransactionHistory', { profileId })}
          >
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {recentTransactions.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={48} color="#9CA3AF" />
            <Text style={styles.emptyText}>No transactions yet</Text>
          </View>
        ) : (
          recentTransactions.map((tx, index) => {
            const icon = getTransactionIcon(tx.type);
            return (
              <TouchableOpacity
                key={tx.id}
                style={styles.transactionItem}
                onPress={() => navigation.navigate('TransactionDetails', { 
                  transactionId: tx.id 
                })}
              >
                <View style={styles.transactionIcon}>
                  <Ionicons name={icon.name} size={24} color={icon.color} />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionType}>
                    {tx.type.replace('_', ' ').toUpperCase()}
                  </Text>
                  <Text style={styles.transactionDate}>
                    {new Date(tx.created_at).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.transactionAmount}>
                  <Text style={[
                    styles.amountText,
                    { color: tx.type.includes('in') || tx.type === 'funding' 
                      ? '#10B981' : '#EF4444' }
                  ]}>
                    {tx.type.includes('in') || tx.type === 'funding' ? '+' : '-'}
                    {formatCurrency(tx.amount)}
                  </Text>
                  <Text style={styles.transactionStatus}>{tx.status}</Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Funded</Text>
          <Text style={styles.statValue}>
            {formatCurrency(fiatBalance?.totalFunded)}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Withdrawn</Text>
          <Text style={styles.statValue}>
            {formatCurrency(fiatBalance?.totalWithdrawn)}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB'
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFFFFF'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937'
  },
  walletCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  walletLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8
  },
  walletBalance: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4
  },
  lockedBalance: {
    fontSize: 12,
    color: '#F59E0B'
  },
  walletAddress: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'monospace'
  },
  networkBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8
  },
  networkText: {
    fontSize: 10,
    color: '#D97706',
    fontWeight: '600'
  },
  noWalletContainer: {
    marginTop: 8
  },
  noWalletText: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 12
  },
  connectWalletButton: {
    backgroundColor: '#627EEA',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start'
  },
  connectWalletText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600'
  },
  currencyIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  currencySymbol: {
    fontSize: 28,
    fontWeight: '700',
    color: '#7C3AED'
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6'
  },
  actionButton: {
    alignItems: 'center',
    gap: 8
  },
  actionText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600'
  },
  section: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 0,
    padding: 20,
    borderRadius: 16
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937'
  },
  seeAllText: {
    fontSize: 14,
    color: '#7C3AED',
    fontWeight: '600'
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40
  },
  emptyText: {
    marginTop: 12,
    fontSize: 14,
    color: '#9CA3AF'
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6'
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  transactionDetails: {
    flex: 1
  },
  transactionType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4
  },
  transactionDate: {
    fontSize: 12,
    color: '#9CA3AF'
  },
  transactionAmount: {
    alignItems: 'flex-end'
  },
  amountText: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4
  },
  transactionStatus: {
    fontSize: 11,
    color: '#6B7280',
    textTransform: 'capitalize'
  },
  statsContainer: {
    flexDirection: 'row',
    margin: 16,
    marginTop: 0,
    gap: 12
  },
  statItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937'
  }
});
