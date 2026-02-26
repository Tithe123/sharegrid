import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import walletService from '../../../services/walletService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_NETWORK = 'base-sepolia';

export default function ConnectWallet({ navigation, route }) {
  const { profileId } = route.params;
  
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('initial'); // initial, creating, done
  const [walletAddress, setWalletAddress] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    loadUserAndCheckWallet();
  }, []);

  const loadUserAndCheckWallet = async () => {
    try {
      setLoading(true);
      
      // Get user ID from storage
      const userData = await AsyncStorage.getItem('@sharegrid_user');
      if (userData) {
        const parsed = JSON.parse(userData);
        const uid = parsed.supabaseUserId || parsed.id;
        setUserId(uid);
        
        // Check if wallet already exists
        const wallet = await walletService.getCryptoWallet(uid);
        if (wallet) {
          setWalletAddress(wallet.address || wallet.wallet_address);
          setStep('done');
        }
      }
    } catch (error) {
      console.error('Error loading wallet:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWallet = async () => {
    if (!userId) {
      Alert.alert('Error', 'User not found. Please log in again.');
      return;
    }

    try {
      setLoading(true);
      setStep('creating');
      
      const wallet = await walletService.createCryptoWallet(userId);
      setWalletAddress(wallet.wallet_address || wallet.address);
      setStep('done');
      
      Alert.alert(
        'Wallet Created!',
        `Your wallet has been created.\n\nAddress: ${(wallet.wallet_address || wallet.address).slice(0, 10)}...${(wallet.wallet_address || wallet.address).slice(-8)}`,
        [
          {
            text: 'Go to Wallet',
            onPress: () => navigation.navigate('WalletDashboard', { profileId })
          }
        ]
      );
    } catch (error) {
      console.error('Create wallet error:', error);
      Alert.alert('Error', error.message || 'Failed to create wallet');
      setStep('initial');
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = () => {
    switch (step) {
      case 'creating':
        return {
          icon: 'wallet-outline',
          title: 'Creating Wallet...',
          subtitle: 'Setting up your secure wallet'
        };
      case 'done':
        return {
          icon: 'checkmark-circle',
          title: 'Wallet Connected!',
          subtitle: 'Your wallet is ready to use'
        };
      default:
        return {
          icon: 'wallet-outline',
          title: 'Create Crypto Wallet',
          subtitle: 'Create a secure custodial wallet on Base network'
        };
    }
  };

  const content = getStepContent();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Connect Wallet</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons 
            name={content.icon} 
            size={64} 
            color={step === 'done' ? '#10B981' : '#627EEA'} 
          />
        </View>
        
        <Text style={styles.title}>{content.title}</Text>
        <Text style={styles.subtitle}>{content.subtitle}</Text>

        {/* Network Badge */}
        <View style={styles.networkBadge}>
          <Ionicons name="globe-outline" size={16} color="#D97706" />
          <Text style={styles.networkText}>Base Sepolia (Testnet)</Text>
        </View>

        {/* Features */}
        {step === 'initial' && (
          <View style={styles.features}>
            <View style={styles.featureItem}>
              <Ionicons name="shield-checkmark" size={24} color="#10B981" />
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Secure Storage</Text>
                <Text style={styles.featureSubtitle}>Encrypted private keys</Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="flash" size={24} color="#F59E0B" />
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Instant Setup</Text>
                <Text style={styles.featureSubtitle}>No seed phrases to manage</Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="sync" size={24} color="#627EEA" />
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Base Network</Text>
                <Text style={styles.featureSubtitle}>Fast & low-cost transactions</Text>
              </View>
            </View>
          </View>
        )}

        {/* Loading Indicator */}
        {loading && (
          <ActivityIndicator size="large" color="#627EEA" style={styles.loader} />
        )}

        {/* Wallet Info (when done) */}
        {step === 'done' && walletAddress && (
          <View style={styles.walletInfo}>
            <Text style={styles.walletLabel}>Wallet Address</Text>
            <Text style={styles.walletAddress}>{walletAddress}</Text>
          </View>
        )}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        {step === 'initial' && (
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleCreateWallet}
            disabled={loading}
          >
            <Ionicons name="add-circle-outline" size={24} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Create Wallet</Text>
          </TouchableOpacity>
        )}

        {step === 'done' && (
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('WalletDashboard', { profileId })}
          >
            <Ionicons name="wallet-outline" size={24} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Go to Wallet</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB'
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16
  },
  networkBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
    marginBottom: 32
  },
  networkText: {
    fontSize: 12,
    color: '#D97706',
    fontWeight: '600'
  },
  features: {
    width: '100%',
    gap: 16
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    gap: 12
  },
  featureText: {
    flex: 1
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2
  },
  featureSubtitle: {
    fontSize: 14,
    color: '#6B7280'
  },
  loader: {
    marginTop: 24
  },
  walletInfo: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    marginTop: 16
  },
  walletLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8
  },
  walletAddress: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#1F2937'
  },
  actions: {
    padding: 24,
    gap: 12
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#627EEA',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  secondaryButton: {
    alignItems: 'center',
    paddingVertical: 12
  },
  secondaryButtonText: {
    color: '#6B7280',
    fontSize: 14
  }
});
