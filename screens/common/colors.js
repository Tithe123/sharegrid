// ShareGrid Color System
export const Colors = {
  // Primary Brand Colors
  primary: '#2563EB',           // Main primary color
  primaryLight: '#007AFF',      // Light primary variant
  primaryDark: '#1E63EE',       // Dark primary variant
  accentBlue: '#3C9AFB',

  // Background Colors
  background: '#FEFEFE',        // Main background color
  backgroundLight: '#F9FAFB',   // Light background variant
  backgroundGray: '#F7F9FB',    // Gray background variant
  backgroundToggle: '#E9F0FF',  // Toggle background

  // Status Colors
  success: '#00C247',           // Success color
  successLight: '#22C55E',      // Light success variant
  successDark: '#1EC76C',       // Dark success variant
  error: '#FF3333',             // Error color
  errorLight: '#FF6B6B',        // Light error variant
  warning: '#FFA500',           // Warning color
  info: '#17A2B8',              // Info color

  // Text Colors
  textPrimary: '#000000',       // Primary text color
  textSecondary: '#333333',     // Secondary text color
  textTertiary: '#666666',      // Tertiary text color
  textMuted: '#999999',         // Muted text color
  textLight: '#9EA2AD',         // Light text color
  textDisabled: '#A0A0A0',      // Disabled text color

  // UI Colors
  white: '#FFFFFF',             // Pure white
  black: '#000000',             // Pure black
  transparent: 'transparent',   // Transparent

  // Border and Divider Colors
  border: '#CCCCCC',            // Default border color
  borderLight: '#DDDDDD',       // Light border color
  borderDark: '#444444',        // Dark border color
  borderSocial: '#E9EAEB',      // Social border color
  divider: '#E5E5E5',           // Divider color

  // Shadow Colors
  shadow: '#000000',            // Shadow color
  shadowLight: 'rgba(0, 0, 0, 0.1)',  // Light shadow
  shadowMedium: 'rgba(0, 0, 0, 0.2)',  // Medium shadow
  shadowDark: 'rgba(0, 0, 0, 0.3)',    // Dark shadow

  // Interactive Colors
  link: '#2563EB',              // Link color
  linkHover: '#1E63EE',         // Link hover color
  buttonPrimary: '#2563EB',     // Primary button color
  buttonSecondary: '#6B7280',   // Secondary button color
  buttonDisabled: '#9CA3AF',    // Disabled button color

  // Specific Component Colors
  modalBackground: 'rgba(0, 0, 0, 0.5)',  // Modal backdrop
  cardBackground: '#FFFFFF',    // Card background
  inputBackground: '#FFFFFF',   // Input background
  placeholderText: '#999999',   // Placeholder text

  // Navigation Colors
  tabActive: '#007AFF',         // Active tab color
  tabInactive: '#A0A0A0',       // Inactive tab color
  navigationBackground: '#FFFFFF',  // Navigation background

  // WiFi Status Colors
  wifiConnected: '#22C55E',     // WiFi connected color
  wifiDisconnected: '#9E9E9E',  // WiFi disconnected color
  wifiActive: '#007AFF',        // WiFi active color

  // Gradient Colors (for future use)
  gradientStart: '#2563EB',     // Gradient start color
  gradientEnd: '#1E63EE',       // Gradient end color
};

// Color utility functions
export const getColorWithOpacity = (color, opacity) => {
  // Convert hex to rgba with opacity
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Theme variants (for future dark mode support)
export const LightTheme = {
  ...Colors,
  background: '#FEFEFE',
  textPrimary: '#000000',
  cardBackground: '#FFFFFF',
};

export const DarkTheme = {
  ...Colors,
  background: '#1A1A1A',
  textPrimary: '#FFFFFF',
  cardBackground: '#2A2A2A',
  // Override other colors for dark theme as needed
};

// Export default as Colors for convenience
export default Colors;
