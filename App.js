import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Auth screens
import SplashScreen from './screens/auth/SplashScreen';
import Onboarding from './screens/auth/Onboarding';
import Login from './screens/auth/Login';
import Signup from './screens/auth/Signup';
import ForgotPassword from './screens/auth/ForgotPassword';
import Verify from './screens/auth/Verify';
import CreateForgotPassword from './screens/auth/createForgotPassword';

// User screens
import Home from './screens/user/Home';
import HomeScreen from './screens/user/HomeScreen';
import NearbyWifi from './screens/user/NearbyWifi';
import FundWalletOptionsScreen from './screens/user/FundWalletOptionsScreen';
import FundWalletScreen from './screens/user/FundWalletScreen';
import ViewWalletScreen from './screens/user/ViewWalletScreen';
import DepositCryptoScreen from './screens/user/DepositCryptoScreen';
import PaymentScreen from './screens/user/PaymentScreen';
import CryptoWithdrawalScreen from './screens/user/CryptoWithdrawalScreen';
import FiatWithdrawScreen from './screens/user/FiatWithdraw';
import beneficiary from './screens/user/beneficiary';
import SavedBeneficiariesScreen from './screens/user/beneficiary2';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="createForgotPassword" component={CreateForgotPassword} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="NearbyWifi" component={NearbyWifi} />
        <Stack.Screen name="FundWalletOptions" component={FundWalletOptionsScreen} />
        <Stack.Screen name="FundWallet" component={FundWalletScreen} />
        <Stack.Screen name="ViewWallet" component={ViewWalletScreen} /> 
        <Stack.Screen name="DepositCrypto" component={DepositCryptoScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="CryptoWithdrawal" component={CryptoWithdrawalScreen} />
        <Stack.Screen name="FiatWithdraw" component={FiatWithdrawScreen} />
        <Stack.Screen name="Beneficiary" component={beneficiary} />
        <Stack.Screen name="SavedBeneficiaries" component={SavedBeneficiariesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
