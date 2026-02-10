import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Pressable,
    Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PRIMARY_BLUE = "#2563EB";

const UserTransactionHistory = () => {
    const navigation = useNavigation();
    const [category, setCategory] = useState("All Category");
    const [status, setStatus] = useState("All Status");
    const [openMenu, setOpenMenu] = useState(null);

    const transactions = useMemo(
        () => [
            {
                id: "t1",
                type: "debit",
                title: "WiFi Purchase",
                subtitle: "LTE-WIFI_Airtel2.4G_8002",
                amount: "- NGN 800",
                time: "Today · 9:20 AM",
                status: "Completed",
                icon: "wifi",
            },
            {
                id: "t2",
                type: "credit",
                title: "Referral Bonus",
                subtitle: "Invite reward",
                amount: "+ NGN 500",
                time: "Yesterday · 6:11 PM",
                status: "Completed",
                icon: "gift",
            },
            {
                id: "t3",
                type: "debit",
                title: "Wallet Withdrawal",
                subtitle: "Bank transfer",
                amount: "- NGN 2,000",
                time: "Feb 08 · 2:45 PM",
                status: "Pending",
                icon: "wallet",
            },
            {
                id: "t4",
                type: "credit",
                title: "Wallet Top-up",
                subtitle: "Card payment",
                amount: "+ NGN 5,000",
                time: "Feb 06 · 1:02 PM",
                status: "Completed",
                icon: "card",
            },
        ],
        []
    );

    const filtered = useMemo(() => {
        let list = transactions;

        if (category === "Credits") list = list.filter((t) => t.type === "credit");
        if (category === "Debits") list = list.filter((t) => t.type === "debit");

        if (status === "Completed") list = list.filter((t) => t.status === "Completed");
        if (status === "Pending") list = list.filter((t) => t.status === "Pending");

        return list;
    }, [category, status, transactions]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backBtn}
                    hitSlop={10}
                >
                    <Ionicons name="chevron-back" size={26} color="#111" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Transaction History</Text>
                <View style={styles.headerRight} />
            </View>

            <View style={styles.dropdownsRow}>
                <Pressable
                    onPress={() => setOpenMenu("category")}
                    style={({ pressed }) => [
                        styles.dropdownBtn,
                        pressed && styles.dropdownBtnPressed,
                    ]}
                >
                    <Text style={styles.dropdownText}>{category}</Text>
                    <Ionicons name="chevron-down" size={16} color="#475569" />
                </Pressable>

                <Pressable
                    onPress={() => setOpenMenu("status")}
                    style={({ pressed }) => [
                        styles.dropdownBtn,
                        pressed && styles.dropdownBtnPressed,
                    ]}
                >
                    <Text style={styles.dropdownText}>{status}</Text>
                    <Ionicons name="chevron-down" size={16} color="#475569" />
                </Pressable>
            </View>

            <Modal
                visible={Boolean(openMenu)}
                transparent
                animationType="fade"
                onRequestClose={() => setOpenMenu(null)}
            >
                <Pressable style={styles.menuOverlay} onPress={() => setOpenMenu(null)}>
                    <Pressable style={styles.menuCard} onPress={() => null}>
                        {(openMenu === "category"
                            ? ["All Category", "Credits", "Debits"]
                            : ["All Status", "Completed", "Pending"]
                        ).map((item) => {
                            const isActive = openMenu === "category" ? category === item : status === item;
                            return (
                                <Pressable
                                    key={item}
                                    onPress={() => {
                                        if (openMenu === "category") setCategory(item);
                                        if (openMenu === "status") setStatus(item);
                                        setOpenMenu(null);
                                    }}
                                    style={({ pressed }) => [
                                        styles.menuItem,
                                        isActive && styles.menuItemActive,
                                        pressed && styles.menuItemPressed,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.menuItemText,
                                            isActive && styles.menuItemTextActive,
                                        ]}
                                    >
                                        {item}
                                    </Text>
                                    {isActive ? (
                                        <Ionicons name="checkmark" size={18} color={PRIMARY_BLUE} />
                                    ) : null}
                                </Pressable>
                            );
                        })}
                    </Pressable>
                </Pressable>
            </Modal>

            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.summaryRow}>
                    <View style={styles.summaryCard}>
                        <Text style={styles.summaryLabel}>This Month</Text>
                        <Text style={styles.summaryValue}>NGN 12,450</Text>
                    </View>
                    <View style={styles.summaryCard}>
                        <Text style={styles.summaryLabel}>Transactions</Text>
                        <Text style={styles.summaryValue}>{filtered.length}</Text>
                    </View>
                </View>

                <View style={styles.listCard}>
                    {filtered.map((t, idx) => (
                        <View
                            key={t.id}
                            style={[styles.row, idx !== filtered.length - 1 && styles.rowDivider]}
                        >
                            <View
                                style={[
                                    styles.iconWrap,
                                    t.type === "credit" ? styles.iconWrapCredit : styles.iconWrapDebit,
                                ]}
                            >
                                <Ionicons name={t.icon} size={18} color="#fff" />
                            </View>

                            <View style={styles.rowMain}>
                                <View style={styles.rowTop}>
                                    <Text style={styles.rowTitle} numberOfLines={1}>
                                        {t.title}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.amount,
                                            t.type === "credit" ? styles.amountCredit : styles.amountDebit,
                                        ]}
                                    >
                                        {t.amount}
                                    </Text>
                                </View>

                                <View style={styles.rowMid}>
                                    <Text style={styles.rowSubtitle} numberOfLines={1}>
                                        {t.subtitle}
                                    </Text>
                                    <View
                                        style={[
                                            styles.statusPill,
                                            t.status === "Completed"
                                                ? styles.statusPillDone
                                                : styles.statusPillPending,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.statusText,
                                                t.status === "Completed"
                                                    ? styles.statusTextDone
                                                    : styles.statusTextPending,
                                            ]}
                                        >
                                            {t.status}
                                        </Text>
                                    </View>
                                </View>

                                <Text style={styles.timeText}>{t.time}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFFFFF" },
    header: {
        paddingTop: 70,
        paddingBottom: 12,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#EEF2F7",
        backgroundColor: "#FFFFFF",
    },
    backBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: { fontSize: 18, fontWeight: "900", color: "#111" },
    headerRight: { width: 38, height: 38 },

    dropdownsRow: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 6,
        flexDirection: "row",
        gap: 10,
    },
    dropdownBtn: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    dropdownBtnPressed: {
        backgroundColor: "#F8FAFC",
    },
    dropdownText: {
        fontSize: 12,
        fontWeight: "900",
        color: "#111",
    },
    menuOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.25)",
        paddingHorizontal: 16,
        justifyContent: "flex-start",
        paddingTop: 140,
    },
    menuCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        overflow: "hidden",
    },
    menuItem: {
        paddingHorizontal: 14,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    menuItemActive: {
        backgroundColor: "#EFF6FF",
    },
    menuItemPressed: {
        backgroundColor: "#F8FAFC",
    },
    menuItemText: {
        fontSize: 12,
        fontWeight: "900",
        color: "#111",
    },
    menuItemTextActive: {
        color: PRIMARY_BLUE,
    },

    scroll: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 24 },

    summaryRow: { flexDirection: "row", gap: 12 },
    summaryCard: {
        flex: 1,
        padding: 14,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        backgroundColor: "#FFFFFF",
    },
    summaryLabel: { fontSize: 11, fontWeight: "800", color: "#64748B" },
    summaryValue: { marginTop: 6, fontSize: 16, fontWeight: "900", color: "#111" },

    listCard: {
        marginTop: 12,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
    },
    row: {
        flexDirection: "row",
        gap: 12,
        paddingHorizontal: 14,
        paddingVertical: 14,
    },
    rowDivider: { borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },

    iconWrap: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
    },
    iconWrapCredit: { backgroundColor: "#22C55E" },
    iconWrapDebit: { backgroundColor: PRIMARY_BLUE },

    rowMain: { flex: 1 },
    rowTop: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },
    rowTitle: { flex: 1, fontSize: 13, fontWeight: "900", color: "#111" },
    amount: { fontSize: 13, fontWeight: "900" },
    amountCredit: { color: "#16A34A" },
    amountDebit: { color: "#111" },

    rowMid: {
        marginTop: 6,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },
    rowSubtitle: { flex: 1, fontSize: 12, fontWeight: "700", color: "#475569" },

    statusPill: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        borderWidth: 1,
    },
    statusPillDone: { backgroundColor: "#ECFDF5", borderColor: "#A7F3D0" },
    statusPillPending: { backgroundColor: "#FFF7ED", borderColor: "#FED7AA" },
    statusText: { fontSize: 11, fontWeight: "900" },
    statusTextDone: { color: "#16A34A" },
    statusTextPending: { color: "#C2410C" },

    timeText: { marginTop: 6, fontSize: 11, fontWeight: "800", color: "#94A3B8" },
});

export default UserTransactionHistory;
