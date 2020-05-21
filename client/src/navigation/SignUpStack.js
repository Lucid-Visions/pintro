import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen2 from "../screens/SignUpScreen2";
import SignUpScreen4 from "../screens/SignUpScreen4";
import SignUpScreen5 from "../screens/SignUpScreen5";
import SignUp6Screen from "../screens/SignUp6Screen";
import SignUp7Screen from "../screens/SignUp7Screen";
import SignUp8Screen from "../screens/SignUp8Screen";
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
      <Stack.Screen name="SignUp2" component={SignUpScreen2} />
      {/**<Stack.Screen name="BusSignUp1" component={BusSignUpScreen1} />
      <Stack.Screen name="BusSignUp2" component={BusSignUpScreen2} />
      <Stack.Screen name="BusSignUp3" component={BusSignUpScreen3} />
      <Stack.Screen name="BusSignUp5" component={BusSignUpScreen5} />
      <Stack.Screen name="BusSignUp6" component={BusSignUpScreen6} />*/}
      <Stack.Screen name="SignUp4" component={SignUpScreen4} />
      <Stack.Screen name="SignUp5" component={SignUpScreen5} />
      <Stack.Screen name="SignUp6" component={SignUp6Screen} />
      <Stack.Screen name="SignUp7" component={SignUp7Screen} />
      <Stack.Screen name="SignUp8" component={SignUp8Screen} />
      <Stack.Screen name="LogIn" component={LogInScreen} />
      <Stack.Screen name="ForgotPassword" component={PasswordResetScreen} />

    </Stack.Navigator>
  );
}

export default SignUpStack;
