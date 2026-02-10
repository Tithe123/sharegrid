import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Animated,
    Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const PRIMARY_BLUE = "#2563EB";
const PRIMARY_BLUE_PRESSED = "#3B82F6";

const HostHome = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState("Host");
    const [slideAnim] = useState(new Animated.Value(1));

    const handleToggle = (tab) => {
        setActiveTab(tab);
        Animated.timing(slideAnim, {
            toValue: tab === "User" ? 0 : 1,
            duration: 200,
            useNativeDriver: false,
        }).start();

        if (tab === "User") {
            navigation.navigate("HomeScreen");
        }
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
                        onPress={() => navigation.navigate("HostNotifications")}
                        hitSlop={10}
                    >
                        <Ionicons
                            name="notifications-outline"
                            size={26}
                            color={PRIMARY_BLUE}
                        />
                        <View style={styles.notificationDot} />
                    </TouchableOpacity>
                </View>

                <View style={styles.walletCard}>
                    <View style={styles.walletTop}>
                        <View>
                            <View style={styles.balanceRow}>
                                <Text style={styles.walletLabel}>Available Balance</Text>
                                <Ionicons
                                    name="eye-off-outline"
                                    size={16}
                                    color="#fff"
                                />
                            </View>
                            <View style={styles.amountContainer}>
                                <Text style={styles.walletAmount}>5,334.90</Text>
                                <Text style={styles.currency}>NGN</Text>
                            </View>
                        </View>

                        <View style={styles.transactionSection}>
                            <TouchableOpacity
                                style={styles.transactionHistory}
                                onPress={() => navigation.navigate("HostTransactionHistory")}
                            >
                                <Text style={styles.walletLink}>Transaction History</Text>
                                <Ionicons
                                    name="chevron-forward"
                                    size={16}
                                    color="#fff"
                                />
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
                            <Ionicons
                                name="share-social-outline"
                                size={28}
                                color="#fff"
                            />
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
                            <Ionicons
                                name="wallet-outline"
                                size={28}
                                color="#fff"
                            />
                        </View>
                        <Text style={styles.actionText}>Withdraw{"\n"}Earnings</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Hotspots</Text>
                    <TouchableOpacity
                        style={styles.seeMore}
                        onPress={() => navigation.navigate("HostDashboard")}
                    >
                        <Text style={styles.link}>See More</Text>
                        <Ionicons name="chevron-forward" size={18} color="#000" />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.hotspotRow}
                >
                    <View style={styles.hotspotCard}>
                        <View style={styles.hotspotTopRow}>
                            <View>
                                <View style={styles.hotspotNameRow}>
                                    <Text style={styles.hotspotName}>Ibeju Initiative</Text>
                                    <View style={styles.onlineDot} />
                                </View>
                                <Text style={styles.hotspotLoc}>Ibeju Lekki</Text>
                            </View>
                            <View style={styles.badge}>
                                <Ionicons
                                    name="triangle"
                                    size={12}
                                    color="#22C55E"
                                    style={styles.badgeIcon}
                                />
                                <Text style={styles.badgeText}>High</Text>
                            </View>
                        </View>

                        <Text style={styles.hotspotMeta}>
                            12 Users today · 5.4GB Spent
                        </Text>
                        <Text style={styles.hotspotMeta}>
                            Uptime: <Text style={styles.hotspotUptime}>98%</Text>
                        </Text>

                        <View style={styles.hotspotBottomRow}>
                            <View />
                            <Pressable
                                style={({ pressed }) => [
                                    styles.manageBtn,
                                    pressed && styles.manageBtnPressed,
                                ]}
                                onPress={() =>
                                    navigation.navigate("HostHotspotManage", {
                                        hotspotName: "Ibeju Initiative",
                                        qualityLevel: "High",
                                        qualityVariant: "green",
                                    })
                                }
                            >
                                <Text style={styles.manageText}>Manage</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.hotspotCard}>
                        <View style={styles.hotspotTopRow}>
                            <View>
                                <View style={styles.hotspotNameRow}>
                                    <Text style={styles.hotspotName}>Ibeju Initiative</Text>
                                    <View style={styles.onlineDot} />
                                </View>
                                <Text style={styles.hotspotLoc}>Ibeju Lekki</Text>
                            </View>
                            <View style={styles.badge}>
                                <Ionicons
                                    name="triangle"
                                    size={12}
                                    color="#22C55E"
                                    style={styles.badgeIcon}
                                />
                                <Text style={styles.badgeText}>High</Text>
                            </View>
                        </View>

                        <Text style={styles.hotspotMeta}>
                            12 Users today · 5.4GB Spent
                        </Text>
                        <Text style={styles.hotspotMeta}>
                            Uptime: <Text style={styles.hotspotUptime}>98%</Text>
                        </Text>

                        <View style={styles.hotspotBottomRow}>
                            <View />
                            <Pressable
                                style={({ pressed }) => [
                                    styles.manageBtn,
                                    pressed && styles.manageBtnPressed,
                                ]}
                                onPress={() =>
                                    navigation.navigate("HostHotspotManage", {
                                        hotspotName: "Ibeju Initiative",
                                        qualityLevel: "High",
                                        qualityVariant: "green",
                                    })
                                }
                            >
                                <Text style={styles.manageText}>Manage</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>

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
                            <Text style={styles.optionTitle}>Earn money with{"\n"}your Device</Text>
                            <Text style={styles.optionSubtitle}>
                                Become a server host and earn returns from WiFi subscriptions
                            </Text>

                            <View style={styles.optionCtaRow}>
                                <Text style={styles.optionCtaText}>Get Started</Text>
                                <Ionicons name="arrow-forward" size={18} color="#22C55E" />
                            </View>
                        </View>

                        <Image
                            source={require("../../assets/phone.png")}
                            style={styles.optionImage}
                            resizeMode="contain"
                        />
                    </LinearGradient>

                    <LinearGradient
                        colors={["#2C67F5", PRIMARY_BLUE]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.optionCard}
                    >
                        <View style={styles.optionContent}>
                            <Text style={styles.optionTitle}>Earn money with{"\n"}your Device</Text>
                            <Text style={styles.optionSubtitle}>
                                Become a server host and earn returns from WiFi subscriptions
                            </Text>

                            <View style={styles.optionCtaRow}>
                                <Text style={styles.optionCtaText}>Get Started</Text>
                                <Ionicons name="arrow-forward" size={18} color="#22C55E" />
                            </View>
                        </View>

                        <Image
                            source={require("../../assets/phone.png")}
                            style={styles.optionImage}
                            resizeMode="contain"
                        />
                    </LinearGradient>
                </ScrollView>

                <View style={styles.sectionHeaderAlt}>
                    <Text style={styles.sectionTitle}>Today's Performance</Text>
                </View>

                <View style={styles.performanceCard}>
                    <View style={styles.performanceItem}>
                        <Ionicons name="person-outline" size={18} color={PRIMARY_BLUE} />
                        <Text style={styles.performanceValue}>100%</Text>
                        <Text style={styles.performanceLabel}>Uptime</Text>
                    </View>
                    <View style={styles.performanceItem}>
                        <Ionicons name="share-social-outline" size={18} color={PRIMARY_BLUE} />
                        <Text style={styles.performanceValue}>20GB</Text>
                        <Text style={styles.performanceLabel}>Data{"\n"}Shared</Text>
                    </View>
                    <View style={styles.performanceItem}>
                        <Ionicons name="people-outline" size={18} color={PRIMARY_BLUE} />
                        <Text style={styles.performanceValue}>15</Text>
                        <Text style={styles.performanceLabel}>Users</Text>
                    </View>
                    <View style={styles.performanceItem}>
                        <Text style={styles.performanceCurrency}>₦</Text>
                        <Text style={styles.performanceValue}>10.2k</Text>
                        <Text style={styles.performanceLabel}>Earned</Text>
                    </View>
                </View>

                <View style={styles.sectionHeaderAlt}>
                    <Text style={styles.sectionTitle}>Rewards & Offers</Text>
                </View>

                <LinearGradient
                    colors={["#7C3AED", "#EC4899"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.offerCard}
                >
                    <View style={styles.offerTextWrap}>
                        <Text style={styles.offerTitle}>Refer Friends & Earn</Text>
                        <Text style={styles.offerSubtitle}>
                            Get 500NGN for each referral
                        </Text>
                    </View>
                    <View style={styles.offerIconWrap}>
                        <Ionicons name="gift-outline" size={26} color="#FFFFFF" />
                    </View>
                </LinearGradient>
            </ScrollView>

            <View style={styles.navBar}>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate("HostHome")}
                >
                    <Ionicons name="home" size={22} color={PRIMARY_BLUE} />
                    <Text style={[styles.navLabel, styles.navLabelActive]}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate("HostDashboard")}
                >
                    <Ionicons name="grid" size={22} color="#9CA3AF" />
                    <Text style={styles.navLabel}>Dashboard</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate("Rewards")}
                >
                    <Ionicons name="gift-outline" size={22} color="#9CA3AF" />
                    <Text style={styles.navLabel}>Rewards</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate("HostProfile")}
                >
                    <Ionicons name="person-outline" size={22} color="#9CA3AF" />
                    <Text style={styles.navLabel}>Profile</Text>
                </TouchableOpacity>
            </View>
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
    walletButtonPressed: { backgroundColor: "#DBEAFE" },
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
    sectionHeaderAlt: {
        marginHorizontal: 20,
        marginTop: 18,
    },
    sectionTitle: { fontSize: 18, fontWeight: "700" },
    seeMore: { flexDirection: "row", alignItems: "center", gap: 2 },
    link: { color: "#000", fontWeight: "500", fontSize: 14 },

    hotspotRow: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 4, gap: 12 },
    hotspotCard: {
        width: 280,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        padding: 18,
    },
    hotspotTopRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    hotspotNameRow: { flexDirection: "row", alignItems: "center", gap: 6 },
    hotspotName: { fontSize: 14, fontWeight: "800", color: "#111" },
    onlineDot: {
        width: 7,
        height: 7,
        borderRadius: 3.5,
        backgroundColor: "#22C55E",
        marginTop: 2,
    },
    hotspotLoc: { marginTop: 2, fontSize: 12, color: "#6B7280", fontWeight: "600" },
    badge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#DCFCE7",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        gap: 4,
    },
    badgeIcon: { marginTop: 1 },
    badgeText: { color: "#16A34A", fontWeight: "800", fontSize: 12 },
    hotspotMeta: { marginTop: 10, fontSize: 12, color: "#374151", fontWeight: "600" },
    hotspotUptime: { fontWeight: "900", color: "#111" },
    hotspotBottomRow: {
        marginTop: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    manageBtn: {
        backgroundColor: PRIMARY_BLUE,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    manageBtnPressed: { backgroundColor: PRIMARY_BLUE_PRESSED },
    manageText: { color: "#fff", fontWeight: "800", fontSize: 13 },

    performanceCard: {
        marginHorizontal: 20,
        marginTop: 10,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        paddingVertical: 18,
        paddingHorizontal: 14,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    performanceItem: {
        alignItems: "center",
        justifyContent: "center",
        width: "25%",
        gap: 4,
    },
    performanceValue: {
        marginTop: 4,
        fontSize: 16,
        fontWeight: "900",
        color: "#111",
    },
    performanceLabel: {
        fontSize: 10,
        fontWeight: "700",
        color: "#6B7280",
        textAlign: "center",
        lineHeight: 12,
    },
    performanceCurrency: {
        fontSize: 16,
        fontWeight: "900",
        color: PRIMARY_BLUE,
        marginBottom: 2,
    },

    offerCard: {
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 12,
        paddingVertical: 20,
        paddingHorizontal: 18,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    offerTextWrap: {
        flex: 1,
        paddingRight: 12,
    },
    offerTitle: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "900",
    },
    offerSubtitle: {
        marginTop: 4,
        color: "rgba(255,255,255,0.9)",
        fontSize: 11,
        fontWeight: "700",
    },
    offerIconWrap: {
        width: 46,
        height: 46,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.35)",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.12)",
    },

    optionsContainer: { marginLeft: 20, marginTop: 18 },
    optionsText: { fontSize: 18, fontWeight: "700", color: "#000" },
    optionsRow: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 20, gap: 12 },
    optionCard: {
        width: 270,
        backgroundColor: PRIMARY_BLUE,
        borderRadius: 14,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    optionContent: {
        flex: 1,
        paddingRight: 10,
    },
    optionTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#FFFFFF",
        lineHeight: 22,
    },
    optionSubtitle: {
        marginTop: 8,
        fontSize: 12,
        fontWeight: "600",
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
    optionImage: {
        width: 110,
        height: 96,
    },

    navBar: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 78,
        paddingBottom: 10,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#EEF2F7",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    navItem: { alignItems: "center", justifyContent: "center" },
    navLabel: { marginTop: 4, fontSize: 10, color: "#9CA3AF", fontWeight: "700" },
    navLabelActive: { color: PRIMARY_BLUE },
});

export default HostHome;
