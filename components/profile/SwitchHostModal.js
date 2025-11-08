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

export default function SwitchHostModal({ visible, onClose, onConfirm }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={22} color="#000" />
          </TouchableOpacity>

          {/* Question Icon */}
          <View style={styles.iconWrapper}>
            <Ionicons name="help-outline" size={42} color="#2979FF" />
          </View>

          {/* Text */}
          <Text style={styles.message}>
            This process will switch you to host.{"\n"}Are you willing to
            proceed?
          </Text>

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
    paddingTop: 35,
    paddingBottom: 30,
    paddingHorizontal: 4,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 18,
  },
  iconWrapper: {
    backgroundColor: "#EAF2FF",
    borderRadius: 60,
    padding: 18,
    marginTop: 20,
    marginBottom: 20,
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
    borderColor: "#2979FF",
    borderRadius: 10,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  cancelText: {
    color: "#2979FF",
    fontWeight: "600",
    fontSize: 15,
  },
  yesButton: {
    flex: 1,
    backgroundColor: "#2979FF",
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
