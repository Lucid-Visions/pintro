import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import UserProfileHandler from "../components/UserProfileHandler";
import ChatStack from "../navigation/ChatStack"


const Stack = createStackNavigator();

/**
 * Stack navigator for the home tab.
 */
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={UserProfileHandler} />
      <Stack.Screen name="ChatStack" component={ChatStack} />

    </Stack.Navigator>
  );
}

export default HomeStack;
