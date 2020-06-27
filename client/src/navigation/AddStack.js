import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddScreen from "../screens/AddScreen";
import WGOModal from "../components/WGOModal";
import WriteStatusScreen from "../screens/WriteStatusScreen";
import AskHelpScreen from "../screens/AskHelpScreen";
import TalkToMeAboutScreen from "../screens/TalkToMeAboutScreen";
import PromoteMeScreen from "../screens/PromoteMeScreen";
import RequestIntroScreen from "../screens/RequestIntroScreen";

const Stack = createStackNavigator();

/**
 * Stack navigator for the add tab.
 */
function AddStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: "transparent" } }}
    >
      <Stack.Screen name="Add" component={WGOModal} />
      <Stack.Screen name="WriteStatus" component={WriteStatusScreen} />
      <Stack.Screen name="AskHelp" component={AskHelpScreen} />
      <Stack.Screen name="RequestIntro" component={RequestIntroScreen} />
      <Stack.Screen name="TalkToMeAbout" component={TalkToMeAboutScreen} />
      <Stack.Screen name="PromoteMe" component={PromoteMeScreen} />
    </Stack.Navigator>
  );
}

export default AddStack;
