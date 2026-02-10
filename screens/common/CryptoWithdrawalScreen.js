import React, { useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    TouchableOpacity,
    TextInput,
    Modal,
    Animated,
    TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const PRIMARY_BLUE = "#2563EB";
const PRIMARY_BLUE_PRESSED = "#3B82F6";

export default function CryptoWithdrawalScreen() {
    const navigation = useNavigation();
    const [showBalance, setShowBalance] = useState(true);
    const [destinationAddress, setDestinationAddress] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(200)).current;

    const balance = "1,245.75";

    const openModal = (setter) => {
        translateY.setValue(200);
        fadeAnim.setValue(0);
        setter(true);
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const closeModal = (setter) => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 180,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 200,
                duration: 180,
                useNativeDriver: true,
            }),
        ]).start(() => setter(false));
    };

    const handleProceed = () => {
        openModal(setShowFailedModal);
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="chevron-left" size={22} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Crypto Withdrawal</Text>
                <View style={{ width: 22 }} />
            </View>

            <LinearGradient
                colors={[PRIMARY_BLUE_PRESSED, PRIMARY_BLUE]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.balanceCard}
            >
                <View style={styles.balanceHeader}>
                    <View style={styles.balanceLabelRow}>
                        <Text style={styles.balanceLabel}>Available Balance</Text>
                        <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={() => setShowBalance(!showBalance)}
                        >
                            <Ionicons
                                name={showBalance ? "eye-outline" : "eye-off-outline"}
                                size={16}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.balanceRow}>
                    <Text style={styles.balanceValue}>
                        {showBalance ? balance : "••••••"}
                    </Text>
                    <Text style={styles.balanceCurrency}>USDC</Text>
                </View>
            </LinearGradient>

            <View style={styles.addressContainer}>
                <Text style={styles.addressTitle}>Destination Address</Text>

                <View style={styles.addressBox}>
                    <View style={styles.addressInputRow}>
                        <TextInput
                            style={styles.addressInput}
                            placeholder="Enter address"
                            placeholderTextColor="#64748b"
                            value={destinationAddress}
                            onChangeText={setDestinationAddress}
                            multiline={false}
                        />
                        <View style={styles.iconRow}>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.iconButton,
                                    pressed && styles.iconButtonPressed,
                                ]}
                            >
                                <Text>Paste</Text>
                            </Pressable>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.iconButton,
                                    pressed && styles.iconButtonPressed,
                                ]}
                            >
                                <Feather name="maximize" size={18} color={PRIMARY_BLUE} />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.spacer} />

            <Pressable
                style={({ pressed }) => [
                    styles.proceedButton,
                    pressed && styles.proceedButtonPressed,
                ]}
                onPress={handleProceed}
            >
                <Feather name="shield" size={20} color="#fff" style={styles.shieldIcon} />
                <Text style={styles.proceedButtonText}>PROCEED</Text>
            </Pressable>

            <Modal transparent visible={showSuccessModal} animationType="none">
                <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
                    <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
                        <View style={styles.sheetTop}>
                            <TouchableOpacity onPress={() => closeModal(setShowSuccessModal)}>
                                <Feather name="x" size={20} color="#111827" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.sheetCenter}>
                            <View style={[styles.circleIcon, { backgroundColor: '#dcfce7', borderColor: '#16a34a' }]}>
                                <Feather name="check" size={28} color="#16a34a" />
                            </View>
                            <Text style={styles.sheetTitle}>Withdrawal Successful!</Text>
                        </View>

                        <View style={styles.sheetButtonsRow}>
                            <TouchableOpacity
                                style={[styles.sheetBtn, styles.sheetBtnOutline, { borderColor: PRIMARY_BLUE }]}
                                onPress={() => closeModal(setShowSuccessModal)}
                            >
                                <Text style={[styles.sheetBtnOutlineText, { color: PRIMARY_BLUE }]}>Transaction History</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.sheetBtn, styles.sheetBtnPrimary]}
                                onPress={() => {
                                    closeModal(setShowSuccessModal);
                                    navigation.goBack();
                                }}
                            >
                                <Text style={styles.sheetBtnPrimaryText}>Go Home</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </Animated.View>
            </Modal>

            <Modal transparent visible={showFailedModal} animationType="none">
                <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
                    <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
                        <View style={styles.sheetTop}>
                            <TouchableOpacity onPress={() => closeModal(setShowFailedModal)}>
                                <Feather name="x" size={20} color="#111827" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.sheetCenter}>
                            <View style={[styles.circleIcon, { backgroundColor: '#fee2e2', borderColor: '#ef4444' }]}>
                                <Feather name="x" size={28} color="#ef4444" />
                            </View>
                            <Text style={styles.sheetTitle}>Withdrawal Failed</Text>
                        </View>

                        <View style={styles.sheetButtonsRow}>
                            <TouchableOpacity
                                style={[styles.sheetBtn, styles.sheetBtnOutline, { borderColor: PRIMARY_BLUE }]}
                                onPress={() => {
                                    closeModal(setShowFailedModal);
                                }}
                            >
                                <Text style={[styles.sheetBtnOutlineText, { color: PRIMARY_BLUE }]}>Go Home </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.sheetBtn, { backgroundColor: PRIMARY_BLUE }]}
                                onPress={() => {
                                    closeModal(setShowFailedModal);
                                    navigation.goBack();
                                }}
                            >
                                <Text style={[styles.sheetBtnPrimaryText, { color: '#fff' }]}>Retry</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </Animated.View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f7fb",
        padding: 20,
        marginTop: 40,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 25,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000",
        marginLeft: 15,
    },
    balanceCard: {
        borderRadius: 16,
        padding: 20,
        marginBottom: 25,
    },
    balanceHeader: {
        marginBottom: 10,
    },
    balanceLabelRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    balanceLabel: {
        color: "rgba(255,255,255,0.9)",
        fontSize: 14,
        fontWeight: "500",
        marginRight: 8,
    },
    eyeButton: {
        padding: 4,
    },
    balanceRow: {
        flexDirection: "row",
        alignItems: "flex-end",
    },
    balanceValue: {
        color: "#fff",
        fontSize: 32,
        fontWeight: "800",
        marginRight: 8,
    },
    balanceCurrency: {
        color: "#E0E7FF",
        fontSize: 12,
        fontWeight: "600",
        marginBottom: 8,
    },
    addressContainer: {
        padding: 20,
    },
    addressTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
        marginBottom: 15,
    },
    addressBox: {
        backgroundColor: "#f8fafc",
        borderRadius: 12,
        padding: 12,
    },
    addressInputRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    addressInput: {
        flex: 1,
        fontSize: 14,
        color: "#64748b",
        marginRight: 12,
        height: 20,
    },
    iconRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    iconButton: {
        backgroundColor: "#DBEAFE",
        padding: 8,
        borderRadius: 6,
    },
    iconButtonPressed: {
        backgroundColor: "#BFDBFE",
    },
    spacer: {
        flex: 1,
    },
    proceedButton: {
        backgroundColor: PRIMARY_BLUE,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 18,
        borderRadius: 12,
        marginBottom: 10,
    },
    proceedButtonPressed: {
        backgroundColor: PRIMARY_BLUE_PRESSED,
    },
    shieldIcon: {
        marginRight: 10,
    },
    proceedButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        textTransform: "uppercase",
    },

    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.36)"
    },
    sheet: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        padding: 26
    },
    sheetTop: {
        alignItems: "flex-end"
    },
    sheetCenter: {
        alignItems: "center",
        marginVertical: 8
    },
    circleIcon: {
        width: 64,
        height: 64,
        borderRadius: 34,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        marginBottom: 10
    },
    sheetTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
        marginTop: 6
    },
    sheetSubText: {
        fontSize: 14,
        color: "#6B7280",
        marginTop: 4,
        textAlign: "center"
    },
    sheetButtonsRow: {
        flexDirection: "row",
        marginTop: 18,
        justifyContent: "space-between"
    },
    sheetBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginHorizontal: 6,
    },
    sheetBtnPrimary: {
        backgroundColor: PRIMARY_BLUE,
    },
    sheetBtnPrimaryText: {
        color: "#fff",
        fontWeight: "700",
    },
    sheetBtnOutline: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#E6EEF9",
    },
    sheetBtnOutlineText: {
        color: "#111827",
        fontWeight: "700",
    },
});