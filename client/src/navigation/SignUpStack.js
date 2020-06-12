import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "../screens/SignInScreen";
import createAccountScreen from "../modules/users/create/components/create-account-screen";
import userDetailsScreen from "../modules/users/create/components/user-details-screen";
import workExperienceScreen from "../modules/users/create/components/work-experience-screen";
import selectTagsScreen from "../modules/users/create/components/select-tags-screen";
import selectSuperpowersScreen from "../modules/users/create/components/select-superpowers-screen";
import thankYouScreen from "../modules/users/create/components/thank-you-screen";
import BusSignUpScreen1 from "../screens/BusSignUpScreen1";
import BusSignUpScreen2 from "../screens/BusSignUpScreen2";
import BusSignUpScreen3 from "../screens/BusSignUpScreen3";
import BusSignUpScreen5 from "../screens/BusSignUpScreen5";
import BusSignUpScreen6 from "../screens/BusSignUpScreen6";
import PasswordResetScreen from "../screens/PasswordResetScreen"
import LogInScreen from "../screens/LogInScreen";
const Stack = createStackNavigator();

/**
 * Stack navigator for the chat tab.
 */
function SignUpStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp2" component={createAccountScreen} />
      {/**<Stack.Screen name="BusSignUp1" component={BusSignUpScreen1} />
      <Stack.Screen name="BusSignUp2" component={BusSignUpScreen2} />
      <Stack.Screen name="BusSignUp3" component={BusSignUpScreen3} />
      <Stack.Screen name="BusSignUp5" component={BusSignUpScreen5} />
      <Stack.Screen name="BusSignUp6" component={BusSignUpScreen6} />*/}
      <Stack.Screen name="SignUp4" component={userDetailsScreen} />
      <Stack.Screen name="SignUp5" component={workExperienceScreen} />
      <Stack.Screen name="SignUp6" component={selectTagsScreen} />
      <Stack.Screen name="SignUp7" component={selectSuperpowersScreen} />
      <Stack.Screen name="SignUp8" component={thankYouScreen} />
      <Stack.Screen name="LogIn" component={LogInScreen} />
      <Stack.Screen name="ForgotPassword" component={PasswordResetScreen} />

    </Stack.Navigator>
  );
}

export default SignUpStack;
