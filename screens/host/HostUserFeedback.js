import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const PRIMARY_BLUE = "#2563EB";

const HostUserFeedback = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const hotspotName = route?.params?.hotspotName;

    const feedbackItems = [
        {
            id: "1",
            name: "Sarah M.",
            time: "2 hours ago",
            text: "Great connection speed, very reliable!",
        },
        {
            id: "2",
            name: "Sarah M.",
            time: "2 hours ago",
            text: "Great connection speed, very reliable! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            id: "3",
            name: "Sarah M.",
            time: "2 hours ago",
            text: "Great connection speed, very reliable!",
        },
        {
            id: "4",
            name: "Sarah M.",
            time: "2 hours ago",
            text: "Great connection speed, very reliable!",
        },
    ];

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
                    <Text style={styles.title}>User Feedback</Text>
                    <View style={styles.headerSpacer} />
                </View>

                <View style={styles.card}>
                    {feedbackItems.map((item, idx) => (
                        <View
                            key={item.id}
                            style={[styles.item, idx !== feedbackItems.length - 1 && styles.itemBorder]}
                        >
                            <View style={styles.accent} />
                            <View style={styles.content}>
                                <View style={styles.topRow}>
                                    <Text style={styles.name}>{item.name}</Text>

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

                                    <Text style={styles.time}>{item.time}</Text>
                                </View>

                                <Text style={styles.text}>{item.text}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {hotspotName ? (
                    <Text style={styles.footerHint}>Hotspot: {hotspotName}</Text>
                ) : null}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFFFFF" },
    scroll: {
        paddingTop: 90,
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
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
    title: {
        fontSize: 22,
        fontWeight: "900",
        color: "#111",
    },
    card: {
        marginTop: 18,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
    },
    item: {
        flexDirection: "row",
        paddingHorizontal: 14,
        paddingVertical: 18,
        gap: 12,
    },
    itemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },
    accent: {
        width: 3,
        borderRadius: 2,
        backgroundColor: PRIMARY_BLUE,
    },
    content: { flex: 1 },
    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },
    name: {
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
    time: {
        fontSize: 11,
        fontWeight: "800",
        color: "#6B7280",
        flexShrink: 0,
    },
    text: {
        marginTop: 6,
        fontSize: 12,
        fontWeight: "700",
        color: "#374151",
        lineHeight: 16,
    },
    footerHint: {
        marginTop: 10,
        fontSize: 11,
        fontWeight: "700",
        color: "#9CA3AF",
        textAlign: "center",
    },
});

export default HostUserFeedback;
