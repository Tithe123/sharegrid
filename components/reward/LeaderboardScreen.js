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

export default function LeaderboardScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("Overall");

  const leaderboardData = {
    Overall: [
      {
        id: 1,
        name: "Alex Oxlade",
        points: "15,237",
        rank: "1",
        avatar: "https://randomuser.me/api/portraits/men/11.jpg",
      },
      {
        id: 2,
        name: "Daniel Gutierrez",
        points: "15,209",
        rank: "2",
        avatar: "https://randomuser.me/api/portraits/men/21.jpg",
      },
      {
        id: 3,
        name: "Jannik Sinner",
        points: "15,200",
        rank: "3",
        avatar: "https://randomuser.me/api/portraits/men/31.jpg",
      },
      {
        id: 4,
        name: "Dolores Aveiro",
        points: "15,197",
        rank: "4",
        avatar: "https://randomuser.me/api/portraits/women/41.jpg",
      },
    ],
    Users: [
      {
        id: 1,
        name: "Alex Oxlade",
        points: "15,237",
        rank: "1",
        avatar: "https://randomuser.me/api/portraits/men/12.jpg",
      },
      {
        id: 2,
        name: "Daniel Gutierrez",
        points: "15,209",
        rank: "2",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      },
      {
        id: 3,
        name: "Jannik Sinner",
        points: "15,200",
        rank: "3",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
    ],
    Hosts: [
      {
        id: 1,
        name: "Sophia Turner",
        points: "14,987",
        rank: "1",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      },
      {
        id: 2,
        name: "Michael Reeves",
        points: "14,802",
        rank: "2",
        avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      },
      {
        id: 3,
        name: "Clara Johnson",
        points: "14,780",
        rank: "3",
        avatar: "https://randomuser.me/api/portraits/women/47.jpg",
      },
      {
        id: 4,
        name: "Samuel Green",
        points: "14,763",
        rank: "4",
        avatar: "https://randomuser.me/api/portraits/men/48.jpg",
      },
    ],
  };

  const data = leaderboardData[activeTab];
  const hasData = data && data.length > 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leaderboards</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {["Overall", "Users", "Hosts"].map((tab) => (
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

      {/* Leaderboard Table */}
      {hasData ? (
        <ScrollView style={styles.list}>
          {/* Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableText, { flex: 0.8, textAlign: "left" }]}>
              Rank
            </Text>
            <Text style={[styles.tableText, { flex: 2, marginLeft: 46 }]}>
              User
            </Text>
            <Text style={[styles.tableText, { flex: 1, textAlign: "right" }]}>
              Points
            </Text>
          </View>

          {/* Rows */}
          {data.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <View style={[styles.userCell, { flex: 0.8 }]}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <Text
                  style={[styles.tableValue, { flex: 0.8, textAlign: "left" }]}
                >
                  {item.rank}
                </Text>
              </View>

              <View style={[styles.userCell, { flex: 2, marginLeft: 46 }]}>
                <Text style={styles.userName}>{item.name}</Text>
              </View>

              <Text
                style={[styles.tableValue, { flex: 1, textAlign: "right" }]}
              >
                {item.points}
              </Text>
            </View>
          ))}

          {/* Pagination */}
          <View style={styles.pagination}>
            <Text style={styles.paginationText}>
              Showing 1 to 12 of 830 results
            </Text>
            <View style={styles.pageButtons}>
              <Ionicons name="chevron-back" size={18} color="#000" />
              <View style={styles.pageNumber}>
                <Text style={styles.pageNumberText}>1</Text>
              </View>
              <Text style={styles.pageNumberInactive}>2</Text>
              <Text style={styles.pageNumberInactive}>3</Text>
              <Ionicons name="chevron-forward" size={18} color="#000" />
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Image
            source={require("../../assets/empty.png")}
            style={styles.emptyImage}
            resizeMode="contain"
          />
          <Text style={styles.emptyTitle}>No leaderboard yet!</Text>
          <Text style={styles.emptyText}>
            Get started by earning rewards to appear on the leaderboard.
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
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#2979FF",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: "center",
  },
  tableText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  userCell: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },

  tableValue: {
    color: "#222",
    fontSize: 14,
  },
  userName: {
    color: "#222",
    fontSize: 14,
    fontWeight: "500",
  },
  pagination: {
    paddingVertical: 16,
    alignItems: "center",
  },
  paginationText: {
    fontSize: 12,
    color: "#555",
    marginBottom: 10,
  },
  pageButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  pageNumber: {
    backgroundColor: "#2979FF",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  pageNumberText: {
    color: "#fff",
    fontWeight: "600",
  },
  pageNumberInactive: {
    color: "#555",
    fontWeight: "500",
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
