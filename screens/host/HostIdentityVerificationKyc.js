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
import { useNavigation, useRoute } from "@react-navigation/native";

const PRIMARY_BLUE = "#2563EB";

export default function HostIdentityVerificationKyc() {
    const navigation = useNavigation();
    const route = useRoute();
    const { width, height } = Dimensions.get("window");
    const cardWidth = Math.min(width - 32, 560);
    const buttonSpacer = Math.round(height * 0.28);

    const resultsStatus = route?.params?.resultsStatus ?? "completed";
    const isPending = resultsStatus === "pending";
    const isFailed = resultsStatus === "failed";

    const step1Active = !isFailed;
    const step1Color = step1Active ? "#16A34A" : "#94A3B8";
    const step1Bar = step1Active ? "#22C55E" : "#9CA3AF";

    const step2Color = isFailed ? "#EF4444" : isPending ? "#F59E0B" : "#16A34A";
    const step2Bar = isFailed ? "#EF4444" : isPending ? "#F59E0B" : "#22C55E";
    const step2StatusText = isFailed ? "Failed" : isPending ? "Pending" : "Completed";
    const step2BodyText = isFailed
        ? "We are sorry, your KYC application was not successful.\nWe were unable to verify your ID. Please try again."
        : isPending
            ? "Fret Not! We are currently reviewing your KYC\napplication."
            : "Congratulations! You have successfully passed KYC.\nYour NIN is 6799****************";

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={10} style={styles.backBtn}>
                        <Ionicons name="chevron-back" size={28} color="#111" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Identity Verification{"\n"}(KYC)</Text>
                    <View style={styles.headerRightSpacer} />
                </View>

                <View style={[styles.card, { width: cardWidth }]}>
                    <View style={styles.step}>
                        <View style={[styles.stepLeftBar, { backgroundColor: step1Bar }]} />
                        <View style={styles.stepBody}>
                            <View style={styles.stepTopRow}>
                                <Text style={[styles.stepTitle, { color: step1Color }]}>
                                    Submit your KYC Application
                                </Text>
                                <Text style={[styles.stepStatus, { color: step1Color }]}>Completed</Text>
                            </View>
                            <Text style={[styles.stepText, { color: step1Color }]}>
                                KYC (Identity Verification) is required to validate hosts’ identity to meet
                                compliance. A government-issued ID is required.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.stepDivider} />

                    <View style={styles.step}>
                        <View style={[styles.stepLeftBar, { backgroundColor: step2Bar }]} />
                        <View style={styles.stepBody}>
                            <View style={styles.stepTopRow}>
                                <Text style={[styles.stepTitle, { color: step2Color }]}>
                                    Wait for KYC Results
                                </Text>
                                <Text style={[styles.stepStatus, { color: step2Color }]}>
                                    {step2StatusText}
                                </Text>
                            </View>
                            <Text style={[styles.stepText, { color: step2Color }]}>{step2BodyText}</Text>
                        </View>
                    </View>
                </View>

                {isPending ? <View style={{ height: buttonSpacer }} /> : null}

                <Pressable
                    onPress={() => {
                        if (isPending) return;
                        navigation.navigate("HostKyc");
                    }}
                    style={({ pressed }) => [
                        styles.setupBtn,
                        isPending && styles.setupBtnDisabled,
                        pressed && !isPending && styles.setupBtnPressed,
                    ]}
                >
                    <Text style={[styles.setupBtnText, isPending && styles.setupBtnTextDisabled]}>
                        Setup KYC
                    </Text>
                </Pressable>
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
        maxWidth: 560,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 10,
        marginBottom: 18,
    },
    backBtn: { marginTop: 6 },
    headerTitle: {
        flex: 1,
        fontSize: 24,
        fontWeight: "900",
        color: "#111",
        lineHeight: 28,
    },
    headerRightSpacer: { width: 28 },

    card: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
        paddingVertical: 10,
    },

    step: {
        flexDirection: "row",
        gap: 12,
        paddingHorizontal: 14,
        paddingVertical: 14,
    },
    stepLeftBar: {
        width: 4,
        borderRadius: 999,
        backgroundColor: "#22C55E",
    },
    stepBody: { flex: 1 },
    stepTopRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },
    stepTitle: { fontSize: 14, fontWeight: "900", color: "#16A34A" },
    stepStatus: { fontSize: 12, fontWeight: "900", color: "#16A34A" },
    stepText: {
        marginTop: 8,
        fontSize: 12,
        fontWeight: "800",
        color: "#16A34A",
        lineHeight: 18,
    },
    stepDivider: {
        height: 1,
        backgroundColor: "#F1F5F9",
        marginHorizontal: 14,
    },

    setupBtn: {
        marginTop: 24,
        width: "100%",
        maxWidth: 560,
        height: 54,
        borderRadius: 10,
        backgroundColor: PRIMARY_BLUE,
        alignItems: "center",
        justifyContent: "center",
    },
    setupBtnDisabled: {
        backgroundColor: "#E5E7EB",
    },
    setupBtnPressed: { opacity: 0.92 },
    setupBtnText: { fontSize: 14, fontWeight: "900", color: "#FFFFFF" },
    setupBtnTextDisabled: { color: "#FFFFFF" },
});
