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
    const [selectedRole, setSelectedRole] = useState(null);
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
        if (!selectedRole) return;
        
        setIsCreatingProfile(true);
        try {
            // Get current user data from multiple sources
            const currentUser = userData || await authService.getUserData();
            const userSupabaseId = supabaseUserId || currentUser?.supabaseUserId || currentUser?.id;
            let userFirstName = profileForm.firstName.trim() || firstName || currentUser?.firstName || '';
            let userLastName = profileForm.lastName.trim() || lastName || currentUser?.lastName || '';

            console.log('Creating profile with:', {
                userSupabaseId,
                userFirstName,
                userLastName,
                selectedRole,
                fromRouteParams: !!supabaseUserId,
                fromUserData: !!currentUser?.supabaseUserId
            });

            // Validate we have a supabaseUserId
            if (!userSupabaseId) {
                throw new Error('Unable to identify user. Please try logging in again.');
            }

            // Update user metadata first if needed
            if ((!currentUser?.firstName || !currentUser?.lastName) && (userFirstName && userLastName)) {
                await authService.updateUserProfile({ 
                    first_name: userFirstName, 
                    last_name: userLastName 
                });
            }

            // Create profile
            await authService.createProfile(
                userSupabaseId,
                userFirstName,
                userLastName,
                selectedRole
            );

            await authService.setOnboarded();

            if (selectedRole === 'user') {
                navigation.replace('HomeScreen');
            } else {
                navigation.replace('HostHome');
            }
        } catch (error) {
            console.error('Profile creation failed:', error);
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
                    onPress={() => setStep(3)}
                    disabled={!profileForm.firstName.trim() || !profileForm.lastName.trim()}
                >
                    <Text style={styles.primaryButtonText}>Next Step</Text>
                    <Ionicons name="arrow-forward" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderRoleSelection = () => (
        <View style={styles.fullScreenContainer}>
            <TouchableOpacity onPress={() => setStep(2)} style={styles.topBackButton}>
                <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
            </TouchableOpacity>

            <View style={styles.centeredContent}>
                <Text style={styles.stepTitle}>Select Role</Text>
                <Text style={styles.stepDescription}>
                    How would you like to use Sharegrid?
                </Text>

                <View style={styles.roleContainer}>
                    <TouchableOpacity
                        style={[
                            styles.roleCard,
                            selectedRole === 'user' && styles.selectedRoleCard
                        ]}
                        onPress={() => setSelectedRole('user')}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
                            <Ionicons name="wifi" size={28} color="#2979FF" />
                        </View>
                        <View style={styles.roleTextContainer}>
                            <Text style={styles.roleTitle}>Connect</Text>
                            <Text style={styles.roleDescription}>Access high-speed internet hotspots nearby</Text>
                        </View>
                        {selectedRole === 'user' && <Ionicons name="checkmark-circle" size={24} color="#2979FF" />}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.roleCard,
                            selectedRole === 'host' && styles.selectedRoleCard
                        ]}
                        onPress={() => setSelectedRole('host')}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.iconContainer, { backgroundColor: '#E8F5E9' }]}>
                            <Ionicons name="globe-outline" size={28} color="#4CAF50" />
                        </View>
                        <View style={styles.roleTextContainer}>
                            <Text style={styles.roleTitle}>Host Node</Text>
                            <Text style={styles.roleDescription}>Share bandwidth and earn crypto rewards</Text>
                        </View>
                        {selectedRole === 'host' && <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />}
                    </TouchableOpacity>
                </View>

                {selectedRole && (
                    <TouchableOpacity 
                        style={styles.primaryButton}
                        onPress={handleCreateProfile}
                    >
                        <Text style={styles.primaryButtonText}>Create Profile</Text>
                        <Ionicons name="checkmark" size={20} color="#FFF" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {step === 1 && renderWelcome()}
                {step === 2 && renderProfileInput()}
                {step === 3 && renderRoleSelection()}
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
    roleContainer: {
        gap: 16,
        marginBottom: 32,
    },
    roleCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.05)",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    selectedRoleCard: {
        borderColor: "#2979FF",
        backgroundColor: "#F0F7FF",
        borderWidth: 2,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    roleTextContainer: {
        flex: 1,
    },
    roleTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#1A1A1A",
        marginBottom: 4,
    },
    roleDescription: {
        fontSize: 14,
        color: "#757575",
        lineHeight: 20,
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