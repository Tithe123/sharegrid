import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import axios from "axios";
import { usePaystack } from "react-native-paystack-webview";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001/api";
const PAYSTACK_PUBLIC_KEY = process.env.EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY;

export default function FundWalletScreen({ route }) {
  const navigation = useNavigation();
  const { popup } = usePaystack();
  const { profileId, email } = route?.params || {};
  
  const [method, setMethod] = useState("card");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCopy = async (text) => {
    await Clipboard.setStringAsync(text);
    Alert.alert("Copied", `${text} copied to clipboard!`);
  };

  const handleFundWithPaystack = async () => {
    if (!amount || parseFloat(amount) < 100) {
      Alert.alert("Error", "Minimum funding amount is ₦100");
      return;
    }

    if (!email) {
      Alert.alert("Error", "Email is required for payment");
      return;
    }

    if (!PAYSTACK_PUBLIC_KEY) {
      Alert.alert("Error", "Paystack public key is not configured");
      return;
    }

    if (!profileId) {
      Alert.alert("Error", "Profile ID is missing");
      return;
    }

    try {
      setLoading(true);
      
      const response = await axios.post(
        `${API_URL}/wallet/fiat/${profileId}/fund`,
        {
          amount: parseFloat(amount),
          email: email,
          callbackUrl: "sharegrid://payment-callback"
        }
      );

      if (response.data.success) {
        const { reference } = response.data.data;
        const amountInNaira = parseFloat(amount);

        popup.checkout({
          email,
          amount: amountInNaira,
          reference,
          metadata: {
            custom_fields: [
              {
                display_name: "Profile ID",
                variable_name: "profile_id",
                value: profileId
              }
            ]
          },
          onSuccess: async (res) => {
            const ref =
              res?.transactionRef?.reference ||
              res?.transactionRef?.trxref ||
              res?.reference ||
              reference;

            if (!ref) {
              Alert.alert("Error", "Missing transaction reference");
              return;
            }

            try {
              setLoading(true);
              await axios.post(`${API_URL}/wallet/fiat/verify-payment`, { reference: ref });
              Alert.alert("Success", "Wallet funded successfully");
              setAmount("");
              navigation.goBack();
            } catch (verifyError) {
              console.error("Payment verification error:", verifyError);
              Alert.alert(
                "Error",
                verifyError.response?.data?.message || "Failed to verify payment"
              );
            } finally {
              setLoading(false);
            }
          },
          onCancel: () => {
            Alert.alert("Payment cancelled", "You can try again anytime.");
          },
          onLoad: () => {
            // Optional hook for analytics/debugging
          },
          onError: (err) => {
            console.error("Paystack WebView error:", err);
            Alert.alert("Error", "Payment could not be completed");
          }
        });
      }
    } catch (error) {
      console.error("Fund wallet error:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to initialize payment"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>Fund Wallet</Text>
      </View>

      <View style={styles.methodContainer}>
        {["card", "bank"].map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.method, method === type && styles.activeMethod]}
            onPress={() => setMethod(type)}
          >
            <Text
              style={[styles.methodText, method === type && styles.activeText]}
            >
              {type === "card" ? "Credit/Debit Card" : "Bank Transfer"}
            </Text>
            <View
              style={[
                styles.dotContainer,
                { borderColor: method === type ? "#fff" : "#0056D2" },
              ]}
            >
              {method === type && <View style={styles.dot} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {method === "card" && (
        <>
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Amount (NGN)</Text>
              <TextInput
                placeholder="Enter amount to fund"
                keyboardType="numeric"
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
              />
              <Text style={styles.hint}>Minimum: ₦100</Text>
            </View>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={styles.cancelBtn}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.submitBtn, loading && styles.disabledBtn]}
              onPress={handleFundWithPaystack}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.submitText}>Pay with Paystack</Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}

      {method === "bank" && (
        <View style={styles.bankBox}>
          <Text style={styles.bankNote}>
            Transfer to the account below and your wallet will be credited automatically.
          </Text>
          
          <View style={styles.bankRow}>
            <View>
              <Text style={styles.bankLabel}>Account Name</Text>
              <Text style={styles.bankValue}>ShareGrid Technologies</Text>
            </View>
            <TouchableOpacity onPress={() => handleCopy("ShareGrid Technologies")}>
              <Ionicons name="copy-outline" size={22} color="#0056D2" />
            </TouchableOpacity>
          </View>

          <View style={styles.bankRow}>
            <View>
              <Text style={styles.bankLabel}>Account Number</Text>
              <Text style={styles.bankValue}>1234567890</Text>
            </View>
            <TouchableOpacity onPress={() => handleCopy("1234567890")}>
              <Ionicons name="copy-outline" size={22} color="#0056D2" />
            </TouchableOpacity>
          </View>

          <View style={styles.bankRow}>
            <View>
              <Text style={styles.bankLabel}>Bank Name</Text>
              <Text style={styles.bankValue}>Zenith Bank</Text>
            </View>
            <TouchableOpacity onPress={() => handleCopy("Zenith Bank")}>
              <Ionicons name="copy-outline" size={22} color="#0056D2" />
            </TouchableOpacity>
          </View>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 25, marginTop: 35 },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
  header: { fontSize: 24, fontWeight: "700", marginLeft: 10 },
  methodContainer: { marginBottom: 30 },
  method: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#0056D2",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
  },
  activeMethod: { backgroundColor: "#0056D2" },
  methodText: { color: "#0056D2", fontWeight: "600", fontSize: 15 },
  activeText: { color: "#fff" },
  dotContainer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#fff" },
  form: { marginTop: 15 },
  inputGroup: { marginBottom: 18 },
  label: { fontSize: 15, fontWeight: "600", marginBottom: 6, color: "#333" },
  input: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
  },
  row: { flexDirection: "row" },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  checkboxText: { marginLeft: 8, color: "#333", fontSize: 14 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 30,
  },
  cancelBtn: {
    borderColor: "#0056D2",
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 28,
    marginRight: 10,
  },
  cancelText: { color: "#0056D2", fontWeight: "600", fontSize: 15 },
  submitBtn: {
    backgroundColor: "#0056D2",
    paddingVertical: 13,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  submitText: { color: "#fff", fontWeight: "600", fontSize: 15 },
  bankBox: {
    marginTop: 25,
    backgroundColor: "#f7faff",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e6f9",
  },
  bankRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  bankLabel: { color: "#777", fontSize: 14 },
  bankValue: { fontWeight: "600", fontSize: 16, color: "#000" },
  hint: { color: "#777", fontSize: 12, marginTop: 5 },
  bankNote: { color: "#555", fontSize: 14, marginBottom: 20, lineHeight: 20 },
  disabledBtn: { backgroundColor: "#999" },
});
