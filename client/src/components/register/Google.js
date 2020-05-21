import React, { Component } from "react";
import OAuthSignIn from "../OAuthSignIn";
import env from "../../env";
import { AsyncStorage } from "react-native";

function RegisterGoogleComponent(props) {
  //this function is called after we get the auth token
 const callback = function(responseData, redirectUrl) {
  responseData["redirectUrl"] = redirectUrl;
  fetch(`http://${env.host}:${env.port}/api/v1/register/google`, {
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
  }

  return (
    <OAuthSignIn
      backgroundColor="#FFFFFF"
      text={"Sign In With Google"}
      oAuthUrl={`https://accounts.google.com/o/oauth2/auth?client_id=1012305757216-ctor77pbo6qa0mvi3qgq83q8ngeoa4dm.apps.googleusercontent.com&scope=https://www.googleapis.com/auth/userinfo.profile&response_type=code`}
      callback={callback}
      source={require("../../assets/google_black.png")}
      style={props.style}
    />
  );
}

async function _storeData(key, val) {
  try {
    await AsyncStorage.setItem(key, val);
  } catch (error) {
    alert(error)
  }
}

export default RegisterGoogleComponent;


