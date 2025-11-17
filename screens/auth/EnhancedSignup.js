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
  Easing,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GoogleIcon } from "../common/svgs";
import authService from "../../services/authService";

export default function EnhancedSignup({ navigation, route }) {
  const [secureText, setSecureText] = useState(true);
  const [confirmSecure, setConfirmSecure] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });

  // Get signup method from route params (email, google, apple)
  const signupMethod = route?.params?.method || 'email';

  const dotAnimation1 = useRef(new Animated.Value(0)).current;
  const dotAnimation2 = useRef(new Animated.Value(0)).current;
  const dotAnimation3 = useRef(new Animated.Value(0)).current;

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

  const handleEmailSignup = async () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setIsLoading(true);
    startLoadingAnimation();

    try {
      await authService.signup(
        formData.email,
        formData.password,
        formData.firstName || null,
        formData.lastName || null
      );
      
      stopLoadingAnimation();
      setIsLoading(false);
      
      // Navigate to email verification screen
      navigation.navigate('Verify', { email: formData.email });
    } catch (error) {
      stopLoadingAnimation();
      setIsLoading(false);
      Alert.alert('Signup Failed', error.message);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    startLoadingAnimation();

    try {
      const result = await authService.signInWithGoogle();
      stopLoadingAnimation();
      setIsLoading(false);
      
      // Navigate to role selection
      navigation.replace("Home");
    } catch (error) {
      stopLoadingAnimation();
      setIsLoading(false);
      Alert.alert('Google Signup Failed', error.message);
    }
  };

  const handleAppleSignup = async () => {
    setIsLoading(true);
    startLoadingAnimation();

    try {
      const result = await authService.signInWithApple();
      stopLoadingAnimation();
      setIsLoading(false);
      
      // Navigate to role selection
      navigation.replace("Home");
    } catch (error) {
      stopLoadingAnimation();
      setIsLoading(false);
      Alert.alert('Apple Signup Failed', error.message);
    }
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

  const renderEmailSignupForm = () => (
    <>
      <Text style={styles.label}>First Name (Optional)</Text>
      <TextInput
        placeholder="Enter your first name"
        placeholderTextColor="#999"
        style={styles.input}
        value={formData.firstName}
        onChangeText={(text) => setFormData({...formData, firstName: text})}
      />

      <Text style={styles.label}>Last Name (Optional)</Text>
      <TextInput
        placeholder="Enter your last name"
        placeholderTextColor="#999"
        style={styles.input}
        value={formData.lastName}
        onChangeText={(text) => setFormData({...formData, lastName: text})}
      />

      <Text style={styles.label}>E-mail *</Text>
      <TextInput
        placeholder="Enter your email"
        placeholderTextColor="#999"
        style={styles.input}
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => setFormData({...formData, email: text})}
      />

      <Text style={styles.label}>Password *</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="#999"
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
            color="#666"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.passwordHint}>must contain 8 char.</Text>

      <Text style={styles.label}>Confirm Password *</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Confirm password"
          placeholderTextColor="#999"
          style={styles.inputPassword}
          secureTextEntry={confirmSecure}
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
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
        onPress={handleEmailSignup}
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
    </>
  );

  const renderSocialSignup = () => (
    <>
      <TouchableOpacity 
        style={[styles.socialButton, isLoading && styles.signupButtonDisabled]}
        onPress={handleGoogleSignup}
        disabled={isLoading}
      >
        <View style={styles.socialButtonContent}>
          <GoogleIcon />
          <Text style={styles.socialText}>Sign up with Google</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.socialButton, isLoading && styles.signupButtonDisabled]}
        onPress={handleAppleSignup}
        disabled={isLoading}
      >
        <View style={styles.socialButtonContent}>
          <Ionicons name="logo-apple" size={24} color="black" />
          <Text style={styles.socialText}>Sign up with Apple</Text>
        </View>
      </TouchableOpacity>

      {isLoading && (
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
      )}
    </>
  );

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

      <Text style={styles.title}>
        {signupMethod === 'email' ? 'Sign up to Continue' : 'Choose Sign Up Method'}
      </Text>

      {signupMethod === 'email' ? renderEmailSignupForm() : renderSocialSignup()}

      {signupMethod === 'email' && (
        <>
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>Or Sign up With</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity 
            style={styles.socialButton}
            onPress={handleGoogleSignup}
            disabled={isLoading}
          >
            <View style={styles.socialButtonContent}>
              <GoogleIcon />
              <Text style={styles.socialText}>Sign up with Google</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.socialButton}
            onPress={handleAppleSignup}
            disabled={isLoading}
          >
            <View style={styles.socialButtonContent}>
              <Ionicons name="logo-apple" size={24} color="black" />
              <Text style={styles.socialText}>Sign up with Apple</Text>
            </View>
          </TouchableOpacity>
        </>
      )}

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
    backgroundColor: "#F8F9FB",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  logoContainer: {
    width: 203.11224365234375,
    height: 78.0999984741211,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 12,
    alignSelf: "center",
    marginBottom: 20,
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
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    color: "#000",
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  inputPassword: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  eyeIcon: {
    paddingHorizontal: 16,
  },
  passwordHint: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  signupButton: {
    backgroundColor: "#2979FF",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 24,
  },
  signupButtonDisabled: {
    backgroundColor: "#B0B0B0",
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
    fontSize: 20,
    marginHorizontal: 2,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#666",
    fontSize: 14,
  },
  socialButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 12,
  },
  socialButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  socialText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
});
