import React, { Component } from "react";
import OAuthSignIn from "../OAuthSignIn";
import env from "../../env";
import { AsyncStorage } from "react-native";

/**
 *
 * @param {*} props Props should contain {signIn} may contain {style (for buttons)}
 */
function RegisterFacebookComponent(props) {
  //this function is called after we get the auth token
  const callback = function(responseData, redirectUrl) {
    responseData["redirectUrl"] = redirectUrl;
    fetch(`http://${env.host}:${env.port}/api/v1/register/facebook`, {
      method: "POST",
      body: JSON.stringify(responseData),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(responseJson => {
        if (responseJson.newUser) {
          alert("welcome new user");
        }
        _storeData("token", responseJson.token);
        props.signIn(responseJson.token);
      })
      .catch(function(error) {
        alert(error);
        return;
      });
  };

  return (
    <OAuthSignIn
      backgroundColor="#FFFFFF"
      text={"Sign In With Facebook"}
      oAuthUrl={`https://www.facebook.com/v6.0/dialog/oauth?client_id=${"184625802794608"}&state=cool`}
      callback={callback}
      source={require("../../assets/facebook_black.png")}
      style={props.style}
    />
  );
}

async function _storeData(key, val) {
  try {
    await AsyncStorage.setItem(key, val);
  } catch (error) {
    alert(error);
  }
}

export default RegisterFacebookComponent;
