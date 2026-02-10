import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const PRIMARY_BLUE = "#2563EB";

export default function EarningsBreakdown() {
    const navigation = useNavigation();
    const route = useRoute();
    const initialTab = route?.params?.initialTab ?? "User";
    const [activeTab, setActiveTab] = useState(initialTab);

    const userHasEarnings = route?.params?.userHasEarnings;
    const hostHasEarnings = route?.params?.hostHasEarnings;

    const resolvedUserHasEarnings = userHasEarnings !== undefined ? userHasEarnings : true;
    const resolvedHostHasEarnings = hostHasEarnings !== undefined ? hostHasEarnings : true;

    const userRows = useMemo(
        () =>
            resolvedUserHasEarnings
                ? [
                      { title: "Data Purchased", sub: "15GB purchased this month", pts: "+75" },
                      { title: "Money Spent", sub: "3,000 NGN", pts: "+30" },
                      { title: "Referral Bonus", sub: "2 successful referrals", pts: "+40" },
                      { title: "Money Spent", sub: "3,000 NGN", pts: "+30" },
                      { title: "Data Purchased", sub: "15GB purchased this month", pts: "+75" },
                      { title: "Data Purchased", sub: "15GB purchased this month", pts: "+75" },
                      { title: "Data Purchased", sub: "15GB purchased this month", pts: "+75" },
                  ]
                : [],
        [resolvedUserHasEarnings]
    );

    const hostRows = useMemo(
        () =>
            resolvedHostHasEarnings
                ? [
                      {
                          title: "Uptime Bonus",
                          sub: "10hrs online today",
                          badge: "2x Speed",
                          pts: "+40",
                      },
                      { title: "Referral Bonus", sub: "3 successful referrals", pts: "+60" },
                      {
                          title: "Uptime Bonus",
                          sub: "10hrs online today",
                          badge: "2x Speed",
                          pts: "+40",
                      },
                      { title: "Referral Bonus", sub: "3 successful referrals", pts: "+60" },
                      { title: "Referral Bonus", sub: "3 successful referrals", pts: "+60" },
                      {
                          title: "Uptime Bonus",
                          sub: "10hrs online today",
                          badge: "2x Speed",
                          pts: "+40",
                      },
                      { title: "Referral Bonus", sub: "3 successful referrals", pts: "+60" },
                  ]
                : [],
        [resolvedHostHasEarnings]
    );

    const rows = activeTab === "User" ? userRows : hostRows;
    const isEmpty = rows.length === 0;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={10}>
                    <Ionicons name="chevron-back" size={28} color="#111" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Earnings Breakdown</Text>
                <View style={styles.headerRight} />
            </View>

            <View style={styles.segmentWrap}>
                <View style={styles.segmentBg}>
                    <Pressable
                        onPress={() => setActiveTab("User")}
                        style={({ pressed }) => [
                            styles.segmentBtn,
                            activeTab === "User" && styles.segmentBtnActive,
                            pressed && styles.segmentBtnPressed,
                        ]}
                    >
                        <Text
                            style={[
                                styles.segmentText,
                                activeTab === "User" && styles.segmentTextActive,
                            ]}
                        >
                            User
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => setActiveTab("Host")}
                        style={({ pressed }) => [
                            styles.segmentBtn,
                            activeTab === "Host" && styles.segmentBtnActive,
                            pressed && styles.segmentBtnPressed,
                        ]}
                    >
                        <Text
                            style={[
                                styles.segmentText,
                                activeTab === "Host" && styles.segmentTextActive,
                            ]}
                        >
                            Host
                        </Text>
                    </Pressable>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                {isEmpty ? (
                    <View style={styles.emptyCard}>
                        <Image
                            source={require("../../assets/c-frame.png")}
                            style={styles.emptyImage}
                            resizeMode="contain"
                        />
                        <Text style={styles.emptyTitle}>No earnings yet</Text>
                        <Text style={styles.emptySub}>
                            {activeTab === "User"
                                ? "Earnings will show up here once you start using ShareGrid."
                                : "Earnings will show up here once you start sharing data as a host."}
                        </Text>
                    </View>
                ) : (
                    <View style={styles.listCard}>
                        {rows.map((r, idx) => (
                            <View
                                key={`${r.title}-${idx}`}
                                style={[styles.row, idx !== rows.length - 1 && styles.rowDivider]}
                            >
                                <View style={styles.rowLeft}>
                                    <Text style={styles.rowTitle}>{r.title}</Text>
                                    <Text style={styles.rowSub}>{r.sub}</Text>
                                </View>
                                <View style={styles.rowRight}>
                                    {r.badge ? (
                                        <View style={styles.badgePill}>
                                            <Text style={styles.badgeText}>{r.badge}</Text>
                                        </View>
                                    ) : null}
                                    <Text style={styles.rowPts}>
                                        {r.pts} <Text style={styles.rowPtsUnit}>pts</Text>
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFFFFF" },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 70,
        paddingBottom: 10,
        backgroundColor: "#FFFFFF",
    },
    headerTitle: {
        flex: 1,
        fontSize: 22,
        fontWeight: "900",
        color: "#111",
        marginLeft: 6,
    },
    headerRight: { width: 28 },

    segmentWrap: { paddingHorizontal: 16, paddingTop: 8 },
    segmentBg: {
        flexDirection: "row",
        backgroundColor: "#EAF2FF",
        borderRadius: 10,
        padding: 4,
    },
    segmentBtn: {
        flex: 1,
        height: 40,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    segmentBtnActive: {
        backgroundColor: PRIMARY_BLUE,
    },
    segmentBtnPressed: { opacity: 0.92 },
    segmentText: {
        fontSize: 14,
        fontWeight: "900",
        color: PRIMARY_BLUE,
    },
    segmentTextActive: { color: "#FFFFFF" },

    scroll: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24 },
    emptyCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        paddingHorizontal: 18,
        paddingVertical: 24,
        alignItems: "center",
    },
    emptyImage: {
        width: 190,
        height: 190,
        marginBottom: 14,
    },
    emptyTitle: {
        fontSize: 16,
        fontWeight: "900",
        color: "#111",
    },
    emptySub: {
        marginTop: 6,
        fontSize: 12,
        fontWeight: "700",
        color: "#64748B",
        textAlign: "center",
        lineHeight: 18,
    },
    listCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        overflow: "hidden",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: "#FFFFFF",
    },
    rowDivider: { borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
    rowLeft: { flex: 1, paddingRight: 14 },
    rowTitle: { fontSize: 15, fontWeight: "900", color: "#111" },
    rowSub: { marginTop: 2, fontSize: 12, fontWeight: "600", color: "#111" },
    rowRight: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    badgePill: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: "#EAF2FF",
    },
    badgeText: {
        fontSize: 11,
        fontWeight: "900",
        color: PRIMARY_BLUE,
    },
    rowPts: { fontSize: 16, fontWeight: "900", color: "#16A34A" },
    rowPtsUnit: { fontSize: 12, fontWeight: "800", color: "#16A34A" },
});
