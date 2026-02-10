import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    TouchableOpacity,
    ScrollView,
    Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import NavigationBar from "../../components/NavigationBar";

const PRIMARY_BLUE = "#2563EB";
const PRIMARY_BLUE_PRESSED = "#3B82F6";

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

        if (tab === "Host") {
            navigation.navigate("HostKyc");
        }
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
                            source={require("../../assets/illustration 1.png")}
                            style={styles.avatar}
                        />
                        <View>
                            <Text style={styles.username}>Hi Bryan</Text>
                            <View style={styles.location}>
                                <Ionicons name="location" size={14} color={PRIMARY_BLUE} />
                                <Text style={styles.locationText}>Edo State NG</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.notificationWrap}
                        onPress={() => navigation.navigate("UserNotifications")}
                        hitSlop={10}
                    >
                        <Ionicons name="notifications-outline" size={26} color={PRIMARY_BLUE} />
                        <View style={styles.notificationDot} />
                    </TouchableOpacity>
                </View>


                <View style={styles.walletCard}>
                    <View style={styles.walletTop}>
                        <View style={styles.leftSection}>
                            <View style={styles.balanceRow}>
                                <Text style={styles.walletLabel}>Available Balance</Text>
                                <Pressable
                                    onPress={() => setBalanceVisible((v) => !v)}
                                    hitSlop={10}
                                    accessibilityRole="button"
                                >
                                    <Ionicons
                                        name={balanceVisible ? "eye-outline" : "eye-off-outline"}
                                        size={18}
                                        color="#fff"
                                    />
                                </Pressable>
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
                            <TouchableOpacity
                                style={styles.transactionHistory}
                                onPress={() => navigation.navigate("UserTransactionHistory")}
                            >
                                <Text style={styles.walletLink}>Transaction History</Text>
                                <Ionicons name="chevron-forward" size={16} color="#fff" />
                            </TouchableOpacity>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.walletButton,
                                    pressed && styles.walletButtonPressed,
                                ]}
                                onPress={() => navigation.navigate("ViewWallet")}
                            >
                                <Text style={styles.walletButtonText}>View Wallet</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>


                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.actionItem}>
                        <View style={styles.actionCircle}>
                            <Ionicons name="share-social-outline" size={28} color="#fff" />
                        </View>
                        <Text style={styles.actionText}>Share{"\n"}Hotspot</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionItem}
                        onPress={() => navigation.navigate("NearbyWifi")}
                    >
                        <View style={styles.actionCircle}>
                            <Ionicons name="wifi-outline" size={28} color="#fff" />
                        </View>
                        <Text style={styles.actionText}>Connect{"\n"}to Wifi</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionItem}
                        onPress={() => navigation.navigate("ViewWallet", { openWithdrawalModal: true })}
                    >
                        <View style={styles.actionCircle}>
                            <Ionicons name="wallet-outline" size={28} color="#fff" />
                        </View>
                        <Text style={styles.actionText}>Withdraw{"\n"}Earnings</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Nearby Wifi</Text>
                    <TouchableOpacity
                        style={styles.seeMore}
                        onPress={() => navigation.navigate("NearbyWifi")}
                    >
                        <Text style={styles.link}>See More</Text>
                        <Ionicons name="chevron-forward" size={18} color="#000" />
                    </TouchableOpacity>
                </View>


                <View style={styles.mapWrap}>
                    <View style={styles.mapBg}>
                        <View style={styles.mapRoadHorizontal} />
                        <View style={styles.mapRoadVertical} />
                        <View style={styles.mapRoadDiagonal} />

                        <View style={[styles.mapPin, { top: 28, left: 34 }]}>
                            <Ionicons name="wifi" size={14} color="#fff" />
                        </View>
                        <View style={[styles.mapPinAlt, { top: 78, right: 46 }]}>
                            <Ionicons name="wifi" size={14} color="#fff" />
                        </View>
                        <View style={[styles.mapPinAlt, { bottom: 26, left: 88 }]}>
                            <Ionicons name="wifi" size={14} color="#fff" />
                        </View>

                        <View style={styles.mapLegend}>
                            <View style={styles.mapLegendDot} />
                            <Text style={styles.mapLegendText}>Nearby hotspots</Text>
                        </View>
                    </View>
                </View>


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
                        <Pressable
                            style={({ pressed }) => [
                                styles.connectBtn,
                                pressed && !isWifiConnected && styles.connectBtnPressed,
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
                        </Pressable>
                    </View>
                </View>


                <View style={styles.optionsContainer}>
                    <Text style={styles.optionsText}>Options</Text>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.optionsRow}
                >
                    <LinearGradient
                        colors={["#2C67F5", PRIMARY_BLUE]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.optionCard}
                    >
                        <View style={styles.optionContent}>
                            <Text style={styles.optionTitle}>Earn rewards by{"\n"}sharing data</Text>
                            <Text style={styles.optionSubtitle}>
                                Connect to hotspots and earn points from activity
                            </Text>
                            <View style={styles.optionCtaRow}>
                                <Text style={styles.optionCtaText}>Explore</Text>
                                <Ionicons name="arrow-forward" size={18} color="#22C55E" />
                            </View>
                        </View>

                        <View style={styles.optionIconWrap}>
                            <Ionicons name="gift-outline" size={40} color="rgba(255,255,255,0.95)" />
                        </View>
                    </LinearGradient>

                    <LinearGradient
                        colors={["#0EA5E9", "#2563EB"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.optionCard}
                    >
                        <View style={styles.optionContent}>
                            <Text style={styles.optionTitle}>Find WiFi near{"\n"}you</Text>
                            <Text style={styles.optionSubtitle}>
                                View hotspots on the map and connect instantly
                            </Text>
                            <View style={styles.optionCtaRow}>
                                <Text style={styles.optionCtaText}>Browse</Text>
                                <Ionicons name="arrow-forward" size={18} color="#22C55E" />
                            </View>
                        </View>

                        <View style={styles.optionIconWrap}>
                            <Ionicons name="wifi" size={40} color="rgba(255,255,255,0.95)" />
                        </View>
                    </LinearGradient>
                </ScrollView>
            </ScrollView>


            <NavigationBar
                isWifiConnected={isWifiConnected}
                onWifiPress={handleConnectWifi}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFFFFF" },
    scroll: { paddingBottom: 110 },

    toggleContainer: { alignItems: "center", marginTop: 55 },
    toggleBackground: {
        flexDirection: "row",
        backgroundColor: "#E9F0FF",
        width: 160,
        height: 38,
        borderRadius: 8,
        overflow: "hidden",
    },
    toggleInnerButton: {
        position: "absolute",
        width: "50%",
        height: "85%",
        backgroundColor: "#FFFFFF",
        top: 3,
        left: 3,
        borderRadius: 6,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    toggleBtn: { flex: 1, justifyContent: "center", alignItems: "center" },
    toggleText: { color: "#111", fontSize: 13, fontWeight: "500" },
    activeToggleText: { color: PRIMARY_BLUE, fontWeight: "700" },


    header: {
        marginTop: 25,
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    userSection: { flexDirection: "row", alignItems: "center" },
    avatar: { width: 45, height: 45, borderRadius: 22.5, marginRight: 10 },
    username: { fontSize: 18, fontWeight: "700" },
    location: { flexDirection: "row", alignItems: "center" },
    locationText: { color: "#111", fontSize: 14, marginLeft: 6, fontWeight: "500" },
    notificationWrap: { position: "relative" },
    notificationDot: {
        position: "absolute",
        top: 2,
        right: 1,
        width: 9,
        height: 9,
        borderRadius: 4.5,
        backgroundColor: "#EF4444",
    },


    walletCard: {
        backgroundColor: PRIMARY_BLUE,
        marginHorizontal: 20,
        borderRadius: 16,
        padding: 22,
        marginTop: 22,
    },
    walletTop: { flexDirection: "row", justifyContent: "space-between" },
    balanceRow: { flexDirection: "row", alignItems: "center", gap: 6 },
    walletLabel: { color: "#fff", opacity: 0.95, fontSize: 14, fontWeight: "500" },
    amountContainer: { flexDirection: "row", alignItems: "flex-start" },
    walletAmount: { fontSize: 34, fontWeight: "500", color: "#fff", marginTop: 6 },
    currency: { color: "#fff", fontSize: 12, marginLeft: 8, marginTop: 20, opacity: 0.95 },
    transactionSection: { alignItems: "flex-end" },
    transactionHistory: { flexDirection: "row", alignItems: "center", gap: 2 },
    walletLink: { color: "#fff", fontSize: 14, fontWeight: "500" },
    walletButton: {
        backgroundColor: "#EFF6FF",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 14,
    },
    walletButtonPressed: {
        backgroundColor: "#DBEAFE",
    },
    walletButtonText: { color: PRIMARY_BLUE, fontWeight: "700", fontSize: 13 },


    actionRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 26,
        marginHorizontal: 18,
    },
    actionItem: { alignItems: "center", width: 95 },
    actionCircle: {
        width: 70,
        height: 70,
        backgroundColor: PRIMARY_BLUE,
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    actionText: { fontSize: 13, fontWeight: "500", color: "#111", textAlign: "center" },


    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginTop: 25,
        alignItems: "center",
    },
    sectionTitle: { fontSize: 18, fontWeight: "700" },
    seeMore: { flexDirection: "row", alignItems: "center", gap: 2 },
    link: { color: "#000", fontWeight: "500", fontSize: 14 },
    mapWrap: {
        marginHorizontal: 20,
        marginVertical: 15,
        height: 170,
        borderRadius: 12,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#EEF2F7",
    },
    mapBg: {
        flex: 1,
        backgroundColor: "#EAF2FF",
    },
    mapRoadHorizontal: {
        position: "absolute",
        left: -30,
        right: -30,
        top: 70,
        height: 18,
        backgroundColor: "rgba(255,255,255,0.65)",
        transform: [{ rotate: "-2deg" }],
    },
    mapRoadVertical: {
        position: "absolute",
        top: -30,
        bottom: -30,
        left: 125,
        width: 18,
        backgroundColor: "rgba(255,255,255,0.65)",
        transform: [{ rotate: "2deg" }],
    },
    mapRoadDiagonal: {
        position: "absolute",
        left: -60,
        right: -60,
        top: 120,
        height: 14,
        backgroundColor: "rgba(255,255,255,0.55)",
        transform: [{ rotate: "12deg" }],
    },
    mapPin: {
        position: "absolute",
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: PRIMARY_BLUE,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    mapPinAlt: {
        position: "absolute",
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#22C55E",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    mapLegend: {
        position: "absolute",
        left: 10,
        bottom: 10,
        backgroundColor: "rgba(255,255,255,0.9)",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    mapLegendDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: PRIMARY_BLUE,
    },
    mapLegendText: {
        fontSize: 11,
        fontWeight: "800",
        color: "#111",
    },
    wifiCard: {
        backgroundColor: "#fff",
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 3 },
        elevation: 1,
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
        backgroundColor: PRIMARY_BLUE,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 10,
        minWidth: 120,
        alignItems: "center",
    },
    connectBtnPressed: {
        backgroundColor: PRIMARY_BLUE_PRESSED,
    },
    connectedBtn: { backgroundColor: "#22C55E" },
    connectText: { color: "#fff", fontWeight: "700", fontSize: 14 },
    connectedText: { color: "#fff", fontWeight: "600" },


    optionsContainer: { marginLeft: 20, marginBottom: 0 },
    optionsText: { fontSize: 18, fontWeight: "700", color: "#000" },
    optionsRow: {
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 12,
        gap: 12,
    },
    optionCard: {
        width: 290,
        borderRadius: 14,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    optionContent: {
        flex: 1,
        paddingRight: 12,
    },
    optionTitle: {
        fontSize: 18,
        fontWeight: "900",
        color: "#FFFFFF",
        lineHeight: 22,
    },
    optionSubtitle: {
        marginTop: 8,
        fontSize: 12,
        fontWeight: "700",
        color: "rgba(255,255,255,0.92)",
        lineHeight: 16,
    },
    optionCtaRow: {
        marginTop: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    optionCtaText: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "900",
    },
    optionIconWrap: {
        width: 86,
        height: 86,
        borderRadius: 43,
        backgroundColor: "rgba(255,255,255,0.16)",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default HomeScreen;
