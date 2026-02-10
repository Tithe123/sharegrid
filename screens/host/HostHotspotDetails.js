import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Pressable,
    Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";

const PRIMARY_BLUE = "#2563EB";

export default function HostHotspotDetails() {
    const navigation = useNavigation();

    const [hotspotName, setHotspotName] = useState("Bryan’s Hotspot");
    const [price, setPrice] = useState(0.003);
    const [dailyLimit, setDailyLimit] = useState("5");
    const [unit, setUnit] = useState("GB");
    const [unitOpen, setUnitOpen] = useState(false);
    const [showCompleteSetup, setShowCompleteSetup] = useState(false);
    const [showSetupSuccess, setShowSetupSuccess] = useState(false);

    const minPrice = 0.001;
    const maxPrice = 0.01;

    const estimated = useMemo(() => {
        const perGb = price * 1024;
        return perGb;
    }, [price]);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={10} style={styles.backBtn}>
                        <Ionicons name="chevron-back" size={28} color="#111" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Hotspot Details</Text>

                    <TouchableOpacity hitSlop={10}>
                        <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>Hotspot Name</Text>
                <TextInput
                    value={hotspotName}
                    onChangeText={setHotspotName}
                    style={styles.input}
                    placeholderTextColor="#CBD5E1"
                />
                <Text style={styles.helper}>This name will be shown to users</Text>

                <Text style={[styles.label, styles.sectionSpace]}>Set Price per MB</Text>
                <Text style={styles.priceValue}>₦ {price.toFixed(3)}/MB</Text>

                <View style={styles.sliderWrap}>
                    <Slider
                        style={styles.slider}
                        minimumValue={minPrice}
                        maximumValue={maxPrice}
                        step={0.001}
                        value={price}
                        onValueChange={setPrice}
                        minimumTrackTintColor={PRIMARY_BLUE}
                        maximumTrackTintColor="#E5E7EB"
                        thumbTintColor={PRIMARY_BLUE}
                    />
                </View>

                <View style={styles.sliderRangeRow}>
                    <Text style={styles.rangeText}>{minPrice.toFixed(3)} NGN</Text>
                    <Text style={styles.rangeText}>{maxPrice.toFixed(3)}NGN</Text>
                </View>

                <Text style={styles.estimateText}>
                    Estimated earnings for 1GB at this rate: {estimated.toFixed(2)} NGN
                </Text>

                <Text style={[styles.label, styles.sectionSpace]}>Daily Limit</Text>
                <View style={styles.limitRow}>
                    <TextInput
                        value={dailyLimit}
                        onChangeText={setDailyLimit}
                        style={styles.limitInput}
                        keyboardType="number-pad"
                    />
                    <Pressable
                        onPress={() => setUnitOpen(true)}
                        style={({ pressed }) => [styles.unitBtn, pressed && styles.unitBtnPressed]}
                    >
                        <Text style={styles.unitText}>{unit}</Text>
                        <Ionicons name="chevron-down" size={16} color="#111" />
                    </Pressable>
                </View>

                <Text style={styles.noLimitText}>No Limit</Text>

                <Pressable
                    onPress={() => setShowCompleteSetup(true)}
                    style={({ pressed }) => [styles.ctaBtn, pressed && styles.ctaBtnPressed]}
                >
                    <Text style={styles.ctaText}>Set Up Hotspot</Text>
                </Pressable>
            </ScrollView>

            <Modal
                visible={unitOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setUnitOpen(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setUnitOpen(false)}>
                    <Pressable style={styles.modalCard} onPress={() => null}>
                        {["GB", "MB"].map((u) => {
                            const active = unit === u;
                            return (
                                <Pressable
                                    key={u}
                                    onPress={() => {
                                        setUnit(u);
                                        setUnitOpen(false);
                                    }}
                                    style={({ pressed }) => [
                                        styles.modalItem,
                                        active && styles.modalItemActive,
                                        pressed && styles.modalItemPressed,
                                    ]}
                                >
                                    <Text style={[styles.modalItemText, active && styles.modalItemTextActive]}>
                                        {u}
                                    </Text>
                                    {active ? (
                                        <Ionicons name="checkmark" size={18} color={PRIMARY_BLUE} />
                                    ) : null}
                                </Pressable>
                            );
                        })}
                    </Pressable>
                </Pressable>
            </Modal>

            <Modal
                visible={showCompleteSetup}
                transparent
                animationType="slide"
                onRequestClose={() => setShowCompleteSetup(false)}
            >
                <View style={styles.completeOverlay}>
                    <Pressable style={styles.completeBackdrop} onPress={() => setShowCompleteSetup(false)} />

                    <View style={styles.completeSheet}>
                        <View style={styles.completeHeader}>
                            <View style={styles.completeHeaderText}>
                                <Text style={styles.completeTitle}>Complete Setup</Text>
                                <Text style={styles.completeSub}>Review and confirm your selections</Text>
                            </View>
                            <Pressable
                                onPress={() => setShowCompleteSetup(false)}
                                hitSlop={10}
                                style={({ pressed }) => [styles.closeBtn, pressed && styles.closeBtnPressed]}
                            >
                                <Ionicons name="close" size={20} color={PRIMARY_BLUE} />
                            </Pressable>
                        </View>

                        <View style={styles.summaryGrid}>
                            <View style={styles.summaryCard}>
                                <Text style={styles.summaryLabel}>Name</Text>
                                <Text style={styles.summaryValue}>{hotspotName}</Text>
                            </View>
                            <View style={styles.summaryCard}>
                                <Text style={styles.summaryLabel}>Price per MB</Text>
                                <Text style={styles.summaryValue}>{`${price.toFixed(3)}NGN/MB`}</Text>
                            </View>
                            <View style={styles.summaryCard}>
                                <Text style={styles.summaryLabel}>Daily Limit</Text>
                                <Text style={styles.summaryValue}>{`${dailyLimit || "0"} ${unit}`}</Text>
                            </View>
                            <View style={styles.summaryCard}>
                                <Text style={styles.summaryLabel}>Earnings Destination</Text>
                                <Text style={styles.summaryValueMuted}>Wallet</Text>
                            </View>
                        </View>

                        <View style={styles.completeActions}>
                            <Pressable
                                onPress={() => setShowCompleteSetup(false)}
                                style={({ pressed }) => [
                                    styles.backAction,
                                    pressed && styles.backActionPressed,
                                ]}
                            >
                                <Text style={styles.backActionText}>Go Back</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => {
                                    setShowCompleteSetup(false);
                                    setShowSetupSuccess(true);
                                }}
                                style={({ pressed }) => [
                                    styles.completeAction,
                                    pressed && styles.completeActionPressed,
                                ]}
                            >
                                <Text style={styles.completeActionText}>Complete</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={showSetupSuccess}
                transparent
                animationType="slide"
                onRequestClose={() => setShowSetupSuccess(false)}
            >
                <View style={styles.completeOverlay}>
                    <Pressable style={styles.completeBackdrop} onPress={() => setShowSetupSuccess(false)} />

                    <View style={styles.successSheet}>
                        <View style={styles.successHeader}>
                            <View style={{ flex: 1 }} />
                            <Pressable
                                onPress={() => setShowSetupSuccess(false)}
                                hitSlop={10}
                                style={({ pressed }) => [styles.closeBtn, pressed && styles.closeBtnPressed]}
                            >
                                <Ionicons name="close" size={20} color="#111" />
                            </Pressable>
                        </View>

                        <View style={styles.successIconWrap}>
                            <View style={styles.successIconOuter}>
                                <Ionicons name="checkmark" size={36} color="#16A34A" />
                            </View>
                        </View>

                        <Text style={styles.successTitle}>Setup Successful</Text>
                        <Text style={styles.successSub}>Your hotspot is now active!</Text>

                        <View style={styles.successActions}>
                            <Pressable
                                onPress={() => {
                                    setShowSetupSuccess(false);
                                    navigation.navigate("HostDashboard");
                                }}
                                style={({ pressed }) => [
                                    styles.backAction,
                                    pressed && styles.backActionPressed,
                                ]}
                            >
                                <Text style={styles.backActionText}>View Dashboard</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => {
                                    setShowSetupSuccess(false);
                                    navigation.navigate("HostHome");
                                }}
                                style={({ pressed }) => [
                                    styles.completeAction,
                                    pressed && styles.completeActionPressed,
                                ]}
                            >
                                <Text style={styles.completeActionText}>Go Home</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFFFFF" },
    scroll: { paddingHorizontal: 16, paddingTop: 90, paddingBottom: 40 },

    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 18,
    },
    backBtn: { marginTop: 6 },
    headerTitle: { fontSize: 18, fontWeight: "900", color: "#111" },
    saveText: { fontSize: 14, fontWeight: "900", color: PRIMARY_BLUE },

    label: { fontSize: 12, fontWeight: "900", color: "#111" },
    input: {
        marginTop: 10,
        height: 54,
        borderRadius: 10,
        backgroundColor: "#F1F5F9",
        paddingHorizontal: 14,
        fontSize: 14,
        fontWeight: "800",
        color: "#111",
    },
    helper: { marginTop: 10, fontSize: 11, fontWeight: "700", color: "#94A3B8" },

    sectionSpace: { marginTop: 22 },

    priceValue: {
        marginTop: 14,
        textAlign: "center",
        fontSize: 22,
        fontWeight: "900",
        color: "#111",
    },

    sliderWrap: { marginTop: 12 },
    slider: { width: "100%", height: 40 },

    sliderRangeRow: {
        marginTop: 8,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rangeText: { fontSize: 11, fontWeight: "800", color: "#111" },

    estimateText: {
        marginTop: 12,
        textAlign: "center",
        fontSize: 11,
        fontWeight: "800",
        color: "#94A3B8",
    },

    limitRow: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
    },
    limitInput: {
        flex: 1,
        height: 54,
        paddingHorizontal: 14,
        fontSize: 14,
        fontWeight: "900",
        color: "#111",
    },
    unitBtn: {
        width: 92,
        height: 54,
        borderLeftWidth: 1,
        borderLeftColor: "#E5E7EB",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        backgroundColor: "#FFFFFF",
    },
    unitBtnPressed: { backgroundColor: "#F8FAFC" },
    unitText: { fontSize: 14, fontWeight: "900", color: "#111" },

    noLimitText: { marginTop: 10, fontSize: 12, fontWeight: "900", color: "#111" },

    ctaBtn: {
        marginTop: 44,
        height: 54,
        borderRadius: 10,
        backgroundColor: PRIMARY_BLUE,
        alignItems: "center",
        justifyContent: "center",
    },
    ctaBtnPressed: { opacity: 0.92 },
    ctaText: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.25)",
        justifyContent: "center",
        paddingHorizontal: 30,
    },
    modalCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        overflow: "hidden",
    },
    modalItem: {
        paddingHorizontal: 14,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    modalItemActive: { backgroundColor: "#EFF6FF" },
    modalItemPressed: { backgroundColor: "#F8FAFC" },
    modalItemText: { fontSize: 13, fontWeight: "900", color: "#111" },
    modalItemTextActive: { color: PRIMARY_BLUE },

    completeOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.25)",
    },
    completeBackdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    completeSheet: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 16,
        paddingTop: 18,
        paddingBottom: 20,
        borderWidth: 1,
        borderColor: "#EEF2F7",
    },
    completeHeader: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 10,
    },
    completeHeaderText: { flex: 1 },
    completeTitle: { fontSize: 18, fontWeight: "900", color: "#111" },
    completeSub: { marginTop: 2, fontSize: 12, fontWeight: "700", color: "#94A3B8" },
    closeBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
    },
    closeBtnPressed: { backgroundColor: "#F8FAFC" },

    summaryGrid: {
        marginTop: 16,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    summaryCard: {
        width: "48%",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    summaryLabel: { fontSize: 11, fontWeight: "900", color: PRIMARY_BLUE },
    summaryValue: { marginTop: 6, fontSize: 12, fontWeight: "800", color: "#111" },
    summaryValueMuted: { marginTop: 6, fontSize: 12, fontWeight: "800", color: "#94A3B8" },

    completeActions: {
        marginTop: 16,
        flexDirection: "row",
        gap: 12,
    },
    backAction: {
        flex: 1,
        height: 48,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: PRIMARY_BLUE,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
    },
    backActionPressed: { backgroundColor: "#F8FAFC" },
    backActionText: { fontSize: 13, fontWeight: "900", color: PRIMARY_BLUE },
    completeAction: {
        flex: 1,
        height: 48,
        borderRadius: 10,
        backgroundColor: PRIMARY_BLUE,
        alignItems: "center",
        justifyContent: "center",
    },
    completeActionPressed: { opacity: 0.92 },
    completeActionText: { fontSize: 13, fontWeight: "900", color: "#FFFFFF" },

    successSheet: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 20,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        alignItems: "center",
    },
    successHeader: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 6,
    },
    successIconWrap: { marginTop: 10, marginBottom: 14 },
    successIconOuter: {
        width: 92,
        height: 92,
        borderRadius: 46,
        borderWidth: 4,
        borderColor: "#22C55E",
        backgroundColor: "#DFFFE6",
        alignItems: "center",
        justifyContent: "center",
    },
    successTitle: {
        fontSize: 22,
        fontWeight: "900",
        color: "#16A34A",
        textAlign: "center",
    },
    successSub: {
        marginTop: 6,
        fontSize: 12,
        fontWeight: "800",
        color: "#16A34A",
        textAlign: "center",
    },
    successActions: {
        marginTop: 18,
        flexDirection: "row",
        gap: 12,
        width: "100%",
    },
});
