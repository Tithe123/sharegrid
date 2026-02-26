import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaystackProvider } from 'react-native-paystack-webview';

// Auth screens
import SplashScreen from './screens/auth/SplashScreen';
import Onboarding from './screens/auth/Onboarding';
import Login from './screens/auth/Login';
import Signup from './screens/auth/Signup';
import ForgotPassword from './screens/auth/ForgotPassword';
import VerifyEmail from './screens/auth/VerifyEmail';
import CreateForgotPassword from './screens/auth/createForgotPassword';

// Common screens
import Home from './screens/common/Home';

// User screens
import HomeScreen from './screens/user/HomeScreen';
import NearbyWifi from './screens/user/NearbyWifi';
import PaymentScreen from './screens/user/PaymentScreen';
import beneficiary from './screens/user/beneficiary';
import SavedBeneficiariesScreen from './screens/user/beneficiary2';

// Wallet screens
import WalletDashboard from './screens/user/wallet/WalletDashboard';
import ViewWalletScreen from './screens/user/wallet/ViewWalletScreen';
import FundWalletOptionsScreen from './screens/user/wallet/FundWalletOptionsScreen';
import FundWalletScreen from './screens/user/wallet/FundWalletScreen';
import ConnectWallet from './screens/user/wallet/ConnectWallet';
import DepositCryptoScreen from './screens/user/wallet/DepositCryptoScreen';
import SendCrypto from './screens/user/wallet/SendCrypto';
import CryptoTransactions from './screens/user/wallet/CryptoTransactions';
import FiatWithdrawScreen from './screens/user/wallet/FiatWithdraw';

// Unused wallet screens (kept for reference)
import CryptoWithdrawalScreen from './screens/user/wallet/unused/CryptoWithdrawalScreen';

const Stack = createNativeStackNavigator();

const PAYSTACK_PUBLIC_KEY = process.env.EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY;

export default function App() {
  return (
    <PaystackProvider
      publicKey={PAYSTACK_PUBLIC_KEY || ''}
      currency="NGN"
      defaultChannels={['card', 'bank', 'ussd', 'bank_transfer']}
      debug={false}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
          <Stack.Screen name="createForgotPassword" component={CreateForgotPassword} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="NearbyWifi" component={NearbyWifi} />

          {/* Wallet screens */}
          <Stack.Screen name="FundWalletOptions" component={FundWalletOptionsScreen} />
          <Stack.Screen name="FundWallet" component={FundWalletScreen} />
          <Stack.Screen name="ViewWallet" component={ViewWalletScreen} /> 
          <Stack.Screen name="DepositCrypto" component={DepositCryptoScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="CryptoWithdrawal" component={CryptoWithdrawalScreen} />
          <Stack.Screen name="FiatWithdraw" component={FiatWithdrawScreen} />
          <Stack.Screen name="Beneficiary" component={beneficiary} />
          <Stack.Screen name="SavedBeneficiaries" component={SavedBeneficiariesScreen} />
          
          {/* Wallet screens with full functionality */}
          <Stack.Screen name="WalletDashboard" component={WalletDashboard} />
          <Stack.Screen name="ConnectWallet" component={ConnectWallet} />
          <Stack.Screen name="SendCrypto" component={SendCrypto} />
          <Stack.Screen name="CryptoTransactions" component={CryptoTransactions} />
          <Stack.Screen name="ReceiveCrypto" component={DepositCryptoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaystackProvider>
  );
}
