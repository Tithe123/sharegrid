import React, { useEffect, useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    TextInput,
    Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PRIMARY_BLUE = "#2563EB";
const PRIMARY_BLUE_PRESSED = "#3B82F6";

const HostKyc = ({ navigation }) => {
    const idOptions = useMemo(
        () => ["NIN", "Driver's License", "International Passport", "Voter's Card"],
        []
    );

    const [selectedId, setSelectedId] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [maskId, setMaskId] = useState(false);
    const [selectOpen, setSelectOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);

    const canContinue = Boolean(selectedId) && Boolean(idNumber.trim());

    useEffect(() => {
        if (!isProcessing) return;

        const timeoutId = setTimeout(() => {
            setSuccessOpen(true);
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, [isProcessing]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.brandRow}>
                    <Image
                        source={require("../../assets/logo2.png")}
                        style={styles.brandIcon}
                        resizeMode="contain"
                    />
                    <Text style={styles.brandText}>ShareGrid</Text>
                </View>

                <Text style={styles.title}>Set up your KYC</Text>

                <View style={styles.progressRow}>
                    <View style={styles.progressActive} />
                    <View
                        style={
                            isProcessing ? styles.progressActive : styles.progressInactive
                        }
                    />
                </View>
            </View>

            {isProcessing ? (
                <View style={styles.processingWrap}>
                    <Text style={styles.processingText}>Processing ........</Text>
                </View>
            ) : (
                <View style={styles.form}>
                    <Text style={styles.label}>Select Your ID</Text>
                    <Pressable
                        style={({ pressed }) => [
                            styles.selectBox,
                            pressed && styles.selectBoxPressed,
                        ]}
                        onPress={() => setSelectOpen(true)}
                    >
                        <Text style={styles.selectText}>{selectedId || "select"}</Text>
                        <Ionicons name="chevron-down" size={18} color="#111" />
                    </Pressable>

                    <Text style={[styles.label, styles.labelSpacing]}>ID Number</Text>
                    <View style={styles.inputWrap}>
                        <TextInput
                            value={idNumber}
                            onChangeText={setIdNumber}
                            placeholder="Enter your ID number"
                            placeholderTextColor="#9CA3AF"
                            style={styles.input}
                            secureTextEntry={maskId}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <Pressable
                            onPress={() => setMaskId((v) => !v)}
                            style={({ pressed }) => [
                                styles.eyeBtn,
                                pressed && styles.eyeBtnPressed,
                            ]}
                            hitSlop={10}
                        >
                            <Ionicons
                                name={maskId ? "eye-outline" : "eye-off-outline"}
                                size={18}
                                color="#9CA3AF"
                            />
                        </Pressable>
                    </View>

                    <Pressable
                        disabled={!canContinue}
                        style={({ pressed }) => [
                            styles.continueBtn,
                            !canContinue && styles.continueBtnDisabled,
                            pressed && canContinue && styles.continueBtnPressed,
                        ]}
                        onPress={() => {
                            if (!canContinue) return;
                            setIsProcessing(true);
                        }}
                    >
                        <Text style={styles.continueText}>...</Text>
                    </Pressable>
                </View>
            )}

            <Modal
                visible={selectOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setSelectOpen(false)}
            >
                <Pressable
                    style={styles.modalBackdrop}
                    onPress={() => setSelectOpen(false)}
                >
                    <Pressable style={styles.modalCard}>
                        {idOptions.map((opt) => {
                            const isActive = opt === selectedId;
                            return (
                                <Pressable
                                    key={opt}
                                    style={({ pressed }) => [
                                        styles.modalOption,
                                        isActive && styles.modalOptionActive,
                                        pressed && styles.modalOptionPressed,
                                    ]}
                                    onPress={() => {
                                        setSelectedId(opt);
                                        setSelectOpen(false);
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.modalOptionText,
                                            isActive && styles.modalOptionTextActive,
                                        ]}
                                    >
                                        {opt}
                                    </Text>
                                    {isActive ? (
                                        <Ionicons
                                            name="checkmark"
                                            size={18}
                                            color={PRIMARY_BLUE}
                                        />
                                    ) : null}
                                </Pressable>
                            );
                        })}
                    </Pressable>
                </Pressable>
            </Modal>

            <Modal
                visible={successOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setSuccessOpen(false)}
            >
                <View style={styles.successBackdrop}>
                    <View style={styles.successSheet}>
                        <Pressable
                            onPress={() => setSuccessOpen(false)}
                            hitSlop={10}
                            style={({ pressed }) => [
                                styles.successClose,
                                pressed && styles.successClosePressed,
                            ]}
                        >
                            <Ionicons name="close" size={22} color="#111" />
                        </Pressable>

                        <View style={styles.successIconWrap}>
                            <Ionicons name="checkmark" size={34} color="#16A34A" />
                        </View>

                        <Text style={styles.successTitle}>KYC Successful</Text>
                        <Text style={styles.successSubtitle}>
                            Your Account is now active!
                        </Text>

                        <Pressable
                            style={({ pressed }) => [
                                styles.successBtn,
                                pressed && styles.successBtnPressed,
                            ]}
                            onPress={() => {
                                setSuccessOpen(false);
                                setIsProcessing(false);
                                navigation.navigate("HostHome");
                            }}
                        >
                            <Text style={styles.successBtnText}>Go Home</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 24,
    },
    header: {
        paddingTop: 130,
        alignItems: "center",
    },
    brandRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    brandIcon: {
        width: 40,
        height: 40,
    },
    brandText: {
        color: PRIMARY_BLUE,
        fontSize: 16,
        fontWeight: "700",
    },
    title: {
        marginTop: 26,
        fontSize: 20,
        fontWeight: "800",
        color: "#111",
    },
    progressRow: {
        flexDirection: "row",
        width: 180,
        gap: 10,
        marginTop: 18,
    },
    progressActive: {
        height: 5,
        flex: 1,
        borderRadius: 999,
        backgroundColor: PRIMARY_BLUE,
    },
    progressInactive: {
        height: 5,
        flex: 1,
        borderRadius: 999,
        backgroundColor: "#E5E7EB",
    },
    form: {
        marginTop: 46,
    },
    processingWrap: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 48,
    },
    processingText: {
        fontSize: 22,
        fontWeight: "900",
        color: "#111",
    },
    label: {
        fontSize: 12,
        color: "#6B7280",
        fontWeight: "600",
        marginBottom: 8,
    },
    labelSpacing: {
        marginTop: 14,
    },
    selectBox: {
        height: 44,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    selectBoxPressed: {
        borderColor: "#CBD5E1",
        backgroundColor: "#F8FAFC",
    },
    selectText: {
        fontSize: 13,
        color: "#111",
        fontWeight: "500",
        textTransform: "lowercase",
    },
    inputWrap: {
        height: 44,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        flex: 1,
        fontSize: 13,
        color: "#111",
        fontWeight: "500",
        paddingVertical: 0,
    },
    eyeBtn: {
        paddingHorizontal: 6,
        paddingVertical: 6,
    },
    eyeBtnPressed: {
        opacity: 0.7,
    },
    continueBtn: {
        marginTop: 26,
        height: 48,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: PRIMARY_BLUE,
    },
    continueBtnPressed: {
        backgroundColor: PRIMARY_BLUE_PRESSED,
    },
    continueBtnDisabled: {
        backgroundColor: "#93C5FD",
    },
    continueText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "800",
        letterSpacing: 2,
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    modalCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        paddingVertical: 6,
        overflow: "hidden",
    },
    modalOption: {
        paddingHorizontal: 14,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    modalOptionActive: {
        backgroundColor: "#EFF6FF",
    },
    modalOptionPressed: {
        backgroundColor: "#DBEAFE",
    },
    modalOptionText: {
        fontSize: 14,
        color: "#111",
        fontWeight: "600",
    },
    modalOptionTextActive: {
        color: PRIMARY_BLUE,
    },

    successBackdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.35)",
        justifyContent: "flex-end",
    },
    successSheet: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 24,
        paddingTop: 18,
        paddingBottom: 26,
        alignItems: "center",
    },
    successClose: {
        position: "absolute",
        right: 18,
        top: 14,
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
    },
    successClosePressed: {
        backgroundColor: "#F3F4F6",
    },
    successIconWrap: {
        width: 82,
        height: 82,
        borderRadius: 41,
        borderWidth: 3,
        borderColor: "#22C55E",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 16,
    },
    successTitle: {
        marginTop: 14,
        fontSize: 18,
        fontWeight: "900",
        color: "#16A34A",
    },
    successSubtitle: {
        marginTop: 4,
        fontSize: 12,
        fontWeight: "700",
        color: "#16A34A",
        opacity: 0.9,
    },
    successBtn: {
        marginTop: 18,
        height: 52,
        width: "100%",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: PRIMARY_BLUE,
    },
    successBtnPressed: {
        backgroundColor: PRIMARY_BLUE_PRESSED,
    },
    successBtnText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "800",
    },
});

export default HostKyc;
