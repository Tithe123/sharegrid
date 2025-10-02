import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";

export default function Onboarding1({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.skipButton}
                onPress={() => navigation.replace("Onboarding2")}
            >
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            <Image
                source={require("../assets/illustration 1.png")}
                resizeMode="contain"
            />
            <Text style={styles.title}>Welcome to ShareGrid</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Onboarding2")}
            >
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    skipButton: {
        position: "absolute",
        top: 50,
        right: 20,
    },
    skipText: {
        color: "#fff",
        fontSize: 16,
    },
    image: {
        width: "80%",
        height: 250,
        marginBottom: 30,
    },
    title: {
        fontSize: 22,
        fontWeight: "600",
        color: "#2979FF",
        textAlign: "center",
        marginBottom: 60,
    },
    button: {
        backgroundColor: "#2979FF",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
        position: "absolute",
        bottom: 60,
        width: "80%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
