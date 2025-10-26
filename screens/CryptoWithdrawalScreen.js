import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function CryptoWithdrawalScreen() {
    const navigation = useNavigation();
    const [showBalance, setShowBalance] = useState(true);
    const [destinationAddress, setDestinationAddress] = useState("");

    const balance = "5,334.90";

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="chevron-left" size={22} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Crypto Withdrawal</Text>
                <View style={{ width: 22 }} />
            </View>

            <TouchableOpacity style={styles.proceedButton}>
                <Text style={styles.proceedButtonText}>Proceed to Withdraw</Text>
            </TouchableOpacity>


            <LinearGradient
                colors={["#1A56D6", "#0056D2"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.balanceCard}
            >
                <View style={styles.balanceHeader}>
                    <Text style={styles.balanceLabel}>Available Balance</Text>
                    <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
                        <Ionicons
                            name={showBalance ? "eye-outline" : "eye-off-outline"}
                            size={16}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.balanceRow}>
                    <Text style={styles.balanceSymbol}>₦</Text>
                    <Text style={styles.balanceValue}>
                        {showBalance ? balance : "••••••"}
                    </Text>
                    <Text style={styles.balanceCurrency}>NGN</Text>
                </View>
            </LinearGradient>


            <View style={styles.addressContainer}>
                <Text style={styles.addressTitle}>Destination Address</Text>

                <View style={styles.addressBox}>
                    <Text style={styles.addressInput}>
                        {destinationAddress || "Enter your crypto wallet address"}
                    </Text>

                    <View style={styles.addressActions}>
                        <TouchableOpacity style={styles.actionButton}>
                            <Feather name="copy" size={18} color="#0056D2" />
                            <Text style={styles.actionText}>Paste</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionButton}>
                            <Feather name="maximize" size={18} color="#0056D2" />
                            <Text style={styles.actionText}>Scan</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f5f7fb", padding: 20 },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000",
    },
    proceedButton: {
        backgroundColor: "#0056D2",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 20,
    },
    proceedButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
    balanceCard: {
        borderRadius: 16,
        padding: 20,
        marginBottom: 25,
    },
    balanceHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    balanceLabel: {
        color: "rgba(255,255,255,0.9)",
        fontSize: 14,
        fontWeight: "500",
    },
    balanceRow: {
        flexDirection: "row",
        alignItems: "flex-end",
    },
    balanceSymbol: {
        color: "#fff",
        fontSize: 18,
        marginRight: 4,
        marginBottom: 2,
    },
    balanceValue: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "800",
    },
    balanceCurrency: {
        color: "#E0E7FF",
        fontSize: 12,
        marginLeft: 6,
        marginBottom: 4,
    },
    addressContainer: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: "#f0f0f0",
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
        padding: 16,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    addressInput: {
        fontSize: 14,
        color: "#64748b",
        marginBottom: 15,
        minHeight: 20,
    },
    addressActions: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f4ff",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#d0dcff",
        flex: 0.48,
        justifyContent: "center",
        gap: 6,
    },
    actionText: {
        color: "#0056D2",
        fontSize: 14,
        fontWeight: "600",
    },
});