import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FundWalletScreen() {
  const [method, setMethod] = useState("card");

  const handleCopy = (text) => {
    alert(`${text} copied to clipboard!`);
  };

  return (
    <View style={styles.container}>

      <View style={styles.headerRow}>
        <Ionicons name="chevron-back" size={26} color="#000" />
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
              <Text style={styles.label}>Card Number</Text>
              <TextInput
                placeholder="Enter your card number"
                keyboardType="numeric"
                style={styles.input}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>Expiration Date</Text>
                <TextInput placeholder="MM/YY" style={styles.input} />
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>CVV</Text>
                <TextInput
                  placeholder="***"
                  keyboardType="numeric"
                  style={styles.input}
                />
              </View>
            </View>
          </View>
          <View style={styles.checkboxContainer}>
            <Ionicons name="checkbox-outline" size={22} color="#0056D2" />
            <Text style={styles.checkboxText}>
              Save card securely for future payments
            </Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitBtn}>
              <Text style={styles.submitText}>Add Card</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {method === "bank" && (
        <View style={styles.bankBox}>
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
});
