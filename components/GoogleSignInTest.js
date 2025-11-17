import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import authService from '../services/authService';

export default function GoogleSignInTest() {
  const handleGoogleSignIn = async () => {
    try {
      console.log('Test: Starting Google Sign-In from component...');
      const result = await authService.signInWithGoogle();
      console.log('Test: Google Sign-In result:', result);
      Alert.alert('Success', 'Google Sign-In successful!');
    } catch (error) {
      console.error('Test: Google Sign-In error:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Google Sign-In Test</Text>
      <TouchableOpacity style={styles.button} onPress={handleGoogleSignIn}>
        <Text style={styles.buttonText}>Test Google Sign-In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4285F4',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
