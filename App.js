import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/common/SplashScreen';
import Onboarding from "./screens/common/Onboarding";
import Login from "./screens/common/Login";
import Signup from './screens/common/Signup';
import ForgotPassword from './screens/common/ForgotPassword';
import Verify from './screens/common/Verify';
import create from './screens/common/create';
import Home from './screens/common/Home';
import FundWalletOptionsScreen from './screens/common/FundWalletOptionsScreen';
import FundWalletScreen from './screens/common/FundWalletScreen';
import ViewWalletScreen from './screens/common/ViewWalletScreen';
import DepositCryptoScreen from './screens/common/DepositCryptoScreen';
import PaymentScreen from './screens/common/PaymentScreen';
import CryptoWithdrawalScreen from './screens/common/CryptoWithdrawalScreen';
import FiatWithdrawScreen from './screens/common/FiatWithdraw';
import beneficiary from './screens/common/beneficiary';
import SavedBeneficiariesScreen from './screens/common/beneficiary2';

import HomeScreen from './screens/user/HomeScreen';
import NearbyWifi from './screens/user/NearbyWifi';
import UserNotifications from './screens/user/UserNotifications';

import Rewards from './screens/host/Rewards';
import HostKyc from './screens/host/HostKyc';
import HostHome from './screens/host/HostHome';
import HostDashboard from './screens/host/HostDashboard';
import HostHotspotManage from './screens/host/HostHotspotManage';
import HostRecentConnections from './screens/host/HostRecentConnections';
import HostUserFeedback from './screens/host/HostUserFeedback';
import HostNotifications from './screens/host/HostNotifications';
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
        <Stack.Screen name="create" component={create} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="NearbyWifi" component={NearbyWifi} />
        <Stack.Screen name="Rewards" component={Rewards} />
        <Stack.Screen name="UserNotifications" component={UserNotifications} />
        <Stack.Screen name="FundWalletOptions" component={FundWalletOptionsScreen} />
        <Stack.Screen name="FundWallet" component={FundWalletScreen} />
        <Stack.Screen name="ViewWallet" component={ViewWalletScreen} /> 
        <Stack.Screen name="DepositCrypto" component={DepositCryptoScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="CryptoWithdrawal" component={CryptoWithdrawalScreen} />
        <Stack.Screen name="FiatWithdraw" component={FiatWithdrawScreen} />
        <Stack.Screen name="Beneficiary" component={beneficiary} />
        <Stack.Screen name="SavedBeneficiaries" component={SavedBeneficiariesScreen} />
        <Stack.Screen name="HostKyc" component={HostKyc} />
        <Stack.Screen name="HostHome" component={HostHome} />
        <Stack.Screen name="HostDashboard" component={HostDashboard} />
        <Stack.Screen name="HostHotspotManage" component={HostHotspotManage} />
        <Stack.Screen name="HostRecentConnections" component={HostRecentConnections} />
        <Stack.Screen name="HostUserFeedback" component={HostUserFeedback} />
        <Stack.Screen name="HostNotifications" component={HostNotifications} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}
