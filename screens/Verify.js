import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState("");

    const handleReset = () => {

        console.log("Reset link sent to:", email);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>


            <View style={styles.headerContainer}>
                <Text style={styles.title}>Verify Account</Text>
                <Text style={styles.subtitle}>
                    Code has been sent to Ovieetete@gmail.com
                </Text>
                <Text style={styles.subtitle}>
                    Enter the code to verify your account
                </Text>
                <Text style={[styles.subtitle, { marginTop: 10 }]}>
                    Didn’t Receive Code? <Text style={{ color: "#94A3B8" }}>Resend Code</Text>
                </Text>
                <Text style={[styles.subtitle, { marginTop: 5 }]}>
                    Resend code in 00:59
                </Text>

            </View>


            <View style={styles.inputContainer}>
                <Text style={styles.label}>Enter Code</Text>
                <TextInput
                    placeholder="4 Digit code"
                    placeholderTextColor="#999"
                    style={styles.input}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>


            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                    <Text style={styles.resetText}>Reset Password</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FB",
        paddingHorizontal: 20,
    },
    backButton: {
        marginTop: 60,
        marginBottom: 40,
    },
    headerContainer: {
        alignItems: "center",
        marginBottom: 50,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#000",
        marginBottom: 15,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        lineHeight: 22,
        textAlign: "center",
        paddingHorizontal: 10,
    },
    inputContainer: {
        flex: 1,
    },
    label: {
        color: "#000",
        fontSize: 16,
        marginBottom: 8,
        fontWeight: "500",
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: "#e9ecef",
        color: "#000",
    },
    buttonContainer: {
        marginBottom: 40,
    },
    resetButton: {
        backgroundColor: "#2979FF",
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    resetText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});