import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const { height } = Dimensions.get("window");

export default function RewardModal({ visible, onClose }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Rewards System</Text>

          <View style={styles.list}>
            <View style={styles.listItem}>
              <View style={styles.dot} />
              <Text style={styles.listText}>
                Earn points by using the network, hosting and referring friends.
              </Text>
            </View>

            <View style={styles.listItem}>
              <View style={styles.dot} />
              <Text style={styles.listText}>
                Points convert to <Text style={{ fontWeight: "bold" }}>$SGRID</Text>{" "}
                tokens at Token Generation Event (TGE).
              </Text>
            </View>

            <View style={styles.listItem}>
              <View style={styles.dot} />
              <Text style={styles.listText}>
                Climb the leaderboard as you earn points from various means.
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 24,
    paddingHorizontal: 20,
    height: height * 0.45,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },
  list: {
    marginBottom: 24,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2979FF",
    marginTop: 6,
    marginRight: 10,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  button: {
    backgroundColor: "#2979FF",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
