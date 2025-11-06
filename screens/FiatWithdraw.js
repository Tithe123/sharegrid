import React, { useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Modal,
    Animated,
    TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function BankWithdrawalScreen() {
    const navigation = useNavigation();
    const [showBalance, setShowBalance] = useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    
    const [accountNumber, setAccountNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [selectedBank, setSelectedBank] = useState("");

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(200)).current;

    const balance = "5,334.90";

    
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
                <Text style={styles.headerTitle}>Proceed to Withdraw</Text>
                <View style={{ width: 22 }} />
            </View>

            <LinearGradient
                colors={["#1A56D6", "#0056D2"]}
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
                    <Text style={styles.balanceCurrency}>NGN</Text>
                </View>
            </LinearGradient>

        
            <View style={styles.columnHeaders}>
                <Text style={styles.columnTitle}>Recipient Details</Text>
                <TouchableOpacity onPress={() => navigation.navigate("SavedBeneficiaries")}>
                    <Text style={styles.columnTitle}>Beneficiaries  <Feather name="chevron-right" size={15} color="#000" /></Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputsContainer}>
              
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Choose Bank</Text>
                    <View style={styles.inputWithIcon}>
                        <TextInput
                            style={styles.input}
                            placeholder="Select your bank"
                            placeholderTextColor="#64748b"
                            value={selectedBank}
                            onChangeText={setSelectedBank}
                        />
                        <Feather name="chevron-down" size={20} color="#64748b" />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Account Number</Text>
                    <View style={styles.inputWithIcon}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter account number"
                            placeholderTextColor="#64748b"
                            value={accountNumber}
                            onChangeText={setAccountNumber}
                            keyboardType="numeric"
                        />
                        <TouchableOpacity style={styles.pasteButton}>
                            <Text style={styles.pasteText}>Paste</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Amount</Text>
                    <View style={styles.amountInputContainer}>
                        <TextInput
                            style={styles.amountInput}
                            placeholder="0.00"
                            placeholderTextColor="#64748b"
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType="decimal-pad"
                        />
                        <Text style={styles.amountHint}>
                            Enter amount between NGN 1,000.00 and NGN 4,999,000.00
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.spacer} />

        
            <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
                <Feather name="shield" size={20} color="#fff" style={styles.shieldIcon} />
                <Text style={styles.proceedButtonText}>PROCEED</Text>
            </TouchableOpacity>

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
                            <Text style={styles.sheetTitle}>Withdrawal Successful</Text>
                        </View>

                        <View style={styles.sheetButtonsRow}>
                            <TouchableOpacity
                                style={[styles.sheetBtn, styles.sheetBtnOutline, { borderColor: '#0056D2' }]}
                                onPress={() => closeModal(setShowSuccessModal)}
                            >
                                <Text style={[styles.sheetBtnOutlineText, { color: '#0056D2' }]}>Transaction History</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.sheetBtn, styles.sheetBtnPrimary]}
                                onPress={() => {
                                    closeModal(setShowSuccessModal);
                                    navigation.goBack();
                                }}
                            >
                                <Text style={styles.sheetBtnPrimaryText}>Save Beneficiary</Text>
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
                                style={[styles.sheetBtn, styles.sheetBtnOutline, { borderColor: '#0056D2' }]}
                                onPress={() => {
                                    closeModal(setShowFailedModal);
                                }}
                            >
                                <Text style={[styles.sheetBtnOutlineText, { color: '#0056D2' }]}>Retry</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.sheetBtn, { backgroundColor: '#0056D2' }]}
                                onPress={() => {
                                    closeModal(setShowFailedModal);
                                    navigation.goBack();
                                }}
                            >
                                <Text style={[styles.sheetBtnPrimaryText, { color: '#fff' }]}>Go Home</Text>
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
    columnHeaders: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    columnTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
    },
    inputsContainer: {
        gap: 20,
    },
    inputGroup: {
        gap: 8,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: "#000",
    },
    inputWithIcon: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#000",
    },
    pasteButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f4ff",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        gap: 4,
    },
    pasteText: {
        color: "#0056D2",
        fontSize: 12,
        fontWeight: "600",
    },
    amountInputContainer: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    amountInput: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000",
        marginBottom: 8,
    },
    amountHint: {
        fontSize: 12,
        color: "#64748b",
        lineHeight: 16,
    },
    spacer: {
        flex: 1,
    },
    proceedButton: {
        backgroundColor: "#0056D2",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 18,
        borderRadius: 12,
        marginBottom: 10,
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

    // Modal Styles
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
        marginHorizontal: 6 
    },
    sheetBtnPrimary: { 
        backgroundColor: '#0056D2' 
    },
    sheetBtnPrimaryText: { 
        color: "#fff", 
        fontWeight: "700" 
    },
    sheetBtnOutline: { 
        backgroundColor: "#fff", 
        borderWidth: 1, 
        borderColor: "#E6EEF9" 
    },
    sheetBtnOutlineText: { 
        color: "#111827", 
        fontWeight: "700" 
    },
});