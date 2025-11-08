import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";

export default function RentItems({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("../../assets/backicon.png")} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>How can I rent items on ShareGrid?</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.sectionTitle}>Find the Item</Text>
        <Text style={styles.sectionText}>
          Browse listings or use the search bar to find equipment that fits your needs.
        </Text>
        <Text style={styles.sectionTitle}>Request Rental</Text>
        <Text style={styles.sectionText}>
          Once you find an item, send a rental request. The owner will approve or decline based on availability.
        </Text>
        <Text style={styles.sectionTitle}>Pick Up and Return</Text>
        <Text style={styles.sectionText}>
          Coordinate with the owner for pickup and return. Ensure the item is in good condition.
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
