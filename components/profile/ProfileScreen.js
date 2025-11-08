import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SwitchHostModal from "./SwitchHostModal";
import LogoutModal from "./LogoutModal";

export default function ProfileScreen({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);

  const handleConfirm = () => {
    setModalVisible(false);
    // Add logic to switch to host or navigate
    console.log("User confirmed switch to host");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      {/* Top Background Image */}
      <Image
        source={require("../../assets/profilebg.png")} // ⬅️ add your blue burst image here
        style={styles.topBackground}
        resizeMode="cover"
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <Ionicons name="settings-outline" size={24} color="#2563EB" />
      </View>

      {/* Profile Image */}
      <View style={styles.profileContainer}>
        <Image
          source={require("../../assets/profileimage.png")}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Adediwura Ene</Text>
        <Text style={styles.profileEmail}>adediwuraene@gmail.com</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsBox}>
        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Image
            source={require("../../assets/user.png")}
            style={{ width: 20, height: 20, borderRadius: 10 }}
          />
          <Text style={styles.optionText}>Edit Profile</Text>
          <Ionicons name="chevron-forward" size={18} color="#292D32" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => navigation.navigate("PrivacySecurity")}
        >
          <Image
            source={require("../../assets/security.png")}
            style={{ width: 20, height: 20, borderRadius: 10 }}
          />
          <Text style={styles.optionText}>Privacy & Security</Text>
          <Ionicons name="chevron-forward" size={18} color="#292D32" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => setModalVisible(true)}
        >
          <Image
            source={require("../../assets/share.png")}
            style={{ width: 20, height: 20, borderRadius: 10 }}
          />
          <Text style={styles.optionText}>Set Up Hotspot</Text>
          <Ionicons name="chevron-forward" size={18} color="#292D32" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => navigation.navigate("TransactionHistory")}
        >
          <Image
            source={require("../../assets/history.png")}
            style={{ width: 20, height: 20, borderRadius: 10 }}
          />
          <Text style={styles.optionText}>Transaction History</Text>
          <Ionicons name="chevron-forward" size={18} color="#292D32" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Image
            source={require("../../assets/support.png")}
            style={{ width: 20, height: 20, borderRadius: 10 }}
          />
          <Text style={styles.optionText}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={18} color="#292D32" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => setLogoutVisible(true)}
        >
          <Image
            source={require("../../assets/logout.png")}
            style={{ width: 20, height: 20, borderRadius: 10 }}
          />
          <Text style={[styles.optionText, { color: "#FF3333" }]}>Logout</Text>
          <Ionicons name="chevron-forward" size={18} color="#FF3333" />
        </TouchableOpacity>
      </View>

      <SwitchHostModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirm}
      />

      <LogoutModal
        visible={logoutVisible}
        onClose={() => setLogoutVisible(false)}
        onConfirm={() => {
          setLogoutVisible(false);
          // add your logout logic here
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
    position: "relative",
  },
  topBackground: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 200,
  },
  header: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2979FF",
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#2979FF",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2979FF",
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
  optionsBox: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 30,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "#E5E5E5",
  },
  optionText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#000",
  },
});
