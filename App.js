import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./screens/SplashScreen";
import Onboarding from "./screens/Onboarding";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import ForgotPassword from "./screens/ForgotPassword";
import Verify from "./screens/Verify";
import create from "./screens/create";
import Home from "./screens/Home";
import Reward from "./components/reward/Reward";
import EarningsBreakdown from "./components/reward/EarningsBreakdown";
import LeaderboardScreen from "./components/reward/LeaderboardScreen";
import Activity from "./components/activty/Activity";
import DataUsage from "./components/activty/DataUsage";
import RecentConnections from "./components/activty/RecentConnections";
import ProfileScreen from "./components/profile/ProfileScreen";
import EditProfileScreen from "./components/profile/EditProfileScreen";
import TransactionHistory from "./components/profile/TransactionHistory";
import PrivacySecurityScreen from "./components/profile/PrivacySecurityScreen";
import HowToUseShareGrid from "./components/profile/HowToUseShareGrid";
import WhatIsShareGrid from "./components/profile/WhatIsShareGrid";
import BecomeVendor from "./components/profile/BecomeVendor";
import RentItems from "./components/profile/RentItems";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="create" component={create} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Reward" component={Reward} />
        <Stack.Screen
          name="EarningsBreakdown"
          component={EarningsBreakdown}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LeaderboardScreen"
          component={LeaderboardScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="Activity" component={Activity} />
        <Stack.Screen
          name="DataUsage"
          component={DataUsage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecentConnections"
          component={RecentConnections}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TransactionHistory"
          component={TransactionHistory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PrivacySecurity"
          component={PrivacySecurityScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HowToUseShareGrid"
          component={HowToUseShareGrid}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WhatIsShareGrid"
          component={WhatIsShareGrid}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BecomeVendor"
          component={BecomeVendor}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RentItems"
          component={RentItems}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
