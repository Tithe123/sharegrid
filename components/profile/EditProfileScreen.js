import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EditProfileScreen({ navigation }) {
  const [email, setEmail] = useState("adediwuraene@gmail.com");
  const [card1, setCard1] = useState("");
  const [card2, setCard2] = useState("");
  const [card3, setCard3] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F9FB" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Background Image */}
        <Image
          source={require("../../assets/profilebg.png")}
          style={styles.topBackground}
          resizeMode="cover"
        />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <View style={{ width: 50 }} />
        </View>

        {/* Profile Image Section */}
        <View style={styles.profileContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={require("../../assets/profileimage.png")}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editIcon}>
              <Ionicons name="camera-outline" size={16} color="#2979FF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Input Fields */}
        <View style={styles.form}>
          <Text style={styles.label}>Your Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            editable={false}
            placeholder="Your Email"
            placeholderTextColor="#C7C7CD"
          />

          <Text style={styles.label}>Card Number</Text>
          <TextInput
            style={styles.input}
            value={card1}
            onChangeText={setCard1}
            placeholder="0000 0000 0000 0000"
            keyboardType="numeric"
            placeholderTextColor="#C7C7CD"
          />

          <Text style={styles.label}>Card Number</Text>
          <TextInput
            style={styles.input}
            value={card2}
            onChangeText={setCard2}
            placeholder="0000 0000 0000 0000"
            keyboardType="numeric"
            placeholderTextColor="#C7C7CD"
          />

          <Text style={styles.label}>Card Number</Text>
          <TextInput
            style={styles.input}
            value={card3}
            onChangeText={setCard3}
            placeholder="0000 0000 0000 0000"
            keyboardType="numeric"
            placeholderTextColor="#C7C7CD"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },
  topBackground: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 220,
  },
  header: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
  },
  cancelText: {
    color: "#2979FF",
    fontSize: 16,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2979FF",
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 25,
  },
  imageWrapper: {
    position: "relative",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#2979FF",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  form: {
    width: "90%",
    marginTop: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 15,
    fontSize: 14,
    color: "#000",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  saveButton: {
    backgroundColor: "#2979FF",
    width: "90%",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
