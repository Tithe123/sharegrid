import React, { useEffect, useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Pressable,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";

const PRIMARY_BLUE = "#2563EB";
const PRIMARY_BLUE_PRESSED = "#3B82F6";
const NAV_HEIGHT = 80;

const Rewards = () => {
    const navigation = useNavigation();
    const [showInfoModal, setShowInfoModal] = useState(false);

    useEffect(() => {
        setShowInfoModal(true);
    }, []);

    const patternIcons = useMemo(
        () => [
            { name: "cash-outline", top: 20, left: 18, size: 38 },
            { name: "stats-chart-outline", top: 28, right: 18, size: 40 },
            { name: "wallet-outline", top: 74, left: 130, size: 42 },
            { name: "gift-outline", top: 98, right: 120, size: 38 },
            { name: "pie-chart-outline", top: 120, left: 44, size: 36 },
            { name: "card-outline", top: 136, right: 34, size: 40 },
            { name: "document-text-outline", top: 156, left: 210, size: 34 },
        ],
        []
    );

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.headerWrap}>
                    <LinearGradient
                        colors={["#2C67F5", PRIMARY_BLUE]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.header}
                    >
                        <View style={styles.patternLayer}>
                            {patternIcons.map((p, idx) => (
                                <Ionicons
                                    key={idx}
                                    name={p.name}
                                    size={p.size}
                                    color="rgba(255,255,255,0.12)"
                                    style={{
                                        position: "absolute",
                                        top: p.top,
                                        left: p.left,
                                        right: p.right,
                                    }}
                                />
                            ))}
                        </View>

                        <View style={styles.headerTopRow}>
                            <Text style={styles.headerTitle}>Rewards</Text>
                            <TouchableOpacity style={styles.infoBtn} hitSlop={10}>
                                <Ionicons name="information-circle-outline" size={22} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.overallLabel}>Overall Points</Text>
                        <Text style={styles.pointsValue}>4,334.00</Text>

                        <View style={styles.rankRow}>
                            <Ionicons name="arrow-up" size={14} color="#22C55E" />
                            <Text style={styles.rankText}>You’re 135 overall</Text>
                        </View>
                    </LinearGradient>
                </View>

                <View style={styles.content}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recent Earnings</Text>
                        <TouchableOpacity
                            style={styles.seeMore}
                            onPress={() =>
                                navigation.navigate("EarningsBreakdown", {
                                    initialTab: "Host",
                                    hostHasEarnings: true,
                                })
                            }
                        >
                            <Text style={styles.seeMoreText}>See More</Text>
                            <Ionicons name="chevron-forward" size={18} color="#111" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.earningCard}>
                        <View style={styles.earningLeft}>
                            <Text style={styles.earningTitle}>Data Purchased</Text>
                            <Text style={styles.earningSub}>15GB purchased this month</Text>
                        </View>
                        <Text style={styles.earningPts}>+75 pts</Text>
                    </View>

                    <View style={styles.earningCard}>
                        <View style={styles.earningLeft}>
                            <Text style={styles.earningTitle}>Host Uptime Bonus</Text>
                            <Text style={styles.earningSub}>10hrs online today</Text>
                            <View style={styles.bonusPill}>
                                <Text style={styles.bonusPillText}>2x Speed Bonus</Text>
                            </View>
                        </View>
                        <Text style={styles.earningPts}>+40 pts</Text>
                    </View>

                    <View style={styles.earningCard}>
                        <View style={styles.earningLeft}>
                            <Text style={styles.earningTitle}>Referral Bonus</Text>
                            <Text style={styles.earningSub}>2 successful referrals</Text>
                        </View>
                        <Text style={styles.earningPts}>+40 pts</Text>
                    </View>

                    <View style={styles.sectionHeaderAlt}>
                        <Text style={styles.sectionTitle}>Overall Leaderboard</Text>
                        <TouchableOpacity
                            style={styles.seeMore}
                            onPress={() => navigation.navigate("Leaderboards")}
                        >
                            <Text style={styles.seeMoreText}>See More</Text>
                            <Ionicons name="chevron-forward" size={18} color="#111" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.leaderRow}
                    >
                        {[
                            { rank: "#1", name: "Alex Oxlade", pts: "15,237" },
                            { rank: "#2", name: "Daniel Gu...", pts: "15,209" },
                            { rank: "#3", name: "Daniel Gu...", pts: "15,209" },
                            { rank: "#4", name: "Daniel G...", pts: "15,209" },
                        ].map((u) => (
                            <View key={u.rank} style={styles.leaderCard}>
                                <Image
                                    source={require("../../assets/illustration 1.png")}
                                    style={styles.avatar}
                                />
                                <Text style={styles.leaderRank}>{u.rank}</Text>
                                <Text style={styles.leaderName}>{u.name}</Text>
                                <Text style={styles.leaderPts}>{u.pts}</Text>
                                <Text style={styles.leaderPtsLabel}>pts</Text>
                            </View>
                        ))}
                    </ScrollView>

                    <View style={styles.infoCard}>
                        <View style={styles.infoLeft}>
                            <Text style={styles.infoTitle}>Auto-Conversion Info</Text>
                        </View>
                        <Pressable style={styles.infoRight}>
                            <Ionicons name="information-circle-outline" size={22} color={PRIMARY_BLUE} />
                        </Pressable>
                    </View>
                </View>
            </ScrollView>

            <Modal
                isVisible={showInfoModal}
                onBackdropPress={() => setShowInfoModal(false)}
                onBackButtonPress={() => setShowInfoModal(false)}
                backdropOpacity={1}
                backdropColor="transparent"
                customBackdrop={
                    <View style={styles.backdropWrap}>
                        <View style={styles.backdropDim} />
                        <View style={styles.backdropNavFill}>
                            <View style={styles.modalNavBar}>
                                <TouchableOpacity
                                    style={styles.navItem}
                                    onPress={() => navigation.navigate("HostHome")}
                                >
                                    <Ionicons name="home-outline" size={22} color="#9CA3AF" />
                                    <Text style={styles.navLabel}>Home</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.navItem}
                                    onPress={() => navigation.navigate("HostDashboard")}
                                >
                                    <Ionicons name="grid-outline" size={22} color="#9CA3AF" />
                                    <Text style={styles.navLabel}>Dashboard</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.navItem}>
                                    <Ionicons
                                        name="gift-outline"
                                        size={22}
                                        color={PRIMARY_BLUE}
                                    />
                                    <Text style={[styles.navLabel, styles.navLabelActive]}>
                                        Rewards
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.navItem}
                                    onPress={() => navigation.navigate("HostProfile")}
                                >
                                    <Ionicons
                                        name="person-outline"
                                        size={22}
                                        color="#9CA3AF"
                                    />
                                    <Text style={styles.navLabel}>Profile</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }
                style={styles.modalWrap}
                useNativeDriver
                hideModalContentWhileAnimating
            >
                <View style={styles.modalCard}>
                    <Text style={styles.modalTitle}>Rewards System</Text>

                    <View style={styles.modalBulletRow}>
                        <View style={styles.modalDot} />
                        <Text style={styles.modalText}>
                            Earn points by using the network, hosting and{"\n"}
                            referring friends.
                        </Text>
                    </View>

                    <View style={styles.modalBulletRow}>
                        <View style={styles.modalDot} />
                        <Text style={styles.modalText}>
                            Points convert to <Text style={styles.modalBold}>$$GRID</Text> tokens at Token{"\n"}
                            Generation Event (TGE)
                        </Text>
                    </View>

                    <View style={styles.modalBulletRow}>
                        <View style={styles.modalDot} />
                        <Text style={styles.modalText}>
                            Climb the leaderboard as you earn points from{"\n"}
                            various means.
                        </Text>
                    </View>

                    <Pressable
                        onPress={() => setShowInfoModal(false)}
                        style={({ pressed }) => [
                            styles.modalBtn,
                            pressed && styles.modalBtnPressed,
                        ]}
                    >
                        <Text style={styles.modalBtnText}>Got It!</Text>
                    </Pressable>
                </View>
            </Modal>

            {!showInfoModal ? (
                <View style={styles.navBar}>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate("HostHome")}
                >
                    <Ionicons name="home-outline" size={22} color="#9CA3AF" />
                    <Text style={styles.navLabel}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate("HostDashboard")}
                >
                    <Ionicons name="grid-outline" size={22} color="#9CA3AF" />
                    <Text style={styles.navLabel}>Dashboard</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="gift-outline" size={22} color={PRIMARY_BLUE} />
                    <Text style={[styles.navLabel, styles.navLabelActive]}>Rewards</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate("HostProfile")}
                >
                    <Ionicons name="person-outline" size={22} color="#9CA3AF" />
                    <Text style={styles.navLabel}>Profile</Text>
                </TouchableOpacity>
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFFFFF" },
    scroll: { paddingBottom: 100 },

    headerWrap: {
        backgroundColor: "#FFFFFF",
    },
    header: {
        paddingTop: 70,
        paddingHorizontal: 20,
        paddingBottom: 26,
    },
    patternLayer: {
        ...StyleSheet.absoluteFillObject,
    },
    headerTopRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "900",
        color: "#FFFFFF",
    },
    infoBtn: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.16)",
    },
    overallLabel: {
        marginTop: 16,
        fontSize: 14,
        fontWeight: "700",
        color: "rgba(255,255,255,0.88)",
    },
    pointsValue: {
        marginTop: 8,
        fontSize: 36,
        fontWeight: "900",
        color: "#FFFFFF",
    },
    rankRow: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    rankText: {
        fontSize: 13,
        fontWeight: "800",
        color: "rgba(255,255,255,0.9)",
    },

    content: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -18,
        paddingTop: 18,
        paddingHorizontal: 20,
        paddingBottom: 30,
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 6,
    },
    sectionHeaderAlt: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 18,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "900",
        color: "#111",
    },
    seeMore: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
    seeMoreText: {
        fontSize: 13,
        fontWeight: "800",
        color: "#111",
    },

    earningCard: {
        marginTop: 14,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E8F0FF",
        backgroundColor: "#FFFFFF",
        paddingVertical: 16,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    earningLeft: {
        flex: 1,
        paddingRight: 12,
    },
    earningTitle: {
        fontSize: 14,
        fontWeight: "900",
        color: "#111",
    },
    earningSub: {
        marginTop: 4,
        fontSize: 12,
        fontWeight: "700",
        color: "#6B7280",
    },
    earningPts: {
        fontSize: 16,
        fontWeight: "900",
        color: "#22C55E",
    },
    bonusPill: {
        marginTop: 10,
        alignSelf: "flex-start",
        backgroundColor: "#EAF2FF",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
    },
    bonusPillText: {
        color: PRIMARY_BLUE,
        fontSize: 12,
        fontWeight: "900",
    },

    leaderRow: {
        paddingVertical: 14,
        gap: 12,
        paddingRight: 20,
    },
    leaderCard: {
        width: 120,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        backgroundColor: "#FFFFFF",
        paddingVertical: 14,
        paddingHorizontal: 12,
        alignItems: "center",
    },
    avatar: {
        width: 46,
        height: 46,
        borderRadius: 23,
        marginBottom: 10,
    },
    leaderRank: {
        position: "absolute",
        top: 12,
        left: 12,
        fontSize: 10,
        fontWeight: "900",
        color: "#111",
        backgroundColor: "rgba(255,255,255,0.92)",
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 8,
        overflow: "hidden",
    },
    leaderName: {
        marginTop: 2,
        fontSize: 12,
        fontWeight: "900",
        color: "#111",
        textAlign: "center",
    },
    leaderPts: {
        marginTop: 6,
        fontSize: 14,
        fontWeight: "900",
        color: PRIMARY_BLUE,
    },
    leaderPtsLabel: {
        marginTop: 2,
        fontSize: 11,
        fontWeight: "800",
        color: "#6B7280",
    },

    infoCard: {
        marginTop: 18,
        borderRadius: 16,
        backgroundColor: "#EEF4FF",
        paddingVertical: 16,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    infoLeft: { flex: 1 },
    infoTitle: {
        fontSize: 14,
        fontWeight: "900",
        color: "#111",
    },
    infoRight: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.7)",
    },

    modalWrap: {
        margin: 0,
        justifyContent: "flex-end",
        paddingBottom: NAV_HEIGHT,
    },
    backdropWrap: {
        flex: 1,
    },
    backdropDim: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.35)",
    },
    backdropNavFill: {
        height: NAV_HEIGHT,
        backgroundColor: "#FFFFFF",
    },
    modalNavBar: {
        height: NAV_HEIGHT,
        borderTopWidth: 1,
        borderTopColor: "#EEF2F7",
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingBottom: 10,
    },
    modalCard: {
        backgroundColor: "#FFFFFF",
        paddingTop: 26,
        paddingBottom: 22,
        paddingHorizontal: 22,
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
    },
    modalTitle: {
        textAlign: "center",
        fontSize: 22,
        fontWeight: "900",
        color: "#111",
    },
    modalBulletRow: {
        marginTop: 18,
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
    },
    modalDot: {
        width: 9,
        height: 9,
        borderRadius: 4.5,
        backgroundColor: PRIMARY_BLUE,
        marginTop: 6,
    },
    modalText: {
        flex: 1,
        fontSize: 14,
        fontWeight: "700",
        color: "#111",
        lineHeight: 20,
    },
    modalBold: {
        fontWeight: "900",
        color: "#111",
    },
    modalBtn: {
        marginTop: 20,
        height: 56,
        borderRadius: 12,
        backgroundColor: PRIMARY_BLUE,
        alignItems: "center",
        justifyContent: "center",
    },
    modalBtnPressed: {
        backgroundColor: PRIMARY_BLUE_PRESSED,
    },
    modalBtnText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "900",
    },

    navBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: NAV_HEIGHT,
        borderTopWidth: 1,
        borderTopColor: "#EEF2F7",
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingBottom: 10,
    },
    navItem: {
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
    },
    navLabel: {
        fontSize: 11,
        fontWeight: "700",
        color: "#9CA3AF",
    },
    navLabelActive: {
        color: PRIMARY_BLUE,
    },
});

export default Rewards;
