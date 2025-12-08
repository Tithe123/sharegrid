import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import authService from "../../services/authService";
import { Colors } from "../common";

export default function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleReset = async () => {
        if (!email.trim()) {
            Alert.alert("Error", "Please enter your email address");
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert("Error", "Please enter a valid email address");
            return;
        }

        setIsLoading(true);
        try {
            await authService.forgotPassword(email);
            setEmailSent(true);
            Alert.alert(
                "Email Sent", 
                "Password reset instructions have been sent to your email address. Please check your inbox and follow the instructions to reset your password.",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.goBack()
                    }
                ]
            );
        } catch (error) {
            console.error("Forgot password error:", error);
            Alert.alert("Error", error.message || "Failed to send reset email. Please try again.");
        } finally {
            setIsLoading(false);
        }
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
                <Text style={styles.title}>Forgot Password</Text>
                <Text style={styles.subtitle}>
                    No worries! Enter your email address below and we will send you a code
                    to reset password.
                </Text>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    placeholder="Enter your email"
                    placeholderTextColor="#999"
                    style={styles.input}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>


            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.resetButton, isLoading && styles.resetButtonDisabled]} 
                    onPress={handleReset}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.resetText}>Reset Password</Text>
                    )}
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
        backgroundColor: Colors.primary,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    resetButtonDisabled: {
        backgroundColor: Colors.textTertiary,
        opacity: 0.6,
    },
    resetText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});