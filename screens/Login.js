import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function Login({ navigation }) {
    const [secureText, setSecureText] = useState(true);

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require("../assets/logo2.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.logoText}>Sharegrid</Text>
            </View>


            <Text style={styles.title}>Sign in to Continue</Text>


            <Text style={styles.label}>E-mail</Text>
            <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#999"
                style={styles.input}
                keyboardType="email-address"
            />


            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor="#999"
                    style={styles.inputPassword}
                    secureTextEntry={secureText}
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


            <TouchableOpacity style={{ alignSelf: "flex-end", marginBottom: 25 }}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.replace("Home")}
            >
                <Text style={styles.loginText}>•••</Text>
            </TouchableOpacity>


            <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>Or Login With</Text>
                <View style={styles.divider} />
            </View>


            <TouchableOpacity style={styles.socialButton}>
                <View style={styles.socialButtonContent}>
                    <AntDesign name="google" size={20} />
                    <Text style={styles.socialText}>Sign in with Google</Text>
                </View>
            </TouchableOpacity>


            <TouchableOpacity style={styles.socialButton}>
                <View style={styles.socialButtonContent}>
                    <Ionicons name="logo-apple" size={22} color="black" />
                    <Text style={styles.socialText}>Sign in with Apple</Text>
                </View>
            </TouchableOpacity>


            <View style={styles.footer}>
                <Text style={{ color: "#fff" }}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                    <Text style={{ color: "#2979FF" }}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        paddingHorizontal: 20,
        justifyContent: "center",
    },
    logoContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 25,
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    logoText: {
        fontSize: 24,
        color: "#2979FF",
        fontWeight: "700",
    },
    title: {
        fontSize: 28,
        fontWeight: "600",
        color: "#fff",
        textAlign: "center",
        marginBottom: 30,
    },
    label: {
        color: "#fff",
        fontSize: 14,
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 15,
        color: "#000",
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 10,
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
    forgotText: {
        color: "#2979FF",
        fontSize: 13,
    },
    loginButton: {
        backgroundColor: "#2979FF",
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 25,
    },
    loginText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 25,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: "#444",
    },
    dividerText: {
        color: "#999",
        marginHorizontal: 10,
        fontSize: 12,
    },
    socialButton: {
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingVertical: 12,
        marginBottom: 15,
    },
    socialButtonContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    socialText: {
        fontSize: 14,
        color: "#000",
        marginLeft: 10,
        fontWeight: "500",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
});