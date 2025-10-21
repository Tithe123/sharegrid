import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import NavigationBar from "../components/NavigationBar";

const HomeScreen = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState("User");
    const [balanceVisible, setBalanceVisible] = useState(true);
    const [slideAnim] = useState(new Animated.Value(0));
    const [isWifiConnected, setIsWifiConnected] = useState(false);

    const handleToggle = (tab) => {
        setActiveTab(tab);
        Animated.timing(slideAnim, {
            toValue: tab === "User" ? 0 : 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };


    const handleConnectWifi = () => {
        setIsWifiConnected(!isWifiConnected);
    };

    const translateX = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [2, 77],
    });

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>

                <View style={styles.toggleContainer}>
                    <View style={styles.toggleBackground}>
                        <Animated.View
                            style={[
                                styles.toggleInnerButton,
                                { transform: [{ translateX }] },
                            ]}
                        />
                        <TouchableOpacity
                            style={styles.toggleBtn}
                            onPress={() => handleToggle("User")}
                        >
                            <Text
                                style={[
                                    styles.toggleText,
                                    activeTab === "User" && styles.activeToggleText,
                                ]}
                            >
                                User
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.toggleBtn}
                            onPress={() => handleToggle("Host")}
                        >
                            <Text
                                style={[
                                    styles.toggleText,
                                    activeTab === "Host" && styles.activeToggleText,
                                ]}
                            >
                                Host
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.header}>
                    <View style={styles.userSection}>
                        <Image
                            source={{ uri: "https://i.pravatar.cc/100" }}
                            style={styles.avatar}
                        />
                        <View>
                            <Text style={styles.username}>Hi Bryan</Text>
                            <View style={styles.location}>
                                <Ionicons name="location-outline" size={14} color="#007AFF" />
                                <Text style={styles.locationText}>Edo State NG</Text>
                            </View>
                        </View>
                    </View>
                    <Ionicons name="notifications-outline" size={24} color="#007AFF" />
                </View>


                <View style={styles.walletCard}>
                    <View style={styles.walletTop}>
                        <View style={styles.leftSection}>
                            <View style={styles.balanceRow}>
                                <Text style={styles.walletLabel}>Available Balance</Text>
                                <TouchableOpacity
                                    onPress={() => setBalanceVisible(!balanceVisible)}
                                >
                                    <Ionicons
                                        name={balanceVisible ? "eye-outline" : "eye-off-outline"}
                                        size={18}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.amountContainer}>
                                <Text style={styles.walletAmount}>
                                    {balanceVisible ? "5,334.90" : "•••••"}
                                </Text>
                                <Text style={styles.currency}>
                                    {balanceVisible ? "NGN" : ""}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.transactionSection}>
                            <TouchableOpacity style={styles.transactionHistory}>
                                <Text style={styles.walletLink}>Transaction History ›</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.walletButton}
                                onPress={() => navigation.navigate("ViewWallet")}
                            >
                                <Text style={styles.walletButtonText}>View Wallet</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.actionItem}>
                        <View style={styles.actionCircle}>
                            <Ionicons name="share-social-outline" size={28} color="#fff" />
                        </View>
                        <Text style={styles.actionText}>Share Hotspot</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionItem}>
                        <View style={styles.actionCircle}>
                            <Ionicons name="wifi-outline" size={28} color="#fff" />
                        </View>
                        <Text style={styles.actionText}>Connect to Wifi</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionItem}>
                        <View style={styles.actionCircle}>
                            <Ionicons name="wallet-outline" size={28} color="#fff" />
                        </View>
                        <Text style={styles.actionText}>Withdraw</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Nearby Wifi</Text>
                    <TouchableOpacity
                        style={styles.seeMore}
                        onPress={() => navigation.navigate("NearbyWifi")}
                    >
                        <Text style={styles.link}>See More ›</Text>
                    </TouchableOpacity>
                </View>


                <Image
                    source={{ uri: "https://i.imgur.com/5QZrFTO.png" }}
                    style={styles.map}
                />


                <View style={styles.wifiCard}>
                    <View style={styles.wifiTopRow}>
                        <Text style={styles.wifiName}>LTE-WIFI_Airtel2.4G_8002</Text>
                        <Text style={styles.wifiPrice}>15NGN/MB</Text>
                    </View>

                    <View style={styles.wifiMidRow}>
                        <Text style={styles.wifiDistance}>0.2 km away</Text>
                        <Text style={styles.wifiSpeed}>Speed: 80Mbps</Text>
                    </View>

                    <View style={styles.wifiBottomRow}>
                        <Text style={styles.wifiRating}>Rating: 4.5/5.0</Text>
                        <TouchableOpacity
                            style={[
                                styles.connectBtn,
                                isWifiConnected && styles.connectedBtn,
                            ]}
                            onPress={handleConnectWifi}
                        >
                            <Text
                                style={[
                                    styles.connectText,
                                    isWifiConnected && styles.connectedText,
                                ]}
                            >
                                {isWifiConnected ? "Connected" : "Connect"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.optionsContainer}>
                    <Text style={styles.optionsText}>Options</Text>
                </View>
            </ScrollView>


            <NavigationBar
                isWifiConnected={isWifiConnected}
                onWifiPress={handleConnectWifi}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F7F9FB" },
    scroll: { paddingBottom: 100 },

    toggleContainer: { alignItems: "center", marginTop: 50 },
    toggleBackground: {
        flexDirection: "row",
        backgroundColor: "#E9F0FF",
        width: 160,
        height: 38,
        borderRadius: 4,
        overflow: "hidden",
    },
    toggleInnerButton: {
        position: "absolute",
        width: "50%",
        height: "85%",
        backgroundColor: "#007AFF",
        top: 3,
        left: 3,
        borderRadius: 6,
    },
    toggleBtn: { flex: 1, justifyContent: "center", alignItems: "center" },
    toggleText: { color: "#007AFF", fontSize: 13, fontWeight: "500" },
    activeToggleText: { color: "#fff", fontWeight: "700" },


    header: {
        marginTop: 25,
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    userSection: { flexDirection: "row", alignItems: "center" },
    avatar: { width: 45, height: 45, borderRadius: 22.5, marginRight: 10 },
    username: { fontSize: 16, fontWeight: "600" },
    location: { flexDirection: "row", alignItems: "center" },
    locationText: { color: "#555", fontSize: 13, marginLeft: 3 },


    walletCard: {
        backgroundColor: "#007AFF",
        marginHorizontal: 20,
        borderRadius: 12,
        padding: 20,
        marginTop: 30,
    },
    walletTop: { flexDirection: "row", justifyContent: "space-between" },
    balanceRow: { flexDirection: "row", alignItems: "center", gap: 6 },
    walletLabel: { color: "#fff", opacity: 0.9, fontSize: 13 },
    amountContainer: { flexDirection: "row", alignItems: "flex-start" },
    walletAmount: { fontSize: 28, fontWeight: "bold", color: "#fff" },
    currency: { color: "#fff", fontSize: 10, marginLeft: 4, marginTop: 5 },
    transactionSection: { alignItems: "flex-end" },
    walletLink: { color: "#fff", fontSize: 14 },
    walletButton: {
        backgroundColor: "#fff",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
        marginTop: 10,
    },
    walletButtonText: { color: "#007AFF", fontWeight: "600", fontSize: 12 },


    actionRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 25,
        marginHorizontal: 10,
    },
    actionItem: { alignItems: "center" },
    actionCircle: {
        width: 60,
        height: 60,
        backgroundColor: "#2563EB",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 6,
    },
    actionText: { fontSize: 13, fontWeight: "500", color: "#333" },


    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginTop: 25,
    },
    sectionTitle: { fontSize: 16, fontWeight: "600" },
    link: { color: "#000", fontWeight: "500", fontSize: 16 },
    map: {
        marginHorizontal: 20,
        marginVertical: 15,
        height: 150,
        borderRadius: 10,
    },
    wifiCard: {
        backgroundColor: "#fff",
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 12,
        elevation: 2,
        marginBottom: 30,
    },
    wifiTopRow: { flexDirection: "row", justifyContent: "space-between" },
    wifiMidRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 6,
    },
    wifiBottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    wifiName: { fontWeight: "600", fontSize: 14 },
    wifiPrice: { fontWeight: "600", fontSize: 13 },
    wifiDistance: { color: "#666", fontSize: 12 },
    wifiSpeed: { color: "#666", fontSize: 12 },
    wifiRating: { color: "#666", fontSize: 12 },
    connectBtn: {
        backgroundColor: "#007AFF",
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 6,
    },
    connectedBtn: { backgroundColor: "#22C55E" },
    connectText: { color: "#fff", fontWeight: "600", fontSize: 13 },
    connectedText: { color: "#fff", fontWeight: "600" },


    optionsContainer: { marginLeft: 20, marginBottom: 40 },
    optionsText: { fontSize: 18, fontWeight: "700", color: "#000" },
});

export default HomeScreen;
