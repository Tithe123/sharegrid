import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Animated,
    Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GoogleIcon } from '../common/svgs';
import { Colors } from '../common';
import authService from "../../services/authService";
import ErrorModal from "../../components/errormodal";

export default function Login({ navigation }) {
    const [secureText, setSecureText] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorModal, setErrorModal] = useState({
        visible: false,
        message: ''
    });

    const dotAnimation1 = useRef(new Animated.Value(0)).current;
    const dotAnimation2 = useRef(new Animated.Value(0)).current;
    const dotAnimation3 = useRef(new Animated.Value(0)).current;

    const showError = (message) => {
        setErrorModal({ visible: true, message });
    };

    const hideError = () => {
        setErrorModal({ visible: false, message: '' });
    };

    const handleLogin = async () => {
        if (!formData.email || !formData.password) {
            showError('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        startLoadingAnimation();

        try {
            const result = await authService.login(formData.email, formData.password);
            
            // Check if user has profiles
            const hasProfiles = result.profiles && result.profiles.length > 0;
            
            stopLoadingAnimation();
            setIsLoading(false);
            
            if (hasProfiles) {
                // User has profiles, check if onboarded
                const isOnboarded = await authService.isOnboarded();
                if (isOnboarded) {
                    // Navigate to main app
                    navigation.replace("HomeScreen");
                } else {
                    // Show role selection
                    navigation.replace("Home");
                }
            } else {
                // New user, needs to select role
                navigation.replace("Home");
            }
        } catch (error) {
            stopLoadingAnimation();
            setIsLoading(false);
            showError(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        startLoadingAnimation();

        try {
            await authService.signInWithGoogle();
            stopLoadingAnimation();
            setIsLoading(false);
            navigation.replace("Home");
        } catch (error) {
            stopLoadingAnimation();
            setIsLoading(false);
            showError(error.message);
        }
    };


    const startLoadingAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(dotAnimation1, {
                    toValue: 1,
                    duration: 400,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
                Animated.timing(dotAnimation2, {
                    toValue: 1,
                    duration: 400,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
                Animated.timing(dotAnimation3, {
                    toValue: 1,
                    duration: 400,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
                Animated.delay(200),
                Animated.parallel([
                    Animated.timing(dotAnimation1, {
                        toValue: 0,
                        duration: 300,
                        easing: Easing.ease,
                        useNativeDriver: true,
                    }),
                    Animated.timing(dotAnimation2, {
                        toValue: 0,
                        duration: 300,
                        easing: Easing.ease,
                        useNativeDriver: true,
                    }),
                    Animated.timing(dotAnimation3, {
                        toValue: 0,
                        duration: 300,
                        easing: Easing.ease,
                        useNativeDriver: true,
                    }),
                ]),
            ])
        ).start();
    };

    const stopLoadingAnimation = () => {
        dotAnimation1.setValue(0);
        dotAnimation2.setValue(0);
        dotAnimation3.setValue(0);
    };

    const dot1Opacity = dotAnimation1.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 1],
    });

    const dot2Opacity = dotAnimation2.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 1],
    });

    const dot3Opacity = dotAnimation3.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 1],
    });

    const dot1Scale = dotAnimation1.interpolate({
        inputRange: [0, 1],
        outputRange: [0.8, 1.2],
    });

    const dot2Scale = dotAnimation2.interpolate({
        inputRange: [0, 1],
        outputRange: [0.8, 1.2],
    });

    const dot3Scale = dotAnimation3.interpolate({
        inputRange: [0, 1],
        outputRange: [0.8, 1.2],
    });

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

            <Text style={styles.title}>Sign in to Continue</Text>

            <Text style={styles.label}>E-mail/ Username</Text>
            <TextInput
                placeholder="Enter your email"
                placeholderTextColor={Colors.placeholderText}
                style={styles.input}
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) => setFormData({...formData, email: text.toLowerCase().trim()})}
            />

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor={Colors.placeholderText}
                    style={styles.inputPassword}
                    secureTextEntry={secureText}
                    value={formData.password}
                    onChangeText={(text) => setFormData({...formData, password: text})}
                />
                <TouchableOpacity
                    onPress={() => setSecureText(!secureText)}
                    style={styles.eyeIcon}
                >
                    <Ionicons
                        name={secureText ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color={Colors.textTertiary}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={{ alignSelf: "flex-end", marginBottom: 25 }}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                onPress={handleLogin}
                disabled={isLoading}
            >
                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <Animated.Text
                            style={[
                                styles.loadingDot,
                                {
                                    opacity: dot1Opacity,
                                    transform: [{ scale: dot1Scale }]
                                }
                            ]}
                        >
                            •
                        </Animated.Text>
                        <Animated.Text
                            style={[
                                styles.loadingDot,
                                {
                                    opacity: dot2Opacity,
                                    transform: [{ scale: dot2Scale }]
                                }
                            ]}
                        >
                            •
                        </Animated.Text>
                        <Animated.Text
                            style={[
                                styles.loadingDot,
                                {
                                    opacity: dot3Opacity,
                                    transform: [{ scale: dot3Scale }]
                                }
                            ]}
                        >
                            •
                        </Animated.Text>
                    </View>
                ) : (
                    <Text style={styles.loginText}>Login</Text>
                )}
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>Or Login With</Text>
                <View style={styles.divider} />
            </View>

            <TouchableOpacity 
                style={[styles.socialButton, isLoading && styles.loginButtonDisabled]}
                onPress={handleGoogleLogin}
                disabled={isLoading}
            >
                <View style={styles.socialButtonContent}>
                    <GoogleIcon />
                    <Text style={styles.socialText}>Sign in with Google</Text>
                </View>
            </TouchableOpacity>


            <View style={styles.footer}>
                <Text style={{ color: Colors.textPrimary }}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                    <Text style={{ color: Colors.primary }}>Sign up</Text>
                </TouchableOpacity>
            </View>

            <ErrorModal
                visible={errorModal.visible}
                message={errorModal.message}
                onClose={hideError}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
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
        color: Colors.primary,
        fontWeight: "700",
    },
    title: {
        fontSize: 28,
        fontWeight: "600",
        color: Colors.textPrimary,
        textAlign: "center",
        marginBottom: 30,
    },
    label: {
        color: Colors.textPrimary,
        fontSize: 14,
        marginBottom: 5,
    },
    input: {
        backgroundColor: Colors.white,
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 15,
        color: Colors.textPrimary,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.white,
        borderRadius: 8,
        marginBottom: 10,
    },
    inputPassword: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 12,
        color: Colors.textPrimary,
    },
    eyeIcon: {
        paddingHorizontal: 10,
    },
    forgotText: {
        color: Colors.accentBlue,
        fontSize: 13,
    },
    loginButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 25,
    },
    loginButtonDisabled: {
        opacity: 0.8,
    },
    loginText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: "600",
    },
    loadingContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    loadingDot: {
        color: Colors.white,
        fontSize: 24,
        marginHorizontal: 2,
        fontWeight: "bold",
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 25,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.borderDark,
    },
    dividerText: {
        color: Colors.textPrimary,
        marginHorizontal: 10,
        fontSize: 12,
    },
    socialButton: {
        backgroundColor: Colors.white,
        borderRadius: 8,
        paddingVertical: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: Colors.borderSocial,
    },
    socialButtonContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    socialText: {
        fontSize: 14,
        color: Colors.textLight,
        marginLeft: 10,
        fontWeight: "500",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
});