import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DataUsage({ navigation }) {
  const usageData = [
    {
      id: 1,
      name: "Tiktok",
      dataUsed: "2.1 GB",
      totalData: "4.99 GB",
      time: "14 hours ago",
      icon: require("../../assets/laptop.png"),
    },
    {
      id: 2,
      name: "Tiktok",
      dataUsed: "2.1 GB",
      totalData: "4.99 GB",
      time: "14 hours ago",
      icon: require("../../assets/laptop.png"),
    },
    {
      id: 3,
      name: "Tiktok",
      dataUsed: "2.1 GB",
      totalData: "4.99 GB",
      time: "14 hours ago",
      icon: require("../../assets/laptop.png"),
    },
    {
      id: 4,
      name: "Tiktok",
      dataUsed: "2.1 GB",
      totalData: "4.99 GB",
      time: "14 hours ago",
      icon: require("../../assets/laptop.png"),
    },
    {
      id: 5,
      name: "Tiktok",
      dataUsed: "2.1 GB",
      totalData: "4.99 GB",
      time: "14 hours ago",
      icon: require("../../assets/laptop.png"),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            navigation.canGoBack()
              ? navigation.goBack()
              : navigation.navigate("Activity")
          }
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Data Usage</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Data Usage List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          {usageData.map((item) => (
            <View key={item.id} style={styles.row}>
              <View style={styles.left}>
                <View style={styles.iconWrapper}>
                  <Image
                    source={item.icon}
                    // style={styles.icon}
                    resizeMode="contain"
                  />
                </View>
                <View>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.total}>{item.totalData}</Text>
                </View>
              </View>
              <View style={styles.right}>
                <Text style={styles.dataUsed}>{item.dataUsed}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
    paddingVertical: 10,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF4B4B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "#fff",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  total: {
    fontSize: 12,
    color: "#777",
  },
  right: {
    alignItems: "flex-end",
  },
  dataUsed: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  time: {
    fontSize: 12,
    color: "#777",
  },
});
