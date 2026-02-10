import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PRIMARY_BLUE = "#2563EB";

const HostNotifications = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.headerRow}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backBtn}
                        hitSlop={10}
                    >
                        <Ionicons name="chevron-back" size={26} color="#111" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Host Notifications</Text>
                    <View style={styles.headerSpacer} />
                </View>

                <View style={styles.card}>
                    {[
                        {
                            title: "Hotspot Offline",
                            body: "Ibeju Initiative went offline. Tap to review.",
                            time: "5m",
                            type: "alert",
                        },
                        {
                            title: "Uptime Bonus",
                            body: "You earned +40 pts for uptime today.",
                            time: "3h",
                            type: "success",
                        },
                        {
                            title: "New Connection",
                            body: "A user connected to your hotspot.",
                            time: "1d",
                            type: "info",
                        },
                    ].map((n, idx) => (
                        <View
                            key={idx}
                            style={[styles.row, idx !== 2 && styles.rowBorder]}
                        >
                            <View
                                style={[
                                    styles.iconWrap,
                                    n.type === "alert" && styles.iconWrapAlert,
                                    n.type === "success" && styles.iconWrapSuccess,
                                ]}
                            >
                                <Ionicons name="notifications" size={18} color="#fff" />
                            </View>
                            <View style={styles.textCol}>
                                <View style={styles.rowTop}>
                                    <Text style={styles.rowTitle}>{n.title}</Text>
                                    <Text style={styles.rowTime}>{n.time}</Text>
                                </View>
                                <Text style={styles.rowBody}>{n.body}</Text>
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
    scroll: { paddingTop: 90, paddingHorizontal: 20, paddingBottom: 30 },
    headerRow: {
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
    headerSpacer: { width: 36, height: 36 },
    title: { fontSize: 22, fontWeight: "900", color: "#111" },
    card: {
        marginTop: 18,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
    },
    row: {
        flexDirection: "row",
        gap: 12,
        paddingHorizontal: 14,
        paddingVertical: 16,
    },
    rowBorder: { borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
    iconWrap: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: PRIMARY_BLUE,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
    },
    iconWrapAlert: { backgroundColor: "#EF4444" },
    iconWrapSuccess: { backgroundColor: "#22C55E" },
    textCol: { flex: 1 },
    rowTop: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },
    rowTitle: { fontSize: 13, fontWeight: "900", color: "#111", flex: 1 },
    rowTime: { fontSize: 11, fontWeight: "800", color: "#6B7280" },
    rowBody: {
        marginTop: 6,
        fontSize: 12,
        fontWeight: "700",
        color: "#374151",
        lineHeight: 16,
    },
});

export default HostNotifications;
