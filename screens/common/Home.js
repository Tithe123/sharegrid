import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
} from "react-native";

const PRIMARY_BLUE = "#2563EB";
const PRIMARY_BLUE_PRESSED = "#3B82F6";

export default function RoleSelection({ navigation }) {
    return (
        <View style={styles.container}>

            <View style={styles.logoContainer}>
                <Image
                    source={require("../../assets/logo2.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.logoText}>ShareGrid</Text>
            </View>


            <Text style={styles.question}>
                How would you primarily use Sharegrid ?
            </Text>


            <View style={styles.buttonRow}>
                <Pressable
                    style={({ pressed }) => [
                        styles.optionButton,
                        pressed && styles.optionButtonPressed,
                    ]}
                    onPress={() => navigation.replace("HomeScreen")}
                >
                    <Text style={styles.optionText}>User</Text>
                </Pressable>

                <Pressable
                    style={({ pressed }) => [
                        styles.optionButton,
                        pressed && styles.optionButtonPressed,
                    ]}
                    onPress={() => navigation.replace("HostHome")}
                >
                    <Text style={styles.optionText}>Host</Text>
                </Pressable>
            </View>


            <Text style={styles.terms}>
                Agree to <Text style={styles.link}>Terms and Privacy</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FB",
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    logoContainer: {
        width: 203.11224365234375,
        height: 78.0999984741211,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        gap: 12,
        marginTop: 0,
    },
    logo: {
        width: 40,
        height: 40,
    },
    logoText: {
        fontSize: 22,
        color: PRIMARY_BLUE,
        fontWeight: "700",
    },
    question: {
        fontFamily: "Poppins",
        fontWeight: "600",
        fontStyle: "normal",
        fontSize: 24,
        lineHeight: 32,
        letterSpacing: 0,
        textAlign: "center",
        color: "#000",
        marginBottom: 150,
        paddingHorizontal: 20,
        marginTop: 40,
    },
    buttonRow: {
        flexDirection: "row",
        gap: 16,
        width: 307,

    },
    optionButton: {
        backgroundColor: PRIMARY_BLUE,
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 25,
        alignItems: "center",
        justifyContent: "center",
        height: 51,
        flex: 1,
    },
    optionButtonPressed: {
        backgroundColor: PRIMARY_BLUE_PRESSED,
    },
    optionText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    terms: {
        fontFamily: "Poppins",
        fontWeight: "400",
        fontStyle: "normal",
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: -0.43,
        textAlign: "center",
        textAlignVertical: "center",
        color: "#000",
        position: "absolute",
        bottom: 40,
    },
    link: {
        color: PRIMARY_BLUE,
    },
});