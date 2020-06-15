import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PasswordResetScreen from "../screens/PasswordResetScreen"

// Import Components
import UserProfileHandler from "../components/UserProfileHandler";

// Import Screens
import SettingsStack from "../navigation/SettingsStack";
import WriteStatusScreen from "../screens/WriteStatusScreen";
import ChatStack from "../navigation/ChatStack"
import CreateCommunity from "../modules/communities/create";
import CreateCommunityAddTags from "../modules/communities/create/add-tags-page";
import CreateCommunityThanks from '../modules/communities/create/thank-you-page';
import CommunityProfilePage from '../modules/communities/profile/components/profile-screen'
import CommunityList from "../modules/users/profile/community-list";

const Stack = createStackNavigator();

/**
 * Stack navigator for the profile page.
 */
function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Profile" component={UserProfileHandler} />
      <Stack.Screen name="ChatStack" component={ChatStack} />
      <Stack.Screen name="WriteStatus" component={WriteStatusScreen} />
      <Stack.Screen name="SettingsStack" component={SettingsStack} />
      <Stack.Screen name="ForgotPassword" component={PasswordResetScreen} />
      <Stack.Screen name="CreateCommunity" component={CreateCommunity}></Stack.Screen>
      <Stack.Screen name="CreateCommunityAddTags" component={CreateCommunityAddTags}></Stack.Screen>
      <Stack.Screen name="CreateCommunityThanks" component={CreateCommunityThanks}></Stack.Screen>
      <Stack.Screen name="CommunityProfile" component={CommunityProfilePage}></Stack.Screen>
      <Stack.Screen name="CommunityList" component={CommunityList}></Stack.Screen>

    </Stack.Navigator>
  );
}

export default ProfileStack;
