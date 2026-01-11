import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Animated,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Location from 'expo-location';
import NavigationBar from "../../components/NavigationBar";
import { Colors } from '../common';
import authService from "../../services/authService";
import dashboardService from "../../services/dashboardService";

const HomeScreen = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState("User");
    const [balanceVisible, setBalanceVisible] = useState(true);
    const [slideAnim] = useState(new Animated.Value(0));
    const [isWifiConnected, setIsWifiConnected] = useState(false);
    
    // Dynamic data states
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [userData, setUserData] = useState(null);
    const [profile, setProfile] = useState(null);
    const [balance, setBalance] = useState({ balance: 0, currency: 'NGN' });
    const [userLocation, setUserLocation] = useState(null);
    const [formattedLocation, setFormattedLocation] = useState(null);
    const [nearbyHotspots, setNearbyHotspots] = useState([]);
    const [selectedHotspot, setSelectedHotspot] = useState(null);

    const handleToggle = (tab) => {
        setActiveTab(tab);
        Animated.timing(slideAnim, {
            toValue: tab === "User" ? 0 : 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };


    const handleConnectWifi = () => {
        setIsWifiConnected(!isWifiConnected);
    };

    // Load dashboard data on mount
    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            // Get user data and profiles from storage
            const user = await authService.getUserData();
            setUserData(user);

            const profiles = await authService.getProfiles();
            // Find the user profile (not host)
            const userProfile = profiles.find(p => p.role === 'user') || profiles[0];
            setProfile(userProfile);

            if (userProfile) {
                // Get wallet balance
                const balanceData = await dashboardService.getBalance(userProfile.id);
                setBalance(balanceData);

                // Get user's saved location
                const savedLocation = await dashboardService.getLocation(userProfile.id);
                if (savedLocation) {
                    setUserLocation(savedLocation);
                    setFormattedLocation(`${savedLocation.state || savedLocation.city}, ${savedLocation.country_code || ''}`);
                }

                // Request device location and update
                await requestAndUpdateLocation(userProfile.id);
            }
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const requestAndUpdateLocation = async (profileId) => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Location permission denied');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            // Reverse geocode to get address
            const [address] = await Location.reverseGeocodeAsync({ latitude, longitude });
            
            if (address) {
                // Build street address from components
                const streetParts = [];
                if (address.streetNumber) streetParts.push(address.streetNumber);
                if (address.street) streetParts.push(address.street);
                const street = streetParts.join(' ') || null;

                const locationData = {
                    latitude,
                    longitude,
                    street,
                    city: address.city || address.subregion,
                    state: address.region,
                    country: address.country,
                    countryCode: address.isoCountryCode,
                    formattedAddress: `${address.city || address.subregion}, ${address.region}, ${address.country}`
                };

                // Update location in backend
                await dashboardService.updateLocation(profileId, locationData);
                setUserLocation(locationData);
                
                // Format for display: "Street, State, Country Code" or "City, State, Country Code"
                const displayParts = [];
                if (street) {
                    displayParts.push(street);
                } else if (locationData.city) {
                    displayParts.push(locationData.city);
                }
                if (locationData.state) displayParts.push(locationData.state);
                if (locationData.countryCode) displayParts.push(locationData.countryCode);
                setFormattedLocation(displayParts.join(', '));

                // Fetch nearby hotspots with new location
                const hotspots = await dashboardService.getNearbyHotspots(latitude, longitude, 5, 10);
                setNearbyHotspots(hotspots);
                if (hotspots.length > 0) {
                    setSelectedHotspot(hotspots[0]);
                }
            }
        } catch (error) {
            console.error('Error getting location:', error);
        }
    };

    const onRefresh = async () => {
        setIsRefreshing(true);
        await loadDashboardData();
        setIsRefreshing(false);
    };

    // Format balance for display
    const formatBalance = (amount) => {
        return new Intl.NumberFormat('en-NG', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount || 0);
    };

    // Get display name
    const getDisplayName = () => {
        if (profile?.first_name) {
            return `Hi ${profile.first_name}`;
        }
        if (userData?.firstName) {
            return `Hi ${userData.firstName}`;
        }
        return 'Hi there';
    };

    // Get avatar URL (uses Gravatar from profile or fallback)
    const getAvatarUrl = () => {
        if (profile?.avatar_url) {
            return profile.avatar_url;
        }
        // Fallback to default avatar
        return 'https://gravatar.com/avatar/00000000000000000000000000000000?d=mp';
    };

    const translateX = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [2, 77],
    });

    // Show loading state
    if (isLoading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView 
                contentContainerStyle={styles.scroll}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                        colors={[Colors.primary]}
                    />
                }
            >

                <View style={styles.toggleContainer}>
                    <View style={styles.toggleBackground}>
                        <Animated.View
                            style={[
                                styles.toggleInnerButton,
                                { transform: [{ translateX }] },
                            ]}
                        />
                        <TouchableOpacity
                            style={styles.toggleBtn}
                            onPress={() => handleToggle("User")}
                        >
                            <Text
                                style={[
                                    styles.toggleText,
                                    activeTab === "User" && styles.activeToggleText,
                                ]}
                            >
                                User
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.toggleBtn}
                            onPress={() => handleToggle("Host")}
                        >
                            <Text
                                style={[
                                    styles.toggleText,
                                    activeTab === "Host" && styles.activeToggleText,
                                ]}
                            >
                                Host
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.header}>
                    <View style={styles.userSection}>
                        <Image
                            source={{ uri: getAvatarUrl() }}
                            style={styles.avatar}
                        />
                        <View>
                            <Text style={styles.username}>{getDisplayName()}</Text>
                            <View style={styles.location}>
                                <Ionicons name="location-outline" size={14} color="#007AFF" />
                                <Text style={styles.locationText}>
                                    {formattedLocation || 'Location not set'}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
                        <Ionicons name="notifications-outline" size={24} color="#007AFF" />
                    </TouchableOpacity>
                </View>


                <View style={styles.walletCard}>
                    <View style={styles.walletTop}>
                        <View style={styles.leftSection}>
                            <View style={styles.balanceRow}>
                                <Text style={styles.walletLabel}>Available Balance</Text>
                                <TouchableOpacity
                                    onPress={() => setBalanceVisible(!balanceVisible)}
                                >
                                    <Ionicons
                                        name={balanceVisible ? "eye-outline" : "eye-off-outline"}
                                        size={18}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.amountContainer}>
                                <Text style={styles.walletAmount}>
                                    {balanceVisible ? formatBalance(balance.balance) : "•••••"}
                                </Text>
                                <Text style={styles.currency}>
                                    {balanceVisible ? balance.currency : ""}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.transactionSection}>
                            <TouchableOpacity 
                                style={styles.transactionHistory}
                                onPress={() => navigation.navigate("TransactionHistory", { profileId: profile?.id })}
                            >
                                <Text style={styles.walletLink}>Transaction History ›</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.walletButton}
                                onPress={() => navigation.navigate("ViewWallet", { profileId: profile?.id })}
                            >
                                <Text style={styles.walletButtonText}>View Wallet</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.actionItem}>
                        <View style={styles.actionCircle}>
                            <Ionicons name="share-social-outline" size={28} color="#fff" />
                        </View>
                        <Text style={styles.actionText}>Share Hotspot</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionItem}>
                        <View style={styles.actionCircle}>
                            <Ionicons name="wifi-outline" size={28} color="#fff" />
                        </View>
                        <Text style={styles.actionText}>Connect to Wifi</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionItem}>
                        <View style={styles.actionCircle}>
                            <Ionicons name="wallet-outline" size={28} color="#fff" />
                        </View>
                        <Text style={styles.actionText}>Withdraw</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Nearby Wifi</Text>
                    <TouchableOpacity
                        style={styles.seeMore}
                        onPress={() => navigation.navigate("NearbyWifi")}
                    >
                        <Text style={styles.link}>See More ›</Text>
                    </TouchableOpacity>
                </View>


                <Image
                    source={{ uri: "https://res.cloudinary.com/dgr8yasgo/image/upload/v1763115690/Map_Maker__Lagos_Lagos_Nigeria_Retro_rtub6v.png" }}
                    style={styles.map}
                />


                {selectedHotspot ? (
                    <View style={styles.wifiCard}>
                        <View style={styles.wifiTopRow}>
                            <Text style={styles.wifiName}>{selectedHotspot.name || selectedHotspot.ssid || 'Unknown Hotspot'}</Text>
                            <Text style={styles.wifiPrice}>{selectedHotspot.price_per_mb || 0}{balance.currency}/MB</Text>
                        </View>

                        <View style={styles.wifiMidRow}>
                            <Text style={styles.wifiDistance}>
                                {selectedHotspot.distance_km < 1 
                                    ? `${Math.round(selectedHotspot.distance_km * 1000)} m away`
                                    : `${selectedHotspot.distance_km.toFixed(1)} km away`
                                }
                            </Text>
                            <Text style={styles.wifiSpeed}>Speed: {selectedHotspot.speed_mbps || 0}Mbps</Text>
                        </View>

                        <View style={styles.wifiBottomRow}>
                            <Text style={styles.wifiRating}>Rating: {selectedHotspot.average_rating || 0}/5.0</Text>
                            <TouchableOpacity
                                style={[
                                    styles.connectBtn,
                                    isWifiConnected && styles.connectedBtn,
                                ]}
                                onPress={handleConnectWifi}
                            >
                                <Text
                                    style={[
                                        styles.connectText,
                                        isWifiConnected && styles.connectedText,
                                    ]}
                                >
                                    {isWifiConnected ? "Connected" : "Connect"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={styles.wifiCard}>
                        <View style={styles.noHotspotsContainer}>
                            <Ionicons name="wifi-outline" size={40} color="#ccc" />
                            <Text style={styles.noHotspotsText}>No nearby hotspots found</Text>
                            <Text style={styles.noHotspotsSubtext}>Pull down to refresh</Text>
                        </View>
                    </View>
                )}


                <View style={styles.optionsContainer}>
                    <Text style={styles.optionsText}>Options</Text>
                </View>
            </ScrollView>


            <NavigationBar
                isWifiConnected={isWifiConnected}
                onWifiPress={handleConnectWifi}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.backgroundGray },
    scroll: { paddingBottom: 100 },

    toggleContainer: { alignItems: "center", marginTop: 50 },
    toggleBackground: {
        flexDirection: "row",
        backgroundColor: "#E9F0FF",
        width: 160,
        height: 38,
        borderRadius: 4,
        overflow: "hidden",
    },
    toggleInnerButton: {
        position: "absolute",
        width: "50%",
        height: "85%",
        backgroundColor: "#007AFF",
        top: 3,
        left: 3,
        borderRadius: 6,
    },
    toggleBtn: { flex: 1, justifyContent: "center", alignItems: "center" },
    toggleText: { color: "#007AFF", fontSize: 13, fontWeight: "500" },
    activeToggleText: { color: "#fff", fontWeight: "700" },


    header: {
        marginTop: 25,
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    userSection: { flexDirection: "row", alignItems: "center" },
    avatar: { width: 45, height: 45, borderRadius: 22.5, marginRight: 10 },
    username: { fontSize: 16, fontWeight: "600" },
    location: { flexDirection: "row", alignItems: "center" },
    locationText: { color: "#555", fontSize: 13, marginLeft: 3 },


    walletCard: {
        backgroundColor: Colors.primaryLight,
        marginHorizontal: 20,
        borderRadius: 12,
        padding: 20,
        marginTop: 30,
    },
    walletTop: { flexDirection: "row", justifyContent: "space-between" },
    balanceRow: { flexDirection: "row", alignItems: "center", gap: 6 },
    walletLabel: { color: "#fff", opacity: 0.9, fontSize: 13 },
    amountContainer: { flexDirection: "row", alignItems: "flex-start" },
    walletAmount: { fontSize: 28, fontWeight: "bold", color: "#fff" },
    currency: { color: "#fff", fontSize: 10, marginLeft: 4, marginTop: 5 },
    transactionSection: { alignItems: "flex-end" },
    walletLink: { color: "#fff", fontSize: 14 },
    walletButton: {
        backgroundColor: "#fff",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
        marginTop: 10,
    },
    walletButtonText: { color: "#007AFF", fontWeight: "600", fontSize: 12 },


    actionRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 25,
        marginHorizontal: 10,
    },
    actionItem: { alignItems: "center" },
    actionCircle: {
        width: 60,
        height: 60,
        backgroundColor: Colors.primary,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 6,
    },
    actionText: { fontSize: 13, fontWeight: "500", color: "#333" },


    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginTop: 25,
    },
    sectionTitle: { fontSize: 16, fontWeight: "600" },
    link: { color: "#000", fontWeight: "500", fontSize: 16 },
    map: {
        marginHorizontal: 20,
        marginVertical: 15,
        height: 150,
        borderRadius: 10,
    },
    wifiCard: {
        backgroundColor: "#fff",
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 12,
        elevation: 2,
        marginBottom: 30,
    },
    wifiTopRow: { flexDirection: "row", justifyContent: "space-between" },
    wifiMidRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 6,
    },
    wifiBottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    wifiName: { fontWeight: "600", fontSize: 14 },
    wifiPrice: { fontWeight: "600", fontSize: 13 },
    wifiDistance: { color: "#666", fontSize: 12 },
    wifiSpeed: { color: "#666", fontSize: 12 },
    wifiRating: { color: "#666", fontSize: 12 },
    connectBtn: {
        backgroundColor: Colors.primaryLight,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 6,
    },
    connectedBtn: { backgroundColor: Colors.successLight },
    connectText: { color: "#fff", fontWeight: "600", fontSize: 13 },
    connectedText: { color: "#fff", fontWeight: "600" },


    optionsContainer: { marginLeft: 20, marginBottom: 40 },
    optionsText: { fontSize: 18, fontWeight: "700", color: "#000" },
    
    // Loading styles
    loadingContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: "#666",
    },
    
    // No hotspots styles
    noHotspotsContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 30,
    },
    noHotspotsText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#666",
        marginTop: 12,
    },
    noHotspotsSubtext: {
        fontSize: 13,
        color: "#999",
        marginTop: 4,
    },
});

export default HomeScreen;
