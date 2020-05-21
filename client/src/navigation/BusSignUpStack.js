import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainTabNavi from "./MainTabNavigator";
import BusSignUpScreen1 from "../screens/BusSignUpScreen1";
import BusSignUpScreen2 from "../screens/BusSignUpScreen2";
import BusSignUpScreen3 from "../screens/BusSignUpScreen3";
import BusSignUpScreen5 from "../screens/BusSignUpScreen5";
import BusSignUpScreen6 from "../screens/BusSignUpScreen6";
import BusinessProfileHandler from "../components/BusinessProfileHandler";
import UserProfileHandler from "../components/UserProfileHandler";
 

const Stack = createStackNavigator();

/**
 * Stack navigator for the chat tab.
 */
function BusSignUpStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {/**<Stack.Screen name="MainTabNavi" component={MainTabNavi} />*/}
      <Stack.Screen name="BusSignUp1" component={BusSignUpScreen1} />
      <Stack.Screen name="BusSignUp2" component={BusSignUpScreen2} />
      <Stack.Screen name="BusSignUp3" component={BusSignUpScreen3} />
      <Stack.Screen name="BusSignUp5" component={BusSignUpScreen5} />
      <Stack.Screen name="BusSignUp6" component={BusSignUpScreen6} />
      <Stack.Screen name="Company" component={BusinessProfileHandler} />
      <Stack.Screen name="Profile" component={UserProfileHandler} />

    </Stack.Navigator>
  );
}

export default BusSignUpStack;
