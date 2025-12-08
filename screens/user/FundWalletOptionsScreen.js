import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

export default function FundWalletOptionsModal({ visible, onClose }) {
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.modal,
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Fund Wallet</Text>
          <Text style={styles.subText}>Select your preferred option</Text>
        </View>

        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            onClose();
            navigation.navigate("FundWallet");
          }}
        >
          <Text style={styles.optionTitle}>Fiat</Text>
          <Text style={styles.optionDesc}>Transfer from an account/card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            onClose();
            navigation.navigate("DepositCrypto");
          }}
        >
          <Text style={styles.optionTitle}>Crypto</Text>
          <Text style={styles.optionDesc}>Transfer from a wallet/exchange</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  headerContainer: { marginBottom: 15 },
  header: { fontSize: 20, fontWeight: "700", marginBottom: 4 },
  subText: { color: "#777" },
  option: {
    backgroundColor: "#f2f5ff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  optionTitle: { fontSize: 18, fontWeight: "600", color: "#0056D2" },
  optionDesc: { color: "#555", marginTop: 5 },
});
