import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const NavigationBar = ({ isWifiConnected, onWifiPress }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [hoveredTab, setHoveredTab] = useState(null);

  const tabs = [
    { name: "Home", routeName: "HomeScreen", icon: "home-outline", label: "Home" },
    { name: "Rewards", routeName: null, icon: "gift-outline", label: "Rewards" },
    { name: "Connect", routeName: null, icon: "wifi-outline", label: "" },
    { name: "Dashboard", routeName: "Home", icon: "grid-outline", label: "Dashboard" },
    { name: "Profile", routeName: "Home", icon: "person-outline", label: "Profile" },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = route.name === tab.routeName;
        const isWifi = tab.name === "Connect";
        const isHovered = hoveredTab === tab.name;

        return (
          <TouchableOpacity
            key={index}
            onPress={
              isWifi
                ? onWifiPress
                : () => (tab.routeName ? navigation.navigate(tab.routeName) : null)
            }
            onPressIn={() => setHoveredTab(tab.name)}
            onPressOut={() => setHoveredTab(null)}
            style={[
              styles.tabButton,
              isWifi && styles.wifiButton,
              (isHovered || isActive) && styles.hoveredButton
            ]}
          >
            <View style={[
              isWifi && styles.wifiContainer,
              (isHovered && isWifi) && styles.wifiContainerHovered,
              (isActive && isWifi) && styles.wifiContainerActive,
              (isWifiConnected && isWifi) && styles.wifiContainerConnected
            ]}>
              <Ionicons
                name={tab.icon}
                size={isWifi ? 28 : 26}
                color={
                  isWifi ? "#fff" :
                    (isActive || isHovered) ? "#007AFF" : "#A0A0A0"
                }
              />
            </View>
            {tab.label ? (
              <Text style={[
                styles.tabLabel,
                (isActive || isHovered) && styles.activeTabLabel
              ]}>
                {tab.label}
              </Text>
            ) : null}


            {isWifi && isWifiConnected && (
              <View style={styles.connectionIndicator} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 80,
    borderTopWidth: 0.5,
    borderColor: "#ddd",
    paddingHorizontal: 10,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 8,
    position: "relative",
  },
  hoveredButton: {
    // Adds hover effect for all tabs
  },
  wifiButton: {
    marginTop: -35,
  },
  wifiContainer: {
    backgroundColor: "#9E9E9E",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  wifiContainerHovered: {
    backgroundColor: "#007AFF",
    transform: [{ scale: 1.05 }],
  },
  wifiContainerActive: {
    backgroundColor: "#007AFF",
  },
  wifiContainerConnected: {
    backgroundColor: "#22C55E",
  },
  connectionIndicator: {
    position: "absolute",
    top: -2,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22C55E",
    borderWidth: 1,
    borderColor: "#fff",
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
    color: "#A0A0A0",
    fontWeight: "500",
  },
  activeTabLabel: {
    color: "#007AFF",
    fontWeight: "600",
  },
});

export default NavigationBar;