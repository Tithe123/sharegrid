import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, StatusBar, Image, Animated } from "react-native";
import authService from "../../services/authService";

export default function SplashScreen({ navigation }) {
  const [displayText, setDisplayText] = useState("");
  const fullText = "ShareGrid";
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let index = 0;
    let timeoutId = null;
    let mounted = true;

    const typeCharacter = () => {
      if (!mounted || index >= fullText.length) return;

      setDisplayText(fullText.substring(0, index + 1));
      index++;

      if (mounted && index < fullText.length) {
        timeoutId = setTimeout(typeCharacter, 150);
      }
    };

    timeoutId = setTimeout(typeCharacter, 150);

    const fadeTimeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        })
      ]).start(async () => {
        // Check if user is already authenticated
        const isAuthenticated = await authService.isAuthenticated();
        
        if (isAuthenticated) {
          const session = await authService.checkSession();
          
          if (session) {
            // Get user profiles
            const profiles = await authService.getUserProfiles(session.user.id);
            
            // Check if user has complete profile (name and role set)
            const hasCompleteProfile = authService.checkProfileComplete(profiles);
            
            if (hasCompleteProfile) {
              // User has complete profile, navigate to appropriate dashboard
              const primaryProfile = authService.getPrimaryProfile(profiles);
              
              // Navigate based on role
              if (primaryProfile.role === 'host') {
                navigation.replace('HostHome');
              } else {
                navigation.replace('HomeScreen');
              }
            } else {
              // Profile incomplete or doesn't exist, go to role selection
              navigation.replace("Home", {
                email: session.user.email,
                supabaseUserId: session.user.id,
                needsProfileCreation: true
              });
            }
          } else {
            // No valid session, show onboarding
            navigation.replace("Onboarding");
          }
        } else {
          // Not authenticated, show onboarding
          navigation.replace("Onboarding");
        }
      });
    }, 9000);

    return () => {
      mounted = false;
      if (timeoutId) clearTimeout(timeoutId);
      clearTimeout(fadeTimeout);
    };
  }, []);

  return (
    <Animated.View style={[
      styles.container,
      {
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }]
      }
    ]}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.row}>
        <Image source={require("../../assets/logo2.png")} style={styles.logo} />
        <Text style={styles.typewriter}>{displayText}</Text>
      </View>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4efefff",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 10,
  },
  typewriter: {
    color: "2563EB",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 1,
  },
});
