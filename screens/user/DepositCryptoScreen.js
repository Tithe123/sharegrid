import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DepositCryptoScreen() {
  const walletAddress = "0xde43tegydfyjiuk-fudkj63bdkvjgbgstfavsbjfgh";

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(walletAddress);
    alert("Address copied to clipboard!");
  };

  const downloadQR = () => {
    alert("QR code download feature coming soon!");
  };

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>Deposit Crypto</Text>
      </View>


      <Text style={styles.warning}>
        Send only USDC to this address, or you might lose your funds
      </Text>


      <View style={styles.qrContainer}>
        <Image
          source={{
            uri: "https://api.qrserver.com/v1/create-qr-code/?data=" + walletAddress,
          }}
          style={styles.qr}
        />
        <Text style={styles.address}>{walletAddress}</Text>


        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.copyBox} onPress={copyToClipboard}>
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.downloadBtn} onPress={downloadQR}>
            <Ionicons name="download-outline" size={22} color="#0056D2" />
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
  },
  qr: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },
  address: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 25,
    width: "90%",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
  },
  copyBox: {
    borderWidth: 1.5,
    backgroundColor: "#0056D2",
    borderColor: "#0056D2",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  copyText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  downloadBtn: {
    backgroundColor: "#E9F0FF",
    borderRadius: 50,
    color: "#0056D2",
    padding: 12,
  },
});
