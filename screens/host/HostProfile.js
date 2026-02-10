import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Pressable,
    Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const PRIMARY_BLUE = "#2563EB";

export default function HostProfile() {
    const navigation = useNavigation();
    const route = useRoute();

    const [kycStatus, setKycStatus] = useState(route?.params?.kycStatus ?? "verified");
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const kycUi = useMemo(() => {
        if (kycStatus === "pending") {
            return {
                label: "KYC Pending",
                pillStyle: styles.kycPillPending,
                dotStyle: styles.kycDotPending,
                textStyle: styles.kycTextPending,
            };
        }

        if (kycStatus === "failed") {
            return {
                label: "KYC Failed",
                pillStyle: styles.kycPillFailed,
                dotStyle: styles.kycDotFailed,
                textStyle: styles.kycTextFailed,
            };
        }

        return {
            label: "KYC Verified",
            pillStyle: styles.kycPillVerified,
            dotStyle: styles.kycDotVerified,
            textStyle: styles.kycTextVerified,
        };
    }, [kycStatus]);

    const items = [
        { label: "Edit Profile", icon: "person-outline", onPress: () => navigation.navigate("HostEditProfile") },
        {
            label: "Set Up/Manage Hotspot",
            icon: "hardware-chip-outline",
            onPress: () => navigation.navigate("HostSetUpHotspot"),
        },
        { label: "Privacy & Security", icon: "shield-outline", onPress: () => navigation.navigate("HostPrivacySecurity") },
        { label: "Identity Verification (KYC)", icon: "id-card-outline", onPress: () => navigation.navigate("HostIdentityVerificationKyc") },
        {
            label: "Transaction History",
            icon: "time-outline",
            onPress: () => navigation.navigate("HostTransactionHistory"),
        },
        { label: "Help & Support", icon: "chatbubble-ellipses-outline", onPress: () => null },
    ];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.topBg}>
                    <View style={styles.headerRow}>
                        <Text style={styles.headerTitle}>Profile</Text>
                        <View style={styles.headerFill} />
                        <TouchableOpacity hitSlop={10}>
                            <Ionicons name="settings-outline" size={22} color={PRIMARY_BLUE} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.profileBlock}>
                        <View style={styles.avatarOuter}>
                            <View style={styles.avatarRing}>
                                <Image
                                    source={require("../../assets/illustration 1.png")}
                                    style={styles.avatar}
                                />
                            </View>
                        </View>

                        <Text style={styles.name}>Adediwura Ene</Text>
                        <Text style={styles.email}>adediwuraene@gmail.com</Text>

                        <Pressable
                            onLongPress={() =>
                                setKycStatus((s) =>
                                    s === "verified" ? "pending" : s === "pending" ? "failed" : "verified"
                                )
                            }
                            style={[styles.kycPillBase, kycUi.pillStyle]}
                        >
                            <View style={[styles.kycDotBase, kycUi.dotStyle]} />
                            <Text style={[styles.kycTextBase, kycUi.textStyle]}>{kycUi.label}</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.card}>
                    {items.map((it, idx) => (
                        <Pressable
                            key={it.label}
                            onPress={it.onPress}
                            style={({ pressed }) => [
                                styles.row,
                                idx !== items.length - 1 && styles.rowDivider,
                                pressed && styles.rowPressed,
                            ]}
                        >
                            <View style={styles.rowLeft}>
                                <View style={styles.rowIconWrap}>
                                    <Ionicons name={it.icon} size={18} color={PRIMARY_BLUE} />
                                </View>
                                <Text style={styles.rowLabel}>{it.label}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
                        </Pressable>
                    ))}

                    <Pressable
                        onPress={() => setShowLogoutModal(true)}
                        style={({ pressed }) => [
                            styles.row,
                            styles.logoutRow,
                            pressed && styles.rowPressed,
                        ]}
                    >
                        <View style={styles.rowLeft}>
                            <View style={styles.rowIconWrap}>
                                <Ionicons name="log-out-outline" size={18} color="#EF4444" />
                            </View>
                            <Text style={styles.logoutText}>Logout</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#EF4444" />
                    </Pressable>
                </View>
            </ScrollView>

            <Modal
                visible={showLogoutModal}
                transparent
                animationType="slide"
                onRequestClose={() => setShowLogoutModal(false)}
            >
                <View style={styles.logoutOverlay}>
                    <Pressable style={styles.logoutBackdrop} onPress={() => setShowLogoutModal(false)} />

                    <View style={styles.logoutSheet}>
                        <View style={styles.logoutTopRow}>
                            <View style={{ flex: 1 }} />
                            <Pressable
                                onPress={() => setShowLogoutModal(false)}
                                hitSlop={10}
                                style={({ pressed }) => [styles.logoutCloseBtn, pressed && styles.logoutCloseBtnPressed]}
                            >
                                <Ionicons name="close" size={22} color="#111" />
                            </Pressable>
                        </View>

                        <View style={styles.logoutIconWrap}>
                            <View style={styles.logoutIconOuter}>
                                <Text style={styles.logoutQuestion}>?</Text>
                            </View>
                        </View>

                        <Text style={styles.logoutPrompt}>Are you sure you want to logout?</Text>

                        <View style={styles.logoutActions}>
                            <Pressable
                                onPress={() => setShowLogoutModal(false)}
                                style={({ pressed }) => [
                                    styles.logoutCancelBtn,
                                    pressed && styles.logoutCancelBtnPressed,
                                ]}
                            >
                                <Text style={styles.logoutCancelText}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => {
                                    setShowLogoutModal(false);
                                    navigation.navigate("Login");
                                }}
                                style={({ pressed }) => [
                                    styles.logoutYesBtn,
                                    pressed && styles.logoutYesBtnPressed,
                                ]}
                            >
                                <Text style={styles.logoutYesText}>Yes</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

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

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate("Rewards")}
                >
                    <Ionicons name="gift-outline" size={22} color="#9CA3AF" />
                    <Text style={styles.navLabel}>Rewards</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="person-outline" size={22} color={PRIMARY_BLUE} />
                    <Text style={[styles.navLabel, styles.navLabelActive]}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFFFFF" },
    scroll: { paddingBottom: 120 },

    topBg: {
        paddingTop: 76,
        paddingHorizontal: 16,
        paddingBottom: 18,
        backgroundColor: "#F5FAFF",
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    headerTitle: { fontSize: 20, fontWeight: "900", color: PRIMARY_BLUE },
    headerFill: { flex: 1 },

    profileBlock: { alignItems: "center", paddingTop: 14, paddingBottom: 6 },
    avatarOuter: {
        width: 96,
        height: 96,
        borderRadius: 48,
        alignItems: "center",
        justifyContent: "center",
    },
    avatarRing: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 4,
        borderColor: PRIMARY_BLUE,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
    },
    avatar: { width: 74, height: 74, borderRadius: 37 },

    name: { marginTop: 10, fontSize: 28, fontWeight: "900", color: PRIMARY_BLUE },
    email: { marginTop: 2, fontSize: 14, fontWeight: "700", color: PRIMARY_BLUE },

    kycPillBase: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
    },
    kycPillVerified: { backgroundColor: "#DFFFE6" },
    kycPillPending: { backgroundColor: "#FFF7ED" },
    kycPillFailed: { backgroundColor: "#FEE2E2" },

    kycDotBase: { width: 8, height: 8, borderRadius: 4 },
    kycDotVerified: { backgroundColor: "#22C55E" },
    kycDotPending: { backgroundColor: "#F59E0B" },
    kycDotFailed: { backgroundColor: "#EF4444" },

    kycTextBase: { fontSize: 13, fontWeight: "900" },
    kycTextVerified: { color: "#16A34A" },
    kycTextPending: { color: "#F59E0B" },
    kycTextFailed: { color: "#EF4444" },

    card: {
        marginTop: 18,
        marginHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
    },
    row: {
        paddingHorizontal: 14,
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
    },
    rowDivider: { borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
    rowPressed: { backgroundColor: "#F8FAFC" },
    rowLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
    rowIconWrap: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    rowLabel: { fontSize: 14, fontWeight: "800", color: "#111" },

    logoutRow: {},
    logoutText: { fontSize: 14, fontWeight: "900", color: "#EF4444" },

    navBar: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 96,
        borderTopWidth: 1,
        borderTopColor: "#EEF2F7",
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingBottom: 26,
    },
    navItem: { alignItems: "center", gap: 4 },
    navLabel: { fontSize: 11, fontWeight: "700", color: "#9CA3AF" },
    navLabelActive: { color: PRIMARY_BLUE },

    logoutOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.25)",
    },
    logoutBackdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    logoutSheet: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 20,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        alignItems: "center",
    },
    logoutTopRow: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    logoutCloseBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
    },
    logoutCloseBtnPressed: { backgroundColor: "#F8FAFC" },

    logoutIconWrap: { marginTop: 6, marginBottom: 14 },
    logoutIconOuter: {
        width: 92,
        height: 92,
        borderRadius: 46,
        borderWidth: 4,
        borderColor: "#EF4444",
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
    },
    logoutQuestion: {
        fontSize: 44,
        fontWeight: "900",
        color: "#EF4444",
        marginTop: -2,
    },
    logoutPrompt: {
        fontSize: 14,
        fontWeight: "800",
        color: "#6B7280",
        textAlign: "center",
        marginBottom: 16,
    },
    logoutActions: {
        width: "100%",
        flexDirection: "row",
        gap: 12,
    },
    logoutCancelBtn: {
        flex: 1,
        height: 48,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: "#EF4444",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
    },
    logoutCancelBtnPressed: { backgroundColor: "#FEF2F2" },
    logoutCancelText: { fontSize: 13, fontWeight: "900", color: "#EF4444" },
    logoutYesBtn: {
        flex: 1,
        height: 48,
        borderRadius: 10,
        backgroundColor: "#EF4444",
        alignItems: "center",
        justifyContent: "center",
    },
    logoutYesBtnPressed: { opacity: 0.92 },
    logoutYesText: { fontSize: 13, fontWeight: "900", color: "#FFFFFF" },
});
