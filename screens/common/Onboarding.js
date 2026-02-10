import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
    Animated
} from "react-native";

const PRIMARY_BLUE = "#2563EB";
const PRIMARY_BLUE_PRESSED = "#3B82F6";

export default function Onboarding({ navigation }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [dotAnimations] = useState([
        new Animated.Value(1),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0)
    ]);

    const onboardingData = [
        {
            id: 1,
            image: require("../../assets/illustration 1.png"),
            title: "Welcome to ShareGrid",
            text: "Share internet, earn token and connect everywhere",
            dotColor: PRIMARY_BLUE,
        },
        {
            id: 2,
            image: require("../../assets/Frame (3).png"),
            title: "Accessible internet",
            text: "Access affordable internet anywhere",
            dotColor: PRIMARY_BLUE,
        },
        {
            id: 3,
            image: require("../../assets/Frame (2).png"),
            title: "Fully Decentralized",
            text: "Blockchain-verified connection",
            dotColor: PRIMARY_BLUE,
        },
        {
            id: 4,
            image: require("../../assets/Frame (1).png"),
            title: "Earn Rewards",
            text: "Share your Internet and get rewarded",
            dotColor: PRIMARY_BLUE,
        },
    ];


    useEffect(() => {
        dotAnimations[0].setValue(1);
    }, []);

    const handleNext = () => {
        if (currentSlide < onboardingData.length - 1) {

            Animated.parallel([
                Animated.timing(dotAnimations[currentSlide], {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(dotAnimations[currentSlide + 1], {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false,
                })
            ]).start();

            setCurrentSlide(currentSlide + 1);
        } else {
            navigation.replace("Login");
        }
    };

    const handleSkip = () => {
        navigation.replace("Signup");
    };

    const currentData = onboardingData[currentSlide];

    return (
        <View style={styles.container}>
            {currentSlide < onboardingData.length - 1 && (
                <Pressable
                    style={({ pressed }) => [
                        styles.skipButton,
                        pressed && styles.skipButtonPressed,
                    ]}
                    onPress={handleSkip}
                >
                    <Text style={styles.skipText}>Skip</Text>
                </Pressable>
            )}

            <View style={styles.imageContainer}>
                <Image
                    source={currentData.image}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.title}>{currentData.title}</Text>
                <Text style={styles.subText}>
                    {currentData.text}
                </Text>
            </View>

            <View style={styles.bottomContainer}>
                <View style={styles.carousel}>
                    {[0, 1, 2, 3].map((index) => (
                        <Animated.View
                            key={index}
                            style={[
                                styles.dot,
                                {
                                    backgroundColor: dotAnimations[index].interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ["#E0E0E0", currentData.dotColor]
                                    }),
                                    width: dotAnimations[index].interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [8, 20]
                                    }),
                                    opacity: dotAnimations[index].interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0.6, 1]
                                    })
                                }
                            ]}
                        />
                    ))}
                </View>

                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        pressed && styles.buttonPressed,
                    ]}
                    onPress={handleNext}
                >
                    <Text style={styles.buttonText}>
                        {currentSlide === onboardingData.length - 1 ? " Next" : "Next"}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    skipButton: {
        position: "absolute",
        top: 50,
        right: 20,
        zIndex: 1,
    },
    skipText: {
        color: PRIMARY_BLUE,
        fontSize: 16,
        marginVertical: 80,
    },
    skipButtonPressed: {
        opacity: 0.7,
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginTop: 80,
    },
    image: {
        width: "100%",
        height: 250,
        marginVertical: 160
    },
    textContainer: {
        alignItems: "flex-start",
        paddingHorizontal: 10,
        marginTop: -120,
    },
    title: {
        fontFamily: "Poppins",
        fontWeight: "600",
        fontStyle: "normal",
        fontSize: 24,
        lineHeight: 32,
        letterSpacing: 0,
        color: PRIMARY_BLUE,
        textAlign: "left",
        marginBottom: 35,
        textAlignVertical: "center",
    },
    subText: {
        fontFamily: "Poppins",
        fontWeight: "400",
        fontStyle: "normal",
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: -0.43,
        color: "#666",
        textAlign: "left",
        textAlignVertical: "center",
    },
    bottomContainer: {
        position: "absolute",
        bottom: 40,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    carousel: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
    },
    dot: {
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    button: {
        backgroundColor: PRIMARY_BLUE,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 15,
        marginHorizontal: -30,
    },
    buttonPressed: {
        backgroundColor: PRIMARY_BLUE_PRESSED,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});