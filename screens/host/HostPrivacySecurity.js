import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Pressable,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PRIMARY_BLUE = "#2563EB";

export default function HostPrivacySecurity() {
    const navigation = useNavigation();
    const { width } = Dimensions.get("window");
    const cardWidth = Math.min(width - 32, 520);

    const rows = [
        { label: "Password", onPress: () => null },
        { label: "Setup 2FA", onPress: () => null },
        { label: "How can I use ShareGrid?", onPress: () => null },
        { label: "How can I use ShareGrid?", onPress: () => null },
    ];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={10} style={styles.backBtn}>
                        <Ionicons name="chevron-back" size={28} color="#111" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Privacy & Security</Text>
                    <View style={styles.headerRightSpacer} />
                </View>

                <View style={[styles.card, { width: cardWidth }]}>
                    {rows.map((r, idx) => (
                        <View key={`${r.label}-${idx}`}>
                            <Pressable
                                onPress={r.onPress}
                                style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
                            >
                                <View style={styles.rowLeft}>
                                    <View style={styles.bookIconWrap}>
                                        <View style={styles.bookBody}>
                                            <View style={styles.bookLine} />
                                            <View style={[styles.bookLine, { top: 11 }]} />
                                        </View>
                                        <View style={styles.bookDot} />
                                    </View>
                                    <Text style={styles.rowText}>{r.label}</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="#111" />
                            </Pressable>
                            {idx !== rows.length - 1 ? <View style={styles.rowDivider} /> : null}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFFFFF" },
    scroll: {
        paddingTop: 90,
        paddingHorizontal: 16,
        paddingBottom: 24,
        alignItems: "center",
    },

    headerRow: {
        width: "100%",
        maxWidth: 520,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 10,
        marginBottom: 18,
    },
    backBtn: { marginTop: 4 },
    headerTitle: { fontSize: 22, fontWeight: "900", color: "#111" },
    headerRightSpacer: { flex: 1 },

    card: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
    },

    row: {
        paddingHorizontal: 14,
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
    },
    rowDivider: {
        height: 1,
        backgroundColor: "#F1F5F9",
        width: "80%",
        alignSelf: "flex-start",
        marginLeft: 14,
    },
    rowPressed: { backgroundColor: "#F8FAFC" },

    rowLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
    rowText: { fontSize: 14, fontWeight: "800", color: "#111" },

    bookIconWrap: {
        width: 28,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    bookBody: {
        width: 20,
        height: 18,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#93C5FD",
        backgroundColor: "transparent",
        position: "relative",
    },
    bookLine: {
        position: "absolute",
        left: 3,
        top: 6,
        width: 10,
        height: 2,
        borderRadius: 2,
        backgroundColor: "#93C5FD",
    },
    bookDot: {
        position: "absolute",
        right: 2,
        top: 2,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: PRIMARY_BLUE,
        borderWidth: 2,
        borderColor: "#FFFFFF",
    },
});
