import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TransactionHistory({ navigation }) {
  const [activeTab, setActiveTab] = useState("All");

  const transactions = [
    {
      id: "1",
      title: "Crypto Deposit",
      date: "5 Aug 2025, 5:52",
      amount: "+USDC 20",
      status: "Cancelled",
    },
    {
      id: "2",
      title: "Crypto Deposit",
      date: "5 Aug 2025, 5:52",
      amount: "+USDC 20",
      status: "Completed",
    },
  ];

  const filteredData =
    activeTab === "All"
      ? transactions
      : transactions.filter((t) => t.status === activeTab);

  const renderItem = ({ item }) => (
    <View style={styles.transactionCard}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={require("../../assets/bitcoin.png")}
          style={{ width: 35, height: 35, marginRight: 10 }}
        />
        <View>
          <Text style={styles.transactionTitle}>{item.title}</Text>
          <Text style={styles.transactionDate}>{item.date}</Text>
        </View>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Text style={styles.transactionAmount}>{item.amount}</Text>
        {item.status === "Completed" && (
          <View style={styles.completedBadge}>
            <Text style={styles.completedText}>Completed</Text>
          </View>
        )}
        {item.status === "Cancelled" && (
          <View style={styles.cancelledBadge}>
            <Text style={styles.cancelledText}>Cancelled</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction History</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsWrapper}>
        {["All", "Completed", "Cancelled"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Transaction List or Empty State */}
      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
        />
      ) : (
        <View style={styles.emptyState}>
          <Image
            source={require("../../assets/empty.png")}
            style={{ width: 120, height: 120 }}
            resizeMode="contain"
          />
          <Text style={styles.emptyTitle}>You have no transactions yet!</Text>
          <Text style={styles.emptySubtitle}>
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
    backgroundColor: "#F8F9FB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },

  // NEW Tab Design (like the image)
  tabsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#EEF3FF",
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    padding: 4,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#2F6BFF",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8EA0C9",
  },
  activeTabText: {
    color: "#fff",
  },

  transactionCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  transactionTitle: {
    fontWeight: "600",
    color: "#000",
  },
  transactionDate: {
    color: "#888",
    fontSize: 12,
  },
  transactionAmount: {
    fontWeight: "700",
    color: "#1A73E8",
  },
  completedBadge: {
    backgroundColor: "#E6F8EA",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 3,
  },
  completedText: {
    fontSize: 11,
    color: "#1AB65C",
    fontWeight: "500",
  },
  cancelledBadge: {
    backgroundColor: "#FFEAEA",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 3,
  },
  cancelledText: {
    fontSize: 11,
    color: "#FF3333",
    fontWeight: "500",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  emptyTitle: {
    marginTop: 20,
    fontWeight: "700",
    fontSize: 16,
    color: "#000",
  },
  emptySubtitle: {
    marginTop: 6,
    fontSize: 13,
    color: "#888",
    textAlign: "center",
  },
});
