import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function CryptoTransactions({ navigation, route }) {
  const { profileId, network = 'base-sepolia' } = route.params;
  
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/wallet/crypto/${profileId}/transactions?network=${network}&limit=50`
      );
      setTransactions(response.data.data || []);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadTransactions();
  };

  const getExplorerUrl = (txHash) => {
    const baseUrl = network === 'base-sepolia' 
      ? 'https://sepolia.basescan.org/tx/'
      : 'https://basescan.org/tx/';
    return baseUrl + txHash;
  };

  const openExplorer = (txHash) => {
    Linking.openURL(getExplorerUrl(txHash));
  };

  const formatAmount = (amount) => {
    const num = parseFloat(amount) || 0;
    if (num < 0.000001) return '< 0.000001';
    return num.toFixed(6);
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return '#10B981';
      case 'pending':
        return '#F59E0B';
      case 'failed':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'send':
        return { name: 'arrow-up-circle', color: '#EF4444' };
      case 'receive':
        return { name: 'arrow-down-circle', color: '#10B981' };
      default:
        return { name: 'swap-horizontal', color: '#6B7280' };
    }
  };

  const renderTransaction = ({ item }) => {
    const icon = getTypeIcon(item.type);
    const statusColor = getStatusColor(item.status);
    
    return (
      <TouchableOpacity 
        style={styles.transactionItem}
        onPress={() => openExplorer(item.transaction_hash)}
      >
        <View style={[styles.iconContainer, { backgroundColor: `${icon.color}15` }]}>
          <Ionicons name={icon.name} size={24} color={icon.color} />
        </View>
        
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionType}>
            {item.type === 'send' ? 'Sent' : 'Received'}
          </Text>
          <Text style={styles.transactionAddress}>
            {item.type === 'send' 
              ? `To: ${formatAddress(item.to_address)}`
              : `From: ${formatAddress(item.from_address)}`
            }
          </Text>
          <Text style={styles.transactionDate}>
            {new Date(item.created_at).toLocaleString()}
          </Text>
        </View>
        
        <View style={styles.transactionRight}>
          <Text style={[
            styles.transactionAmount,
            { color: item.type === 'send' ? '#EF4444' : '#10B981' }
          ]}>
            {item.type === 'send' ? '-' : '+'}{formatAmount(item.amount_decimal)} ETH
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: `${statusColor}15` }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>
              {item.status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="receipt-outline" size={64} color="#E5E7EB" />
      <Text style={styles.emptyTitle}>No Transactions Yet</Text>
      <Text style={styles.emptySubtitle}>
        Your crypto transactions will appear here
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#627EEA" />
        <Text style={styles.loadingText}>Loading transactions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Crypto Transactions</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Network Badge */}
      <View style={styles.networkContainer}>
        <View style={styles.networkBadge}>
          <Ionicons name="globe-outline" size={14} color="#D97706" />
          <Text style={styles.networkText}>
            {network === 'base-sepolia' ? 'Base Sepolia (Testnet)' : 'Base Mainnet'}
          </Text>
        </View>
      </View>

      {/* Transactions List */}
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id || item.transaction_hash}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={renderEmpty}
      />
    </View>
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
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937'
  },
  networkContainer: {
    padding: 16,
    alignItems: 'center'
  },
  networkBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6
  },
  networkText: {
    fontSize: 12,
    color: '#D97706',
    fontWeight: '600'
  },
  listContent: {
    padding: 16,
    flexGrow: 1
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  transactionDetails: {
    flex: 1
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2
  },
  transactionAddress: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'monospace',
    marginBottom: 2
  },
  transactionDate: {
    fontSize: 11,
    color: '#9CA3AF'
  },
  transactionRight: {
    alignItems: 'flex-end'
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center'
  }
});
