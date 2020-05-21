import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import Components
import UserProfileHandler from "../components/UserProfileHandler";

// Import Screens
import SettingsScreen from "../screens/SettingsScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import EditPhoto from "../screens/EditPhoto";
import EditStory from "../screens/EditStory";
import EditExperience from "../screens/EditExperience";
import EditPassions from "../screens/EditPassions";
import EditSkills from "../screens/EditSkills";
import EditRecommendations from "../screens/EditRecommendations";
import AddRecommendation from "../screens/AddRecommendation";
import EditConnections from "../screens/EditConnections";
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
      <Stack.Screen name="Edit Passions" component={EditPassions} />
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
