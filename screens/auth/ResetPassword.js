import React, { useState, useEffect } from "react";
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

export default function ResetPassword({ navigation, route }) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [secureText, setSecureText] = useState(true);
    const [secureConfirmText, setSecureConfirmText] = useState(true);
    const [isTokenValid, setIsTokenValid] = useState(false);

    // Get tokens from route params (from deep link)
    const { accessToken, refreshToken } = route.params || {};

    useEffect(() => {
        // Verify the reset token when component mounts
        if (accessToken && refreshToken) {
            verifyToken();
        } else {
            Alert.alert(
                "Invalid Link",
                "This reset password link is invalid or expired.",
                [{ text: "OK", onPress: () => navigation.navigate("Login") }]
            );
        }
    }, [accessToken, refreshToken]);

    const verifyToken = async () => {
        try {
            await authService.verifyResetToken(accessToken, refreshToken);
            setIsTokenValid(true);
        } catch (error) {
            console.error("Token verification error:", error);
            Alert.alert(
                "Invalid Link",
                "This reset password link is invalid or expired.",
                [{ text: "OK", onPress: () => navigation.navigate("Login") }]
            );
        }
    };

    const validatePassword = (password) => {
        if (password.length < 8) {
            return "Password must be at least 8 characters long";
        }
        if (!/(?=.*[a-z])/.test(password)) {
            return "Password must contain at least one lowercase letter";
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            return "Password must contain at least one uppercase letter";
        }
        if (!/(?=.*\d)/.test(password)) {
            return "Password must contain at least one number";
        }
        return null;
    };

    const handleResetPassword = async () => {
        if (!newPassword.trim()) {
            Alert.alert("Error", "Please enter a new password");
            return;
        }

        if (!confirmPassword.trim()) {
            Alert.alert("Error", "Please confirm your password");
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        const passwordError = validatePassword(newPassword);
        if (passwordError) {
            Alert.alert("Error", passwordError);
            return;
        }

        setIsLoading(true);
        try {
            await authService.resetPassword(newPassword);
            Alert.alert(
                "Success",
                "Your password has been reset successfully. You can now sign in with your new password.",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate("Login")
                    }
                ]
            );
        } catch (error) {
            console.error("Reset password error:", error);
            Alert.alert("Error", error.message || "Failed to reset password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isTokenValid) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={styles.loadingText}>Verifying reset link...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate("Login")}
            >
                <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>

            <View style={styles.headerContainer}>
                <Text style={styles.title}>Reset Password</Text>
                <Text style={styles.subtitle}>
                    Enter your new password below. Make sure it's strong and secure.
                </Text>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>New Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            placeholder="Enter new password"
                            placeholderTextColor="#999"
                            style={styles.passwordInput}
                            secureTextEntry={secureText}
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setSecureText(!secureText)}
                        >
                            <Ionicons
                                name={secureText ? "eye-off" : "eye"}
                                size={20}
                                color="#999"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirm Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            placeholder="Confirm new password"
                            placeholderTextColor="#999"
                            style={styles.passwordInput}
                            secureTextEntry={secureConfirmText}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setSecureConfirmText(!secureConfirmText)}
                        >
                            <Ionicons
                                name={secureConfirmText ? "eye-off" : "eye"}
                                size={20}
                                color="#999"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.passwordRequirements}>
                    <Text style={styles.requirementsTitle}>Password Requirements:</Text>
                    <Text style={styles.requirementText}>• At least 8 characters long</Text>
                    <Text style={styles.requirementText}>• Contains uppercase and lowercase letters</Text>
                    <Text style={styles.requirementText}>• Contains at least one number</Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.resetButton, isLoading && styles.resetButtonDisabled]}
                    onPress={handleResetPassword}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.resetText}>Update Password</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
        paddingHorizontal: 20,
    },
    centerContent: {
        justifyContent: "center",
        alignItems: "center",
    },
    backButton: {
        marginTop: 60,
        marginBottom: 40,
    },
    headerContainer: {
        alignItems: "center",
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: Colors.textPrimary,
        marginBottom: 15,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
        lineHeight: 22,
        textAlign: "center",
        paddingHorizontal: 10,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: Colors.textSecondary,
    },
    formContainer: {
        flex: 1,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        color: Colors.textPrimary,
        fontSize: 16,
        marginBottom: 8,
        fontWeight: "500",
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#e9ecef",
    },
    passwordInput: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 12,
        color: Colors.textPrimary,
    },
    eyeIcon: {
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
    passwordRequirements: {
        marginTop: 20,
        padding: 16,
        backgroundColor: "#f8f9fa",
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: Colors.primary,
    },
    requirementsTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: Colors.textPrimary,
        marginBottom: 8,
    },
    requirementText: {
        fontSize: 13,
        color: Colors.textSecondary,
        marginBottom: 4,
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
