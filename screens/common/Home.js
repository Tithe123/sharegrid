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
} from "react-native";
import authService from "../../services/authService";

export default function RoleSelection({ navigation, route }) {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [isCreatingProfile, setIsCreatingProfile] = useState(false);
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
            console.log('Is authenticated:', isAuthenticated);
            if (isAuthenticated) {
                const user = await authService.getUserData();
                console.log('User data:', user);
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

    const handleUpdateProfile = async () => {
        if (!profileForm.firstName.trim() || !profileForm.lastName.trim()) {
            Alert.alert('Error', 'Please fill in both first name and last name');
            return;
        }

        setIsUpdatingProfile(true);
        try {
            await authService.updateUserProfile({
                first_name: profileForm.firstName.trim(),
                last_name: profileForm.lastName.trim()
            });

            // Update local user data
            const updatedUserData = {
                ...userData,
                firstName: profileForm.firstName.trim(),
                lastName: profileForm.lastName.trim()
            };
            setUserData(updatedUserData);
            
            Alert.alert('Success', 'Profile updated successfully');
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setIsUpdatingProfile(false);
        }
    };

    const handleRoleSelection = async (role) => {
        // If coming from verification flow, create profile first
        if (needsProfileCreation && supabaseUserId) {
            setIsCreatingProfile(true);
            try {
                // Create profile with Gravatar (no custom avatar)
                await authService.createProfile(
                    supabaseUserId,
                    firstName || '',
                    lastName || '',
                    role
                );

                // Mark as onboarded
                await authService.setOnboarded();

                // Navigate to appropriate screen
                if (role === 'user') {
                    navigation.replace('HomeScreen');
                } else {
                    navigation.replace('HostHome');
                }
            } catch (error) {
                Alert.alert('Error', error.message);
                setIsCreatingProfile(false);
            }
        } else {
            // Existing user, just navigate
            if (role === 'user') {
                navigation.replace('HomeScreen');
            } else {
                navigation.replace('HostHome');
            }
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

            {userData && userData.authType === 'email' && (!userData.firstName || !userData.lastName) && (
                <View style={styles.profileFormContainer}>
                    <Text style={styles.profileFormTitle}>Complete Your Profile</Text>
                    
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your first name"
                        value={profileForm.firstName}
                        onChangeText={(text) => setProfileForm({...profileForm, firstName: text})}
                    />

                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your last name"
                        value={profileForm.lastName}
                        onChangeText={(text) => setProfileForm({...profileForm, lastName: text})}
                    />

                    <TouchableOpacity
                        style={[styles.updateButton, isUpdatingProfile && styles.updateButtonDisabled]}
                        onPress={handleUpdateProfile}
                        disabled={isUpdatingProfile}
                    >
                        <Text style={styles.updateButtonText}>
                            {isUpdatingProfile ? 'Updating...' : 'Update Profile'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            <Text style={styles.question}>
                How would you primarily use Sharegrid?
            </Text>


            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.optionButton}
                    onPress={() => handleRoleSelection('user')}
                >
                    <Text style={styles.optionText}>User</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.optionButton}
                    onPress={() => handleRoleSelection('host')}
                >
                    <Text style={styles.optionText}>Host</Text>
                </TouchableOpacity>
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
    loadingContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: "#666",
    },
    profileFormContainer: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        width: "100%",
    },
    profileFormTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#2979FF",
        marginBottom: 16,
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
        marginBottom: 8,
        marginTop: 12,
    },
    input: {
        backgroundColor: "#F8F9FB",
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#E0E0E0",
    },
    updateButton: {
        backgroundColor: "#2979FF",
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center",
        marginTop: 20,
    },
    updateButtonDisabled: {
        backgroundColor: "#B0B0B0",
    },
    updateButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
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
        color: "#2979FF",
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
        backgroundColor: "#2979FF",
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 25,
        alignItems: "center",
        justifyContent: "center",
        height: 51,
        flex: 1,
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
        color: "#2979FF",
    },
});