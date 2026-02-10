import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
    Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PRIMARY_BLUE = "#2563EB";

export default function HostEditProfile() {
    const navigation = useNavigation();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [cardNumber, setCardNumber] = useState("");

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.topBg}>
                    <View style={styles.headerRow}>
                        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={10}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Edit Profile</Text>
                        <View style={styles.headerRightSpacer} />
                    </View>

                    <View style={styles.avatarBlock}>
                        <View style={styles.avatarRing}>
                            <Image
                                source={require("../../assets/illustration 1.png")}
                                style={styles.avatar}
                            />
                        </View>
                        <View style={styles.avatarEditBtn}>
                            <Ionicons name="image-outline" size={16} color={PRIMARY_BLUE} />
                        </View>
                    </View>
                </View>

                <View style={styles.form}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        value={firstName}
                        onChangeText={setFirstName}
                        placeholder=""
                        placeholderTextColor="#CBD5E1"
                        style={styles.input}
                    />

                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                        value={lastName}
                        onChangeText={setLastName}
                        placeholder=""
                        placeholderTextColor="#CBD5E1"
                        style={styles.input}
                    />

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder=""
                        placeholderTextColor="#CBD5E1"
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Text style={styles.label}>Card Number</Text>
                    <TextInput
                        value={cardNumber}
                        onChangeText={setCardNumber}
                        placeholder=""
                        placeholderTextColor="#CBD5E1"
                        style={styles.input}
                        keyboardType="number-pad"
                    />

                    <Pressable
                        onPress={() => navigation.goBack()}
                        style={({ pressed }) => [
                            styles.saveBtn,
                            pressed && styles.saveBtnPressed,
                        ]}
                    >
                        <Text style={styles.saveBtnText}>Save Changes</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFFFFF" },
    scroll: { paddingBottom: 28 },

    topBg: {
        paddingTop: 70,
        paddingHorizontal: 16,
        paddingBottom: 12,
        backgroundColor: "#F5FAFF",
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    cancelText: { fontSize: 13, fontWeight: "900", color: PRIMARY_BLUE },
    headerTitle: { fontSize: 18, fontWeight: "900", color: PRIMARY_BLUE },
    headerRightSpacer: { width: 52 },

    avatarBlock: {
        marginTop: 18,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 10,
    },
    avatarRing: {
        width: 104,
        height: 104,
        borderRadius: 52,
        borderWidth: 4,
        borderColor: PRIMARY_BLUE,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
    },
    avatar: { width: 86, height: 86, borderRadius: 43 },
    avatarEditBtn: {
        position: "absolute",
        right: 110,
        bottom: 26,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#FFFFFF",
        borderWidth: 2,
        borderColor: "#EAF2FF",
        alignItems: "center",
        justifyContent: "center",
    },

    form: { paddingHorizontal: 16, paddingTop: 16 },
    label: { fontSize: 12, fontWeight: "900", color: "#111", marginTop: 14 },
    input: {
        marginTop: 8,
        height: 54,
        borderRadius: 10,
        backgroundColor: "#F1F5F9",
        paddingHorizontal: 14,
        fontSize: 14,
        fontWeight: "800",
        color: "#111",
    },

    saveBtn: {
        marginTop: 26,
        height: 54,
        borderRadius: 10,
        backgroundColor: PRIMARY_BLUE,
        alignItems: "center",
        justifyContent: "center",
    },
    saveBtnPressed: { opacity: 0.92 },
    saveBtnText: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },
});
