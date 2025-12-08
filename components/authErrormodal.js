import React from 'react';
import StatusModal from './StatusModal';

export default function AuthModal({ 
  visible, 
  message, 
  onClose, 
  title,
  type = "error", // 'error' | 'success' | 'info'
  primaryButtonText,
  onPrimaryPress,
  secondaryButtonText,
  onSecondaryPress,
  skipMessageSimplification = false
}) {
  // Simplify error messages (only for error type and when not skipped)
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

  // Get default title based on type
  const getDefaultTitle = () => {
    switch (type) {
      case 'success': return 'Success';
      case 'info': return 'Information';
      case 'error':
      default: return 'Error';
    }
  };

  // Process message based on type and settings
  const processedMessage = (type === 'error' && !skipMessageSimplification) 
    ? simplifyErrorMessage(message) 
    : message;

  return (
    <StatusModal
      visible={visible}
      type={type}
      title={title || getDefaultTitle()}
      message={processedMessage}
      onPrimaryPress={onPrimaryPress || onClose}
      primaryButtonText={primaryButtonText || "OK"}
      secondaryButtonText={secondaryButtonText}
      onSecondaryPress={onSecondaryPress}
      onClose={onClose}
    />
  );
}

// Export with backward compatibility alias
export { AuthModal as ErrorModal };