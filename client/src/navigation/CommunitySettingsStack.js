import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import Screens
import EditCommunityScreen from "../modules/communities/edit/components/edit-community-screen";
import EditInfo from "../modules/communities/edit/components/edit-info-screen";
import EditPhoto from "../modules/communities/edit/components/edit-photo-screen";
import EditTags from "../modules/communities/edit/components/edit-tags-screen";
import EditMembers from "../modules/communities/edit/components/edit-members-screen";
import EditArticles from "../modules/communities/edit/components/edit-articles-screen";
import EditEvents from "../modules/communities/edit/components/edit-events-screen";

const Stack = createStackNavigator();

/**
 * Stack navigator for the communities edit page.
 */
function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      
      {/* Edit Communities Screens */}
      <Stack.Screen name="Edit Community" component={EditCommunityScreen} />
      <Stack.Screen name="Edit Photo" component={EditPhoto} />
      <Stack.Screen name="Edit Info" component={EditInfo} />
      <Stack.Screen name="Edit Tags" component={EditTags} />
      <Stack.Screen name="Edit Articles" component={EditArticles} />
      <Stack.Screen name="Edit Members" component={EditMembers} />
      <Stack.Screen name="Edit Events" component={EditEvents} />

    </Stack.Navigator>
  );
}

export default SettingsStack;
