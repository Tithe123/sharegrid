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
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [secureText, setSecureText] = useState(true);
    const [confirmSecure, setConfirmSecure] = useState(true);

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
                    Please enter and confirm your new password.
                </Text>
                <Text style={styles.subtitle}>
                    You will need to login after you reset.
                </Text>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder="............"
                        placeholderTextColor="#999"
                        style={styles.inputPassword}
                        secureTextEntry={secureText}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity
                        onPress={() => setSecureText(!secureText)}
                        style={styles.eyeIcon}
                    >
                        <Ionicons
                            name={secureText ? "eye-off-outline" : "eye-outline"}
                            size={20}
                            color="#666"
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.passwordHint}>must contain 8 char.</Text>

                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder="............"
                        placeholderTextColor="#999"
                        style={styles.inputPassword}
                        secureTextEntry={confirmSecure}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity
                        onPress={() => setConfirmSecure(!confirmSecure)}
                        style={styles.eyeIcon}
                    >
                        <Ionicons
                            name={confirmSecure ? "eye-off-outline" : "eye-outline"}
                            size={20}
                            color="#666"
                        />
                    </TouchableOpacity>
                </View>
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
        marginBottom: 30,
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
        marginBottom: 5,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        color: "#000",
        fontSize: 16,
        marginBottom: 8,
        fontWeight: "500",
        marginTop: 15,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#e9ecef",
    },
    inputPassword: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 12,
        color: "#000",
    },
    eyeIcon: {
        paddingHorizontal: 10,
    },
    passwordHint: {
        color: "#666",
        fontSize: 12,
        marginTop: 5,
        marginLeft: 5,
    },
    buttonContainer: {
        marginBottom: 40,
    },
    resetButton: {
        backgroundColor: "#2979FF",
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 320,
    },
    resetText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});