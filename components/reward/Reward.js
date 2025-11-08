import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./RewardStyles";
import RewardModal from "./RewardsModal";
import { useNavigation } from "@react-navigation/native";

export default function Reward() {
  const [modalVisible, setModalVisible] = useState(false);

  const leaderboard = [
    {
      id: 1,
      name: "Alex Oxlade",
      points: "15,237 pts",
      rank: "#1",
      image: require("../../assets/userImage.png"),
    },
    {
      id: 2,
      name: "Daniel G.",
      points: "15,209 pts",
      rank: "#2",
      image: require("../../assets/userImage.png"),
    },
    {
      id: 3,
      name: "Daniel G.",
      points: "15,209 pts",
      rank: "#3",
      image: require("../../assets/userImage.png"),
    },
    {
      id: 4,
      name: "Daniel G.",
      points: "15,209 pts",
      rank: "#4",
      image: require("../../assets/userImage.png"),
    },
  ];
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>Rewards</Text>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color="#fff"
            />
          </View>
          <Text style={styles.overallPoints}>Overall Points</Text>
          <Text style={styles.pointsValue}>4,334.00</Text>
          <Text style={styles.rankText}>+ You’re 135 overall</Text>
        </View>

        {/* Recent Earnings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Earnings</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("EarningsBreakdown")}
            >
              <Text style={styles.seeMore}>See More</Text>
            </TouchableOpacity>
          </View>

          {/* Data Purchased */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => setModalVisible(true)}
          >
            <View>
              <Text style={styles.cardTitle}>Data Purchased</Text>
              <Text style={styles.cardSub}>15GB purchased this month</Text>
            </View>
            <Text style={styles.pointsGreen}>+75 pts</Text>
          </TouchableOpacity>

          {/* Host Uptime Bonus */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => setModalVisible(true)}
          >
            <View>
              <Text style={styles.cardTitle}>Host Uptime Bonus</Text>
              <Text style={styles.cardSub}>10hrs online today</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>2x Speed Bonus</Text>
              </View>
            </View>
            <Text style={styles.pointsGreen}>+40 pts</Text>
          </TouchableOpacity>

          {/* Referral Bonus */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => setModalVisible(true)}
          >
            <View>
              <Text style={styles.cardTitle}>Referral Bonus</Text>
              <Text style={styles.cardSub}>2 successful referrals</Text>
            </View>
            <Text style={styles.pointsGreen}>+40 pts</Text>
          </TouchableOpacity>
        </View>

        {/* Leaderboard Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Overall Leaderboard</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LeaderboardScreen")}
            >
              <Text style={styles.seeMore}>See More</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 10 }}
          >
            {leaderboard.map((user) => (
              <View key={user.id} style={styles.leaderCard}>
                <Image source={user.image} style={styles.avatar} />
                <Text style={styles.rank}>{user.rank}</Text>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.points}>{user.points}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Auto-Conversion Info</Text>
          <Ionicons
            name="information-circle-outline"
            size={16}
            color="#2979FF"
          />
        </View>
      </ScrollView>

      {/* Modal */}
      <RewardModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}
