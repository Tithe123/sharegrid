import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const PRIMARY_BLUE = "#2563EB";
const PRIMARY_BLUE_PRESSED = "#3B82F6";

export default function CreateBeneficiaryScreen() {
    const navigation = useNavigation();
    
    const [accountNumber, setAccountNumber] = useState("");
    const [selectedBank, setSelectedBank] = useState("");

    const handleSaveBeneficiary = () => {
        console.log("Saving beneficiary:", { accountNumber, selectedBank });
        
     
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
         
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Feather name="chevron-left" size={22} color="#000" />
                </Pressable>
                <Text style={styles.headerTitle}>Create Beneficiary</Text>
                <View style={{ width: 22 }} />
            </View>

           
            <View style={styles.inputsContainer}>
             
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Bank</Text>
                    <View style={styles.inputWithIcon}>
                        <TextInput
                            style={styles.input}
                            placeholder="Select bank"
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
                        <Pressable
                            style={({ pressed }) => [
                                styles.pasteButton,
                                pressed && styles.pasteButtonPressed,
                            ]}
                        >
                            <Text style={styles.pasteText}>Paste</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

            <View style={styles.spacer} />

            <Pressable
                style={({ pressed }) => [
                    styles.saveButton,
                    pressed && styles.saveButtonPressed,
                ]}
                onPress={handleSaveBeneficiary}
            >
                <Text style={styles.saveButtonText}>SAVE BENEFICIARY</Text>
            </Pressable>
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
        justifyContent: "space-between",
        marginBottom: 40,
        marginTop: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000",
        textAlign: "flex-start",
        flex: 1,

    },
    inputsContainer: {
        gap: 25,
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
        backgroundColor: "#DBEAFE",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        gap: 4,
    },
    pasteButtonPressed: {
        backgroundColor: "#BFDBFE",
    },
    pasteText: {
        color: PRIMARY_BLUE,
        fontSize: 12,
        fontWeight: "600",
    },
    spacer: {
        flex: 1,
    },
    saveButton: {
        backgroundColor: PRIMARY_BLUE,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 18,
        borderRadius: 12,
        marginBottom: 10,
    },
    saveButtonPressed: {
        backgroundColor: PRIMARY_BLUE_PRESSED,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        textTransform: "uppercase",
    },
});