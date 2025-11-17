import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

export default function EnvChecker() {
  const checkEnvVars = () => {
    const vars = {
      'EXPO_PUBLIC_SUPABASE_URL': process.env.EXPO_PUBLIC_SUPABASE_URL,
      'EXPO_PUBLIC_SUPABASE_ANON_KEY': process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
      'EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID': process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
      'EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID': process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
      'EXPO_PUBLIC_APPLE_CLIENT_ID': process.env.EXPO_PUBLIC_APPLE_CLIENT_ID,
    };

    console.log('=== Environment Variables Check ===');
    Object.entries(vars).forEach(([key, value]) => {
      console.log(`${key}: ${value || 'undefined'}`);
    });
    console.log('===================================');

    const report = Object.entries(vars)
      .map(([key, value]) => `${key}: ${value ? '✅ Set' : '❌ Missing'}`)
      .join('\n');

    Alert.alert('Environment Variables', report);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Environment Variables Checker</Text>
      <TouchableOpacity style={styles.button} onPress={checkEnvVars}>
        <Text style={styles.buttonText}>Check Environment Variables</Text>
      </TouchableOpacity>
      
      <View style={styles.info}>
        <Text style={styles.infoTitle}>Expected Values:</Text>
        <Text style={styles.infoText}>• SUPABASE_URL should start with "https://"</Text>
        <Text style={styles.infoText}>• SUPABASE_ANON_KEY should be a JWT token</Text>
        <Text style={styles.infoText}>• GOOGLE_IOS_CLIENT_ID should end with ".apps.googleusercontent.com"</Text>
        <Text style={styles.infoText}>• All variables should be defined (not undefined)</Text>
      </View>
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
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  info: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    width: '100%',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#666',
  },
});
