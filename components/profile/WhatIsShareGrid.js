import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";

export default function WhatIsShareGrid({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("../../assets/backicon.png")} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>What is ShareGrid?</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.sectionTitle}>About ShareGrid</Text>
        <Text style={styles.sectionText}>
          ShareGrid is a platform that allows users to connect, share, rent, and collaborate with others.
          It’s built to empower creators and entrepreneurs to access resources and equipment easily.
        </Text>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.sectionText}>
          We aim to make sharing more accessible and build a community of trust and collaboration.
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
