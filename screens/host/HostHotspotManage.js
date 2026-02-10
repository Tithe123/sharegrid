import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const PRIMARY_BLUE = "#2563EB";
const PRIMARY_BLUE_PRESSED = "#3B82F6";

const HostHotspotManage = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const hotspotName = route?.params?.hotspotName || "Ibeju Initiative";
    const [isOnline, setIsOnline] = useState(route?.params?.isOnline ?? true);
    const timeRangeLabel = route?.params?.timeRangeLabel || "Today";
    const qualityLevel = route?.params?.qualityLevel || "High";
    const qualityVariant = route?.params?.qualityVariant || "green";

    const restartTimerRef = useRef(null);

    useEffect(() => {
        return () => {
            if (restartTimerRef.current) {
                clearTimeout(restartTimerRef.current);
            }
        };
    }, []);

    const handleDisable = () => {
        if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
        setIsOnline(false);
    };

    const handleStart = () => {
        if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
        setIsOnline(true);
    };

    const handleRestart = () => {
        if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
        setIsOnline(false);
        restartTimerRef.current = setTimeout(() => {
            setIsOnline(true);
        }, 1500);
    };

    const qualityConfig = !isOnline
        ? {
              bg: "#F3F4F6",
              fg: "#9CA3AF",
              icon: "triangle",
          }
        : qualityVariant === "red"
          ? {
                bg: "#FEE2E2",
                fg: "#EF4444",
                icon: "triangle",
            }
          : qualityVariant === "orange"
            ? {
                  bg: "#FFEDD5",
                  fg: "#F59E0B",
                  icon: "remove",
              }
            : {
                  bg: "#DCFCE7",
                  fg: "#16A34A",
                  icon: "triangle",
              };

    const [activeTrendTab, setActiveTrendTab] = useState("Data");

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.topRow}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backBtn}
                        hitSlop={10}
                    >
                        <Ionicons name="chevron-back" size={26} color="#111" />
                    </TouchableOpacity>

                    <Text style={styles.pageTitle}>{hotspotName}</Text>

                    <View style={styles.filterPill}>
                        <Text style={styles.filterText}>{timeRangeLabel}</Text>
                        <Ionicons name="chevron-down" size={16} color="#111" />
                    </View>
                </View>

                <View style={styles.statusRow}>
                    <View style={styles.statusPillOnline}>
                        <View
                            style={[
                                styles.onlineDot,
                                !isOnline && styles.offlineDot,
                            ]}
                        />
                        <Text style={styles.statusPillTextOnline}>
                            {isOnline ? "Online" : "Offline"}
                        </Text>
                    </View>

                    <View style={styles.qualityWrap}>
                        <Text style={styles.qualityLabel}>Quality</Text>
                        <View
                            style={[
                                styles.statusPillQuality,
                                { backgroundColor: qualityConfig.bg },
                            ]}
                        >
                            <Ionicons
                                name={qualityConfig.icon}
                                size={qualityConfig.icon === "remove" ? 14 : 12}
                                color={qualityConfig.fg}
                                style={styles.qualityIcon}
                            />
                            <Text style={[styles.statusPillTextQuality, { color: qualityConfig.fg }]}>
                                {qualityLevel}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.statsCard}>
                    <View style={styles.statsItem}>
                        <Ionicons name="person-outline" size={18} color={PRIMARY_BLUE} />
                        <Text style={styles.statsValue}>100%</Text>
                        <Text style={styles.statsLabel}>Uptime</Text>
                    </View>
                    <View style={styles.statsItem}>
                        <Ionicons
                            name="share-social-outline"
                            size={18}
                            color={PRIMARY_BLUE}
                        />
                        <Text style={styles.statsValue}>100GB</Text>
                        <Text style={styles.statsLabel}>Data
