import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { VerificationCodeInput } from 'react-native-verification-code-input';
import { Colors } from '../common';
import authService from "../../services/authService";
import ErrorModal from "../../components/authErrormodal";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VerifyEmail({ navigation, route }) {
    const { email } = route.params || {};
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [countdown, setCountdown] = useState(60); // Start with 60 seconds
    const [canResend, setCanResend] = useState(false); // Initially disabled
    const [modal, setModal] = useState({
        visible: false,
        message: '',
        type: 'error' // 'error' | 'success' | 'info'
    });

    // Timer effect - runs every second
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0 && !canResend) {
            setCanResend(true);
        }
    }, [countdown]);

    const showError = (message) => {
        setModal({ visible: true, message, type: 'error' });
        setHasError(true);
    };

    const showSuccess = (message) => {
        setModal({ visible: true, message, type: 'success' });
        setHasError(false);
    };

    const hideModal = () => {
        setModal({ visible: false, message: '', type: 'error' });
        setHasError(false);
    };

    const handleComplete = async (verificationCode) => {
        if (!verificationCode || verificationCode.length !== 6) {
            showError('Please enter a valid 6-digit code');
            return;
        }

        setIsLoading(true);
        setHasError(false);
        try {
            // Verify email with backend
            await authService.verifyEmailCode(email, verificationCode);

            // Get temp user data
            const tempDataString = await AsyncStorage.getItem('@temp_user_data');
            if (tempDataString) {
                const tempData = JSON.parse(tempDataString);
                
                // Store user data in AsyncStorage for authenticated session
                await authService.storeUserData({
                    id: tempData.supabaseUserId,
                    email: tempData.email,
                    firstName: tempData.firstName,
                    lastName: tempData.lastName,
                    supabaseUserId: tempData.supabaseUserId
                });

                // Store access token if available
                if (tempData.accessToken) {
                    await authService.storeToken(tempData.accessToken);
                }
                
                // Navigate to Home screen for profile selection
                navigation.replace('Home', {
                    email: tempData.email,
                    firstName: tempData.firstName,
                    lastName: tempData.lastName,
                    supabaseUserId: tempData.supabaseUserId,
                    needsProfileCreation: true
                });

                // Clear temp data
                await AsyncStorage.removeItem('@temp_user_data');
            }
        } catch (error) {
            showError(error.message);
            // Reset code on error
            setCode("");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (!canResend) return;

        setIsResending(true);
        try {
            await authService.resendVerificationCode(email);
            setCountdown(60);
            setCanResend(false);
            setHasError(false);
            // Clear the code
            setCode("");
            // Show success message
            showSuccess('Verification code sent successfully!');
        } catch (error) {
            showError(error.message);
        } finally {
            setIsResending(false);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>

            <View style={styles.headerContainer}>
                <Text style={styles.title}>Verify Account</Text>
                <Text style={styles.subtitle}>
                    Code has been sent to {email}
                </Text>
                <Text style={styles.subtitle}>
                    Enter the code to verify your account
                </Text>
                <Text style={[styles.subtitle, { marginTop: 16 }]}>
                    Didn't Receive Code?{' '}
                    <Text 
                        style={[styles.resendText, (!canResend || isResending) && styles.resendTextDisabled]}
                        onPress={handleResend}
                    >
                        {isResending ? 'Sending...' : 'Resend Code'}
                    </Text>
                </Text>
                {!canResend && (
                    <Text style={[styles.subtitle, { marginTop: 8 }]}>
                        Resend code in {formatTime(countdown)}
                    </Text>
                )}
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Enter Code</Text>
                <VerificationCodeInput
                    length={6}
                    onComplete={handleComplete}
                    autoFocus={true}
                    error={hasError}
                    errorColor={Colors.error || "#FF3B30"}
                    borderColor={Colors.borderSocial}
                    activeBorderColor={Colors.primary}
                    inputSize={50}
                    inputPadding={12}
                    keyboardType="numeric"
                    containerStyle={styles.codeInputContainer}
                    inputStyle={styles.codeInputBox}
                    textStyle={styles.codeInputText}
                />
            </View>

            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                    <Text style={styles.loadingText}>Verifying code...</Text>
                </View>
            )}

            <ErrorModal
                visible={modal.visible}
                message={modal.message}
                type={modal.type}
                onClose={hideModal}
            />
        </View>
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
        marginBottom: 50,
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.textPrimary,
        marginBottom: 15,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 15,
        color: Colors.textTertiary,
        lineHeight: 22,
        textAlign: "center",
        paddingHorizontal: 10,
    },
    resendText: {
        color: Colors.primary, // Primary color when enabled
        fontWeight: '600',
    },
    resendTextDisabled: {
        color: Colors.textDisabled, // Neutral/gray when disabled
    },
    inputContainer: {
        flex: 1,
        marginBottom: 30,
    },
    label: {
        color: Colors.textPrimary,
        fontSize: 16,
        marginBottom: 20,
        fontWeight: "500",
        textAlign: "center",
    },
    codeInputContainer: {
        marginTop: 10,
        gap: 12,
    },
    codeInputBox: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        borderWidth: 2,
    },
    codeInputText: {
        color: Colors.textPrimary,
        fontSize: 24,
        fontWeight: "700",
    },
    loadingContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 40,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: Colors.textTertiary,
        fontWeight: "500",
    },
});
