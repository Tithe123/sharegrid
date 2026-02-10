import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Pressable,
    ScrollView,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PRIMARY_BLUE = "#2563EB";

export default function Leaderboards() {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState("Overall");
    const [page, setPage] = useState(1);

    const pageSize = 12;
    const totalResults = 830;

    const baseRows = useMemo(
        () => [
            { name: "Alex Oxlade", points: 15237 },
            { name: "Daniel Gutierrez", points: 15209 },
            { name: "Jannik Sinner", points: 15200 },
            { name: "Dolores Aveiro", points: 15197 },
            { name: "Gbolagade Pharrell", points: 15237 },
            { name: "Eggestein Zubair", points: 15237 },
            { name: "God is Able Computers", points: 15237 },
            { name: "Mosh Gadgets", points: 15237 },
            { name: "Ibeju Initiative", points: 15237 },
            { name: "Greenspring Electronics", points: 15237 },
            { name: "Esther Abdulroheem", points: 15237 },
            { name: "Hugo Ekitike", points: 15237 },
        ],
        []
    );

    const maxPage = 3;
    const safePage = Math.min(Math.max(page, 1), maxPage);

    const rows = useMemo(() => {
        return baseRows.map((r, idx) => ({
            rank: idx + 1,
            ...r,
        }));
    }, [baseRows]);

    const start = 1;
    const end = 12;

    const canPrev = safePage > 1;
    const canNext = safePage < maxPage;

    const tabs = ["Overall", "Users", "Hosts"];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={10}>
                    <Ionicons name="chevron-back" size={28} color="#111" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Leaderboards</Text>
                <View style={styles.headerRight} />
            </View>

            <View style={styles.segmentWrap}>
                <View style={styles.segmentBg}>
                    {tabs.map((t) => {
                        const active = activeTab === t;
                        return (
                            <Pressable
                                key={t}
                                onPress={() => {
                                    setActiveTab(t);
                                    setPage(1);
                                }}
                                style={({ pressed }) => [
                                    styles.segmentBtn,
                                    active && styles.segmentBtnActive,
                                    pressed && styles.segmentBtnPressed,
                                ]}
                            >
                                <Text style={[styles.segmentText, active && styles.segmentTextActive]}>
                                    {t}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.tableCard}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.th, styles.thRank]}>Rank</Text>
                        <Text style={[styles.th, styles.thUser]}>User</Text>
                        <Text style={[styles.th, styles.thPoints]}>Points</Text>
                    </View>

                    {rows.map((r, idx) => (
                        <View
                            key={`${activeTab}-${r.rank}-${idx}`}
                            style={[styles.tr, idx !== rows.length - 1 && styles.trDivider]}
                        >
                            <View style={styles.rankCell}>
                                <Image
                                    source={require("../../assets/illustration 1.png")}
                                    style={styles.avatar}
                                />
                                <Text style={styles.rankText}>{r.rank}</Text>
                            </View>
                            <Text style={styles.userCell} numberOfLines={1}>
                                {r.name}
                            </Text>
                            <Text style={styles.pointsCell}>{r.points.toLocaleString()}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.footerRow}>
                    <Text style={styles.footerText}>
                        Showing {start} to {end} of {totalResults}
                        {"\n"}results
                    </Text>

                    <View style={styles.pagination}>
                        <Pressable
                            onPress={() => canPrev && setPage((p) => Math.max(1, p - 1))}
                            style={({ pressed }) => [
                                styles.pageNav,
                                !canPrev && styles.pageNavDisabled,
                                pressed && canPrev && styles.pageNavPressed,
                            ]}
                        >
                            <Ionicons name="chevron-back" size={18} color="#111" />
                        </Pressable>

                        {[1, 2, 3].map((p) => {
                            const active = safePage === p;
                            return (
                                <Pressable
                                    key={p}
                                    onPress={() => setPage(p)}
                                    style={({ pressed }) => [
                                        styles.pageBtn,
                                        active && styles.pageBtnActive,
                                        pressed && styles.pageBtnPressed,
                                    ]}
                                >
                                    <Text style={[styles.pageText, active && styles.pageTextActive]}>
                                        {p}
                                    </Text>
                                </Pressable>
                            );
                        })}

                        <Pressable
                            onPress={() => canNext && setPage((p) => Math.min(maxPage, p + 1))}
                            style={({ pressed }) => [
                                styles.pageNav,
                                !canNext && styles.pageNavDisabled,
                                pressed && canNext && styles.pageNavPressed,
                            ]}
                        >
                            <Ionicons name="chevron-forward" size={18} color="#111" />
                        </Pressable>
                    </View>
                </View>
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

    tableCard: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
    },
    tableHeader: {
        backgroundColor: PRIMARY_BLUE,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    th: { color: "#FFFFFF", fontWeight: "900", fontSize: 12 },
    thRank: { width: 80 },
    thUser: { flex: 1 },
    thPoints: { width: 90, textAlign: "left" },

    tr: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: "#FFFFFF",
    },
    trDivider: { borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
    rankCell: { width: 80, flexDirection: "row", alignItems: "center", gap: 8 },
    avatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: "#E5E7EB" },
    rankText: { fontSize: 13, fontWeight: "800", color: "#111" },
    userCell: { flex: 1, fontSize: 13, fontWeight: "700", color: "#111" },
    pointsCell: { width: 90, fontSize: 13, fontWeight: "800", color: "#111" },

    footerRow: {
        marginTop: 18,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 10,
    },
    footerText: { flex: 1, fontSize: 13, fontWeight: "700", color: "#111", lineHeight: 18 },

    pagination: { flexDirection: "row", alignItems: "center", gap: 6 },
    pageNav: {
        width: 36,
        height: 36,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
    },
    pageNavDisabled: { opacity: 0.4 },
    pageNavPressed: { backgroundColor: "#F8FAFC" },

    pageBtn: {
        width: 36,
        height: 36,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
    },
    pageBtnActive: { backgroundColor: PRIMARY_BLUE, borderColor: PRIMARY_BLUE },
    pageBtnPressed: { backgroundColor: "#F8FAFC" },
    pageText: { fontSize: 12, fontWeight: "900", color: PRIMARY_BLUE },
    pageTextActive: { color: "#FFFFFF" },
});