Shared</Text>
                    </View>
                    <View style={styles.statsItem}>
                        <Ionicons name="people-outline" size={18} color={PRIMARY_BLUE} />
                        <Text style={styles.statsValue}>100k</Text>
                        <Text style={styles.statsLabel}>Users</Text>
                    </View>
                    <View style={styles.statsItem}>
                        <Text style={styles.statsCurrency}>₦</Text>
                        <Text style={styles.statsValue}>100k</Text>
                        <Text style={styles.statsLabel}>Earned</Text>
                    </View>
                </View>

                <View style={styles.actionsRow}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.actionBtn,
                            styles.actionBtnBlue,
                            pressed && styles.actionBtnBluePressed,
                        ]}
                    >
                        <Text style={styles.actionBtnText}>Settings</Text>
                    </Pressable>

                    {isOnline ? (
                        <>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.actionBtn,
                                    styles.actionBtnOrange,
                                    pressed && styles.actionBtnOrangePressed,
                                ]}
                                onPress={handleRestart}
                            >
                                <Text style={styles.actionBtnText}>Restart</Text>
                            </Pressable>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.actionBtn,
                                    styles.actionBtnRed,
                                    pressed && styles.actionBtnRedPressed,
                                ]}
                                onPress={handleDisable}
                            >
                                <Text style={styles.actionBtnText}>Disable</Text>
                            </Pressable>
                        </>
                    ) : (
                        <>
                            <View style={[styles.actionBtn, styles.actionBtnDisabled]}>
                                <Text style={styles.actionBtnTextDisabled}>Restart</Text>
                            </View>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.actionBtn,
                                    styles.actionBtnGreen,
                                    pressed && styles.actionBtnGreenPressed,
                                ]}
                                onPress={handleStart}
                            >
                                <Text style={styles.actionBtnText}>Start</Text>
                            </Pressable>
                        </>
                    )}
                </View>

                <View style={styles.trendCard}>
                    <View style={styles.trendHeader}>
                        <Text style={styles.trendTitle}>Bandwidth Sharing
