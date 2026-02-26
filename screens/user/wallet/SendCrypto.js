import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import walletService from '../../../services/walletService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_NETWORK = 'base-sepolia';

export default function SendCrypto({ navigation, route }) {
  const { profileId, balance: initialBalance, network = DEFAULT_NETWORK } = route.params;
  
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(initialBalance || 0);
  const [loading, setLoading] = useState(false);
  const [addressValid, setAddressValid] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    loadUserAndBalance();
  }, []);

  useEffect(() => {
    if (toAddress.length === 42) {
      validateAddress(toAddress);
    } else {
      setAddressValid(null);
    }
  }, [toAddress]);

  const loadUserAndBalance = async () => {
    try {
      // Get user ID from storage
      const userData = await AsyncStorage.getItem('@sharegrid_user');
      if (userData) {
        const parsed = JSON.parse(userData);
        const uid = parsed.supabaseUserId || parsed.id;
        setUserId(uid);
        
        // Fetch balance
        const balanceData = await walletService.getCryptoBalance(uid, network);
        if (balanceData?.balance?.formatted) {
          setBalance(parseFloat(balanceData.balance.formatted));
        }
      }
    } catch (error) {
      console.error('Error loading balance:', error);
    }
  };

  const validateAddress = (address) => {
    // Simple validation - check if it's a valid Ethereum address format
    const isValid = /^0x[a-fA-F0-9]{40}$/.test(address);
    setAddressValid(isValid);
  };

  const handleSend = async () => {
    if (!userId) {
      Alert.alert('Error', 'User not found. Please log in again.');
      return;
    }

    if (!toAddress || !addressValid) {
      Alert.alert('Error', 'Please enter a valid recipient address');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (parseFloat(amount) > balance) {
      Alert.alert('Error', 'Insufficient balance');
      return;
    }

    Alert.alert(
      'Confirm Transaction',
      `Send ${amount} ETH to\n${toAddress.slice(0, 10)}...${toAddress.slice(-8)}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Send', onPress: executeSend }
      ]
    );
  };

  const executeSend = async () => {
    try {
      setLoading(true);
      
      // Send transaction via backend custodial wallet
      const result = await walletService.sendCrypto(userId, toAddress, amount, network);

      console.log('Transaction sent:', result.transactionHash);

      Alert.alert(
        'Transaction Sent!',
        `Your transaction has been submitted.\n\nTx Hash: ${result.transactionHash.slice(0, 20)}...`,
        [
          {
            text: 'View on Explorer',
            onPress: () => {
              navigation.goBack();
            }
          },
          {
            text: 'Done',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      console.error('Send error:', error);
      Alert.alert('Error', error.message || 'Failed to send transaction');
    } finally {
      setLoading(false);
    }
  };

  const setMaxAmount = () => {
    const maxAmount = Math.max(0, balance - 0.0001); // Reserve small amount for gas
    setAmount(maxAmount.toFixed(6));
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Send ETH</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Balance */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceValue}>{parseFloat(balance).toFixed(6)} ETH</Text>
          <View style={styles.networkBadge}>
            <Text style={styles.networkText}>Base Sepolia</Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Recipient Address */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Recipient Address</Text>
            <View style={[
              styles.inputContainer,
              addressValid === true && styles.inputValid,
              addressValid === false && styles.inputInvalid
            ]}>
              <TextInput
                style={styles.input}
                placeholder="0x..."
                value={toAddress}
                onChangeText={setToAddress}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {addressValid === true && (
                <Ionicons name="checkmark-circle" size={24} color="#10B981" />
              )}
              {addressValid === false && (
                <Ionicons name="close-circle" size={24} color="#EF4444" />
              )}
            </View>
            {addressValid === false && (
              <Text style={styles.errorText}>Invalid address</Text>
            )}
          </View>

          {/* Amount */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.inputLabel}>Amount (ETH)</Text>
              <TouchableOpacity onPress={setMaxAmount}>
                <Text style={styles.maxButton}>MAX</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="0.0"
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
              />
              <Text style={styles.inputSuffix}>ETH</Text>
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Send Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.sendButton,
            (!addressValid || !amount || loading) && styles.sendButtonDisabled
          ]}
          onPress={handleSend}
          disabled={!addressValid || !amount || loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="send" size={24} color="#FFFFFF" />
              <Text style={styles.sendButtonText}>Send</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  balanceCard: {
    backgroundColor: '#627EEA',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center'
  },
  balanceLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12
  },
  networkBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12
  },
  networkText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600'
  },
  form: {
    padding: 16
  },
  inputGroup: {
    marginBottom: 20
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8
  },
  maxButton: {
    fontSize: 12,
    fontWeight: '700',
    color: '#627EEA'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16
  },
  inputValid: {
    borderColor: '#10B981'
  },
  inputInvalid: {
    borderColor: '#EF4444'
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1F2937'
  },
  inputSuffix: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600'
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4
  },
  gasCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 8
  },
  gasRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8
  },
  gasLabel: {
    fontSize: 14,
    color: '#6B7280'
  },
  gasValue: {
    fontSize: 14,
    color: '#1F2937'
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937'
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB'
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#627EEA',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8
  },
  sendButtonDisabled: {
    backgroundColor: '#9CA3AF'
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  }
});
