import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EarningsBreakdown({ navigation }) {
  const [activeTab, setActiveTab] = useState("User");

  const userEarnings = [
    {
      id: 1,
      title: "Data Purchased",
      subtitle: "15GB purchased this month",
      points: "+75 pts",
    },
    { id: 2, title: "Money Spent", subtitle: "3,000 NGN", points: "+30 pts" },
    {
      id: 3,
      title: "Referral Bonus",
      subtitle: "2 successful referrals",
      points: "+40 pts",
    },
  ];

  const hostEarnings = [
    {
      id: 1,
      title: "Host Uptime Bonus",
      subtitle: "10hrs online today",
      points: "+40 pts",
    },
    {
      id: 2,
      title: "Daily Activity Reward",
      subtitle: "You hosted 4 users",
      points: "+20 pts",
    },
  ];

  const earnings = activeTab === "User" ? userEarnings : hostEarnings;
  const hasEarnings = earnings.length > 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Earnings Breakdown</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "User" && styles.activeTab]}
          onPress={() => setActiveTab("User")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "User" && styles.activeTabText,
            ]}
          >
            User
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Host" && styles.activeTab]}
          onPress={() => setActiveTab("Host")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Host" && styles.activeTabText,
            ]}
          >
            Host
          </Text>
        </TouchableOpacity>
      </View>

      {/* Earnings list or Empty state */}
      {hasEarnings ? (
        <ScrollView style={styles.list}>
          {earnings.map((item) => (
            <View key={item.id} style={styles.card}>
              <View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </View>
              <Text style={styles.points}>{item.points}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Image
            source={require("../../assets/empty.png")} // replace with your own image
            style={styles.emptyImage}
            resizeMode="contain"
          />
          <Text style={styles.emptyTitle}>You have no reward yet!</Text>
          <Text style={styles.emptyText}>
            Get started by purchasing a data plan or funding your wallet
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFF",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#E9F1FF",
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#2979FF",
  },
  tabText: {
    color: "#555",
    fontSize: 14,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#fff",
  },
  list: {
    flex: 1,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#777",
  },
  points: {
    color: "#00B050",
    fontWeight: "600",
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  emptyImage: {
    width: 160,
    height: 120,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 30,
  },
});
