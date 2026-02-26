import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    TextInput,
    Alert,
    SafeAreaView,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import authService from "../../services/authService";

export default function RoleSelection({ navigation, route }) {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [isCreatingProfile, setIsCreatingProfile] = useState(false);
    const [step, setStep] = useState(1);
    const [profileForm, setProfileForm] = useState({
        firstName: '',
        lastName: ''
    });

    // Get params from navigation (for new signups)
    const { email, firstName, lastName, supabaseUserId, needsProfileCreation } = route?.params || {};

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const isAuthenticated = await authService.isAuthenticated();
            if (isAuthenticated) {
                const user = await authService.getUserData();
                setUserData(user);
                setProfileForm({
                    firstName: user?.firstName || '',
                    lastName: user?.lastName || ''
                });
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateProfile = async () => {
        setIsCreatingProfile(true);
        try {        
            // Get current user data from multiple sources
            const currentUser = userData || await authService.getUserData();
            const userSupabaseId = supabaseUserId || currentUser?.supabaseUserId || currentUser?.id;
            let userFirstName = profileForm.firstName.trim() || firstName || currentUser?.firstName || '';
            let userLastName = profileForm.lastName.trim() || lastName || currentUser?.lastName || '';

            // Validate we have a supabaseUserId
            if (!userSupabaseId) {

                throw new Error('Unable to identify user. Please try logging in again.');
            }

            // Validate names
            if (!userFirstName || !userLastName) {
                console.error('❌ [Home] Missing name fields:', { userFirstName, userLastName });
                throw new Error('First name and last name are required');
            }

            // Update user metadata first if needed
            if ((!currentUser?.firstName || !currentUser?.lastName) && (userFirstName && userLastName)) {
                console.log('🔵 [Home] Updating user metadata...');
                await authService.updateUserProfile({ 
                    first_name: userFirstName, 
                    last_name: userLastName 
                });
                console.log('✅ [Home] User metadata updated');
            }

            // Create profile (no role needed - all users have access to both features)
            console.log('🔵 [Home] Calling authService.createProfile...');
            const profileResult = await authService.createProfile(
                userSupabaseId,
                userFirstName,
                userLastName
            );
            console.log('✅ [Home] Profile created:', profileResult);

            console.log('🔵 [Home] Setting onboarded status...');
            await authService.setOnboarded();
            console.log('✅ [Home] Onboarded status set');

            // Navigate to main home screen
            console.log('🔵 [Home] Navigating to HomeScreen...');
            navigation.replace('HomeScreen');
        } catch (error) {
            console.error('❌ [Home] Profile creation failed:', error.message);
            console.error('❌ [Home] Full error:', error);
            Alert.alert('Error', error.message);
            setIsCreatingProfile(false);
        }
    };

    if (isLoading || isCreatingProfile) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#2979FF" />
                <Text style={styles.loadingText}>
                    {isCreatingProfile ? 'Creating your profile...' : 'Loading...'}
                </Text>
            </View>
        );
    }

    const renderWelcome = () => (
        <View style={styles.stepContainer}>
            <View style={styles.logoContainer}>
                <Image
                    source={require("../../assets/logo2.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.welcomeTitle}>Welcome</Text>
            <Text style={styles.welcomeSubtitle}>
                Let's set up your profile to get you started on the decentralized internet network.
            </Text>
            <TouchableOpacity 
                style={styles.primaryButton}
                onPress={() => setStep(2)}
            >
                <Text style={styles.primaryButtonText}>Get Started</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFF" />
            </TouchableOpacity>
        </View>
    );

    const renderProfileInput = () => (
        <View style={styles.fullScreenContainer}>
            <TouchableOpacity onPress={() => setStep(1)} style={styles.topBackButton}>
                <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
            </TouchableOpacity>
            
            <View style={styles.centeredContent}>
                <Text style={styles.stepTitle}>Your Details</Text>
                <Text style={styles.stepDescription}>
                    Please provide your name to personalize your experience.
                </Text>

                <View style={styles.inputContainer}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>First Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. John"
                            value={profileForm.firstName}
                            onChangeText={(text) => setProfileForm({...profileForm, firstName: text})}
                            placeholderTextColor="#9FA5AA"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Last Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. Doe"
                            value={profileForm.lastName}
                            onChangeText={(text) => setProfileForm({...profileForm, lastName: text})}
                            placeholderTextColor="#9FA5AA"
                        />
                    </View>
                </View>

                <TouchableOpacity 
                    style={[
                        styles.primaryButton, 
                        (!profileForm.firstName.trim() || !profileForm.lastName.trim()) && styles.disabledButton
                    ]}
                    onPress={handleCreateProfile}
                    disabled={!profileForm.firstName.trim() || !profileForm.lastName.trim()}
                >
                    <Text style={styles.primaryButtonText}>Create Profile</Text>
                    <Ionicons name="checkmark" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {step === 1 && renderWelcome()}
                {step === 2 && renderProfileInput()}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F8F9FB",
    },
    container: {
        flex: 1,
        backgroundColor: "#F8F9FB",
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
    },
    loadingContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: "#666",
        fontWeight: "500",
    },
    stepContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    fullScreenContainer: {
        flex: 1,
    },
    centeredContent: {
        flex: 1,
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logo: {
        width: 40,
        height: 40,
        marginBottom: 16,
    },
    logoText: {
        fontSize: 28,
        fontWeight: "700",
        color: "#1A1A1A",
        letterSpacing: -0.5,
    },
    welcomeTitle: {
        fontSize: 32,
        fontWeight: "700",
        color: "#1A1A1A",
        marginBottom: 16,
        textAlign: 'center',
        letterSpacing: -0.5,
    },
    welcomeSubtitle: {
        fontSize: 16,
        color: "#757575",
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 48,
    },
    stepTitle: {
        fontSize: 28,
        fontWeight: "700",
        color: "#1A1A1A",
        marginBottom: 12,
    },
    stepDescription: {
        fontSize: 16,
        color: "#757575",
        marginBottom: 32,
        lineHeight: 24,
    },
    inputContainer: {
        marginBottom: 32,
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: "600",
        color: "#424242",
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    input: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: "#1A1A1A",
        borderWidth: 1,
        borderColor: "#E0E0E0",
    },
    primaryButton: {
        backgroundColor: "#2979FF",
        borderRadius: 16,
        paddingVertical: 18,
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#2979FF",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 4,
    },
    disabledButton: {
        backgroundColor: "#E0E0E0",
        shadowOpacity: 0,
    },
    primaryButtonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "600",
        marginRight: 8,
    },
    topBackButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
        padding: 8,
        marginLeft: -8,
    },
    footer: {
        padding: 24,
        alignItems: "center",
    },
    termsText: {
        fontSize: 13,
        color: "#9E9E9E",
        textAlign: "center",
        lineHeight: 20,
    },
    linkText: {
        color: "#2979FF",
        fontWeight: "500",
    },
});