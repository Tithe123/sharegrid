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

const HostRecentConnections = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const hotspotName = route?.params?.hotspotName;

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
                    <Text style={styles.title}>Recent Connections</Text>
                    <View style={styles.headerSpacer} />
                </View>

                <View style={styles.listCard}>
                    {Array.from({ length: 11 }).map((_, idx) => (
                        <View
                            key={idx}
                            style={[
                                styles.row,
                                idx !== 10 && styles.rowBorder,
                            ]}
                        >
                            <View style={styles.left}>
                                <Text style={styles.name}>Sarah M.</Text>
                                <Text style={styles.sub}>2h 15m connected</Text>
                            </View>

                            <View style={styles.right}>
                                <Text style={styles.data}>1.8 GB</Text>
                                <Text style={styles.amount}>NGN 600</Text>
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
    listCard: {
        marginTop: 18,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 18,
        paddingVertical: 16,
    },
    rowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },
    left: { flex: 1, paddingRight: 12 },
    name: {
        fontSize: 16,
        fontWeight: "900",
        color: "#111",
    },
    sub: {
        marginTop: 4,
        fontSize: 13,
        fontWeight: "700",
        color: "#374151",
        opacity: 0.9,
    },
    right: { alignItems: "flex-end" },
    data: {
        fontSize: 16,
        fontWeight: "900",
        color: "#111",
    },
    amount: {
        marginTop: 4,
        fontSize: 13,
        fontWeight: "800",
        color: "#374151",
        opacity: 0.9,
    },
    footerHint: {
        marginTop: 10,
        fontSize: 11,
        fontWeight: "700",
        color: "#9CA3AF",
        textAlign: "center",
    },
});

export default HostRecentConnections;
