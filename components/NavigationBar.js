import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from '../screens/common';
import { useNavigation, useRoute } from "@react-navigation/native";

const NavigationBar = ({ isWifiConnected, onWifiPress }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [hoveredTab, setHoveredTab] = useState(null);

  const tabs = [
    { name: "HomeScreen", icon: "home-outline", label: "HomeScreen" },
    { name: "Rewards", icon: "gift-outline", label: "Rewards" },
    { name: "Connect", icon: "wifi-outline", label: "Connect" },
    { name: "Activities", icon: "list-outline", label: "Activities" },
    { name: "Profile", icon: "person-outline", label: "Profile" },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = route.name === tab.name;
        const isWifi = tab.name === "Connect";
        const isHovered = hoveredTab === tab.name;

        return (
          <TouchableOpacity
            key={index}
            onPress={isWifi ? onWifiPress : () => navigation.navigate(tab.name)}
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
                  isWifi ? Colors.white :
                    (isActive || isHovered) ? Colors.primaryLight : Colors.textDisabled
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
    backgroundColor: Colors.white,
    height: 80,
    borderTopWidth: 0.5,
    borderColor: Colors.divider,
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
    backgroundColor: Colors.wifiDisconnected,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  wifiContainerHovered: {
    backgroundColor: Colors.primaryLight,
    transform: [{ scale: 1.05 }],
  },
  wifiContainerActive: {
    backgroundColor: Colors.primaryLight,
  },
  wifiContainerConnected: {
    backgroundColor: Colors.wifiConnected,
  },
  connectionIndicator: {
    position: "absolute",
    top: -2,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.wifiConnected,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
    color: Colors.textDisabled,
    fontWeight: "500",
  },
  activeTabLabel: {
    color: Colors.primaryLight,
    fontWeight: "600",
  },
});

export default NavigationBar;