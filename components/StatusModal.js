import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Svg, { Path, Rect, Ellipse } from 'react-native-svg';
import { Colors } from '../screens/common';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// SVG Icons from user
const SuccessIcon = () => (
  <Svg width="31" height="23" viewBox="0 0 31 23" fill="none">
    <Path 
      d="M2.36431 10.4342L11.4258 19.7676L28.2543 2.43425" 
      stroke="#00C247" 
      strokeWidth="4.8" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </Svg>
);

const ErrorIcon = () => (
  <Svg width="5" height="36" viewBox="0 0 5 36" fill="none">
    <Ellipse cx="2.42718" cy="33.5" rx="2.42718" ry="2.5" fill="#FF3333"/>
    <Rect width="4.85437" height="27" rx="2.42718" fill="#FF3333"/>
  </Svg>
);

const InfoIcon = () => (
  <Svg width="18" height="42" viewBox="0 0 18 42" fill="none">
    <Path 
      d="M9 27V25.8335C9 22.0558 10.7712 20.0557 12.5423 18.4446C14.2713 16.889 16 14.8891 16 11.2224C16 6.1113 12.8796 2 9 2C5.12042 2 2 6.1113 2 11.2224" 
      stroke="#2563EB" 
      strokeWidth="4" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <Path 
      d="M8.982 39.5H9.018" 
      stroke="#2563EB" 
      strokeWidth="4" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </Svg>
);

export default function StatusModal({ 
  visible, 
  type = 'success', // 'success' | 'error' | 'info'
  title, 
  message,
  primaryButtonText,
  onPrimaryPress,
  secondaryButtonText,
  onSecondaryPress,
  onClose 
}) {
  const isSuccess = type === 'success';
  const isError = type === 'error';
  const isInfo = type === 'info';
  
  const iconBgColor = isSuccess ? 'rgba(0, 194, 71, 0.1)' : 
                     isError ? 'rgba(255, 51, 51, 0.1)' : 
                     'rgba(37, 99, 235, 0.1)'; // Info blue
  
  const iconBorderColor = isSuccess ? '#00C247' : 
                         isError ? '#FF3333' : 
                         '#2563EB'; // Info blue
  
  const titleColor = isSuccess ? '#00C247' : 
                    isError ? '#FF3333' : 
                    '#333'; // Info uses default text color

  const getIcon = () => {
    if (isSuccess) return <SuccessIcon />;
    if (isError) return <ErrorIcon />;
    return <InfoIcon />;
  };

  const hasSecondaryButton = secondaryButtonText && onSecondaryPress;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>

          <View style={styles.content}>
            <View style={[
              styles.iconContainer, 
              { 
                backgroundColor: iconBgColor,
                borderColor: iconBorderColor 
              }
            ]}>
              {getIcon()}
            </View>

            <Text style={[styles.title, { color: titleColor }]}>
              {title || (isSuccess ? "Payment Successful" : isError ? "Payment Failed" : "Information")}
            </Text>
            
            {message && (
              <Text style={[styles.message, isInfo && { fontSize: 16 }]}>{message}</Text>
            )}

            <View style={[styles.buttonContainer, !hasSecondaryButton && styles.singleButtonContainer]}>
              {hasSecondaryButton && (
                <TouchableOpacity 
                  style={[styles.button, styles.outlineButton]} 
                  onPress={onSecondaryPress}
                >
                  <Text style={styles.outlineButtonText}>{secondaryButtonText}</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity 
                style={[styles.button, styles.filledButton, !hasSecondaryButton && styles.singleButton]} 
                onPress={onPrimaryPress}
              >
                <Text style={styles.filledButtonText}>
                  {primaryButtonText || "OK"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 4,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 10,
  },
  singleButtonContainer: {
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleButton: {
    maxWidth: 200,
  },
  outlineButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  filledButton: {
    backgroundColor: '#2563EB',
  },
  outlineButtonText: {
    color: '#2563EB',
    fontSize: 15,
    fontWeight: '600',
  },
  filledButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
});
