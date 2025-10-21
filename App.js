import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import Onboarding from "./screens/Onboarding";
import Login from "./screens/Login";
import Signup from './screens/Signup';
import ForgotPassword from './screens/ForgotPassword';
import Verify from './screens/Verify';
import create from './screens/Create';
import Home from './screens/Home';
import HomeScreen from './screens/HomeScreen';
import NearbyWifi from './screens/NearbyWifi';
import FundWalletOptionsScreen from './screens/FundWalletOptionsScreen';
import FundWalletScreen from './screens/FundWalletScreen';
import ViewWalletScreen from './screens/ViewWalletScreen';
import DepositCryptoScreen from './screens/DepositCryptoScreen';
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
        <Stack.Screen name="FundWalletOptions" component={FundWalletOptionsScreen} />
        <Stack.Screen name="FundWallet" component={FundWalletScreen} />
        <Stack.Screen name="ViewWallet" component={ViewWalletScreen} />
        <Stack.Screen name="DepositCrypto" component={DepositCryptoScreen} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}
