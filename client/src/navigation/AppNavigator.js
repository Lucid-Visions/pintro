import React, { useState } from "react";
import { AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/SplashScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpStack from "./SignUpStack";
import TabMenu from "./MainTabNavigator";
import registerNotification from "../assets/registerNotification"
import ViewStatusScreen from "../modules/live-feed/components/ViewStatusScreen"
//for WGO Modal
import WriteStatusScreen from "../screens/WriteStatusScreen";
import AskHelpScreen from "../screens/AskHelpScreen";
import RequestIntroScreen from "../screens/RequestIntroScreen";

const AuthContext = React.createContext();
const Stack = createStackNavigator();

/**
 * This navigator first checks if the user is logged in,
 * and renders different screens accordingly.
 */
export default function AppNavigator() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: undefined
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("token");
      } catch (e) {
        // Restoring token failed
        console.log(e);
      }
      if(userToken)registerNotification()
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
        registerNotification()
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      }
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
        headerShown: false
      }}
>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"
              component={SignUpStack}
              options={{
                header: () => null,
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? "pop" : "push"
              }}
            />
          ) : (
            // User is signed in (to be replaced with tab navigator)
            <Stack.Screen
              name="Main Menu"
              component={TabMenu}
              options={{ header: () => null }}
            />
          )}
          <Stack.Screen name="WriteStatus" component={WriteStatusScreen} />
          <Stack.Screen name="ViewStatus" component={ViewStatusScreen} />
          <Stack.Screen name="AskHelp" component={AskHelpScreen} />
          <Stack.Screen name="RequestIntro" component={RequestIntroScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
export { AppNavigator, AuthContext };
