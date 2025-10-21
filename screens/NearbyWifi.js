import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

const wifiList = [
    { id: "1", name: "LTE_WIFI_Airtel2.4G_8002", location: "4634 Uromi 200M", speed: 80, price: 300 },
    { id: "2", name: "LTE_WIFI_Airtel2.4G_8002", location: "4634 Uromi 200M", speed: 80, price: 300 },
    { id: "3", name: "LTE_WIFI_Airtel2.4G_8002", location: "4634 Uromi 200M", speed: 80, price: 300 },
    { id: "4", name: "LTE_WIFI_Airtel2.4G_8002", location: "4634 Uromi 200M", speed: 80, price: 300 },
];

export default function NearbyWifiScreen() {
    const [connectedWifi, setConnectedWifi] = useState(null);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [speedRange, setSpeedRange] = useState([10, 50]);
    const [priceRange, setPriceRange] = useState([0.1, 100]);
    const [selectedWifi, setSelectedWifi] = useState(null);
    const [activeRow, setActiveRow] = useState("overview");
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleConnect = (wifiId) => {
        const wifi = wifiList.find((w) => w.id === wifiId);
        setSelectedWifi(wifi);
    };

    const handleConnectClick = () => {

        setShowConfirmation(true);
    };

    const confirmConnection = () => {
        if (selectedWifi) {
            setConnectedWifi(selectedWifi.id);
        }
        setSelectedWifi(null);
        setShowConfirmation(false);
    };

    const cancelConnection = () => {
        setShowConfirmation(false);

    };

    const handleDisconnect = () => {
        setConnectedWifi(null);
        setSelectedWifi(null);
    };

    const closeDetailsModal = () => {
        setSelectedWifi(null);
        setShowConfirmation(false);
    };

    const renderItem = ({ item }) => {
        const isConnected = connectedWifi === item.id;
        return (
            <View style={styles.card}>
                <View style={styles.rowBetween}>
                    <View>
                        <Text style={styles.ssid}>{item.name}</Text>
                        <Text style={styles.location}>{item.location}</Text>
                    </View>
                    <View style={styles.speedContainer}>
                        <Text style={styles.speed}>{item.speed}</Text>
                        <Text style={styles.mbps}>mbps</Text>
                        <Ionicons name="wifi" size={18} color="#1EC76C" style={{ marginLeft: 4 }} />
                    </View>
                </View>
                <TouchableOpacity
                    style={[styles.connectButton, isConnected && styles.connectedButton]}
                    onPress={() => handleConnect(item.id)}
                >
                    <Ionicons name="wifi" size={18} color="#fff" />
                    <Text style={[styles.connectText, isConnected && styles.connectedText]}>
                        {isConnected ? "Connected" : "Connect"}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerCard}>
                <View style={styles.headerRow}>
                    <TouchableOpacity>
                        <Ionicons name="chevron-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Nearby Wifi</Text>
                    <View style={{ flex: 1 }} />
                </View>
                <View style={styles.filterRow}>
                    <Text style={styles.filterText}>Popular/Recommended</Text>
                    <TouchableOpacity
                        style={styles.filterButton}
                        onPress={() => setIsFilterVisible(true)}
                    >
                        <Ionicons name="options-outline" size={18} color="#fff" />
                        <Text style={styles.filterBtnText}>Filter</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={wifiList}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.flatListContent}
            />


            <Modal
                visible={isFilterVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsFilterVisible(false)}
            >
                <View style={styles.filterModalOverlay}>
                    <View style={styles.filterModal}>
                        <View style={styles.filterHeader}>
                            <Text style={styles.modalTitle}>Filter</Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setIsFilterVisible(false)}
                            >
                                <Ionicons name="close" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>Internet Speed (Kbps | Mbps)</Text>
                            <Slider
                                style={styles.slider}
                                minimumValue={10}
                                maximumValue={50}
                                step={1}
                                value={speedRange[1]}
                                onValueChange={(value) => setSpeedRange([10, value])}
                                minimumTrackTintColor="#1E63F0"
                                maximumTrackTintColor="#D3D3D3"
                                thumbTintColor="#1E63F0"
                            />
                            <Text style={styles.rangeText}>{`${speedRange[0]}kb/s - ${speedRange[1]}mb/s`}</Text>
                        </View>
                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>Price per Mb</Text>
                            <Slider
                                style={styles.slider}
                                minimumValue={0.1}
                                maximumValue={100}
                                step={0.1}
                                value={priceRange[1]}
                                onValueChange={(value) => setPriceRange([0.1, value])}
                                minimumTrackTintColor="#1E63F0"
                                maximumTrackTintColor="#D3D3D3"
                                thumbTintColor="#1E63F0"
                            />
                            <Text style={styles.rangeText}>{`${priceRange[0]} - ${priceRange[1]} NGN`}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.doneButton}
                            onPress={() => setIsFilterVisible(false)}
                        >
                            <Text style={styles.doneText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={!!selectedWifi && !showConfirmation}
                animationType="slide"
                transparent={true}
                onRequestClose={closeDetailsModal}
            >
                <View style={styles.bottomModalOverlay}>
                    <View style={styles.bottomModal}>

                        <View style={styles.modalHeader}>
                            <View style={styles.profileSection}>
                                <View style={styles.profilePicPlaceholder} />
                                <View>
                                    <Text style={styles.detailsSsid}>{selectedWifi?.name}</Text>
                                    <Text style={styles.detailsLocation}>{selectedWifi?.location}</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={closeDetailsModal}
                            >
                                <Ionicons name="close" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>

                        {connectedWifi === selectedWifi?.id ? (

                            <TouchableOpacity
                                style={styles.disconnectButton}
                                onPress={handleDisconnect}
                            >
                                <Ionicons name="wifi" size={18} color="#FF4444" />
                                <Text style={styles.disconnectText}>Disconnect</Text>
                            </TouchableOpacity>
                        ) : (

                            <TouchableOpacity
                                style={styles.confirmConnectButton}
                                onPress={handleConnectClick}
                            >
                                <Ionicons name="wifi" size={18} color="#1E63F0" />
                                <Text style={styles.confirmConnectText}>Connect</Text>
                            </TouchableOpacity>
                        )}


                        <View style={styles.sideBySideContainer}>

                            <View style={styles.column}>
                                <TouchableOpacity
                                    style={[styles.rowTitleContainer, activeRow === "overview" && styles.activeRowTitle]}
                                    onPress={() => setActiveRow("overview")}
                                >
                                    <Text style={styles.sectionTitle}>Overview</Text>
                                    {activeRow === "overview" && <View style={styles.titleUnderline} />}
                                </TouchableOpacity>
                                <View style={styles.detailBox}>
                                    <Text style={styles.detailTitle}>Name</Text>
                                    <Text style={styles.detailValue}>{selectedWifi?.name}</Text>
                                </View>
                                <View style={styles.detailBox}>
                                    <Text style={styles.detailTitle}>Speed rating (mbps)</Text>
                                    <Text style={styles.detailValue}>{selectedWifi?.speed}</Text>
                                </View>
                            </View>


                            <View style={styles.column}>
                                <TouchableOpacity
                                    style={[styles.rowTitleContainer, activeRow === "history" && styles.activeRowTitle]}
                                    onPress={() => setActiveRow("history")}
                                >
                                    <Text style={styles.sectionTitle}>History</Text>
                                    {activeRow === "history" && <View style={styles.titleUnderline} />}
                                </TouchableOpacity>
                                <View style={styles.detailBox}>
                                    <Text style={styles.detailTitle}>Price per MB/ per day</Text>
                                    <Text style={styles.detailValue}>{selectedWifi?.price}NGN/1GB</Text>
                                </View>
                                <View style={styles.detailBox}>
                                    <Text style={styles.detailTitle}>Data Used</Text>
                                    <Text style={styles.detailValue}>2.1</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={showConfirmation}
                animationType="slide"
                transparent={true}
                onRequestClose={cancelConnection}
            >
                <View style={styles.confirmationModalOverlay}>
                    <View style={styles.confirmationModal}>

                        <View style={styles.confirmationHeader}>
                            <View style={styles.confirmationTitlePlaceholder} />
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={cancelConnection}
                            >
                                <Ionicons name="close" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>


                        <View style={styles.exclamationCircle}>
                            <Ionicons name="warning-outline" size={40} color="#FFA500" />
                        </View>


                        <Text style={styles.confirmationTitle}>
                            Are you sure you want to proceed to make payment to connect to this WiFi?
                        </Text>


                        <View style={styles.confirmationButtons}>
                            <TouchableOpacity
                                style={styles.noButton}
                                onPress={cancelConnection}
                            >
                                <Text style={styles.noButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.yesButton}
                                onPress={confirmConnection}
                            >
                                <Text style={styles.yesButtonText}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F6FA",
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    flatListContent: {
        backgroundColor: "#F4F6FA",
        paddingBottom: 40,
    },
    headerCard: {
        backgroundColor: "#fff",
        padding: 20,
        marginBottom: 20,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "700",
        marginLeft: 12,
    },
    filterRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    filterModalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    filterModal: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: "60%",
    },
    filterHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },

    bottomModalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    bottomModal: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: "70%",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 15,
    },
    profileSection: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    profilePicPlaceholder: {
        width: 50,
        height: 50,
        backgroundColor: "#D3D3D3",
        borderRadius: 25,
        marginRight: 12,
    },
    detailsSsid: {
        fontWeight: "700",
        fontSize: 16,
        marginBottom: 4,
    },
    detailsLocation: {
        color: "#888",
        fontSize: 14,
    },
    closeButton: {
        padding: 4,
    },
    confirmConnectButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#1E63F0",
        paddingVertical: 12,
        borderRadius: 10,
        marginBottom: 20,
    },
    confirmConnectText: {
        color: "#1E63F0",
        fontWeight: "600",
        marginLeft: 8,
        fontSize: 15,
    },
    disconnectButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#FF4444",
        paddingVertical: 12,
        borderRadius: 10,
        marginBottom: 20,
    },
    disconnectText: {
        color: "#FF4444",
        fontWeight: "600",
        marginLeft: 8,
        fontSize: 15,
    },

    sideBySideContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 15,
    },
    column: {
        flex: 1,
    },
    rowTitleContainer: {
        marginBottom: 15,
        marginTop: 10,
        alignItems: "center",
        paddingBottom: 8,
    },
    activeRowTitle: {

    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1E63F0",
        marginBottom: 5,
    },
    titleUnderline: {
        width: "80%",
        height: 3,
        backgroundColor: "#1E63F0",
        borderRadius: 2,
    },
    detailBox: {
        backgroundColor: "#F8F9FA",
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        marginBottom: 8,
    },
    detailTitle: {
        fontSize: 10,
        color: "#666",
        marginBottom: 2,
        fontWeight: "500",
    },
    detailValue: {
        fontSize: 12,
        fontWeight: "600",
        color: "#000",
    },
    filterText: {
        fontSize: 18,
        color: "#000",
        fontWeight: "700",
    },
    filterButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1E63F0",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    filterBtnText: {
        color: "#fff",
        marginLeft: 8,
        fontWeight: "600",
        fontSize: 14,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    ssid: {
        fontWeight: "700",
        fontSize: 16,
    },
    location: {
        color: "#888",
        fontSize: 14,
        marginTop: 4,
    },
    speedContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    speed: {
        fontSize: 20,
        fontWeight: "700",
    },
    mbps: {
        fontSize: 14,
        color: "#555",
        marginLeft: 4,
    },
    connectButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1E63F0",
        paddingVertical: 12,
        borderRadius: 10,
    },
    connectedButton: {
        backgroundColor: "#22C55E",
    },
    connectText: {
        color: "#fff",
        fontWeight: "600",
        marginLeft: 8,
        fontSize: 15,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "700",
    },
    filterSection: {
        marginBottom: 20,
    },
    filterLabel: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    slider: {
        width: "100%",
        height: 40,
    },
    rangeText: {
        fontSize: 14,
        color: "#555",
        textAlign: "center",
        marginTop: 8,
    },
    doneButton: {
        backgroundColor: "#1E63F0",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    doneText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },

    confirmationModalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    confirmationModal: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: "center",
    },
    confirmationHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 10,
    },
    confirmationTitlePlaceholder: {
        width: 24,
    },
    exclamationCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#FFA500",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    confirmationTitle: {
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
        color: "#000",
        marginBottom: 25,
        lineHeight: 22,
    },
    confirmationButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        gap: 15,
    },
    noButton: {
        flex: 1,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#1E63F0",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    noButtonText: {
        color: "#1E63F0",
        fontWeight: "600",
        fontSize: 16,
    },
    yesButton: {
        flex: 1,
        backgroundColor: "#1E63F0",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    yesButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
});