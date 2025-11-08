import { StyleSheet } from "react-native";

const RewardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },
  header: {
    backgroundColor: "#2563EB",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  overallPoints: {
    color: "#E8EEFF",
    marginTop: 16,
    fontSize: 14,
  },
  pointsValue: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "800",
    marginTop: 16,
  },
  rankText: {
    color: "#A4FFB3",
    marginTop: 8,
    fontSize: 13,
  },
  section: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  seeMore: {
    fontSize: 13,
    color: "#2979FF",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardTitle: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
  },
  cardSub: {
    color: "#888",
    fontSize: 12,
    marginTop: 3,
  },
  badge: {
    backgroundColor: "#EAF3FF",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 6,
  },
  badgeText: {
    color: "#2979FF",
    fontSize: 11,
    fontWeight: "600",
  },
  pointsGreen: {
    color: "#4CAF50",
    fontWeight: "700",
    fontSize: 13,
  },
  leaderCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    marginRight: 12,
    width: 110,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 6,
  },
  rank: {
    fontSize: 12,
    color: "#888",
  },
  name: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
  points: {
    fontSize: 12,
    color: "#2979FF",
    fontWeight: "600",
    marginTop: 4,
  },
  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginHorizontal: 20,
    marginVertical: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoText: {
    color: "#000",
    fontWeight: "600",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  navItem: {
    alignItems: "center",
  },
  navLabel: {
    fontSize: 11,
    color: "#999",
    marginTop: 3,
  },
  centerIcon: {
    backgroundColor: "#2979FF",
    padding: 15,
    borderRadius: 35,
    marginTop: -25,
    shadowColor: "#2979FF",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
});

export default RewardStyles;
