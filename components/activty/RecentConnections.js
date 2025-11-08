import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RecentConnections({ navigation }) {
  const connections = [
    { id: 1, name: "God is Able Computers", location: "Mowe, Ogun", data: "1.8 GB", time: "1 day ago", image: require("../../assets/world.png") },
    { id: 2, name: "God is Able Computers", location: "Mowe, Ogun", data: "1.8 GB", time: "1 day ago", image: require("../../assets/world.png") },
    { id: 3, name: "God is Able Computers", location: "Mowe, Ogun", data: "1.8 GB", time: "1 day ago", image: require("../../assets/world.png") },
    { id: 4, name: "God is Able Computers", location: "Mowe, Ogun", data: "1.8 GB", time: "1 day ago", image: require("../../assets/world.png") },
    { id: 5, name: "God is Able Computers", location: "Mowe, Ogun", data: "1.8 GB", time: "1 day ago", image: require("../../assets/world.png") },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recent Connections</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          {connections.map((item) => (
            <View key={item.id} style={styles.row}>
              <View style={styles.left}>
                <View style={styles.iconWrapper}>
                  <Image source={item.image}  resizeMode="contain" />
                </View>
                <View>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.location}>{item.location}</Text>
                </View>
              </View>
              <View style={styles.right}>
                <Text style={styles.data}>{item.data}</Text>
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
    backgroundColor: "#C64BFF",
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
  location: {
    fontSize: 12,
    color: "#777",
  },
  right: {
    alignItems: "flex-end",
  },
  data: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  time: {
    fontSize: 12,
    color: "#777",
  },
});
