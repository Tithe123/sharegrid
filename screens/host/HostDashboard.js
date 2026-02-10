import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PRIMARY_BLUE = "#2563EB";
const PRIMARY_BLUE_PRESSED = "#3B82F6";

const HostDashboard = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.overviewCard}>
                    <View style={styles.overviewTopRow}>
                        <Text style={styles.overviewTitle}>Network Overview</Text>
                        <Ionicons name="wifi" size={18} color="#fff" />
                    </View>

                    <View style={styles.overviewStatsRow}>
                        <View style={styles.overviewStatItem}>
                            <Text style={styles.overviewValue}>5</Text>
                            <Text style={styles.overviewLabel}>Total Hotspots</Text>
                        </View>
                        <View style={styles.overviewStatItem}>
                            <Text style={styles.overviewValue}>4</Text>
                            <Text style={styles.overviewLabel}>Active</Text>
                        </View>
                        <View style={styles.overviewStatItem}>
                            <Text style={styles.overviewValue}>96%</Text>
                            <Text style={styles.overviewLabel}>Avg Uptime</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.list}>
                    <View style={styles.hotspotItem}>
                        <View style={styles.hotspotHeaderRow}>
                            <View>
                                <View style={styles.hotspotNameRow}>
                                    <Text style={styles.hotspotName}>Ibeju Initiative</Text>
                                    <View style={styles.onlineDot} />
                                </View>
                                <Text style={styles.hotspotLoc}>Ibeju Lekki</Text>
                            </View>

                            <View style={styles.badgeHigh}>
                                <Ionicons
                                    name="triangle"
                                    size={12}
                                    color="#22C55E"
                                    style={styles.badgeIcon}
                                />
                                <Text style={styles.badgeTextHigh}>High</Text>
                            </View>
                        </View>

                        <View style={styles.hotspotMetaRow}>
                            <Text style={styles.hotspotMeta}>Uptime: 98%</Text>
                            <Text style={styles.hotspotMeta}>
                                12 Users today · 5.4GB Spent
                            </Text>
                        </View>

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

                    <View style={styles.hotspotItem}>
                        <View style={styles.hotspotHeaderRow}>
                            <View>
                                <View style={styles.hotspotNameRow}>
                                    <Text style={styles.hotspotName}>Ikeja Computer Hub</Text>
                                    <View style={styles.onlineDot} />
                                </View>
                                <Text style={styles.hotspotLoc}>LSDPC Street, Ogba</Text>
                            </View>

                            <View style={styles.badgeHigh}>
                                <Ionicons
                                    name="triangle"
                                    size={12}
                                    color="#22C55E"
                                    style={styles.badgeIcon}
                                />
                                <Text style={styles.badgeTextHigh}>High</Text>
                            </View>
                        </View>

                        <View style={styles.hotspotMetaRow}>
                            <Text style={styles.hotspotMeta}>Uptime: 98%</Text>
                            <Text style={styles.hotspotMeta}>
                                12 Users today · 5.4GB Spent
                            </Text>
                        </View>

                        <Pressable
                            style={({ pressed }) => [
                                styles.manageBtn,
                                pressed && styles.manageBtnPressed,
                            ]}
                            onPress={() =>
                                navigation.navigate("HostHotspotManage", {
                                    hotspotName: "Ikeja Computer Hub",
                                    qualityLevel: "High",
                                    qualityVariant: "green",
                                })
                            }
                        >
                            <Text style={styles.manageText}>Manage</Text>
                        </Pressable>
                    </View>

                    <View style={styles.hotspotItem}>
                        <View style={styles.hotspotHeaderRow}>
                            <View>
                                <View style={styles.hotspotNameRow}>
                                    <Text style={styles.hotspotName}>Ibeju Initiative</Text>
                                    <View style={styles.onlineDot} />
                                </View>
                                <Text style={styles.hotspotLoc}>Ibeju Lekki</Text>
                            </View>

                            <View style={styles.badgeMedium}>
                                <Ionicons
                                    name="remove"
                                    size={14}
                                    color="#F59E0B"
                                    style={styles.badgeIcon}
                                />
                                <Text style={styles.badgeTextMedium}>Medium</Text>
                            </View>
                        </View>

                        <View style={styles.hotspotMetaRow}>
                            <Text style={styles.hotspotMeta}>Uptime: 98%</Text>
                            <Text style={styles.hotspotMeta}>
                                12 Users today · 5.4GB Spent
                            </Text>
                        </View>

                        <Pressable
                            style={({ pressed }) => [
                                styles.manageBtn,
                                pressed && styles.manageBtnPressed,
                            ]}
                            onPress={() =>
                                navigation.navigate("HostHotspotManage", {
                                    hotspotName: "Ibeju Initiative",
                                    qualityLevel: "Medium",
                                    qualityVariant: "orange",
                                })
                            }
                        >
                            <Text style={styles.manageText}>Manage</Text>
                        </Pressable>
                    </View>

                    <View style={styles.hotspotItem}>
                        <View style={styles.hotspotHeaderRow}>
                            <View>
                                <View style={styles.hotspotNameRow}>
                                    <Text style={styles.hotspotName}>Ibeju Initiative</Text>
                                    <View style={styles.onlineDot} />
                                </View>
                                <Text style={styles.hotspotLoc}>Ibeju Lekki</Text>
                            </View>

                            <View style={styles.badgeHighRed}>
                                <Ionicons
                                    name="triangle"
                                    size={12}
                                    color="#EF4444"
                                    style={styles.badgeIcon}
                                />
                                <Text style={styles.badgeTextHighRed}>High</Text>
                            </View>
                        </View>

                        <View style={styles.hotspotMetaRow}>
                            <Text style={styles.hotspotMeta}>Uptime: 98%</Text>
                            <Text style={styles.hotspotMeta}>
                                12 Users today · 5.4GB Spent
                            </Text>
                        </View>

                        <Pressable
                            style={({ pressed }) => [
                                styles.manageBtn,
                                pressed && styles.manageBtnPressed,
                            ]}
                            onPress={() =>
                                navigation.navigate("HostHotspotManage", {
                                    hotspotName: "Ibeju Initiative",
                                    qualityLevel: "High",
                                    qualityVariant: "red",
                                    isOnline: false,
                                    timeRangeLabel: "This Week",
                                })
                            }
                        >
                            <Text style={styles.manageText}>Manage</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.navBar}>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate("HostHome")}
                >
                    <Ionicons name="home-outline" size={22} color="#9CA3AF" />
                    <Text style={styles.navLabel}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="grid" size={22} color={PRIMARY_BLUE} />
                    <Text style={[styles.navLabel, styles.navLabelActive]}>Dashboard</Text>
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
    scroll: { paddingBottom: 110, paddingTop: 55 },

    overviewCard: {
        marginHorizontal: 20,
        marginTop: 0,
        borderRadius: 16,
        backgroundColor: PRIMARY_BLUE,
        padding: 20,
    },
    overviewTopRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    overviewTitle: {
        color: "rgba(255,255,255,0.92)",
        fontSize: 12,
        fontWeight: "700",
    },
    overviewStatsRow: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    overviewStatItem: {
        width: "33.33%",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
    },
    overviewValue: {
        color: "#FFFFFF",
        fontSize: 22,
        fontWeight: "900",
    },
    overviewLabel: {
        color: "rgba(255,255,255,0.85)",
        fontSize: 10,
        fontWeight: "700",
    },

    list: {
        paddingHorizontal: 20,
        paddingTop: 14,
        gap: 14,
    },
    hotspotItem: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        padding: 18,
    },
    hotspotHeaderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    hotspotNameRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    hotspotName: { fontSize: 14, fontWeight: "900", color: "#111" },
    onlineDot: {
        width: 7,
        height: 7,
        borderRadius: 3.5,
        backgroundColor: "#22C55E",
        marginTop: 2,
    },
    hotspotLoc: {
        marginTop: 2,
        fontSize: 12,
        color: "#6B7280",
        fontWeight: "700",
    },

    badgeHigh: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#DCFCE7",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        gap: 4,
    },
    badgeTextHigh: { color: "#16A34A", fontWeight: "900", fontSize: 12 },

    badgeHighRed: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FEE2E2",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        gap: 4,
    },
    badgeTextHighRed: { color: "#EF4444", fontWeight: "900", fontSize: 12 },

    badgeMedium: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFEDD5",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        gap: 4,
    },
    badgeTextMedium: { color: "#F59E0B", fontWeight: "900", fontSize: 12 },

    badgeIcon: { marginTop: 1 },

    hotspotMetaRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    hotspotMeta: { fontSize: 11, fontWeight: "700", color: "#374151" },

    manageBtn: {
        marginTop: 12,
        height: 44,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: PRIMARY_BLUE,
    },
    manageBtnPressed: {
        backgroundColor: PRIMARY_BLUE_PRESSED,
    },
    manageText: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "900",
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

export default HostDashboard;
