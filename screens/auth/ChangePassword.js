import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Alert,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import authService from "../../services/authService";
import { Colors } from "../common";

export default function ChangePassword({ navigation }) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [secureCurrentText, setSecureCurrentText] = useState(true);
    const [secureNewText, setSecureNewText] = useState(true);
    const [secureConfirmText, setSecureConfirmText] = useState(true);

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

    const handleChangePassword = async () => {
        if (!currentPassword.trim()) {
            Alert.alert("Error", "Please enter your current password");
            return;
        }

        if (!newPassword.trim()) {
            Alert.alert("Error", "Please enter a new password");
            return;
        }

        if (!confirmPassword.trim()) {
            Alert.alert("Error", "Please confirm your new password");
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "New passwords do not match");
            return;
        }

        if (currentPassword === newPassword) {
            Alert.alert("Error", "New password must be different from current password");
            return;
        }

        const passwordError = validatePassword(newPassword);
        if (passwordError) {
            Alert.alert("Error", passwordError);
            return;
        }

        setIsLoading(true);
        try {
            await authService.changePassword(currentPassword, newPassword);
            Alert.alert(
                "Success",
                "Your password has been changed successfully.",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.goBack()
                    }
                ]
            );
        } catch (error) {
            console.error("Change password error:", error);
            Alert.alert("Error", error.message || "Failed to change password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>

            <View style={styles.headerContainer}>
                <Text style={styles.title}>Change Password</Text>
                <Text style={styles.subtitle}>
                    Update your password to keep your account secure.
                </Text>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Current Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            placeholder="Enter current password"
                            placeholderTextColor="#999"
                            style={styles.passwordInput}
                            secureTextEntry={secureCurrentText}
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setSecureCurrentText(!secureCurrentText)}
                        >
                            <Ionicons
                                name={secureCurrentText ? "eye-off" : "eye"}
                                size={20}
                                color="#999"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>New Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            placeholder="Enter new password"
                            placeholderTextColor="#999"
                            style={styles.passwordInput}
                            secureTextEntry={secureNewText}
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setSecureNewText(!secureNewText)}
                        >
                            <Ionicons
                                name={secureNewText ? "eye-off" : "eye"}
                                size={20}
                                color="#999"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirm New Password</Text>
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
                    style={[styles.changeButton, isLoading && styles.changeButtonDisabled]}
                    onPress={handleChangePassword}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.changeText}>Change Password</Text>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
        paddingHorizontal: 20,
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
        marginTop: 20,
    },
    changeButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    changeButtonDisabled: {
        backgroundColor: Colors.textTertiary,
        opacity: 0.6,
    },
    changeText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
