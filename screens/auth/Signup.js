import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Animated,
  Easing
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GoogleIcon } from "../common/svgs";

export default function Signup({ navigation }) {
  const [secureText, setSecureText] = useState(true);
  const [confirmSecure, setConfirmSecure] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const dotAnimation1 = useRef(new Animated.Value(0)).current;
  const dotAnimation2 = useRef(new Animated.Value(0)).current;
  const dotAnimation3 = useRef(new Animated.Value(0)).current;

  const handleSignup = () => {
    setIsLoading(true);

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


    setTimeout(() => {
      setIsLoading(false);

      dotAnimation1.setValue(0);
      dotAnimation2.setValue(0);
      dotAnimation3.setValue(0);
      navigation.replace("Home");
    }, 3000);
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/logo2.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>ShareGrid</Text>
      </View>

      <Text style={styles.title}>Sign up to Continue</Text>

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        placeholder="Enter your email"
        placeholderTextColor="#999"
        style={styles.input}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="#999"
          style={styles.inputPassword}
          secureTextEntry={secureText}
        />
        <TouchableOpacity
          onPress={() => setSecureText(!secureText)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={secureText ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#666"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.passwordHint}>must contain 8 char.</Text>

      <Text style={styles.label}>Confirm Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Confirm password"
          placeholderTextColor="#999"
          style={styles.inputPassword}
          secureTextEntry={confirmSecure}
        />
        <TouchableOpacity
          onPress={() => setConfirmSecure(!confirmSecure)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={confirmSecure ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.signupButton, isLoading && styles.signupButtonDisabled]}
        onPress={handleSignup}
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
          <Text style={styles.signupText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Or Sign up With</Text>
        <View style={styles.divider} />
      </View>

      <TouchableOpacity 
        style={styles.socialButton}
        onPress={() => navigation.navigate("EnhancedSignup", { method: "google" })}
      >
        <View style={styles.socialButtonContent}>
          <GoogleIcon />
          <Text style={styles.socialText}>Sign up with Google</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.socialButton}
        onPress={() => navigation.navigate("EnhancedSignup", { method: "apple" })}
      >
        <View style={styles.socialButtonContent}>
          <Ionicons name="logo-apple" size={24} color="black" />
          <Text style={styles.socialText}>Sign up with Apple</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={{ color: "#000" }}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ color: "#2979FF" }}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 20,
    justifyContent: "center",
    paddingVertical: 30,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    marginTop: 50,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  logoText: {
    fontSize: 24,
    color: "#2979FF",
    fontWeight: "700",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    marginBottom: 30,
  },
  label: {
    color: "#000",
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    color: "#000",
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  inputPassword: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: "#000",
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  passwordHint: {
    color: "#666",
    fontSize: 12,
    marginBottom: 15,
    marginLeft: 5,
  },
  signupButton: {
    backgroundColor: "#2979FF",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  signupButtonDisabled: {
    opacity: 0.8,
  },
  signupText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingDot: {
    color: "#fff",
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
    backgroundColor: "#e9ecef",
  },
  dividerText: {
    color: "#666",
    marginHorizontal: 10,
    fontSize: 14,
  },
  socialButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  socialButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  socialText: {
    fontSize: 14,
    color: "#9EA2AD",
    marginLeft: 10,
    fontWeight: "500",
  },
  terms: {
    textAlign: "center",
    color: "#666",
    marginTop: 10,
    marginBottom: 20,
  },
  link: {
    color: "#2979FF",
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 30,
  },
});