import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

export default function LogoutModal({ visible, onClose, onConfirm }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={22} color="#000" />
          </TouchableOpacity>

          {/* Question icon */}
          <View style={styles.iconWrapper}>
            <Text style={styles.questionMark}>?</Text>
          </View>

          {/* Message */}
          <Text style={styles.message}>Are you sure you want to logout?</Text>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.yesButton} onPress={onConfirm}>
              <Text style={styles.yesText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 18,
  },
  iconWrapper: {
    backgroundColor: "#FFEDED",
    borderRadius: 60,
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  questionMark: {
    fontSize: 40,
    fontWeight: "700",
    color: "#FF3333",
  },
  message: {
    textAlign: "center",
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
    marginBottom: 25,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    gap: 16,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1.2,
    borderColor: "#FF3333",
    borderRadius: 10,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  cancelText: {
    color: "#FF3333",
    fontWeight: "600",
    fontSize: 15,
  },
  yesButton: {
    flex: 1,
    backgroundColor: "#FF3333",
    borderRadius: 10,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  yesText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
