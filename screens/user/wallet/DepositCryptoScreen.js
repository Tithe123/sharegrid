import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Share, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import QRCode from "react-native-qrcode-svg";
import { useNavigation } from "@react-navigation/native";

export default function DepositCryptoScreen({ route }) {
  const navigation = useNavigation();
  const { address, network = "base-sepolia" } = route?.params || {};
  const [copied, setCopied] = useState(false);

  const walletAddress = address || "0xde43tegydfyjiuk-fudkj63bdkvjgbgstfavsbjfgh";

  const getNetworkName = () => {
    switch (network) {
      case "base-sepolia":
        return "Base Sepolia (Testnet)";
      case "base":
        return "Base Mainnet";
      default:
        return network;
    }
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareAddress = async () => {
    try {
      await Share.share({
        message: `My ShareGrid wallet address on ${network}:\n${walletAddress}`,
        title: "ShareGrid Wallet Address",
      });
    } catch (error) {
      console.error("Share error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>Deposit Crypto</Text>
      </View>

      {network === "base-sepolia" && (
        <View style={styles.networkBadge}>
          <Ionicons name="globe-outline" size={16} color="#D97706" />
          <Text style={styles.networkText}>{getNetworkName()}</Text>
        </View>
      )}

      <Text style={styles.warning}>
        {network === "base-sepolia"
          ? "This is a testnet address. Only send testnet ETH here."
          : "Send only USDC to this address, or you might lose your funds"}
      </Text>

      <View style={styles.qrContainer}>
        {walletAddress ? (
          <QRCode
            value={walletAddress}
            size={220}
            backgroundColor="#FFFFFF"
            color="#1F2937"
          />
        ) : (
          <View style={styles.qrPlaceholder}>
            <Ionicons name="qr-code-outline" size={100} color="#E5E7EB" />
          </View>
        )}
        
        <Text style={styles.address} selectable>
          {walletAddress || "No address available"}
        </Text>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.copyBox} onPress={copyToClipboard}>
            <Ionicons
              name={copied ? "checkmark" : "copy-outline"}
              size={18}
              color="#fff"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.copyText}>{copied ? "Copied!" : "Copy"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.downloadBtn} onPress={shareAddress}>
            <Ionicons name="share-outline" size={22} color="#0056D2" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 25,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginLeft: 10,
  },
  networkBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
    marginBottom: 15,
  },
  networkText: {
    fontSize: 12,
    color: "#D97706",
    fontWeight: "600",
  },
  warning: {
    textAlign: "center",
    color: "#757575",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 35,
    paddingHorizontal: 10,
  },
  qrContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  qrPlaceholder: {
    width: 220,
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
  },
  address: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    lineHeight: 22,
    marginTop: 20,
    marginBottom: 25,
    width: "90%",
    fontFamily: "monospace",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
  },
  copyBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    backgroundColor: "#0056D2",
    borderColor: "#0056D2",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  copyText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  downloadBtn: {
    backgroundColor: "#E9F0FF",
    borderRadius: 50,
    padding: 12,
  },
});
