import React from "react";
import { View, TouchableOpacity } from "react-native";
import { AuthSession } from "expo";
import WideButton from "./WideButton";

/**
 *This component wraps the sign in / register buttons for linked in, Facebook etc. Handles the OAuth
 * @param {*} props should contain {text, source, style, oAuthUrl, callback}
 */
function OAuthSignIn(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(props);
      }}
      underlayColor="white"
    >
      <WideButton
        value={props.text}
        source={props.source}
        containerStyle={props.style}
      />
    </TouchableOpacity>
  );
}

/**
 *
 * Function gets called when button is pressed
 */
async function onPress(props) {

    if (props.oAuthUrl) {
      
      let redirectUrl = AuthSession.getRedirectUrl();
      console.log(redirectUrl);
      let authResult = await AuthSession.startAsync({
        authUrl: props.oAuthUrl + `&redirect_uri=${redirectUrl}`
      });
      //pass the result and redirectURL to the callback function
      props.callback(authResult, redirectUrl);
    }
  }

export default OAuthSignIn;
