// PrivacySecurityScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PrivacySecurityScreen({ navigation }) {
  const options = [
    { id: 1, title: "How can I use ShareGrid?", screen: "HowToUseShareGrid" },
    { id: 2, title: "What is ShareGrid?", screen: "WhatIsShareGrid" },
    { id: 3, title: "How can I become a vendor?", screen: "BecomeVendor" },
    { id: 4, title: "How can I rent items on ShareGrid?", screen: "RentItems" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../assets/backicon.png")}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy & Security</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Options */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          {options.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.optionRow,
                index !== options.length - 1 && styles.optionBorder,
              ]}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Image
                source={require("../../assets/bulet.png")}
                style={{ width: 20, height: 20, marginRight: 10 }}
              />
              <Text style={styles.optionText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={18} color="#292D32" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  optionBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#E5E5E5",
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    color: "#000",
    fontWeight: "500",
  },
});
