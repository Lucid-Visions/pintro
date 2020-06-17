import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import Components
import UserProfileHandler from "../components/UserProfileHandler";

// Import Screens
import SettingsScreen from "../screens/SettingsScreen";
import EditProfileScreen from "../modules/users/edit/components/edit-profile-screen";
import EditPhoto from "../modules/users/edit/components/edit-photo-screen";
import EditStory from "../modules/users/edit/components/edit-story-screen";
import EditExperience from "../modules/users/edit/components/edit-experience-screen";
import EditInterests from "../modules/users/edit/components/edit-interests-screen";
import EditSkills from "../modules/users/edit/components/edit-skills-screen";
import EditRecommendations from "../modules/users/edit/components/edit-recommendations-screen";
import AddRecommendation from "../screens/AddRecommendation";
import EditConnections from "../modules/users/edit/components/edit-connections-screen";
import SignUpStack from "../navigation/SignUpStack";

const Stack = createStackNavigator();

/**
 * Stack navigator for the profile page.
 */
function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
      
      {/* Edit Profile Screens */}
      <Stack.Screen name="Edit Photo" component={EditPhoto} />
      <Stack.Screen name="Edit Story" component={EditStory} />
      <Stack.Screen name="Edit Experience" component={EditExperience} />
      <Stack.Screen name="Edit Interests" component={EditInterests} />
      <Stack.Screen name="Edit Skills" component={EditSkills} />
      <Stack.Screen name="Edit Connections" component={EditConnections} />
      <Stack.Screen
        name="Edit Recommendations"
        component={EditRecommendations}
      />
      <Stack.Screen name="Add Recommendation" component={AddRecommendation} />
      {/* Connections */}
      <Stack.Screen name="Connection Profile" component={UserProfileHandler} />

      <Stack.Screen name={"SignUpStack"} component={SignUpStack} />

    </Stack.Navigator>
  );
}

export default SettingsStack;
