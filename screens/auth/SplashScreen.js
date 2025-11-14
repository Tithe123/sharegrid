import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, StatusBar, Image, Animated } from "react-native";

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
      ]).start(() => {
        navigation.replace("Onboarding");
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
