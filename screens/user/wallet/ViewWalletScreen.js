import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
  TouchableWithoutFeedback,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import walletService from "../../../services/walletService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001/api";
const DEFAULT_NETWORK = "base-sepolia";

export default function ViewWalletScreen({ route }) {
  const navigation = useNavigation();
  const { profileId, email } = route?.params || {};
  
  const [showBalance, setShowBalance] = useState(true);
  const [showFundingOptions, setShowFundingOptions] = useState(false);
  const [showWithdrawalOptions, setShowWithdrawalOptions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("fiat"); // "fiat" or "crypto"
  const [userId, setUserId] = useState(null);

  const slideAnim = useRef(new Animated.Value(600)).current;
  const withdrawalSlideAnim = useRef(new Animated.Value(600)).current;

  // Fiat wallet state
  const [fiatBalance, setFiatBalance] = useState("0.00");
  const [earned, setEarned] = useState("0");
  const [spent, setSpent] = useState("0");
  
  // Crypto wallet state
  const [cryptoBalance, setCryptoBalance] = useState("0.00");
  const [cryptoAddress, setCryptoAddress] = useState(null);
  const [hasWallet, setHasWallet] = useState(false);

  useEffect(() => {
    loadUserAndWalletData();
  }, []);

  const loadUserAndWalletData = async () => {
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
        const response = await axios.get(
          `${API_URL}/wallet/fiat/${profileId}/balance`
        );
        
        if (response.data.success) {
          const data = response.data.data;
          const bal = parseFloat(data.balance || 0);
          setFiatBalance(bal.toLocaleString("en-NG", { minimumFractionDigits: 2 }));
          setEarned(parseFloat(data.totalFunded || 0).toLocaleString("en-NG"));
          setSpent(parseFloat(data.totalWithdrawn || 0).toLocaleString("en-NG"));
        }
      } catch (fiatError) {
        console.log("Fiat wallet not found, will be created on first use");
        setFiatBalance("0.00");
        setEarned("0");
        setSpent("0");
      }

      // Load crypto wallet from backend using user ID
      if (uid) {
        try {
          const wallet = await walletService.getCryptoWallet(uid);
          
          if (wallet) {
            setCryptoAddress(wallet.address || wallet.wallet_address);
            setHasWallet(true);
            await loadCryptoBalance(uid);
          }
        } catch (cryptoError) {
          console.log("Crypto wallet not found yet");
        }
      }
      
    } catch (error) {
      console.error("Error loading wallet data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const loadCryptoBalance = async (uid) => {
    try {
      const balanceData = await walletService.getCryptoBalance(uid, DEFAULT_NETWORK);
      
      if (balanceData?.balance?.formatted) {
        setCryptoBalance(parseFloat(balanceData.balance.formatted).toFixed(6));
      }
    } catch (error) {
      console.log("Could not fetch crypto balance:", error.message);
      setCryptoBalance("0.00");
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadUserAndWalletData();
  };

  // Get display balance based on active tab
  const displayBalance = activeTab === "fiat" ? fiatBalance : cryptoBalance;
  const displayCurrency = activeTab === "fiat" ? "NGN" : "ETH";

  useEffect(() => {
    if (showFundingOptions) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 600,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [showFundingOptions]);

  useEffect(() => {
    if (showWithdrawalOptions) {
      Animated.timing(withdrawalSlideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(withdrawalSlideAnim, {
        toValue: 600,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [showWithdrawalOptions]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#0056D2" />
        <Text style={{ marginTop: 10, color: "#666" }}>Loading wallet...</Text>
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

      <LinearGradient
        colors={["#1A56D6", "#0056D2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerCard}
      >

        <View style={styles.topRow}>
          <View style={styles.leftHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="chevron-left" size={22} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>View Wallet</Text>
          </View>

          <TouchableOpacity>
            <Feather name="menu" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Wallet Type Tabs */}
        <View style={styles.walletTabs}>
          <TouchableOpacity
            style={[styles.walletTab, activeTab === "fiat" && styles.activeTab]}
            onPress={() => setActiveTab("fiat")}
          >
            <Ionicons name="card-outline" size={16} color="#fff" />
            <Text style={styles.tabText}>Fiat (NGN)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.walletTab, activeTab === "crypto" && styles.activeTab]}
            onPress={() => setActiveTab("crypto")}
          >
            <Ionicons name="dollar" size={16} color="#fff" />
            <Text style={styles.tabText}>Crypto (ETH)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.walletInfo}>
          <View style={styles.walletLabelRow}>
            <Text style={styles.walletLabel}>
              {activeTab === "fiat" ? "Fiat Balance" : "Crypto Balance"}
            </Text>
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowBalance(!showBalance)}
            >
              <Ionicons
                name={showBalance ? "eye-outline" : "eye-off-outline"}
                size={16}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.balanceAndSummary}>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceText}>
              {showBalance ? displayBalance : "••••••"}
            </Text>
            <Text style={styles.currency}>{displayCurrency}</Text>
          </View>

          {activeTab === "fiat" ? (
            <View style={styles.summaryColumn}>
              <View style={styles.summaryItem}>
                <AntDesign name="arrowup" size={13} color="#00ff88" />
                <Text style={styles.summaryText}> {earned} NGN </Text>
                <Text style={styles.summaryLabel}>Funded</Text>
              </View>

              <View style={styles.summaryItem}>
                <AntDesign name="arrowdown" size={13} color="#ff4444" />
                <Text style={styles.summaryText}> {spent} NGN </Text>
                <Text style={styles.summaryLabel}>Withdrawn</Text>
              </View>
            </View>
          ) : (
            <View style={styles.summaryColumn}>
              {hasWallet ? (
                <View style={styles.addressBadge}>
                  <Text style={styles.addressText}>
                    {cryptoAddress?.slice(0, 6)}...{cryptoAddress?.slice(-4)}
                  </Text>
                </View>
              ) : (
                <TouchableOpacity 
                  style={styles.connectBtn}
                  onPress={() => navigation.navigate("ConnectWallet", { profileId })}
                >
                  <Text style={styles.connectBtnText}>Connect Wallet</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </LinearGradient>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => setShowWithdrawalOptions(true)}
        >
          <View style={styles.iconCircle}>
            <Feather name="arrow-up-right" size={20} color="#0056D2" />
          </View>
          <Text style={styles.actionText}>Withdraw</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => setShowFundingOptions(true)}
        >
          <View style={styles.iconCircle}>
            <Feather name="arrow-down-left" size={20} color="#0056D2" />
          </View>
          <Text style={styles.actionText}>Deposit</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionBtn}
          onPress={() => navigation.navigate('Payment')}
        >
          <View style={styles.iconCircle}>
            <Feather name="repeat" size={20} color="#0056D2" />
          </View>
          <Text style={styles.actionText}>Transfer</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.banner}>
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerText}>Earn money with your Device</Text>
          <Text style={styles.bannerSubText}>
            Become a server host and earn returns from WiFi subscriptions!
          </Text>
          <TouchableOpacity style={styles.bannerBtn}>
            <Text style={styles.bannerBtnText}>Get Started</Text>
            <Feather name="chevron-right" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        <Ionicons name="phone-portrait" size={65} color="#fff" />
      </View>

      {/* Fund Wallet Modal */}
      {showFundingOptions && (
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => setShowFundingOptions(false)}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>

          <Animated.View
            style={[
              styles.bottomSheet,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <View style={styles.sheetHeaderRow}>
              <Text style={styles.sheetTitle}>Fund Wallet</Text>
              <TouchableOpacity onPress={() => setShowFundingOptions(false)}>
                <Feather name="x" size={22} color="#000" />
              </TouchableOpacity>
            </View>
            <Text style={styles.sheetSubText}>
              Select your preferred option
            </Text>

            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setShowFundingOptions(false);
                navigation.navigate("FundWallet", { profileId, email });
              }}
            >
              <View style={styles.optionRow}>
                <View style={styles.optionIconContainer}>
                  <Ionicons name="card-outline" size={20} color="#0056D2" />
                </View>
                <View>
                  <Text style={styles.optionTitle}>Fiat</Text>
                  <Text style={styles.optionDesc}>
                    Transfer from an account/card
                  </Text>
                </View>
              </View>
              <Feather name="chevron-right" size={18} color="#777" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setShowFundingOptions(false);
                navigation.navigate("DepositCrypto");
              }}
            >
              <View style={styles.optionRow}>
                <View style={styles.optionIconContainer}>
                  <Ionicons name="logo-bitcoin" size={20} color="#0056D2" />
                </View>
                <View>
                  <Text style={styles.optionTitle}>Crypto</Text>
                  <Text style={styles.optionDesc}>
                    Transfer from a wallet/exchange
                  </Text>
                </View>
              </View>
              <Feather name="chevron-right" size={18} color="#777" />
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}

      {/* Withdrawal Modal */}
      {showWithdrawalOptions && (
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => setShowWithdrawalOptions(false)}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>

          <Animated.View
            style={[
              styles.bottomSheet,
              { transform: [{ translateY: withdrawalSlideAnim }] },
            ]}
          >
            <View style={styles.sheetHeaderRow}>
              <Text style={styles.sheetTitle}>Withdraw Funds</Text>
              <TouchableOpacity onPress={() => setShowWithdrawalOptions(false)}>
                <Feather name="x" size={22} color="#000" />
              </TouchableOpacity>
            </View>
            <Text style={styles.sheetSubText}>
              Select your preferred withdrawal method
            </Text>

            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setShowWithdrawalOptions(false);
                navigation.navigate("FiatWithdraw", { profileId });
              }}
            >
              <View style={styles.optionRow}>
                <View style={styles.optionIconContainer}>
                  <Ionicons name="card-outline" size={20} color="#0056D2" />
                </View>
                <View>
                  <Text style={styles.optionTitle}>Fiat</Text>
                  <Text style={styles.optionDesc}>
                    Withdraw to a bank account
                  </Text>
                </View>
              </View>
              <Feather name="chevron-right" size={18} color="#777" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setShowWithdrawalOptions(false);
                navigation.navigate("CryptoWithdrawal");
              }}
            >
              <View style={styles.optionRow}>
                <View style={styles.optionIconContainer}>
                  <Ionicons name="logo-bitcoin" size={20} color="#0056D2" />
                </View>
                <View>
                  <Text style={styles.optionTitle}>Crypto Wallet</Text>
                  <Text style={styles.optionDesc}>
                    Withdraw to a crypto wallet/exchange
                  </Text>
                </View>
              </View>
              <Feather name="chevron-right" size={18} color="#777" />
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fb", padding: 20 },
  headerCard: {
    borderRadius: 20,
    paddingTop: Platform.OS === "ios" ? 30 : 30,
    paddingHorizontal: 25,
    paddingBottom: 30,
    marginTop: 50,
    marginBottom: 25,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 5,
  },
  walletInfo: { marginTop: 15 },
  walletLabelRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  walletLabel: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 13,
    fontWeight: "500",
  },
  eyeIcon: { marginLeft: 5 },
  balanceAndSummary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  balanceRow: { flexDirection: "row", alignItems: "flex-start" },
  balanceText: { color: "#fff", fontSize: 34, fontWeight: "800" },
  currency: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 5,
    marginLeft: 5,
  },
  summaryColumn: { alignItems: "flex-end", marginTop: -10 },
  summaryItem: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  summaryText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  summaryLabel: { color: "rgba(255,255,255,0.9)", fontSize: 11 },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  actionBtn: { flex: 1, marginHorizontal: 6, alignItems: "center" },
  iconCircle: {
    backgroundColor: "#f0f4ff",
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.2,
    borderColor: "#d0dcff",
  },
  actionText: { marginTop: 8, color: "#0056D2", fontSize: 13, fontWeight: "600" },
  banner: {
    backgroundColor: "#0056D2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 15,
    paddingVertical: 25,
    paddingHorizontal: 25,
  },
  bannerText: { color: "#fff", fontSize: 15, fontWeight: "700", marginBottom: 4 },
  bannerSubText: { color: "#fff", fontSize: 12, marginBottom: 10 },
  bannerBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0040B5",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignSelf: "flex-start",
    gap: 5,
  },
  bannerBtnText: { color: "#fff", fontSize: 13, fontWeight: "600" },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  backdrop: { flex: 1 },
  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#f0f0f0", 
  },
  sheetHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sheetTitle: { 
    fontSize: 20, 
    fontWeight: "700",
    color: "#000", 
  },
  sheetSubText: { 
    color: "#777", 
    marginTop: 4, 
    marginBottom: 15,
  },
  option: {
    backgroundColor: "#fff", 
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#f0f0f0", 
  },
  optionRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 10 
  },
  optionIconContainer: {
    backgroundColor: "#f0f4ff", 
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e8ff",
  },
  optionTitle: { 
    fontSize: 17, 
    fontWeight: "600", 
    color: "#000", 
  },
  optionDesc: { 
    color: "#555", 
    fontSize: 13, 
    marginTop: 2,
  },
  walletTabs: {
    flexDirection: "row",
    marginTop: 15,
    gap: 10,
  },
  walletTab: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    gap: 6,
  },
  activeTab: {
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  tabText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  addressBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  addressText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "monospace",
  },
  connectBtn: {
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  connectBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});