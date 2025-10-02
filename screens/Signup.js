import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function Signup({ navigation }) {
    const [secureText, setSecureText] = useState(true);
    const [confirmSecure, setConfirmSecure] = useState(true);

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <View style={styles.logoContainer}>
                <Image
                    source={require("../assets/logo2.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.logoText}>Sharegrid</Text>
            </View>


            <Text style={styles.title}>Sign up to Continue</Text>


            <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 8 }}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        placeholder="John"
                        placeholderTextColor="#999"
                        style={styles.input}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                        placeholder="Doe"
                        placeholderTextColor="#999"
                        style={styles.input}
                    />
                </View>
            </View>


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
            <Text style={styles.passwordHint}>must contain 8 char.</Text>

            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    placeholder="Confirm password"
                    placeholderTextColor="#999"
                    style={styles.inputPassword}
                    secureTextEntry={confirmSecure}
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


            <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.replace("Home")}
            >
                <Text style={styles.loginText}>•••</Text>
            </TouchableOpacity>

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


            <Text style={styles.terms}>
                Agree to <Text style={styles.link}>Terms and Privacy</Text>
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#000",
        paddingHorizontal: 20,
        justifyContent: "center",
        paddingVertical: 30,
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
    row: {
        flexDirection: "row",
        marginBottom: 15,
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
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
    passwordHint: {
        color: "#999",
        fontSize: 12,
        marginBottom: 15,
    },
    loginButton: {
        backgroundColor: "#2979FF",
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 20,
    },
    loginText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
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
    terms: {
        textAlign: "center",
        color: "#fff",
        marginTop: 10,
    },
    link: {
        color: "#2979FF",
    },
});