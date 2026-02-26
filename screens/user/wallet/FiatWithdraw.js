import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Modal,
    Animated,
    TouchableWithoutFeedback,
    FlatList,
    ActivityIndicator,
    Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001/api";

export default function BankWithdrawalScreen({ route }) {
    const navigation = useNavigation();
    const { profileId } = route?.params || {};
    
    const [showBalance, setShowBalance] = useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const [showBankPicker, setShowBankPicker] = useState(false);
    
    const [accountNumber, setAccountNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [selectedBank, setSelectedBank] = useState(null);
    const [banks, setBanks] = useState([]);
    const [accountName, setAccountName] = useState("");
    const [balance, setBalance] = useState("0.00");
    const [loading, setLoading] = useState(false);
    const [verifyingAccount, setVerifyingAccount] = useState(false);
    const [loadingBanks, setLoadingBanks] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(200)).current;

    useEffect(() => {
        loadBanks();
        loadBalance();
    }, []);

    useEffect(() => {
        if (accountNumber.length === 10 && selectedBank) {
            resolveAccount();
        } else {
            setAccountName("");
        }
    }, [accountNumber, selectedBank]);

    const loadBalance = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/wallet/fiat/${profileId}/balance`
            );
            if (response.data.success) {
                const bal = parseFloat(response.data.data.balance || 0);
                setBalance(bal.toLocaleString("en-NG", { minimumFractionDigits: 2 }));
            }
        } catch (error) {
            console.error("Error loading balance:", error);
        }
    };

    const loadBanks = async () => {
        try {
            setLoadingBanks(true);
            const response = await axios.get(`${API_URL}/wallet/fiat/banks`);
            if (response.data.success) {
                setBanks(response.data.data);
            }
        } catch (error) {
            console.error("Error loading banks:", error);
        } finally {
            setLoadingBanks(false);
        }
    };

    const resolveAccount = async () => {
        try {
            setVerifyingAccount(true);
            const response = await axios.post(
                `${API_URL}/wallet/fiat/resolve-account`,
                {
                    accountNumber,
                    bankCode: selectedBank.code
                }
            );
            if (response.data.success) {
                setAccountName(response.data.data.account_name);
            }
        } catch (error) {
            console.error("Error resolving account:", error);
            setAccountName("");
        } finally {
            setVerifyingAccount(false);
        }
    };

    
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

    const handleProceed = async () => {
        if (!selectedBank || !accountNumber || !amount) {
            Alert.alert("Error", "Please fill all fields");
            return;
        }

        if (!accountName) {
            Alert.alert("Error", "Please wait for account verification");
            return;
        }

        const withdrawAmount = parseFloat(amount);
        const currentBalance = parseFloat(balance.replace(/,/g, ""));

        if (withdrawAmount < 1000) {
            Alert.alert("Error", "Minimum withdrawal is ₦1,000");
            return;
        }

        if (withdrawAmount > currentBalance) {
            Alert.alert("Error", "Insufficient balance");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(
                `${API_URL}/wallet/fiat/${profileId}/withdraw`,
                {
                    amount: withdrawAmount,
                    accountNumber,
                    bankCode: selectedBank.code
                }
            );

            if (response.data.success) {
                openModal(setShowSuccessModal);
            }
        } catch (error) {
            console.error("Withdrawal error:", error);
            openModal(setShowFailedModal);
        } finally {
            setLoading(false);
        }
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
                    <TouchableOpacity 
                        style={styles.inputWithIcon}
                        onPress={() => setShowBankPicker(true)}
                    >
                        <Text style={[styles.input, !selectedBank && { color: "#64748b" }]}>
                            {selectedBank ? selectedBank.name : "Select your bank"}
                        </Text>
                        <Feather name="chevron-down" size={20} color="#64748b" />
                    </TouchableOpacity>
                </View>

                {accountName ? (
                    <View style={styles.accountNameBox}>
                        <Ionicons name="checkmark-circle" size={18} color="#16a34a" />
                        <Text style={styles.accountNameText}>{accountName}</Text>
                    </View>
                ) : verifyingAccount ? (
                    <View style={styles.accountNameBox}>
                        <ActivityIndicator size="small" color="#0056D2" />
                        <Text style={styles.accountNameText}>Verifying account...</Text>
                    </View>
                ) : null}

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

        
            <TouchableOpacity 
                style={[styles.proceedButton, loading && styles.disabledButton]} 
                onPress={handleProceed}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" size="small" />
                ) : (
                    <>
                        <Feather name="shield" size={20} color="#fff" style={styles.shieldIcon} />
                        <Text style={styles.proceedButtonText}>PROCEED</Text>
                    </>
                )}
            </TouchableOpacity>

            {/* Bank Picker Modal */}
            <Modal transparent visible={showBankPicker} animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.bankPickerSheet}>
                        <View style={styles.sheetTop}>
                            <Text style={styles.sheetTitle}>Select Bank</Text>
                            <TouchableOpacity onPress={() => setShowBankPicker(false)}>
                                <Feather name="x" size={20} color="#111827" />
                            </TouchableOpacity>
                        </View>
                        {loadingBanks ? (
                            <ActivityIndicator size="large" color="#0056D2" style={{ marginTop: 20 }} />
                        ) : (
                            <FlatList
                                data={banks}
                                keyExtractor={(item) => item.code}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.bankItem}
                                        onPress={() => {
                                            setSelectedBank(item);
                                            setShowBankPicker(false);
                                        }}
                                    >
                                        <Text style={styles.bankItemText}>{item.name}</Text>
                                        {selectedBank?.code === item.code && (
                                            <Ionicons name="checkmark" size={20} color="#0056D2" />
                                        )}
                                    </TouchableOpacity>
                                )}
                                style={{ maxHeight: 400 }}
                            />
                        )}
                    </View>
                </View>
            </Modal>

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
    disabledButton: {
        backgroundColor: "#999",
    },
    accountNameBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#dcfce7",
        padding: 12,
        borderRadius: 8,
        gap: 8,
        marginBottom: 10,
    },
    accountNameText: {
        color: "#16a34a",
        fontSize: 14,
        fontWeight: "600",
    },
    bankPickerSheet: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        padding: 20,
        maxHeight: "70%",
    },
    bankItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    bankItemText: {
        fontSize: 16,
        color: "#111827",
    },
});