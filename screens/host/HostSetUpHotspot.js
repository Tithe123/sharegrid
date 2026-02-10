import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PRIMARY_BLUE = "#2563EB";

export default function HostSetUpHotspot() {
    const navigation = useNavigation();

    const benefits = [
        {
            icon: "share-social-outline",
            text: "Share unused data securely",
        },
        {
            icon: "wallet-outline",
            text: "Earn instantly in cash",
        },
        {
            icon: "options-outline",
            text: "You’re always in control",
        },
    ];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={10} style={styles.backBtn}>
                        <Ionicons name="chevron-back" size={28} color="#111" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Turn your internet into{"\n"}income</Text>
                    <View style={styles.headerRightSpacer} />
                </View>

                <View style={styles.illustrationWrap}>
                    <Image
                        source={require("../../assets/phone.png")}
                        style={styles.illustration}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.benefitsCard}>
                    {benefits.map((b, idx) => (
                        <View
                            key={b.text}
                            style={[styles.benefitRow, idx !== benefits.length - 1 && styles.benefitDivider]}
                        >
                            <View style={styles.benefitLeft}>
                                <Ionicons name={b.icon} size={18} color={PRIMARY_BLUE} />
                                <Text style={styles.benefitText}>{b.text}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <Pressable
                    onPress={() => navigation.navigate("HostHotspotDetails")}
                    style={({ pressed }) => [styles.ctaBtn, pressed && styles.ctaBtnPressed]}
                >
                    <Text style={styles.ctaText}>Set Up Hotspot</Text>
                </Pressable>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFFFFF" },
    scroll: { paddingHorizontal: 16, paddingTop: 90, paddingBottom: 32 },

    headerRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
    },
    backBtn: { marginTop: 8 },
    headerTitle: {
        flex: 1,
        fontSize: 22,
        fontWeight: "900",
        color: "#111",
        lineHeight: 28,
        marginTop: 2,
    },
    headerRightSpacer: { width: 28 },

    illustrationWrap: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 14,
        marginBottom: 18,
    },
    illustration: { width: 230, height: 230 },

    benefitsCard: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
    },
    benefitRow: {
        paddingHorizontal: 14,
        paddingVertical: 16,
        backgroundColor: "#FFFFFF",
    },
    benefitDivider: { borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
    benefitLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
    benefitText: { fontSize: 14, fontWeight: "800", color: "#111" },

    ctaBtn: {
        marginTop: 28,
        height: 54,
        borderRadius: 10,
        backgroundColor: PRIMARY_BLUE,
        alignItems: "center",
        justifyContent: "center",
    },
    ctaBtnPressed: { opacity: 0.92 },
    ctaText: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },
});
