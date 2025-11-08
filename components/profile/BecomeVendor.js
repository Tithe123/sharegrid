import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";

export default function BecomeVendor({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("../../assets/backicon.png")} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>How can I become a vendor?</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.sectionTitle}>Vendor Registration</Text>
        <Text style={styles.sectionText}>
          To become a vendor, create a ShareGrid account and navigate to the vendor registration section. Fill out your business details and upload the required documents.
        </Text>
        <Text style={styles.sectionTitle}>Verification</Text>
        <Text style={styles.sectionText}>
          Our team will verify your information and approve your vendor profile within 24–48 hours.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 60 },
  header: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 20, marginBottom: 20 },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#000" },
  scroll: { paddingHorizontal: 20, paddingBottom: 30 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 6 },
  sectionText: { fontSize: 14, color: "#333", lineHeight: 22 },
});
