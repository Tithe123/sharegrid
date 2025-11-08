import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function Activity({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Activity")}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Activity</Text>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>This Week</Text>
          <Ionicons name="chevron-down" size={16} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Image
            source={require("../../assets/user.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text style={styles.statValue}>24</Text>
          <Text style={styles.statLabel}>Hotspots Connected</Text>
        </View>
        <View style={styles.statCard}>
          <Image
            source={require("../../assets/share.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text style={styles.statValue}>14.2</Text>
          <Text style={styles.statLabel}>GB Used</Text>
        </View>
        <View style={styles.statCard}>
          <Image
            source={require("../../assets/naria.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text style={styles.statValue}>4,850</Text>
          <Text style={styles.statLabel}>Earned</Text>
        </View>
      </View>

      {/* Data Usage Graph */}
      <View style={styles.chartCard}>
        <Text style={styles.sectionTitle}>Data Usage</Text>
        <LineChart
          data={{
            labels: ["Dec 1", "Dec 5", "Dec 9", "Dec 13"],
            datasets: [
              {
                data: [0.5, 1.2, 0.9, 2.4],
                color: () => `#2979FF`,
                strokeWidth: 3,
              },
            ],
          }}
          width={screenWidth - 50}
          height={180}
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(41, 121, 255, ${opacity})`,
            labelColor: () => "#999",
            propsForDots: {
              r: "5",
              strokeWidth: "2",
              stroke: "#2979FF",
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      {/* Recent Connections */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Connections</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("RecentConnections")}
          >
            <Text style={styles.seeMore}>See More</Text>
          </TouchableOpacity>
        </View>

        {[
          {
            name: "Cobhams Training Centre",
            location: "Ikeja, Lagos",
            data: "1.8 GB",
            time: "2 hours ago",
            image: require("../../assets/cup.png"),
          },
          {
            name: "Cobhams Training Centre",
            location: "Ikeja, Lagos",
            data: "2.1 GB",
            time: "14 hours ago",
            image: require("../../assets/cup.png"),
          },
          {
            name: "God is Able Computers",
            location: "Mowe, Ogun",
            data: "1.8 GB",
            time: "1 day ago",
            image: require("../../assets/cup.png"),
          },
        ].map((item, index) => (
          <View key={index} style={styles.connectionCard}>
            <Image
              source={item.image}
              style={{ width: 30, height: 30, marginRight: 20 }}
              resizeMode="contain"
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.connectionName}>{item.name}</Text>
              <Text style={styles.connectionLocation}>{item.location}</Text>
            </View>
            <View>
              <Text style={styles.connectionData}>{item.data}</Text>
              <Text style={styles.connectionTime}>{item.time}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Data Usage Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Data Usage</Text>
          <TouchableOpacity onPress={() => navigation.navigate("DataUsage")}>
            <Text style={styles.seeMore}>See More</Text>
          </TouchableOpacity>
        </View>

        {[
          { app: "Tiktok", data: "2.1 GB", time: "14 hours ago" },
          { app: "Tiktok", data: "2.1 GB", time: "14 hours ago" },
          { app: "Tiktok", data: "2.1 GB", time: "14 hours ago" },
        ].map((item, index) => (
          <View key={index} style={styles.usageCard}>
            <Image
              source={require("../../assets/laptop.png")}
              style={{
                width: 35,
                height: 35,
                borderRadius: 8,
                marginRight: 10,
              }}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.appName}>{item.app}</Text>
            </View>
            <View>
              <Text style={styles.connectionData}>{item.data}</Text>
              <Text style={styles.connectionTime}>{item.time}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Insights */}
      <View style={styles.insightCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.insightTitle}>Insights</Text>
          <Image
            source={require("../../assets/equiry.png")}
            style={{ width: 20, height: 20, marginBottom: 5 }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
            gap: 5,
          }}
        >
          <Image
            source={require("../../assets/clock.png")}
            style={{ width: 20, height: 20, marginBottom: 5 }}
          />
          <Text style={styles.insightText}>
            You connect mostly to God is Able Computers in Lagos with 8 sessions
            this month
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
            gap: 5,
          }}
        >
          <Image
            source={require("../../assets/location.png")}
            style={{ width: 20, height: 20, marginBottom: 5 }}
          />
          <Text style={styles.insightText}>
            Tiktok accounts for 60% of your data usage
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
            gap: 5,
          }}
        >
          <Image
            source={require("../../assets/trophy.png")}
            style={{ width: 20, height: 20, marginBottom: 5 }}
          />
          <Text style={styles.insightText}>
            Your average session length is 45 minutes with peak usage on 13th
            December
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 14,
    color: "#000",
    marginRight: 4,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2979FF",
  },
  statLabel: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
  chartCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 10,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  seeMore: {
    color: "#2979FF",
    fontSize: 12,
  },
  connectionCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 10,
  },
  connectionName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  connectionLocation: {
    fontSize: 12,
    color: "#777",
  },
  connectionData: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    textAlign: "right",
  },
  connectionTime: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
  },
  usageCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  appName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  insightCard: {
    backgroundColor: "#EAF2FF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 40,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2979FF",
    marginBottom: 10,
  },
  insightText: {
    fontSize: 13,
    color: "#333",
    marginBottom: 5,
  },
});