Trend</Text>

                        <View style={styles.trendTabs}>
                            <Pressable
                                onPress={() => setActiveTrendTab("Data")}
                                style={[
                                    styles.trendTab,
                                    activeTrendTab === "Data" && styles.trendTabActive,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.trendTabText,
                                        activeTrendTab === "Data" &&
                                            styles.trendTabTextActive,
                                    ]}
                                >
                                    Data
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => setActiveTrendTab("Earnings")}
                                style={[
                                    styles.trendTab,
                                    activeTrendTab === "Earnings" && styles.trendTabActive,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.trendTabText,
                                        activeTrendTab === "Earnings" &&
                                            styles.trendTabTextActive,
                                    ]}
                                >
                                    Earnings
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.chartWrap}>
                        <View style={styles.chartGrid}>
                            {[1200, 1000, 800, 600, 400, 200].map((v) => (
                                <View key={v} style={styles.chartGridRow}>
                                    <Text style={styles.chartAxisText}>{v}</Text>
                                    <View style={styles.chartLine} />
                                </View>
                            ))}
                        </View>

                        <View style={styles.chartMock}>
                            <View style={styles.chartFill} />
                            <View style={styles.chartDot} />
                            <View style={styles.chartCallout}>
                                <Text style={styles.chartCalloutText}>300mb</Text>
                            </View>
                            <View style={styles.chartDashed} />
                            <View style={styles.chartDayRow}>
                                {[
                                    "Mon",
                                    "Tue",
                                    "Wed",
                                    "Thu",
                                    "Fri",
                                    "Sat",
                                    "Sun",
                                ].map((d) => (
                                    <Text
                                        key={d}
                                        style={[
                                            styles.chartDay,
                                            d === "Thu" && styles.chartDayActive,
                                        ]}
                                    >
                                        {d}
                                    </Text>
                                ))}
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.recentHeader}>
                    <Text style={styles.recentTitle}>Recent Connections</Text>
                    <TouchableOpacity
                        style={styles.seeMore}
                        onPress={() =>
                            navigation.navigate("HostRecentConnections", {
                                hotspotName,
                            })
                        }
                    >
                        <Text style={styles.seeMoreText}>See More</Text>
                        <Ionicons name="chevron-forward" size={18} color="#111" />
                    </TouchableOpacity>
                </View>

                <View style={styles.previewCard}>
                    {[
                        { name: "Samuel A.", data: "2.4 GB" },
                    ].map((row, idx) => (
                        <View
                            key={row.name}
                            style={[
                                styles.previewRow,
                                idx !== 0 && styles.previewRowBorder,
                            ]}
                        >
                            <Text style={styles.previewLeftText}>{row.name}</Text>
                            <Text style={styles.previewRightText}>{row.data}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.feedbackHeader}>
                    <Text style={styles.recentTitle}>User Feedback</Text>
                    <TouchableOpacity
                        style={styles.seeMore}
                        onPress={() =>
                            navigation.navigate("HostUserFeedback", {
                                hotspotName,
                            })
                        }
                    >
                        <Text style={styles.seeMoreText}>See More</Text>
                        <Ionicons name="chevron-forward" size={18} color="#111" />
                    </TouchableOpacity>
                </View>

                <View style={styles.feedbackPreviewCard}>
                    {[0].map((i) => (
                        <View
                            key={i}
                            style={[
                                styles.feedbackRow,
                                i !== 0 && styles.feedbackRowBorder,
                            ]}
                        >
                            <View style={styles.feedbackAccent} />
                            <View style={styles.feedbackContent}>
                                <View style={styles.feedbackTopRow}>
                                    <Text style={styles.feedbackName}>Sarah M.</Text>
                                    <View style={styles.starsRow}>
                                        {Array.from({ length: 5 }).map((_, s) => (
                                            <Ionicons
                                                key={s}
                                                name="star"
                                                size={14}
                                                color="#FBBF24"
                                            />
                                        ))}
                                    </View>
                                    <Text style={styles.feedbackTime}>2 hours ago</Text>
                                </View>
                                <Text style={styles.feedbackText}>
                                    Great connection speed, very reliable!
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    scroll: {
        paddingBottom: 36,
        paddingTop: 90,
        paddingHorizontal: 24,
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    backBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
    },
    pageTitle: {
        flex: 1,
        marginLeft: 6,
        fontSize: 18,
        fontWeight: "900",
        color: "#111",
    },
    filterPill: {
        height: 32,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: "#F1F5F9",
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    filterText: {
        fontSize: 12,
        fontWeight: "800",
        color: "#111",
    },

    statusRow: {
        marginTop: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    statusPillOnline: {
        backgroundColor: PRIMARY_BLUE,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    onlineDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#22C55E",
    },
    offlineDot: {
        backgroundColor: "#9CA3AF",
    },
    statusPillTextOnline: {
        color: "#FFFFFF",
        fontWeight: "900",
        fontSize: 12,
    },
    qualityWrap: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    qualityLabel: {
        color: "#111",
        fontSize: 12,
        fontWeight: "700",
    },
    statusPillQuality: {
        backgroundColor: "#DCFCE7",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    qualityIcon: { marginTop: 1 },
    statusPillTextQuality: {
        color: "#16A34A",
        fontWeight: "900",
        fontSize: 12,
    },

    statsCard: {
        marginTop: 14,
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        paddingVertical: 18,
        paddingHorizontal: 12,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    statsItem: {
        alignItems: "center",
        justifyContent: "center",
        width: "25%",
        gap: 4,
    },
    statsValue: {
        marginTop: 4,
        fontSize: 16,
        fontWeight: "900",
        color: "#111",
    },
    statsLabel: {
        fontSize: 10,
        fontWeight: "700",
        color: "#6B7280",
        textAlign: "center",
        lineHeight: 12,
    },
    statsCurrency: {
        fontSize: 16,
        fontWeight: "900",
        color: PRIMARY_BLUE,
        marginBottom: 2,
    },

    actionsRow: {
        marginTop: 14,
        flexDirection: "row",
        gap: 10,
    },
    actionBtn: {
        flex: 1,
        height: 44,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    actionBtnText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "900",
    },
    actionBtnBlue: {
        backgroundColor: PRIMARY_BLUE,
    },
    actionBtnBluePressed: {
        backgroundColor: PRIMARY_BLUE_PRESSED,
    },
    actionBtnOrange: {
        backgroundColor: "#F97316",
    },
    actionBtnOrangePressed: {
        backgroundColor: "#FB923C",
    },
    actionBtnRed: {
        backgroundColor: "#EF4444",
    },
    actionBtnRedPressed: {
        backgroundColor: "#F87171",
    },

    actionBtnDisabled: {
        backgroundColor: "#BDBDBD",
    },
    actionBtnTextDisabled: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "900",
        opacity: 0.95,
    },

    actionBtnGreen: {
        backgroundColor: "#22C55E",
    },
    actionBtnGreenPressed: {
        backgroundColor: "#34D399",
    },

    trendCard: {
        marginTop: 14,
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        padding: 14,
    },
    trendHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    trendTitle: {
        fontSize: 14,
        fontWeight: "900",
        color: "#111",
        lineHeight: 18,
    },
    trendTabs: {
        flexDirection: "row",
        backgroundColor: "#F1F5F9",
        borderRadius: 10,
        padding: 3,
        gap: 4,
    },
    trendTab: {
        paddingVertical: 7,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    trendTabActive: {
        backgroundColor: "#FFFFFF",
    },
    trendTabText: {
        fontSize: 11,
        fontWeight: "800",
        color: "#6B7280",
    },
    trendTabTextActive: {
        color: PRIMARY_BLUE,
    },

    chartWrap: {
        marginTop: 10,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
    },
    chartGrid: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 24,
        paddingLeft: 0,
        paddingRight: 0,
    },
    chartGridRow: {
        height: 34,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingRight: 6,
    },
    chartAxisText: {
        width: 44,
        textAlign: "right",
        fontSize: 10,
        fontWeight: "700",
        color: "#9CA3AF",
    },
    chartLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#E5E7EB",
    },
    chartMock: {
        height: 240,
        marginLeft: 52,
        marginRight: 8,
        marginTop: 12,
        marginBottom: 12,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
        justifyContent: "flex-end",
    },
    chartFill: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "rgba(37,99,235,0.12)",
    },
    chartDot: {
        position: "absolute",
        right: 8,
        top: 76,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: PRIMARY_BLUE,
    },
    chartCallout: {
        position: "absolute",
        left: "38%",
        top: 108,
        backgroundColor: PRIMARY_BLUE,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    chartCalloutText: {
        color: "#FFFFFF",
        fontSize: 10,
        fontWeight: "900",
    },
    chartDashed: {
        position: "absolute",
        left: "44%",
        top: 128,
        bottom: 34,
        width: 2,
        borderLeftWidth: 2,
        borderStyle: "dashed",
        borderColor: PRIMARY_BLUE,
        opacity: 0.35,
    },
    chartDayRow: {
        height: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        backgroundColor: "#FFFFFF",
    },
    chartDay: {
        fontSize: 10,
        fontWeight: "700",
        color: "#9CA3AF",
    },
    chartDayActive: {
        color: PRIMARY_BLUE,
        fontWeight: "900",
    },

    recentHeader: {
        marginTop: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    feedbackHeader: {
        marginTop: 18,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    recentTitle: {
        fontSize: 14,
        fontWeight: "900",
        color: "#111",
    },
    seeMore: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
    seeMoreText: {
        fontSize: 12,
        fontWeight: "800",
        color: "#111",
    },
    previewCard: {
        marginTop: 12,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
    },
    previewRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    previewRowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },
    previewLeftText: {
        fontSize: 12,
        fontWeight: "800",
        color: "#111",
    },
    previewRightText: {
        fontSize: 12,
        fontWeight: "900",
        color: "#111",
    },

    feedbackPreviewCard: {
        marginTop: 12,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
    },
    feedbackRow: {
        flexDirection: "row",
        paddingVertical: 16,
        paddingHorizontal: 14,
        gap: 12,
    },
    feedbackRowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },
    feedbackAccent: {
        width: 3,
        borderRadius: 2,
        backgroundColor: PRIMARY_BLUE,
    },
    feedbackContent: {
        flex: 1,
    },
    feedbackTopRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },
    feedbackName: {
        fontSize: 13,
        fontWeight: "900",
        color: "#111",
        flexShrink: 0,
    },
    starsRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        flex: 1,
    },
    feedbackTime: {
        fontSize: 11,
        fontWeight: "800",
        color: "#6B7280",
        flexShrink: 0,
    },
    feedbackText: {
        marginTop: 6,
        fontSize: 12,
        fontWeight: "700",
        color: "#374151",
        lineHeight: 16,
    },
});

export default HostHotspotManage;
