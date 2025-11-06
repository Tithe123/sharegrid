import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

export default function SavedBeneficiariesScreen() {
    const navigation = useNavigation();

    const beneficiaries = [
        {
            id: 1,
            name: "Adeleye Akinbade-Ojo",
            bank: "Opay",
            accountNumber: "19091",  
        },
        {
            id: 2,
            name: "Adeleye Akinbade-Ojo",
            bank: "Opay",
            accountNumber: "19091",  
        },
        {
            id: 3,
            name: "Adeleye Akinbade-Ojo",
            bank: "Opay",
            accountNumber: "19091",  
        },
        {
            id: 4,
            name: "Adeleye Akinbade-Ojo",
            bank: "Opay",
            accountNumber: "19091",  
        }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="chevron-left" size={22} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Beneficiaries</Text>
                <View style={{ width: 22 }} />
            </View>

            <ScrollView 
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.beneficiariesList}>
                    {beneficiaries.map((beneficiary) => (
                        <TouchableOpacity 
                            key={beneficiary.id}
                            style={styles.beneficiaryCard}
                            onPress={() => {
                                console.log("Selected beneficiary:", beneficiary);
                            }}
                        >
                            <View style={styles.cardContent}>
                                <LinearGradient
                                    colors={["#ef4444", "#ffffff"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.iconContainer}
                                >
                                    <Feather name="monitor" size={20} color="#fff" />
                                </LinearGradient>
                                
                                <View style={styles.detailsContainer}>
                                    <Text style={styles.beneficiaryName}>
                                        {beneficiary.name}
                                    </Text>
                                    <Text style={styles.beneficiaryDetails}>
                                        {beneficiary.accountNumber} • {beneficiary.bank}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#f5f7fb", 
        padding: 20,
        marginTop: 40,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 30,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000",
        flex: 1,
        textAlign: "center",
    },
    scrollContainer: {
        flex: 1,
    },
    beneficiariesList: {
        gap: 16,
    },
    beneficiaryCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1.5,
        borderColor: "#e6eeff",
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 12,
        marginRight: 12,
    },
    beneficiaryName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
        marginBottom: 4,
    },
    beneficiaryDetails: {
        fontSize: 14,
        color: "#64748b",
        fontWeight: "400",
    },
});