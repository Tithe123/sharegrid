import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";

export default function Onboarding({ navigation }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const onboardingData = [
        {
            id: 1,
            image: require("../assets/Frame (1).png"),
            text: "Share your internet and get rewarded",
            dotColor: "#2563EB",
        },
        {
            id: 2,
            image: require("../assets/Frame (3).png"),
            text: "Access affordable internet anywhere",
            dotColor: "#2563EB",
        },
        {
            id: 3,
            image: require("../assets/Frame (2).png"),
            text: "Blockchain-verified connection",
            dotColor: "#2563EB",
        },
    ];

    const handleNext = () => {
        if (currentSlide < onboardingData.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {

            navigation.replace("Login");
        }
    };

    const handleSkip = () => {
        navigation.replace("Home");
    };

    const currentData = onboardingData[currentSlide];

    return (
        <View style={styles.container}>

            {currentSlide < onboardingData.length - 1 && (
                <TouchableOpacity
                    style={styles.skipButton}
                    onPress={handleSkip}
                >
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
            )}


            <Image
                source={currentData.image}
                style={styles.image}
                resizeMode="contain"
            />


            <View style={styles.carousel}>
                {onboardingData.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            {
                                backgroundColor: index === currentSlide
                                    ? currentData.dotColor
                                    : "#171c26ff"
                            }
                        ]}
                    />
                ))}
            </View>


            <Text style={styles.subText}>
                {currentData.text}
            </Text>


            <TouchableOpacity
                style={styles.button}
                onPress={handleNext}
            >
                <Text style={styles.buttonText}>
                    {currentSlide === onboardingData.length - 1 ? "Next" : "Next"}
                </Text>
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
        marginBottom: 20,
    },
    carousel: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    subText: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
        marginBottom: 50,
        paddingHorizontal: 20,
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