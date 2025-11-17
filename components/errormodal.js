import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ErrorModal({ visible, message, onClose, title = "Error" }) {
  // Simplify error messages
  const simplifyErrorMessage = (errorMsg) => {
    if (!errorMsg) return "Something went wrong";
    
    const msg = errorMsg.toLowerCase();
    
    if (msg.includes('network') || msg.includes('connection')) {
      return "Check your internet connection";
    }
    if (msg.includes('email') && msg.includes('already')) {
      return "Email already exists";
    }
    if (msg.includes('password') && msg.includes('weak')) {
      return "Password is too weak";
    }
    if (msg.includes('invalid') && msg.includes('email')) {
      return "Invalid email address";
    }
    if (msg.includes('wrong') && msg.includes('password')) {
      return "Wrong password";
    }
    if (msg.includes('user') && msg.includes('not found')) {
      return "Account not found";
    }
    if (msg.includes('verification') && msg.includes('code')) {
      return "Invalid verification code";
    }
    if (msg.includes('google') && msg.includes('sign')) {
      return "Google sign-in failed";
    }
    if (msg.includes('apple') && msg.includes('sign')) {
      return "Apple sign-in failed";
    }
    if (msg.includes('cancelled')) {
      return "Sign-in was cancelled";
    }
    
    // Return original message if no simplification found, but limit length
    return errorMsg.length > 50 ? errorMsg.substring(0, 50) + "..." : errorMsg;
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Ionicons name="alert-circle" size={24} color="#FF6B6B" />
            <Text style={styles.title}>{title}</Text>
          </View>
          
          <Text style={styles.message}>
            {simplifyErrorMessage(message)}
          </Text>
          
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: width * 0.85,
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  message: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2979FF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});